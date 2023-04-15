$(document).ready(function() {

	$("button").on('click', function() {
		const newTaskDescription = $("#newTask").val();
		tasks.push(newTaskDescription);
		localStorage.setItem("tasks", JSON.stringify(tasks))
		$("newTask").val("")

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
					${task}
					<button type="button" class="alertButton">Completed</button>
				</li>
			`
		})

		$("#my_tasks").html(myTasksList);
	}

	const tasks = [];

	localStorage.setItem("tasks", JSON.stringify(tasks))

	// showTasks()
});


