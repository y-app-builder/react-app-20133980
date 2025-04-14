import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(60);
  const [isCountdownRunning, setIsCountdownRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCountdownRunning && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isCountdownRunning]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startCountdown = () => {
    setIsCountdownRunning(true);
  };

  const stopCountdown = () => {
    setIsCountdownRunning(false);
  };

  const resetCountdown = () => {
    setCountdown(60);
    setIsCountdownRunning(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Simple Todo App</h1>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>
          Add
        </button>
      </div>
      
      <ul style={styles.todoList}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.todoItem}>
            <div style={styles.todoContent}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                style={styles.checkbox}
              />
              <span style={{
                ...styles.todoText,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#000'
              }}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p style={styles.emptyMessage}>No todos yet. Add one above!</p>
      )}
      
      <div style={styles.countdownContainer}>
        <h2 style={styles.countdownHeader}>Countdown Timer</h2>
        <div style={styles.countdownDisplay}>
          {countdown} seconds
        </div>
        <div style={styles.countdownButtons}>
          {!isCountdownRunning ? (
            <button onClick={startCountdown} style={styles.countdownButton}>
              Start
            </button>
          ) : (
            <button onClick={stopCountdown} style={styles.countdownButton}>
              Pause
            </button>
          )}
          <button onClick={resetCountdown} style={styles.countdownButton}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontSize: '16px',
  },
  todoList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  todoContent: {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
  },
  checkbox: {
    marginRight: '10px',
    cursor: 'pointer',
  },
  todoText: {
    fontSize: '16px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  emptyMessage: {
    textAlign: 'center' as const,
    color: '#888',
    fontStyle: 'italic',
    marginTop: '20px',
  },
  countdownContainer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    textAlign: 'center' as const,
  },
  countdownHeader: {
    color: '#333',
    marginBottom: '15px',
  },
  countdownDisplay: {
    fontSize: '32px',
    fontWeight: 'bold' as const,
    color: '#333',
    margin: '20px 0',
  },
  countdownButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  countdownButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default App;