import React from 'react'
import Header from '../common/header';
import Sub from '../common/sub';
import '../../style/members/message.css';
import { Link, useNavigate } from 'react-router-dom'
import ImgFriend from '../../images/crayon.jpg';

function message() {
  return (
    <div className="wrap_main">
    <header><Header/></header>
    <main>

      <div className='wrap_message'>

        <div className='allmsg'>
          <div className='msg'>
            <div className='msg received'>ABCDEABC</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div>

          {/* <div className='msg'>
            <div className='msg received'>ABCDEABC</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div><div className='msg'>
            <div className='msg received'>ABCDEABC</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div><div className='msg'>
            <div className='msg received'>ABCDEABC</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div><div className='msg'>
            <div className='msg received'>ABCDEABC</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div>
          <div className='msg'>
            <div className='msg sent'>ABCDEABCDEABCDEABCDEABCDEABCDE</div>
          </div> */}

          <div className='msgbtn'>
          <input type='text' className='inputmsg' />
          <button>SEND</button>
        </div>
          </div>




       

      </div>

    </main>
    
    <aside id="aside"><Sub/></aside>
</div>
  )
}

export default message
