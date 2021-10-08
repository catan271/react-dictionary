import React, { useState } from 'react'

import Result from './Result'
import { SearchStyle } from './Search'

export default function Search(props) {
    const [results, setResults] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);

    const getResult = (e) => {
        if (!e.target.value.length) return setResults([])
        const searchRegex = new RegExp('^' + e.target.value, 'i')
        const searchResults = []
        let max = 30
        for (let i = 0; i < props.dict.length; i++) {
            if (searchRegex.test(props.dict[i].word)) {
                console.log(i, props.dict[i].word)
                searchResults.push(props.dict[i])
                while (searchRegex.test(props.dict[++i].word) && --max) searchResults.push(props.dict[i])
                setResults(searchResults)
                break
            }
        }
    }

    const clickWord = (index) => {
        setActiveIndex(index)
    }

    return (
        <SearchStyle id="search-view">
            <div className="search-header">
                <div><i className="fas fa-search"></i> Nhập từ cần tra</div>
                <input type="text" onChange={getResult}></input>
            </div>

            <div className="results">
                {results.map((word, index) => <Result className={index === activeIndex && 'active'} key={index} word={word} onClick={() => clickWord(index)}/>)}
            </div>
        </SearchStyle>
    )
}