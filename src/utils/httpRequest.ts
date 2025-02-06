import { IGetLessonPlanResponse } from "@/types/IGetLessonPlan.interface";
import axios from "axios";

export class HttpRequest {
  private static url: string =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
  private static token: string = localStorage.getItem("token") || "";

  static async getAllLessonPlans(): Promise<IGetLessonPlanResponse[]> {
    try {
      console.log('token', this.token);
      const response = await axios.get(`${this.url}/lessonPlan`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar planos de aula:", error);
      throw error;
    }
  }

  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${this.url}/user/auth`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  static async logout() {
    localStorage.removeItem("token"); // 🔥 Remove o token ao fazer logout
  }

  static async createUser(
    name: string,
    email: string,
    password: string,
    is_teacher: boolean
  ) {
    try {
      const response = await axios.post(`${this.url}/user`, {
        name,
        email,
        password,
        is_teacher,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }
}
