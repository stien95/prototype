import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MdAddBusiness } from "react-icons/md";
import { FaCoffee } from "react-icons/fa";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth?p=login");
  }
  return (
    <main className="h-screen relative">
      <section className="flex flex-col items-center gap-2 flex-1 h-full">
        <div className="grid grid-cols-2 h-full  w-full justify-around text-gray-700">
            <Link href="create/business" className="text-3xl flex flex-col border-t-2 border-gray-600 justify-center items-center p-4 transition-colors hover:bg-black/5">
              <MdAddBusiness className="w-32 h-32 text-gray-700" /> Un Negocio
            </Link>
          <span className="absolute left-1/2 top-4 text-6xl -translate-x-1/2 bg-white">¿Qué deseas Añadir?</span>
          <span className="absolute left-1/2 bottom-80 text-6xl -translate-x-1/2 bg-white">O</span>
          {session.user.role == "ADMIN" && (
            <Link href="create/coffee_shop" className="text-3xl flex flex-col border-2 border-gray-600 justify-center items-center p-4 transition-colors hover:bg-black/5">
              Una Cafeteria <FaCoffee className="w-32 h-32 text-gray-700" />
            </Link>
          )}
        </div>

      </section>
    </main>
  );
}
