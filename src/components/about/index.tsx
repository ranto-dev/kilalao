import { FaRegLightbulb, FaSplotch, FaGraduationCap } from "react-icons/fa6";
import { motion } from "framer-motion";

const About = () => {
  const appTarget = [
    {
      id: "01",
      icon: <FaRegLightbulb className="text-2xl text-amber-600" />,
      title: "Découverte & Culture",
      detail:
        "Explorez la diversité des régions, les traditions ancestrales, la faune unique et les paysages de la Grande Île.",
    },
    {
      id: "02",
      icon: <FaGraduationCap className="text-2xl text-amber-600" />,
      title: "Éducation & Savoir",
      detail:
        "Apprenez l'histoire et les faits marquants de Madagascar grâce à des questions rigoureusement documentées.",
    },
    {
      id: "03",
      icon: <FaSplotch className="text-2xl text-amber-600" />,
      title: "Loisir & Divertissement",
      detail:
        "Profitez d'une expérience interactive rythmée par des mécaniques de jeu captivantes et des effets immersifs.",
    },
  ];

  // Variantes pour animer les cartes les unes après les autres
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white px-6 py-24 md:py-32 overflow-hidden">
      {/* Background géométrique discret pour la texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        {/* COLONNE GAUCHE : Texte & Accroche (Fixe au scroll sur desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-semibold text-amber-700 w-fit"
          >
            <span>🇲🇬</span> MadaKo'IS ? — Le Quiz
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none"
          >
            Connaissez-vous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              réellement Madagascar ?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 leading-relaxed max-w-md"
          >
            MadaKo'IS ? est une plateforme immersive pensée pour tester et
            enrichir vos connaissances sur l'histoire, la culture et les secrets
            de la Grande Île.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-slate-500 italic"
          >
            Une expérience gamifiée combinant design moderne, sound design et
            fun.
          </motion.p>
        </div>

        {/* COLONNE DROITE : Les Cartes de fonctionnalités */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col gap-6 w-full"
        >
          {appTarget.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex flex-col sm:flex-row items-start gap-6 p-6 md:p-8 bg-slate-50/50 hover:bg-amber-50/30 border border-slate-100 hover:border-amber-200/60 rounded-2xl transition-all duration-300"
            >
              {/* Badge Numéro Absolu (Top-Right) */}
              <span className="absolute top-6 right-8 text-xs font-mono font-bold text-slate-300 group-hover:text-amber-300 transition-colors">
                {card.id}
              </span>

              {/* Conteneur d'icône minimaliste */}
              <div className="flex-shrink-0 p-3 bg-white border border-slate-200/60 shadow-sm rounded-xl group-hover:border-amber-200 group-hover:shadow-md transition-all duration-300">
                {card.icon}
              </div>

              {/* Contenu textuel */}
              <div className="flex flex-col gap-1.5 pr-8">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-amber-800 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {card.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
