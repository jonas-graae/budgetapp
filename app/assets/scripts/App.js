import React from 'react';
import ReactDOM from 'react-dom';
import "../styles/globals.scss";
import Sprites from "./components/sprites";
import AppRouter from './routers/AppRouter';

// <svg className="logo">
//     <use href={"#twitter"}/>
// </svg>


ReactDOM.render(<AppRouter />, document.getElementById('app'));