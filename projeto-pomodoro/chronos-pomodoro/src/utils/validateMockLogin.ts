// src/utils/validateMockLogin.ts
import { MOCK_USERNAME, MOCK_PASSWORD } from '../constants/mockCredentials';

/**
 * Compara usuário e senha com as credenciais mockadas do projeto.
 * Não há chamada a API; apenas comparação em memória.
 */
export function validateMockLogin(username: string, password: string): boolean {
  return username.trim() === MOCK_USERNAME && password === MOCK_PASSWORD;
}
