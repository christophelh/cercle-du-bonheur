import { ArrowRight } from 'lucide-react';

export default function TherapistCTA() {
  return (
    <section className="bg-[#2D5016] py-16 px-4 text-center">
      <p className="text-sm font-semibold tracking-widest uppercase text-green-300 mb-4">
        Thérapeutes & facilitateurs
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Vous animez un cercle de parole ?
      </h2>
      <p className="text-green-100 mb-8 max-w-lg mx-auto text-lg">
        Référencez votre groupe gratuitement et recevez des demandes de participants qualifiés directement dans votre boîte mail.
      </p>
      <button className="inline-flex items-center gap-2 bg-white text-[#2D5016] px-8 py-4 font-bold text-sm hover:bg-green-50 transition-colors">
        Référencer mon cercle gratuitement
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-green-300 text-xs mt-4">Accès gratuit pendant la phase de lancement</p>
    </section>
  );
}
