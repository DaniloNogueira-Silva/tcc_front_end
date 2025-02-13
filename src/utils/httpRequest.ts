import axios from "axios";

export class HttpRequest {
  private static url: string =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null; // Retorna `null` no servidor
  }

  static async getAllLessonPlans() {
    try {
      const token = this.getToken(); // Obtém o token de forma segura

      const response = await axios.get(`${this.url}/lessonPlan`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data); // Salva o token apenas no cliente
      }

      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  static async logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
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

  static async createLessonPlan(
    name: string,
    theme: string,
    teacher_id: string
  ) {
    try {
      const token = this.getToken();

      const response = await axios.post(
        `${this.url}/lessonPlan`,
        { name, theme, teacher_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao criar plano de aula:", error);
      throw error;
    }
  }

  static async updateLessonPlan(
    id: string,
    name: string,
    theme: string,
  ): Promise<void> {
    try {
      const token = this.getToken();

      await axios.patch(
        `${this.url}/lessonPlan/${id}`,
        { name, theme },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return;
    } catch (error) {
      console.error("Erro ao atualizar plano de aula:", error);
      throw error;
    }
  }

  static async deleteLessonPlan(id: string): Promise<void> {
    try {
      const token = this.getToken();

      await axios.delete(`${this.url}/lessonPlan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return;
    } catch (error) {
      console.error("Erro ao deletar plano de aula:", error);
      throw error;
    }
  }
}
