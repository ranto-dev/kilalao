import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaCircleQuestion } from "react-icons/fa6";

// Données de la FAQ (6 à 7 questions modernes et complètes)
export const faqData = [
  {
    id: 1,
    question: "Qu'est-ce que Kilalao ?",
    answer:
      "Kilalao est une plateforme interactive et ludique de quiz dédiée entièrement à Madagascar. Notre objectif est de vous faire découvrir l'histoire, la riche culture, la biodiversité unique et les mystères de la Grande Île à travers une expérience gamifiée et immersive.",
  },
  {
    id: 2,
    question: "Comment sont réparties les difficultés des quiz ?",
    answer:
      "Les questions sont classées en trois niveaux : Facile (pour les bases et la culture générale grand public), Moyen (pour tester vos connaissances approfondies) et Difficile (réservé aux véritables experts de l'Île Rouge).",
  },
  {
    id: 3,
    question: "D'où proviennent les sources et explications ?",
    answer:
      "Chaque réponse est accompagnée d'une explication sourcée. En cas d'erreur, un bouton de documentation s'affiche pour vous rediriger vers des encyclopédies de confiance comme Wikipédia ou Britannica afin d'en apprendre plus instantanément.",
  },
  {
    id: 4,
    question: "Le jeu dispose-t-il d'un système de temps limité ?",
    answer:
      "Oui, pour pimenter l'expérience, vous disposez de 15 secondes par question. Si le chrono tombe à zéro, la réponse est considérée comme non validée et l'explication s'affiche automatiquement.",
  },
  {
    id: 5,
    question: "Est-ce que Kilalao est 100% gratuit ?",
    answer:
      "Absolument ! Kilalao est un projet passionné et accessible gratuitement à tous les curieux, étudiants ou voyageurs désireux de tester leur culture générale sur Madagascar, sans aucune publicité intrusive.",
  },
  {
    id: 6,
    question: "Puis-je jouer sur mon smartphone ?",
    answer:
      "Tout à fait. L'interface de Kilalao a été entièrement conçue de manière responsive (Mobile-First). Vous profitez de la même fluidité d'animation et de design, que vous soyez sur PC, tablette ou smartphone.",
  },
  {
    id: 7,
    question: "Comment puis-je proposer de nouvelles questions ?",
    answer:
      "Nous adorons les contributions ! Vous pouvez nous soumettre vos idées de questions avec leurs sources en nous contactant via nos réseaux officiels ou la section contribution présente sur le menu principal.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number | null) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative w-full min-h-screen flex items-center justify-center bg-white px-6 py-24 overflow-hidden select-none"
    >
      {/* Arrière-plan épuré style White Premium */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="relative w-full max-w-3xl mx-auto flex flex-col gap-14">
        {/* En-tête de la FAQ */}
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-bold text-amber-700 w-fit uppercase tracking-wider">
            <FaCircleQuestion className="text-amber-600 text-sm" />
            Centre d'aide
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Des réponses à{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 drop-shadow-sm">
              toutes vos questions
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-md">
            Découvrez les secrets de fonctionnement de Kilalao, les règles du
            jeu et notre philosophie.
          </p>
        </div>

        {/* Liste Accordéon FAQ */}
        <div className="flex flex-col gap-3.5 w-full">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-amber-50/10 border-amber-200 shadow-sm"
                    : "bg-slate-50/40 border-slate-100 hover:border-amber-200/50 hover:bg-white hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none group cursor-pointer"
                >
                  <span
                    className={`font-bold text-base md:text-lg transition-colors duration-200 ${
                      isOpen
                        ? "text-amber-700"
                        : "text-slate-800 group-hover:text-slate-900"
                    }`}
                  >
                    {item.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className={`flex-shrink-0 text-xs p-2 rounded-xl border transition-all ${
                      isOpen
                        ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-400 group-hover:text-slate-600 group-hover:border-slate-300"
                    }`}
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 22,
                      }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-slate-600 border-t border-dashed border-amber-200/50 pt-4 leading-relaxed font-medium">
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
