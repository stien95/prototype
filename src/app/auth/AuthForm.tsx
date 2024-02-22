"use client";
import Input from "@/components/Input";
import { loginSchema, registerSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrafficLevel } from "@prisma/client";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type CredentialType =
  | FieldValues
  | {
      userOrEmail: string;
      password: string;
    };

export default function AuthForm({ isRegister }: { isRegister: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<Record<string, string>>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const loginHandler = (credentials: CredentialType) => {
    signIn("credentials", {
      ...credentials,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          setError(callback.error);
        }

        if (callback?.ok) {
          router.refresh();
          router.push("/create");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        }
      });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setError("");

    if (isRegister) {
      const formData = {
        userOrEmail: data.email || data.username,
        password: data.password,
      };
      try {
        await axios.post("/api/auth/register", data);
        await loginHandler(formData);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    } else {
      await loginHandler(data);
    }
  };
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-white shadow-md">
      {error && <p className="bg-rose-600 text-white p-2 text-sm">{error}</p>}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          {...register(isRegister ? "username" : "userOrEmail")}
          placeholder={isRegister ? "Usuario" : "Usuario o Correo electrónico"}
          errors={
            isRegister ? errors.username?.message : errors.userOrEmail?.message
          }
        />
        {isRegister && (
          <>
            <Input type="text" placeholder="Nombre" {...register("name")} />
            <Input
              type="text"
              placeholder="Correo electrónico"
              {...register("email")}
            />
          </>
        )}
        <Input
          type="password"
          placeholder="Contraseña"
          {...register("password")}
        />
        {isRegister && (
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("confirmPassword")}
          />
        )}
        <button className="bg-blue-500 text-white p-2 text-xl">
          {isRegister ? "Registrarse" : "Iniciar sesión"}
        </button>
      </form>
      <span className="w-full h-px bg-gray-300 my-2" />
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
    </div>
  );
}
