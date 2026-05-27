import { FaStar, FaRegCirclePlay, FaCircleQuestion } from "react-icons/fa6";
import { motion } from "framer-motion";

// Importation de ton image (à adapter selon ton arborescence exacte)
import baobabBg from "../../assets/alle_de_baobab.png";

const Hero = () => {
  // Variantes pour un effet de cascade propre (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  return (
    <header
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-cover bg-center bg-no-repeat bg-fixed select-none"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 40%, rgba(15, 23, 42, 0.6) 100%), url(${baobabBg})`,
      }}
    >
      {/* Conteneur principal animé en cascade */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8"
      >
        {/* Petit Badge du dessus */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs md:text-sm font-semibold tracking-wider text-amber-400 uppercase"
        >
          <FaStar className="animate-pulse" />
          <span>MadaKo'IS ? — Édition Culture</span>
          <FaStar className="animate-pulse" />
        </motion.div>

        {/* Titre Principal */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Connaissez-vous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 drop-shadow-sm">
              réellement Madagascar ?
            </span>
          </h1>
        </motion.div>

        {/* Description / Sous-titre */}
        <motion.div variants={itemVariants} className="max-w-2xl">
          <p className="text-base md:text-lg text-slate-200 font-medium leading-relaxed drop-shadow-sm">
            Évaluez vos connaissances et explorez la richesse de la Grande Île
            🇲🇬 à travers un quiz fun, instructif et immersif. Relevez le défi
            dès maintenant !
          </p>
        </motion.div>

        {/* Boutons d'action (CTA) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
        >
          {/* Bouton Jouer */}
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/commencer-un-quiz"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm tracking-wide rounded-full shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 transition-all duration-200"
          >
            <FaRegCirclePlay className="text-lg group-hover:rotate-12 transition-transform" />
            <span>Démarrer une partie</span>
          </motion.a>

          {/* Bouton Comment Jouer */}
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm tracking-wide rounded-full transition-all duration-200"
          >
            <FaCircleQuestion className="text-lg text-amber-400" />
            <span>Comment jouer ?</span>
          </motion.button>
        </motion.div>
      </motion.div>
      {/* Ombre douce sombre et naturelle */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent pointer-events-none" />
    </header>
  );
};

export default Hero;
