import React from "react";
import { Menu } from 'antd';
import classnames from "classnames";

import {  useNavigate } from "react-router-dom";


export const Header: React.FC = () => { 
    const navigate = useNavigate();
    return ( <div>
    <nav id="nav-header"><Menu theme="dark" mode="horizontal">
      <Menu.Item
        key="home" onClick={() => navigate("/")}>
          Home
      </Menu.Item>
      <Menu.Item
        key="photos" onClick={() => navigate("/photos")}>
          Photos
      </Menu.Item>
      <Menu.Item key="memories" onClick={() => navigate("/memories")}>
          Memories
      </Menu.Item>
      <Menu.Item key="messages" onClick={() => navigate("/messages")}>
          Messages
      </Menu.Item>
    </Menu>
    </nav>

  </div>)
}