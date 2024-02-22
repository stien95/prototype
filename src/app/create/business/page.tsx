import CreateBusinessForm from "./CreateBusinessForm";


export default function CreateBusinessPage() {
  return (
    <main className="w-full flex flex-col items-center p-2 gap-2">
      <h2 className="font-bold text-2xl">
        Añade la información de tu negocio.
      </h2>
      <CreateBusinessForm />
    </main>
  );
}
