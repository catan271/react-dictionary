import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/fontawesome-free-5.15.3-web/css/all.min.css'

import Sidebar from './sidebar/Sidebar'
import MainContent from './main UI/MainContent'
import About from './sidebar/About'
import Provider from './context/Provider'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function App() {
    return (
        <React.Fragment>
            <Provider>
                <Sidebar/>
                <MainContent/>
                <About/>
            </Provider>
        </React.Fragment>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)


serviceWorkerRegistration.register();