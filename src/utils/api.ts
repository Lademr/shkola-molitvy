const API_BASE_URL = 'https://shkola-molitvy.ru/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      this.clearToken();
      window.location.href = '/#/profile';
      throw new Error('Необходима авторизация');
    }

    return response.json();
  }

  // Аутентификация
  async register(email: string, name: string, password: string) {
    const data = await this.request('/auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'register', email, name, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request('/auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  logout() {
    this.clearToken();
  }

  // Пользователь
  async getUserData() {
    return this.request('/user.php');
  }

  // Прогресс
  async completeLesson(lessonId: number) {
    return this.request('/progress.php', {
      method: 'POST',
      body: JSON.stringify({ lessonId }),
    });
  }

  // Тесты
  async saveQuizResult(lessonId: number, score: number, total: number) {
    return this.request('/quiz.php', {
      method: 'POST',
      body: JSON.stringify({ lessonId, score, total }),
    });
  }

  // Дневник
  async getDiaryEntries() {
    return this.request('/diary.php');
  }

  async addDiaryEntry(prayerRequest: string, category: string) {
    return this.request('/diary.php', {
      method: 'POST',
      body: JSON.stringify({ prayerRequest, category }),
    });
  }

  async updateDiaryEntry(id: number, answered: boolean, answer?: string) {
    return this.request('/diary.php', {
      method: 'PUT',
      body: JSON.stringify({ id, answered, answer }),
    });
  }

  async deleteDiaryEntry(id: number) {
    return this.request('/diary.php', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  }
}

export const api = new ApiClient();
