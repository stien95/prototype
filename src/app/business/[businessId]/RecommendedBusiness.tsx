import { Business, Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  business: (Business & {
    category: Category[];
  })[];
}
export default function RecommendedBusiness({ business }: Props) {
  return (
    <section className="h-full border-l border-gray-300 p-2 flex flex-col gap-2">
      <span className="text-xl text-gray-600 font-bold">
        Negocios recomendados
      </span>
      <ul className="flex flex-col">
        {business.map((element) => (
          <li key={element.id}>
            <Link
              href={`/business/${element.id}`}
              className="flex gap-2 p-2 rounded-md "
            >
              <Image
                src={element.images[0] ?? "/no-image.svg"}
                className="w-[160px] h-[90px] rounded-md"
                width={160}
                height={90}
                alt={`Imagen del negocio`}
              />
              <div className="flex flex-col gap-1 items-start relative overflow-hidden w-[-webkit-fill-available]">
                <span className="font-bold text-lg text-gray-800 truncate">
                  {element.name}
                </span>
                <span className="bg-sky-400 p-1 text-sm text-white rounded-md">
                  {element.category[0].name}
                </span>
                <span className="absolute right-0 h-full w-4 from-transparent to-white bg-gradient-to-r" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
