import React, { useState } from 'react'

export const TypeContext = React.createContext()
export const SetTypeContext = React.createContext()
export const MeaningContext = React.createContext()
export const SetMeaningContext = React.createContext()


export default function Provider({children}) {
    const [type, setType] = useState('english')
    const [meaning, setMeaning] = useState({})

    return (
        <TypeContext.Provider value={type}>
            <SetTypeContext.Provider value={setType}>
                <MeaningContext.Provider value={meaning}>
                    <SetMeaningContext.Provider value={setMeaning}>
                        {children}
                    </SetMeaningContext.Provider>
                </MeaningContext.Provider>
            </SetTypeContext.Provider>
        </TypeContext.Provider>
    )
}