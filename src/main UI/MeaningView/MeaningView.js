import React, { useContext } from 'react'
import styled from 'styled-components'

import { MeaningContext } from '../../context/Provider'

const exampleRegex = /= ?([^+]+)\+ ?(.+)/

function createLine(index, line, type) {
    return <div className={type} key={index}>{line}</div>
}

export default function MeaningView() {
    const word = useContext(MeaningContext)

    const playAudioUS = () => {
        let audio = document.getElementById('us-pronounce')
        if (audio) audio.play()
    }

    const playAudioUK = () => {
        let audio = document.getElementById('uk-pronounce')
        if (audio) audio.play()
    }

    return (
        <MeaningStyle>
            <div className="header">
                <div className="left">
                    <div style={{display: 'flex'}}>
                        <i className="fas fa-edit"></i>
                        <i className="fas fa-bookmark" style={{marginLeft: 16}}></i>
                    </div>
                    <div><span style={{fontSize: 40}}>{word.word || 'Catan Dictionary'}</span><span style={{marginLeft: 16}}>{word.pronunciation}</span></div>
                </div>
                <div className="right">
                    <div className="pronounce us" onClick={playAudioUS}>US <i className="fas fa-volume-up"></i>
                        {(word.word && (/^[a-z]+$/i).test(word.word)) && <audio id="us-pronounce" src={`https://ssl.gstatic.com/dictionary/static/sounds/oxford/${word.word}--_us_1.mp3`}/>}
                    </div>
                    <div className="pronounce uk" onClick={playAudioUK}>UK <i className="fas fa-volume-up"></i>
                        {(word.word && (/^[a-z]+$/i).test(word.word)) && <audio id="uk-pronounce" src={`https://ssl.gstatic.com/dictionary/static/sounds/oxford/${word.word}--_gb_1.mp3`}/>}
                    </div>
                </div>
            </div> 
            <div className="content">
                {word.meaning?.map((line, index) => {
                    switch (line[0]) {
                        case '*':
                            return createLine(index, line.slice(3), "part-of-speech")
                        case '-':
                            return createLine(index, line.slice(2), "one-meaning")
                        case '!':
                            return createLine(index, line.slice(1), "phrase")
                        case '=':
                            const example = exampleRegex.exec(line)
                            if (example) return <React.Fragment key={index}>
                                {createLine(index, example[1], 'example')}
                                {createLine(-index, example[2], 'example-meaning')}
                            </React.Fragment>
                            else return createLine(index, line)
                        default:
                            return createLine(index, line)
                    }
                })}
            </div>
        </MeaningStyle>
    )
}

const MeaningStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-weight: 500;

    .header {
        height: 100px;
        background-color: #084E91;
        display: flex;
        justify-content: space-between;
        padding: 8px 32px;
        color: white;

        .left, .right {
            display: flex;
            flex-direction: column;
            gap: 4px;
            justify-content: flex-end;
        }

        .right {
            gap: 8px;
            .pronounce:hover {
                cursor: pointer;
            }
            .pronounce.us:hover{
                color: #B32134;
            }
            .pronounce.uk:hover{
                color: #0C7BCC;
            }
        }
    }

    .content {
        flex: 1;
        padding: 16px 32px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: scroll;

        .part-of-speech {
            font-size: 24px;
            color: #064279;
        }

        .one-meaning {
            border-left: 4px solid #0A7BE9;
            padding-left: 8px;
        }

        .phrase {
            margin-left: -8px;
        }

        .phrase::before {
            content: '• '
        }

        .example {
            color: #0A7BE9;
        }
    }
`