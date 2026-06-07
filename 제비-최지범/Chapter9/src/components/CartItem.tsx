import type { Lp } from "../types/cart";
import { useCartActions } from "../hooks/useCartstore";

const CartItem = ({ music }: { music: Lp }) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncrase = (): void => {
    increase(music.id);
  };

  const handleDecrease = (): void => {
    if (music.amount <= 1) {
      removeItem(music.id);
      return;
    }
    decrease(music.id);
  };

  return (
    <div className="flex items-center gap-2 mt-4 w-full ">
      <img
        className="w-32 h-32 object-cover"
        src={music.img}
        alt={music.title}
      />
      <div className="flex flex-col gap-1 border-l h-32 p-2 border-gray-300">
        <h3 className="text-lg font-bold">{music.title}</h3>
        <p className="text-sm text-gray-500">{music.singer}</p>
        <p className="text-sm font-bold">{music.price}원</p>
      </div>
      <div className="flex items-center gap-2 ml-auto border border-gray-300 rounded">
        <button
          onClick={handleDecrease}
          className="w-10 bg-gray-200  py-1 px-3  hover:bg-gray-300"
        >
          -
        </button>
        <div className="w-6 text-center">{music.amount}</div>
        <button
          onClick={handleIncrase}
          className="w-10 bg-gray-200 py-1 px-3  hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
