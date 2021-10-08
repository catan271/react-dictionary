import React from 'react'
import styled from 'styled-components'

export default function Result(props) {
    const {word, pronunciation, meaning} = props.word
    let shortMeaning = (meaning[0][0] === '*'? `${meaning[0].slice(3)}: ${meaning[1]?.slice(2)}` : meaning[0].slice(2)) 

    return (
        <ResultStyle className={"search-result" + props.className && ' ' + props.className} onClick={props.onClick}>
            <div className="line1">
                <div className="word">{word}</div>
                <div className="pronunciation">{pronunciation}</div>
            </div>
            <div className="line2">{shortMeaning}</div>
        </ResultStyle>
    )
}

const ResultStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 52px;
    border-bottom: 1px solid #ccc;

    .line1 {
        display: flex;
        .word {
            font-weight: 500;
        }
        .pronunciation {
            margin-left: auto;
        }
    }

    .line2 {
        overflow: clip;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`