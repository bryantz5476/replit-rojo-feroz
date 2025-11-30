import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Scissors } from "lucide-react";

const navLinks = [
  { name: "Servicios", href: "#servicios" },
  { name: "Galería", href: "#galeria" },
  { name: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
  );

  const headerBackdrop = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBg,
          backdropFilter: headerBackdrop,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "border-b border-white/10" : ""
        }`}
        data-testid="header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
              data-testid="link-logo"
            >
              <Scissors className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl text-white tracking-wider">ELITE</span>
            </motion.a>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/70 hover:text-white transition-colors font-medium text-sm tracking-wide uppercase"
                  data-testid={`link-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a href="" data-testid="link-agendar-header">
                  <Button
                    className="font-display tracking-wider bg-primary hover:bg-primary/90 text-white"
                    data-testid="button-agendar-header"
                  >
                    AGENDAR CITA
                  </Button>
                </a>
              </motion.div>
            </nav>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(true)}
              data-testid="button-mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-black md:hidden"
        data-testid="mobile-menu"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <Scissors className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl text-white tracking-wider">ELITE</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="button-close-mobile-menu"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="text-left font-display text-4xl text-white tracking-wide hover:text-primary transition-colors"
                data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </motion.button>
            ))}
          </nav>

          <div className="mt-auto">
            <a href="" onClick={() => setIsMobileMenuOpen(false)} data-testid="link-agendar-mobile">
              <Button
                size="lg"
                className="w-full font-display text-xl tracking-wider py-6 bg-primary hover:bg-primary/90 text-white"
                data-testid="button-agendar-mobile"
              >
                AGENDAR CITA
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
