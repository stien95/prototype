import { Business } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  business: Business;
}
export default function BusinessItem({ business }: Props) {
  return (
    <Link
      href={`/business/${business.id}`}
      className="flex flex-col items-center hover:bg-black/5 hover:scale-105 transition"
    >
      <Image
        alt={`Image 1`}
        src={business.images[0] ?? "/no-image.svg"}
        className="w-[300px] h-[300px] object-cover rounded-lg"
        width={300}
        height={300}
      />
      <div className="border flex flex-col border-gray-700 p-2 w-full mt-2">
        <span className="text-xl font-bold ">{business.name}</span>
        <span className="w-full text-sm text-gray-700">
          Vende: {business.category}
        </span>
      </div>
    </Link>
  );
}
