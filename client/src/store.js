import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middelware = [thunk];


const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middelware))
);

export default store;
 