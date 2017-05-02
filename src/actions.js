 /* eslint-disable */
const LOGIN_USER = 'LOGIN_USER';
const GET_FEED = 'GET_FEED';
const PAGE_TOKEN = 'PAGE_TOKEN';
const CLEAN_POST = 'CLEAN_POST';

export function loginIn(){
  return dispatch => {
    dispatch({
      type: LOGIN_USER,
      status: true
    })
  }
}

export function getFeedItem(feed_item){
  return dispatch => {
    dispatch({
      type: GET_FEED,
      data: feed_item
    });
  }
}

export function setToken(page_token){
  return dispatch => {
    dispatch({
      type: PAGE_TOKEN,
      user_page_token: page_token
    });
  } 
}

export function cleanPost(){
  return dispatch => {
    dispatch({
      type: CLEAN_POST
    });
  }  
}



