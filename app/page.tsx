import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Shield, Phone, MapPin, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary">Welcome to Sahayak</h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Your intelligent safety assistant that's always there when you need help
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/chat">
                  <Button size="lg" className="gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Start Chat
                  </Button>
                </Link>
                <Link href="/emergency">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Shield className="h-5 w-5" />
                    Emergency Services
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="slide-in" style={{ animationDelay: "0ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Safety Guidelines
                  </CardTitle>
                  <CardDescription>Access important safety information and protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Get instant access to safety guidelines and protocols for various emergency situations.
                  </p>
                  <Link href="/guidelines">
                    <Button variant="secondary" className="w-full">
                      View Guidelines
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="slide-in" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Emergency Contacts
                  </CardTitle>
                  <CardDescription>Quick access to emergency services</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    One-tap access to emergency services and your trusted contacts in critical situations.
                  </p>
                  <Link href="/emergency">
                    <Button variant="secondary" className="w-full">
                      View Contacts
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="slide-in" style={{ animationDelay: "200ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location Services
                  </CardTitle>
                  <CardDescription>Share your location in emergencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Quickly share your precise location with emergency services or trusted contacts.
                  </p>
                  <Link href="/location">
                    <Button variant="secondary" className="w-full">
                      Location Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted dark:bg-muted/20">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Safety Is Our Priority</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Sahayak combines advanced AI with emergency services to provide you with immediate assistance whenever you
              need it.
            </p>
            <div className="mt-8">
              <Link href="/chat">
                <Button size="lg" className="gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat with Sahayak
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Sahayak. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

