
//array list for added tasks
let tasks = [];

//variable to weight selection
// it is let because it is a dynamic variable
let selectedWeight = 0;

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

        //variable to hold the weight (in stars)
        //.repeat tells the variable to repeat the char given the value of weight
        const stars = "⭐".repeat(task.weight);

        //adds a new task to the existing column
        taskColumn.innerHTML += `
        <div class="task ${task.group.toLowerCase()}">
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
        <div class="group ${task.group.toLowerCase()}">
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
    const group = document.getElementById("group-input").value;
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
    document.getElementById("group-input").value = "";
    document.getElementById("task-input").value = "";

    selectedWeight = 0;
    stars.forEach(star => {
        star.textContent = "☆";
    });
}

//listener which runs function to add a task
document
    .getElementById("add-button")
    .addEventListener("click", addTask);