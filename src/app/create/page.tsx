import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MdAddBusiness } from "react-icons/md";
import { FaCoffee } from "react-icons/fa";
import Image from "next/image";
import { authOptions } from "@/utils/authOptions";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth?p=login");
  }
  return (
    <main className="h-screen relative text-white">
      <Image alt="background" fill className="opacity-80 z-[-1] pointer-events-none blur-md" src="https://latiendadelcafe.co/cdn/shop/articles/lugares-emblematicos-tomar-cafe-europa_grande.png?v=1692800732"/>
      <section className="flex flex-col items-center gap-2 flex-1 h-full">
        <div className="grid grid-cols-[1fr_1fr] h-full  w-full justify-around">
            <Link href="create/business" className="text-3xl flex flex-col justify-center items-center p-4 transition-colors hover:bg-black/20">
              <MdAddBusiness className="w-32 h-32" /> Un Negocio
            </Link>
          <span className="absolute left-1/2 top-10 text-6xl -translate-x-1/2 pointer-events-none">¿Qué deseas Añadir?</span>
          <span className="absolute left-1/2 bottom-80 text-6xl -translate-x-1/2 pointer-events-none">O</span>
            {session.user.role == "ADMIN" && (
            <Link href="create/coffee_shop" className="text-3xl flex flex-col justify-center items-center p-4 transition-colors hover:bg-black/20">
              <FaCoffee className="w-32 h-32" /> Una Cafeteria 
            </Link>
          )}
        </div>

      </section>
    </main>
  );
}
