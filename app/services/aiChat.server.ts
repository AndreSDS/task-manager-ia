import OpenAI from "openai";
import prisma from "prisma/prisma";
import { ChatMessageRole } from "~/generated/prisma/enums";
import { getApiKey, getEndpoint, loadEnvironment } from "~/lib/helpers";

loadEnvironment();

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*{1,2}/g, "") // Remove asteriscos (negrito/itálico)
    .replace(/`+/g, "") // Remove backticks
    .replace(/^#+\s?/gm, "") // Remove hashes de títulos
    .replace(/^-\s+/gm, "") // Remove traços de listas
    .replace(/_/g, "") // Remove underscores
    .replace(/\s{2,}/g, " ") // Remove múltiplos espaços
    .trim();
}

const SYSTEM_PROMPT = `
Voce eh um gerente de projetos muito inteligente, expecializado em solucoes web e mobile.
Voce recebera um pedido para entregar instrucoes detalhadas sobre como construir uma funcionalidade
 e deve responder como se estivesse criando especificacoes para tal funcionalidade, o melhor possivel.
Este e um projeto continuo que utiliza React Router 7 (modo framework), Tailwind Css, Shadcn UI, SQLite
 e Prisma ORM. Para testes, o app utiliza Vitest e React Testing Library e a estrategia de testes e: apenas testes unitarios.
Evite sugerir a instalacao de qualquer uma dessas dependecias. Elas ja estao declaradas para apaiar suas decisoes de 
ferramentas adcionadas.
Por favor, refine a seguinte descricao de tarefa  e retorne um JSON com: titulo, descricao, etapas, tempo estimado e sugestao de implementacao.
Sempre esntregue os resultados em portugues brasileiro (pt_br). independentemente do idioma do usuario.

Pontos extremamente importantes:
- Em nenhuma circunstancia utilize \`\`\`json em sua resposta.
- Caso a mensagem de usuario nao possa gerar uma tarefa valida, retorne um JSON vazio porem valido ("{}").
- Caso uma conversa ja possua uma mensagem com role = assistent contendo um JSON valido, use o para compor 
sua resposta, pois pode ser que o ususario queira expandir sua sugestao inicial.
- Quando usuario solicitar alteracoes na tarefa refinada, faca as alteracoes de forma cirurgica, ou seja, caso peca para remover um dos testes, remova e mantenha o restante.

Saida JSON esperada:
{
  "title": "Formulario de Login Seguro com Autenticacao",
  "description": "Implemento um formulario de login moderno com validacao de campos, autentcicao baseada em sessao e feedback de erro em tempo real.",
  "steps": [
    "Crie um componente de formulario de login usando React e Tailwind CSS.",
    "Adicione validacao de campos utilizando biblioteca adequada.",
    "Conecte o backend para autenticacao de ususarios.",
    "Persista sessoes utilizando SQLite",
    "Teste todo o fluxo de login e logout.",
    ],
  "acceptance_criteria": [
    "Primeiro criterio",
    "Segundo criterio",
    "Terceiro criterio",
    "Quarto criterio"
  ],
  "suggested_tests": [
    "it('primeiro teste')",
    "it('segundo teste')",
    "it('terceiro teste')",
    "it('quarto teste')"
  ],
  "estimated_time": "2 dias",
  "implementation_suggestion": "Use React Hook Form para validacao. Prisma ORM para gerenciamento de usuarios e configure rotas protegidas com React Router 7."
}
`;
export type Message = {
  role: ChatMessageRole;
  content: string;
};

export async function getChatCompletion(messages: Message[]) {
  try {
    const token = getApiKey("GITHUB_MODELS_TOKEN");
    const endpoint = getEndpoint("GITHUB_MODELS_ENDPOINT");
    const modelName = process.env.GITHUB_MODELS_NAME || "";

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const systemMessage = {
      role: ChatMessageRole.system,
      content: SYSTEM_PROMPT,
    };

    const completion = await client.chat.completions.create({
      messages: [systemMessage, ...messages],
      temperature: 0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName,
      stream: false,
    });

    return completion.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("Erro:", error instanceof Error ? error.message : error);
    return "";
  }
}

export async function createChatMessages(
  chatId: string,
  chatMessage: Message,
  messages: Message
) {
  await prisma.chatMessages.createMany({
    data: [
      {
        chat_id: chatId,
        ...chatMessage,
      },
      {
        chat_id: chatId,
        ...messages,
      },
    ],
  });
}
