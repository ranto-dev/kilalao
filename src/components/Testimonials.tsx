import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";
import { cardVariants, containerVariants } from "../@types/variants";
import { reviews } from "../data/testimonials";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative w-full min-h-screen flex items-center justify-center bg-white px-6 py-24 overflow-hidden select-none"
    >
      {/* Fond en pointillés premium light */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-16">
        {/* En-tête de la section */}
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-bold text-amber-700 w-fit uppercase tracking-wider">
            ⭐️ La communauté s'exprime
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Ils explorent Madagascar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 drop-shadow-sm">
              grâce à Kilalao
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-md">
            Découvrez les retours d'expérience de ceux qui relèvent nos défis,
            apprennent et partagent notre culture.
          </p>
        </div>

        {/* Grille des témoignages */}
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
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex flex-col justify-between p-6 md:p-8 bg-slate-50/40 hover:bg-white border border-slate-100 hover:border-amber-200/60 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-amber-500/[0.04] transition-all duration-300 group overflow-hidden"
            >
              {/* Icône de citation géante et esthétique */}
              <FaQuoteLeft className="absolute -top-2 -right-2 text-6xl text-slate-100/50 group-hover:text-amber-100/40 group-hover:scale-110 transition-all duration-500 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Étoiles de notation */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm transition-colors duration-200 ${
                        i < user.rating
                          ? "text-amber-500 drop-shadow-[0_1px_2px_rgba(245,158,11,0.2)]"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Commentaire de l'utilisateur */}
                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed italic">
                  "{user.comment}"
                </p>
              </div>

              {/* Profil de l'utilisateur */}
              <div className="relative z-10 flex items-center gap-4 border-t border-dashed border-slate-200/60 group-hover:border-amber-200/50 mt-6 pt-5 transition-colors duration-300">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-200/60 group-hover:border-amber-500 shadow-sm transition-all duration-300"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold text-sm md:text-base text-slate-900 tracking-tight group-hover:text-amber-800 transition-colors duration-300">
                    {user.name}
                  </h4>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">
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
