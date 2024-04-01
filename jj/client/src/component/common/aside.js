import React, { useEffect, useRef } from 'react'

function Aside({ component }) {

    const currComponent = useRef();
    const preScroll = useRef(0);

    const getComponentTop = () => Number(currComponent?.current?.style.top.replace('px', ''));

    const scrollDetector = () => {
        if(currComponent.current && currComponent.current.style){
            if (currComponent?.current?.scrollHeight < window.innerHeight) {
                currComponent.current.style.top = 0;
                return;
            }
            const currScroll = window.scrollY;
    
            if (preScroll.current < currScroll) {
                currComponent.current.style.top = (getComponentTop() - (currScroll - preScroll.current)) + 'px';
    
                if (getComponentTop() < (window.innerHeight - currComponent.current.scrollHeight)) {
                    currComponent.current.style.top = (window.innerHeight - currComponent.current.scrollHeight) + 'px';
                }
            } else {
                currComponent.current.style.top = (getComponentTop() - (currScroll - preScroll.current)) + 'px';
                if (getComponentTop() > 0) {
                    currComponent.current.style.top = 0;
                }
                // console.log(getComponentTop());
            }
    
            preScroll.current = currScroll;
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollDetector);
        return (() => {
            window.removeEventListener('scroll', scrollDetector);
        });
    }, []);

    return (
        <aside id="aside" ref={currComponent}>
            {component}
        </aside>
    )
}

export default Aside
