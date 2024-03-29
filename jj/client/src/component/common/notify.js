import React, { useState, useEffect, useRef } from 'react'
import ImgCancel from '../../images/cancel.png'
import { useSelector, useDispatch } from 'react-redux';
import { setMessageAction } from '../../store/notifySlice';

function Notify() {
  const notify = useSelector(state => state.notify);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const timeout = useRef(null);

  useEffect(() => {
    if (notify && notify.message) {
      setIsOpen(true);

      timeout.current = setTimeout(() => {
        setIsOpen(false);
        dispatch(setMessageAction(''));
      }, 5000);
    }
  }, [notify, notify.message]);

  return (
    <div className={`wrap_notify ${isOpen ? 'appear' : null}`}>
      <div className="close" onClick={() => {
        setIsOpen(false);
        dispatch(setMessageAction(''));
        clearTimeout(timeout.current);
      }}><img src={ImgCancel} /></div>
      <div className="notify">
        {notify.message}</div>
    </div>
  )
}

export default Notify
