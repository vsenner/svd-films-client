import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import authStore from "./store/index";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={authStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
