import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Add a new task
  const addTask = () => {
    if (inputValue.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>To Do List</h1>
        
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            Add
          </button>
        </div>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="empty-message">No tasks yet. Add one above!</li>
          ) : (
            tasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <span className="task-text">{task.text}</span>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)} 
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>

        {tasks.length > 0 && (
          <div className="task-count">
            {tasks.filter(t => !t.completed).length} remaining / {tasks.length} total
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
