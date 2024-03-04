import prisma from "@/libs/db";
import { redirect } from "next/navigation";
import BusinessSection from "./BusinessSection";
import RecommendedBusiness from "./RecommendedBusiness";

interface Props {
  params: {
    businessId: string;
  }
}

export default async function BusinessIdPage({ params }: Props) {
  if (!params.businessId) {
    redirect("/");
  }
  const business = await prisma.business.findUnique({
    where: {
      id: params.businessId
    },
    include: {
      category: true,
      contact: true,
      schedule: true,
    }
  });
  
  if (!business) {
    redirect("/");
  }
  const recommendedBusiness = await prisma.business.findMany({
    where: {
      OR: [
        {
          category: {
            some: {
              name: business.name
            }
          }
        },
        {
          ownerId: business.ownerId
        }
      ],
      NOT: {
        id: business.id
      }
    },
    include: {
      category: true
    }
  })
  
  return (
    <main className="grid grid-cols-4">
      <BusinessSection business={business}/>
      <RecommendedBusiness business={recommendedBusiness}/>
    </main>
  )
}
