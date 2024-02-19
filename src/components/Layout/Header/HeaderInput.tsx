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
  const handleSuggest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const suggestionList = [
      "Resultado 1",
      "Texto de ejemplo",
      "Test",
      "Ejemplo 2",
      "Lista de búsqueda",
    ];
    const { value } = e.target;
    setQuery(value);
    if (value.trim() !== "") {
      const filteredSuggestions = suggestionList.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredSuggestions);
    } else {
      setResults([]);
    }
  };
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
          onChange={(e) => handleSuggest(e)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>

      {results.length > 0 && (
        <div className="text-gray-800 absolute bg-white border border-t-0 border-gray-200 w-full rounded-b-xl flex flex-col overflow-auto">
          {results.map((result) => (
            <span
              key={result}
              className="border-b border-gray-200 p-2 hover:bg-black/5 cursor-pointer"
            >
              {result}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
