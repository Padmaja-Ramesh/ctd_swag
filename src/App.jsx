import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const courses = [
    { id: 1, title: "Python" },
    { id: 2, title: "node.js" },
    { id: 3, title: "react.js" },
  ];
  return (
    <div>
      <h1>Hi, welcome to code the dream swag page</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
