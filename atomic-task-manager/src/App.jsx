import { useState } from 'react'
import './App.css'


function Task({task, onToggleComplete, onDelete}){
  return (
    <div className="task-card">

      <input type="checkbox" 
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="task-checkbox"
      />

      <span className={task.completed ? 'task-text completed' : 'task-text'}>
        {task.text}
      </span>

      <span className="task-category">
        [{task.category}]
      </span>

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        <img src="./imgs/delete.png" alt="delete" style={{width: '30px', height: '30px'}}/>
      </button>
    </div>
  )
}

//tasklist component
function TaskList({tasks, onToggleComplete, onDelete}) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task 
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

//category filter component
function CategoryFilter({categories, selectedCategory, onSelectCategory}) {
  return (
    <div className="category-filter-container">
      {categories.map((category) => (
        <button 
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

//component for user input when creating custom tasks
function TaskForm({onAddTask, categories}){
  const [taskText, setTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Personal');

  const handleChange = (e) => { //'e' parameter is the event obj passed when 'onChange' triggers
    setTaskText(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }

  const handleSubmit = (e) => { //'e' is the event obj passed when 'onSubmit' triggers
    e.preventDefault(); //prevents browser from defaulting to fully reloading the page and losing all react state
    if(taskText.trim()){
      console.log('New task:', taskText);
      onAddTask(taskText, selectedCategory);
      setTaskText(''); //Clear input after submission
      setSelectedCategory('Personal');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input 
        type="text" 
        value={taskText}
        onChange={handleChange}
        placeholder="Add a new task..."
        className="task-input"
      />
      <select 
        value={selectedCategory} 
        onChange={handleCategoryChange}
        className="category-select"
      >
        {categories.filter(cat => cat !== 'All').map((category) => (
          <option key={category} value={category}> {category} </option>
        ))}
      </select>
      <button type="submit" className="add-task-btn">+ Add</button>
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
      <h2>Manage Your Categories</h2>
      <form className="category-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={catText}
          onChange={handleChange}
          placeholder='Add a new category...'
          className="add-category-input"
        />
        <button type='submit' className="add-task-btn">+ Add</button>
      </form>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category} className="category-item">
            <span className="category-name">{category}</span>
            {category !== 'All' && ( //only the categories other than 'all' are deletable 
              <button 
                className="category-delete-btn"
                onClick={() => {
                  console.log('Deleted category:', category);
                  onDeleteCategory(category);
                }}
              >
                <img src="./imgs/delete.png" alt="delete" style={{width: '30px', height: '30px'}}/>
              </button>
            )}
          </div>
        ))}
      </div>
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
    {id: 2, text: 'task 2', category: 'Shopping', completed: false},
    {id: 3, text: 'task 3', category: 'Personal', completed: false},
  ]);
  
  //category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  //category manager visibility
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  //filter the tasks by the selected category filter
  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter(task => task.category === selectedCategory);

  //function to add a task
  const handleAddTask = (taskText, category) => {
    const newTask = {
      id: Date.now(), //simple id gen
      text: taskText,
      category: category,
      completed: false
    };
    setTasks([...tasks, newTask]); //add to existing tasks
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id ===  taskId ? {...task, completed: !task.completed} : task
    ));
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
    <div className={`dual-panel-container ${isCategoryManagerOpen ? 'shifted' : ''}`}>

      <div className="app-container">
        <h1>TODO List</h1>
        <TaskForm onAddTask={handleAddTask} categories={categories}/>
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <TaskList 
          tasks={filteredTasks} 
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
        <button 
          className="category-manager-toggle"
          onClick={() => setIsCategoryManagerOpen(!isCategoryManagerOpen)}
        >
          {isCategoryManagerOpen ? 'Close' : 'Manage Categories'}
        </button>
      </div>

      <div className={`category-manager-panel ${isCategoryManagerOpen ? 'open' : ''}`}>
        <CategoryManager 
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </div>

    </div>
  )
}

export default App