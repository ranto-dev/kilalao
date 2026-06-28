import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import KilalaoLogo from "../assets/kilalao-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le sous-menu desktop si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const MENU_LINK = [
    {
      url: "accueil",
      link: "Accueil",
    },
    {
      url: "a-propos",
      link: "A propos",
    },
    {
      url: "faq",
      link: "FAQ",
    },
    {
      url: "contact",
      link: "Contact",
    },
  ];

  return (
    <header className="fixed top-0 left-0 z-100 w-full transition-all duration-300 bg-white border-none shadow-lg h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <a href="/" className="text-xs font-semibold tracking-wide">
          <img className="w-25" src={KilalaoLogo} alt="logo image" />
        </a>

        <nav className="hidden md:flex items-center space-x-7">
          {MENU_LINK.map((menu, index) => {
            return (
              <a
                key={index}
                href={`#${menu.url}`}
                className="text-xs font-semibold tracking-wide text-black hover:text-amber-400 transition-colors py-2"
              >
                {menu.link}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center">
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/commencer-un-quiz"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-xs tracking-wide rounded-full shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 transition-all ease-in duration-50"
          >
            <span>Commencer maintenant</span>
          </motion.a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-700 hover:text-indigo-600 transition-colors p-2 outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg md:hidden z-50 max-h-[85vh] overflow-y-auto"
          >
            <nav className="flex flex-col p-6 space-y-2">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors py-2 border-b border-slate-50"
              >
                Accueil
              </a>
              <a
                href="/a-propos"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors py-2 border-b border-slate-50"
              >
                À Propos
              </a>

              {/* SECTION ACCORDÉON SERVICES MOBILE */}
              <div className="py-2 border-b border-slate-50">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center justify-between py-1 outline-none"
                >
                  <span>Nos Services</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isServicesOpen ? "rotate-180 text-indigo-600" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-3 mt-2 space-y-1 bg-slate-50/50 rounded-xl"
                    >
                      {servicesItems.map((service) => (
                        <a
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => {
                            setIsOpen(false);
                            setIsServicesOpen(false);
                          }}
                          className="flex items-center gap-2.5 py-2.5 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                          <span className="text-slate-400 shrink-0">
                            {service.icon}
                          </span>
                          <span>{service.title}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="/reservation"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors py-2 border-b border-slate-50"
              >
                Réservation
              </a>
              <a
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors py-2"
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
