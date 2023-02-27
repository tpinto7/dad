import React from "react";
import { Menu, Avatar } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';
import TypeIt from "typeit-react";
// import Icons from '../components/Icons';
import profile from './images/profileIcon.jpg';
import { Animated } from 'react-animated-css';
import background from "./images/dadInGumbo.jpeg";
import ReactWordcloud from "react-wordcloud";
import { Navigate, useNavigate } from "react-router-dom";

import classnames from "classnames";
import css from "./Home.module.scss";
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
    return (
      <>
        <div className={classnames(css.home)} style={{ backgroundImage: `url(${background})`}}>
       
        <div className={classnames(css.homeContent)}>
          {/* <Animated animationIn="bounceInDown" animationInDelay={1000}> */}
            <h1 className={classnames(css.homeTitle)}>A Celebration of Neil</h1>
          {/* </Animated> */}
          <TypeIt
            className={classnames(css.homeTypeIt)}
            options={{
              strings: ["Proud father", "Loving husband", "Soccer star", "Boxer advocate", "Legendary storyteller"],
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
          <DownCircleOutlined/>
        </div>
      </div>
      <ReactWordcloud words={words}/> 
      </>
    ); 
}