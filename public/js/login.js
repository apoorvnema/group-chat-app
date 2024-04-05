const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    let username = e.target.username.value;
    localStorage.setItem("username", username);
});