import React from 'react'

function Editpost({feed}) {

    const onEditpost = () => {
        console.log('i');
        let ans = window.confirm('정말로 수정하시겠습니까?');
        if (ans) {
            axios.post('/api/feeds/updatebyid', {id: feed.id, writer: feed.writer, content: feed.content})
        }
    }

    return (
        <div style={{width:'100px', height:'100px', border: '1px solid red'}}>
            <h2>hi</h2>
        </div>
    )
}

export default Editpost
