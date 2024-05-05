const form = document.querySelector("form");
const token = localStorage.getItem("token");
const socket = io({ auth: { token: token } });
const messagesList = document.getElementById("all-messages");
const onlineUsers = document.getElementById("online-users");
const imageInput = document.getElementById('image-input');

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
        if(message.startsWith("![Image]")){
            li.innerHTML = "You" + ": " + `<img class="message-image" src="${message.substring(9, message.length - 1)}" alt="Image">`;
        }else{
            li.innerText = "You" + ": " + message;
        }
        messagesList.appendChild(li);
        messagesList.scrollTop = messagesList.scrollHeight;
        if (messagesList.children.length > 10)
            messagesList.firstChild.remove();
    }
    catch (err) {
        console.error(err);
    }
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    uploadImage(file);
});

async function uploadImage(file) {
    try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.post('http://192.168.29.184:3000/upload-image', formData, {
            headers: { "Authorization": token, "Content-Type": "multipart/form-data" }
        });
        const imageUrl = response.data.imageUrl;
        const messageInput = document.getElementById('message');
        messageInput.value += `![Image](${imageUrl})`;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

socket.on("message", (message) => {
    addMessageToList(message);
    if (messagesList.children.length > 10)
        messagesList.firstChild.remove();
});

function addMessageToList(message) {
    const li = document.createElement("li");
    if(message.message.startsWith("![Image]")){
        li.innerHTML = message.sender + ": " + `<img class="message-image" src="${message.message.substring(9, message.message.length - 1)}" alt="Image">`;
    }else{
        li.innerText = message.sender + ": " + message.message;
    }
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
