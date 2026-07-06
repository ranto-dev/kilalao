import { useState, useEffect, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { reviews } from "../data/testimonials";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalReviews = reviews.length;

  // Détection adaptative Mobile vs Desktop compatible SSR / Single Page App
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Exécution initiale
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const maxIndex = isMobile ? totalReviews - 1 : totalReviews - 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  // Effet de défilement automatique (Autoplay)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, maxIndex]);

  // TYPAGE STRICT ICI : Utilisation de PanInfo exporté par framer-motion
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50; // Sensibilité du glissement
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section
      id="testimonials"
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50/50 px-4 py-24 overflow-hidden select-none"
    >
      {/* Fond décoratif premium */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-14">
        {/* En-tête de section */}
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-50 to-amber-100/80 border border-amber-200 text-[10px] font-black text-amber-800 w-fit uppercase tracking-widest rounded-full shadow-sm">
            ⭐️ La communauté s'exprime
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Ils explorent Madagascar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 drop-shadow-sm">
              grâce à Kilalao
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-md leading-relaxed">
            Découvrez les retours d'expérience de ceux qui relèvent nos défis,
            apprennent et partagent notre culture.
          </p>
        </div>

        {/* Zone Carrousel interactive */}
        <div
          className="relative w-full px-2 py-4 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={containerRef}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${currentIndex * (isMobile ? 100 : 100 / 3)}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 22 }}
            className="flex gap-6 w-full"
            style={{ width: isMobile ? `${totalReviews * 100}%` : "100%" }}
          >
            {reviews.map((user, index) => {
              const isActive =
                index >= currentIndex &&
                index < currentIndex + (isMobile ? 1 : 3);

              return (
                <motion.div
                  key={user.id}
                  animate={{
                    scale: isActive ? 1 : 0.96,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-full shrink-0"
                  style={{
                    width: isMobile
                      ? `${100 / totalReviews}%`
                      : "calc(33.333% - 16px)",
                  }}
                >
                  <div className="relative h-full flex flex-col justify-between p-6 md:p-8 bg-white/80 backdrop-blur-md border border-slate-100 hover:border-amber-300 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-amber-500/[0.05] transition-all duration-300 group overflow-hidden">
                    {/* Icône de citation géante */}
                    <FaQuoteLeft className="absolute -top-3 -right-3 text-7xl text-slate-100/70 group-hover:text-amber-100/50 group-hover:scale-110 transition-all duration-500 pointer-events-none z-0" />

                    <div className="relative z-10 flex flex-col gap-4">
                      {/* Étoiles */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-sm transition-colors duration-200 ${
                              i < user.rating
                                ? "text-amber-500 drop-shadow-[0_1.5px_3px_rgba(245,158,11,0.3)]"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Commentaire */}
                      <p className="text-sm md:text-[15px] text-slate-600 font-medium leading-relaxed italic">
                        "{user.comment}"
                      </p>
                    </div>

                    {/* Profil */}
                    <div className="relative z-10 flex items-center gap-4 border-t border-dashed border-slate-100 group-hover:border-amber-200/60 mt-6 pt-5 transition-colors duration-300">
                      <div className="relative shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 group-hover:border-amber-500 shadow-sm transition-all duration-300"
                        />
                        <div
                          className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
                          title="Bêta-testeur vérifié"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-sm md:text-base text-slate-900 tracking-tight group-hover:text-amber-900 transition-colors duration-300">
                          {user.name}
                        </h4>
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Barre de navigation */}
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="flex gap-1.5 items-center">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index
                    ? "w-8 bg-amber-500"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full border border-slate-200 hover:border-amber-500 text-slate-500 hover:text-amber-600 bg-white shadow-sm active:scale-95 transition-all cursor-pointer"
              aria-label="Previous testimonials"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full border border-slate-200 hover:border-amber-500 text-slate-500 hover:text-amber-600 bg-white shadow-sm active:scale-95 transition-all cursor-pointer"
              aria-label="Next testimonials"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
