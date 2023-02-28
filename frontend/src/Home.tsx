import React, { useState } from "react";
import { Menu, Avatar, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TypeIt from "typeit-react";
// import Icons from '../components/Icons';
import scrollDown from './images/scrolldown.gif';
import { Animated } from 'react-animated-css';
import grad from "./images/grad.jpg";
import ReactWordcloud from "react-wordcloud";
import { Navigate, useNavigate } from "react-router-dom";

import classnames from "classnames";
import css from "./Home.module.scss";
import { Header } from "./Header";
// function getRandomColor() {
//     const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
//     return color;
//   }
const arrowStyle = {
    fontSize: '64px', 
    color: 'white', 
    position: 'absolute', 
    top: '90%', 
    left: '50%',
    MsTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)'
}

const words = [
  {
    text: 'Ryan',
    value: 256, 
  },
  {
    text: 'Jen',
    value: 256, 
  },
  {
    text: 'Tyler',
    value: 256, 
  },
  {
    text: 'Caitlyn',
    value: 256, 
  },
  {
    text: 'Maureen',
    value: 256, 
  },
  {
    text: 'Joanne',
    value: 256, 
  },
  {
    text: 'Rafi',
    value: 256, 
  },
  {
    text: 'Rhea',
    value: 256, 
  },
  {
    text: 'Frankie',
    value: 256, 
  },
  {
    text: 'Megan',
    value: 256, 
  },
  {
    text: 'Savio',
    value: 256, 
  },
  {
    text: 'Ali',
    value: 256, 
  },
  {
    text: 'Hailey',
    value: 256, 
  },
]

export const Home: React.FC = () => { 
  const [visible, setVisible] = useState<boolean>(false);
    return (
      <>
        {/* <Header/>  */}
        <div className={classnames(css.home)} >
        <div className={classnames(css.homeMain)}>
          {/* <Animated animationIn="bounceInDown" animationInDelay={1000}> */}
            <h1 className={classnames(css.homeTitle)}>A Celebration of Neil</h1>
          {/* </Animated> */}
          <TypeIt
            className={classnames(css.homeTypeIt)}
            options={{
              strings: ["Proud father", "Loving husband", "Soccer star", "Boxer advocate", "Denlow Dad", "Beach Boy", "BOM -> SFO -> YYZ", "Gym social butterfly", "Legendary storyteller"],
              speed: 75,
              nextStringDelay: 1500,
              loopDelay: 50,
              loop: true,
              waitUntilVisible: true,
              breakLines: false,

            //   beforeString: function(step: any, instance: any) {
            //     instance.getElement().style.color = getRandomColor();
            //   }
            }}
          />

        </div>        
        <div className={classnames(css.homeArrow)}> 
          <img src={scrollDown} width="50%"/>
          {/* <DownCircleOutlined/> */}
        </div>
      </div>
      {/* <div className={classnames(css.homeContent)}>  */}
      <div className={classnames(css.homeContent)}>
        <div className={classnames(css.intro)}>
          <img src={grad} height={400} />
          
          <div className={classnames(css.introText)}>
            <div className={classnames(css.introTextTitle)}> 
              Neil Pinto
            </div>
            Neil Pinto was a family man through and through. He raised three children, Ryan, Tyler and Caitlyn, his pride and joy. He was a caring husband to Jennifer Noronha, their 30th year anniversary 
            upcoming this July. Neil was the life of every party, and lit up every room he was in; he was a man larger than life. Neil was born in Mumbai and spent his summers in Goa, before he moved for
            school at San Jose and spent the better of seven years in the Bay Area. After meeting Jennifer, he moved to Toronto where he brought up his family. He loved soccer and all sports, and was a
            beloved coach and player. We all love you Neil. Please leave a message and share pictures and memories of Neil so we can all celebrate him together.
          </div>
        </div>
        <div> <Button onClick={() => setVisible(true)} icon={<EditOutlined />}> Add your name </Button> </div>
        <div className={classnames(css.wordcloudWrapper)}>
          <ReactWordcloud words={words} /> 
        </div>
      </div>
      {/* </div> */}
      </>
    ); 
}