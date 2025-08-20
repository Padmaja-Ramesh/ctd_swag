import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodo = todoList.filter((todo) => todo.isCompleted == false);
  return (
    <>
      {filteredTodo.length > 0 ? (
        <>
          {filteredTodo.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
            />
          ))}
        </>
      ) : (
        <p>Add todo above to get started</p>
      )}
    </>
  );
}

export default TodoList;
