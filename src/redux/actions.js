import { ADD_TODO, REFRESH_STATE, MARK_COMPLETED, EDIT_TODO } from "./actionTypes";

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

export const editTodo = item => ({
  type: EDIT_TODO,
  payload: {
    item
  }
});
