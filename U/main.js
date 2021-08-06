


const updateId = localStorage.getItem("updateId");
let data = localStorage.getItem(updateId);
const title = data.split("|")[0];
const content = data.split("|")[1];

const form = document.getElementById("form");
const documentContent = document.createElement("textarea");
const documentButton = document.createElement("input");
const documentTitle = document.createElement("input");
document.querySelector(".fas")
.addEventListener("click", () => location.href ="../index.html");

documentTitle.setAttribute("id", "title");
documentTitle.setAttribute("type", "text");
documentTitle.value = title;

documentContent.value = content;
documentContent.setAttribute("id", "content");
documentContent.setAttribute("maxlength", 20);

documentButton.setAttribute("id", "send");
documentButton.type = "submit";
documentButton.value = "Enviar";

form.appendChild(documentTitle);
form.appendChild(documentContent);
form.appendChild(documentButton);

function change() {
    localStorage.setItem(updateId, documentTitle.value + "|" + documentContent.value);
    location.href = "../index.html";
}

documentButton.addEventListener("click", event => {
    event.preventDefault();
    change();
});