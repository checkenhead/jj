import React from 'react'

import Header from './common/header';
import Sub from './common/sub';
import Feeds from './feed/feeds';

function Main() {
  return (
    <div className="wrap_main">
        <header><Header/></header>
        <main><Feeds/></main>
        <aside><Sub/></aside>
    </div>
  )
}

export default Main
