import React from 'react'
import Header from '../common/header';
import Sub from '../common/sub';
import '../../style/members/message.css';

function message() {
  return (
    <div className="wrap_main">
    <header><Header/></header>
    <main>

        <div className='messagebox'>
        
          <div className='friend'>
              
          </div>
          <hr />
          <div className='message'>
              <div className='row received'>
                  
              </div>
              <div className='row sent'>
                  
              </div>
              <div className='row sent'>
                  
              </div>
              <div className='row received'>
                  
              </div>
              <div className='inputmessage'>
              <input type='text' />
              <button id="sendbtn">SEND</button>
              </div>
              

          </div>
          </div>

    </main>
    <aside id="aside"><Sub/></aside>
</div>
  )
}

export default message
