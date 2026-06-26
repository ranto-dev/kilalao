import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaPaperPlane, FaCheckCircle, FaSpinner } from "react-icons/fa";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const MAX_CHARS = 500;

  const handleSubmit = (events: React.FormEvent<HTMLFormElement>) => {
    events.preventDefault();
    if (!name || !rating || !message) return;

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setName("");
        setRating(0);
        setMessage("");
        setStatus("idle");
      }, 3500);
    }, 1500);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-2xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-semibold text-amber-700 w-fit">
            💬 Votre avis compte
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Qu'avez-vous pensé de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              MadaKo'IS ?
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-md">
            Une idée d'amélioration, une remarque ou un mot doux ? Partagez
            votre expérience avec nous !
          </p>
        </div>

        <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-100/40 relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="feedback-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2 items-center sm:items-start">
                  <label className="text-sm font-bold text-slate-800 tracking-wide">
                    Votre note globale *
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-3xl focus:outline-none transition-transform active:scale-95 p-1"
                      >
                        <FaStar
                          className={`transition-colors duration-200 ${
                            star <= (hoverRating || rating)
                              ? "text-amber-500 drop-shadow-[0_2px_4px_rgba(245,158,11,0.2)]"
                              : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-slate-800 tracking-wide"
                  >
                    Nom ou Pseudo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    disabled={status === "loading"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Rova, Toky, Sarah..."
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all text-sm font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-slate-800 tracking-wide"
                  >
                    Votre addresse Email *
                  </label>
                  <input
                    type="text"
                    id="email"
                    required
                    disabled={status === "loading"}
                    value={name}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: je.connais@madagascar.mg"
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all text-sm font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="message"
                      className="text-sm font-bold text-slate-800 tracking-wide"
                    >
                      Votre avis *
                    </label>
                    <span
                      className={`text-xs font-medium ${message.length > MAX_CHARS - 20 ? "text-rose-500" : "text-slate-400"}`}
                    >
                      {message.length} / {MAX_CHARS}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    maxLength={MAX_CHARS}
                    disabled={status === "loading"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Racontez-nous votre partie ! Qu'est-ce qui vous a le plus plu ?"
                    rows={4}
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all text-sm font-medium resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    status === "loading" ||
                    !rating ||
                    !name.trim() ||
                    !message.trim()
                  }
                  className="w-full mt-2 relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-amber-600/20 disabled:shadow-none transition-all duration-300 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? (
                    <FaSpinner className="animate-spin text-lg" />
                  ) : (
                    <>
                      <span>Envoyer mon avis</span>
                      <FaPaperPlane className="text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <div className="p-4 bg-emerald-50 rounded-full border border-emerald-100">
                  <FaCheckCircle className="text-4xl text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Misaotra betsaka ! ✨
                </h3>
                <p className="text-sm md:text-base text-slate-500 max-w-xs leading-relaxed">
                  Votre précieux avis a bien été enregistré. Merci de nous aider
                  à faire grandir ce projet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
