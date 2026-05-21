import {
  BookOpen,
  Users,
  TrendingUp,
  Globe,
  Award,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Settings,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export function meta() {
  return [
    { title: "Teaching - Edulearn" },
    { name: "description", content: "Teaching with Edulearn" },
  ];
}

export default function TeachingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-lienar-to-br from-primary/10 via-accent/10 to-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="mb-6 text-5xl leading-tight font-bold text-foreground md:text-6xl">
                Come teach with Edulearn
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
                Turn your expertise into an online course. Teach students around
                the world and earn money doing what you love.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/become-instructor"
                  className={cn(
                    buttonVariants(),
                    "h-12 bg-primary px-8 text-lg text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  Start teaching
                </Link>
                <Button variant="outline" className="h-12 px-8 text-lg">
                  Learn more
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 p-12 text-center">
                <Play className="mx-auto mb-8 h-32 w-32 text-primary/40" />
                <p className="text-lg text-muted-foreground">
                  Watch how instructors create courses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Teach Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-foreground md:text-5xl">
            Why teach on Edulearn?
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-xl text-muted-foreground">
            Reach and inspire students around the world. Share your knowledge
            and passion while building a rewarding career.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Reason 1 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Reach global students
              </h3>
              <p className="text-muted-foreground">
                Connect with millions of learners from over 180 countries around
                the world.
              </p>
            </Card>

            {/* Reason 2 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-7 w-7 text-accent" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Earn money
              </h3>
              <p className="text-muted-foreground">
                Build a sustainable income stream from course enrollments, with
                competitive revenue sharing.
              </p>
            </Card>

            {/* Reason 3 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Build your brand
              </h3>
              <p className="text-muted-foreground">
                Establish yourself as an expert in your field and grow your
                professional reputation.
              </p>
            </Card>

            {/* Reason 4 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                <Award className="h-7 w-7 text-accent" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Make an impact
              </h3>
              <p className="text-muted-foreground">
                Help students achieve their goals, advance their careers, and
                improve their lives.
              </p>
            </Card>

            {/* Reason 5 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Learn continuously
              </h3>
              <p className="text-muted-foreground">
                Access teaching resources and stay updated with industry best
                practices and tools.
              </p>
            </Card>

            {/* Reason 6 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                <BookOpen className="h-7 w-7 text-accent" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Teach your way
              </h3>
              <p className="text-muted-foreground">
                Creative freedom to structure your courses and teaching style
                however you prefer.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-foreground md:text-5xl">
            What you get as an instructor
          </h2>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Professional course builder
                  </h4>
                  <p className="text-muted-foreground">
                    Easy-to-use tools to create engaging video courses with
                    multimedia content.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Student analytics
                  </h4>
                  <p className="text-muted-foreground">
                    Track student progress, engagement, and completion rates
                    with detailed insights.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Messaging system
                  </h4>
                  <p className="text-muted-foreground">
                    Communicate directly with students to provide support and
                    build community.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Promotional tools
                  </h4>
                  <p className="text-muted-foreground">
                    Built-in marketing tools and promotional features to help
                    grow your student base.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Flexible pricing
                  </h4>
                  <p className="text-muted-foreground">
                    Set your own course prices and use discounts to attract more
                    students.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Instructor resources
                  </h4>
                  <p className="text-muted-foreground">
                    Access guides, templates, and best practices to help you
                    succeed.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Community support
                  </h4>
                  <p className="text-muted-foreground">
                    Join a community of instructors and get help from the
                    Edulearn support team.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    Certification badge
                  </h4>
                  <p className="text-muted-foreground">
                    Verified instructor badge to build credibility and trust
                    with students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Begin Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-foreground md:text-5xl">
            How to begin teaching
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-xl text-muted-foreground">
            Get started in just a few steps and start making your impact on
            learners worldwide.
          </p>

          <div className="grid gap-8 md:grid-cols-4">
            {/* Step 1 */}
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-foreground">
                Create account
              </h3>
              <p className="text-center text-muted-foreground">
                Sign up for a free Edulearn instructor account and complete your
                profile.
              </p>
              {/* Arrow */}
              <div className="absolute top-8 -right-5 hidden md:flex">
                <ArrowRight className="h-5 w-5 text-border" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-foreground">
                Plan your course
              </h3>
              <p className="text-center text-muted-foreground">
                Outline your curriculum, create course materials, and structure
                your lessons.
              </p>
              {/* Arrow */}
              <div className="absolute top-8 -right-5 hidden md:flex">
                <ArrowRight className="h-5 w-5 text-border" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-foreground">
                Create & upload
              </h3>
              <p className="text-center text-muted-foreground">
                Record videos, upload materials, and build your complete course
                on our platform.
              </p>
              {/* Arrow */}
              <div className="absolute top-8 -right-5 hidden md:flex">
                <ArrowRight className="h-5 w-5 text-border" />
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <span className="text-2xl font-bold text-accent">4</span>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-foreground">
                Publish & earn
              </h3>
              <p className="text-center text-muted-foreground">
                Launch your course, promote it, and start earning from student
                enrollments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Features Section */}
      <section className="bg-muted/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-foreground md:text-5xl">
            Teaching tools made easy
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Tool 1 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <Play className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Video lecture tools
              </h3>
              <p className="mb-4 text-muted-foreground">
                Upload video lectures, add captions, and create engaging
                multimedia content.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Multi-format support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Auto captions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Playback controls
                </li>
              </ul>
            </Card>

            {/* Tool 2 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <Settings className="mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Course management
              </h3>
              <p className="mb-4 text-muted-foreground">
                Organize your course materials, manage assignments, and track
                submissions.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Drag-and-drop builder
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Quizzes & tests
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Resource library
                </li>
              </ul>
            </Card>

            {/* Tool 3 */}
            <Card className="p-8 transition-shadow hover:shadow-lg">
              <BarChart3 className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Student analytics
              </h3>
              <p className="mb-4 text-muted-foreground">
                Get detailed insights into student progress, engagement, and
                satisfaction.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Engagement metrics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Completion rates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Student feedback
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-primary/10 to-accent/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
            Ready to start teaching?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Join thousands of instructors making a difference and earning income
            on Edulearn.
          </p>
          <Link to="/register">
            <Button className="h-12 bg-primary px-10 text-lg text-primary-foreground hover:bg-primary/90">
              Get started today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
