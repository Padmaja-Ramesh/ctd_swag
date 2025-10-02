import TodoList from "../features/TodoList/TodoList";
import TodosViewForm from "../features/TodosViewForm";
import TodoForm from "../features/TodoForm";
import styles from "../App.module.css";
function TodosPage({
  todoState,
  addTodo,
  completeTodo,
  updatedTodo,
  dispatch,
  todoActions,
}) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <TodoForm onAddTodo={addTodo}></TodoForm>
        <TodosViewForm
          sortDirection={todoState.sortDirection}
          setSortDirection={(val) =>
            dispatch({ type: todoActions.setSortDirection, val })
          }
          sortField={todoState.sortField}
          setSortField={(val) =>
            dispatch({ type: todoActions.setSortField, val })
          }
          queryString={todoState.queryString}
          setQueryString={(val) =>
            dispatch({ type: todoActions.setQueryString, val })
          }
        ></TodosViewForm>
      </div>
      <hr></hr>
      <div className={styles.center}>
        {todoState.errorMessage ? (
          <div className={styles.errorborder}>
            <hr />
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")}>dismiss </button>
          </div>
        ) : (
          <TodoList
            todoList={todoState.TodoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updatedTodo}
            isLoading={todoState.isLoading}
          />
        )}
      </div>
    </>
  );
}

export default TodosPage;
