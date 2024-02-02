// Consts
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

const optionBtn = document.getElementById('option-btn');
const clearMenu = document.getElementById('clear-menu');
// List selector buttons
const listSelector = [
    list1 = document.getElementById('list-1'),
    list2 = document.getElementById('list-2'),
    list3 = document.getElementById('list-3'),
    list4 = document.getElementById('list-4'),
    list5 = document.getElementById('list-5')
];
// Saved States
const datas = ['data1','data2','data3','data4','data5'];
// On reload go to list 1
let stated = 1;
let option = 0;
// Task creation function
function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
    showTask();
}
// Task completed function
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        showTask();
    }
}, false);
// Save data to local function
function saveData() {
    for (var i = 1; i <= 5; i++) {
        if (stated === i) {
            localStorage.setItem(datas[i-1], listContainer.innerHTML);
        }
    }
}
// Load data from local function
function showTask() {
    listContainer.innerHTML = null;
    for (var i = 1; i <= 5; i++) {
        if (stated === i) {
            listContainer.innerHTML = localStorage.getItem(datas[i-1]);
            listSelector[i-1].style.textDecoration = "underline";
        } else {
            listSelector[i-1].style.textDecoration = "none";
        }
    }
    for (var i = 0; i < 5; i++) {
        if (localStorage.getItem(datas[i]) == "" || localStorage.getItem(datas[i]) == null) {
            listSelector[i].classList.remove("used");
        } else {
            listSelector[i].classList.add("used");
        }
    }
}
// Set the selected list
function setState(state) {
    stated = state;
    for (var i = 1; i <= 5; i++) {
        if (state === i) {
            listContainer.innerHTML = localStorage.getItem(datas[i-1]);
        }
    }
    showTask();
}
// Clear all local storage
function clearLists() {
    localStorage.clear();
    showTask();
}
// Clear local storage of list item
function clearList(li) {
    for (var i = 1; i <= 5; i++) {
        if (li === i) {
            localStorage.setItem(datas[i-1], "");
        }
    }
    showTask();
}
function openOptions() {
    if (option != 0) {
        clearMenu.classList.add("hidden");
        option--;
    } else {
        clearMenu.classList.remove("hidden");
        option++;
    }
}
// On page load show local saved data
showTask();