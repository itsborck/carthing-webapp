import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ButtonHelper, { Button, EventFlavour } from './helpers/ButtonHelper';
import ControlWebsocketHelper from './helpers/ControlWebsocketHelper';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <h1>React App</h1>
      </header>
    </div>
  </React.StrictMode>
);

const button_helper = new ButtonHelper();
button_helper.addListener(Button.BUTTON_1, EventFlavour.Down, () => alert('Button 1'));
button_helper.addListener(Button.BUTTON_2, EventFlavour.Down, () => alert('Button 2'));
button_helper.addListener(Button.BUTTON_3, EventFlavour.Down, () => alert('Button 3'));
button_helper.addListener(Button.BUTTON_4, EventFlavour.Down, () => alert('Button 4'));
button_helper.addListener(Button.BUTTON_5, EventFlavour.Down, () => alert('Button 5'));
button_helper.addListener(Button.SCROLL_LEFT, EventFlavour.Short, () => alert('Scroll Left'));
button_helper.addListener(Button.SCROLL_RIGHT, EventFlavour.Short, () => alert('Scroll Right'));
button_helper.addListener(Button.SCROLL_PRESS, EventFlavour.Down, () => alert('Scroll Press'));
button_helper.addListener(Button.FRONT_BUTTON, EventFlavour.Down, () => alert('Front Button'));

/* We need to connect to the internal websocket, else the car thing kills the webview */
const _socket_helper = new ControlWebsocketHelper();
