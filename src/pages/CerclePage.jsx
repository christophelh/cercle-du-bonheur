import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Monitor, Calendar, Users, CheckCircle, Shield } from 'lucide-react';
import { cercles } from '../data/cercles';
import { findCercleBySlug } from '../utils/slug';
import CercleCard from '../components/CercleCard';

export default function CerclePage() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ prenom: '', email: '', message: '' });
  const [envoye, setEnvoye] = useState(false);

  const cercle = findCercleBySlug(params, cercles);

  useEffect(() => {
    if (!cercle) navigate('/', { replace: true });
  }, [cercle, navigate]);

  if (!cercle) return null;

  const dateFormatee = new Date(cercle.prochaine_date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const autresCercles = cercles.filter(
    (c) => c.therapeute.nom === cercle.therapeute.nom && c.id !== cercle.id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvoye(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(20,23,26,0.08)] px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-[#14171A]/60 hover:text-[#3ECEC6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux cercles
          </button>
          {cercle.verifie && (
            <span className="flex items-center gap-1 text-xs text-[#3ECEC6] font-medium">
              <CheckCircle className="w-4 h-4" />
              Vérifié
            </span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* Titre */}
        <div>
          <div className="flex items-center gap-2 mb-3">
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
          <h1 className="text-3xl md:text-4xl font-medium text-[#14171A] mb-2">{cercle.nom}</h1>
          <p className="text-[#14171A]/50 font-light">par {cercle.therapeute.nom}</p>
        </div>

        {/* Thérapeute */}
        <section className="bg-white rounded-xl p-6 border border-[rgba(20,23,26,0.08)] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#3ECEC6] rounded-xl flex items-center justify-center text-white text-xl font-medium shrink-0 shadow-sm">
              {cercle.therapeute.initiales}
            </div>
            <div>
              <p className="font-medium text-[#14171A] text-lg">{cercle.therapeute.nom}</p>
              <p className="text-sm font-light text-[#3ECEC6]">{cercle.therapeute.approche}</p>
            </div>
          </div>
          <p className="text-sm font-light text-[#14171A]/60 leading-relaxed">{cercle.therapeute.bio}</p>
        </section>

        {/* Description */}
        <section className="bg-white rounded-xl p-6 border border-[rgba(20,23,26,0.08)] shadow-sm">
          <h2 className="font-medium text-[#14171A] mb-3">À propos de ce cercle</h2>
          <p className="text-sm font-light text-[#14171A]/60 leading-relaxed">{cercle.description}</p>
        </section>

        {/* Infos pratiques */}
        <section className="bg-white rounded-xl p-6 border border-[rgba(20,23,26,0.08)] shadow-sm">
          <h2 className="font-medium text-[#14171A] mb-4">Informations pratiques</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-[#14171A]/60 font-light">
              {cercle.format === 'presentiel'
                ? <MapPin className="w-4 h-4 text-[#3ECEC6] shrink-0" />
                : <Monitor className="w-4 h-4 text-[#3ECEC6] shrink-0" />
              }
              <span>{cercle.format === 'presentiel' ? cercle.ville : 'En visio'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#14171A]/60 font-light">
              <Calendar className="w-4 h-4 text-[#3ECEC6] shrink-0" />
              <span>{dateFormatee}</span>
            </div>
            <div className="flex items-center gap-2 text-[#14171A]/60 font-light">
              <Users className="w-4 h-4 text-[#3ECEC6] shrink-0" />
              <span>
                {cercle.complet
                  ? 'Groupe complet'
                  : `${cercle.places_restantes} place${cercle.places_restantes > 1 ? 's' : ''} disponible${cercle.places_restantes > 1 ? 's' : ''}`
                }
              </span>
            </div>
            <div className="flex items-center gap-2 font-medium text-[#14171A]">
              <span>{cercle.prix}€ / séance</span>
            </div>
          </div>
        </section>

        {/* Charte */}
        <section className="bg-white rounded-xl p-6 border border-[rgba(20,23,26,0.08)] shadow-sm border-l-4 border-l-[#3ECEC6]">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-[#3ECEC6]" />
            <h2 className="font-medium text-[#14171A]">Cadre éthique du cercle</h2>
          </div>
          <p className="text-sm font-light text-[#14171A]/60 leading-relaxed">{cercle.charte}</p>
        </section>

        {/* Formulaire */}
        <section className="bg-white rounded-xl p-6 border border-[rgba(20,23,26,0.08)] shadow-sm">
          <h2 className="font-medium text-[#14171A] mb-4">Demander une place</h2>
          {envoye ? (
            <div className="bg-[#3ECEC6] text-white p-4 text-center rounded-xl">
              <p className="font-medium mb-1">Demande envoyée !</p>
              <p className="text-sm opacity-90">{cercle.therapeute.nom} vous contactera sous 48h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Votre prénom"
                required
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                className="w-full border border-[rgba(20,23,26,0.1)] rounded-xl focus:border-[#3ECEC6] px-4 py-3 text-sm font-light outline-none bg-[#F7F9FB] transition-colors"
              />
              <input
                type="email"
                placeholder="Votre adresse email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[rgba(20,23,26,0.1)] rounded-xl focus:border-[#3ECEC6] px-4 py-3 text-sm font-light outline-none bg-[#F7F9FB] transition-colors"
              />
              <textarea
                placeholder="Votre message (facultatif)"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-[rgba(20,23,26,0.1)] rounded-xl focus:border-[#3ECEC6] px-4 py-3 text-sm font-light outline-none bg-[#F7F9FB] resize-none transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#3ECEC6] text-white py-4 font-medium text-sm rounded-xl hover:bg-[#5dd8d1] transition-colors duration-200 shadow-sm"
              >
                Demander une place
              </button>
              <p className="text-xs text-[#14171A]/30 text-center font-light">
                Vos coordonnées sont transmises uniquement à {cercle.therapeute.nom}
              </p>
            </form>
          )}
        </section>

        {/* Autres cercles du thérapeute */}
        {autresCercles.length > 0 && (
          <section>
            <h2 className="font-medium text-[#14171A] mb-4">
              Autres cercles de {cercle.therapeute.nom}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {autresCercles.map((c) => (
                <CercleCard key={c.id} cercle={c} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
