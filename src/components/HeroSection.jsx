import { Search } from 'lucide-react';

export default function HeroSection({ rechercheVille, onRechercheChange }) {
  return (
    <section className="bg-white py-20 px-4 text-center border-b border-gray-100">
      <p className="text-sm font-semibold tracking-widest uppercase text-[#2D5016] mb-4">
        France entière
      </p>
      <h1 className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
        Trouvez votre<br />cercle de parole
      </h1>
      <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
        Des espaces sécurisés animés par des thérapeutes certifiés,<br className="hidden md:block" />
        pour hommes, femmes et mixtes, partout en France.
      </p>
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher une ville..."
          value={rechercheVille}
          onChange={(e) => onRechercheChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-[#111111] rounded-none text-[#111111] placeholder-gray-400 focus:outline-none focus:border-[#2D5016] text-base"
        />
      </div>
    </section>
  );
}
