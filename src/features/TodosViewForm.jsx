import { useEffect, useState } from "react";

function TodosViewForm({
  setSortDirection,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  function preventRefresh(e) {
    e.preventDefault(); // stops the page from reloading
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <form onSubmit={preventRefresh}>
      <div style={{ display: "flex" }}>
        <label style={{ padding: 10 }}> Search Todos</label>
        <input
          type="text"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        ></input>
        <button
          onClick={() => setLocalQueryString("")}
          disabled={!localQueryString}
        >
          Clear
        </button>
        <label style={{ padding: 10 }}>Sort by</label>
        <select onChange={(e) => setSortField(e.target.value)}>
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
        <label style={{ padding: 10 }}>Direction</label>
        <select onChange={(e) => setSortDirection(e.target.value)}>
          <option value="asc">Ascending </option>
          <option value="desc">Desending</option>
        </select>
      </div>
    </form>
  );
}

export default TodosViewForm;
