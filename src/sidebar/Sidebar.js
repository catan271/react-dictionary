import React,{ useState, useContext } from 'react'
import styled from 'styled-components'

import { SetTypeContext } from '../context/Provider';

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
            </div>
            <div 
                className={"tab-item" + (index === 1? ' selected' : '')} 
                onClick={() => {
                    setIndex(1)
                    setType('vietnamese')
                }}
            >
                <i className="fas fa-2x fa-book-open"></i>
            </div>
            <div className={"tab-item" + (index === 2? ' selected' : '')} onClick={() => setIndex(2)}>
                <i className="fas fa-2x fa-clock"></i>
            </div>
            <div className={"tab-item" + (index === 3? ' selected' : '')} onClick={() => setIndex(3)}>
                <i className="fa fa-2x fa-bookmark"></i>
            </div>
            <div className="tab-item" style={{marginTop: 'auto'}}>
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
`