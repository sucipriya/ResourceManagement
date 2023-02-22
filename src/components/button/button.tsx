import { Button } from "antd";
import { ButtonTypes } from "./types";

const ButtonComponent = ({
  type,
  label,
  htmlType,
  onClick,
  iconComp,
  danger,
  loading,
}: ButtonTypes) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      icon={iconComp}
      danger={danger}
      loading={loading}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
