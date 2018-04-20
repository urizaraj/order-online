import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers'

import 'bootstrap/dist/css/bootstrap.min.css'

import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import App from './components/App';

fontawesome.library.add(solid)

const e = React.createElement
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))

ReactDOM.render(
  e(Provider, { store }, e(App)),
  document.getElementById('root')
)

registerServiceWorker()
