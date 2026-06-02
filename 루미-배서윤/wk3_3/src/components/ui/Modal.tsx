type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
