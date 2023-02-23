import React from "react";
import { Menu, Avatar } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';
import TypeIt from "typeit-react";
// import Icons from '../components/Icons';
import profile from './images/profileIcon.jpg';
import { Animated } from 'react-animated-css';
import background from "./images/dadInGumbo.jpeg";

import classnames from "classnames";
import css from "./Home.module.scss";

const arrowStyle = {
    fontSize: '64px', 
    color: 'white', 
    position: 'absolute', 
    top: '90%', 
    left: '50%',
    MsTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)'
}

export const Home: React.FC = () => { 
    return (
        <div className={classnames(css.home)} style={{ backgroundImage: `url(${background})`}}>
        <div className={classnames(css.homeNav)}>
          <nav><Menu theme="dark" mode="horizontal">
            <Menu.Item
              key="home">
                Home
            </Menu.Item>
            <Menu.Item
              key="photos">
                Photos
            </Menu.Item>
            <Menu.Item key="memories">
                Memories
            </Menu.Item>
            <Menu.Item key="messages">
                Messages
            </Menu.Item>
          </Menu>
          </nav>

        </div>
        <div className={classnames(css.homeContent)}>
          {/* <Animated animationIn="bounceInDown" animationInDelay={1000}> */}
            <h1 className={classnames(css.homeTitle)}>A Celebration of Neil</h1>
          {/* </Animated> */}
          <TypeIt
            className={classnames(css.homeTypeIt)}
            options={{
              strings: ["Proud father", "Loving husband", "Soccer star", "Boxer advocate", ],
              speed: 75,
              nextStringDelay: 1500,
              loopDelay: 50,
              loop: true,
              waitUntilVisible: true,
              breakLines: false,
            //   beforeString: function(step, instance) {
            //     instance.getElement().style.color = getRandomColor();
            //   }
            }}
          />

        </div>        
        <div className={classnames(css.homeArrow)}> 
          <DownCircleOutlined/>
        </div>
      </div>
    ); 
}