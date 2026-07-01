import React, { useState, useEffect, useCallback } from "react";
import QuizGame from "../components/QuizGame";
import baobabBg from "../assets/alle_de_baobab.png";

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

interface QuizzBodyProps {
  isGlobalMuted: boolean;
}

const shuffleArray = (array: Quiz[]): Quiz[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizzBody: React.FC<QuizzBodyProps> = ({ isGlobalMuted }) => {
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]); // Stocke tout le catalogue brut
  const [selectedQuizzes, setSelectedQuizzes] = useState<Quiz[]>([]); // Les 10 questions de la session
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour mélanger et piocher 10 nouvelles questions à partir du catalogue existant
  const refreshQuestions = useCallback(() => {
    if (allQuizzes.length > 0) {
      setIsLoading(true);
      const shuffled = shuffleArray(allQuizzes);
      setSelectedQuizzes(shuffled.slice(0, 10));

      // Petit effet de transition fluide pour le rechargement des questions
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, [allQuizzes]);

  useEffect(() => {
    let isMounted = true;
    fetch("/quiz-patterns.json")
      .then((response) => {
        if (!response.ok)
          throw new Error("Impossible de récupérer les questions du quiz.");
        return response.json();
      })
      .then((data: Quiz[]) => {
        if (isMounted) {
          if (data && data.length > 0) {
            setAllQuizzes(data); // Sauvegarde globale du catalogue
            const shuffled = shuffleArray(data);
            setSelectedQuizzes(shuffled.slice(0, 10));
          } else {
            setError("Le catalogue de questions est vide.");
          }
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        console.error(err);
        if (isMounted) {
          setError("Une erreur est survenue lors du chargement des questions.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center text-center p-6 bg-cover bg-center bg-no-repeat bg-fixed text-white relative select-none"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.6)), url(${baobabBg})`,
      }}
    >
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent" />
          <p className="text-lg font-medium text-slate-200 drop-shadow-md">
            Préparation de vos questions uniques...
          </p>
        </div>
      ) : error ? (
        <div className="px-6 py-4 bg-slate-900/80 backdrop-blur-md border border-rose-500/30 rounded-2xl max-w-sm">
          <p className="text-sm font-bold text-rose-400">{error}</p>
        </div>
      ) : (
        selectedQuizzes.length > 0 && (
          <QuizGame
            quizzes={selectedQuizzes}
            isGlobalMuted={isGlobalMuted}
            onRefreshQuestions={refreshQuestions} // Transmission du prop de rafraîchissement
          />
        )
      )}
    </div>
  );
};

export default QuizzBody;
