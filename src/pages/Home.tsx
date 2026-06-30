import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import About from "../components/About";
import FAQ from "../components/FAQ";
import FeedbackForm from "../components/FeedbackForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";

interface HomeProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function Home({ audioRef }: HomeProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Synchronise l'état du bouton avec la réalité de l'audio au montage
      setIsMuted(audio.muted);
      setIsPlaying(!audio.paused);

      // Met à jour l'état si l'audio commence à jouer en arrière-plan
      const handlePlayStatus = () => setIsPlaying(true);
      audio.addEventListener("play", handlePlayStatus);

      return () => audio.removeEventListener("play", handlePlayStatus);
    }
  }, [audioRef]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          audio.muted = false;
        })
        .catch((err) => console.error(err));
    } else {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  return (
    <div className="relative">
      <Header />
      <Hero />
      <About />
      <FAQ />
      <Testimonials />
      <FeedbackForm />
      <Footer />

      {/* Bouton de contrôle Audio Flottant */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className={`p-3.5 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer ${
            isMuted || !isPlaying
              ? "bg-slate-900/90 text-white border-slate-800"
              : "bg-white/90 text-amber-600 border-amber-200 shadow-amber-500/10"
          }`}
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
          <AnimatePresence mode="wait">
            {isMuted || !isPlaying ? (
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
    </div>
  );
}
