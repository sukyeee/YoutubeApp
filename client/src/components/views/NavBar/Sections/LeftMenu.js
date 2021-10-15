import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    {/* <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item> */}
    <SubMenu title={<span>Category</span>}>
      <MenuItemGroup title="Life">
        <Menu.Item key="setting:0"> <a href={`/category/0`}>Film & Animation</a> </Menu.Item>
        <Menu.Item key="setting:1"><a href={`/category/1`}>Autos & Vehicles</a>  </Menu.Item>
        <Menu.Item key="setting:2"><a href={`/category/2`}>Music</a>  </Menu.Item>
        <Menu.Item key="setting:3"><a href={`/category/3`}>Pets & Animals</a>  </Menu.Item>
        <Menu.Item key="setting:4"><a href={`/category/4`}>Study</a>  </Menu.Item>
        
      </MenuItemGroup>
      <MenuItemGroup title="Game">
        <Menu.Item key="setting:5"> <a href={`/category/5`}>GrandChase</a> </Menu.Item>
        <Menu.Item key="setting:6"> <a href={`/category/6`}>etc</a> </Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu