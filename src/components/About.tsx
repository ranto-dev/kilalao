import { motion } from "framer-motion";
import { cardVariants, containerVariants } from "../@types/variants";
import * as Icons from "react-icons/fa6";
import { appTarget } from "../data/target";

const About = () => {
  type IconName = keyof typeof Icons;

  const DynamicIcon = ({ name }: { name: IconName }) => {
    const IconComponent = Icons[name] ?? Icons.FaCode;
    return (
      <IconComponent className="text-2xl text-amber-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
    );
  };

  return (
    <section
      id="a-propos"
      className="relative w-full min-h-screen flex items-center justify-center bg-white px-6 py-24 md:py-32 overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-40 self-start z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.05]">
              L'aventure culturelle <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 drop-shadow-sm">
                signée Kilalao.
              </span>
            </h2>

            <p className="text-sm md:text-md text-slate-500 font-medium leading-relaxed max-w-md mt-2">
              Plus qu'un simple quiz,{" "}
              <strong className="text-slate-800 font-bold">Kilalao</strong> est
              une immersion ludique conçue pour réveiller l'explorateur en vous.
              Repoussez vos limites et maîtrisez les secrets de la Grande Île.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 flex flex-col gap-8 w-full lg:pt-12"
        >
          {appTarget.map((card, index) => {
            const isEven = index % 2 === 0;
            const desktopXOffset = isEven
              ? "lg:translate-x-6"
              : "lg:-translate-x-6";

            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                  boxShadow: "0 20px 40px -15px rgba(245, 158, 11, 0.08)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`group relative flex flex-col sm:flex-row items-start gap-6 p-8 bg-white/80 backdrop-blur-sm border border-slate-100 hover:border-amber-500/30 rounded-3xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] transition-colors duration-300 ${desktopXOffset}`}
              >
                {/* Badge numérique discret en arrière-plan pour habiller la carte */}
                <span className="absolute right-6 top-4 text-6xl font-black text-slate-100/60 select-none pointer-events-none group-hover:text-amber-100/40 transition-colors duration-300">
                  0{index + 1}
                </span>

                {/* Conteneur d'icône flottant */}
                <div className="flex-shrink-0 p-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:shadow-sm transition-all duration-300">
                  <DynamicIcon name={card.icon as IconName} />
                </div>

                {/* Contenu textuel */}
                <div className="flex flex-col gap-2 relative z-10 max-w-[85%]">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 group-hover:text-slate-600 font-medium leading-relaxed transition-colors duration-300">
                    {card.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
