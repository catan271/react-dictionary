import React, { useContext } from 'react'

import english from '../../assets/json/english.json'
import vietnamese from '../../assets/json/vietnamese.json'
import Search from './Search'

import { TypeContext } from '../../context/Provider'

export default function SearchView() {
    const type = useContext(TypeContext)

    switch (type) {
        case 'vietnamese':
            return (
                <Search dict={vietnamese} lang={type} icon={'fas fa-search'} header={' nhập từ cần tra'}/>
            )
        default:
            return(
                <Search dict={english} lang={type} icon={'fas fa-search'} header={' nhập từ cần tra'}/>
            )
    }
}