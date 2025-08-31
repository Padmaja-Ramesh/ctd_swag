function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  function preventRefresh(e) {
    e.preventDefault(); // stops the page from reloading
  }
  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label> Search Todos</label>
        <input
          type="text"
          value={queryString}
          onChange={(e) => {
            setQueryString(e.target.value);
          }}
        ></input>
        <button onClick={() => setQueryString("")} disabled={!queryString}>
          Clear
        </button>
      </div>
      <div>
        <label>Sort by</label>
        <select onChange={(e) => setSortField(e.target.value)}>
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
        <label>Direction</label>
        <select onChange={(e) => setSortDirection(e.target.value)}>
          <option value="asc">Ascending </option>
          <option value="desc">Desending</option>
        </select>
      </div>
    </form>
  );
}

export default TodosViewForm;
