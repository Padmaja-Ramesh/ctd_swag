import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    const newTodo = { title: title, id: Date.now() };
    setTodoList([...todoList, newTodo]);
  }
  return (
    <div>
      <h1>Hi, welcome to code the dream swag page</h1>
      <TodoForm onAddTodo={addTodo}></TodoForm>

      <TodoList></TodoList>
    </div>
  );
}

export default App;
