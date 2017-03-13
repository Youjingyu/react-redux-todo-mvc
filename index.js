import React from '../node_modules/react/dist/react'
import { render } from '../node_modules/react-dom/dist/react-dom'
import { createStore } from '../node_modules/redux/dist/redux'
import { Provider } from '../node_modules/react-redux/dist/react-redux'
import App from './containers/App'
import todoApp from './containers/reducers'

let store = createStore(todoApp);

let rootElement = document.getElementById('root')
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)