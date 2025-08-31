import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TodoList from "../src/features/TodoList/TodoList";
import TodoForm from "../src/features/TodoForm";
import "./App.css";
import TodosViewForm from "./features/TodosViewForm";

const encodeUrl = ({ sortField, sortDirection }) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  return encodeURI(`${url}?${sortQuery}`);
};

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  // const courses = [
  //   { id: 1, title: "Python" },
  //   { id: 2, title: "node.js" },
  //   { id: 3, title: "react.js" },
  // ];
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");

  async function updatedTodo(editedTodo) {
    setIsSaving(true);
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
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
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editedTodo.id
            ? { ...todo, ...data.records[0].fields }
            : todo
        )
      );
    } finally {
      setIsSaving(false);
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
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection }),
        options
      );

      if (!resp.ok) {
        throw new Error("error adding new todo...");
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: records[0].fields.isCompleted,
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  function completeTodo(id) {
    const findTodo = todoList.find((todo) => {
      return todo.id === id;
    });

    if (!findTodo) return;
    else {
      const completedTodo = { ...findTodo, isCompleted: true };
      updatedTodo(completedTodo);
      setTodoList((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? completedTodo : todo))
      );
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: { Authorization: token },
      };
      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection }),
          options
        );
        if (!resp.ok) {
          throw new Error(resp.message);
        } else {
          let response = await resp.json();
          const fetchResp = response.records.map((record) => {
            const todo = {
              id: record.id,
              ...record.fields,
            };
            return todo;
          });
          setTodoList(fetchResp);
          console.log("todoList in App from db:", todoList);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortField, sortDirection]);

  return (
    <div>
      <h1>Hi, welcome to code the dream swag page</h1>

      <TodoForm onAddTodo={addTodo}></TodoForm>
      {/* <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
          </li>
        ))}
      </ul> */}
      <>
        {errorMessage ? (
          <div>
            <hr />
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")}>dismiss </button>
          </div>
        ) : (
          <TodoList
            todoList={todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updatedTodo}
            isLoading={isLoading}
          ></TodoList>
        )}
      </>
      <hr></hr>
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
      ></TodosViewForm>
    </div>
  );
}

export default App;
