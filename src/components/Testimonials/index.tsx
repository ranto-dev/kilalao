import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Rindra Sandratra",
      role: "Étudiant en Histoire",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80", // Avatar moderne
      rating: 5,
      comment:
        "Une claque visuelle et culturelle ! Gasikarako réussit le pari de rendre l’apprentissage de notre histoire passionnant. Les animations et le chronomètre ajoutent un vrai défi.",
    },
    {
      id: 2,
      name: "Aina Razafindrakoto",
      role: "Enseignante en Primaire",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "J'utilise ce quiz en classe pour éveiller la curiosité de mes élèves. C'est l'outil ludique et pédagogique moderne qui manquait pour valoriser notre patrimoine culturel.",
    },
    {
      id: 3,
      name: "Faly Andrianjafy",
      role: "Diaspora (Paris, France)",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "Vivre loin de la Grande Île n'est pas facile. Ce jeu me permet de rester connecté à mes racines et de tester mes connaissances de manière super fun. Misaotra bets !",
    },
  ];

  // Variantes d'animation en cascade
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-slate-50/30 px-6 py-24 overflow-hidden">
      {/* Texture en points signature */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-16">
        {/* En-tête de la section */}
        <div className="flex flex-col gap-3 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-semibold text-amber-700 w-fit">
            ⭐️ Échos de la communauté
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Ce qu'ils pensent de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              Gasikarako
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-md">
            Découvrez les retours d'expérience de ceux qui jouent, apprennent et
            partagent notre culture au quotidien.
          </p>
        </div>

        {/* Grille des 3 Témoignages */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {reviews.map((user) => (
            <motion.div
              key={user.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative flex flex-col justify-between p-6 md:p-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/50 transition-shadow duration-300 hover:shadow-amber-600/5 group"
            >
              {/* Icône de citation en arrière-plan */}
              <FaQuoteLeft className="absolute top-6 right-8 text-4xl text-slate-50 group-hover:text-amber-50 transition-colors duration-300 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Étoiles de notation */}
                <div className="flex items-center gap-1">
                  {[...Array(user.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-amber-500 text-sm drop-shadow-[0_1px_2px_rgba(245,158,11,0.15)]"
                    />
                  ))}
                </div>

                {/* Le commentaire d'impact */}
                <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
                  "{user.comment}"
                </p>
              </div>

              {/* Infos Profil de l'utilisateur */}
              <div className="relative z-10 flex items-center gap-4 border-t border-slate-50 mt-6 pt-5">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/20 group-hover:border-amber-500 transition-colors duration-300"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold text-sm md:text-base text-slate-900 tracking-tight">
                    {user.name}
                  </h4>
                  <p className="text-xs font-semibold text-amber-600">
                    {user.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
