import { Link } from 'react-router-dom';
import { MapPin, Monitor, Calendar, Users, CheckCircle } from 'lucide-react';
import { buildCercleUrl } from '../utils/slug';

export default function CercleCard({ cercle }) {
  const dateFormatee = new Date(cercle.prochaine_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const cardContent = (
    <>
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium tracking-wider px-3 py-1 rounded-full ${
              cercle.type === 'hommes' ? 'bg-blue-50 text-blue-600' :
              cercle.type === 'femmes' ? 'bg-pink-50 text-pink-600' :
              'bg-[#3ECEC6]/10 text-[#3ECEC6]'
            }`}>
              {cercle.type}
            </span>
            {cercle.complet && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#14171A]/10 text-[#14171A]/50">
                Complet
              </span>
            )}
          </div>
          {cercle.verifie && (
            <span className="flex items-center gap-1 text-xs text-[#3ECEC6] font-medium">
              <CheckCircle className="w-4 h-4" />
              Vérifié
            </span>
          )}
        </div>

        <h2 className={`text-xl font-medium mb-1 transition-colors ${
          cercle.complet
            ? 'text-[#14171A]/40'
            : 'text-[#14171A] group-hover:text-[#3ECEC6]'
        }`}>
          {cercle.nom}
        </h2>
        <div className="flex items-center gap-2 mb-4">
          <img
            src={`https://randomuser.me/api/portraits/${cercle.therapeute.genre === 'femme' ? 'women' : 'men'}/${cercle.id % 50}.jpg`}
            alt={cercle.therapeute.nom}
            className="w-7 h-7 rounded-full bg-[#3ECEC6]/10"
          />
          <p className="text-sm font-light text-[#14171A]/50">par {cercle.therapeute.nom}</p>
        </div>

        <div className="space-y-2 text-sm text-[#14171A]/60 font-light">
          <div className="flex items-center gap-2">
            {cercle.format === 'presentiel'
              ? <MapPin className="w-4 h-4 text-[#3ECEC6] shrink-0" />
              : <Monitor className="w-4 h-4 text-[#3ECEC6] shrink-0" />
            }
            <span>{cercle.format === 'presentiel' ? cercle.ville : 'En visio'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#3ECEC6] shrink-0" />
            <span>Prochain : {dateFormatee}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#3ECEC6] shrink-0" />
            <span>
              {cercle.complet
                ? 'Groupe complet'
                : `${cercle.places_restantes} place${cercle.places_restantes > 1 ? 's' : ''} restante${cercle.places_restantes > 1 ? 's' : ''}`
              }
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-[rgba(20,23,26,0.06)] flex items-center justify-between">
        <span className={`text-2xl font-medium ${cercle.complet ? 'text-[#14171A]/30' : 'text-[#14171A]'}`}>
          {cercle.prix}€ <span className="text-sm font-light text-[#14171A]/40">/ séance</span>
        </span>
        <span className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 shadow-sm ${
          cercle.complet
            ? 'bg-[#14171A]/8 text-[#14171A]/30 border border-[rgba(20,23,26,0.08)]'
            : 'bg-[#3ECEC6] text-white group-hover:bg-[#5dd8d1]'
        }`}>
          {cercle.complet ? "Liste d'attente" : 'Voir le cercle'}
        </span>
      </div>
    </>
  );

  return (
    <Link
      to={buildCercleUrl(cercle)}
      className={`rounded-xl border transition-all duration-200 flex flex-col no-underline ${
        cercle.complet
          ? 'bg-[#F7F9FB] border-[rgba(20,23,26,0.06)] shadow-lg opacity-70'
          : 'bg-white border-[rgba(20,23,26,0.08)] hover:border-[#3ECEC6] hover:shadow-lg shadow-sm'
      } group`}
    >
      {cardContent}
    </Link>
  );
}
