const form = document.querySelector("form");
const token = localStorage.getItem("token");
const socket = io({ auth: { token: token } });
const messagesList = document.getElementById("all-messages");
const onlineUsers = document.getElementById("online-users");

socket.emit("get-messages");

socket.on("auth-error", () => {
    alert("Authentication error: You are not logged in!");
    window.location.href = "/login";
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const message = e.target.message.value;
        socket.emit("message", message);
        e.target.message.value = "";
        const li = document.createElement("li");
        li.innerText = "You" + ": " + message;
        messagesList.appendChild(li);
        messagesList.scrollTop = messagesList.scrollHeight;
        if (messagesList.children.length > 10)
            messagesList.firstChild.remove();
    }
    catch (err) {
        console.log(err);
    }
});

socket.on("message", (message) => {
    addMessageToList(message);
    if (messagesList.children.length > 10)
        messagesList.firstChild.remove();
});

function addMessageToList(message) {
    const li = document.createElement("li");
    li.innerText = message.sender + ": " + message.message;
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
}

socket.on("all-messages", (allMessages) => {
    messagesList.innerHTML = "";
    allMessages.forEach((message) => {
        addMessageToList(message);
    });
});

socket.on("user-joined", (data) => {
    const li = document.createElement("li");
    li.innerText = `${data.username} has joined the chat`;
    onlineUsers.appendChild(li);
    onlineUsers.scrollTop = onlineUsers.scrollHeight;
});

socket.on("user-left", (data) => {
    const li = document.createElement("li");
    li.innerText = `${data.username} has left the chat`;
    onlineUsers.appendChild(li);
    onlineUsers.scrollTop = onlineUsers.scrollHeight;
});

window.addEventListener("beforeunload", () => {
    socket.emit("user-left");
});
