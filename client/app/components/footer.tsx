import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="mt-20 bg-foreground text-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
                E
              </div>
              <span className="text-xl font-bold text-card">Edulearn</span>
            </div>
            <p className="text-sm text-card/70">
              Transform your learning journey with quality education.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-card">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold text-card">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact-us"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-card">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-card/70 transition-colors hover:text-card"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-card/20 pt-8 md:flex-row">
          <p className="text-sm text-card/60">
            © 2026 Edulearn. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link
              to="#"
              className="text-sm text-card/60 transition-colors hover:text-card"
            >
              Twitter
            </Link>
            <Link
              to="#"
              className="text-sm text-card/60 transition-colors hover:text-card"
            >
              LinkedIn
            </Link>
            <Link
              to="#"
              className="text-sm text-card/60 transition-colors hover:text-card"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
