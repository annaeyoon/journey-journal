
function getUsername() {
    const usernameContent = document.getElementById("login").value;
    console.log(usernameContent);
    return usernameContent;
}

document.getElementById("buttonID").addEventListener("click", getUsername);