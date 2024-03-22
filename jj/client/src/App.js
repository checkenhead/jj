import React, { useRef, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';


function App() {
  // const currScroll = useRef(0);
    // const root = document.getElementById("root");
    // const main = useRef();
    // const aside = useRef();
    // const main = document.getElementById("main");
    // const aside = document.getElementById("aside");

  // const syncScroll = () => {
    

    // console.log("main.style.height : ", main.scrollHeight);
    // console.log("aside.style.height : ", aside.scrollHeight);


    // if (aside) {
    //   const bodyScroll = document.documentElement.scrollTop;
    //   // const sub = document.getElementById("aside");

    //   main.scrollTop += bodyScroll - currScroll.current;
    //   aside.scrollTop += bodyScroll - currScroll.current;
    //   currScroll.current = bodyScroll;
    // }
    // console.log("window.scrollY : ", window.scrollY);
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', syncScroll);
  //   // scrollAside.current.addEventListener('scroll', syncScroll);

  //   return () => {
  //     window.removeEventListener('scroll', syncScroll);
  //     // scrollAside.current.addEventListener('scroll', syncScroll);
  //   }
  // }, []);

  // useEffect(() => {


    // if (root && main && aside) {
      // root.style.height = main.scrollHeight > aside.scrollHeight ?
      //   main.scrollHeight : aside.scrollHeight;

      // console.log("main.style.height : ", main.scrollHeight);
      // console.log("aside.style.height : ", aside.scrollHeight);
    // }

    // console.log(1);


    // root.style.height = '3000px';
    // main의 height가 짧아 스크롤이 없을때(main의 height가 sub의 height보다 작을때) sub가 스크롤 되지 않는데 이때는 root의 height를 조정하여 강제로 스크롤 생성

  // });

  return (
    <RouterProvider router={root}></RouterProvider>
  );
}

export default App;
