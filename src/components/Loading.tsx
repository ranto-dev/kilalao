import { motion } from "framer-motion";

const LoadingWhite = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-50 relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-300/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-emerald-300/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-24 h-1 bg-slate-200 rounded-full overflow-hidden mt-1">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-amber-500  rounded-full"
          />
        </div>

        <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mt-1">
          Chargement de l'aventure
        </p>
      </div>
    </div>
  );
};

export default LoadingWhite;
