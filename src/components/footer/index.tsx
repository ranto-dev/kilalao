import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa6";

const Footer = () => {
  const currentYear = 2026;

  const footerLinks = [
    { label: "Accueil", href: "#" },
    { label: "Le Jeu", href: "#quiz" },
    { label: "À propos", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Avis", href: "#feedback" },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/ranto-dev",
      label: "GitHub",
    },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="relative w-full bg-slate-50 border-t border-slate-100 overflow-hidden">
      {/* Background géométrique discret pour la cohérence visuelle */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8 flex flex-col gap-12">
        {/* SECTION SUPÉRIEURE : Brand, Nav & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Bloc Marque / Projet */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇲🇬</span>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                MadaKo'IS <span className="text-amber-600">?</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Un projet open-source et éducatif dédié à la valorisation du
              patrimoine, de l'histoire et de la culture de Madagascar à travers
              le jeu.
            </p>
          </div>

          {/* Bloc Liens de navigation rapides */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc Réseaux Sociaux & Contact */}
          <div className="md:col-span-3 flex flex-col gap-4 md:items-end">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 md:text-right">
              Communauté
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="p-3 bg-white border border-slate-200/60 rounded-xl text-slate-600 hover:text-amber-600 hover:border-amber-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* LIGNE DE SÉPARATION DISCRÈTE */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* SECTION INFÉRIEURE : Copyright & Mentions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Ta signature demandée */}
          <p className="text-xs font-medium text-slate-500 tracking-wide">
            Copyright - {currentYear} All reserved, by{" "}
            <a
              href="https://github.com/ranto-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-800 hover:text-amber-600 transition-colors"
            >
              ranto andrianandraina
            </a>
            .
          </p>

          {/* Note additionnelle de fabrication (Crédit clin d'œil) */}
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <span>Fait avec</span>
            <FaHeart className="text-rose-500 animate-pulse text-[10px]" />
            <span>pour la Grande Île</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
