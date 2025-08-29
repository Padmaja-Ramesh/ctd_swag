import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const todoTitleInput = useRef("");
  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    //todoTitleInput.current.focus();
  }
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel
          ref={todoTitleInput}
          value={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
          elementId="todoTitle"
          labelText="ToDo"
        ></TextInputWithLabel>

        <button disabled={workingTodoTitle.length == 0}> Add Todo</button>
      </form>
    </div>
  );
}

export default TodoForm;
