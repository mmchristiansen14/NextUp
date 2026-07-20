
//arrays for tasks, groups, ...
let tasks = [];
let groups = [];

//variable to weight selection
// it is let because it is a dynamic variable
let selectedWeight = 0;
//variable to color selection
let selectedColor = "";

//this is a function
function generateTask() {

    //creates a random decimal, applies it to task list, and rounds down
    const randomIndex = Math.floor(Math.random() * tasks.length);

    //grabs element out of task array
    const selectedTask = tasks[randomIndex];

    //prints information in the developer console
    //you can view this in inspect when you right click
    //console.log(selectedTask);

    //puts the information in the specified element
    document.getElementById("selected-display").innerHTML =
        `<strong>${selectedTask.group}</strong><br>${selectedTask.task}`;
}

function displayTasks() {

    //getter for columns
    const taskColumn = document.getElementById("task-column");
    const groupColumn = document.getElementById("group-column");

    //start with empty columns
    taskColumn.innerHTML = "";
    groupColumn.innerHTML = "";

    //loop through all given tasks
    for (const task of tasks) {
        //looks through every element of groups
        //to find the name that matches task.group
        //and saves it to the variable group
        const group = groups.find(g => g.name === task.group);
        //safe gaurd
        const color = group ? group.color : "white";

        //variable to hold the weight (in stars)
        //.repeat tells the variable to repeat the char given the value of weight
        const stars = "⭐".repeat(task.weight);

        //adds a new task to the existing column
        taskColumn.innerHTML += `
        <div class="task"
            style="background-color: ${group.color}">
        <p>${task.task}</p>
        <div class="stars">
                ${stars}
            </div>
        </div>
        `;
        //task.task calls the specific task
        //task.group calls the group name and makes it a class
        // ${...} calls and placeholds a specified object that is subject to change

        groupColumn.innerHTML += `
        <div class="group"
            style="background-color: ${group.color}">
            <p>${task.group}</p>
        </div>
        `;
        // task. acts as an access modifier 
        // to call the different groups of a task (task, weight, group)
    }
}

//document relates to the webpage itself
document
    .getElementById("generate-button") //find button
    .addEventListener("click", generateTask); //on click, run this function

displayTasks();

function displayGroups() {
    const groupSelect = document.getElementById("group-select");
    groupSelect.innerHTML = "";

    //sets original to select a group
    groupSelect.innerHTML = `
        <option value="">
            Select a Group
        </option>
    `;

    //inner HTML is used for "drawing" something on the webpage
    for (const group of groups) {
        groupSelect.innerHTML += `
        <option value="${group.name}">
            ${group.name}
        </option>
    }
    `;
    }
}

document
    .getElementById("new-group-button")
    .addEventListener("click", createGroup);
displayGroups();

function createGroup() {
    const groupPopup = document.getElementById("group-popup");
    groupPopup.style.display = "flex";
}

//constructor function
function saveGroup() {
    const newGroupName = document.getElementById("new-group-name").value;

    const newGroup = {
        name: newGroupName,
        color: selectedColor
    };

    //appends new group to array
    groups.push(newGroup);

    displayGroups();
    closePopup();
    document.getElementById("new-group-name").value = "";
}

document
    .getElementById("create-group-button")
    .addEventListener("click", saveGroup);

const circles = document.querySelectorAll(".color-circle");

circles.forEach(circle => {

    circle.addEventListener("click", () => {

        selectedColor = circle.dataset.color;

        circles.forEach(c => {
            c.classList.remove("selected-color");
        });

        circle.classList.add("selected-color");

    });

});

//stores all possible stars in variable stars
const stars = document.querySelectorAll(".star");

stars.forEach(star => {

    star.addEventListener("click", () => {

        //gets weight from stored star value
        selectedWeight = Number(star.dataset.value);

        //means when you click on a star, do this
        stars.forEach(s => {
            if (s.dataset.value <= selectedWeight) {
                s.textContent = "⭐";
            } else {
                s.textContent = "☆";
            }
        });

    });

});

function addTask() {

    //.value asks for the user input
    const group = document.getElementById("group-select").value;
    const taskName = document.getElementById("task-input").value;

    //creates new task variable storage format
    const newTask = {
        group: group,
        task: taskName,
        weight: selectedWeight
    };

    //creates the new task
    tasks.push(newTask);

    displayTasks();

    //reset the input boxes and stars
    document.getElementById("group-select").value = "";
    document.getElementById("task-input").value = "";

    selectedWeight = 0;
    stars.forEach(star => {
        star.textContent = "☆";
    });
}

function closePopup() {

    document.getElementById("group-popup").style.display = "none";

}

//listener for close button on popup
document
    .getElementById("close-popup")
    .addEventListener("click", closePopup);

//listener which runs function to add a task
document
    .getElementById("add-button")
    .addEventListener("click", addTask);

