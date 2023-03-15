const tasks = [
	// {
	// 	description: "Exercise",
	// 	isCompleted: false
	// },
	// {
	// 	description: "Bathe Children",
	// 	isCompleted: false
	// }
];

localStorage.setItem("tasks", JSON.stringify(tasks))

let getTasks = localStorage.getItem("tasks")
let myTasks = JSON.parse(getTasks)

function showTasks() {
	let myTasksList = "";

	for (let i=0; i<myTasks.length; i++) {
		myTasksList += `
			<tr>
				<td>${myTasks[i].description}</td>
				<td>
					<button type="button" class="completed" onclick="markAsCompleted(event)">Completed</button>
				</td>
			</tr>`
	}

	document.getElementById("my_tasks").innerHTML = myTasksList
}

function addNewTask() {
	const inputField = document.getElementById("newTask");
	const newTask = {description: inputField.value, isCompleted: false};
	myTasks.push(newTask);
	localStorage.setItem("tasks", JSON.stringify(myTasks))
	inputField.value = ""

	showTasks()
}

function markAsCompleted(e) {
	let td = e.target.parentElement.previousElementSibling;
	let t = td.innerHTML
	td.innerHTML = `<s>${t}</s>`
	e.target.disabled = true;
}

showTasks()