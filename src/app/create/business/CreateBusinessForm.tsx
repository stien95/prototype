"use client";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
const validTypes = {
  default: "Selecciona una opción",
  whatsapp: "Whatsapp",
  instagram: "Instagram",
  telegram: "Telegram",
  phone: "Número de celular",
  email: "Correo Electrónico",
};
type Contact = {
  link: string;
  type: keyof typeof validTypes;
};
export default function CreateBusinessForm() {
  const [contact, setContact] = useState<Contact[]>([
    { link: "", type: "default" },
  ]);
  const linkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newLink = [...contact];
    newLink[index].link = e.target.value;
    setContact(newLink);
  };
  useEffect(() => {
    console.log(contact);
  }, [contact]);
  const handlePopContact = () => {
    if (contact.length > 1) {
      const newContact = [...contact];
      newContact.pop();
      setContact(newContact);
    }
  };
  const handleAddContact = () => {
    if (contact.length < 5) {
      setContact([...contact, { link: "", type: "default" }]);
    }
  };
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      const altitude = position.coords.altitude;
    })
  }
  return (
    <form className="flex flex-col gap-2">
      <Input placeholder="Nombre del negocio" className="w-full" />
      <Input
        placeholder="Categoría (Alimentos, cosméticos, accesorios...)"
        className="w-full"
      />
      <div className="grid grid-cols-[1fr_0.5fr] gap-2">
        <Input
          placeholder="Ubicación frecuente (Cerca del 104A...)"
          className="w-full"
        />
        <button
          type="button"
          onClick={handleLocation}
          className="relative rounded-lg p-2 border border-gray-200 text-gray-600"
        >
          Ubicación real{" "}
          <span
            className="absolute -top-2 -right-2 bg-sky-300 text-white h-6 w-6 text-sm flex justify-center items-center rounded-full scale-75 cursor-default"
            title={`Ubícate en el lugar que vas a vender
      `}
          >
            ?
          </span>
        </button>
      </div>

      <span className="w-full h-[2px] bg-gray-300 rounded-lg" />
      <div className="flex items-center text-gray-500 gap-2">
        <h3 className="font-bold text-xl">Contacto</h3>
        <span className="text-sm">(Añade hasta 5)</span>
        <button
          type="button"
          className="bg-black/5 hover:bg-black/10 w-6 h-6 disabled:pointer-events-none disabled:opacity-20"
          onClick={handleAddContact}
          title="Añadir contacto"
          disabled={contact.length >= 5}
        >
          +
        </button>
        <button
          type="button"
          onClick={handlePopContact}
          className="bg-black/5 hover:bg-black/10 w-6 h-6 disabled:pointer-events-none disabled:opacity-50"
          title="Eliminar contacto"
          disabled={contact.length <= 1}
        >
          -
        </button>
      </div>
      <div className="border border-gray-400 p-2 flex gap-2 flex-col">
        {contact.map((element, index) => (
          <div key={index} className="flex gap-2">
            <select className="border border-gray-400">
              {Object.entries(validTypes).map(([key, value], index) => (
                <option
                  key={key}
                  value={key}
                  disabled={index === 0}
                  selected={index == 0}
                >
                  {value}
                </option>
              ))}
            </select>

            <input
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Link"
              value={element.link}
              onChange={(e) => linkHandler(e, index)}
            />
          </div>
        ))}
      </div>
      <button className="bg-sky-500 text-white font-bold text-lg rounded-t-lg py-2 px-20 absolute bottom-0 left-1/2 -translate-x-1/2">
        Añadir negocio
      </button>
    </form>
  );
}
