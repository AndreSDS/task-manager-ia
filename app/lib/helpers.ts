import * as dotenv from "dotenv";

// Carrega as variáveis de ambiente
export function loadEnvironment(): void {
  dotenv.config();
}

// Obtém uma API key do ambiente
export function getApiKey(keyName: string): string {
  const apiKey = process.env[keyName];
  if (!apiKey) {
    throw new Error(
      `${keyName} não encontrada nas variáveis de ambiente. Por favor, configure no arquivo .env`
    );
  }
  return apiKey;
}

// Obtém endpoint configurado
export function getEndpoint(endpointName: string): string {
  const endpoint = process.env[endpointName];
  if (!endpoint) {
    throw new Error(
      `${endpointName} não encontrado nas variáveis de ambiente. Por favor, configure no arquivo .env`
    );
  }
  return endpoint;
}
