/* eslint-disable */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

const LOGIN_USER = 'LOGIN_USER';
const GET_FEED = 'GET_FEED';
const PAGE_TOKEN = 'PAGE_TOKEN';
const CLEAN_POST = 'CLEAN_POST';

const user_data = {
  login_status: false,
  user_id : '',
  user_token: '',
  user_page_token: ''
}

const user = (state = user_data, action) => {
  switch(action.type){
    case LOGIN_USER:
      state.login_status = action.status;
      return Object.assign({}, state);
    case PAGE_TOKEN:
      state.user_page_token = action.user_page_token;
      return Object.assign({}, state);
    default:
      return Object.assign({}, state);
  }
}

const posts = (state = [], action) => {
  switch(action.type) {
    case GET_FEED:
      state.push(action.data)
      return state;
    case CLEAN_POST:
      return [];
  	default:
      return state;
  }
};


const reducer = combineReducers({posts, user, routing: routerReducer});
export default reducer;