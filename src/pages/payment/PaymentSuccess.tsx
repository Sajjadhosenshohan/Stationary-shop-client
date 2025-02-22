import { Button } from "antd";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div>
      Payment success
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
