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
    let addItem:HTMLElement = <HTMLElement>fromId("add-item");
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
   

    //date validation
    return true;
}

/**
 * Get ToDoItem object
 */
function getToDoItem():ToDoItem{
    //create new object with info from user
    let item = new ToDoItem();

    //set object variables to user input
    item.task = (fromId("task")).value;
    item.dueDate = new Date((fromId("due-date")).value);
    item.isComplete = fromId("complete").checked;

    return item;
}

/**
 * displays given ToDoItem on the web page
 */
function displayToDoItems(item:ToDoItem):void{

    //display task as item text
    let itemTask = document.createElement("h3");
    itemTask.innerText = item.task;
    
    //display date due by as item text
    let date = document.createElement("h3");
    date.innerText = item.dueDate.toDateString();

    //div class="completed"
    let itemDiv = document.createElement("div");
    if(item.isComplete){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemTask);
    itemDiv.appendChild(date);

    if(item.isComplete){
        (fromId("complete-items")).appendChild(itemDiv);
    }
    else{
        (fromId("incomplete-items")).appendChild(itemDiv);
    }
    
}

