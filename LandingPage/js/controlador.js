
const users = [
    { username: "usuario1", password: "123", name: "Usuario Uno" },
    { username: "usuario2", password: "456", name: "Usuario Dos" }
];

const contacts = [
    { id: 1, name: "Contacto 1" },
    { id: 2, name: "Contacto 2" }
];

const loremIpsum = 'lorem ipsum fdsfsdfsdfsdfsdfsdfsdfsdfsdfsdf';

let currentContactId = null;

function showMainScreen(username) {
    document.getElementById("user-display").textContent = username;
    document.querySelector(".login-container").style.display = "none";
    document.querySelector(".main-container").style.display = "flex";
    showChats();
}

function showChats() {
   const chatList = document.getElementById("chat-list");
    chatList.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">123</a>
    </div>
  </div>`;

    /*for (let i = 1; i <= 5; i++) { const conversation =
        document.createElement("div"); conversation.classList.add("conversation");
        conversation.textContent = `Conversación ${i}`; const messages =
        document.createElement("div"); messages.classList.add("messages");
        messages.innerHTML = `
        <p>${loremIpsum}</p>
        `; conversation.appendChild(messages); chatList.appendChild(conversation); }*/


    showSection("chat-list");
    hideBackButton();
}

function showGroups() {
    const groupList = document.getElementById("group-list");
    groupList.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">456</a>
    </div>
  </div>`; 

    /*for (let i = 1; i <= 5; i++) {
        const group = document.createElement("div");
        group.classList.add("group");
        group.textContent = `Grupo ${i}`;

        const messages = document.createElement("div");
        messages.classList.add("messages");
        messages.innerHTML = `<p>${loremIpsum}</p>`;

        group.appendChild(messages);
        groupList.appendChild(group);
    }*/

    showSection("group-list");
    hideBackButton();
}

function showCalls() {
   const callList = document.getElementById("call-list");
    callList.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">678</a>
    </div>
  </div>`; 

    /*const callTypes = ["Recibida", "Negada"];
    for (let i = 1; i <= 5; i++) {
        const call = document.createElement("div");
        call.classList.add("call");
        call.textContent = `Llamada ${i}`;

        const type = document.createElement("span");
        type.classList.add("call-type");
        type.textContent = callTypes[Math.floor(Math.random() * callTypes.length)];

        call.appendChild(type);
        callList.appendChild(call);
    }*/

    showSection("call-list");
    hideBackButton();
}


function showLogoutConfirmation() {
    const logoutSection = document.getElementById("logout-section");
    logoutSection.innerHTML = "";

    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = "¿Estás seguro de que quieres salir?";
    logoutSection.appendChild(confirmationMessage);

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Sí, salir";
    confirmButton.addEventListener("click", logout);
    logoutSection.appendChild(confirmButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener("click", hideLogoutConfirmation);
    logoutSection.appendChild(cancelButton);

    showSection("logout-section");
}


function hideLogoutConfirmation() {
    const logoutSection = document.getElementById("logout-section");
    logoutSection.innerHTML = "";
}

function logout() {
    currentContactId = null;
    hideLogoutConfirmation();
    hideBackButton();
    document.querySelector(".main-container").style.display = "none";
    document.querySelector(".login-container").style.display = "block";
}


function showBackButton() {
    const backButton = document.querySelector(".back-btn");
    backButton.style.display = "block";

    
    if (currentContactId) {
        backButton.classList.add("round");
        backButton.classList.remove("square");
    } else {
        backButton.classList.add("square");
        backButton.classList.remove("round");
    }
}


function hideBackButton() {
    const backButton = document.querySelector(".back-btn");
    backButton.style.display = "none";
}
function goBack() {
    currentContactId = null;
    hideBackButton();
    showChats(); 
}

function showSection(sectionId) {
    const sections = ["chat-list", "group-list", "call-list", "logout-section"];
    sections.forEach(section => {
        if (section === sectionId) {
            document.getElementById(section).style.display = "block";
        } else {
            document.getElementById(section).style.display = "none";
        }
    });
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        showMainScreen(user.name);
    } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
}



