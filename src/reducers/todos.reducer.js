import TodoList from "../features/TodoList/TodoList";

const actions = {
  //actions in useEffect that loads todos
  fetchTodos: "fetchTodos",
  loadTodos: "loadTodos",
  //found in useEffect and addTodo to handle failed requests
  setLoadError: "setLoadError",
  //actions found in addTodo
  startRequest: "startRequest",
  addTodo: "addTodo",
  endRequest: "endRequest",
  //found in helper functions
  updateTodo: "updateTodo",
  completeTodo: "completeTodo",
  //reverts todos when requests fail
  revertTodo: "revertTodo",
  //action on Dismiss Error button
  clearError: "clearError",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        isLoading: true,
        ...state,
      };
    // Move the logic that maps each record from records into a todo.
    // Update the ...records.map to use ...action.records.map
    // Update the returned state object:
    // Add a todoList property and assign the resulting mapped array
    // Add isLoading and set it to false.
    case actions.loadTodos:
      const updateTodos = action.records.map((record) => ({
        id: record.id,
        ...record.fields,
      }));
      return {
        TodoList: updateTodos,
        isLoading: true,
        ...state,
      };
    // Copy the logic that completes a todo into completeTodo clause.
    // Replace id with action.id wherever the original completeTodo uses its argument.
    // Return the state with the updatedTodos destructured into the todoList property.
    case actions.completeTodo:
      const findTodo = state.TodoList.map((todo) => todo.id === action.id);
      completedTodo = { ...findTodo, isCompleted: true };
      updatedTodos = state.TodoList.map((todo) =>
        todo.id === action.id ? completedTodo : todo
      );
      return {
        ...state,
        TodoList: updatedTodos,
      };
    // The logic for revertTodo should be the same as `updateTodo.
    // If yes: make sure that the revertTodo case is written directly above updateTodo and remove the return statement. This will cause the action to fall through to the updateTodo case.
    // If they differ, copy the logic over and apply the same update patterns that we have gone through several times.
    case actions.revertTodo:

    // the logic that updates the todo to the actions.updateTodo clause.
    // Use action.editedTodo wherever you used updateTodo's argument.
    // Create a const updatedState = {} and destructure state and updatedTodos into it.
    // If there is an error property on the action object, add an errorMessage property onto updatedTodos set to action.error.message.
    // At the end of the clause, return the updated state.
    case actions.updateTodo:
      const updatedTodos = action.TodoList.map((todo) =>
        todo.id === action.editedTodo.id ? action.editedTodo : todo
      );
      const updatedState = {
        ...state,
        TodoList: updatedTodos,
        isSaving: false,
      };
      if (action.error) {
        updatedTodos.errorMessage = action.error.message;
      }
      return updatedState;
    // Copy over the logic that creates savedTodo and adds the isCompleted property when Airtable omits it from the record.
    // Update the returned state object:
    // Add a todoList property containing a new array destructuring state.todoList and savedTodo.
    // Add isSaving set to false
    case actions.addTodo:
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: records[0].fields.isCompleted,
      };
      return {
        ...state,
        TodoList: [...state, savedTodo],
        isSaving: false,
      };
    case actions.startRequest:
      return {
        isSaving: true,
        ...state,
      };
    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    case actions.setLoadError:
      return {
        errorMessage: action.error.message,
        isLoading: false,
        ...state,
      };
    case actions.clearError:
      return {
        ...state,
        errorMessage: "",
      };
  }
}

const initialState = {
  TodoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: "",
  queryString: "",
  sortDirection: "desc",
  sortField: "createdTime",
};

export { initialState, reducer };
