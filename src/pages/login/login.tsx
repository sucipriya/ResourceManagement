import { useEffect, useState } from "react";
import { Form, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "src/api/APIHooks";
import { GET_USER_LOGIN } from "src/api/url";
import { InputField, Button, Error } from "src/components";
import { loginRule, passwordRule } from "./rules";
import "./login.scss";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const onFinish = (values: any) => {
    loginRefetch(
      `${GET_USER_LOGIN}?userName=${values?.userName}&password=${values?.password}`
    );
  };

  //api to login user details
  const {
    data: loginData,
    loading,
    error,
    refetch: loginRefetch,
  }: any = useQuery({
    url: `${GET_USER_LOGIN}`,
    disableInitialLoad: true,
  });

  useEffect(() => {
    if (loginData?.data?.length === 1) {
      sessionStorage.setItem("profileName", loginData?.data?.[0]?.profileName);
      sessionStorage.setItem(
        "role",
        loginData?.data?.[0]?.role?.includes("admin") ? "Admin" : "Standard"
      );
      navigate("/home");
    } else if (loginData?.data?.length === 0) {
      setLoginErrorMessage("Invalid username and password");
    }
  }, [loginData, navigate]);

  return (
    <div className="login-page">
      <Card className="login-card">
        <h1>Resource Management</h1>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <InputField
            name="userName"
            rules={loginRule}
            placeholder="Username"
            prefix={<UserOutlined />}
            onChange={() => setLoginErrorMessage("")}
          />
          <InputField
            name="password"
            rules={passwordRule}
            placeholder="Password"
            type="password"
            prefix={<LockOutlined />}
            onChange={() => setLoginErrorMessage("")}
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              label="Log in"
              loading={loading}
            />
          </Form.Item>
        </Form>

        {error?.message || loginErrorMessage ? (
          <Error message={error?.message || loginErrorMessage} />
        ) : null}
      </Card>
    </div>
  );
};

export default LoginForm;
