const BASE_URL = 'http://localhost:3333';

export const api = {
  async getSettings() {
    const response = await fetch(`${BASE_URL}/settings`);
    return response.json();
  },

  async saveSettings(data: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  }) {
    const response = await fetch(`${BASE_URL}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getTasks() {
    const response = await fetch(`${BASE_URL}/tasks`);
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async completeTask(id: string, completeDate: number) {
    const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completeDate }),
    });
    return response.json();
  },

  async interruptTask(id: string, interruptDate: number) {
    const response = await fetch(`${BASE_URL}/tasks/${id}/interrupt`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interruptDate }),
    });
    return response.json();
  },

  async deleteTasks() {
    await fetch(`${BASE_URL}/tasks`, { method: 'DELETE' });
  },
};