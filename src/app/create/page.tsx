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
    <main>
      <section className="flex flex-col items-center gap-2">
        <h2 className="text-gray-700 text-4xl my-2 font-black">
          ¿Qué quieres añadir?
        </h2>
        <div className="flex w-full justify-around">
        <Link href="create/business" className="text-3xl flex flex-col border-2 border-gray-600 rounded-md items-center p-4 transition-colors hover:bg-black/5">
          Un Negocio <MdAddBusiness  className="w-32 h-32 text-gray-700"/>
        </Link>
        {session.user.role == "ADMIN" && (
          <Link href="create/coffee_shop" className="text-3xl flex flex-col border-2 border-gray-600 rounded-md items-center p-4 transition-colors hover:bg-black/5">
            Una Cafeteria <FaCoffee className="w-32 h-32 text-gray-700"/>
          </Link>
        )}
        </div>
        
      </section>
    </main>
  );
}
