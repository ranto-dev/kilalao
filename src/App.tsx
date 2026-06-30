import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import QuizzBody from "./pages/QuizPage";
import { useState, useEffect, useRef } from "react";
import Loading from "./components/Loading";

import backgroundMusic from "./assets/music/track4.m4a";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Gestion du minuteur de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Déclenchement AUTOMATIQUE dès que le chargement se termine
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.15; // Volume doux en fond

    // Dès que isLoading passe à false, on force l'audio à démarrer
    if (!isLoading) {
      audio
        .play()
        .then(() => {
          console.log(
            "Le chargement est fini : Musique lancée automatiquement !",
          );
        })
        .catch((err) => {
          console.warn(
            "Le navigateur a bloqué l'audio 100% automatique. En attente du premier clic.",
            err,
          );
        });
    }
  }, [isLoading]); // S'exécute immédiatement quand l'état change !

  // 3. Écouteur de secours au cas où le navigateur est ultra-strict (ex: Safari iOS au premier démarrage)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleBackupInteraction = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => removeListeners())
          .catch((err) => console.log(err));
      } else {
        removeListeners();
      }
    };

    const interactions = ["click", "touchstart", "mousedown", "scroll"];

    const removeListeners = () => {
      interactions.forEach((event) =>
        document.removeEventListener(event, handleBackupInteraction),
      );
    };

    interactions.forEach((event) => {
      document.addEventListener(event, handleBackupInteraction, {
        passive: true,
      });
    });

    return () => removeListeners();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home audioRef={audioRef} />,
    },
    {
      path: "/commencer-un-quiz",
      element: <QuizzBody />,
    },
  ]);

  return (
    <>
      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        preload="auto"
        style={{ display: "none" }}
      />

      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </>
  );
}
