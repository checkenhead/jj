import React from 'react'
import Spinner from '../src/Spinner@1x-1.0s-200px-200px.gif';

export default function loading() {
    return (
        <div>
            <h3>Now Loading....</h3>
            <img src={Spinner} alt='로딩' width="10%"/>
        </div>
    )
}
