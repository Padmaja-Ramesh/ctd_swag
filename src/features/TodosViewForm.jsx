function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) {
  function preventRefresh(e) {
    e.preventDefault(); // stops the page from reloading
  }
  return (
    <form onSubmit={preventRefresh}>
      {" "}
      <div>
        <label>Sort by</label>
        <select onChange={(e) => setSortField(e.target.value)}>
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
      </div>
      <div>
        <label>Direction</label>
        <select onChange={(e) => setSortDirection(e.target.value)}>
          <option value="Ascending">ASC </option>
          <option value="Descending">DESC</option>
        </select>
      </div>
    </form>
  );
}

export default TodosViewForm;
