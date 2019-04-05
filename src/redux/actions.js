import { ADD_TODO, REFRESH_STATE } from "./actionTypes";

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    content
  }
});

export const refreshState = state => ({
  type: REFRESH_STATE,
  state
})
