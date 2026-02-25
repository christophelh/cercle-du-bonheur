# Cercle du Bonheur MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construire un MVP Vite + React de plateforme de référencement de cercles de parole en France avec filtrage dynamique et modale de contact.

**Architecture:** Application React monopage avec state management local dans App.jsx (useState). Les données sont statiques dans src/data/cercles.js. Cinq composants isolés assemblés dans App.jsx. Pas de backend, pas de routing.

**Tech Stack:** Vite, React 18, Tailwind CSS 3, Lucide React

---

### Task 1 : Scaffolding du projet Vite + React

**Files:**
- Create: `package.json` (via npm create vite)
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Modify: `src/index.css`

**Step 1 : Créer le projet Vite**

```bash
cd "/Users/chris/Cercle du bonheur"
npm create vite@latest . -- --template react
```

Répondre `y` si demande de confirmation pour écrire dans le dossier.

**Step 2 : Installer les dépendances**

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
npx tailwindcss init -p
```

**Step 3 : Configurer Tailwind**

Remplacer le contenu de `tailwind.config.js` par :

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foret: {
          DEFAULT: '#2D5016',
          light: '#3a6b1e',
          dark: '#1e3a0f',
        }
      }
    },
  },
  plugins: [],
}
```

**Step 4 : Ajouter les directives Tailwind dans src/index.css**

Remplacer tout le contenu de `src/index.css` par :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #ffffff;
  color: #111111;
}
```

**Step 5 : Vérifier que le projet démarre**

```bash
npm run dev
```

Expected : serveur sur http://localhost:5173, page Vite par défaut visible.

**Step 6 : Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite + React + Tailwind"
```

---

### Task 2 : Données fictives (src/data/cercles.js)

**Files:**
- Create: `src/data/cercles.js`

**Step 1 : Créer le fichier de données**

Créer `src/data/cercles.js` avec ce contenu exact :

```js
export const cercles = [
  {
    id: 1,
    nom: "Cercle d'Hommes — Lyon",
    type: "hommes",
    ville: "Lyon",
    format: "presentiel",
    prix: 35,
    prochaine_date: "2026-03-08",
    places_restantes: 3,
    verifie: true,
    therapeute: {
      nom: "Marc Dupont",
      initiales: "MD",
      bio: "Psychothérapeute et facilitateur de cercles d'hommes depuis 8 ans. Formé à la Process Communication et à la Gestalt.",
      approche: "Gestalt & Process Communication"
    },
    charte: "Ce cercle repose sur trois piliers : confidentialité absolue, non-jugement et bienveillance active. Aucun conseil non sollicité. La parole de chacun est sacrée.",
    description: "Un espace sécurisé pour les hommes qui souhaitent explorer leur rapport à eux-mêmes, aux autres hommes et au monde. Séances de 2h30 en groupe de 6 à 10 participants."
  },
  {
    id: 2,
    nom: "Tente Rouge — Paris",
    type: "femmes",
    ville: "Paris",
    format: "presentiel",
    prix: 40,
    prochaine_date: "2026-03-12",
    places_restantes: 2,
    verifie: true,
    therapeute: {
      nom: "Sophie Renard",
      initiales: "SR",
      bio: "Thérapeute transpersonnelle et accompagnatrice des cycles féminins. 12 ans d'expérience dans les cercles de femmes et les rituels de passage.",
      approche: "Thérapie transpersonnelle & cycles féminins"
    },
    charte: "La Tente Rouge est un espace de sororité. Ce qui est dit dans le cercle reste dans le cercle. Chaque femme parle en son propre nom, sans généraliser ni conseiller.",
    description: "Cercle mensuel ancré dans les traditions féminines et les cycles lunaires. Un espace pour déposer, ressentir et se reconnecter à sa puissance intérieure."
  },
  {
    id: 3,
    nom: "Cercle Vivant — Bordeaux",
    type: "mixte",
    ville: "Bordeaux",
    format: "presentiel",
    prix: 30,
    prochaine_date: "2026-03-15",
    places_restantes: 5,
    verifie: true,
    therapeute: {
      nom: "Julien Moreau",
      initiales: "JM",
      bio: "Coach systémique et facilitateur de dialogue authentique. Formé à la Communication Non-Violente et aux pratiques contemplatives.",
      approche: "CNV & approche systémique"
    },
    charte: "Cercle ouvert à tous dans un esprit de curiosité et de respect. Chaque participant s'engage à écouter sans interrompre et à parler depuis son vécu personnel.",
    description: "Un cercle de parole mixte pour explorer ce qui nous anime et nous unit, au-delà des différences. Idéal pour ceux qui débutent dans la pratique des cercles."
  },
  {
    id: 4,
    nom: "Cercle du Père — Toulouse",
    type: "hommes",
    ville: "Toulouse",
    format: "visio",
    prix: 25,
    prochaine_date: "2026-03-10",
    places_restantes: 4,
    verifie: true,
    therapeute: {
      nom: "Ahmed Bensalem",
      initiales: "AB",
      bio: "Psychologue clinicien spécialisé dans la parentalité masculine et les questions de transmission. Père de trois enfants.",
      approche: "Psychologie clinique & parentalité"
    },
    charte: "Un espace de parole pour les pères, beaux-pères et hommes en chemin vers la paternité. Confidentialité et respect des récits personnels sont les fondements de ce cercle.",
    description: "Groupe de parole en visio pour les pères qui souhaitent explorer leur rôle, leurs doutes et leurs joies dans la relation à leurs enfants. Séances bi-mensuelles."
  },
  {
    id: 5,
    nom: "Cercle des Origines — Nantes",
    type: "femmes",
    ville: "Nantes",
    format: "visio",
    prix: 35,
    prochaine_date: "2026-03-20",
    places_restantes: 6,
    verifie: true,
    therapeute: {
      nom: "Claire Fontaine",
      initiales: "CF",
      bio: "Thérapeute familiale et constellatrice. Spécialisée dans les questions de transmission transgénérationnelle et de réconciliation avec les lignées.",
      approche: "Constellations familiales & transgénérationnel"
    },
    charte: "Ce cercle honore les récits familiaux et ancestraux. La parole est un acte de guérison. Chaque participante s'engage dans la durée (minimum 3 séances).",
    description: "Cercle féminin en visio pour explorer sa relation aux mères, grands-mères et lignées féminines. Un travail profond de réconciliation et de libération."
  },
  {
    id: 6,
    nom: "Cercle de la Forêt — Grenoble",
    type: "mixte",
    ville: "Grenoble",
    format: "presentiel",
    prix: 45,
    prochaine_date: "2026-03-22",
    places_restantes: 2,
    verifie: true,
    therapeute: {
      nom: "Thomas Vidal",
      initiales: "TV",
      bio: "Psychothérapeute et guide de nature. Pratique les cercles en plein air depuis 6 ans, intégrant les éléments naturels comme support thérapeutique.",
      approche: "Écopsychologie & plein air"
    },
    charte: "La nature est notre co-facilitatrice. Respect de l'environnement, des êtres présents et du silence. Ce cercle demande une présence physique et une tenue adaptée.",
    description: "Cercle de parole mixte en forêt, aux pieds du Vercors. Une expérience unique qui mêle marche, silence et parole dans un cadre naturel exceptionnel."
  }
];
```

