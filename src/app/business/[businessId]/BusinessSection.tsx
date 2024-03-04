import ContactItem from "@/components/ContactItem";
import DividingLine from "@/components/DividingLine";
import { Business, Category, Contact, Schedule } from "@prisma/client";
import Link from "next/link";
import ImageBusiness from "./ImageBusiness";
import ScheduleBusiness from "./ScheduleBusiness";

interface Props {
  business: Business & {
    category: Category[];
    contact: Contact[];
    schedule: Schedule[];
  };
}

export default function BusinessSection({ business }: Props) {
  return (
    <section className="col-span-3 p-4">
      <ImageBusiness images={business.images} />
      <div className="rounded-md  w-full flex flex-col items-start">
        <h2 className="text-3xl font-bold text-gray-800 uppercase">
          {business.name}
        </h2>
        {business.category.map((category) => (
          <Link
            key={category.id}
            href={`/search?q=${category.name}`}
            className="bg-blue-400 text-white text-sm p-1 rounded-md"
          >
            {category.name}
          </Link>
        ))}
        <span>Ubicación frecuente: {business.frequentLocation}</span>
        <DividingLine className="my-2" />
        <ul>
          <h3 className="text-2xl text-gray-700 font-bold">Contacto</h3>
          {business.contact.map((element) => (
            <ContactItem contact={element} key={element.id} />
          ))}
        </ul>
        <DividingLine className="my-2" />

        <ScheduleBusiness schedule={business.schedule} />
      </div>
    </section>
  );
}
