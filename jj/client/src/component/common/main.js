import React, { useEffect, useRef } from 'react'

function Main({ component }) {
    const root = document.getElementById('root');
    const currComponent = useRef();
    const currScroll = useRef(0);

    const syncScroll = () => {
        const bodyScroll = document.documentElement.scrollTop;

        currComponent.current.scrollTop += bodyScroll - currScroll.current;
        currScroll.current = bodyScroll;
    }

    useEffect(() => {
        const inteval = setInterval(() => {
            if(currComponent.current){
                const rootHeight = Number(root.style.height.toString().replace('px', ''));

                if (rootHeight < currComponent.current.scrollHeight) {
                    root.style.height = currComponent.current.scrollHeight.toString() + 'px';
                }
    
                const bodyScroll = document.documentElement.scrollTop;
    
                currComponent.current.scrollTop += bodyScroll - currScroll.current;
                currScroll.current = bodyScroll;
            }
        }, 100);

        window.addEventListener('scroll', syncScroll);

        return (() => {
            clearInterval(inteval);
            window.removeEventListener('scroll', syncScroll);
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
