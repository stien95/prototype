import DividingLine from "@/components/DividingLine";
import CreateBusinessForm from "./CreateBusinessForm";
import UploadImagesSection from "./UploadImagesSection";


export default function CreateBusinessPage() {
  return (
    <main className="lg:grid lg:grid-cols-2 p-2">
      <div className="w-full flex flex-col items-center gap-2">
      <h2 className="font-bold text-3xl text-gray-800">
        Añade la información de tu negocio
      </h2>
      <CreateBusinessForm />
      </div>
      <DividingLine className="flex lg:hidden"/>
      <UploadImagesSection />
    </main>
  );
}
