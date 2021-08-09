"use strict";

const title = document.getElementById("title");
const content = document.getElementById("content");
const form = document.getElementById("form");
const send = document.getElementById("send");
const gridConteiner = document.getElementById("grid-conteiner");


const lStorage = window.localStorage;
const sStorage = window.sessionStorage;
let change = true;

send.addEventListener("click", () => {
    const data = {
        "title": title.value,
        "content": content.value
    };
    if (parseInt(lStorage.getItem("contatore")) < 10 || !lStorage.getItem("contatore")) {
        if (!lStorage.getItem("contatore")) lStorage.setItem("contatore", 1);
        else lStorage.setItem("contatore", parseInt(lStorage.getItem("contatore")) + 1);
        lStorage.setItem(lStorage.getItem("contatore"), `${data.title} | ${data.content}`);
    }
    else {
        alert("¡No puedes crear más de 10 mensajes!, Si quieres escribir más tendrás que eliminar otro");
    }
});

function deleteOne(id) {
    const contatore = lStorage.getItem("contatore");
    lStorage.removeItem(id);
    lStorage.setItem("contatore", contatore - 1);
    gridConteiner.removeChild(gridConteiner.querySelector(`[id="${id}"]`));
    for (let i = id; i < contatore; i++) {
        lStorage.setItem(i, lStorage.getItem(i + 1));
    }
    change = false;
    setTimeout(() => change = true, 100);
}

function loadData() {
    const contatore = lStorage.getItem("contatore");
    for (let i = 1; i <= parseInt(contatore); i++) {
        const div = document.createElement("div");
        let separate = lStorage.getItem(i).split("|");
        const title = document.createElement("h3");
        title.innerHTML = separate[0];
        const content = document.createElement("p");
        content.innerHTML = separate[1];
        const remove = document.createElement("button");
        remove.innerHTML = "Eliminar";
        remove.classList.add("removeOne")
        div.setAttribute('id', i);
        div.appendChild(title);
        div.appendChild(content);
        div.appendChild(remove);
        gridConteiner.appendChild(div);
    }
}

function update(id) {
    if (change) {
        lStorage.setItem("updateId", id);
        location.href = "./U/index.html";
    }
}

loadData();

if (lStorage.getItem("contatore") <= 0) {
    lStorage.removeItem("contatore");
}

const deleteButton = gridConteiner.querySelectorAll("button");
for (let i = 1; i <= deleteButton.length; i++) {
    deleteButton[i - 1].addEventListener("click", () => deleteOne(i));
}

const gridChilds = gridConteiner.children;
for (let i = 0; i < gridChilds.length; i++) {
    gridChilds[i].addEventListener("click", () => { update(i + 1) })
}