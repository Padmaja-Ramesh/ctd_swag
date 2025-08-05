import { useRef } from "react";

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef("");
  function handleAddTodo(event) {
    event.preventDefault();
    console.dir(event.target.title.value);
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = "";
    todoTitleInput.current.focus();
  }
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label>Todo</label>
        <input id="todoTitle" name="title" ref={todoTitleInput}></input>
        <button>Add Todo</button>
      </form>
    </div>
  );
}

export default TodoForm;
