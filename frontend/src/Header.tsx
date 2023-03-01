import React from "react";
import { Menu } from 'antd';
import classnames from "classnames";

import {  useNavigate } from "react-router-dom";
import css from "./Header.module.scss";


export const Header: React.FC = () => {
    const navigate = useNavigate();

    return ( <div className={classnames(css.header)}>
      <div className={classnames(css.title)}> Neil Pinto </div>
      <nav className={classnames(css.navWrapper)} id="nav-header"><Menu defaultSelectedKeys={[window.location.pathname]} mode="horizontal" style={{color: "#fcad03", borderBottom: "none"}}>
        <Menu.Item key="/messages" onClick={() => navigate("/messages")}>
            <span className={classnames(css.navWrapperText)}> Messages </span>
        </Menu.Item>
        <Menu.Item key="/memories" onClick={() => navigate("/memories")}>
        <span className={classnames(css.navWrapperText)}> Memories </span>
        </Menu.Item>
        <Menu.Item
          key="/photos" onClick={() => navigate("/photos")}>
             <span className={classnames(css.navWrapperText)}> Photos </span>
        </Menu.Item>
        <Menu.Item
          key="/" onClick={() => navigate("/")}>
             <span className={classnames(css.navWrapperText)}> Home </span>
        </Menu.Item>
      </Menu>
      </nav>

    </div>)
}