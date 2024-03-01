import { getServerSession } from "next-auth";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";

interface Props {
  searchParams?: {
    p: string;
  };
}

export default async function AuthPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    return redirect("/");
  }
  const isRegister = searchParams?.p === "register";
  return (
    <main className="flex flex-1 h-full w-full items-center justify-center bg-sky-50">
      <AuthForm isRegister={isRegister} />
    </main>
  );
}
