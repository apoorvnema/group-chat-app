const form = document.querySelector("form");
const token = localStorage.getItem("token");

async function fetchAllMessages() {
    const onlineUsersList = document.getElementById("online-users");
    const messagesList = document.getElementById("all-messages");
    try {
        const p1 = axios.get("http://127.0.0.1:3000/all", { headers: { "Authorization": token } });
        const p2 = axios.get("http://127.0.0.1:3000/online-users", { headers: { "Authorization": token } });
        const [allMessagesResponse, onlineUsersResponse] = await Promise.all([p1, p2]);
        const newMessages = allMessagesResponse.data.message;
        const onlineUsers = onlineUsersResponse.data.message.map(user => `${user} joined`).join('\n');
        onlineUsersList.textContent = onlineUsers;
        const storedMessages = localStorage.getItem("messages");
        const allMessages = [...newMessages];
        const last10Messages = allMessages.slice(-10);
        let messageContent = '';
        if (storedMessages) {
            JSON.parse(storedMessages).forEach((message) => {
                messageContent += `${message.sender}: ${message.message}\n`;
            });
        }
        else {
            last10Messages.forEach((message) => {
                messageContent += `${message.sender}: ${message.message}\n`;
            });
        }
        messagesList.textContent = messageContent;
        localStorage.setItem("messages", JSON.stringify(last10Messages));
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

form.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        const message = e.target.message.value;
        await axios.post("http://127.0.0.1:3000/", { message }, { headers: { "Authorization": token } });
        document.location.reload();
    }
    catch (err) {
        console.error(err);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    try {
        if (!token) {
            alert("You are not logged in!");
            document.location.href = "/login";
        }
        else {
            await axios.post("http://127.0.0.1:3000/set-online", {}, { headers: { "Authorization": token } });
        }
        fetchAllMessages();
        setInterval(fetchAllMessages, 1000);
    }
    catch (err) {
        console.error(err);
    }
});

window.addEventListener('beforeunload', setOfflineUser);

async function setOfflineUser(e) {
    try {
        await axios.post("http://127.0.0.1:3000/set-offline", {}, { headers: { "Authorization": token } });
    } catch (error) {
        alert("Error sending offline status:", error);
    }
}

