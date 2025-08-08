import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  const [newTodo, setNewTodo] = useState("Example text");
  return (
    <div>
      <h1>Hi, welcome to code the dream swag page</h1>
      <TodoForm></TodoForm>
      <p>{newTodo}</p>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
