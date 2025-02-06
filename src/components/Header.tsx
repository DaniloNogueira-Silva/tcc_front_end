"use client";

import { LogOut, Settings, User, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔥 Remove o token
    router.push("/auth"); // 🔥 Redireciona para login
  };

  return (
    <header className="bg-gray-50 text-gray-900 p-5 flex justify-end items-center relative">
      {/* Ícone do usuário */}
      <button onClick={() => setIsOpen(!isOpen)} className="relative">
        <User size={28} className="text-gray-700 cursor-pointer" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-14 right-5 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50"
        >
          <ul className="flex flex-col text-gray-800">
            <li className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer">
              <Settings size={18} /> Configurações
            </li>
            <li className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer">
              <UserCircle size={18} /> Perfil
            </li>
            <li
              onClick={handleLogout}
              className="flex items-center gap-2 p-3 hover:bg-red-100 text-red-500 cursor-pointer"
            >
              <LogOut size={18} /> Sair
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
