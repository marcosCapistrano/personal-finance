import { create } from 'zustand';

export type ModalName = "add_account" | "add_transaction"

interface ModalStore {
  openedModal: ModalName | null;
  onOpen: (name: ModalName | null) => void;
  onClose: () => void;
}

const useModal = create<ModalStore>((set) => ({
  openedModal: null,
  onOpen: (name: ModalName | null) => set({ openedModal: name }),
  onClose: () => set({ openedModal: null })
}));


export default useModal;