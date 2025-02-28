"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { EmergencyModal } from "@/components/emergency-modal"
import { AlertTriangle } from "lucide-react"
import { Menu, MessageSquare, Shield } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  showEmergencyButton?: boolean
}

export function Header({ showEmergencyButton = false }: HeaderProps) {
  const [showEmergency, setShowEmergency] = useState(false)
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user location when emergency button is clicked
  const handleEmergency = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setShowEmergency(true)
        },
        (error) => {
          console.error("Error getting location:", error)
          setShowEmergency(true) // Still show emergency modal even if location fails
        },
      )
    } else {
      setShowEmergency(true) // Still show emergency modal if geolocation not supported
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setOpen(false)}>
                  <Shield className="h-6 w-6 text-primary" />
                  Sahayak
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/chat"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <MessageSquare className="h-5 w-5" />
                    Chat
                  </Link>
                  <Link
                    href="/guidelines"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Shield className="h-5 w-5" />
                    Safety Guidelines
                  </Link>
                  <Link
                    href="/emergency"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <AlertTriangle className="h-5 w-5" />
                    Emergency Services
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            Sahayak
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/chat" className="text-foreground hover:text-primary transition-colors">
            Chat
          </Link>
          <Link href="/guidelines" className="text-foreground hover:text-primary transition-colors">
            Safety Guidelines
          </Link>
          <Link href="/emergency" className="text-foreground hover:text-primary transition-colors">
            Emergency Services
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ModeToggle />

          {showEmergencyButton && (
            <Button variant="destructive" size="sm" className="gap-1" onClick={handleEmergency}>
              <AlertTriangle className="h-4 w-4" />
              SOS
            </Button>
          )}
        </div>
      </div>

      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} location={location} />}
    </header>
  )
}

