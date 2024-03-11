import React, { useEffect } from 'react'

import Footer from './footer';

function Sub() {
  

  return (
    <div className="wrap_sub" id="wrap_sub">
      <div className="search">
        <input type="text" list="recent_list" placeholder="Search here"/>
        {/* <button>Search</button> */}
        <datalist id="recent_list">
          <option value="가나다라"/>
          <option value="마바사"/>
          <option value="아자차카"/>
          <option value="타파하"/>
          <option value="abcd"/>
        </datalist>
      </div>
      <div style={{ margin: "30px 0" }}>Sub Content #1</div>
      <div style={{ margin: "30px 0" }}>Sub Content #2</div>
      <div style={{ margin: "30px 0" }}>Sub Content #3</div>
      <div style={{ margin: "30px 0" }}>Sub Content #4</div>
      <div style={{ margin: "30px 0" }}>Sub Content #5</div>
      <div style={{ margin: "30px 0" }}>Sub Content #6</div>
      <div style={{ margin: "30px 0" }}>Sub Content #7</div>
      <div style={{ margin: "30px 0" }}>Sub Content #8</div>
      <div style={{ margin: "30px 0" }}>Sub Content #9</div>
      <div style={{ margin: "30px 0" }}>Sub Content #10</div>
      <footer><Footer /></footer>
    </div>
  )
}

export default Sub
