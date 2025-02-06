"use client";

import { HttpRequest } from "@/utils/httpRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    is_teacher: false,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        // 📌 Criar usuário (Registro)
        await HttpRequest.createUser(
          formData.name,
          formData.email,
          formData.password,
          formData.is_teacher
        );
        setIsRegister(false); 
      } else {
        const data = await HttpRequest.login(formData.email, formData.password);
        localStorage.setItem("token", data);
        router.push("/");
      }
    } catch (err) {
      setError("Erro ao processar a requisição.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Criar Conta" : "Entrar"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          {isRegister && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_teacher"
                checked={formData.is_teacher}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>Sou professor</span>
            </label>
          )}
          <button type="submit" className="bg-teal-500 text-white p-2 rounded">
            {isRegister ? "Registrar" : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isRegister ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-teal-500 underline"
          >
            {isRegister ? "Faça login" : "Cadastre-se"}
          </button>
        </p>
      </div>
    </div>
  );
}
