import React,{ useState, useContext } from 'react'
import styled from 'styled-components'

import { SetTypeContext } from '../context/Provider';
import { handleAbout } from './About';

export default function Sidebar() {
    const [index, setIndex] = useState(0);
    const setType = useContext(SetTypeContext)

    return (
        <SidebarStyle>
            <div 
                className={"tab-item" + (index === 0? ' selected' : '')}  
                onClick={() => {
                    setIndex(0)
                    setType('english')
                }}
            >
                <i className="fas fa-2x fa-book-open"></i>
                <span className="tooltip">Tra từ Anh - Việt</span>
            </div>
            <div 
                className={"tab-item" + (index === 1? ' selected' : '')} 
                onClick={() => {
                    setIndex(1)
                    setType('vietnamese')
                }}
            >
                <i className="fas fa-2x fa-book-open"></i>
                <span className="tooltip">Tra từ Việt - Anh</span>
            </div>
            <div 
                className={"tab-item" + (index === 2? ' selected' : '')} 
                onClick={() => {
                    setIndex(2)
                    setType('history')
                }}
            >
                <i className="fas fa-2x fa-clock"></i>
                <span className="tooltip">Lịch sử tra từ</span>
            </div>
            <div 
                className={"tab-item" + (index === 3? ' selected' : '')} 
                onClick={() => {
                    setIndex(3)
                    setType('bookmark')
                }}
            >
                <i className="fa fa-2x fa-bookmark"></i>
                <span className="tooltip">Từ đã đánh dấu</span>
            </div>
            <div 
                className={"tab-item" + (index === 4? ' selected' : '')} 
                onClick={() => {
                    setIndex(4)
                    setType('sentence')
                }}
            >
                <i className="fa fa-2x fa-language"></i>
                <span className="tooltip">Dịch câu</span>
            </div>
            <div onClick={handleAbout} className="tab-item" style={{marginTop: 'auto'}}>
                <i className="fas fa-2x fa-info-circle"></i>
            </div>
        </SidebarStyle>
    )
}

const SidebarStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 60px;
    height: 100%;
    padding: 8px;
    gap: 8px;
    background-color: #004F99;

    .tab-item {
        position: relative;
        height: 44px;
        width: 44px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0A72C2;
        border-radius: 8px;
    }

    .tab-item.selected {
        color: #0A72C2;
        background-color: white;
    }

    .tab-item:hover {
        cursor: pointer;
    }

    .tab-item .tooltip {
        visibility: hidden;
        width: 150px;
        height: 36px;
        line-height: 36px;
        background-color: #0d83f2;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        position: absolute;
        z-index: 1;
        left: 120%;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
    }

    .tab-item .tooltip::before {
        content: "";
        position: absolute;
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent #0d83f2 transparent transparent;
    }

    .tab-item:hover .tooltip {
        visibility: visible;
    }
`