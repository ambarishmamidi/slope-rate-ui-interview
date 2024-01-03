// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import bookingReducer from './reducers';

const store = createStore(bookingReducer, applyMiddleware(thunk));

export default store;
