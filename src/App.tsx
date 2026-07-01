import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import QuizzBody from "./pages/QuizPage";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      // On passe l'état mute à la page Home
      element: <Home isGlobalMuted={isMuted} />,
    },
    {
      path: "/commencer-un-quiz",
      // On passe l'état mute à la page de Quiz
      element: <QuizzBody isGlobalMuted={isMuted} />,
    },
  ]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <RouterProvider router={router} />

          {/* Bouton de contrôle Audio Flottant Global */}
          <div className="fixed bottom-6 right-6 z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className={`p-3.5 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isMuted
                  ? "bg-slate-900/90 text-white border-slate-800"
                  : "bg-white/90 text-amber-600 border-amber-200 shadow-amber-500/10"
              }`}
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              <AnimatePresence mode="wait">
                {isMuted ? (
                  <motion.div
                    key="muted"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <VolumeX size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="playing"
                    initial={{ opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Volume2 size={18} className="animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </>
      )}
    </>
  );
}
