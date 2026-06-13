const BASE_URL = 'http://localhost:3333';

function getToken() {
  return localStorage.getItem('chronos-token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

export const api = {
  // Auth
  async register(data: { name: string; email: string; password: string }) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async login(data: { email: string; password: string }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async forgotPassword(email: string) {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  async resetPassword(data: { token: string; password: string }) {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Settings
  async getSettings() {
    const response = await fetch(`${BASE_URL}/settings`, {
      headers: authHeaders(),
    });
    return response.json();
  },

  async saveSettings(data: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  }) {
    const response = await fetch(`${BASE_URL}/settings`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Tasks
  async getTasks() {
    const response = await fetch(`${BASE_URL}/tasks`, {
      headers: authHeaders(),
    });
    return response.json();
  },

  async createTask(data: {
    id: string;
    name: string;
    duration: number;
    type: string;
    startDate: number;
  }) {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async completeTask(id: string, completeDate: number) {
    const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ completeDate }),
    });
    return response.json();
  },

  async interruptTask(id: string, interruptDate: number) {
    const response = await fetch(`${BASE_URL}/tasks/${id}/interrupt`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ interruptDate }),
    });
    return response.json();
  },

  async deleteTasks() {
    await fetch(`${BASE_URL}/tasks`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  },
};