import BusinessItem from "@/components/BusinessItem";
import prisma from "@/libs/db";
export default async function Home() {
  const business = await prisma.business.findMany({
    include: {
      category: true
    }
  })
  return (
    <main>
      <h2 className="mt-2 text-3xl font-black p-2 text-gray-700 text-center">Negocios recomendados</h2>
      <div className="grid grid-cols-3 mx-[20vw] p-2 gap-10 justify-center">
        {business.map((element) => (
          <BusinessItem business={element} key={element.id}/>
        ))}
      </div>
    </main>
  );
}
