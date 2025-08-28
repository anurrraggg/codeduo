import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Code, Users, Trophy, Zap, Play, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">CodeDuo</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>SITE LANGUAGE: ENGLISH</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                  The free, fun, and effective way to learn <span className="text-primary">programming!</span>
                </h1>
                <p className="text-lg text-muted-foreground text-pretty">
                  Master coding through interactive lessons, gamified challenges, and a supportive community. Start your
                  programming journey today!
                </p>
              </div>

              <div className="space-y-4">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                  GET STARTED
                </Button>
                <div className="text-center sm:text-left">
                  <Button variant="ghost" className="text-accent hover:text-accent/80 font-medium">
                    I ALREADY HAVE AN ACCOUNT
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-12">
                <img
                  src="/landing_page_centre_img.png"
                  alt="Coding characters learning together"
                  className="w-full h-auto max-w-md mx-auto"
                />
                <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full p-3">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground rounded-full p-3">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programming Languages Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                JS
              </div>
              <span>JAVASCRIPT</span>
            </div>
           
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                JV
              </div>
              <span>JAVA</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-6 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                C++
              </div>
              <span>C++</span>
            </div>
            
           
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why millions choose CodeDuo</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven approach makes learning to code engaging, effective, and fun for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Interactive Lessons</h3>
                <p className="text-muted-foreground">
                  Learn by doing with hands-on coding exercises and real-time feedback on every line of code.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Gamified Learning</h3>
                <p className="text-muted-foreground">
                  Earn points, unlock achievements, and compete with friends as you progress through coding challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Community Support</h3>
                <p className="text-muted-foreground">
                  Join a vibrant community of learners and get help from peers and mentors whenever you need it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500M+</div>
              <div className="text-muted-foreground">Learners worldwide</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">40+</div>
              <div className="text-muted-foreground">Programming languages</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">15min</div>
              <div className="text-muted-foreground">Daily lessons</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl lg:text-3xl font-medium text-foreground mb-6 text-balance">
              "CodeDuo made learning Coding so much fun! The interactive lessons and gamification kept me motivated
              throughout my coding journey."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img src="/mahapatra.png" alt="Maha Patra" className="w-15 h-15 rounded-full" />
              <div className="text-left">
                <div className="font-semibold text-foreground">Maha Patra</div>
                <div className="text-muted-foreground">OOPs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Ready to start your coding adventure?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join millions of learners and start building your programming skills today. It's free to get started!
            </p>
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              Start Learning Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">CodeDuo</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making coding education accessible, fun, and effective for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Courses</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>JavaScript</li>
                <li>Python</li>
                <li>Java</li>
                <li>C++</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Community</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 CodeDuo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
