import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Fingerprint,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Advanced Security",
      desc: "Protect user data with modern authentication and authorization.",
    },
    {
      icon: KeyRound,
      title: "JWT Authentication",
      desc: "Secure token-based authentication with refresh tokens.",
    },
    {
      icon: Fingerprint,
      title: "OAuth Login",
      desc: "Google, GitHub, Microsoft and social login support.",
    },
    {
      icon: Lock,
      title: "Role Management",
      desc: "Admin, User and custom role-based access control.",
    },
    {
      icon: Globe,
      title: "Multi Platform",
      desc: "Works across web, mobile and enterprise systems.",
    },
    {
      icon: Zap,
      title: "Fast Integration",
      desc: "Developer-friendly APIs and SDKs for rapid setup.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">
            Auth<span className="text-primary">Sphere</span>
          </h1>

          <div >
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="container mx-auto px-6 py-24 lg:py-36">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex rounded-full border px-4 py-2 text-sm backdrop-blur">
            🔐 Secure Authentication Platform
          </div>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-7xl">
            Modern Authentication
            <span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              For Modern Applications
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-muted-foreground">
            Secure your applications with JWT, OAuth2, Role Based Access,
            Multi-Factor Authentication and enterprise-grade security.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg">
              Start Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button variant="outline" size="lg">
              Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["10M+", "Users Protected"],
            ["99.99%", "Uptime"],
            ["50+", "Countries"],
            ["500+", "Integrations"],
          ].map(([value, label]) => (
            <Card key={label}>
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold">{value}</h3>
                <p className="mt-2 text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">
            Everything You Need
          </h2>

          <p className="mt-4 text-muted-foreground">
            Powerful authentication features for modern applications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group transition-all duration-300 hover:-translate-y-2 hover:border-primary"
              >
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold">
              Security First Architecture
            </h2>

            <p className="mt-6 text-muted-foreground">
              Built with enterprise-grade security standards and best
              authentication practices.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "JWT & Refresh Tokens",
                "OAuth2 & Social Login",
                "Role Based Access Control",
                "Password Encryption",
                "Multi-Factor Authentication",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-primary/30 bg-background/60 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  🔐 Authentication Layer
                </div>

                <div className="rounded-lg border p-4">
                  🛡 Authorization Layer
                </div>

                <div className="rounded-lg border p-4">
                  ⚡ JWT Token Service
                </div>

                <div className="rounded-lg border p-4">
                  ☁ OAuth Providers
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            How It Works
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              "User Login",
              "Token Generation",
              "Secure Access",
            ].map((step, index) => (
              <Card key={step}>
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </div>

                  <h3 className="font-semibold">{step}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Trusted By Developers
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className="p-8">
                  <p className="italic text-muted-foreground">
                    "The easiest authentication platform we've ever integrated."
                  </p>

                  <h4 className="mt-4 font-semibold">
                    Developer {item}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold">
              Ready To Secure Your Application?
            </h2>

            <p className="mt-4 text-muted-foreground">
              Join thousands of developers building secure systems.
            </p>

            <Button size="lg" className="mt-8">
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          © 2026 AuthSphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
}