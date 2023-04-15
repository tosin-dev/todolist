$(document).ready(function() {

	let max = 1;

	$("#entriesCount").on('input', function() {
		max = $(this).val()
		// console.log(max)
	})

	// add task
	$("#tasksForm").on('submit', function(e) {
		e.preventDefault();
		const label = $("#newTask").val();

		for (let c = 1; c <= max; c++) {
			let task = _makeNewTask(c, label);
			tasks.push(task);
		}

		localStorage.setItem("tasks", JSON.stringify(tasks))
		$("#newTask").val("")

		showTasks(tasks)
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

		showTasks(tasks)
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
		showTasks(tasks);
	})

	$("#clearButton").on('click', function() {
		tasks = []
		localStorage.setItem('tasks', JSON.stringify(tasks));
		showTasks(tasks);
	})

	function _makeNewTask(index, label) {
		let d = new Date()
		let _id = d.getTime() * index;
		let _label = `${label} ${index}` 
		let task = {id:_id, label:_label}

		return task
	}

	// show tasks
	function showTasks(tasks) {
		let myTasksList = "";

		tasks.forEach(function(task) {
			myTasksList += `
				<li>
					<span>${task.label}</span>
					<button type="button" id="${task.id}" class="completedButton">Completed</button>
					<button type="button" id="editButton${task.id}" class="editButton">Edit</button>
				</li>
			`
		})

		$("#my_tasks").html(myTasksList);
	}

	let tasks = [];

	const previouslyStoredTasks = localStorage.getItem('tasks');
	if (previouslyStoredTasks) {
		tasks = JSON.parse(previouslyStoredTasks);
	}

	localStorage.setItem("tasks", JSON.stringify(tasks))

	showTasks(tasks)
});


