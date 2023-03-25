$(document).ready(function() {

	$("#addButton").on('click', function() {
		const newTaskDescription = $("#newTask").val();
		const d = new Date()
		const task2 = {id:d.getTime(), label:newTaskDescription}
		tasks.push(task2);
		localStorage.setItem("tasks", JSON.stringify(tasks))
		$("#newTask").val("")

		showTasks()
	});

	$(".alertButton").on('click', function() {
	alert("Task Done")

	})
	
	function showTasks() {
		const getTasks = localStorage.getItem("tasks")
		let myTasks = JSON.parse(getTasks)

		let myTasksList = "";

		myTasks.forEach(function(task) {
			myTasksList += `
				<li>
					${task.label}
					<button type="button" id="${task.id}" class="alertButton">Completed</button>
				</li>
			`
		})

		$("#my_tasks").html(myTasksList);
	}

	const tasks = [];

	localStorage.setItem("tasks", JSON.stringify(tasks))

	showTasks()
});


