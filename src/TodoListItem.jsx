function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <div>
      <li>
        <form>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
          ></input>
          <h3>{todo.title}</h3>
        </form>
      </li>
    </div>
  );
}

export default TodoListItem;
