"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

// Language context would be better for a real app, but this is a simplified version
const translations = {
  en: {
    chat: "Chat",
    guidelines: "Safety Guidelines",
    emergency: "Emergency Services",
    welcome: "Welcome to Sahayak",
    description: "Your virtual assistant for safety and emergency services",
    startChat: "Start Chat",
    emergencyServices: "Emergency Services",
    safetyGuidelines: "Safety Guidelines",
    emergencyContacts: "Emergency Contacts",
    locationServices: "Location Services",
    // Add more translations as needed
  },
  hi: {
    chat: "चैट",
    guidelines: "सुरक्षा दिशानिर्देश",
    emergency: "आपातकालीन सेवाएं",
    welcome: "सहायक में आपका स्वागत है",
    description: "सुरक्षा और आपातकालीन सेवाओं के लिए आपका आभासी सहायक",
    startChat: "चैट शुरू करें",
    emergencyServices: "आपातकालीन सेवाएं",
    safetyGuidelines: "सुरक्षा दिशानिर्देश",
    emergencyContacts: "आपातकालीन संपर्क",
    locationServices: "स्थान सेवाएं",
    // Add more translations as needed
  },
}

export function LanguageSelector() {
  const [language, setLanguage] = useState("en")

  // Set language in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
    // In a real app, you would update the UI with translations here
  }, [language])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>English {language === "en" && "✓"}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("hi")}>हिंदी (Hindi) {language === "hi" && "✓"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

