import { useState, useEffect } from 'react';
import { X, MapPin, Monitor, Calendar, Users, CheckCircle, Shield } from 'lucide-react';

export default function CercleModal({ cercle, onClose }) {
  const [form, setForm] = useState({ prenom: '', email: '', message: '' });
  const [envoye, setEnvoye] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const dateFormatee = new Date(cercle.prochaine_date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvoye(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 ${
                cercle.type === 'hommes' ? 'bg-blue-50 text-blue-800' :
                cercle.type === 'femmes' ? 'bg-pink-50 text-pink-800' :
                'bg-green-50 text-green-800'
              }`}>
                {cercle.type}
              </span>
              {cercle.verifie && (
                <span className="flex items-center gap-1 text-xs text-[#2D5016] font-semibold">
                  <CheckCircle className="w-4 h-4" /> Vérifié
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-[#111111]">{cercle.nom}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#111111] transition-colors ml-4 mt-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-[#2D5016] flex items-center justify-center text-white text-lg font-bold shrink-0">
                {cercle.therapeute.initiales}
              </div>
              <div>
                <p className="font-bold text-[#111111]">{cercle.therapeute.nom}</p>
                <p className="text-sm text-[#2D5016] font-medium">{cercle.therapeute.approche}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{cercle.therapeute.bio}</p>
          </section>

          <section>
            <h3 className="font-bold text-[#111111] mb-2">À propos de ce cercle</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{cercle.description}</p>
          </section>

          <section>
            <h3 className="font-bold text-[#111111] mb-3">Informations pratiques</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                {cercle.format === 'presentiel'
                  ? <MapPin className="w-4 h-4 text-[#2D5016]" />
                  : <Monitor className="w-4 h-4 text-[#2D5016]" />
                }
                <span>{cercle.format === 'presentiel' ? cercle.ville : 'En visio'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-[#2D5016]" />
                <span>{dateFormatee}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4 text-[#2D5016]" />
                <span>{cercle.places_restantes} place{cercle.places_restantes > 1 ? 's' : ''} disponible{cercle.places_restantes > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[#111111]">
                <span>{cercle.prix}€ / séance</span>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-4 border-l-4 border-[#2D5016]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#2D5016]" />
              <h3 className="font-bold text-[#111111] text-sm">Cadre éthique du cercle</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{cercle.charte}</p>
          </section>

          <section>
            <h3 className="font-bold text-[#111111] mb-4">Demander une place</h3>
            {envoye ? (
              <div className="bg-[#2D5016] text-white p-4 text-center">
                <p className="font-bold mb-1">Demande envoyée !</p>
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
                  className="w-full border-2 border-gray-200 focus:border-[#2D5016] px-4 py-3 text-sm outline-none"
                />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-2 border-gray-200 focus:border-[#2D5016] px-4 py-3 text-sm outline-none"
                />
                <textarea
                  placeholder="Votre message (facultatif)"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border-2 border-gray-200 focus:border-[#2D5016] px-4 py-3 text-sm outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#2D5016] text-white py-4 font-bold text-sm hover:bg-[#3a6b1e] transition-colors"
                >
                  Demander une place
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Vos coordonnées sont transmises uniquement à {cercle.therapeute.nom}
                </p>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
