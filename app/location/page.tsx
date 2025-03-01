"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Share2, Copy, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LocationPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          toast({
            title: "Location Updated",
            description: "Your current location has been successfully retrieved.",
          })
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please check your settings.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      })
    }
  }, [toast])

  const copyLocation = () => {
    if (!location) return

    const locationText = `My current location: https://maps.google.com/?q=${location.lat},${location.lng}`
    navigator.clipboard.writeText(locationText).then(() => {
      setCopied(true)
      toast({
        title: "Location Copied",
        description: "Location link has been copied to clipboard.",
      })

      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareLocation = () => {
    if (!location) return

    if (navigator.share) {
      navigator
        .share({
          title: "My Location",
          text: `My current location: https://maps.google.com/?q=${location.lat},${location.lng}`,
        })
        .catch((error) => {
          console.error("Error sharing:", error)
        })
    } else {
      copyLocation()
    }
  }

  // Get location on component mount
  useEffect(() => {
    getLocation()
  }, [getLocation])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Location Services
          </h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Current Location</CardTitle>
              <CardDescription>
                Update and share your location with emergency services or trusted contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={getLocation} className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Update Location
                </Button>

                {location ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-md">
                      <p className="font-medium">Current Coordinates:</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Latitude: {location.lat.toFixed(6)}
                        <br />
                        Longitude: {location.lng.toFixed(6)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" className="gap-2" onClick={copyLocation}>
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

                      <Button variant="outline" className="gap-2" onClick={shareLocation}>
                        <Share2 className="h-4 w-4" />
                        Share Location
                      </Button>

                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() =>
                          window.open(`https://maps.google.com/?q=${location.lat},${location.lng}`, "_blank")
                        }
                      >
                        <MapPin className="h-4 w-4" />
                        View on Map
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Location information is not available. Please enable location services and click "Update Location".
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Safety Tips</CardTitle>
              <CardDescription>Important guidelines for location sharing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>Only share your location with trusted contacts and emergency services</li>
                <li>Keep location services enabled during emergencies</li>
                <li>Update your location regularly when moving</li>
                <li>Make sure your device&apos;s GPS is accurate and working properly</li>
                <li>Consider sharing your location with family members for safety</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

