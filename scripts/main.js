const loginData = {
  email: "",
  password: "",
};

const submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const emailData = document.getElementById('email').value
    const passwordData = document.getElementById('password').value

    loginData.email = emailData
    loginData.password = passwordData

    let allUsers = JSON.parse(localStorage.getItem('allUsers'));

    let isEmailExisting = allUsers.find(x => {
      if(x.email === loginData.email && x.password === loginData.password)
      {
        return true;
      }
    })

    if(isEmailExisting) {
      localStorage.setItem('login_data', JSON.stringify(loginData))
      location.assign('dashboard.html')
    }
    else {
      alert('login failed')
    }
})

