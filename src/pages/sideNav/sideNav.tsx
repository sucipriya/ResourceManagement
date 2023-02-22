import { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  BarChartOutlined,
  AuditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";

import { Logout } from "src/pages/logout";
import "./sidenav.scss";

const { Header, Content, Sider } = Layout;

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogoutHandler = () => {
    navigate("/");
    sessionStorage.clear();
  };
  return (
    <Layout>
      <Header>
        <div className="employee-logo">
          <AuditOutlined />
          <div className="employee-title">Resource Management</div>
        </div>
        <div className="user-profile-name">
          {sessionStorage.getItem("profileName")}
          <Logout onClick={handleLogoutHandler} />
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsed={collapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            className="sidenave-menu-list"
          >
            <Menu.Item
              className={
                location.pathname === "/home" ? "ant-menu-item-selected" : ""
              }
              icon={<HomeOutlined />}
            >
              <NavLink to="/home">Home</NavLink>
            </Menu.Item>
            {sessionStorage.getItem("role") === "Admin" ? (
              <Menu.Item
                className={
                  location.pathname === "/home/chart"
                    ? "ant-menu-item-selected"
                    : ""
                }
                icon={<BarChartOutlined />}
              >
                <NavLink to="/home/chart">Chart</NavLink>
              </Menu.Item>
            ) : null}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {collapsed ? (
              <MenuUnfoldOutlined
                className="trigger menuIcon"
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                className="trigger menuIcon"
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SideNav;
