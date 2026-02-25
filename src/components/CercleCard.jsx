import { MapPin, Monitor, Calendar, Users, CheckCircle } from 'lucide-react';

export default function CercleCard({ cercle, onClick }) {
  const dateFormatee = new Date(cercle.prochaine_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div
      className="bg-white border-2 border-gray-200 hover:border-[#2D5016] transition-colors cursor-pointer group flex flex-col"
      onClick={() => onClick(cercle)}
    >
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 ${
            cercle.type === 'hommes' ? 'bg-blue-50 text-blue-800' :
            cercle.type === 'femmes' ? 'bg-pink-50 text-pink-800' :
            'bg-green-50 text-green-800'
          }`}>
            {cercle.type}
          </span>
          {cercle.verifie && (
            <span className="flex items-center gap-1 text-xs text-[#2D5016] font-semibold">
              <CheckCircle className="w-4 h-4" />
              Vérifié
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-[#111111] mb-1 group-hover:text-[#2D5016] transition-colors">
          {cercle.nom}
        </h2>
        <p className="text-sm text-gray-500 mb-4">par {cercle.therapeute.nom}</p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            {cercle.format === 'presentiel'
              ? <MapPin className="w-4 h-4 text-[#2D5016] shrink-0" />
              : <Monitor className="w-4 h-4 text-[#2D5016] shrink-0" />
            }
            <span>{cercle.format === 'presentiel' ? cercle.ville : 'En visio'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2D5016] shrink-0" />
            <span>Prochain : {dateFormatee}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2D5016] shrink-0" />
            <span>{cercle.places_restantes} place{cercle.places_restantes > 1 ? 's' : ''} restante{cercle.places_restantes > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-2xl font-bold text-[#111111]">
          {cercle.prix}€ <span className="text-sm font-normal text-gray-400">/ séance</span>
        </span>
        <button className="bg-[#2D5016] text-white px-4 py-2 text-sm font-semibold hover:bg-[#3a6b1e] transition-colors">
          Voir le cercle
        </button>
      </div>
    </div>
  );
}
