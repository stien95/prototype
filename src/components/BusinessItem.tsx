"use client"
import { Business, Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  business: Business & {
    category: Category[];
  };
}
export default function BusinessItem({ business }: Props) {
  const router = useRouter();
  return (
    <article
      onClick={() => router.push(`/business/${business.id}`)}
      className="flex flex-col items-center hover:bg-black/5 hover:scale-105 transition cursor-pointer"
    >
      <Image
        alt={`Image 1`}
        src={business.images[0] ?? "/no-image.svg"}
        className="w-[544px] h-[306px] object-contain rounded-lg"
        width={544}
        height={306}
      />
      <div className="border flex flex-col border-gray-700 p-2 w-full mt-2">
        <span className="text-xl font-bold truncate">{business.name}</span>
        <ul>
        {business.category.map(category => (
          <li key={category.id}>
            <Link href={`/search?q=${category.name}`} className="bg-blue-400 text-white text-sm p-1 rounded-md">{category.name}</Link>
          </li>
        ))}
        </ul>
      </div>
    </article>
  );
}
