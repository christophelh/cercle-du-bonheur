import { useState, useMemo } from 'react';
import { cercles } from '../data/cercles';
import HeroSection from '../components/HeroSection';
import FilterBar from '../components/FilterBar';
import CercleCard from '../components/CercleCard';
import TherapistCTA from '../components/TherapistCTA';

export default function HomePage() {
  const [filtreType, setFiltreType] = useState('tous');
  const [filtreFormat, setFiltreFormat] = useState('tous');
  const [rechercheVille, setRechercheVille] = useState('');

  const cerclesFiltres = useMemo(() => {
    return cercles.filter((c) => {
      const matchType = filtreType === 'tous' || c.type === filtreType;
      const matchFormat = filtreFormat === 'tous' || c.format === filtreFormat;
      const matchVille = rechercheVille === '' ||
        c.ville.toLowerCase().includes(rechercheVille.toLowerCase());
      return matchType && matchFormat && matchVille;
    });
  }, [filtreType, filtreFormat, rechercheVille]);

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <HeroSection
        rechercheVille={rechercheVille}
        onRechercheChange={setRechercheVille}
      />

      <FilterBar
        filtreType={filtreType}
        filtreFormat={filtreFormat}
        onTypeChange={setFiltreType}
        onFormatChange={setFiltreFormat}
        count={cerclesFiltres.length}
      />

      <main className="max-w-5xl mx-auto px-4 py-12">
        {cerclesFiltres.length === 0 ? (
          <div className="text-center py-20 text-[#14171A]/40">
            <p className="text-xl font-medium mb-2">Aucun cercle trouvé</p>
            <p className="text-sm font-light">Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cerclesFiltres.map((cercle) => (
              <CercleCard key={cercle.id} cercle={cercle} />
            ))}
          </div>
        )}
      </main>

      <TherapistCTA />
    </div>
  );
}
