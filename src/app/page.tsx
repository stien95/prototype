import prisma from "@/libs/db";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const business = await prisma.business.findMany({
    take: 4
  })
  return (
    <main>
      <h2 className="mt-2 text-3xl font-black p-2 text-gray-700 text-center">Negocios recomendados</h2>
      <div className="grid grid-cols-2 mx-[20vw] p-2 gap-10 justify-center">
        {business.map((element) => (
          <Link href={`/business/${element.id}`} className="flex flex-col items-center hover:bg-black/5 hover:scale-105 transition">
            <Image alt={`Image 1`} src={element.images[0] ?? "/no-image.svg"} className="w-[300px] h-[300px] object-cover rounded-lg" width={300} height={300} />
            <div className="border flex flex-col border-gray-700 p-2 w-full mt-2">
            <span className="text-xl font-bold ">{element.name}</span>
            <span className="w-full text-sm text-gray-700">Vende: {element.category}</span>
          
            </div>
            </Link>
        ))}
      </div>

    </main>
  );
}
