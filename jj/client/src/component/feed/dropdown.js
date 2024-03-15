import React from 'react'



function dropdown({pagename}) {

    const curpage = pagename;
  return (
    <div>
      {
        {
            a : 
                <div className='dropdown_table'>
                    <div className='dropdown_button'><label>삭제</label></div>
                    <div className='dropdown_button'><label>수정</label></div>
                </div>

        }[curpage]
      }
    </div>
  )
}

export default dropdown
