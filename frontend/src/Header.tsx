import React from "react";
import { Menu } from 'antd';
import classnames from "classnames";

import {  useNavigate } from "react-router-dom";
import css from "./Header.module.scss";


export const Header: React.FC = () => {
    const navigate = useNavigate();

    return ( <div className={classnames(css.header)}>
      <div className={classnames(css.title)}> Neil Pinto </div>
      <nav className={classnames(css.navWrapper)} id="nav-header"><Menu defaultSelectedKeys={[window.location.pathname]} mode="horizontal" style={{color: "#fcad03"}}>
        <Menu.Item key="/messages" onClick={() => navigate("/messages")}>
            Messages
        </Menu.Item>
        <Menu.Item key="/memories" onClick={() => navigate("/memories")}>
            Memories
        </Menu.Item>
        <Menu.Item
          key="/photos" onClick={() => navigate("/photos")}>
            Photos
        </Menu.Item>
        <Menu.Item
          key="/" onClick={() => navigate("/")}>
            Home
        </Menu.Item>
      </Menu>
      </nav>

    </div>)
}