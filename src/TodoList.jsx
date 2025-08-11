import TodoListItem from "./TodoListItem";

function TodoList({ todoList }) {
  return (
    <>
      {todoList.length > 0 ? (
        <ul>
          {todoList.map((todo) => (
            <TodoListItem key={todo.id} todo={todo.title} />
          ))}
        </ul>
      ) : (
        <p>Add todo above to get started</p>
      )}
    </>
  );
}

export default TodoList;
