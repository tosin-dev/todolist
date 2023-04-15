  function Task(props) {
    const onCompleted = props.onCompleted
    const onEdit = props.onEdit
    const _id = props.task.id

    return (
      <li>
        {props.task.label}
        <button type="button" id={_id} className="completedButton" onClick={onCompleted}>Completed</button>
        <button type="button" id="editButton{_id}" className="editButton" onClick={onEdit}>Edit</button>
      </li>
    )
  }

  function Tasks(props) {
    const tasks = props.mytasks
    const onTaskCompleted = props.onTaskCompleted
    const onTaskEdit = props.onTaskEdit
    
    return (
      <ul id="my_tasks">
        { tasks.map((_task) => 
          <Task 
            task={_task} 
            key={_task.id} 
            onCompleted={() => onTaskCompleted(_task.id)}
            onEdit={() => onTaskEdit(_task.id)}
          />)
        } 
      </ul>
    )
  }

  function App() {
    const [tasks, setTasks] = React.useState([])
    const [newTaskLabel, setNewTaskLabel] = React.useState("")
    const [newTaskId, setNewTaskId] = React.useState(0)
    const [entriesCount, setEntriesCount] = React.useState(1)

    const _makeNewTask = (index, label) => {
      let d = new Date()
      let _id = d.getTime() * index;
      let _label = label + " " + index
      let _newTask = {id:_id, label:_label}

      return _newTask;
    }

    const handleTaskAdd = (e) => {
      e.preventDefault()
      
      const _tasksList = []
      for (let c = 1; c <= entriesCount; c++) {
        let _newTask = _makeNewTask(c, newTaskLabel)
        _tasksList.push(_newTask)
      }

      const updatedTasks = [...tasks]
      updatedTasks.push(..._tasksList);

      setTasks(updatedTasks)
      setNewTaskLabel("")
    }

    const handleTaskCompleted = (taskId) => {
      const updatedTasks = [...tasks]

      // find the task with this ID 
      const i = updatedTasks.findIndex(function(t) {
        return taskId == t.id;
      });

      // and delete it from the list
      updatedTasks.splice(i, 1);

      setTasks(updatedTasks)
    }

    const handleTaskEdit = (taskId) => {
      // find the task with this ID
      const i = tasks.findIndex(function(t) {
        return taskId == t.id;
      });

      const taskToEdit = tasks[i];

      // document.getElementById('newTask').value = taskToEdit.label
      setNewTaskLabel(taskToEdit.label)
      setNewTaskId(taskId)
    }

    const handleTaskUpdate = () => {
      const updatedTasks = [...tasks]

      // find the task with this ID 
      const i = updatedTasks.findIndex(function(t) {
        return newTaskId == t.id;
      });

      // and update the label of the task in the list
      updatedTasks[i].label = newTaskLabel

      setTasks(updatedTasks)
      setNewTaskLabel("")
    }

    React.useEffect(() => {
      const _tasks = localStorage.getItem('tasks');
      if (_tasks) {
        setTasks(JSON.parse(_tasks));
      }
    }, [])

    React.useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    return (
      <>
        <h3>My ToDo List</h3>
        <form onSubmit={handleTaskAdd}>
          <label>Label: </label>
          <input 
            name="new2Task" 
            type="text" 
            id="newTask" 
            placeholder="Enter task description" 
            value={newTaskLabel} 
            onChange={(e) => setNewTaskLabel(e.target.value)}
          />

          <label>Count: </label>
          <input 
            type="number"
            placeholder=""
            value={entriesCount}
            style={{width: "55px"}}
            onChange={(e) => setEntriesCount(e.target.value)}
          />

          <button type="submit" id="addButton">Add</button>
          <button type="button" id="updateButton" onClick={handleTaskUpdate}>Update</button>
          <input type="hidden" name="task_id" id="task_id" />

          <button type="button" onClick={() => { setTasks([]) }}>Clear</button>
        </form>

        <h4>Tasks</h4>
        <Tasks 
          mytasks={tasks} 
          onTaskCompleted={handleTaskCompleted} 
          onTaskEdit={handleTaskEdit} 
        />
      </>
    )
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />)