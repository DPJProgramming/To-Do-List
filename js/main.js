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
    if (isValid()) {
        displayToDoItems(getToDoItem());
    }
}
function isValid() {
    if () { }
    return true;
}
function getToDoItem() {
    var item = new ToDoItem();
    item.task = ((fromId("task"))).value;
    item.dueDate = new Date((fromId("due-date")).value);
    item.isComplete = fromId("complete").checked;
    return item;
}
function displayToDoItems(item) {
}
