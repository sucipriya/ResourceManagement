import { Menu, Dropdown, Button, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Logout = ({ onClick }: any) => {
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={onClick}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Avatar size="small" icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default Logout;
