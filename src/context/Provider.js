import React, { useState } from 'react'

export const TypeContext = React.createContext()
export const SetTypeContext = React.createContext()

export default function Provider({children}) {
    const [type, setType] = useState('english')

    return (
        <TypeContext.Provider value={type}>
            <SetTypeContext.Provider value={setType}>
                {children}
            </SetTypeContext.Provider>
        </TypeContext.Provider>
    )
}