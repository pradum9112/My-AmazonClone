import React from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import Contextprovider from "./components/context/Contextprovider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Contextprovider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>  
  </Provider>
  </Contextprovider>,
  document.getElementById('root')
);

