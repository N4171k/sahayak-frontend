"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Send, Mic, MicOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  text: string
  isUser: boolean
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Sahayak, your safety assistant. How can I help?",
      isUser: false,
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const chatEndRef = useRef<HTMLDivElement>(null)
  const recognition = useRef<any>(null)
  const { toast } = useToast()

  // Auto-scroll to the latest message when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Speech recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new (window as any).webkitSpeechRecognition()
      recognition.current.continuous = false
      recognition.current.interimResults = false
      recognition.current.lang = "en-US"

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsRecording(false)
      }

      recognition.current.onerror = (event: any) => {
        console.error("Speech recognition error", event)
        setIsRecording(false)
        toast({
          title: "Voice Recognition Error",
          description: "There was a problem with voice recognition. Please try again.",
          variant: "destructive",
        })
      }

      recognition.current.onend = () => {
        setIsRecording(false)
      }
    }
  }, [toast])

  // Auto-speak bot messages using SpeechSynthesis
  // useEffect(() => {
  //   if (messages.length > 0) {
  //     const lastMessage = messages[messages.length - 1]
  //     if (!lastMessage.isUser && "speechSynthesis" in window) {
  //       const plainText = lastMessage.text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1")
  //       const utterance = new SpeechSynthesisUtterance(plainText)
  //       window.speechSynthesis.speak(utterance)
  //     }
  //   }
  // }, [messages])

  // Function to start/stop voice recording
  const toggleRecording = () => {
    if (isRecording) {
      if (recognition.current) {
        recognition.current.stop()
      }
    } else {
      if (recognition.current) {
        recognition.current.start()
        setIsRecording(true)
      } else {
        toast({
          title: "Voice Recognition Not Supported",
          description: "Your browser doesn't support voice recognition.",
          variant: "destructive",
        })
      }
    }
  }

  // Message handling: send user message and fetch response from API
  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }])
    setInput("")

    try {
      const response = await fetch("https://sahayak-backend-3soq.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) throw new Error("API request failed")

      const data = await response.json()
      setMessages((prev) => [...prev, { text: data.text, isUser: false }])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Connection issue. Please try again later.",
          isUser: false,
        },
      ])
    }
  }

  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <Card className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </Card>

      <div className="mt-4 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-[60px] flex-1"
        />
        <div className="flex flex-col gap-2">
          <Button
            onClick={toggleRecording}
            variant={isRecording ? "destructive" : "secondary"}
            size="icon"
            className="h-12 w-12"
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button onClick={sendMessage} disabled={!input.trim()} size="icon" className="h-12 w-12">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

