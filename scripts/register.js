//every user that registers:
let allUsers = JSON.parse(localStorage.getItem('allUsers')) ? JSON.parse(localStorage.getItem('allUsers')) : [];

const getDate = (id) => {
    let date = new Date(document.getElementById(`${id}`).value);
    let day = date.getDay(); 
    let month = date.toLocaleString('default', { month: 'long' }); 
    let year = date.getFullYear();

    return ([day, month, year].join(' '))
}

const submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();

    //check if password matches confirm password
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if(password !== confirmPassword){
        alert('Passwords do not match');
        return;
    }

    const signUpData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phoneNo: document.getElementById('phoneNo').value,
        dob: getDate('dob'),
        nextOfKin: document.getElementById('nextOfKin').value,
        initialDeposit: document.getElementById('initialDeposit').value,
        gender: document.getElementById('gender').value,
        password:document.getElementById('password').value
    }

    //check if user already exists
    let isEmailExisting = allUsers.find(x => {
        if(x.email === signUpData.email){
            alert('email already exists');
            return true;
        }
    })

    if(!isEmailExisting){
        allUsers.push(signUpData);  
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        location.assign('index.html');
    }  
})

