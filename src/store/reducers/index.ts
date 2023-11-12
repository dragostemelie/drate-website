import { combineReducers } from 'redux';

import ui from './ui';
import data from './data';
import author from './author';

const rootReducer = combineReducers({
  ui,
  data,
  author,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: any, action: any) => {
  return rootReducer(state, action);
};
