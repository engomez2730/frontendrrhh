import React from 'react';
import {  Layout, Menu } from 'antd';
import { items2 } from '../../Data/siderData';
const {  Sider } = Layout;


const Sidebar = () => {
    return (
        <Sider className="site-layout-background" width={250}>
          <Menu mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
            }}
            items={items2}
          />
        </Sider>
    );
}



export default Sidebar;
