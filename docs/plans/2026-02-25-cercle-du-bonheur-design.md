# Design Doc — Cercle du Bonheur MVP
Date : 2026-02-25

## Contexte
Plateforme de référencement de cercles de parole en France (hommes, femmes, mixtes).
Objectif : apporteur d'affaires (lead generator) pour thérapeutes et facilitateurs.

## Stack technique
- Vite + React
- Tailwind CSS (npm install)
- Lucide React (icônes)
- Données JSON statiques (pas de backend)

## Palette de couleurs
- Blanc : #FFFFFF (fond principal)
- Noir : #111111 (textes, titres)
- Vert : #2D5016 (CTA, badges, accents, hover)

## Structure des fichiers
```
cercle-du-bonheur/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── cercles.js
    └── components/
        ├── HeroSection.jsx
        ├── FilterBar.jsx
        ├── CercleCard.jsx
        ├── CercleModal.jsx
        └── TherapistCTA.jsx
```

## Composants

### HeroSection
- Fond blanc, titre grand format noir
- Barre de recherche par ville (input texte)
- Bouton CTA vert "Explorer les cercles"

### FilterBar
- Pills toggle : Tous / Hommes / Femmes / Mixte
- Second groupe : Tous formats / Présentiel / Visio
- Actif = fond vert + texte blanc. Inactif = bordure noire + texte noir
- Compteur "X cercles trouvés"

### CercleCard
- Fond blanc, bordure fine noire, hover = bordure verte
- Titre, thérapeute, ville + format, prochaine date, prix/séance
- Badge "Vérifié ✓" vert en haut à droite
- Bouton "Voir le cercle" vert

### CercleModal
- Overlay noir semi-transparent, carte blanche centrée
- Sections : bio thérapeute / infos pratiques / charte éthique / formulaire contact
- Formulaire : Prénom, Email, Message + bouton "Demander une place"
- Fermeture : croix + clic outside

### TherapistCTA
- Bloc fond vert, texte blanc
- "Vous animez un cercle de parole ? Référencez-le gratuitement."
- Bouton blanc avec texte vert

## State management
Tout dans App.jsx via useState :
- `filtreType` : 'tous' | 'hommes' | 'femmes' | 'mixte'
- `filtreFormat` : 'tous' | 'presentiel' | 'visio'
- `rechercheVille` : string
- `cercleSelectionne` : null | cercle object

## Données fictives (src/data/cercles.js)
6 cercles :
1. Cercle d'Hommes — Lyon | Hommes | Présentiel | 35€ | Marc Dupont
2. Tente Rouge — Paris | Femmes | Présentiel | 40€ | Sophie Renard
3. Cercle Vivant — Bordeaux | Mixte | Présentiel | 30€ | Julien Moreau
4. Cercle du Père — Toulouse | Hommes | Visio | 25€ | Ahmed Bensalem
5. Cercle des Origines — Nantes | Femmes | Visio | 35€ | Claire Fontaine
6. Cercle de la Forêt — Grenoble | Mixte | Présentiel | 45€ | Thomas Vidal

Champs par cercle : id, nom, type, ville, format, prix, prochaine_date,
therapeute {nom, bio, approche, photo_initiales}, charte, places_restantes, verifie
