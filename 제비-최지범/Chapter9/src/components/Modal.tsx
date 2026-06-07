import { useModalActions, useModalInfo } from "../hooks/useModalStore";

const Modal = () => {
  const { title, content } = useModalInfo();
  const { closeModal } = useModalActions();

  const handleConfirm = (): void => {
    closeModal(true);
  };

  const handleCancel = (): void => {
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 bg-[#00000050] w-full  h-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
