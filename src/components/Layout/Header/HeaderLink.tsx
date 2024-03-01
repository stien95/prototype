import clsx from "clsx";
import Link from "next/link";

export default function HeaderLink({
  href,
  children,
  isMobile,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-2 p-2 hover:bg-black/10",
        isMobile
          ? "border-b border-gray-200 text-lg"
          : "border-b-4 border-transparent hover:border-emerald-400"
      )}
      onClick={onClose}
    >
      {children}
    </Link>
  );
}
