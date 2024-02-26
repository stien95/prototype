"use client";
import Input from "@/components/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ScheduleSection from "./ScheduleSection";
import DividingLine from "@/components/DividingLine";
import RealLocationButton from "./RealLocationButton";
import ContactSection from "./ContactSection";
import { useCreateBusiness } from "@/store/useCreateBusiness";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBusinessSchema } from "@/schemas/createBusinessSchema";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateBusinessForm() {
  const router = useRouter();
  const { contacts, realLocation, images, schedule } = useCreateBusiness();
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors,  },
  } = useForm<Record<string, string>>(
  {
    resolver: zodResolver(createBusinessSchema)
  }
  );


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const allData = {
        images,
        schedule,
        contacts,
        realLocation,
        data
      }
      const res = await axios.post("/api/createBusiness", allData);
      router.push(`/business/${res.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 max-w-sm pb-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Nombre del negocio"
        className="w-full"
        {...register("name")}
        errors={errors.name?.message}
      />
      <Input
        placeholder="Categoría (Alimentos, cosméticos, accesorios...)"
        className="w-full"
        {...register("category")}
        errors={errors.category?.message}
      />
      <div className="grid grid-cols-[1fr_0.5fr] gap-2">
        <Input
          placeholder="Ubicación frecuente (Cerca del 104A...)"
          className="w-full"
          {...register("frequentLocation")}
          errors={errors.frequentLocation?.message}
        />
        <RealLocationButton />
      </div>
      <DividingLine />
      <ContactSection />
      <DividingLine />
      <ScheduleSection />
      <button
        className="bg-sky-500 text-white font-bold text-lg rounded-t-lg py-2 px-20 fixed bottom-0 left-1/2 -translate-x-1/2 z-10 disabled:opacity-50"
        disabled={isLoading}
      >
        Añadir negocio
      </button>
    </form>
  );
}
