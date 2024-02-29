import { validTypes } from "@/app/create/business/ContactSection";
import { Contact } from "@prisma/client"
import clsx from "clsx";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import Link from "next/link";

interface Props{
    contact: Contact;
}
export default function ContactItem({contact}: Props) {
    const colors: Record<keyof typeof validTypes, string> = {
        "default": "",
        "phone": "bg-blue-200",
        "whatsapp": "bg-emerald-400",
        "telegram": "bg-sky-400",
        "email": "bg-sky-400",
        "instagram": "bg-purple-400",

    }
    const icon: Record<keyof typeof validTypes, React.ReactNode> = {
        "default": <MdEmail/>,
        "email": <MdEmail/>,
        "phone": <MdPhone/>,
        "whatsapp": <FaWhatsapp/>,
        "telegram": <FaTelegram/>,
        "instagram": <FaInstagram/>,
    }
    return (
    <Link className={clsx(colors[contact.type as keyof typeof validTypes], "text-white p-2 rounded-md flex items-center gap-2")} href={`/link?type=${contact.type}&url=${contact.link}`}>
        {icon[contact.type as keyof typeof validTypes]}
        <span>
        {contact.type}    
        </span>      
        <span >{contact.link}</span>
    </Link>
  )
}
