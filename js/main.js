var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
function fromId(id) {
    return document.getElementById(id);
}
window.onload = function () {
    var addItem = fromId("add-item");
    addItem.onclick = main;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = loadToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        displayToDoItems(itemArray[i]);
    }
}
function main() {
    var entry = getToDoItem();
    if (isValid(entry)) {
        (fromId("task")).value = "";
        (fromId("due-date")).value = "";
        (fromId("complete")).checked = false;
        displayToDoItems(entry);
        saveToDoItem(entry);
    }
}
function isValid(item) {
    var valid = true;
    var taskOkay = true;
    var dateOkay = true;
    if (item.task == "" || /^[0-9., ]+$/.test(item.task)) {
        var taskError = document.createElement("h3");
        if (fromId("task-error") == null) {
            taskError.setAttribute("id", "task-error");
            taskError.innerText = "Enter a task, and not just a number.";
            (fromId("entry-data")).appendChild(taskError);
        }
        valid = false;
        taskOkay = false;
    }
    if ((fromId("due-date")).value == "" || !(Date.parse(fromId("due-date").value))) {
        var dateError = document.createElement("h3");
        if (fromId("date-error") == null) {
            dateError.setAttribute("id", "date-error");
            dateError.innerText = "Due date required";
            (fromId("entry-data")).appendChild(dateError);
        }
        valid = false;
        dateOkay = false;
    }
    if (fromId("task-error") != null && taskOkay == true) {
        fromId("task-error").remove();
    }
    if (fromId("date-error") != null && dateOkay == true) {
        fromId("date-error").remove();
    }
    return valid;
}
function getToDoItem() {
    var item = new ToDoItem();
    item.task = (fromId("task")).value;
    item.dueDate = new Date((fromId("due-date")).value);
    item.isComplete = fromId("complete").checked;
    return item;
}
function displayToDoItems(item) {
    var itemDate = new Date(item.dueDate.toString());
    var toDoEntry = document.createElement("p");
    toDoEntry.innerText = item.task + " " + itemDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markComplete;
    itemDiv.classList.add("todo");
    if (item.isComplete) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(toDoEntry);
    if (item.isComplete) {
        (fromId("complete-items")).appendChild(itemDiv);
    }
    else {
        (fromId("incomplete-items")).appendChild(itemDiv);
    }
}
function markComplete() {
    if (this.classList.contains("completed")) {
        this.classList.add("todo");
        this.classList.remove("completed");
        fromId("incomplete-items").appendChild(this);
    }
    else {
        this.classList.add("completed");
        this.classList.remove("todo");
        fromId("complete-items").appendChild(this);
    }
}
function saveToDoItem(item) {
    var currItems = loadToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemString = JSON.stringify(currItems);
    localStorage.setItem("todo entry", currItemString);
}
function loadToDoItems() {
    var items = JSON.parse(localStorage.getItem("todo entry"));
    return items;
}
