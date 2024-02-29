import { redirect } from "next/navigation";
import { validTypes } from "../create/business/ContactSection";

interface Props {
  searchParams: {
    type: keyof typeof validTypes;
    url: string;
  };
}

export default function LinkPage({ searchParams }: Props) {
  if (searchParams.type === "whatsapp") {
    const link =
      searchParams.url.startsWith("https://api.whatsapp.com") ||
      searchParams.url.startsWith("https://wa.link")
        ? searchParams.url
        : `https://api.whatsapp.com/send?phone=${searchParams.url}`;
    return redirect(link);
  }
  if (searchParams.type === "email") {
    const link = searchParams.url.startsWith("mailto:")
      ? searchParams.url
      : `mailto:${searchParams.url}`;
    return redirect(link);
  }
  if (searchParams.type === "phone") {
    const link = searchParams.url.startsWith("tel:")
      ? searchParams.url
      : `tel:${searchParams.url}`;
    return redirect(link);
  }
  if (searchParams.type === "instagram") {
    const link = searchParams.url.startsWith("https://www.instagram.com/")
      ? searchParams.url
      : `https://www.instagram.com/${searchParams.url.replace("@", "")}`;
    return redirect(link);
  }
  if (searchParams.type === "telegram") {
    const link = searchParams.url.startsWith("https://www.t.me/")
      ? searchParams.url
      : `https://www.t.me/${searchParams.url}`;
    return redirect(link);
  } else {
    return redirect("/");
  }
}
