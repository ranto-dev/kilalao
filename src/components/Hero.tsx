import { FaRegCirclePlay, FaCircleQuestion } from "react-icons/fa6";
import { motion } from "framer-motion";
import baobabBg from "../assets/alle_de_baobab.png";
import { containerVariants, itemVariants } from "../@types/variants";

const Hero = () => {
  return (
    <header
      id="accueil"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-cover bg-center bg-no-repeat bg-fixed select-none"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 40%, rgba(15, 23, 42, 0.6) 100%), url(${baobabBg})`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Connaissez-vous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 drop-shadow-sm">
              réellement Madagascar ?
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-2xl">
          <p className="text-base md:text-lg text-slate-200 font-medium leading-relaxed drop-shadow-sm">
            Testez vos connaissances, découvrez des anecdotes fascinantes et
            voyagez à travers la culture, l'histoire, la nature et les
            traditions de la Grande Île grâce à une expérience ludique et
            interactive.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/commencer-un-quiz"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm tracking-wide rounded-full shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 transition-all ease-in duration-50"
          >
            <FaRegCirclePlay className="text-lg" />
            <span>Lancer le Quiz</span>
          </motion.a>

          <motion.a
            href="#faq"
            whileHover={{
              scale: 1.05,
              y: -2,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm tracking-wide rounded-full transition-all ease-in duration-50"
          >
            <FaCircleQuestion className="text-lg text-amber-400" />
            <span>En savoir plus</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent pointer-events-none" />
    </header>
  );
};

export default Hero;
