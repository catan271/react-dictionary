import React from 'react'
import styled from 'styled-components'

export function handleAbout() {
    const about = document.getElementById('about-layout')
    if (about.style.visibility === 'visible') about.style.visibility = 'hidden'
    else (about.style.visibility = 'visible')
}

export default function About() {
    return (
        <AboutStyle id="about-layout" style={{visibility: 'hidden'}}>
            <div className="about-dialog">
                <div className="header">
                    <p>Thông tin ứng dụng</p>
                    <i onClick={handleAbout} className="close fas fa-times"></i>
                </div>
                <div className="about">
                    <p>Tên ứng dụng: React Dictionary</p>
                    <p>Tác giả: Trần Đức Cảnh - Catan</p>
                    <p>Framework: ReactJS</p>
                    <p>Phiên bản: 1.1.0</p>
                </div>
            </div>
        </AboutStyle>
    )
}

const AboutStyle = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .about-dialog {
        width: 320px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #fff;

        .header {
            height: 36px;
            background-color: #007ACD;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;

            .close:hover {
                color: #E81123;
            }
        }

        .about {
            padding: 12px;
            background-color: #fff;
        }
    }
`