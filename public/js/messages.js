const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let username = localStorage.getItem("username");
    if (!username) username = "Anonymous";
    const message = e.target.message.value;
    const data = { [username]: message };
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(() => { document.location.reload() }).catch((err) => console.log(err));
});

document.addEventListener("DOMContentLoaded", () => {
    const pre = document.querySelector("pre");
    fetch("/all").then((res) => res.json()).then((data) => {
        data.forEach((message) => {
            Object.keys(message).forEach((key) => {
                pre.innerHTML += key + ": " + message[key] + "\n";
            });
        });
    });
});

