const tasks = ["Exercise", "Bathe Children", "cook", "School Runs", "Work on Project"]

localStorage.setItem("tasks", JSON.stringify(tasks))

tasks.push("volunteer service")
tasks[2]= "Prepare Food"
tasks.splice(3, 1)
localStorage.setItem("tasks", JSON.stringify(tasks))

let getTasks = localStorage.getItem("tasks")
let splitTasks = JSON.parse(getTasks)

console.log(splitTasks)

function showTasks() {
	document.getElementById("tasks").innerHTML = "";
	for (let i=0; i<splitTasks.length; i++) {
		let toDoList0=document.getElementById("tasks").innerHTML
		document.getElementById("tasks").innerHTML = toDoList0 + "<li>" + splitTasks[i] + "</li>"
	}
}

function addNewTask() {
	let newTask = document.getElementById("newTask").value;
	splitTasks.push(newTask);
	// console.log(splitTasks)
	localStorage.setItem("tasks", JSON.stringify(splitTasks))
	showTasks()
}

showTasks()
