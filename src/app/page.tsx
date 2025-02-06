"use client"; // Adicione esta linha no topo

import { useEffect, useState } from "react";

import { HttpRequest } from "@/utils/httpRequest";
import { IGetLessonPlanResponse } from "@/types/IGetLessonPlan.interface";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  useAuth()
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

      <ul className="mt-4 space-y-4">
        {lessonPlans.map((plan) => (
          <li key={plan.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-gray-600">Tema: {plan.theme}</p>

            {plan?.teacher && (
              <p className="text-gray-700">Professor: {plan.teacher.name}</p>
            )}

            {plan?.classes && (
              <div className="mt-2">
                <p className="font-semibold">Turmas:</p>
                <ul className="list-disc pl-5 text-gray-700">
                  {plan.classes.map((classItem) => (
                    <li key={classItem.id}>{classItem.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
