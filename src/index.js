import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import App from './App';
import About from './About';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import './index.css';

const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={App} />
      <Route path="/about" component={About}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
