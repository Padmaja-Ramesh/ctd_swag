import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ headingTitle }) {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (location.pathname == "/") {
      setTitle("Todo List");
    } else if (location.pathname == "/about") {
      setTitle("About");
      console.log(title);
    } else {
      setTitle("Not Found");
    }
  }, [location]);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h1>{headingTitle}</h1>

        <nav>
          <NavLink
            to={"/"}
            className={(isActive) => {
              isActive ? styles.active : styles.inactive;
            }}
            style={{ margin: "20px" }}
          >
            Home
          </NavLink>
          <NavLink to={"/about"} style={{ margin: "20px" }}>
            About
          </NavLink>
        </nav>
      </div>
      <h3>Current Page is {title}</h3>
    </>
  );
}

export default Header;
