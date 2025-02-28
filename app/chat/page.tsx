"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ChatInterface } from "@/components/chat-interface"
import { EmergencyModal } from "@/components/emergency-modal"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function ChatPage() {
  const [showEmergency, setShowEmergency] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header showEmergencyButton />

      <main className="flex-1 container max-w-4xl px-4 py-6">
        <div className="mb-6 flex justify-center">
          <Button
            variant="destructive"
            size="lg"
            className="pulse-animation gap-2 px-8"
            onClick={() => setShowEmergency(true)}
          >
            <AlertTriangle className="h-5 w-5" />
            SOS Emergency
          </Button>
        </div>

        <ChatInterface />
      </main>

      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} location={location} />}
    </div>
  )
}

