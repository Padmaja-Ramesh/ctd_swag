import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  const courses = [
    { id: 1, title: "Python" },
    { id: 2, title: "node.js" },
    { id: 3, title: "react.js" },
  ];
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    const newTodo = { title: title, id: Date.now() };
    setTodoList([...todoList, newTodo]);
    console.log("Updated list:", [...todoList, newTodo]);
  }
  return (
    <div>
      <h1>Hi, welcome to code the dream swag page</h1>

      <TodoForm onAddTodo={addTodo}></TodoForm>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
          </li>
        ))}
      </ul>

      <TodoList todoList={todoList}></TodoList>
    </div>
  );
}

export default App;
