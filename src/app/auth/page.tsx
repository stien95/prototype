import AuthForm from "./AuthForm";

interface Props {
  searchParams?: {
    p: string;
  }
}

export default function AuthPage({searchParams}: Props) {
  const isRegister = searchParams?.p === "register";
  return (
    <main className="flex flex-1 h-full w-full items-center justify-center bg-sky-50">
      <AuthForm isRegister={isRegister} />
    </main>
  )
}
