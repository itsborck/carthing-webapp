import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ControlWebsocketHelper from './helpers/ControlWebsocketHelper';
import ViewManager from './views/views';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <ViewManager />
      </header>
    </div>
  </React.StrictMode>
);

/* We need to connect to the internal websocket, else the car thing kills the webview */
const _socket_helper = new ControlWebsocketHelper();