**Step 2 : Commit**

```bash
git add src/data/cercles.js
git commit -m "feat: add static cercles data"
```

---

### Task 3 : HeroSection

**Files:**
- Create: `src/components/HeroSection.jsx`

**Step 1 : Créer le composant**

```jsx
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
```

**Step 2 : Commit**

```bash
git add src/components/HeroSection.jsx
git commit -m "feat: add HeroSection component"
```

---

### Task 4 : FilterBar

**Files:**
- Create: `src/components/FilterBar.jsx`

**Step 1 : Créer le composant**

```jsx
export default function FilterBar({ filtreType, filtreFormat, onTypeChange, onFormatChange, count }) {
  const types = [
    { value: 'tous', label: 'Tous' },
    { value: 'hommes', label: 'Hommes' },
    { value: 'femmes', label: 'Femmes' },
    { value: 'mixte', label: 'Mixte' },
  ];

  const formats = [
    { value: 'tous', label: 'Tous formats' },
    { value: 'presentiel', label: 'Présentiel' },
    { value: 'visio', label: 'Visio' },
  ];

  return (
    <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t.value}
                onClick={() => onTypeChange(t.value)}
                className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                  filtreType === t.value
                    ? 'bg-[#2D5016] border-[#2D5016] text-white'
                    : 'bg-white border-[#111111] text-[#111111] hover:border-[#2D5016] hover:text-[#2D5016]'
                }`}
              >
                {t.label}
              </button>
            ))}
            <span className="w-px bg-gray-200 mx-1" />
            {formats.map((f) => (
              <button
                key={f.value}
                onClick={() => onFormatChange(f.value)}
                className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                  filtreFormat === f.value
                    ? 'bg-[#2D5016] border-[#2D5016] text-white'
                    : 'bg-white border-[#111111] text-[#111111] hover:border-[#2D5016] hover:text-[#2D5016]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-400 font-medium">
            {count} cercle{count !== 1 ? 's' : ''} trouvé{count !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Step 2 : Commit**

```bash
git add src/components/FilterBar.jsx
git commit -m "feat: add FilterBar component"
```

---

### Task 5 : CercleCard

**Files:**
- Create: `src/components/CercleCard.jsx`

**Step 1 : Créer le composant**

```jsx
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
        {/* Header */}
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

        {/* Titre */}
        <h2 className="text-xl font-bold text-[#111111] mb-1 group-hover:text-[#2D5016] transition-colors">
          {cercle.nom}
        </h2>
        <p className="text-sm text-gray-500 mb-4">par {cercle.therapeute.nom}</p>

        {/* Infos */}
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

      {/* Footer */}
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
```

**Step 2 : Commit**

```bash
git add src/components/CercleCard.jsx
git commit -m "feat: add CercleCard component"
```

---

### Task 6 : CercleModal

**Files:**
- Create: `src/components/CercleModal.jsx`

**Step 1 : Créer le composant**

```jsx
import { useState, useEffect } from 'react';
import { X, MapPin, Monitor, Calendar, Users, CheckCircle, Shield } from 'lucide-react';

export default function CercleModal({ cercle, onClose }) {
  const [form, setForm] = useState({ prenom: '', email: '', message: '' });
  const [envoye, setEnvoye] = useState(false);

  // Fermer avec Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Bloquer le scroll du body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const dateFormatee = new Date(cercle.prochaine_date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // MVP : pas d'envoi réel, juste simulation
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
        {/* Header modale */}
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
          {/* Bio thérapeute */}
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

          {/* Description */}
          <section>
            <h3 className="font-bold text-[#111111] mb-2">À propos de ce cercle</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{cercle.description}</p>
          </section>

          {/* Infos pratiques */}
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

          {/* Charte éthique */}
          <section className="bg-gray-50 p-4 border-l-4 border-[#2D5016]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#2D5016]" />
              <h3 className="font-bold text-[#111111] text-sm">Cadre éthique du cercle</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{cercle.charte}</p>
          </section>

          {/* Formulaire de contact */}
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
```

**Step 2 : Commit**

```bash
git add src/components/CercleModal.jsx
git commit -m "feat: add CercleModal with contact form"
```

---

### Task 7 : TherapistCTA

**Files:**
- Create: `src/components/TherapistCTA.jsx`

**Step 1 : Créer le composant**

```jsx
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
```

**Step 2 : Commit**

```bash
git add src/components/TherapistCTA.jsx
git commit -m "feat: add TherapistCTA component"
```

---

### Task 8 : App.jsx — Assemblage final

**Files:**
- Modify: `src/App.jsx`

**Step 1 : Remplacer entièrement App.jsx**

```jsx
import { useState, useMemo } from 'react';
import { cercles } from './data/cercles';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import CercleCard from './components/CercleCard';
import CercleModal from './components/CercleModal';
import TherapistCTA from './components/TherapistCTA';

export default function App() {
  const [filtreType, setFiltreType] = useState('tous');
  const [filtreFormat, setFiltreFormat] = useState('tous');
  const [rechercheVille, setRechercheVille] = useState('');
  const [cercleSelectionne, setCercleSelectionne] = useState(null);

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
    <div className="min-h-screen bg-white">
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
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl font-medium mb-2">Aucun cercle trouvé</p>
            <p className="text-sm">Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cerclesFiltres.map((cercle) => (
              <CercleCard
                key={cercle.id}
                cercle={cercle}
                onClick={setCercleSelectionne}
              />
            ))}
          </div>
        )}
      </main>

      <TherapistCTA />

      {cercleSelectionne && (
        <CercleModal
          cercle={cercleSelectionne}
          onClose={() => setCercleSelectionne(null)}
        />
      )}
    </div>
  );
}
```

**Step 2 : Vérifier que tout fonctionne**

```bash
npm run dev
```

Expected : page complète avec Hero, filtres, 6 cartes, CTA. Cliquer sur une carte ouvre la modale. Les filtres réduisent les résultats.

**Step 3 : Commit final**

```bash
git add src/App.jsx
git commit -m "feat: assemble full MVP — cercle du bonheur"
```

---

## Résumé des fichiers créés

| Fichier | Rôle |
|---------|------|
| `src/data/cercles.js` | 6 cercles fictifs |
| `src/components/HeroSection.jsx` | Accroche + recherche ville |
| `src/components/FilterBar.jsx` | Filtres type + format |
| `src/components/CercleCard.jsx` | Carte d'un cercle |
| `src/components/CercleModal.jsx` | Modale détails + formulaire |
| `src/components/TherapistCTA.jsx` | Bloc d'appel thérapeutes |
| `src/App.jsx` | Assemblage + state global |

## Commande finale pour lancer

```bash
npm run dev
# → http://localhost:5173
```
