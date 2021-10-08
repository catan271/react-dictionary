import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Result from './Result'

export default function Search(props) {
    const [results, setResults] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setResults([])
        setActiveIndex(-1)
    }, [props.dict])

    const getResult = (e) => {
        if (!e.target.value.length) return setResults([])
        const searchRegex = new RegExp('^' + e.target.value, 'i')
        const searchResults = []
        let max = 30
        for (let i = 0; i < props.dict.length; i++) {
            if (searchRegex.test(props.dict[i].word)) {
                searchResults.push(props.dict[i])
                max--
                if (!max) break
            }
        }
        setResults(searchResults)
    }

    const clickWord = (index) => {
        setActiveIndex(index)
    }

    return (
        <SearchStyle id="search-view">
            <div className="search-header">
                <div><i className={props.icon}></i> {props.header}</div>
                <input type="text" onChange={getResult}></input>
            </div>

            <div className="results">
                {results.map((word, index) => <Result className={index === activeIndex && 'active'} key={index} word={word} onClick={() => clickWord(index)}/>)}
            </div>
        </SearchStyle>
    )
}

export const SearchStyle = styled.div`
    height: 100%;
    width: 360px;
    background-color: #F2F3F4;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;

    .search-header {
        height: 100px;
        background-color: #064279;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: white;
        padding: 10px;
        gap: 8px;
        font-size: 18px;

        input {
            height: 36px;
            width: 100%;
            padding: 8px;
            font-size: 16px;
        }
    }

    .results  {
        flex: 1;
        padding: 10px;
        overflow-y: scroll;

        .active {
            background-color: #99CCFF;
        }
    }

    .results:hover {
        cursor: pointer;
    }
`