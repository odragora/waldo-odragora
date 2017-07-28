import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { Route} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import fetch from 'whatwg-fetch'

import store, { history } from './store'
import {ExifPage} from './components/pages/exif'

import 'semantic-ui-css/semantic.min.css'


if (process.env.NODE_ENV === 'development') {
    // a11y(React, { ReactDOM: ReactDOM, throw: false, includeSrcNode: true })
}

const target = document.querySelector('#root')

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path={'/'} component={ExifPage}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    target
)
