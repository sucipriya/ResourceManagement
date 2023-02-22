import { Result, Button, Layout } from "antd";
import { Link } from "react-router-dom";

const NoPermission = ({ status, title, subTitle, navigation = "/" }: any) => {
  return (
    <Layout>
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          <Button type="primary">
            <Link to={navigation}>Back Home</Link>
          </Button>
        }
      />
    </Layout>
  );
};

export default NoPermission;
