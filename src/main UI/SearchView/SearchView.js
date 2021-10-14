import React from 'react'

import english from '../../assets/json/english.json'
import vietnamese from '../../assets/json/vietnamese.json'
import Search from './Search'

import { getBookmark } from '../../local/Bookmark'
import { getHistory } from '../../local/History'

export default function SearchView({type}) {
    switch (type) {
        case 'history':
            return(
                <Search dict={getHistory()} init={getHistory} icon={'fas fa-history'} header={' Lịch sử tra từ'}/>
            )
        case 'bookmark':
            return (
                <Search dict={getBookmark()} init={getBookmark} icon={'fas fa-bookmark'} header={' Từ đã đánh dấu'}/>
            )
        case 'vietnamese':
            return (
                <Search dict={vietnamese} lang={type} icon={'fas fa-search'} header={' Nhập từ cần tra'}/>
            )
        default:
            return(
                <Search dict={english} lang={type} icon={'fas fa-search'} header={' Nhập từ cần tra'}/>
            )
    }
}