import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaCircleQuestion } from "react-icons/fa6";

const FAQ = () => {
  // Liste des questions/réponses adaptées au projet MadaKo'IS ?
  const faqData = [
    {
      id: 1,
      question: "Comment sont sélectionnées les questions du quiz ?",
      answer:
        "Toutes nos questions sont rédigées et vérifiées avec soin à partir de sources historiques, culturelles et géographiques fiables. Elles couvrent plusieurs thématiques : traditions, faune, flore, histoire et géographie de Madagascar.",
    },
    {
      id: 2,
      question: "Le jeu est-il entièrement gratuit ?",
      answer:
        "Oui, absolument ! MadaKo'IS ? est un projet éducatif, open-source et 100% gratuit, conçu par passion pour valoriser la richesse culturelle de la Grande Île.",
    },
    {
      id: 3,
      question:
        "Puis-je proposer de nouvelles questions pour enrichir le quiz ?",
      answer:
        "Avec grand plaisir ! C'est un projet communautaire. Vous pouvez soumettre vos idées de questions directement sur notre dépôt GitHub en ouvrant une 'Issue' ou une 'Pull Request'. Tous les contributeurs sont les bienvenus.",
    },
    {
      id: 4,
      question: "Le quiz est-il adapté aux enfants ?",
      answer:
        "Tout à fait. Les questions ont des niveaux de difficulté variés (Facile, Moyen, Difficile) pour permettre aux petits comme aux grands d'apprendre en s'amusant.",
    },
  ];

  // État pour suivre l'ID de la question actuellement ouverte (null si tout est fermé)
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white px-6 py-24 overflow-hidden">
      {/* Background géométrique signature pour la cohérence visuelle */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-3xl mx-auto flex flex-col gap-12">
        {/* En-tête de la section FAQ */}
        <div className="flex flex-col gap-3 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-semibold text-amber-700 w-fit">
            <FaCircleQuestion className="text-amber-600" /> Vos questions
            fréquentes
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Des réponses à{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              vos questions
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-md">
            Tout ce que vous devez savoir sur le fonctionnement du quiz, son
            contenu et la façon d'y contribuer.
          </p>
        </div>

        {/* Liste des accordéons */}
        <div className="flex flex-col gap-4 w-full">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-amber-50/20 border-amber-200 shadow-md shadow-amber-600/5"
                    : "bg-slate-50/50 border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                {/* Bouton de la question (Déclencheur) */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none group select-none"
                >
                  <span
                    className={`font-bold text-base md:text-lg transition-colors duration-200 ${
                      isOpen
                        ? "text-amber-800"
                        : "text-slate-800 group-hover:text-slate-900"
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Icône Chevron animée */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`flex-shrink-0 text-sm p-2 rounded-lg transition-colors ${
                      isOpen
                        ? "bg-amber-100 text-amber-700"
                        : "bg-white border border-slate-200 text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                {/* Contenu de la réponse masqué/affiché avec AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                      }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-slate-600 border-t border-dashed border-amber-200/40 pt-4 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
