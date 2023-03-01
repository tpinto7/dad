import React, { useEffect, useState } from "react";
import { Menu, Layout, Button, Col, Row } from 'antd';
import { EditOutlined, HeartOutlined } from '@ant-design/icons';
import TypeIt from "typeit-react";
// import Icons from '../components/Icons';
import scrollDown from './images/scrolldown.gif';
import { Animated } from 'react-animated-css';
import wedding from "./images/wedding.jpeg";
import ReactWordcloud from "react-wordcloud";
import { Navigate, useNavigate } from "react-router-dom";

import classnames from "classnames";
import css from "./Home.module.scss";
import { Header } from "./Header";
import { fetchRequest } from "./Fetch";
import { AddNameModal } from "./AddNameModal";

import { HomeFooter } from "./HomeFooter";
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

export type Name = { 
  text: string; 
  value: number;
}

const callbacks = { 
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: (word: any) => {},
}

export const Home: React.FC = () => { 
  const [names, setNames] = useState<Name[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const scrollTo = (id: string) => {
    const elmnt = document.getElementById(id);
    if (elmnt != null) { 
      elmnt.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
  const getNames = async () => { 
      await fetchRequest(
          "/names",
          null, 
          "GET",
          (data: any) => {
            const newNames: Name[] = [];
            data.names.forEach((name: any) => { 
              newNames.push({
                text: name.name,
                value: name.value,
              });
            })

              setNames(newNames);
          }
      );
      
  }

  const handleNewName = () => { 
      setVisible(false);
      getNames();
  }

  useEffect(() => { 
      getNames();
  }, []);    
  
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
              strings: ["Proud father", "Loving husband", "Soccer star", "Boxer advocate", "Denlow Dad", "Beach Boy", "BOM -> SFO -> YYZ", "Gym social butterfly", "Koroga champion", "Legendary storyteller"],
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
          <img src={scrollDown} onClick={() => scrollTo("homeIntro")} width="50%"/>
        </div>
      </div>
      {/* <div className={classnames(css.homeContent)}>  */}
      <div className={classnames(css.homeContent)} id="homeIntro">
        <div className={classnames(css.intro)}>
          <img src={wedding} className={classnames(css.homeImage)} />
          
          <div className={classnames(css.introText)}>
            <div className={classnames(css.introTextTitle)}> 
              Neil Pinto
            </div>
            Neil Pinto was a family man through and through. He raised three children, Ryan, Tyler and Caitlyn, his pride and joy. He was a caring husband to Jennifer Noronha, their 30th year anniversary 
            upcoming this July. Neil was the life of every party, and lit up every room he was in; he was a man larger than life. Neil was born in Mumbai and spent his summers in Goa, before he moved for
            his MBA at San Jose and spent the better of seven years in the Bay Area. After meeting Jennifer, he moved to Toronto where he brought up his family and grew a successful business. He loved soccer and all sports, and was a
            beloved coach and player. We all love you Neil. Please leave a message and share pictures and memories of Neil so we can all celebrate him together.
          </div>
        </div>
        <div> 
          <div className={classnames(css.donateText)}>
            Neil often expressed his love for helping kids in need. Please consider donating to Sick Kids or Covenant House as he did in lieu of flowers or cards.
          </div>
          <div className={classnames(css.donateButtonsWrapper)}>
            <Button className={classnames(css.sickKids)} icon={<HeartOutlined />} href="https://secure.sickkidsfoundation.com/donate?appeal=GEA-DIGT-SKR&utm_source=sickkids.ca&utm_adtype=donatenowlink&utm_medium=referral">Donate to Sick Kids</Button>
            <Button icon={<HeartOutlined />} href="https://secure.covenanthouse.ca/page/47922/donate/1/?transaction.recurrpay=N&_ga=2.257452555.18835442.1677695710-1721505139.1677695710">Donate to Covenant House</Button>
          </div>
        </div>
        <div className={classnames(css.addButton)}> <Button onClick={() => setVisible(true)} icon={<EditOutlined />}> Add your name </Button> </div>
        <div className={classnames(css.wordcloudWrapper)}>
          <ReactWordcloud words={names} callbacks={callbacks}/> 
        </div>
        <AddNameModal visible={visible} onCancel={() => setVisible(false)} onOk={handleNewName}/>
      </div>
      <HomeFooter />

      {/* </div> */}
      </>
    ); 
}