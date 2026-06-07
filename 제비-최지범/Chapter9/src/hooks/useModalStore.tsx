import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";

interface ModalActions {
  openModal: (payload: { title: string; content: string }) => void;
  closeModal: (value: boolean) => void;
  resetValue: () => void;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  content: string;
  value: boolean;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    title: "",
    content: "",
    value: false,
    actions: {
      openModal: (payload): void => {
        set((state) => {
          state.isOpen = true;
          state.title = payload.title;
          state.content = payload.content;
        });
      },
      closeModal: (value): void => {
        set((state) => {
          state.isOpen = false;
          state.title = "";
          state.content = "";
          state.value = value;
        });
      },
      resetValue: (): void => {
        set((state) => {
          state.value = false;
        });
      },
    },
  })),
);

export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      title: state.title,
      content: state.content,
      value: state.value,
    })),
  );

export const useModalActions = () => useModalStore((state) => state.actions);
