import { ADD_TODO, REFRESH_STATE, MARK_COMPLETED } from "./actionTypes";

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    content
  }
});

export const refreshState = state => ({
  type: REFRESH_STATE,
  state
});


export const markCompleted = item => ({
  type: MARK_COMPLETED,
  payload: {
    item
  }
});
