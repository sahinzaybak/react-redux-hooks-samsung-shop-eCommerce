import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'

import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './layout/header.jsx';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';

const store = createStore(
	rootReducer,
	applyMiddleware(createPromise(), thunk, createLogger())
);

// + Provider: 
// - Tüm Redux ın projemizde dahil olabilmesi için oluşturmuş olduğumuz Provider özelliğini App Componenti dışına ekliyoruz. 
// - Ayrıca oluşturmuş olduğumuz store un her yere ulaşabilmesi için Provider yapısına store ekliyoruz.

// + Router yapısı: Tüm projenin router'ı görebilmesi için bu kısımda provider üzerinde sarmaladık.
let basket;
if(JSON.parse(localStorage.getItem("basket") != null)) 
   basket = JSON.parse(localStorage.getItem("basket"));

ReactDOM.render(
    <BrowserRouter> 
      <Provider store={store}> 
        <ReactNotification />
        <Header basket={basket} />
        <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
