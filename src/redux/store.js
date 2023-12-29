// store.js
import { createStore, combineReducers } from 'redux';
import userReducer from './reducer';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers if needed
});

const store = createStore(rootReducer);
console.log('Redux Store:', store.getState());

export default store;
