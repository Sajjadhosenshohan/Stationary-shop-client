import { Button } from "antd";
import { Link } from "react-router-dom";

export const PaymentFailed = () => {
  return (
    <div>
      PaymentFailed
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
};
