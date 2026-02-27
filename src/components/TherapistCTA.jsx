import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function TherapistCTA() {
  return (
    <section className="bg-[#3ECEC6] py-16 px-4 text-center">
      <p className="text-sm font-medium tracking-widest uppercase text-white/70 mb-4">
        Thérapeutes & facilitateurs
      </p>
      <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
        Vous animez un cercle de parole ?
      </h2>
      <p className="text-white/80 font-light mb-8 max-w-lg mx-auto text-lg">
        Référencez votre groupe gratuitement et recevez des demandes de participants qualifiés directement dans votre boîte mail.
      </p>
      <Link
        to="/therapeutes"
        className="inline-flex items-center gap-2 bg-white text-[#3ECEC6] px-8 py-4 font-medium text-sm rounded-xl hover:bg-white/90 transition-colors duration-200 shadow-sm no-underline"
      >
        Référencer mon cercle gratuitement
        <ArrowRight className="w-4 h-4" />
      </Link>
      <p className="text-white/60 text-xs mt-4 font-light">Accès gratuit pendant la phase de lancement</p>
    </section>
  );
}
