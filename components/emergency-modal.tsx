"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, MapPin, Copy, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface EmergencyModalProps {
  onClose: () => void
  location: { lat: number; lng: number } | null
}

export function EmergencyModal({ onClose, location }: EmergencyModalProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const emergencyNumbers = [
    { name: "National Emergency", number: "112" },
    { name: "Police", number: "100" },
    { name: "Fire", number: "101" },
    { name: "Ambulance", number: "108" },
  ]

  const callEmergency = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const copyLocation = () => {
    if (!location) return

    const locationText = `Emergency: I need help. My location is: https://maps.google.com/?q=${location.lat},${location.lng}`
    navigator.clipboard.writeText(locationText)
      .then(() => {
        setCopied(true)
        toast({
          title: "Location Copied",
          description: "Your location has been copied to clipboard.",
        })
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy location. Please try again.",
          variant: "destructive"
        })
      })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Emergency Assistance
          </DialogTitle>
          <DialogDescription>Contact emergency services immediately if you are in danger.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {emergencyNumbers.map((service) => (
              <Button
                key={service.number}
                variant="destructive"
                className="gap-2"
                onClick={() => callEmergency(service.number)}
              >
                <Phone className="h-4 w-4" />
                {service.name} ({service.number})
              </Button>
            ))}
          </div>

          {location ? (
            <div className="p-4 bg-muted rounded-md">
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Your Current Location
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                  </p>
                </div>
                <iframe 
                  src={`https://maps.google.com/?q=${location.lat},${location.lng}&output=embed`} 
                  className="w-full h-40 rounded-md mt-2 sm:mt-0 sm:w-64"
                  title="Current Location"
                />
                <Button variant="outline" size="sm" className="gap-1 self-center" onClick={copyLocation}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Location
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Location information is not available. Please enable location services.
            </p>
          )}
        </div>

        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}