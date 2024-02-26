"use client";
import { useCreateBusiness } from "@/store/useCreateBusiness";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { MdCancel } from "react-icons/md";

export default function UploadImagesSection() {
  const images = useCreateBusiness(state => state.images);
  const setImages = useCreateBusiness(state => state.setImages);
  const removeImage = useCreateBusiness(state => state.removeImage);

  return (
    <section className="flex flex-col items-center max-md:pb-10 pt-2">
      <h3 className="text-2xl font-semibold text-gray-700">
        📷 Sube imágenes de tu negocio
      </h3>
      <UploadButton
        endpoint="serverImage"
        onClientUploadComplete={(res) => {
          const newImages = res.map((item) => item.url);
          setImages([...images, ...newImages]);
        }}
        onUploadError={(error: Error) => {
          console.error(`ERROR! ${error.message}`);
        }}
      />
      <div className="overflow-auto max-h-[50vh] lg:max-w-[50vw] max-w-[-webkit-fill-available] flex flex-col gap-2">
        {images.map((image, index) => (
          <div key={image} className="relative">
            <Image
              src={image}
              alt={`Image ${index}`}
              className="
        lg:max-w-sm lg:max-h-[360px] 
        max-w-[96vw]
        max-h-[54vw]
        object-contain bg-black/20 rounded-md"
              width={640}
              height={360}
            />
            <button
              className="absolute rounded-full top-2 right-2"
              onClick={() => removeImage(index)}
            >
              <MdCancel className="h-6 w-6 text-white bg-gray-500 rounded-full" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
