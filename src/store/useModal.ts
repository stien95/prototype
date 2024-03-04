import { create } from "zustand";

type ModalType = "image";

interface DataType {
  image?: string;
}

interface ModalStore {
  data: DataType;
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: DataType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}));
