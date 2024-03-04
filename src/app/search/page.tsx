import BusinessItem from "@/components/BusinessItem";
import prisma from "@/libs/db";
interface Props {
  searchParams: {
    q: string;
  };
}
export default async function SearchPage({ searchParams }: Props) {
  const business = await prisma.business.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchParams.q,
            mode: "insensitive",
          },
        },
        {
          category: {
            some: {
              name: {
                contains: searchParams.q,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
    include: {
      category: true
    }
  });
  return (
    <main className="w-full">
      {business.length > 0 ? (
        <section className="grid grid-cols-3 mx-[20vw] gap-10 p-10">
          {business.map((element) => (
            <BusinessItem business={element} key={element.id} />
          ))}
        </section>
      ) : (
        <div>
          <h3 className="font-bold text-gray-700 text-center text-2xl py-10">
            Ningún negocio coincide con la búsqueda.
          </h3>
        </div>
      )}
    </main>
  );
}
