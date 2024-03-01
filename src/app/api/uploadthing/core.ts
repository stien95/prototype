import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) throw new Error("Unauthorized");
  return { userId: session.user.id };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
