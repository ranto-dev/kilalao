import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";
import { cardVariants, containerVariants } from "../../@types/variants";
import { reviews } from "../../data/testimonials";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative w-full min-h-screen flex items-center justify-center bg-slate-50/30 px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-16">
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
              <FaQuoteLeft className="absolute top-6 right-8 text-4xl text-slate-50 group-hover:text-amber-50 transition-colors duration-300 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm transition-colors duration-200 ${
                        i < user.rating
                          ? "text-amber-500 drop-shadow-[0_1px_2px_rgba(245,158,11,0.15)]"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
                  "{user.comment}"
                </p>
              </div>

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
