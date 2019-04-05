import CacheManager from '../../cache'
import { ADD_TODO, REFRESH_STATE } from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {}
  };
  const cache = new CacheManager();
  let newState;

  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_TODO: {
        const { content } = action.payload;
        let id = state.allIds.length;
        newState = {
          ...state,
          allIds: [...state.allIds, id],
          byIds: {
            ...state.byIds,
            [id]: {
              content,
              completed: false
            }
          }
        };
        cache.writeData('state', newState);
        return newState;
      }

      case REFRESH_STATE:
        return action.state

      default:
        return state;
    }
  }