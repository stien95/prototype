"use client"
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";



export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, [])
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <ImageModal />
    </div>
  )
}
