"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Send, Mic, MicOff } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  text: string
  isUser: boolean
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Sahayak, your safety assistant. How can I help you today?",
      isUser: false,
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [language, setLanguage] = useState("en")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognition = useRef<any>(null)
  const { toast } = useToast()

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new (window as any).webkitSpeechRecognition()
      recognition.current.continuous = false
      recognition.current.interimResults = false
      recognition.current.lang = language === "en" ? "en-US" : "hi-IN"

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

    return () => {
      if (recognition.current) {
        recognition.current.abort()
      }
    }
  }, [language, toast])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Text-to-speech for bot messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (!lastMessage.isUser && "speechSynthesis" in window) {
        // Remove markdown formatting for speech
        const plainText = lastMessage.text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1")

        const utterance = new SpeechSynthesisUtterance(plainText)
        utterance.lang = language === "en" ? "en-US" : "hi-IN"
        window.speechSynthesis.speak(utterance)
      }
    }
  }, [messages, language])

  // Toggle voice recording
  const toggleRecording = () => {
    if (isRecording) {
      if (recognition.current) {
        recognition.current.abort()
      }
      setIsRecording(false)
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

  // Send a message
  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    const userMessageObj = { id: Date.now().toString(), text: userMessage, isUser: true }

    setMessages((prev) => [...prev, userMessageObj])
    setInput("")

    // Simulate API call with a mock response
    // In a real app, you would call your backend API here
    setTimeout(() => {
      let botResponse = ""

      if (userMessage.toLowerCase().includes("emergency") || userMessage.toLowerCase().includes("help")) {
        botResponse =
          "**Emergency Assistance**\n\nIf you're in immediate danger, please:\n\n1. Call emergency services at **112**\n2. Share your location with trusted contacts\n3. Move to a safe location if possible\n\nCan you provide more details about your situation?"
      } else if (userMessage.toLowerCase().includes("fire")) {
        botResponse =
          "**Fire Safety Protocol**\n\n* Stay low to avoid smoke inhalation\n* Use stairs, not elevators\n* Call fire department at **101**\n* If trapped, seal doors/windows with wet cloth\n* Signal for help from windows if possible"
      } else if (userMessage.toLowerCase().includes("medical") || userMessage.toLowerCase().includes("hurt")) {
        botResponse =
          "**Medical Emergency**\n\nPlease call an ambulance at **108** immediately. While waiting:\n\n* Keep the person still and comfortable\n* Monitor breathing and consciousness\n* Apply direct pressure to stop any bleeding\n* Do not move someone with potential spinal injuries"
      } else {
        botResponse =
          "I'm here to help with safety information and emergency assistance. How can I assist you today? You can ask about:\n\n* Emergency protocols\n* Safety guidelines\n* Medical emergencies\n* Natural disasters\n* Contacting emergency services"
      }

      setMessages((prev) => [...prev, { id: Date.now().toString(), text: botResponse, isUser: false }])
    }, 1000)
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
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="markdown">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
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

