import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Flame, Waves, Wind, AmbulanceIcon as FirstAid } from "lucide-react"

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Safety Guidelines
          </h1>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  General Emergency
                </CardTitle>
                <CardDescription>Basic steps to follow in any emergency situation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Stay calm and assess the situation</li>
                  <li>Call emergency services if in immediate danger (Dial 112)</li>
                  <li>Move to a safe location if possible</li>
                  <li>Follow instructions from emergency personnel</li>
                  <li>Share your location with trusted contacts</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500" />
                  Fire Safety
                </CardTitle>
                <CardDescription>What to do in case of fire</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Activate the nearest fire alarm</li>
                  <li>Call the fire department (Dial 101)</li>
                  <li>Use stairs, not elevators</li>
                  <li>Stay low to avoid smoke inhalation</li>
                  <li>If trapped, seal doors and windows with wet cloth</li>
                  <li>Signal for help from windows if possible</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FirstAid className="h-5 w-5 text-red-500" />
                  Medical Emergency
                </CardTitle>
                <CardDescription>Steps for medical emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Call for an ambulance (Dial 108)</li>
                  <li>Check for breathing and pulse</li>
                  <li>Perform CPR if trained and necessary</li>
                  <li>Control bleeding with direct pressure</li>
                  <li>Keep the person warm and comfortable</li>
                  <li>Do not move someone with potential spinal injuries</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-blue-500" />
                  Flood Safety
                </CardTitle>
                <CardDescription>How to stay safe during floods</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Move to higher ground immediately</li>
                  <li>Avoid walking or driving through flood waters</li>
                  <li>Stay away from power lines and electrical wires</li>
                  <li>Turn off utilities at the main switches if instructed</li>
                  <li>Listen to emergency broadcasts for instructions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-blue-500" />
                  Earthquake Safety
                </CardTitle>
                <CardDescription>What to do during an earthquake</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Drop, cover, and hold on</li>
                  <li>Stay away from windows, outside walls, and doorways</li>
                  <li>If outdoors, move to an open area away from buildings</li>
                  <li>If in a vehicle, pull over and stay inside</li>
                  <li>After shaking stops, check for injuries and damage</li>
                  <li>Be prepared for aftershocks</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

