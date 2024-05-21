const handelRegistration = (event) => {
    event.preventDefault();
    username = document.getElementById("username").value;
    first_name = document.getElementById("first_name").value;
    last_name = document.getElementById("last_name").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    confirm_password = document.getElementById("confirm_password").value
    // console.log(username, first_name, last_name, email, password, confirm_password)
    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password
    }

    if(password == confirm_password){
        // alert("password matched")
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
            // console.log(info)
            fetch("https://smart-care-o2t9.onrender.com/patient/register/", {
                method : "POST",
                headers : { "content-type": "application/json" },
                body : JSON.stringify(info),
            })
            .then(res => res.json)
            .then(data => {
                console.log(data);
                window.location.href = "massege.html";
            })

        }
        else{
            alert("Password must contain eight characters, at least one letter, one number and one special character")
        }
    }
    else{
        alert("Password and Confirm password didn't matched")
    }
}

const handelLogin = (event) => {
    event.preventDefault();
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    console.log(username, password)
    const info = {
        username,
        password,
    }


    if((username, password)){
        fetch("https://smart-care-o2t9.onrender.com/patient/login/", {
            method : "POST",
            headers : {"content-type": "application/json"},
            body : JSON.stringify(info),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.token && data.user_id){
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);
                window.location.href = "index.html";
            }
            else{
                alert("Username or Password is invalid!")
            }
        })
    }
}




const handelLogout = () => {
    token = localStorage.getItem("token")

    fetch("https://smart-care-o2t9.onrender.com/patient/logout/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.reload();
    });
}






const renderAuthBtn = () => {
    registrationAuthLi = document.getElementById("auth_btn_R");
    AuthLi = document.getElementById("auth_btn_L");
    // console.log(registrationAuthLi, AuthLi)
    token = localStorage.getItem("token");
    user_id = localStorage.getItem("user_id");

    if(token && user_id){
        registrationAuthLi.innerHTML =`
        <a href="profile.html" >
        PROFILE
        </a>
        `;
        AuthLi.innerHTML = `
        <a onclick="handelLogout()" href="#" >
			LOGOUT
		</a>
        `
    }
    else{
        registrationAuthLi.innerHTML =`
        <a href="registration.html" >
			REGISTRATION
		</a>
        `;
        AuthLi.innerHTML = `
        <a href="login.html" >
			LOGIN
		</a>
        `
    }
}


renderAuthBtn()