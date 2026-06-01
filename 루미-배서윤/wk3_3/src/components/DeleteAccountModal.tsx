type Props = {
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
};

export default function DeleteAccountModal({
  onClose,
  onConfirm,
  isPending,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="w-[360px] rounded-xl bg-zinc-900 p-8 text-center text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-6 text-lg font-normal">
          정말 탈퇴하시겠습니까?
        </h2>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-md bg-gray-300 px-8 py-2 font-normal text-black disabled:bg-gray-500"
          >
            예
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-pink-500 px-8 py-2 font-normal text-white"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}