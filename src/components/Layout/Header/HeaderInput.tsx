"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function HeaderInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Estado para guardar el valor del input de búsqueda
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const queryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  }
  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search?q=${query}`);
    } else {
      inputRef.current?.focus();
    }
  };
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (parentRef.current && !parentRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.addEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return (
    <div className="relative flex-grow max-w-lg" ref={parentRef}>
      <div
        className={clsx(
          "flex  overflow-hidden",
          results.length > 0 && "rounded-t-md",
          isInputFocused ? "border-2 border-blue-200" : "border border-blue-300"
        )}
      >
        <button
          className="relative flex items-center p-2 hover:bg-blue-600/50 
          after:bg-blue-400  after:h-3/4 after:w-px after:flex after:left-full after:absolute"
          onClick={() => handleSearch()}
        >
          <IoSearch />
        </button>
        <input
          ref={inputRef}
          placeholder="Buscar"
          className="outline-none px-2 bg-blue-500 placeholder-slate-50 flex-1"
          value={query}
          onChange={(e) => queryHandler(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
    </div>
  );
}
