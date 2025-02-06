"use client";

import { Book, BookOpen, ClipboardList } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white text-gray-900 shadow-lg p-5">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 justify-center">
        <BookOpen size={28} className="text-teal-500" />
        Educa +
      </h2>

      {/* Navegação */}
      <nav className="mt-5">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                pathname === "/"
                  ? "bg-teal-500 text-white"
                  : "hover:bg-teal-500 hover:text-white"
              }`}
            >
              <Book size={20} />
              Planos de Aula
            </Link>
          </li>
          <li>
            <Link
              href="/classes"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                pathname === "/classes"
                  ? "bg-teal-500 text-white"
                  : "hover:bg-teal-500 hover:text-white"
              }`}
            >
              <ClipboardList size={20} />
              Atividades
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
