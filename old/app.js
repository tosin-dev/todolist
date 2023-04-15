$(document).ready(function() {

	// add task
	$("#addButton").on('click', function() {
		const newTaskDescription = $("#newTask").val();
		const d = new Date()
		const task2 = {id:d.getTime(), label:newTaskDescription}
		tasks.push(task2);
		localStorage.setItem("tasks", JSON.stringify(tasks))
		$("#newTask").val("")

		showTasks()
	});

	// edit task
	$("#my_tasks").on('click', "button.editButton", function() {
		// get the existing task
		const id = $(this).attr('id').slice(10);

		const i = tasks.findIndex(function(t) {
			return id == t.id;
		});

		const taskToEdit = tasks[i]
		
		// show old label in the input button
		$("#newTask").val(taskToEdit.label)

		// save the task id in the hidden input field for the next request
		$("#task_id").val(taskToEdit.id)
	})

	// update task
	$("#updateButton").on('click', function() {
		// get the updated label
		const updatedTaskLabel = $("#newTask").val();
		
		// find the task to update
		const id = $("#task_id").val();

		const i = tasks.findIndex(function(t) {
			return id == t.id;
		});

		const taskToUpdate = tasks[i]

		// update the label of the task to the new value
		taskToUpdate.label = updatedTaskLabel;

		// replace the old task with the new one in the array
		tasks[i] = taskToUpdate;

		localStorage.setItem("tasks", JSON.stringify(tasks))

		$("#newTask").val("")
		$("#task_id").val("")

		showTasks()
	});

	// complete task
	$("#my_tasks").on('click', "button.completedButton", function() {
		const id = $(this).attr('id');

		// find the task with this ID 
		const i = tasks.findIndex(function(t) {
			return id == t.id;
		});

		// and delete it from the list
		tasks.splice(i, 1);

		// update localStorage
		localStorage.setItem("tasks", JSON.stringify(tasks))

		// reload the updated list
		showTasks();
	})

	// show tasks
	function showTasks() {
		const getTasks = localStorage.getItem("tasks")
		let myTasks = JSON.parse(getTasks)

		let myTasksList = "";

		myTasks.forEach(function(task) {
			myTasksList += `
				<li>
					${task.label}
					<button type="button" id="${task.id}" class="completedButton">Completed</button>
					<button type="button" id="editButton${task.id}" class="editButton">Edit</button>
				</li>
			`
		})

		$("#my_tasks").html(myTasksList);
	}

	const tasks = [];

	localStorage.setItem("tasks", JSON.stringify(tasks))

	showTasks()
});


