const svg = '<svg width="33" height="33" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#FF0000"/><line x1="9.70711" y1="9.00002" x2="23" y2="22.2929" stroke="#FF0000" stroke-linecap="round"/><line x1="9" y1="22.2929" x2="22.2929" y2="9" stroke="#FF0000" stroke-linecap="round"/></svg>';

let input = document.querySelector(".input");
let submit = document.querySelector(".button");
let listDiv = document.querySelector(".list");
let tot = document.querySelector("#totalSpan");

let arrayOfItems = [];

function updateTotalCount() {
    tot.textContent = arrayOfItems.length;
}

if (localStorage.getItem("list")) {
    arrayOfItems = JSON.parse(localStorage.getItem("list"));
    addToPage(arrayOfItems);
    updateTotalCount();
}

submit.onclick = function () {
    if (input.value.trim() !== "") {
        addItemToArray(input.value.trim());
        input.value = "";
    }
};

function addItemToArray(itemTitle) {
    const item = {
        id: Date.now(),
        text: itemTitle,
        complate: false
    };
    arrayOfItems.push(item);
    addToPage([item]);
    addItemToLocalStorage(arrayOfItems);
    updateTotalCount();
}


function addToPage(arrayOfItems) {
    arrayOfItems.forEach((item) => {
        let div = document.createElement("div");
        div.className = "item";
        if (item.complate) {
            div.className = "item done";
        }
        div.setAttribute("item-id", item.id);
        div.appendChild(document.createTextNode(item.text));
        const span = document.createElement("span");
        span.className = "del";
        span.innerHTML = svg;
        div.appendChild(span);
        listDiv.appendChild(div);
    });

    addClickHandlers();
}


function addItemToLocalStorage(arrayOfItems) {
    window.localStorage.setItem("list", JSON.stringify(arrayOfItems));
}

function addClickHandlers() {
    const deleteButtons = document.querySelectorAll('.del');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const itemDiv = deleteButton.parentElement;
            const itemId = itemDiv.getAttribute('item-id');
            arrayOfItems = arrayOfItems.filter(item => item.id.toString() !== itemId);
            itemDiv.remove();
            addItemToLocalStorage(arrayOfItems);
            updateTotalCount();
        });
    });
}
