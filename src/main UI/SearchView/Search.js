import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import Result from './Result'
import { SetMeaningContext} from '../../context/Provider'

export default function Search(props) {
    const [results, setResults] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const setMeaning = useContext(SetMeaningContext)

    useEffect(() => {
        setResults([])
        setActiveIndex(-1)
        if (props.init) setResults(props.init())
    }, [props])

    const getResult = (e) => {
        setActiveIndex(-1)
        if (!e.target.value.trim().length) return setResults([])
        const searchRegex = new RegExp('^' + e.target.value.trim(), 'i')
        const searchResults = []
        let max = 40
        for (let i = 0; i < props.dict.length; i++) {
            if (searchRegex.test(props.dict[i].word)) {
                if (props.lang) searchResults.push({...props.dict[i], index: i, lang: props.lang})
                else searchResults.push(props.dict[i])
                max--
                if (!max) break
            }
        }
        setResults(searchResults)
    }

    const clickWord = (index) => {
        setActiveIndex(index)
        setMeaning(results[index])
    }

    const enterEvent = (e) => {
        e.preventDefault()
        if (results) clickWord(0)
    }

    return (
        <SearchStyle id="search-view">
            <div className="search-header">
                <div><i className={props.icon}></i> {props.header}</div>
                <form onSubmit={enterEvent}>
                    <input type="text" onChange={getResult} ></input>
                </form>
            </div>

            <div className="results">
                {results.map((word, index) => <Result className={index === activeIndex && 'active'} key={index} word={word} onClick={() => clickWord(index)}/>)}
            </div>
        </SearchStyle>
    )
}

export const SearchStyle = styled.div`
    height: 100%;
    min-width: 360px;
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

        form {
            width: 100%;
        }

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