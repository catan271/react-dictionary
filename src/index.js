import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/fontawesome-free-5.15.3-web/css/all.min.css'

import Sidebar from './sidebar/Sidebar'
import SearchView from './main UI/SearchView/SearchView'
import Provider from './context/Provider'

function App() {
    return (
        <React.Fragment>
            <Provider>
                <Sidebar/>
                <SearchView/>
            </Provider>
        </React.Fragment>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)