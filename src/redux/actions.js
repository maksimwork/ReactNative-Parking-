
import { UPDATE_CURRENT_USER } from './constants';

// ACTIONS
export const updateCurrentUser = (user) => {
  const action = {
    type: UPDATE_CURRENT_USER,
    user
  };
  return action;
}