function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <form>
      <div className="listItems">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
        ></input>
        <label>{todo.title}</label>
      </div>
    </form>
  );
}

export default TodoListItem;
