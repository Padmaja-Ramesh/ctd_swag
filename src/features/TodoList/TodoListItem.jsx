import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleUpdate(event) {
    if (isEditing == false) {
      return;
    }
    event.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }
  return (
    <form onSubmit={handleUpdate}>
      {isEditing ? (
        <>
          <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
          <button type="button" onClick={handleCancel}>
            {" "}
            Cancel
          </button>
          <button type="button" onClick={handleUpdate}>
            {" "}
            Update
          </button>
        </>
      ) : (
        <div className="listItems">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
          ></input>
          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
        </div>
      )}
    </form>
  );
}

export default TodoListItem;
