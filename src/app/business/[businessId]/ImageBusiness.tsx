"use client";
import { useModal } from "@/store/useModal";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";

export default function ImageBusiness({ images }: { images: string[] }) {
  const onOpen = useModal((state) => state.onOpen)
  const [imageIndex, setImageIndex] = useState(0);
  const increaseIndex = () => {
    console.log(imageIndex + 1);
    if (imageIndex < images.length) {
      setImageIndex(imageIndex + 1);
    }
  };
  const decreaseIndex = () => {
    if (imageIndex >= 1) {
      setImageIndex(imageIndex - 1);
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <figure className="relative flex items-center text-white">
        <Image
          src={images[imageIndex] ?? "/no-image.svg"}
          alt="Image 1"
          className="w-[720px] h-[405px] rounded-md"
          width={720}
          height={405}
          onClick={() => images[imageIndex] && onOpen("image", {image: images[imageIndex]})}
        />
        {imageIndex < images.length - 1 && (
          <ArrowBtn onClick={increaseIndex} isNext />
        )}
        {imageIndex >= 1 && <ArrowBtn onClick={decreaseIndex} />}
      </figure>
      <ul className="flex gap-2">
        {images.map((image, index) => (
          <li
            key={image}
            onClick={() => setImageIndex(index)}
            className={clsx(
              "transition-colors w-2 h-2 rounded-full",
              imageIndex === index
                ? "bg-gray-400"
                : "bg-gray-200 cursor-pointer"
            )}
          />
        ))}
      </ul>
    </div>
  );
}
function ArrowBtn({
  isNext,
  onClick,
}: {
  isNext?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx("absolute hover:bg-white/20 p-1 py-2 pl-3 rounded-full", isNext ? "rotate-180 right-2" : "left-2")}
    >
      <MdArrowBackIos />
    </button>
  );
}
