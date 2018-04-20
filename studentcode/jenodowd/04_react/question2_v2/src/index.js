import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import oneLinerJoke from 'one-liner-joke'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
