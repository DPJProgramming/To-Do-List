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
};
function main() {
    var entry = getToDoItem();
    if (isValid(entry)) {
        displayToDoItems(entry);
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
    var toDoEntry = document.createElement("p");
    toDoEntry.innerText = item.task + " by " + item.dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markCompleteOrNot;
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
function markCompleteOrNot() {
    var itemDiv = this;
    this.classList.add("completed");
    var completedItems = fromId("complete-items");
    completedItems.appendChild(itemDiv);
}
