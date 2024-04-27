const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const email = e.target.email.value;
        const password = e.target.password.value;
        const login = await axios.post("http://127.0.0.1:3000/login", { email: email, password: password });
        alert(login.data.message);
        localStorage.setItem("token", login.data.token);
        window.location.href = "/";
    }
    catch (err) {
        console.log(err)
        alert(err.response.data.error);
    }
});