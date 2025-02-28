"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Plus, MapPin, User, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Contact {
  id: string
  name: string
  phone: string
}

export default function EmergencyPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [newContact, setNewContact] = useState({ name: "", phone: "" })
  const { toast } = useToast()

  // Load saved contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem("emergencyContacts")
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  // Save contacts to localStorage when they change
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts))
  }, [contacts])

  // Get user location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          toast({
            title: "Location Updated",
            description: "Your current location has been updated.",
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
  }

  // Add a new emergency contact
  const addContact = () => {
    if (newContact.name.trim() === "" || newContact.phone.trim() === "") {
      toast({
        title: "Invalid Contact",
        description: "Please enter both name and phone number.",
        variant: "destructive",
      })
      return
    }

    setContacts([...contacts, { ...newContact, id: Date.now().toString() }])
    setNewContact({ name: "", phone: "" })
    toast({
      title: "Contact Added",
      description: `${newContact.name} has been added to your emergency contacts.`,
    })
  }

  // Remove a contact
  const removeContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
    toast({
      title: "Contact Removed",
      description: "The contact has been removed from your emergency contacts.",
    })
  }

  // Call emergency services
  const callEmergency = (number: string) => {
    window.location.href = `tel:${number}`
  }

  // Share location with a contact
  const shareLocation = (contact: Contact) => {
    if (!location) {
      toast({
        title: "Location Not Available",
        description: "Please update your location first.",
        variant: "destructive",
      })
      return
    }

    const message = `Emergency: I need help. My location is: https://maps.google.com/?q=${location.lat},${location.lng}`
    window.location.href = `sms:${contact.phone}?body=${encodeURIComponent(message)}`

    toast({
      title: "Location Shared",
      description: `Your location has been shared with ${contact.name}.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Phone className="h-6 w-6 text-primary" />
            Emergency Services
          </h1>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Numbers</CardTitle>
                <CardDescription>Quick access to important emergency services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="destructive" className="gap-2" onClick={() => callEmergency("112")}>
                    <Phone className="h-5 w-5" />
                    National Emergency (112)
                  </Button>
                  <Button variant="destructive" className="gap-2" onClick={() => callEmergency("101")}>
                    <Phone className="h-5 w-5" />
                    Fire (101)
                  </Button>
                  <Button variant="destructive" className="gap-2" onClick={() => callEmergency("108")}>
                    <Phone className="h-5 w-5" />
                    Ambulance (108)
                  </Button>
                  <Button variant="destructive" className="gap-2" onClick={() => callEmergency("100")}>
                    <Phone className="h-5 w-5" />
                    Police (100)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Your Location
                </CardTitle>
                <CardDescription>Update and share your current location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={getLocation} className="gap-2">
                    <MapPin className="h-5 w-5" />
                    Update Location
                  </Button>

                  {location && (
                    <div className="p-4 bg-muted rounded-md">
                      <p className="font-medium">Current Location:</p>
                      <p className="text-sm text-muted-foreground">
                        Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>Add and manage your emergency contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Contact Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter name"
                          value={newContact.name}
                          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter phone number"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={addContact} className="gap-2">
                      <Plus className="h-5 w-5" />
                      Add Contact
                    </Button>
                  </div>

                  {contacts.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="font-medium">Your Contacts</h3>
                      {contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-4 bg-muted rounded-md">
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.phone}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => callEmergency(contact.phone)}>
                              <Phone className="h-4 w-4" />
                              <span className="sr-only">Call</span>
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => shareLocation(contact)}>
                              <MapPin className="h-4 w-4" />
                              <span className="sr-only">Share Location</span>
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeContact(contact.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No emergency contacts added yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

