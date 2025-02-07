"use client"; // Adicione esta linha no topo

import { useEffect, useState } from "react";

import { HttpRequest } from "@/utils/httpRequest";
import { IGetLessonPlanResponse } from "@/types/IGetLessonPlan.interface";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const themeImages: Record<string, string> = {
  FLOREST: "/themes/florest.png",
  CAVERN: "/themes/cavern.png",
  DUNGEON: "/themes/dungeon.png",
};

export default function Home() {
  useAuth();
  const [lessonPlans, setLessonPlans] = useState<IGetLessonPlanResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Planos de Aula</h2>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <Link href="./maps">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {lessonPlans.map((plan) => (
            <div
              key={plan.id}
              className="border border-teal-500 rounded-lg shadow-md overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
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
                <p className="text-gray-600">
                  Aulas: {plan?.classes?.length || 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </Layout>
  );
}
