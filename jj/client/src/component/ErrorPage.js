import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className='errorPage_wrap'>
            <h1> 잘못된 접근입니다 </h1>
            <Link to={'/'}><img src='https://mblogthumb-phinf.pstatic.net/MjAyMDExMTJfMTM0/MDAxNjA1MTExOTQ2Njgz.GvDZ2gEtl0RJ8xPaWtQ5odaZyd7qEKolPnbsPLMcohEg.SwPeDQVqMZt67VixV7_iKI5_Vujg43yjKWkzc7NyMlMg.JPEG.gold8106/Screenshot%EF%BC%BF20201013%EF%BC%8D143848%EF%BC%BFChrome.jpg?type=w800'></img></Link>
        </div>
    )
}

export default ErrorPage
