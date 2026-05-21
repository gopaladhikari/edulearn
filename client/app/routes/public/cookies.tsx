import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export function meta() {
  return [
    {
      title: "Cookie Policy - Edulearn",
    },
    {
      name: "description",
      content:
        "Learn how to build a cookie policy page with Next.js and Tailwind CSS.",
    },
  ];
}

export default function CookiesPage() {
  return (
    <>
      <section className="bg-linear-to-br from-primary/5 to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Cookie Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none space-y-8">
            {/* What Are Cookies */}
            <Card className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                What Are Cookies?
              </h2>
              <p className="mb-4 text-foreground">
                Cookies are small text files that are stored on your device
                (computer, tablet, or phone) when you visit our website. They
                help us remember information about your visit, such as your
                preferred language, your login information, and your browsing
                preferences.
              </p>
            </Card>

            {/* How We Use Cookies */}
            <Card className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                How We Use Cookies
              </h2>
              <p className="mb-6 text-foreground">
                Edulearn uses cookies for various purposes:
              </p>
              <ul className="list-inside list-disc space-y-3 text-foreground">
                <li>
                  <strong>Authentication:</strong> To keep you logged in to your
                  account
                </li>
                <li>
                  <strong>Preferences:</strong> To remember your language and
                  display preferences
                </li>
                <li>
                  <strong>Analytics:</strong> To understand how visitors use our
                  site
                </li>
                <li>
                  <strong>Performance:</strong> To optimize website speed and
                  functionality
                </li>
                <li>
                  <strong>Marketing:</strong> To show you relevant content and
                  advertisements
                </li>
                <li>
                  <strong>Security:</strong> To prevent fraud and protect your
                  account
                </li>
              </ul>
            </Card>

            {/* Types of Cookies */}
            <Card className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Types of Cookies We Use
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Essential Cookies
                  </h3>
                  <p className="text-foreground">
                    These cookies are necessary for the website to function
                    properly. They enable you to navigate the site and use its
                    features, such as accessing secure areas.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Performance Cookies
                  </h3>
                  <p className="text-foreground">
                    These cookies collect information about how you use our
                    website, such as which pages you visit most often. This
                    information helps us improve the site.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Functional Cookies
                  </h3>
                  <p className="text-foreground">
                    These cookies remember choices you make to provide
                    personalized features and enhanced functionality.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Targeting Cookies
                  </h3>
                  <p className="text-foreground">
                    These cookies are used to deliver advertisements relevant to
                    you and track the effectiveness of our advertising
                    campaigns.
                  </p>
                </div>
              </div>
            </Card>

            {/* Cookie Duration */}
            <Card className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Cookie Duration
              </h2>
              <ul className="list-inside list-disc space-y-3 text-foreground">
                <li>
                  <strong>Session Cookies:</strong> These cookies are deleted
                  when you close your browser
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> These cookies remain on
                  your device for a specified period or until you delete them
                  manually
                </li>
              </ul>
            </Card>

            {/* Your Cookie Choices */}
            <Card className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Your Cookie Choices
              </h2>
              <p className="mb-4 text-foreground">
                You have the right to decide whether to accept or reject
                cookies. Most web browsers allow you to control cookies through
                their settings preferences. You can:
              </p>
              <ul className="list-inside list-disc space-y-3 text-foreground">
                <li>Refuse to accept cookies</li>
                <li>Delete cookies from your device</li>
                <li>
                  Set your browser to notify you when cookies are being sent
                </li>
              </ul>
              <p className="mt-4 text-foreground">
                Please note that disabling cookies may affect the functionality
                of some features on our website.
              </p>
            </Card>

            {/* Third Party Cookies */}
            <Card className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Third-Party Cookies
              </h2>
              <p className="text-foreground">
                Our website may contain links to other websites. We are not
                responsible for the cookie policies of third-party websites. We
                recommend reviewing their privacy and cookie policies before
                using their services.
              </p>
            </Card>

            {/* Contact */}
            <Card className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Contact Us
              </h2>
              <p className="mb-4 text-foreground">
                If you have any questions about our cookie policy or how we
                handle cookies, please contact us:
              </p>
              <ul className="list-inside list-disc space-y-2 text-foreground">
                <li>Email: privacy@edulearn.com</li>
                <li>Address: 123 Learning Street, New York, NY 10001</li>
              </ul>
            </Card>

            {/* Footer Actions */}
            <div className="flex gap-4 pt-8">
              <Link to="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Back to Home
                </Button>
              </Link>
              <Link to="/privacy-policy">
                <Button variant="outline">Privacy Policy</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
