import { Button, Result } from "antd";
import { Link, useParams } from "react-router-dom";
const PaymentSuccess = () => {
  const { transactionId } = useParams();
  console.log(transactionId);
  return (
    <div className="flex items-center justify-center  min-h-screen">
      <div className="bg-white p-20 rounded-2xl">
        <Result
          status="success"
          title="Successfully Purchased The Products!"
          subTitle={`Transaction Id: ${transactionId}`}
          extra={[
            <Button key="buy">Back to home</Button>,
            
            <Link to="/dashboard/order-history">
              <Button type="primary" key="console">
                Show order history
              </Button>
            </Link>,
          ]}
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
