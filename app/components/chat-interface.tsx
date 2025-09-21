import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card } from "~/components/ui/card"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

export function ChatInterface() {
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && status !== "in_progress") {
      sendMessage({ text: input })
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-full w-full mx-auto px-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">{"Welcome! How can I help you today?"}</h2>
            <p className="text-muted-foreground">{"Start a conversation by typing a message below."}</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <Avatar className="w-8 h-8 bg-muted border">
                <AvatarFallback>
                  <Bot className="w-4 h-4 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            )}

            <Card
              className={`max-w-[80%] p-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border shadow-sm"
                }`}
            >
              <div className="text-sm leading-relaxed">
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <span key={index}>{part.text}</span>
                  }
                  return null
                })}
              </div>
            </Card>

            {message.role === "user" && (
              <Avatar className="w-8 h-8 bg-secondary border">
                <AvatarFallback>
                  <User className="w-4 h-4 text-secondary-foreground" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {status === "in_progress" && (
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
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <div className="flex-1 relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={status === "in_progress"}
            className="bg-background border focus:border-ring text-balance"
          />
        </div>
        <Button type="submit" disabled={!input.trim() || status === "in_progress"} className="px-4">
          <Send className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
