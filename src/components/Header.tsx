import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Trophy, BookOpen, Sparkles } from "lucide-react"; // Import des icônes pour les services
import { motion, AnimatePresence } from "framer-motion";
import KilalaoLogo from "../assets/kilalao-logo.png";
import startSound from "../assets/music/commencerMusic.mp3";

// Interface pour typer proprement tes services
interface ServiceItem {
  slug: string;
  title: string;
  icon: React.ReactNode;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Définition de servicesItems qui manquait à ton code
  const servicesItems: ServiceItem[] = [
    { slug: "quiz-solo", title: "Mode Solo", icon: <BookOpen size={14} /> },
    { slug: "classement", title: "Classement", icon: <Trophy size={14} /> },
    { slug: "multijoueur", title: "Défis Amis", icon: <Sparkles size={14} /> },
  ];

  // Fermer le sous-menu si on clique en dehors
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
    { url: "accueil", link: "Accueil" },
    { url: "a-propos", link: "À propos" },
    { url: "faq", link: "FAQ" },
    { url: "contact", link: "Contact" },
  ];

  // CORRECTION ICI : Retrait du paramètre 'e' non utilisé
  const handleStartGameSound = () => {
    const audio = new Audio(startSound);
    audio.volume = 0.4;
    audio
      .play()
      .catch((err) => console.log("Audio bloqué ou introuvable", err));
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300 bg-white border-none shadow-lg h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <a href="/" className="text-xs font-semibold tracking-wide">
          <img className="w-25" src={KilalaoLogo} alt="logo image" />
        </a>

        {/* Menu Desktop */}
        <nav
          className="hidden md:flex items-center space-x-7"
          ref={dropdownRef}
        >
          {MENU_LINK.map((menu, index) => (
            <a
              key={index}
              href={`#${menu.url}`}
              className="text-xs font-semibold tracking-wide text-black hover:text-amber-500 transition-colors py-2"
            >
              {menu.link}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/commencer-un-quiz"
            onClick={handleStartGameSound}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-xs tracking-wide rounded-full shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 transition-all ease-in duration-50"
          >
            <span>Commencer maintenant</span>
          </motion.a>
        </div>

        {/* Bouton Burger Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-700 hover:text-amber-600 transition-colors p-2 outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg md:hidden z-50 max-h-[85vh] overflow-y-auto"
          >
            <nav className="flex flex-col p-6 space-y-2">
              {/* Liens dynamiques basés sur ton MENU_LINK */}
              {MENU_LINK.map((menu, index) => (
                <a
                  key={index}
                  href={`#${menu.url}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-center text-slate-700 hover:text-amber-600 transition-colors py-2 border-b border-slate-50"
                >
                  {menu.link}
                </a>
              ))}

              <a
                href="/commencer-un-quiz"
                onClick={handleStartGameSound}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-xs tracking-wide rounded-full shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 transition-all ease-in duration-50"
              >
                <span>Commencer maintenant</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
