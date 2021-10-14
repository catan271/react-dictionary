import React, { useContext } from 'react'

import { TypeContext } from '../context/Provider'
import SearchView from './SearchView/SearchView'
import MeaningView from './MeaningView/MeaningView'
import SentenceTranslate from './Sentence-translate/SentenceTranslate'

export default function MainContent() {
    const type = useContext(TypeContext)
    
    switch (type) {
        case 'sentence':
            return <SentenceTranslate/>
        default:
            return (
                <React.Fragment>
                    <SearchView type={type}/>
                    <MeaningView/>
                </React.Fragment>
            )
    }
}