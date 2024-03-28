import React, { useState } from 'react'

import Header from './common/header';
import Main from './common/main';
import Aside from './common/aside';
import Sub from './common/sub';
import Feeds from './feed/feeds';
import TopLayer from './common/toplayer';

function Mainpage() {
  const [newFeed, setNewFeed] = useState({});

  return (
    <div className="wrap_main">
      <header><Header setNewFeed={setNewFeed} /></header>
      <Main component={<Feeds newFeed={newFeed} setNewFeed={setNewFeed} />} />
      <Aside component={<Sub />}/>
      <TopLayer />
    </div>
  )
}

export default Mainpage
