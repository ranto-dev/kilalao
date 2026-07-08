import { useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { reviews } from "../data/testimonials";

export default function Testimonials() {
  const cloneCount = 3;

  // Duplication pour l'effet de boucle infinie
  const slides = [
    ...reviews.slice(-cloneCount),
    ...reviews,
    ...reviews.slice(0, cloneCount),
  ];

  const [index, setIndex] = useState(cloneCount);
  const [visible, setVisible] = useState(3);
  const [transition, setTransition] = useState(true);
  const [hover, setHover] = useState(false);

  // Gestion responsive synchronisée avec les breakpoints Tailwind
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 640)
        setVisible(1); // Mobile : 1 carte
      else if (window.innerWidth < 1024)
        setVisible(2); // Tablette : 2 cartes
      else setVisible(3); // Desktop : 3 cartes
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const next = () => {
    setTransition(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setTransition(true);
    setIndex((prev) => prev - 1);
  };

  // Autoplay automatique
  useEffect(() => {
    if (hover) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [hover]);

  // Reset de la position sans effet visuel pour la boucle infinie
  useEffect(() => {
    if (index === reviews.length + cloneCount) {
      setTimeout(() => {
        setTransition(false);
        setIndex(cloneCount);
      }, 500); // Correspond à la durée de la transition (0.5s)
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(reviews.length);
      }, 500);
    }
  }, [index]);

  const dragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -50) next();
    if (info.offset.x > 50) prev();
  };

  // Calcul dynamique de l'index du point (dot) actif
  const activeDotIndex = (index - cloneCount + reviews.length) % reviews.length;

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-slate-50/50 select-none">
      {/* Fond décoratif discret */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* EN-TÊTE */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 text-[10px] font-black text-amber-800 uppercase tracking-widest rounded-full shadow-sm">
            ⭐️ Témoignages
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Ils explorent Madagascar{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 drop-shadow-sm">
              grâce à Kilalao
            </span>
          </h2>
        </div>

        {/* CONTENEUR CARROUSEL */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing py-4"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={dragEnd}
            animate={{ x: `-${(index * 100) / visible}%` }}
            transition={
              transition
                ? { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
                : { duration: 0 }
            }
            className="flex"
          >
            {slides.map((user, i) => (
              <div
                key={`${user.id}-${i}`}
                className="flex-none px-3"
                style={{ width: `${100 / visible}%` }} // Largeur mathématique absolue
              >
                <div className="relative h-full min-h-[320px] bg-white border border-slate-100 hover:border-amber-200/80 rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] hover:shadow-xl hover:shadow-amber-500/[0.02] transition-all duration-300 flex flex-col justify-between group overflow-hidden">
                  {/* Icône de citation en arrière-plan */}
                  <FaQuoteLeft className="absolute -top-2 -right-2 text-7xl text-slate-50 group-hover:text-amber-50/50 transition-colors duration-300 pointer-events-none z-0" />

                  <div className="relative z-10">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <FaStar
                          key={star}
                          className={`text-sm ${
                            star < user.rating
                              ? "text-amber-500 drop-shadow-sm"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-slate-600 text-sm md:text-[15px] font-medium italic leading-relaxed">
                      "{user.comment}"
                    </p>
                  </div>

                  {/* Profil de l'utilisateur (Point en ligne supprimé) */}
                  <div className="relative z-10 flex items-center gap-4 border-t border-dashed border-slate-100 pt-5 mt-6">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-100"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {user.name}
                      </h4>
                      <p className="text-[10px] uppercase font-black text-amber-600 tracking-wider truncate">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* NAVIGATION & DOTS */}
        <div className="flex justify-between items-center mt-6 px-2">
          {/* Points de navigation */}
          <div className="flex gap-2 items-center">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setTransition(true);
                  setIndex(i + cloneCount);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDotIndex === i
                    ? "w-6 bg-amber-500"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Aller au témoignage ${i + 1}`}
              />
            ))}
          </div>

          {/* Boutons Flèches */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-600 active:scale-95 transition-all shadow-sm cursor-pointer"
              aria-label="Précédent"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-600 active:scale-95 transition-all shadow-sm cursor-pointer"
              aria-label="Suivant"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
