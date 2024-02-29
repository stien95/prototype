import ContactItem from "@/components/ContactItem";
import DividingLine from "@/components/DividingLine";
import prisma from "@/libs/db";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
interface Props {
  params: {
    businessId: string;
  }
}
export default async function BusinessIdPage({ params }: Props) {
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
  const days = {
    "1": "Lunes",
    "2": "Martes",
    "3": "Miercoles",
    "4": "Jueves",
    "5": "Viernes",
    "6": "Sábado"
  }
  return (
    <main className="flex flex-col items-center gap-2 py-10 px-20 w-[1000px]">
      {business.images.length > 0 ? (
        <Image src={business.images[0]} alt="Image 1" key={business.images[0]} width={800} height={800} />
      ) : <Image src="/no-image.svg" alt="No image provided" width={800} height={800} />}
      <div className="rounded-md p-4 w-full flex flex-col items-start">
        <h2 className="text-3xl font-bold text-gray-800 uppercase">{business.name}</h2>
        <h2 className="bg-orange-500 p-2 rounded-md text-white text-sm">{business.category}</h2>
        <span>Ubicación frecuente: {business.frequentLocation}</span>
        <DividingLine className="my-2" />
        <ul>
          <h3 className="text-2xl text-gray-700 font-bold">Contacto</h3>
          {business.contact.map(element => (
            <ContactItem contact={element} />
          ))}
        </ul>
        <DividingLine className="my-2" />
        <ul>
          <h3 className="text-2xl text-gray-700 font-bold">Horario</h3>
          {business.schedule.map(element => (
            <li>
              <span>{days[element.day as keyof typeof days]}: </span>
              <span>{element.from}</span>
              -
              <span>{element.to}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
