let table = document.getElementById('transactionBody');

//get all users, then details of logged in user
let allUsers = JSON.parse(localStorage.getItem('allUsers'));
let userLogin = JSON.parse(localStorage.getItem('login_data'))
const loggedInUserDetails = allUsers.find(obj => {
    return obj.email === userLogin.email && obj.password === userLogin.password;
})

let sidebar = document.getElementById('userDetails');
sidebar.innerHTML = 
    `
        <h4>${loggedInUserDetails.firstName} ${loggedInUserDetails.lastName}</h4>
        <div>
            <small>Email</small>
            <h6>${loggedInUserDetails.email}</h6>
        </div>
        <div>
            <small>Phone number</small>
            <h6>${loggedInUserDetails.phoneNo}</h6>
        </div>
        <div>
            <small>Date of birth</small>
            <h6>${loggedInUserDetails.dob}</h6>
        </div>
        <div>
            <small>Next of kin</small>
            <h6>${loggedInUserDetails.nextOfKin}</h6>
        </div>
    `


const confirmWithdraw = document.getElementById('confirmWithdraw');
const confirmDeposit = document.getElementById('confirmDeposit');

let balance = document.getElementById('balance');
let fname = document.getElementById('username');

balance.innerHTML = loggedInUserDetails.initialDeposit
fname.innerHTML = loggedInUserDetails.firstName

const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = hours >= 12 ? 'PM' : 'AM';

    const fullDate = [day, month, year].join(' ');
    return `${fullDate}, ${hours % 12 || 12}:${minutes} ${time}`;
}

const greetings = () => {
    const date = new Date();
    const hours = date.getHours();
    let greeting = '';
    if(hours >= 0 && hours < 12){
        greeting = 'morning'
    }
    else if (hours >= 12 && hours <= 17){
        greeting = 'afternoon'
    }
    else greeting = 'evening'

    return greeting
}

document.getElementById('greetings').innerHTML = greetings();

let allTransactions = JSON.parse(localStorage.getItem('allTransactions')) ? JSON.parse(localStorage.getItem('allTransactions')) : [];
let transactionsWithoutEmail = [];
let loggedInUserTransactions = allTransactions.filter(x => x.userEmail === loggedInUserDetails.email);

confirmWithdraw.addEventListener('click', () => {
    updateTransactions('Debit');
})

confirmDeposit.addEventListener('click', () => {
    updateTransactions('Credit');
})

const updateTransactions = (transactionType) => {
    let withdraw = parseFloat(document.getElementById('withdraw').value);
    let deposit = parseFloat(document.getElementById('deposit').value);

    let userDescriptionWithdraw = document.getElementById('descriptionWithdraw').value;
    let userDescriptionDeposit = document.getElementById('descriptionDeposit').value;

    const find = allUsers.findIndex(x => {
        return x.email === loggedInUserDetails.email;
    });
    if(find !== -1) {
        let balance = parseFloat(allUsers[find].initialDeposit);

        if(transactionType === 'Credit'){
            balance += deposit;
        }
        if(transactionType === 'Debit') {
            if(balance >= withdraw){
                balance -= withdraw;
            }
            else alert('insufficient funds')
        }

        allUsers[find].initialDeposit = balance;

        console.log(allUsers)

        //SET ALL USERS AGAIN
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        document.getElementById('balance').innerHTML = balance;

        let transactions = {
            userEmail: loggedInUserDetails.email,
            type: transactionType,
            date: getDate(),
            details: transactionType === 'Credit' ? userDescriptionDeposit : userDescriptionWithdraw,
            amount: transactionType === 'Credit' ? deposit : withdraw,
            userBalance: balance
        }

        allTransactions.push(transactions);
        
        //SET ALL TRANSACTIONS
        localStorage.setItem('allTransactions', JSON.stringify(allTransactions));

        loggedInUserTransactions.forEach(y => {
            let {userEmail, ...rest} = y;
            transactionsWithoutEmail.push(rest);
        })

        location.reload();
    }
}


//console.log(loggedInUserTransactions)

loggedInUserTransactions.forEach(y => {
    let {userEmail, ...rest} = y;
    transactionsWithoutEmail.push(rest);
})

transactionsWithoutEmail.forEach(rows => {
    let row = table.insertRow();
    Object.values(rows).forEach(text => {
        let cell = row.insertCell();
        cell.innerHTML = text;

        if(cell.innerHTML === 'Debit'){
            cell.className = 'badge bg-danger m-2 rounded-pill'
        }
        if(cell.innerHTML === 'Credit'){
            cell.className = 'badge bg-success m-2 rounded-pill'
        }
    })
})

//logout current user
const logout = document.getElementById('logout')
logout.addEventListener('click', () => {
    localStorage.removeItem('login_data');
    location.assign('index.html')
})

