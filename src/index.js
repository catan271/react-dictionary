import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/fontawesome-free-5.15.3-web/css/all.min.css'

import Sidebar from './sidebar/Sidebar'
import SearchView from './main UI/SearchView/SearchView'
import MeaningView from './main UI/MeaningView/MeaningView'
import About from './sidebar/About'
import Provider from './context/Provider'

function App() {
    return (
        <React.Fragment>
            <Provider>
                <Sidebar/>
                <SearchView/>
                <MeaningView/>
                <About/>
            </Provider>
        </React.Fragment>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)