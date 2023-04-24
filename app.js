//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".add-item__task");
var addButton = document.querySelectorAll(".btn")[0];
var incompleteTaskHolder = document.querySelector(".todo__item");
var completedTasksHolder = document.querySelector(".completed-tasks");

//New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.classList.add("list-item");
  
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
 
  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("btn-delete__img");

  label.innerText = taskString;
  label.classList.add("task");
  label.classList.add("todo__label");

  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");
  editInput.type = "text";
  editInput.classList.add("task");
  editInput.classList.add("input-task");

  editButton.innerText = "Edit";
  editButton.className = "btn-edit";
  editButton.classList.add("btn");

  deleteButton.className = "btn-delete";
  deleteButton.classList.add("btn");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function () {
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

//Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".input-task");
  var label = listItem.querySelector(".todo__label");
  var editBtn = listItem.querySelector(".btn-edit");
  var containsClass = listItem.classList.contains("list_edit");

  if (containsClass) {
    label.innerText = editInput.value
    editBtn.innerText = "Edit"
  } else {
    editInput.value = label.innerText
    editBtn.innerText = "Save"
  }

  listItem.classList.toggle("list_edit");
}

//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  listItem.children[1].classList.add("completed__label");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function () {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  listItem.children[1].classList.remove("completed__label");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
  console.log("AJAX Request")
}


addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".checkbox");
  var editButton = taskListItem.querySelector(".btn-edit");
  var deleteButton = taskListItem.querySelector(".btn-delete");

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted)
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete)
}

//Change edit to save when you are in edit mode.
