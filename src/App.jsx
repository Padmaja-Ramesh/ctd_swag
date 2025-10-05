import { useState, useEffect, useCallback, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TodoList from "../src/features/TodoList/TodoList";
import TodoForm from "../src/features/TodoForm";
import "./App.css";
import TodosViewForm from "./features/TodosViewForm";
import styles from "./App.module.css";
import TodosPage from "./pages/TodosPage";
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from "./reducers/todos.reducer";
import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";
import Header from "./shared/Header";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useSearchParams } from "react-router-dom";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  // const courses = [
  //   { id: 1, title: "Python" },
  //   { id: 2, title: "node.js" },
  //   { id: 3, title: "react.js" },
  // ];
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const filteredTodoList = todoState.TodoList;
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const currentTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfFirstTodo + itemsPerPage
  );

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
    dispatch({ type: todoActions.updateTodo, updated: editedTodo });
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
      const resp = await fetch(getUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      // revert UI back to original todo
      dispatch({ type: todoActions.revertTodo, originalTodo, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  const addTodo = async (newTodo) => {
    console.log("new data added", newTodo);
    const payload = {
      records: [
        {
          fields: {
            title: newTodo,
            isCompleted: false,
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
      const resp = await fetch(getUrl(), options);

      if (!resp.ok) {
        throw new Error("error adding new todo...");
      }
      const response = await resp.json();
      dispatch({ type: todoActions.addTodo, response });
    } catch (error) {
      dispatch({
        type: todoActions.setErrorMessage,
        action: error.message,
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  async function completeTodo(id) {
    const findTodo = todoState.TodoList.find((todo) => {
      return todo.id === id;
    });

    if (!findTodo) return;
    else {
      const completedTodo = { ...findTodo, isCompleted: true };
      dispatch({ type: todoActions.completeTodo, id });
      const payload = {
        records: [
          {
            id: completedTodo.id,
            fields: {
              isCompleted: completedTodo.isCompleted,
            },
          },
        ],
      };
      const options = {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      try {
        dispatch({ type: todoActions.startRequest });
        const resp = await fetch(getUrl(), options);

        if (!resp.ok) {
          throw new Error("error updating todo...");
        }
        const response = await resp.json();
        dispatch({ type: todoActions.updateTodo, updated: completedTodo });
      } catch (error) {
        dispatch({
          type: todoActions.setErrorMessage,
          action: error.message,
        });
      } finally {
        dispatch({ type: todoActions.endRequest });
      }
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
      <Header headingTitle={"Code the Dream"}></Header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TodosPage
                todoState={todoState}
                addTodo={addTodo}
                completeTodo={completeTodo}
                updatedTodo={updatedTodo}
                dispatch={dispatch}
                todoActions={todoActions}
              ></TodosPage>
              <div style={{ marginTop: "20px" }}>
                <button
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setSearchParams({
                      page: Math.max(1, currentPage - 1).toString(),
                    })
                  }
                >
                  Prev
                </button>

                <span style={{ margin: "0 10px" }}>
                  Page {currentPage} of {totalPages || 1}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setSearchParams({
                      page: Math.min(totalPages, currentPage + 1).toString(),
                    })
                  }
                >
                  Next
                </button>
              </div>
            </>
          }
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
