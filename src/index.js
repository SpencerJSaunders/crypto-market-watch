import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from  'redux-thunk'
import {HashRouter, Route} from 'react-router-dom'

import reducers from './reducers'
import App from './components/App'
import CoinAnalysis from './components/CoinAnalysis'
import Header from './components/Header'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
        <Header />
            <Route path='/' exact component={App} />
            <Route path='/coininfo/' exact component={CoinAnalysis} />
        </HashRouter>
    </Provider>,
    document.querySelector('#root')
)