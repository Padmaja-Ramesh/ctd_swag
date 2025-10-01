import { useState, useEffect, useCallback, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TodoList from "../src/features/TodoList/TodoList";
import TodoForm from "../src/features/TodoForm";
import "./App.css";
import TodosViewForm from "./features/TodosViewForm";
import styles from "./App.module.css";
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from "./reducers/todos.reducer";
import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  // const courses = [
  //   { id: 1, title: "Python" },
  //   { id: 2, title: "node.js" },
  //   { id: 3, title: "react.js" },
  // ];
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  const getUrl = useCallback(() => {
    let searchQuery = "";
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`;
    if (todoState.queryString) {
      searchQuery = `&filterByFormula=SEARCH("${todoState.queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

  async function updatedTodo(editedTodo) {
    dispatch({ type: todoActions.startRequest });
    const originalTodo = todoState.TodoList.find(
      (todo) => todo.id === editedTodo.id
    );
    dispatch({ type: todoActions.updateTodo, editedTodo });
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted || false,
          },
        },
      ],
    };
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      // revert UI back to original todo
      dispatch({ type: todoActions.revertTodo, originalTodo, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }

    // const updatedTodos = todoList.map((todo) => {
    //   console.log(editedTodo);
    //   return todo.id == editedTodo.id ? { ...editedTodo } : todo;
    // });
    // setTodoList(updatedTodos);
  }

  // function addTodo(title) {
  //   const newTodo = {
  //     title: title,
  //     createdTime: Date.now(),
  //     isCompleted: false,
  //   };
  //   setTodoList([...todoList, newTodo]);
  //   console.log("Updated list:", [...todoList, newTodo]);
  // }
  //}

  const addTodo = async (newTodo) => {
    console.log("new data added", newTodo);
    const payload = {
      records: [
        {
          fields: {
            title: newTodo,
            isCompleted: newTodo.isCompleted || false,
          },
        },
      ],
    };
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        throw new Error("error adding new todo...");
      }
      const response = await resp.json();
      dispatch({ type: todoActions.addTodo, response });
    } catch (error) {
      dispatch({
        type: todoActions.setErrorMessage,
        action: error,
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  function completeTodo(id) {
    const findTodo = todoState.TodoList.find((todo) => {
      return todo.id === id;
    });

    if (!findTodo) return;
    else {
      const completedTodo = { ...findTodo, isCompleted: true };
      dispatch({ type: todoActions.completeTodo, completedTodo });
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.startRequest });
      const options = { method: "GET", headers: { Authorization: token } };

      try {
        const resp = await fetch(getUrl(), options);
        if (!resp.ok) throw new Error(resp.statusText);
        const data = await resp.json();
        dispatch({ type: todoActions.loadTodos, records: data.records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, action: error });
      } finally {
        dispatch({ type: todoActions.endRequest });
      }
    };

    fetchTodos();
  }, [getUrl]);

  return (
    <div>
      <h1 className={styles.heading}> Code the dream swag </h1>
      <div style={{ display: "flex" }}>
        <TodoForm onAddTodo={addTodo}></TodoForm>
        {/* <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
          </li>
        ))}
      </ul> */}
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
    </div>
  );
}

export default App;
