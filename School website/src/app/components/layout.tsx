import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, UserCircle, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import logoImg from "@/assets/images/logo.png";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "News & Events", path: "/news-events" },
    { name: "Academics", path: "/academics" },
    { name: "Apply Now", path: "/apply" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-50 shadow-sm dark:shadow-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoImg}
                alt="Jericho School"
                className="h-14 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors duration-300 ${isActive(link.path)
                    ? "text-blue-900 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400"
                    } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-900 dark:after:bg-blue-400 after:transition-all after:duration-300 ${isActive(link.path) ? "after:w-full" : "after:w-0 hover:after:w-full"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>


            </nav>

            {/* Mobile Menu Button + Theme Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="theme-toggle p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-yellow-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 dark:text-gray-200" />
                ) : (
                  <Menu className="h-6 w-6 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors duration-300 pl-2 border-l-2 ${isActive(link.path)
                    ? "text-blue-900 dark:text-blue-400 font-medium border-blue-900 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 border-transparent"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Google Maps Section */}
      <section className="bg-blue-900 dark:bg-slate-800 py-6 sm:py-8 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl text-center text-white mb-4 sm:mb-6">Find Us</h2>
          <div className="relative w-full h-0 pb-[56.25%] sm:pb-[50%] md:pb-[40%] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.7414589226737!2d30.040692900000003!3d-2.0113095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dcafbaba9b1f5b%3A0x27ba1547729b8325!2sJERICHO%20SCHOOL!5e1!3m2!1sen!2srw!4v1773643346394!5m2!1sen!2srw"
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jericho School Location"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="Jericho School" className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 text-sm">
                Competence & Dignity
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/academics"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Academics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Jericho School</li>
                <li>Phone: (+250) 788 490 200</li>
                <li>Phone: (+250) 788 695 562</li>
                <li>Phone: (+250) 788 622 914</li>
                <li>Email: jerichoschoolweb@gmail.com</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Hours</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
                <li>Saturday: 9:00 AM - 1:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
            <p>© 2026 Jericho School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}