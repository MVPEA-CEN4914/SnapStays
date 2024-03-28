import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApolloProvider from './ApolloProvider';
//import { client } from './apollo'; // assuming you have a client instance created



const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(ApolloProvider);

/*const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMo
    <ApolloProvider>de>
//       <App
    </ApolloProvider> />
//   </React.StrictMode>
//
 );

root.render(
  <React.StrictMode>
    ApolloProvider
  </React.StrictMode>
);

*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
