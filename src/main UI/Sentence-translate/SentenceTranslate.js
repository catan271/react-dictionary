import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import * as GoogleTTS from 'google-tts-api'

const defaultLanguages = [
    {
        display: 'Tiếng Anh',
        api: 'en'
    },
    {
        display: 'Tiếng Việt',
        api: 'vi'
    }
]

export default function SentenceTranslate(props) {
    const [languages, setLanguages] = useState(defaultLanguages)
    const sourceText = useRef()
    const targetText = useRef()
    let sourceAudio, targetAudio

    const changeLanguages = () => {
        setLanguages(lang => [lang[1], lang[0]])
    }

    const handleInput = (e) => {
        sourceAudio = undefined
        targetAudio = undefined
    }

    const playSourceAudio = () => {
        translate()
        if (sourceAudio) sourceAudio.play()
    }

    const playTargetAudio = () => {
        if (targetAudio) targetAudio.play()
    }

    const translate = () => {        
        const source = sourceText.current.value
        if (source.length === 0) return 
        sourceAudio = new Audio(GoogleTTS.getAudioUrl(source, {
            lang: languages[0].api,
            slow: false,
            host: 'https://translate.google.com'
        }))
        axios.request({
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            params: {
                from: languages[0].api,
                to: languages[1].api,
                'api-version': '3.0',
                profanityAction: 'NoAction',
                textType: 'plain'
            },
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
                'x-rapidapi-key': '840e0524ddmsh2fa20e36b1d6968p1f77f5jsn8a3ab2b085be'
            },
            data: [{Text: source}]
        })
            .then(res => {
                const target = res.data[0].translations[0].text
                targetAudio = new Audio(GoogleTTS.getAudioUrl(target, {
                    lang: languages[1].api,
                    slow: false,
                    host: 'https://translate.google.com'
                }))
                targetText.current.innerText = target
            })
            .catch(e => console.log(e))
        
    }

    const preventEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            // prevent default
            e.preventDefault()
            translate()
        }
    }

    return (
        <SentenceTranslateStyle>
            <div className="header">
                <div className="language">{languages[0].display}</div>
                <i className="fas fa-2x fa-exchange-alt" onClick={changeLanguages}></i>
                <div className="language">{languages[1].display}</div>
            </div>
            <div className="translate">
                <form className="source" onSubmit={(e) => e.preventDefault()}>
                    <textarea type="text" ref={sourceText} onChange={handleInput} onKeyDown={preventEnter}/>
                    <i className="speak fas fa-2x fa-volume-up" onClick={playSourceAudio}></i>
                    <button onClick={translate}>Dịch</button>
                </form>
                <div className="target">
                    <div className="text" ref={targetText}></div>                    
                    <i className="speak fas fa-2x fa-volume-up" onClick={playTargetAudio}></i>
                </div>
            </div>
        </SentenceTranslateStyle>
    )
}

const SentenceTranslateStyle = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .header {
        height: 100px;
        background-color: #064279;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        .language {
            flex: 1;
            text-align: center;
            font-size: 24px;
        }
    }

    .translate {
        flex: 1;

        .source {
            height: 50%;
            background-color: #F2F3F4;

            textarea {
                height: 80%;
                resize: none;
                font-size: 18px;
                width: 100%;
                background-color: transparent;
                padding: 24px;
            }

            button {
                position: absolute;
                right: 40px;
                height: 32px;
                width: 64px;
                border-radius: 4px;
                background-color: #0d83f2;
                font-size: 20px;
                color: white;
            }
            button:hover {
                cursor: pointer;
                opacity: 0.9;
            }
        }

        .target {
            height: 50%;

            .text {
                height: 80%;
                padding: 24px;
                font-size: 18px;
            }
        }

        .speak {
            padding-left: 24px;
            color: #888888;
        }
        .speak:hover {
            color: #0C7BCC;
        }
    }
`