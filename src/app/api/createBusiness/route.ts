import { createBusinessSchema } from "@/schemas/createBusinessSchema";
import { Contact, RealLocation, Schedule } from "@/store/useCreateBusiness";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/libs/db";
import { authOptions } from "@/utils/authOptions";
interface AdditionalData {
  images: string[];
  schedule: Schedule[];
  contacts: Contact[];
  realLocation: RealLocation;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const {
      name,
      frequentLocation,
      category: categoryString,
      description,
    } = createBusinessSchema.parse(body.data);
    const { images, schedule, contacts, realLocation }: AdditionalData = body;
    const validContacts =
      !contacts.some((contact) => contact.link === "") &&
      !contacts.some((contacts) => contacts.type === "default");
    const validLocation =
      typeof realLocation.latitude === "number" &&
      typeof realLocation.longitude === "number";
    const validImages =
      images.length <= 0 ||
      !images.some((image) => !image.startsWith("https://utfs.io"));
    if (
      !name ||
      !frequentLocation ||
      !categoryString ||
      !validContacts ||
      !validLocation ||
      !validImages
    ) {
      return new NextResponse("Missing information", {
        status: 400,
      });
    }
    if (!session) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    let category = await prisma.category.findFirst({
      where: {
        name: {
          equals: categoryString,
          mode: "insensitive",
        },
      },
    });
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryString,
        },
      });
    }
    const business = await prisma.business.create({
      data: {
        category: {
          connect: {
            id: category.id,
          },
        },
        description,
        frequentLocation,
        location: JSON.stringify(realLocation),
        name,
        contact: {
          createMany: {
            data: contacts,
          },
        },
        ownerId: session.user.id,
        schedule: {
          createMany: {
            data: schedule,
          },
        },
        images,
      },
    });
    return NextResponse.json({ id: business.id });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return new NextResponse("Invalid Data", {
        status: 400,
      });
    }
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
