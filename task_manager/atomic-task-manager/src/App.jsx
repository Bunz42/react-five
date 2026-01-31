import { useState } from 'react'

//tasklist component
function TaskList({tasks}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.text}
        </li>
      ))}
    </ul>
  )
}

//category filter component
function CategoryFilter({categories}) {
  return (
    <div>
      {categories.map((category) => (
        <button key={category}>
          {category}
        </button>
      ))}
    </div>
  )
}

//component for user input when creating custom tasks
function TaskForm({onAddTask}){
  const [taskText, setTaskText] = useState('');

  const handleChange = (e) => { //'e' parameter is the event obj passed when 'onChange' triggers
    setTaskText(e.target.value);
  };

  const handleSubmit = (e) => { //'e' is the event obj passed when 'onSubmit' triggers
    e.preventDefault(); //prevents browser from defaulting to fully reloading the page and losing all react state
    if(taskText.trim()){
      console.log('New task:', taskText);
      onAddTask(taskText);
      setTaskText(''); //Clear input after submission
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={taskText}
        onChange={handleChange}
        placeholder="Enter a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

//component that allows user to manage their categories
function CategoryManager({categories, onAddCategory, onDeleteCategory}){
  const [catText, setCatText] = useState('');

  const handleChange = (e) => {
    setCatText(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (catText.trim()) { //handles empty categories
      console.log('New category:', catText);
      onAddCategory(catText);
      setCatText('');
    }
  }
  
  return (
    <div>
      <h3>Manage Your Categories</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={catText}
          onChange={handleChange}
          placeholder='Add a new category'
        />
        <button type='submit'>Add Category</button>
      </form>
      {categories.map((category) => (
        <div key={category}>
          <span>{category}</span>
          {category !== 'All' && ( //only the categories other than 'all' are deletable 
            <button onClick={() => {
                console.log('Deleted category:', category);
                onDeleteCategory(category);
              }}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  )
}


//Main Container
function App(){
  //categories
  const [categories, setCategories] = useState(['All', 'Work', 'Personal', 'Shopping']);

  //tasks
  const [tasks, setTasks] = useState([
    {id: 1, text: 'task 1', category: 'Work', completed: false},
    {id: 2, text: 'task 2', category: 'Shopping', completed: true},
    {id: 3, text: 'task 3', category: 'Personal', completed: false},
  ]);

  //function to add a task
  const handleAddTask = (taskText) => {
    const newTask = {
      id: Date.now(), //simple id gen
      text: taskText,
      category: 'Personal', //temp category
      completed: false
    };
    setTasks([...tasks, newTask]); //add to existing tasks
  };

  //function to add a category
  const handleAddCategory = (categoryToAdd) => {
    setCategories([...categories, categoryToAdd]);
  };

  //function to delete a category
  const handleDeleteCategory = (categoryToDelete) => {
    //filter out the category that user wants to delete
    setCategories(categories.filter(category => category !== categoryToDelete));
    //delete all the tasks that have that category
    setTasks(tasks.filter(task => task.category !== categoryToDelete));
  };

  return (
    <div>
      <h1>TODO List</h1>
      <CategoryFilter categories={categories} />
      <TaskList tasks={tasks} />
      <TaskForm onAddTask={handleAddTask}/>
      <CategoryManager 
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  )
}

export default App