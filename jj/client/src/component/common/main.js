import React, { useRef } from 'react'

function Main({ component }) {

    const currComponent = useRef();
    
    return (
        <main ref={currComponent}>
            {component}
        </main>
    )
}

export default Main
