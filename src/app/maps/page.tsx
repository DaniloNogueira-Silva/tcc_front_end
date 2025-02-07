"use client";

import Layout from "@/components/Layout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react"; // Ícones de seta
import FaseButton from "../../components/FaseButton";

const imagens = [
  "/maps/caminho1.png",
  "/maps/caverna.png",
];

const fases = [
  { id: 1, nome: "Fase 1", icon: "/icons/phase1.png" },
  { id: 2, nome: "Fase 2", icon: "/icons/phase2.png" },
  { id: 3, nome: "Fase 3", icon: "/icons/phase3.png" },
];

export default function Maps() {
  const router = useRouter();
  const [imagemAtual, setImagemAtual] = useState(0);
  const [mostrarSeta, setMostrarSeta] = useState(false);

  // Avançar para a próxima imagem
  const proximaImagem = () => {
    if (imagemAtual < imagens.length - 1) {
      setImagemAtual(imagemAtual + 1);
    }
  };

  // Voltar para a imagem anterior
  const imagemAnterior = () => {
    if (imagemAtual > 0) {
      setImagemAtual(imagemAtual - 1);
    }
  };

  return (
    <Layout>
      <div
        className="relative w-auto h-[92vh] overflow-hidden"
        onMouseEnter={() => setMostrarSeta(true)}
        onMouseLeave={() => setMostrarSeta(false)}
      >
        {/* Imagem de fundo ajustada para cobrir toda a tela */}
        <Image
          src={imagens[imagemAtual]}
          alt="Mapa"
          layout="fill"
          objectFit="cover"
          className="absolute left-0 top-0 w-full h-full transition-opacity duration-500"
        />

        {/* Seta para voltar (esquerda) */}
        {mostrarSeta && imagemAtual > 0 && (
          <button
            onClick={imagemAnterior}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-80 transition"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Seta para avançar (direita) */}
        {mostrarSeta && imagemAtual < imagens.length - 1 && (
          <button
            onClick={proximaImagem}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-80 transition"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Botões das fases */}
        <div className="absolute bottom-32 left-0 right-0 flex justify-evenly gap-40">
          {fases.map((fase) => (
            <FaseButton
              key={fase.id}
              icon={fase.icon}
              nome={fase.nome}
              onClick={() => router.push(`/fase/${fase.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
