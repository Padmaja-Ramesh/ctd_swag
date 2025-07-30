import TodoListItem from "./TodoListItem";

function TodoList() {
  const courses = [
    { id: 1, title: "Python" },
    { id: 2, title: "node.js" },
    { id: 3, title: "react.js" },
  ];
  return (
    <div>
      <ul>
        {courses.map((course) => {
          return (
            <TodoListItem key={course.id} title={course.title}></TodoListItem>
          );
        })}
      </ul>
      ;
    </div>
  );
}

export default TodoList;
