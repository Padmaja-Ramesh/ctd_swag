{
  /*extract from TodoList.jsx*/
}
function TodoList() {
  const courses = [
    { id: 1, title: "Python" },
    { id: 2, title: "node.js" },
    { id: 3, title: "react.js" },
  ];
  return (
    <div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
      ;
    </div>
  );
}

export default TodoList;
