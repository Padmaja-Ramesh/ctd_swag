import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import { StyledButton } from "../styles/StyledButton";

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
      <form onSubmit={handleAddTodo} style={{ display: "flex" }}>
        <TextInputWithLabel
          ref={todoTitleInput}
          value={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
          elementId="todoTitle"
          labelText="ToDo"
        ></TextInputWithLabel>

        <StyledButton disabled={workingTodoTitle.length == 0}>
          Add Todo
        </StyledButton>
      </form>
    </div>
  );
}

export default TodoForm;
