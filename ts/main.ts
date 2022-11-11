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
    let entry:ToDoItem = getToDoItem();

    if(isValid(entry)){
        displayToDoItems(entry);
    }
}

/**
 * check if data is valid
 */
function isValid(item:ToDoItem):boolean{
    let valid = true;
    let taskOkay:boolean = true;
    let dateOkay:boolean = true;

    //task validation
    if(item.task == "" || /^[0-9., ]+$/.test(item.task)){
        let taskError:HTMLElement = document.createElement("h3");

        if(fromId("task-error") == null){
            taskError.setAttribute("id", "task-error");
            taskError.innerText = "Enter a task, and not just a number.";
            (fromId("entry-data")).appendChild(taskError);
        }
        valid = false;
        taskOkay = false;
    }
   
    //date validation
    if( (fromId("due-date")).value == "" || !(Date.parse(fromId("due-date").value))){
        let dateError:HTMLElement = document.createElement("h3");
        
        if(fromId("date-error") == null){
            dateError.setAttribute("id", "date-error");
            dateError.innerText = "Due date required";
            (fromId("entry-data")).appendChild(dateError);
        }
        valid = false;
        dateOkay = false;
    }
   
    //remove error if entry is valid
    if(fromId("task-error") != null && taskOkay == true){
        fromId("task-error").remove();
    }
    if(fromId("date-error") != null && dateOkay == true){
        fromId("date-error").remove();
    }
    return valid;
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

    //make an h3 and set text to task and due date 
    let toDoEntry:HTMLElement = document.createElement("p");
    toDoEntry.innerText = item.task + " by " + item.dueDate.toDateString();

    //div class="completed" and "todo" and click
    let itemDiv = document.createElement("div");
    itemDiv.onclick = markCompleteOrNot;
    itemDiv.classList.add("todo");
    if(item.isComplete){
        itemDiv.classList.add("completed");
    }

    //add entry to itemDiv
    itemDiv.appendChild(toDoEntry);

    //display itemDiv in appropriate list
    if(item.isComplete){
        (fromId("complete-items")).appendChild(itemDiv);
    }
    else{
        (fromId("incomplete-items")).appendChild(itemDiv);
    }
}

function markCompleteOrNot(){
    let itemDiv = <HTMLElement>this;
    this.classList.add("completed");

    let completedItems = fromId("complete-items");
    completedItems.appendChild(itemDiv);
}

