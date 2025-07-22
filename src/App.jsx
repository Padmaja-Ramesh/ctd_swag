import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  return (
    <div>
      <h1>Hi, welcome to code the dream swag page</h1>
      <TodoForm></TodoForm>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
