import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import KilalaoLogo from "../assets/kilalao-logo.png";
import startSound from "../assets/music/commencerMusic.mp3";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const audioRef = useRef(new Audio(startSound));

  const MENU_LINK = [
    { url: "accueil", link: "Accueil" },
    { url: "a-propos", link: "À propos" },
    { url: "faq", link: "FAQ" },
    { url: "contact", link: "Contact" },
  ];

  const handleStartGameSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0.4;

    audioRef.current.play().catch((err) => {
      console.log("Audio bloqué ou introuvable", err);
    });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-16 bg-white shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-full items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="text-xs font-semibold tracking-wide">
          <img className="w-24 md:w-28" src={KilalaoLogo} alt="Kilalao Logo" />
        </a>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-7">
          {MENU_LINK.map((menu) => (
            <a
              key={menu.url}
              href={`#${menu.url}`}
              className="py-2 text-xs font-semibold tracking-wide text-black transition-colors hover:text-amber-500"
            >
              {menu.link}
            </a>
          ))}
        </nav>

        {/* Bouton Desktop */}
        <div className="hidden md:flex items-center">
          <motion.a
            href="/commencer-un-quiz"
            onClick={handleStartGameSound}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2 text-xs font-semibold tracking-wide text-white shadow-lg shadow-amber-600/30 transition-all hover:shadow-amber-500/40"
          >
            Commencer maintenant
          </motion.a>
        </div>

        {/* Burger Mobile */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer p-2 text-slate-700 transition-colors hover:text-amber-600 md:hidden"
          aria-label="Ouvrir le menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-50 w-full border-b border-slate-100 bg-white shadow-lg md:hidden"
          >
            <nav className="flex flex-col space-y-2 p-6">
              {MENU_LINK.map((menu) => (
                <a
                  key={menu.url}
                  href={`#${menu.url}`}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-slate-100 py-3 text-center text-xs font-bold text-slate-700 transition-colors hover:text-amber-600"
                >
                  {menu.link}
                </a>
              ))}

              <motion.a
                href="/commencer-un-quiz"
                onClick={() => {
                  handleStartGameSound();
                  setIsOpen(false);
                }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-lg shadow-amber-600/30"
              >
                Commencer maintenant
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
