export type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export type AnswerMessage = {
  id: string;
  role: "user" | "assistant";
  timestamp: Date;
  content: string | null | undefined;
};
