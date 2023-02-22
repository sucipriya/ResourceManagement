import { Alert, Space } from "antd";
import { IAlert } from "./types";

const AlertPage = ({ message, type, onClose }: IAlert) => {
  if (message) {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <Alert
          message={message}
          type={type}
          showIcon
          closable
          afterClose={onClose}
        />
      </Space>
    );
  } else {
    return null;
  }
};

export default AlertPage;
