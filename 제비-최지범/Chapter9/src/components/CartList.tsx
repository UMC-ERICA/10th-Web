import CartItem from "./CartItem";

import { useCartInfo } from "../hooks/useCartstore";

const CartList = () => {
  const { cartItems } = useCartInfo();

  return (
    <div className="flax flex-col items-center justify-center p-4 mr-10 ml-10">
      {cartItems?.map((music) => (
        <CartItem key={music.id} music={music} />
      ))}
    </div>
  );
};

export default CartList;
