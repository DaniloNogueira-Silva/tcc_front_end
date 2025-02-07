"use client";

import { Dices, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { HttpRequest } from "@/utils/httpRequest";
import { IGetLessonPlanResponse } from "@/types/IGetLessonPlan.interface";
import Layout from "@/components/Layout";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/hooks/useAuth";

const themeImages: Record<string, string> = {
  FLOREST: "/themes/florest.png",
  CAVERN: "/themes/cavern.png",
  DUNGEON: "/themes/dungeon.png",
};

interface TokenPayload {
  id: string;
  email: string;
  exp: number;
}

export default function Home() {
  useAuth();
  const [lessonPlans, setLessonPlans] = useState<IGetLessonPlanResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<IGetLessonPlanResponse | null>(
    null
  );
  const [newPlan, setNewPlan] = useState({ name: "", theme: "" });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessonPlans = async () => {
      try {
        const data = await HttpRequest.getAllLessonPlans();
        setLessonPlans(data);
      } catch (err) {
        setError("Erro ao carregar planos de aula.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonPlans();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  const handleCreatePlan = async () => {
    if (!newPlan.name || !newPlan.theme || !userId) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      if (editingPlan) {
        await HttpRequest.updateLessonPlan(editingPlan.id, newPlan.name, newPlan.theme);
      } else {
        await HttpRequest.createLessonPlan(newPlan.name, newPlan.theme, userId);
      }

      setIsModalOpen(false);
      setEditingPlan(null);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar/editar plano:", error);
    }
  };

  const handleEditPlan = (plan: IGetLessonPlanResponse) => {
    setNewPlan({ name: plan.name, theme: plan.theme });
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = async (planId: string) => {
    if (confirm("Tem certeza que deseja excluir este plano?")) {
      try {
        await HttpRequest.deleteLessonPlan(planId);
        window.location.reload();
      } catch (error) {
        console.error("Erro ao excluir plano:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Planos de Aula</h2>
          <button
            onClick={() => {
              setEditingPlan(null);
              setNewPlan({ name: "", theme: "" });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
          >
            <Dices />
            Criar Plano
          </button>
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <Link href="./maps">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {lessonPlans.map((plan) => (
              <div
                key={plan.id}
                className="border border-teal-500 rounded-lg shadow-md overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-lg relative"
              >
                <img
                  src={
                    themeImages[plan.theme.toUpperCase()] || "/images/default.png"
                  }
                  alt={plan.theme}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-gray-600">Aulas: {plan?.classes?.length || 0}</p>
                </div>

                {/* Botões de Editar e Excluir */}
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditPlan(plan)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h3 className="text-xl font-semibold mb-4">
              {editingPlan ? "Editar Plano de Aula" : "Criar Plano de Aula"}
            </h3>

            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Digite o nome do plano"
            />

            <label className="block text-sm font-medium text-gray-700">Tema</label>
            <select
              value={newPlan.theme}
              onChange={(e) => setNewPlan({ ...newPlan, theme: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="">Selecione um tema</option>
              {Object.keys(themeImages).map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Fechar
              </button>
              <button
                onClick={handleCreatePlan}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
              >
                {editingPlan ? "Salvar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
