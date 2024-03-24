import React, { useState, useEffect, useRef } from 'react'

function Main({ component }) {
    const root = document.getElementById('root');
    const currComponent = useRef();
    const currScroll = useRef(0);
    const scrollPositionRatio = useRef(0);

    const syncScroll = () => {
        const bodyScroll = document.documentElement.scrollTop;

        currComponent.current.scrollTop += bodyScroll - currScroll.current;
        currScroll.current = bodyScroll;
    }

    const setHeight = () => {
        if(currComponent.current){
            const rootHeight = Number(root.style.height.toString().replace('px', ''));

            if (rootHeight < currComponent.current.scrollHeight) {
                root.style.height = currComponent.current.scrollHeight.toString() + 'px';
            }

            const bodyScroll = document.documentElement.scrollTop;
            currComponent.current.scrollTop += bodyScroll - currScroll.current;
            currScroll.current = bodyScroll;
        }
    }

    

    const handleResize = () => {
        scrollPositionRatio.current = currScroll.current/document.documentElement.scrollHeight;
        setHeight();
        document.documentElement.scrollTop = document.documentElement.scrollHeight * scrollPositionRatio.current;
        console.log("resized");
    }

    

    useEffect(() => {
        

        const inteval = setInterval(() => {
            setHeight();
        }, 100);

        window.addEventListener('scroll', syncScroll);
        window.addEventListener("resize", handleResize);

        return (() => {
            clearInterval(inteval);
            window.removeEventListener('scroll', syncScroll);
            window.removeEventListener("resize", handleResize);
            document.documentElement.scrollTop = 0;
            root.style.height = 0;
        });
    }, []);

    return (
        <main ref={currComponent}>
            {component}
        </main>
    )
}

export default Main
