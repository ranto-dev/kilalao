import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRotateLeft,
  FaHouse,
  FaRegCircleCheck,
  FaStopwatch,
  FaArrowRight,
  FaTrophy,
  FaXmark,
  FaBookOpen,
  FaVolumeHigh,
} from "react-icons/fa6";

import tickTockSound from "../assets/music/stopwatch.m4a";
import correctSound from "../assets/music/successMusic.m4a";
import wrongSound from "../assets/music/failMusic.m4a";
import winFinalSound from "../assets/music/victory.m4a";
import loseFinalSound from "../assets/music/failMusic.m4a";

interface Quiz {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  reponses_propose: string[];
  response: string;
  explanation: string;
  source: { title: string; url: string };
}

interface QuizGameProps {
  quizzes: Quiz[];
  isGlobalMuted: boolean;
  onRefreshQuestions: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({
  quizzes,
  isGlobalMuted,
  onRefreshQuestions,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(15);
  const [quizFinished, setQuizFinished] = useState(false);

  const chronoAudioRef = useRef<HTMLAudioElement | null>(null);

  const currentQuestion =
    quizzes.length > 0 ? quizzes[currentQuestionIndex] : null;
  const totalQuestions = quizzes.length;
  const progressPercent =
    totalQuestions > 0 ? (currentQuestionIndex / totalQuestions) * 100 : 0;

  // SYSTEME DE LECTURE VOCALE AMÉLIORÉ
  const speakQuestion = (text: string) => {
    if (!("speechSynthesis" in window)) {
      console.warn("La synthèse vocale n'est pas supportée par ce navigateur.");
      return;
    }

    // Arrêter toute lecture en cours pour éviter les chevauchements
    window.speechSynthesis.cancel();

    // Ne rien faire si le mode muet est activé
    if (isGlobalMuted) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR"; // Configuration en Français
    utterance.rate = 1.0; // Vitesse normale
    utterance.pitch = 1.0; // Tonalité

    // Récupération dynamique et sécurisée des voix du système
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find(
      (voice) => voice.lang === "fr-FR" || voice.lang.startsWith("fr"),
    );

    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    utterance.onerror = (e) => {
      console.error("Erreur d'élocution Web Speech API:", e.error);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Écouteur obligatoire pour charger les voix système de manière asynchrone (Raison majeure du silence initial)
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const handleVoicesChanged = () => {
      window.speechSynthesis.getVoices();
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Lecture automatique de la question à chaque changement d'index
  useEffect(() => {
    if (currentQuestion && !quizFinished && !isGlobalMuted) {
      const voiceTimer = setTimeout(() => {
        speakQuestion(currentQuestion.question);
      }, 400); // Un léger délai permet à l'UI de respirer et d'activer l'audio
      return () => clearTimeout(voiceTimer);
    }
  }, [currentQuestionIndex, quizFinished]);

  // Gestion de la mise en sourdine en temps réel si clic sur le bouton Mute global
  useEffect(() => {
    if (isGlobalMuted && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    } else if (
      !isGlobalMuted &&
      currentQuestion &&
      !isAnswerSubmitted &&
      !quizFinished
    ) {
      speakQuestion(currentQuestion.question);
    }
  }, [isGlobalMuted]);

  // GESTION DU CHRONO ET DU SON TICK-TOCK
  useEffect(() => {
    if (quizFinished || isAnswerSubmitted || !currentQuestion) {
      stopChronoSound();
      return;
    }

    if (!chronoAudioRef.current) {
      chronoAudioRef.current = new Audio(tickTockSound);
      chronoAudioRef.current.loop = true;
    }

    chronoAudioRef.current.muted = isGlobalMuted;
    chronoAudioRef.current.volume = 0.25;

    chronoAudioRef.current
      .play()
      .catch((err: unknown) =>
        console.log("Audio en attente d'interaction utilisateur", err),
      );

    if (questionTimeLeft === 0) {
      stopChronoSound();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel(); // Coupe la parole si temps écoulé
      setIsAnswerSubmitted(true);
      playEffect(wrongSound);
      return;
    }

    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [
    questionTimeLeft,
    isAnswerSubmitted,
    quizFinished,
    currentQuestion,
    isGlobalMuted,
  ]);

  useEffect(() => {
    if (chronoAudioRef.current) {
      chronoAudioRef.current.muted = isGlobalMuted;
    }
  }, [isGlobalMuted]);

  useEffect(() => {
    if (!quizFinished) {
      setQuestionTimeLeft(15);
    }
  }, [currentQuestionIndex, quizFinished]);

  // Sons de fin de partie
  useEffect(() => {
    if (quizFinished) {
      stopChronoSound();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      const isWin = score >= totalQuestions / 2;
      playEffect(isWin ? winFinalSound : loseFinalSound, 0.4);
    }
  }, [quizFinished, score, totalQuestions]);

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      stopChronoSound();
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopChronoSound = () => {
    if (chronoAudioRef.current) {
      chronoAudioRef.current.pause();
      chronoAudioRef.current.currentTime = 0;
    }
  };

  const playEffect = (src: string, volume = 0.35) => {
    if (isGlobalMuted) return;
    const effect = new Audio(src);
    effect.volume = volume;
    effect.play().catch((err: unknown) => console.log(err));
  };

  const handleAnswerSelection = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer && currentQuestion) {
      stopChronoSound();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel(); // Coupe la voix dès qu'on valide
      setIsAnswerSubmitted(true);

      if (selectedAnswer === currentQuestion.response) {
        setScore((prev) => prev + 1);
        playEffect(correctSound);
      } else {
        playEffect(wrongSound);
      }
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    setSelectedAnswer(null);
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsAnswerSubmitted(false);
    setQuestionTimeLeft(15);
    setQuizFinished(false);

    onRefreshQuestions();
  };

  // ECRAN DE FIN
  if (quizFinished) {
    const isWin = score >= totalQuestions / 2;
    return (
      <div className="w-full max-w-md mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl text-center select-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex flex-col items-center gap-6"
        >
          <div
            className={`p-5 rounded-full border ${isWin ? "bg-amber-50 border-amber-200 text-amber-500" : "bg-rose-50 border-rose-200 text-rose-500"}`}
          >
            {isWin ? (
              <FaTrophy className="text-5xl animate-bounce" />
            ) : (
              <FaXmark className="text-5xl" />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Quiz terminé !
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Merci d'avoir joué à MadaKo'IS ?
            </p>
          </div>

          <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2">
            <p className="text-sm font-semibold text-slate-600">
              Votre score final
            </p>
            <p className="text-4xl font-black text-slate-900">
              <span className={isWin ? "text-emerald-500" : "text-rose-500"}>
                {score}
              </span>
              <span className="text-slate-300 mx-1">/</span>
              <span className="text-slate-500 text-2xl">{totalQuestions}</span>
            </p>
          </div>

          <p className="text-base font-bold text-slate-700 px-2">
            {isWin
              ? "Félicitations, vous connaissez bien la Grande Île ! 🥳"
              : "Dommage, Madagascar a encore des secrets pour vous. 😟"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              <FaArrowRotateLeft className="text-xs" /> Recommencer
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-slate-900/10"
            >
              <FaHouse className="text-xs" /> Menu principal
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const isUserWrong =
    isAnswerSubmitted && selectedAnswer !== currentQuestion?.response;

  // RENDU DU QUIZ
  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden select-none relative">
      <div className="w-full h-1.5 bg-slate-100 relative">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-amber-600"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Question {currentQuestionIndex + 1} sur {totalQuestions}
            </span>
            <div className="flex gap-2">
              <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold rounded-full uppercase">
                {currentQuestion?.category}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">
                {currentQuestion?.difficulty}
              </span>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold text-sm border transition-all ${questionTimeLeft > 5 ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-rose-50 border-rose-200 text-rose-600 animate-pulse"}`}
          >
            <FaStopwatch
              className={questionTimeLeft <= 5 ? "animate-spin" : ""}
            />
            <span>
              {questionTimeLeft < 10
                ? `0${questionTimeLeft}`
                : questionTimeLeft}
              s
            </span>
          </div>
        </div>

        {/* CONTAINER QUESTION + BOUTON LECTURE MANUELLE */}
        <div className="min-h-[70px] flex items-center justify-center gap-4 px-2">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 text-center leading-snug flex-1">
            {currentQuestion?.question}
          </h3>
          <button
            onClick={() => speakQuestion(currentQuestion?.question || "")}
            disabled={isGlobalMuted}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
              isGlobalMuted
                ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                : "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            }`}
            title={
              isGlobalMuted
                ? "Activez le son global pour écouter"
                : "Écouter la question"
            }
          >
            <FaVolumeHigh
              className={
                !isGlobalMuted && !isAnswerSubmitted ? "animate-pulse" : ""
              }
              size={16}
            />
          </button>
        </div>

        {/* OPTIONS DE REPONSES */}
        <div className="flex flex-col gap-3 w-full">
          <AnimatePresence mode="wait">
            {currentQuestion?.reponses_propose.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const isCorrectAnswer = answer === currentQuestion.response;

              let btnStyle =
                "bg-slate-50/50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300";

              if (isAnswerSubmitted) {
                if (isCorrectAnswer)
                  btnStyle =
                    "bg-emerald-500 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20";
                else if (isSelected)
                  btnStyle =
                    "bg-rose-500 border-rose-500 text-white font-bold shadow-md shadow-rose-500/20";
                else
                  btnStyle =
                    "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
              } else if (isSelected) {
                btnStyle =
                  "bg-amber-600 border-amber-600 text-white font-bold shadow-lg shadow-amber-600/10";
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!isAnswerSubmitted ? { scale: 1.01, x: 4 } : {}}
                  whileTap={!isAnswerSubmitted ? { scale: 0.99 } : {}}
                  onClick={() => handleAnswerSelection(answer)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left px-5 py-4 border rounded-2xl text-sm md:text-base font-medium transition-all duration-200 flex items-center justify-between ${btnStyle} ${isAnswerSubmitted ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span>{answer}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* DETAILS ET EXPLICATIONS */}
        <AnimatePresence>
          {isAnswerSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-2xl border text-sm flex flex-col gap-3 mt-2 ${isUserWrong ? "bg-rose-50/70 border-rose-100 text-rose-900" : "bg-emerald-50/70 border-emerald-100 text-emerald-900"}`}
            >
              <div>
                <span className="font-bold block mb-0.5">
                  {isUserWrong
                    ? "💡 Ce n'est pas tout à fait ça :"
                    : "🎉 Bonne réponse !"}
                </span>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {currentQuestion?.explanation}
                </p>
              </div>
              {isUserWrong && currentQuestion?.source?.url && (
                <a
                  href={currentQuestion.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start text-xs font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4 bg-white px-3 py-2 rounded-xl border border-amber-100 shadow-sm transition-all"
                >
                  <FaBookOpen className="text-sm" /> Consulter la documentation
                  ({currentQuestion.source.title})
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIONS FOOTER */}
        <div className="mt-2 border-t border-slate-100 pt-5">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-bold text-sm tracking-wide rounded-xl shadow-lg transition-all duration-200 active:scale-98 ${selectedAnswer ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20" : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"}`}
            >
              <FaRegCircleCheck className="text-base" />
              <span>Valider ma réponse</span>
            </button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNextQuestion}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-slate-900/10 active:scale-98 transition-all duration-200 cursor-pointer"
            >
              <span>
                {currentQuestionIndex < totalQuestions - 1
                  ? "Question suivante"
                  : "Découvrir mon score"}
              </span>
              <FaArrowRight className="text-xs" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
