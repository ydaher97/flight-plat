
function loadState() {
    const savedState = localStorage.getItem('user');
    
    if (savedState) {
      const gameState = JSON.parse(savedState);
      email = gameState.email;
      password = gameState.password;
      name = gameState.name;
      admin = gameState.isAdmin;
     
    }

    if(admin === true){
        
    console.log("admin")
        const add = document.querySelector('.add');
        add.style.display = "block"
    }
}
loadState()


function logout(){

    localStorage.removeItem('user');
    localStorage.removeItem('myFlights')
    window.location.href = "../index.html";
}



function retrievesUser(){
    const UserJSON = localStorage.getItem("user")
    if (UserJSON) {
        const user = JSON.parse(UserJSON);
        if(user.isAdmin){
            userName.textContent = `${user.name} is Admin `;
        }else{
            userName.textContent = `${user.name} is not Admin `
        }
        return user;
    } else {
        userName.textContent = "No user found.";
        return [];
    }
}
retrievesUser()