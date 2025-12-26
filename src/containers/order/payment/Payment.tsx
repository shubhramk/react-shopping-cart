import { useContext } from "react";
import { UserContext } from "../../../common/context/context";

const Payment = () => {
  const user = useContext(UserContext);
  return <h2>Payment Section for {user?.name}</h2>;
};

export default Payment;