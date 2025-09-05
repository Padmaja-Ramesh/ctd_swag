import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const incompletedTodoList = todoList.filter(
    (todo) => !todo.isCompleted == true
  );
  // const completedTodoList = todoList.filter((todo) => todo.isCompleted == true);

  console.log("filtered todo", incompletedTodoList);
  return (
    <>
      {incompletedTodoList.length > 0 ? (
        <>
          <h1> Existing/ Pending todo list Items are : </h1>
          {incompletedTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
          {/* <h1>Completed todo list Items are : </h1>
          {completedTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))} */}
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
