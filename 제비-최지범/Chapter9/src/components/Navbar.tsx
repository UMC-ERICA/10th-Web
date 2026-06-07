import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../hooks/useCartstore";

const Navbar = () => {
  const amount = useCartStore((state) => state.amount);

  return (
    <div className="navbar flex justify-between items-center p-4 bg-gray-800">
      <div>
        <Link to="/" className="text-white text-2xl font-bold">
          JustJB
        </Link>
      </div>
      <div className="cart flex items-center gap-2">
        <button>
          <FaShoppingCart className="text-white text-l" />
        </button>
        <span className="text-white text-sm">{amount}개</span>
      </div>
    </div>
  );
};

export default Navbar;
