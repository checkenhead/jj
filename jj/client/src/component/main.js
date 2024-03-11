import React, {useEffect} from 'react'

import Header from './common/header';
import Sub from './common/sub';
import Feeds from './feed/feeds';

function Main() {
  let currScroll = 0;

  const syncScroll = () => {
    const bodyScroll = document.documentElement.scrollTop;
    const sub = document.getElementById("aside");

    sub.scrollTop += bodyScroll - currScroll;
    currScroll = bodyScroll;    
  }

  useEffect(() => {
    window.addEventListener('scroll', syncScroll);

    return () => {
      window.removeEventListener('scroll', syncScroll);
    }
  }, []);

  return (
    <div className="wrap_main">
        <header><Header/></header>
        <main><Feeds/></main>
        <aside id="aside"><Sub/></aside>
    </div>
  )
}

export default Main
