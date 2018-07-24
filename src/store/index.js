import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import calendarReducer from './../reducers/calendar';

// reducers

const rootReducer = combineReducers({
  calendarReducer,
});

export default createStore(rootReducer, applyMiddleware(
  thunk,
  logger,
));
