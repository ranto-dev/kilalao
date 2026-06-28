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
    if (!name || !email || !rating || !message) return;

    setStatus("loading");

    // Construction de l'objet JSON prêt pour ton système d'envoi d'email
    const feedbackData = {
      name: name.trim(),
      email: email.trim(),
      rating: rating,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Console log du JSON complet demandé pour ton intégration
    console.log(
      "JSON prêt pour l'envoi d'email :",
      JSON.stringify(feedbackData, null, 2),
    );

    // Simulation de la requête d'envoi
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setName("");
        setEmail("");
        setRating(0);
        setMessage("");
        setStatus("idle");
      }, 3500);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center bg-white px-6 py-24 overflow-hidden select-none"
    >
      {/* Fond en pointillés White Premium */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="relative w-full max-w-2xl mx-auto flex flex-col gap-10">
        {/* En-tête de la section */}
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-bold text-amber-700 w-fit uppercase tracking-wider">
            💬 Votre avis compte
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Qu'avez-vous pensé de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 drop-shadow-sm">
              l'expérience Kilalao ?
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-md">
            Une idée d'amélioration, une remarque ou un mot doux ? Partagez
            votre aventure avec notre équipe.
          </p>
        </div>

        {/* Boîtier de Formulaire Épuré */}
        <div className="bg-slate-50/40 hover:bg-white border border-slate-100 hover:border-amber-200/50 rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl hover:shadow-amber-500/[0.02] transition-all duration-300 relative min-h-[400px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="feedback-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-5"
              >
                {/* Sélecteur d'étoiles moderne */}
                <div className="flex flex-col gap-1.5 items-center sm:items-start">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Votre note globale *
                  </label>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        disabled={status === "loading"}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-3xl focus:outline-none transition-transform active:scale-90 p-0.5 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <FaStar
                          className={`transition-colors duration-200 ${
                            star <= (hoverRating || rating)
                              ? "text-amber-500 drop-shadow-[0_2px_6px_rgba(245,158,11,0.25)]"
                              : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid pour les coordonnées Nom/Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold text-slate-800 uppercase tracking-wider"
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
                      placeholder="Ex: Rova, Sarah, Toky..."
                      className="w-full px-4 py-3.5 bg-white border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-sm font-semibold shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-slate-800 uppercase tracking-wider"
                    >
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      disabled={status === "loading"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: rova@kilalao.mg"
                      className="w-full px-4 py-3.5 bg-white border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-sm font-semibold shadow-inner"
                    />
                  </div>
                </div>

                {/* Zone de Message */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold text-slate-800 uppercase tracking-wider"
                    >
                      Votre avis *
                    </label>
                    <span
                      className={`text-[10px] font-bold tracking-wide ${message.length > MAX_CHARS - 20 ? "text-rose-500" : "text-slate-400"}`}
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
                    placeholder="Racontez-nous votre partie ! Qu'est-ce qui vous a le plus plu ou marqué ?"
                    rows={4}
                    className="w-full px-4 py-3.5 bg-white border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-sm font-semibold resize-none leading-relaxed shadow-inner"
                  />
                </div>

                {/* Bouton de Validation */}
                <button
                  type="submit"
                  disabled={
                    status === "loading" ||
                    !rating ||
                    !name.trim() ||
                    !email.trim() ||
                    !message.trim()
                  }
                  className="w-full mt-2 relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 bg-slate-950 hover:bg-amber-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold text-sm tracking-wide rounded-xl shadow-md hover:shadow-lg hover:shadow-amber-500/20 disabled:shadow-none transition-all duration-300 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {status === "loading" ? (
                    <FaSpinner className="animate-spin text-base" />
                  ) : (
                    <>
                      <span>Envoyer mon avis</span>
                      <FaPaperPlane className="text-[10px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Écran de Succès Premium (Misaotra betsaka) */
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <div className="p-4 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
                  <FaCheckCircle className="text-4xl text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Misaotra betsaka ! 🇲🇬 ✨
                </h3>
                <p className="text-sm md:text-base text-slate-500 font-medium max-w-xs leading-relaxed">
                  Votre précieux avis a été capturé en toute sécurité. Merci de
                  nous aider à faire grandir l'univers Kilalao.
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
