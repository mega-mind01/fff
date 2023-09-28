let addTask = document.getElementById("add-task");
let feedBack = document.getElementById("feedBack");
let taskEntry = document.getElementById("task-input");
let removeTask = document.getElementById("remove-task");
let taskList = document.getElementById("task-list");
let taskStat = document.getElementById("taskStat");
let btnConfirm = document.getElementById("confirmStatus");
let showCompleted = document.getElementById("show-completed");
let completedTasksContainer = document.getElementById("completed-tasks-container");
// let btnDeleteCompletedTask = document.getElementById("delete");
let toggleFlag = true;

taskStat.style.display = "none";
btnConfirm.style.display = "none";
// btnDeleteCompletedTask.style.display = "none";

addTask.addEventListener("click", taskUpdate);
removeTask.addEventListener("click", removeMe);

function checkEntry() {
    let flag = true;
    if (taskEntry.value === "") {
        flag = false;
    }
    return flag;
}

function taskUpdate() {
    if (checkEntry()) {
        feedBack.innerHTML = "";
        if (localStorage.getItem("toDoList") === null) {
            let toDoList = [];
            toDoList.push(taskEntry.value);
            localStorage.setItem("toDoList", JSON.stringify(toDoList));
            feedBack.innerHTML = "Task saved successfully";
        } else {
            let toDoList = JSON.parse(localStorage.getItem("toDoList"));
            toDoList.push(taskEntry.value);
            localStorage.setItem("toDoList", JSON.stringify(toDoList));
            feedBack.innerHTML = "Task saved successfully";
        }
        taskEntry.value = "";
        displayToDo();
    } else {
        feedBack.innerHTML = "Please provide a task to save";
    }
}

function removeMe() {
    let toRemove = taskEntry.value;
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    let taskIndex = toDoList.indexOf(toRemove);
    if (taskIndex !== -1) {
        toDoList.splice(taskIndex, 1);
        feedBack.innerHTML = "Task removed successfully";
    } else {
        feedBack.innerHTML = "Oops! The task is not on the list";
    }
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    taskEntry.value = "";
    taskStat.style.display = "none";
    btnConfirm.style.display = "none";

    displayToDo();
}

function displayToDo() {
    taskList.innerHTML = "";
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    if (toDoList !== null) {
        toDoList.forEach(option => {
            const li = document.createElement("li");
            li.innerHTML = option;
            taskList.appendChild(li);
            li.addEventListener("click", taskStatus);
        });
    }
}

function taskStatus(event) {
    const selectedTask = event.target.textContent;
    taskStat.style.display = "block";
    btnConfirm.style.display = "block";
    taskEntry.value = selectedTask;
    taskStat.innerHTML = selectedTask;
    btnConfirm.addEventListener("click", function () {
        doneTask(selectedTask);
    });
}

function doneTask(param) {
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    let completedTask = JSON.parse(localStorage.getItem("completedTask"));
    let taskIndex = toDoList.indexOf(param);
    if (taskIndex !== -1) {
        toDoList.splice(taskIndex, 1);
        completedTask.push(param);
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
        localStorage.setItem("completedTask", JSON.stringify(completedTask));
        taskStat.style.display = "none";
        btnConfirm.style.display = "none";
        displayToDo();
        displayCompletedTasks();
    }
}

showCompleted.addEventListener("click", function () {
    if (toggleFlag) {
        displayCompletedTasks();
        toggleFlag = false;
    } else {
        completedTasksContainer.style.display = "none";
        toggleFlag = true;
    }
});

function displayCompletedTasks() {
    completedTasksContainer.innerHTML = "";
    let completedTask = JSON.parse(localStorage.getItem("completedTask"));
    if (completedTask.length > 0) {
        //   btnDeleteCompletedTask.style.display = "block";
        completedTask.forEach(input => {
            const taskElement = document.createElement("div");
            taskElement.textContent = input;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", function () {
                removeCompletedTask(input);
            });
            completedTasksContainer.appendChild(taskElement);
            completedTasksContainer.appendChild(removeButton);
        });
        completedTasksContainer.style.display = "block";
    } else {
        completedTasksContainer.innerHTML = "No completed tasks.";
    }
}

function removeCompletedTask(task) {
    let completedTask = JSON.parse(localStorage.getItem("completedTask"));
    let taskIndex = completedTask.indexOf(task);
    if (taskIndex !== -1) {
        completedTask.splice(taskIndex, 1);
        localStorage.setItem("completedTask", JSON.stringify(completedTask));
        displayCompletedTasks();
    }
}

displayToDo();