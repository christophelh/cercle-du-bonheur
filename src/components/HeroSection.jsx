import { Search, MapPin } from 'lucide-react';

export default function HeroSection({ rechercheVille, onRechercheChange }) {
  return (
    <section className="bg-[rgb(62,206,198)] py-20 px-4 text-center border-b border-white/10">
      <p className="text-sm font-medium tracking-widest uppercase text-white/70 mb-4 flex items-center justify-center gap-1.5">
        <MapPin className="w-4 h-4" />
        Partout en France
      </p>
      <h1 className="text-4xl md:text-6xl font-medium text-white mb-6 leading-tight">
        Trouvez votre<br />cercle de parole
      </h1>
      <p className="text-lg font-light text-white/80 mb-10 max-w-xl mx-auto">
        Des espaces sécurisés animés par des thérapeutes certifiés,<br className="hidden md:block" />
        pour hommes, femmes et mixtes, partout en France.
      </p>
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14171A]/30 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher une ville..."
          value={rechercheVille}
          onChange={(e) => onRechercheChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-[rgba(20,23,26,0.1)] bg-white text-[#14171A] placeholder-[#14171A]/30 focus:outline-none focus:border-[#3ECEC6] shadow-sm text-base transition-colors"
        />
      </div>
    </section>
  );
}
