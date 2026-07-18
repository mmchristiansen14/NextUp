
//array list
const tasks = [
    "Read chapter 3",
    "Finish problems",
    "Run 2 miles",
    "Finish website"
];

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
    document.getElementById("selected-display").textContent = selectedTask;

}

document
    .getElementById("generate-button") //find button
    .addEventListener("click", generateTask); //on click, run this function
