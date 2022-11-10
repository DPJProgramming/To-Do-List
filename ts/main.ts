// @ts-ignore
const picker = datepicker("#due-date");
picker.setMin(new Date());

class ToDoItem{
    task:string;
    dueDate:Date;
    isComplete:boolean
}

//documnet.getElementById shortcut
function fromId(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

window.onload = function():void{
    let addItem:HTMLElement = fromId("add-item");
    addItem.onclick = main; 
}

function main():void{
    if(isValid()){
        displayToDoItems(getToDoItem())
    }
}

/**
 * check if data sent to function is valid
 */
function isValid():boolean{
    //task validation
    if(){}

    //date validation
    return true;
}

/**
 * Get ToDoItem object
 */
function getToDoItem():ToDoItem{
    //create new object with info from user
    let item = new ToDoItem();
    item.task = ((fromId("task"))).value;
    item.dueDate = new Date((fromId("due-date")).value);
    item.isComplete = fromId("complete").checked;

    return item;
}

/**
 * displays given ToDoItem on the web page
 */
function displayToDoItems(item:ToDoItem):void{

}

