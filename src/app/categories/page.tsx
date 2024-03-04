import prisma from "@/libs/db";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany();
  return (
    <main className="p-5">
      <ul className="grid grid-cols-8 gap-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/search?q=${category.name}`} className="flex flex-col items-center hover:bg-black/10 border border-gray-100 p-2 transition-colors">
              <Image
                alt={`Categoría ${category.name}`}
                src={category.image ?? "/no-image.svg"}
                width={160}
                height={90}
              />
              <span className="text-center truncate font-bold uppercase">{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
