const form = document.querySelector("form");
const token = localStorage.getItem("token");
const groupId = localStorage.getItem("groupId");
const groupName = localStorage.getItem("groupName");

async function fetchAllMessages() {
    const memberList = document.getElementById("members");
    const messagesList = document.getElementById("all-messages");
    try {
        const p1 = axios.get(`http://127.0.0.1:3000/get-all-messages/${groupId}`, { headers: { "Authorization": token } });
        const p2 = axios.get(`http://127.0.0.1:3000/get-all-members/${groupId}`, { headers: { "Authorization": token } });
        const [allMessagesResponse, membersResponse] = await Promise.all([p1, p2]);
        const newMessages = allMessagesResponse.data.message;
        const allMembers = membersResponse.data.message.map(member => `${member}`).join('\n');
        memberList.innerHTML = allMembers;
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
        await axios.post(`http://127.0.0.1:3000/send-group-message/${groupId}`, { message }, { headers: { "Authorization": token } });
        document.location.reload();
    }
    catch (err) {
        console.error(err);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const navBar = document.getElementById("nav-bar");
    try {
        if (!token) {
            alert("You are not logged in!");
            document.location.href = "/login";
        }
        else {
            const li = document.createElement("li");
            li.innerHTML = `<a class="active" href="/group/${groupId}">${groupName}</a>`;
            navBar.appendChild(li);
            fetchAllMessages();
            setInterval(fetchAllMessages, 1000);
        }
    }
    catch (err) {
        console.error(err);
    }
});

