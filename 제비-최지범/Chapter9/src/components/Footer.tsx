import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartstore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";

const Footer = () => {
  const { total } = useCartInfo();
  const { value } = useModalInfo();
  const { openModal, resetValue } = useModalActions();
  const { clearCart } = useCartActions();

  const handleClearCart = (): void => {
    openModal({
      title: "장바구니 비우기",
      content: "정말로 장바구니를 비우시겠습니까?",
    });
  };

  useEffect(() => {
    if (!value) return;
    clearCart();
    resetValue();
  }, [value]);

  return (
    <div className="flex justify-center gap-4 p-4 items-center">
      <div className="font-bold">총 가격: {total.toLocaleString()}원</div>
      <button
        className="border border-gray-500 py-2 px-4 rounded hover:border-red-600 "
        onClick={handleClearCart}
      >
        전체 삭제
      </button>
    </div>
  );
};

export default Footer;
