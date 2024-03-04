"use client";
import Image from "next/image";
import Modal from "./Modal";
import { useModal } from "@/store/useModal";

export default function ImageModal() {
  const { isOpen, type, data } = useModal();
  const isModalOpen = isOpen && type === "image";
  return (
    <Modal isOpen={isModalOpen}>
      <Image
      className="max-w-[90vw]"
        src={data.image ?? "/no-image.svg"}
        width={1280}
        height={720}
        alt="Imagen"
      />
    </Modal>
  );
}
