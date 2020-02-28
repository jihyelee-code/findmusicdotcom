import React from "react";
import { HashRouter, Route } from "react-router-dom";
import img0 from "../image/0.jpg";
import img1 from "../image/1.jpg";
import img2 from "../image/2.jpg";
import img3 from "../image/3.jpg";
import img4 from "../image/4.jpg";
import img5 from "../image/5.jpg";
import img6 from "../image/6.jpg";
import img7 from "../image/7.jpg";
import img8 from "../image/8.jpg";
import img9 from "../image/9.jpg";
import img10 from "../image/10.jpg";
import img11 from "../image/11.jpg";
import img12 from "../image/12.jpg";
import img13 from "../image/13.jpg";
import img14 from "../image/14.jpg";
import img15 from "../image/15.jpg";
import img16 from "../image/16.jpg";
import img17 from "../image/17.jpg";
import img18 from "../image/18.jpg";
import img19 from "../image/19.jpg";
import img20 from "../image/20.jpg";
import img21 from "../image/21.jpg";
import Home from "./Home";
import Result from "../routes/Result";
import Body from "./Body";
import Album_title from "../routes/Album_title";
import Artist_title from "../routes/Artist_title";
import Info from './Info';
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    html,body{
        height:100%;
        width:100%;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }
    #root{
      width:100%;
      min-height:100vh;
      background-position:center center;
      background-repeat:no-repeat;
      background-size:cover;
      background-attachment:fixed;
      z-index:-1;
    }
`;

function App() {
  const bgArray = [
    `url(${img0})`,
    `url(${img1})`,
    `url(${img2})`,
    `url(${img3})`,
    `url(${img4})`,
    `url(${img5})`,
    `url(${img6})`,
    `url(${img7})`,
    `url(${img8})`,
    `url(${img9})`,
    `url(${img10})`,
    `url(${img11})`,
    `url(${img12})`,
    `url(${img13})`,
    `url(${img14})`,
    `url(${img15})`,
    `url(${img16})`,
    `url(${img17})`,
    `url(${img18})`,
    `url(${img19})`,
    `url(${img20})`,
    `url(${img21})`
  ];
  const bgNum = Math.floor(Math.random() * 22);
  document.querySelector("#root").style.backgroundImage = bgArray[bgNum];


  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <Home></Home>
      <Route exact path="/" component={Body}></Route>
      <Route exact path="/:id" component={Result}></Route>
      <Route exact path="/album/:id" component={Album_title}></Route>
      <Route exact path="/artist/:id" component={Artist_title}></Route>
      <Info></Info>
    </HashRouter>
  );
}

export default App;
