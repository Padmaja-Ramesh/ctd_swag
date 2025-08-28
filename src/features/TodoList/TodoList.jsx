import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodo = todoList.filter((todo) => !todo.isCompleted == true);
  console.log("filtered todo", filteredTodo);
  return (
    <>
      {filteredTodo.length > 0 ? (
        <>
          {filteredTodo.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </>
      ) : (
        <>
          {isLoading ? (
            <p>Todo list loading...</p>
          ) : (
            <p>Add todo above to get started</p>
          )}
        </>
      )}
    </>
  );
}

export default TodoList;
