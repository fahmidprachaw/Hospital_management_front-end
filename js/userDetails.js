const loadUser = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://smart-care-o2t9.onrender.com/users/${user_id}`)
    .then(res => res.json())
    .then(data => disolayUser(data))
}

const disolayUser = (data) => {
    console.log(data)
    const userDiv = document.getElementById("profile_header")
    // console.log(userDiv)
    userDiv.innerHTML = `
    <div class="profile-img">
        <img id="profile-picture" src="./assets/img/user.jpg" alt="Profile Picture">
    </div>
    <div class="profile-info">
        <h2 id="profile-name">${data.first_name} ${data.last_name}</h2>
        <p id="profile-email">Username: ${data.username}</p>
        <p id="profile-email">Email: <a herf="">${data.email}</a></p>
        <p id="profile-phone">Phone: ${data?.phone}</p>
    </div>
    `
}


loadUser();