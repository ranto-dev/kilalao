import { useEffect, useRef } from "react";
import About from "../components/About";
import FAQ from "../components/FAQ";
import FeedbackForm from "../components/FeedbackForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";

// Import de la musique uniquement ici
import backgroundMusic from "../assets/music/track4.m4a";

interface HomeProps {
  isGlobalMuted: boolean;
}

export default function Home({ isGlobalMuted }: HomeProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Initialisation de la musique au chargement de Home
  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 0.2;
    audio.muted = isGlobalMuted; // Applique l'état initial
    audioRef.current = audio;

    const playAudio = () => {
      audio.play().catch(() => {
        console.log("Autoplay bloqué par le navigateur sur Home.");
      });
    };

    playAudio();

    // Interaction utilisateur globale pour démarrer si bloqué
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused && !isGlobalMuted) {
        audioRef.current.play().catch((err: unknown) => console.log(err));
      }
      document.removeEventListener("click", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);

    // NETTOYAGE CRUCIAL : Se coupe dès qu'on change de page
    return () => {
      audio.pause();
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  // 2. Synchronisation de la musique si on clique sur le bouton Mute global
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isGlobalMuted;
      if (!isGlobalMuted && audioRef.current.paused) {
        audioRef.current.play().catch((err: unknown) => console.log(err));
      }
    }
  }, [isGlobalMuted]);

  return (
    <div className="relative">
      <Header />
      <Hero />
      <About />
      <FAQ />
      <Testimonials />
      <FeedbackForm />
      <Footer />
    </div>
  );
}
