import React from "react";
import { Menu, Layout, Row, Col } from 'antd';
import classnames from "classnames";
import css from "./HomeFooter.module.scss";

import {  useNavigate } from "react-router-dom";
const { Footer } = Layout;

export const HomeFooter: React.FC = () => { 
    const navigate = useNavigate();
    const scrollTo = (id: string) => {
        const elmnt = document.getElementById(id);
        if (elmnt != null) { 
          elmnt.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    return ( <Footer className={classnames(css.homeFooter)}>
    <nav>
      <div className={classnames(css.footerLinksWrapper)}>
        <Row>
          <Col span={6} className={classnames(css.linkItemWrapper)}>
            <a className={classnames(css.linkItem)}
              key="home" onClick={() => scrollTo("nav-header")}>
                Go Back Up
            </a>
          </Col>
          <Col span={6} className={classnames(css.linkItemWrapper)}>
          <a className={classnames(css.linkItem)}
            key="photos" onClick={() => navigate("/photos")}>
              Photos
          </a>
          </Col>
          <Col span={6} className={classnames(css.linkItemWrapper)}>
            <a className={classnames(css.linkItem)} key="memories" onClick={() => navigate("/memories")}>
                Memories
            </a>
          </Col>
          <Col span={6} className={classnames(css.linkItemWrapper)}>
          <a className={classnames(css.linkItem)} key="messages" onClick={() => navigate("/messages")}>
              Messages
          </a>
          </Col>
        </Row>
        <div className={classnames(css.footerTag)}>
          Made with ❤️ for Neil by Tyler. We love you dad. 
        </div>
      </div> 
    
    </nav>

  </Footer>)
}