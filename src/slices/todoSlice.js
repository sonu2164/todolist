
import { createSlice } from '@reduxjs/toolkit';


const getInitialTodoList = (username) => {
  const localTodoLists = JSON.parse(window.localStorage.getItem('todoLists')) || {};
  return localTodoLists[username] || [];
};



const updateLocalStorage = (username, todoList) => {
  const localTodoLists = JSON.parse(window.localStorage.getItem('todoLists')) || {};
  localTodoLists[username] = todoList;
  window.localStorage.setItem('todoLists', JSON.stringify(localTodoLists));
};


const getInitial = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  if (user) {
    const todoLists = JSON.parse(window.localStorage.getItem('todoLists'));

    const todoList = todoLists[user.username];
    const initialValue = {
      username: user.username,
      filterStatus: 'all',
      todoList,
      sortBy: 'dueDate',
      sortOrder: 'asc',
    };
    return initialValue;
  }


  const t = {
    username: null,
    filterStatus: 'all',
    todoList: [],
    sortBy: "dueDate",
    sortOrder: "desc",


  }
  return t;
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: getInitial(),
  reducers: {

    login: (state, action) => {

      state.username = action.payload;
      console.log(state.username);
      state.todoList = getInitialTodoList(action.payload);
    },

    logout: (state) => {
      state.username = null;
      state.todoList = [];
    },
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      updateLocalStorage(state.username, state.todoList);

    },
    updateTodo: (state, action) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
      updateLocalStorage(state.username, state.todoList);
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
      updateLocalStorage(state.username, state.todoList);
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setSortCriteria: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },
    updatePriority: (state, action) => {
      const { taskId, priority } = action.payload;
      const taskToUpdate = state.todoList.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.priority = priority;
        updateLocalStorage(state.username, state.todoList);
      }
    },
  },
});

export const {
  login,
  logout,
  addTodo,
  updateTodo,
  deleteTodo,
  updateFilterStatus,
  setSortCriteria,
  updatePriority,
} = todoSlice.actions;

export default todoSlice.reducer;

