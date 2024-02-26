import { useState } from "react";
import OperationButton from "./OperationButton";
import { useCreateBusiness } from "@/store/useCreateBusiness";

export const validTypes = {
  default: "Selecciona una opción",
  whatsapp: "Whatsapp",
  instagram: "Instagram",
  telegram: "Telegram",
  phone: "Número de celular",
  email: "Correo Electrónico",
};

export default function ContactSection() {
  const contacts = useCreateBusiness((state) => state.contacts);
  const setContacts = useCreateBusiness((state) => state.setContacts);
  const addContact = useCreateBusiness((state) => state.addContact);
  const popContact = useCreateBusiness((state) => state.popContact);
  const typeLinkHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newTypeLink = [...contacts];
    newTypeLink[index].type = e.target.value as keyof typeof validTypes;
    setContacts(newTypeLink);
  };

  const linkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newLink = [...contacts];
    newLink[index].link = e.target.value;
    setContacts(newLink);
  };
  return (
    <section>
      <div className="flex items-center text-gray-500 gap-2">
        <h3 className="font-bold text-xl">☎ Contacto</h3>
        <span className="text-sm">(Añade hasta 5)</span>
        <OperationButton
          onClick={addContact}
          title="Añadir contacto"
          disabled={contacts.length >= 5}
        >
          +
        </OperationButton>
        <OperationButton
          onClick={popContact}
          title="Eliminar contacto"
          disabled={contacts.length <= 1}
        >
          -
        </OperationButton>
      </div>
      <div className="border border-gray-400 p-2 flex gap-2 flex-col">
        {contacts.map((element, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <select
              className="border border-gray-400"
              onChange={(e) => typeLinkHandler(e, index)}
              value={contacts[index].type}
            >
              {Object.entries(validTypes).map(([key, value], indexOpt) => (
                <option
                  key={key}
                  value={key}
                  disabled={indexOpt === 0}
                >
                  {value}
                </option>
              ))}
            </select>

            <input
              className="border border-gray-400 p-2 rounded-md max-w-"
              placeholder={"Enlace / Número / Correo"}
              value={element.link}
              onChange={(e) => linkHandler(e, index)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
