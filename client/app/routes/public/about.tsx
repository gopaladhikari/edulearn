import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Award, Users, Target, Lightbulb, Zap, Globe } from "lucide-react";
import { Link } from "react-router";

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Active Learners", value: "500K+" },
    { icon: Globe, label: "Countries", value: "180+" },
    { icon: Award, label: "Courses", value: "5K+" },
    { icon: Zap, label: "Instructors", value: "2K+" },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly innovate to provide cutting-edge learning experiences.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We believe in building a supportive community of learners and educators.",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "We maintain high standards in content quality and student support.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Education should be accessible to everyone, everywhere.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 via-background to-accent/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-balance text-foreground md:text-6xl">
            Empowering Learners Worldwide
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            Edulearn is a leading online learning platform dedicated to
            providing quality education and empowering individuals to achieve
            their goals.
          </p>
          <Link to="/teaching">
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Become an Instructor
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mb-1 text-3xl font-bold text-foreground md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-4xl font-bold text-foreground">Our Story</h2>
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              Edulearn was founded with a simple but powerful vision: to make
              quality education accessible to everyone, regardless of their
              location or background. In 2020, our founders recognized the
              potential of online learning to transform education and created
              Edulearn to bridge the gap between aspiring learners and expert
              instructors.
            </p>
            <p>
              Today, Edulearn has grown into a vibrant community of over 500,000
              learners and 2,000 instructors from 180+ countries. We&apos;ve
              helped millions of individuals advance their careers, pursue new
              interests, and achieve their dreams through our diverse range of
              courses.
            </p>
            <p>
              Our platform focuses on practical, real-world skills that matter.
              From web development to data science, from digital marketing to
              personal development, Edulearn offers courses designed by industry
              experts and tailored to meet the needs of modern learners.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-linear-to-r from-primary/5 to-accent/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Card className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                Our Mission
              </h3>
              <p className="leading-relaxed text-foreground">
                To democratize education by providing affordable, high-quality
                learning experiences that empower individuals to transform their
                lives through skill development and knowledge acquisition.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                Our Vision
              </h3>
              <p className="leading-relaxed text-foreground">
                To be the world&apos;s leading online learning platform,
                fostering a global community of lifelong learners and educators
                who are committed to continuous growth and positive change.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-foreground">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-foreground">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alice Johnson",
                role: "CEO & Founder",
                bio: "Former software engineer with 15+ years of experience in tech education.",
              },
              {
                name: "Bob Smith",
                role: "CTO & Co-Founder",
                bio: "Tech innovator passionate about making education more accessible.",
              },
              {
                name: "Carol Williams",
                role: "Head of Education",
                bio: "Expert in curriculum design with experience from top universities.",
              },
            ].map((member) => (
              <Card key={member.name} className="p-8 text-center">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-linear-to-br from-primary to-accent" />
                <h3 className="mb-1 text-xl font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="mb-3 font-semibold text-primary">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-foreground">
            Join Our Community Today
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Start your learning journey with Edulearn and discover endless
            possibilities.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
