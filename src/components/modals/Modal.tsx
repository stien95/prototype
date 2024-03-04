"use client";
import { useModal } from "@/store/useModal";

interface Props {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export default function Modal({ children, className, isOpen }: Props) {
  const onClose = useModal((state) => state.onClose);
  if (!isOpen) {
    return null;
  }
  if (isOpen) {
    document.documentElement.style.overflow = "hidden";
  }
  return (
    <div
      className="h-screen w-screen absolute top-0 flex justify-center items-center bg-black/50"
      onClick={onClose}
    >
      <div className="bg-white z-40 p-2 rounded-lg max-w-[99vw]" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
