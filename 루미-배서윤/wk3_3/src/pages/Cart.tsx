import { useCartStore } from '../store/useCartStore';
import CartModal from '../components/CartModal';

export default function Cart() {
  const {
    cartItems,
    amount,
    total,
    increase,
    decrease,
    removeItem,
    openModal,
    isOpen,
  } = useCartStore();

  return (
    <div>
      {isOpen && <CartModal />}
      <h1 className="mb-6 text-2xl font-bold">장바구니</h1>

      {cartItems.length === 0 ? (
        <div className="py-20 text-center text-lg font-semibold text-gray-400">
          장바구니가 비었습니다.
        </div>
      ) : (
        <section>
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex items-center justify-between border-b border-gray-700 py-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h2 className="max-w-md text-base font-extrabold text-white">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-400">{item.singer}</p>
                  <p className="text-sm font-bold text-gray-200">
                    ₩{Number(item.price).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-1 text-xs text-gray-500 hover:text-red-400"
                  >
                    삭제
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => decrease(item.id)}
                  className="h-8 w-8 rounded-l bg-zinc-700 text-lg font-bold text-gray-200 hover:bg-zinc-600"
                >
                  -
                </button>
                <span className="flex h-8 w-10 items-center justify-center border-y border-zinc-600 bg-zinc-800 text-lg">
                  {item.amount}
                </span>
                <button
                  onClick={() => increase(item.id)}
                  className="h-8 w-8 rounded-r bg-zinc-700 text-lg font-bold text-gray-200 hover:bg-zinc-600"
                >
                  +
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {cartItems.length > 0 && (
        <footer className="mt-8 border-t border-gray-700 pt-5">
          <div className="mb-4 flex items-center justify-between text-lg font-bold">
            <span>총 수량</span>
            <span>{amount}개</span>
          </div>
          <div className="mb-8 flex items-center justify-between text-lg font-bold">
            <span>총 금액</span>
            <span>₩{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-center">
            <button
              onClick={openModal}
              className="rounded border border-gray-400 px-6 py-3 font-medium text-gray-300 hover:border-white hover:bg-white hover:text-black"
            >
              전체 삭제
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
