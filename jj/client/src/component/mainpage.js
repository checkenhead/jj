import React, { useState, useRef } from 'react'

import Header from './common/header';
import Main from './common/main';
import Aside from './common/aside';
import Sub from './common/sub';
import Feeds from './feed/feeds';

function Mainpage() {
  const [newFeed, setNewFeed] = useState({});
  const scrollAside = useRef();
  // let currScroll = 0;

  // const syncScroll = () => {
  //   const bodyScroll = document.documentElement.scrollTop;
  //   const sub = document.getElementById("aside");

  //   sub.scrollTop += bodyScroll - currScroll;
  //   currScroll = bodyScroll;    
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', syncScroll);

  //   return () => {
  //     window.removeEventListener('scroll', syncScroll);
  //   }
  // }, []);

  return (
    <div className="wrap_main">
      <header><Header setNewFeed={setNewFeed} /></header>
      <Main component={<Feeds newFeed={newFeed} setNewFeed={setNewFeed} />} />
      <Aside component={<Sub scrollAside={scrollAside} />}/>
    </div>
  )
}

export default Mainpage
