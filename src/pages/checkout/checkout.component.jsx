import { useLocation } from 'react-router-dom';

import './checkout.styles.scss';

const CheckoutPage = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <h1>Checkout Page</h1>
    </div>
  );
};

export default CheckoutPage;
