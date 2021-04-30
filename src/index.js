import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from  'redux-thunk'
import {BrowserRouter, Route} from 'react-router-dom'

import reducers from './reducers'
import App from './components/App'
import CoinAnalysis from './components/CoinAnalysis'
import Header from './components/Header'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <Header />
            <Route path='/' exact component={App} />
            <Route path='/coininfo' exact component={CoinAnalysis} />
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
)