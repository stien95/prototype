import prisma from "@/libs/db";
import Link from "next/link";
import { redirect } from "next/navigation";
interface Props {
  params: {
    businessId: string;
  }
}
export default async function BusinessIdPage({params}: Props) {
  const business = await prisma.business.findUnique({
    where: {
      id: params.businessId
    },
    include: {
      contact: true,
      schedule: true,
    }
  });
  if (!business) {
    redirect("/");
  }
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 uppercase">{business.name}</h1>
      <h2 className="bg-orange-400/40 p-2 rounded-md text-gray-700 text-sm">{business.category}</h2>
      <span>Ubicación frecuente: {business.frequentLocation}</span>
      <details>
        <summary>Contacto</summary>
        {business.contact.map(element => (
          <div key={element.id}>
            <span>{element.type}</span>
            <Link href={`/link?type=${element.type}&url=${element.link}`}>{element.link}</Link>
          </div>
        ))}
      </details>
    </main>
  )
}
