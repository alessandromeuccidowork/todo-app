


const taskInput = document.querySelector('#new-task'); // Add new task.

const addButton = document.querySelector('#btn-add'); 

const incompleteTaskHolder = document.querySelector("#incomplete-list");//ul of #incomplete-list
const completedTasksHolder = document.querySelector("#completed-list");// ul of #completed-list

const completedTask = document.querySelectorAll('.completed-task'); // li of .completed-task
const incompleteTask = document.querySelectorAll('li.incomplete-task'); // li of .incomplete-task

const clearButton = document.querySelector('#btn-clear'); // clear all tasks

const allTask = document.querySelector('button#btn-all'); // show all tasks
const activeTask = document.querySelector('button#btn-active');
const inactiveTask = document.querySelector('button#btn-completed');


const toggleMode = document.querySelector('#toggle-mode');
let dark = document.querySelector('#moon-svg');
let light = document.querySelector('#sun-svg');



//New task list item
const createNewTaskElement = function(taskString) {

	let listItem = document.createElement("li");
	//input (checkbox)
	let checkBox = document.createElement("input");//checkbx
	//label
	let label = document.createElement("label");//label
	//input (text)
	let editInput = document.createElement("input");//text
	//button.edit
	let editButton = document.createElement("button");//edit button
	//button.delete
	let deleteButton = document.createElement("button");//delete button

	label.innerText = taskString;

	//Each elements, needs appending
	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";//innerText encodes special characters, HTML does not.
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);		

	return listItem;
}





// Add Task.
const addTask = function() {
	console.log("Add Task...");

	//Create a new list item with the text from the #new-task:
	let listItem = createNewTaskElement(taskInput.value);
	
	listItem.classList.add('incomplete-task');

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}





//Edit an existing task.
const editTask = function(){
	console.log("Edit Task...");
	console.log("Change 'edit' to 'save'");

	let listItem = this.parentNode;

	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");
			
		//If class of the parent is .editmode
		if (containsClass) {
		//switch to .editmode
		//label becomes the inputs value.
			label.innerText = editInput.value;
		} else {
			editInput.value = label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}






//Delete task.
const deleteTask = function() { 
	console.log("Delete Task...");

    let listItem = this.parentNode;
    let ul = listItem.parentNode;

    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

	console.log(ul)
}




//Mark task completed
const taskCompleted = function() { 
	console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    let listItem = this.parentNode;

	listItem.classList.add('completed-task');
	listItem.classList.remove('incomplete-task')
	
	completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}





//Mark task as incomplete.
const taskIncomplete = function() {
    console.log("Incomplete Task...");

	
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    let listItem = this.parentNode;
	listItem.classList.add('incomplete-task');
	listItem.classList.remove('completed-task');

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}





// Delete all completed Tasks.
const clearAllTasks = function() {
	console.log("Delete all Task...");

	let listItem = this.parentNode;
	listItem = document.querySelectorAll('.completed-task');

	for (let i = 0; i < listItem.length; i++) {
		listItem[i].style.display = 'none';
	}	
}






// Tasks views 

// Show all task.
const showAllTask = function() {
	console.log('All Tasks...')

	// let allTask = document.querySelector('.tasks');
	let completed = document.querySelector('.completed-wrapper');
	let incomplete = document.querySelector('.incomplete-wrapper');

	// allTask.style.display = 'block';
	completed.classList.remove('invisible');
	incomplete.classList.remove('invisible');
}

const showActiveTask = function() {
	
	let incomplete = document.querySelector('.incomplete-wrapper');
	let completed = document.querySelector('.completed-wrapper');

		if (incomplete.className === 'incomplete-wrapper') {
			completed.classList.add('invisible');
		}
		else {
			incomplete.classList.remove('invisible');
		}

	completed.classList.toggle('invisible');

}

const showCompletedTask = function() {

	let completed = document.querySelector('.completed-wrapper');
	let incomplete = document.querySelector('.incomplete-wrapper');

		if (completed.className === 'completed-wrapper') {
			incomplete.classList.add('invisible');
		} 
		else {
			completed.classList.remove('invisible');
		};

	incomplete.classList.toggle('invisible');
}



const ajaxRequest = function() {
	console.log("AJAX Request");
}


const darkMode = function() {

	let bodyDark = document.body;
	let containsClass = bodyDark.classList.contains('dark-mode');
	let moonSvg = './images/icon-moon.svg';

	if (containsClass) {
		light.setAttribute('src', moonSvg);
	} 
	else light.setAttribute('src', './images/icon-sun.svg');

	bodyDark.classList.toggle('dark-mode');
}



//Set the click handler to the addTask function.
// addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//Set the click handler to clearAllTasks function.
clearButton.addEventListener('click', clearAllTasks);
clearButton.addEventListener("click", ajaxRequest);

// Set the click handler to views Options
allTask.addEventListener('click', showAllTask);
allTask.addEventListener("click", ajaxRequest);

activeTask.addEventListener('click', showActiveTask);
activeTask.addEventListener("click", ajaxRequest);
inactiveTask.addEventListener('click', showCompletedTask);
inactiveTask.addEventListener("click", ajaxRequest);

toggleMode.addEventListener('click', darkMode)


//The glue to hold it all together.
const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	
	console.log("bind list item events");

    //select ListItems children
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let editButton = taskListItem.querySelector("button.edit");
	let deleteButton = taskListItem.querySelector("button.delete");

	//select todo-left paragraph
	let tasksLeft = document.querySelector('#todo-left');

    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;

	// for each incompleteTask add dynamic number 
	for (let i = 0; i < incompleteTask.length; i++) {

		tasksLeft.innerHTML = (incompleteTaskHolder.children.length + ' items left');
	}
}




//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {

	//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

