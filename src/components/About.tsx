import { motion } from "framer-motion";
import { cardVariants, containerVariants } from "../@types/variants";
import * as Icons from "react-icons/fa6";
import { appTarget } from "../data/target";

const About = () => {
  type IconName = keyof typeof Icons;

  const DynamicIcon = ({ name }: { name: IconName }) => {
    const IconComponent = Icons[name] ?? Icons.FaCode;
    return (
      <IconComponent className="text-2xl text-amber-600 group-hover:scale-110 transition-transform duration-300" />
    );
  };

  return (
    <section
      id="a-propos"
      className="relative w-full min-h-screen flex items-center justify-center bg-white px-6 py-24 md:py-32 overflow-hidden select-none"
    >
      {/* Arrière-plan moderne en pointillés discrets */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
        {/* Colonne de Gauche - Contenu textuel principal */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]"
          >
            L'aventure culturelle <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 drop-shadow-sm">
              signée Kilalao.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-md"
          >
            Plus qu'un simple quiz,{" "}
            <strong className="text-slate-900 font-bold">Kilalao</strong> est
            une immersion ludique conçue pour réveiller l'explorateur qui est en
            vous. Repoussez vos limites et maîtrisez les secrets de la Grande
            Île.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-amber-600 font-bold tracking-wider uppercase flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Design épuré • Fun • Apprentissage
          </motion.p>
        </div>

        {/* Colonne de Droite - Liste des cartes d'objectifs (appTarget) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col gap-5 w-full"
        >
          {appTarget.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ x: 6, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative flex flex-col sm:flex-row items-start gap-6 p-6 md:p-8 bg-slate-50/40 hover:bg-white border border-slate-100 hover:border-amber-200/80 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-amber-500/5 overflow-hidden"
            >
              {/* Effet lumineux discret au survol de la carte */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/[0.015] to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Conteneur d'icône premium */}
              <div className="flex-shrink-0 p-3.5 bg-white border border-slate-200/70 shadow-sm rounded-xl group-hover:border-amber-300 group-hover:shadow-md group-hover:bg-amber-50/20 transition-all duration-300">
                <DynamicIcon name={card.icon as IconName} />
              </div>

              {/* Texte de la carte */}
              <div className="flex flex-col gap-1.5 relative z-10">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-slate-500 group-hover:text-slate-600 font-medium leading-relaxed transition-colors duration-300">
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
