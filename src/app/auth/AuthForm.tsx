import Input from "@/components/Input";
import Link from "next/link";

export default function AuthForm({ isRegister }: { isRegister: boolean }) {
  return (
    <form className="flex flex-col gap-2 p-2 border border-gray-200 bg-white shadow-md">
      {isRegister ? (
        <>
          <Input type="text" placeholder="Nombre" />
          <Input type="text" placeholder="Usuario" />
          <Input type="text" placeholder="Correo electrónico" />
        </>
      ) : (
        <Input type="text" placeholder="Usuario o Correo electrónico" />
      )}
      <Input type="password" placeholder="Contraseña" />
      {isRegister && <Input type="password" placeholder="Repetir contraseña" />}
      <button className="bg-blue-500 text-white p-2 text-xl">
        {isRegister ? "Registrarse" : "Iniciar sesión"}
      </button>
      <div className="w-full h-px bg-gray-300 my-2" />
      <Link
        className="text-sm text-sky-400 hover:underline"
        href={`/auth?p=${isRegister ? "login" : "register"}`}
      >
        {isRegister ? "Tengo una cuenta" : "No tengo una cuenta"}
      </Link>
      {!isRegister && (
        <Link
          className="text-sm text-sky-400 hover:underline"
          href="/auth/trouble"
        >
          Problemas para iniciar sesión
        </Link>
      )}
    </form>
  );
}
