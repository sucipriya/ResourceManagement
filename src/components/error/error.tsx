import { WarningOutlined } from "@ant-design/icons";
import "./error.scss";

const Error = ({ message }) => {
  return (
    <div className="error-msg">
      <WarningOutlined />
      {message}
    </div>
  );
};

export default Error;
