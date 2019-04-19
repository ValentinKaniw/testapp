import CacheManager from '../../cache'
import { ADD_TODO, REFRESH_STATE, MARK_COMPLETED, EDIT_TODO } from "../actionTypes";

  const initialState = [];

  const cache = new CacheManager();
  let newState;

  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_TODO: {
        const { content } = action.payload;
        newState = [
            ...state,
            {
              content,
              completed: false
            }
          ];
        cache.writeData('state', newState);
        return newState;
      }
      
      case MARK_COMPLETED: {
        const { item } = action.payload;
        newState = state.map((old_item) => {
          return old_item === item 
            ? { ...old_item, completed: !old_item.completed } 
            : old_item
        })
        cache.writeData('state', newState);
        return newState;
      }

      case EDIT_TODO: {
        const { item } = action.payload;
        newState = state.map((old_item) => {
          return old_item === item 
            ? { ...old_item, content: item.content } 
            : old_item
        })
        cache.writeData('state', newState);
        return newState;
      }

      case REFRESH_STATE:
        return action.state

      default:
        return state;
    }
  }