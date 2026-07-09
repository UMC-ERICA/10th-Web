import { useCartStore } from '../store/useCartStore';
import Modal from './ui/Modal';

export default function CartModal() {
  const { clearCart, closeModal } = useCartStore();

  return (
    <Modal onClose={closeModal}>
      <div className="rounded-lg bg-white px-8 py-6 shadow-xl">
        <p className="mb-5 text-center text-base font-semibold text-gray-800">
          정말 삭제하시겠습니까?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={closeModal}
            className="rounded border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            아니요
          </button>
          <button
            onClick={() => { clearCart(); closeModal(); }}
            className="rounded bg-pink-500 px-5 py-2 text-sm font-bold text-white hover:bg-pink-600"
          >
            네
          </button>
        </div>
      </div>
    </Modal>
  );
}
