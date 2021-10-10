import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import * as GoogleTTS from 'google-tts-api'

import { MeaningContext } from '../../context/Provider'
import { saveWord, deleteBookmark, getBookmark } from '../../local/Bookmark'
import { saveWordHistory } from '../../local/History'

const exampleRegex = /= ?([^+]+)\+ ?(.+)/

const createLine = (index, line, type) => {
    return <div className={type} key={index}>{line}</div>
}

const generateSrc = (word, lang) => {
    return GoogleTTS.getAudioUrl(word, {
        lang,
        slow: false,
        host: 'https://translate.google.com'
    })
}

export default function MeaningView() {
    const word = useContext(MeaningContext)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (word.word) saveWordHistory(word)
        if (getBookmark()) {
            setSaved(getBookmark().some(each => each.index === word.index && each.lang === word.lang)? true : false)
        }
    }, [word])

    const playAudioUS = () => {
        const audio = document.getElementById("us-pronounce")
        if (audio) audio.play()
    }

    const playAudioUK = () => {
        const audio = document.getElementById("uk-pronounce")
        if (audio) audio.play()
    }

    const playAudioVI = () => {
        const audio = document.getElementById("vi-pronounce")
        if (audio) audio.play()
    }

    const handleBookmark = () => {
        if (word.index) {
            if (saved) {
                deleteBookmark(word)
                setSaved(false)
            } else {
                saveWord(word)
                setSaved(true)
            }
        }
    }

    return (
        <MeaningStyle>
            <div className="header">
                <div className="left">
                    <div style={{display: 'flex'}}>
                        <i className="fas fa-edit" style={{marginRight: 16}}></i>
                        <i onClick={handleBookmark} className={`${saved? 'fas' : 'far'} fa-bookmark`}></i>
                    </div>
                    <div><span style={{fontSize: 40}}>{word.word || 'Catan Dictionary'}</span><span style={{marginLeft: 16}}>{word.pronunciation}</span></div>
                </div>
                {word.lang === 'english' && <div className="right">
                    <div className="pronounce us" onClick={playAudioUS}>US <i className="fas fa-volume-up"></i>
                        <audio id="us-pronounce" src={generateSrc(word.word, 'en-US')} type="audio/mpeg"/>
                    </div>
                    <div className="pronounce uk" onClick={playAudioUK}>UK <i className="fas fa-volume-up"></i>
                        <audio id="uk-pronounce" src={generateSrc(word.word, 'en-UK')}/>
                    </div>
                </div>}
                {word.lang === 'vietnamese' && <div className="right">
                    <div className="pronounce vi" onClick={playAudioVI}>VI <i className="fas fa-volume-up"></i>
                        <audio id="vi-pronounce" src={generateSrc(word.word, 'vi-VN')}/>
                    </div>
                </div>}
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
            .pronounce.vi:hover{
                color: #F7F700;
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