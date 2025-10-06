import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <p>Page not found </p>
      <Link to="/" style={{ color: "blue", fontSize: "20px" }}>
        Return to Home
      </Link>
    </>
  );
}

export default NotFound;
