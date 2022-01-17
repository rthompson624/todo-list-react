import React from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList todos={ todos } setTodos={ setTodos } />
      <AddTodo setTodos={ setTodos } />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    setTodos(prevTodos => {
      return prevTodos.map(iter => {
        if (iter.id === todo.id) {
          return { ...iter, done: !iter.done };
        } else {
          return iter;
        }
      });
    });
  }

  if (todos.length === 0) {
    return (
      <p>No todos left!</p>
    );
  }

  return (
    <ul>
      {
        todos.map(todo => (
          <li
            onDoubleClick={ () => handleToggleTodo(todo) }
            style={ { textDecoration: todo.done ? "line-through" : "" } }
            key={ todo.id }
          >
            { todo.text }
            <DeleteTodo todo={ todo } setTodos={ setTodos } />
          </li>
        ))
      }
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Delete todo item?");
    if (confirmed) {
      setTodos(prevTodos => {
        return prevTodos.filter(iter => iter.id !== todo.id);
      });
    }
  }

  return (
    <span onClick={ () => handleDeleteTodo() } className="delete-todo">X</span>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.todoText.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos(prevTodos => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={ handleAddTodo }>
      <input ref={ inputRef } name="todoText" placeholder="Add todo" autoComplete="off"></input>
      <button type="submit">Add</button>
    </form>
  );
}
