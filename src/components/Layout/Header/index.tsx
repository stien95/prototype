"use client";
import {
  IoMdMenu,
  IoMdPersonAdd,
  IoMdLogIn,
  IoIosAlbums,
  IoMdAdd,
} from "react-icons/io";
import HeaderLink from "./HeaderLink";
import HeaderInput from "./HeaderInput";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  // Estado para guardar si el menu móvil está activo
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  // Links para el Header
  const headerLinks = [
    {
      // <a href={href}>{children}</a> -- El icono aparece en el menu móvil
      // El Id es necesario para la key al mapear la lista
      id: "createBusiness",
      href: "/create",
      icon: <IoMdAdd />,
      children: "Añade tu negocio",
    },
    {
      id: "categories",
      href: "/categories",
      icon: <IoIosAlbums />,
      children: "Categorías",
    },
  ];
  useEffect(() => {
    if (isMobileMenu) {
      document.documentElement.style.overflow = "hidden";
    }
  }, [isMobileMenu]);
  return (
    <>
      <header className="flex w-full text-white bg-blue-500 gap-2 justify-around items-center p-2">
        <Link href="/">
        <h1 className="font-black text-2xl text-white">Prototipo</h1>
        </Link>
        <HeaderInput />
        <nav className="flex gap-2 max-md:hidden">
          {headerLinks.map(({ href, id, children, icon }) => (
            <HeaderLink href={href} key={id}>
              <span>{icon}</span>
              {children}
            </HeaderLink>
          ))}
        </nav>
        <span
          className="text-white max-md:flex hidden p-2 cursor-pointer hover:bg-white/10"
          onClick={() => setIsMobileMenu(!isMobileMenu)}
        >
          <IoMdMenu className="w-6 h-6" />
        </span>
      </header>
      {isMobileMenu && (
        <menu className="flex flex-col flex-1 w-full h-full absolute bg-white">
          {headerLinks.map(({ href, id, children, icon }) => (
            <HeaderLink href={href} key={id} isMobile onClose={() => setIsMobileMenu(false)}>
              <span className="text-2xl">{icon}</span>

              {children}
            </HeaderLink>
          ))}
        </menu>
      )}
    </>
  );
}
