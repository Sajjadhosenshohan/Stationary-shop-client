import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const PaymentFailed = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-20 rounded-2xl">
        <Result
          status="error"
          title="Order Failed!"
          subTitle={`Please check again `}
          extra={[
            <Button key="buy">Back to home</Button>,
            
            <Link to="/products">
              <Button type="primary" key="console">
                Show products
              </Button>
            </Link>,
          ]}
        />
      </div>
    </div>
  );
};
