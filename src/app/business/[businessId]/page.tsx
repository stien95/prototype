import prisma from "@/libs/db";
import Image from "next/image";
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
      <h2 className="text-2xl font-bold text-gray-800 uppercase">{business.name}</h2>
      <h2 className="bg-orange-400/40 p-2 rounded-md text-gray-700 text-sm">{business.category}</h2>
      <span>Ubicación frecuente: {business.frequentLocation}</span>
      {business.images.length > 0 ? business.images.map((image, index) => (
        <Image src={image} alt="Image 1" key={index} width={300} height={300}/>
      )): <Image src="/no-image.svg" alt="No image provided" width={300} height={300}/>}
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
