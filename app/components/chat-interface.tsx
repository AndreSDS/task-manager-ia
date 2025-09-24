import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { ChatMessages } from "~/generated/prisma/client";
import type { loader } from "~/routes/task-new";

export function ChatInterface() {
  const { chatId, messages } = useLoaderData<typeof loader>();

  // Local state for messages sent but not yet in loader data
  const [localMessages, setLocalMessages] = useState<ChatMessages[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [streamedMessage, setStreamedMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [optimisticMessages, setOptimisticMessages] = useState<ChatMessages[]>([]);

   // Limpa localMessages quando messages é atualizado pelo loader
  useEffect(() => {
    if (localMessages.length > 0) {
      setLocalMessages([]);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messageRef && messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedMessage, optimisticMessages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStreamedMessage("");

    // Cria mensagem otimista
    const optimisticMessage: ChatMessages = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      status: "pending"
    } as any;
  setOptimisticMessages((prev) => [...prev, optimisticMessage]);
  setLocalMessages((prev) => [...prev, optimisticMessage]);

    setInputValue("");
    inputRef.current?.focus();

    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/chat", {
      method: "POST",
      body: formData,
    });

    if (!response.body) {
      setIsLoading(false);
      // Remove mensagem otimista se falhar
      setOptimisticMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      result += chunk;
      setStreamedMessage(result);
    }
    setIsLoading(false);
    // Remove mensagem otimista após resposta
    setOptimisticMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));

    // Adiciona a resposta do assistant ao estado local
    const assistantMsg: ChatMessages = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: result,
      created_at: new Date(),
    } as any;
    setLocalMessages((prev) => [...prev, assistantMsg]);

    // Limpa mensagens otimistas
    setOptimisticMessages([]);
  };

  return (
    <div className="flex flex-col w-full mx-auto px-4  overflow-y-auto max-h-[calc(100vh-10rem)]">
      {/* Messages */}
      <ScrollArea className="flex-1 p-4 h-full overflow-y-auto">
        <div className="space-y-4 pr-4">
          {messages.length === 0 && optimisticMessages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {"Welcome! How can I help you today?"}
              </h2>
              <p className="text-muted-foreground">
                {"Start a conversation by typing a message below."}
              </p>
            </div>
          )}

          {/* Mensagens normais + locais */}
          {[...messages, ...localMessages].map((message: ChatMessages) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-3 items-end ${message.role === "user" ? "justify-end" : "justify-start"}`}
              style={{ minWidth: 0 }}
            >
              {message.role === "assistant" && (
                <Avatar className="w-8 h-8 bg-muted border shrink-0">
                  <AvatarFallback>
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              )}

              <Card
                className={`max-w-[75vw] sm:max-w-[60vw] p-3 sm:p-4 gap-1 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border shadow-sm"
                }`}
                style={{ wordBreak: "break-word", minWidth: 0 }}
              >
                <p className="text-sm leading-relaxed break-words">{message.content}</p>
                <p className="text-xs opacity-70 text-right">
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </Card>

              {message.role === "user" && (
                <Avatar className="w-8 h-8 bg-secondary border shrink-0">
                  <AvatarFallback>
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Mensagens otimistas */}
          {(optimisticMessages.length > 0 && (!messages.some(m => m.id === optimisticMessages[0].id))) && optimisticMessages.map((message: ChatMessages) => (
            <div
              key={message.id}
              className="flex gap-2 sm:gap-3 items-end justify-end"
              style={{ minWidth: 0 }}
            >
              <Card
                className="max-w-[75vw] sm:max-w-[60vw] p-3 sm:p-4 gap-1 bg-primary text-primary-foreground opacity-70 relative"
                style={{ wordBreak: "break-word", minWidth: 0 }}
              >
                <p className="text-sm leading-relaxed break-words">{message.content}</p>
                <p className="text-xs opacity-70 text-right">
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </Card>
              <Avatar className="w-8 h-8 bg-secondary border shrink-0">
                <AvatarFallback>
                  <User className="w-4 h-4 text-secondary-foreground" />
                </AvatarFallback>
              </Avatar>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 bg-muted border">
                <AvatarFallback>
                  <Bot className="w-4 h-4 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-card border shadow-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-sm">{"Thinking..."}</span>
                </div>
              </Card>
            </div>
          )}

          {streamedMessage && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 bg-muted border">
                <AvatarFallback>
                  <Bot className="w-4 h-4 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-card border shadow-sm p-4">
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {streamedMessage}
                </p>
              </Card>
            </div>
          )}
          <div ref={messageRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <div className="flex-1 relative">
          <input type="hidden" name="chatId" value={chatId ?? ""} />
          <Input
            ref={inputRef}
            name="message"
            placeholder="Descreva sua tarefa..."
            disabled={isLoading}
            className="bg-background border focus:border-ring text-balance"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !inputValue}
          className="px-4"
        >
          <Send className="w-4 h-4" />
          <span className="sr-only">Enviar mensagem</span>
        </Button>
      </form>
    </div>
  );
}
