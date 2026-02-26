/**
 * Convertit une chaîne en slug URL-safe
 * "Claire Fontaine" -> "claire-fontaine"
 * "Cercle des Origines — Nantes" -> "cercle-des-origines-nantes"
 */
export function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // supprime les accents
    .replace(/[—–]/g, '-')           // tirets longs → tirets
    .replace(/[^a-z0-9\s-]/g, '')    // supprime les caractères spéciaux
    .trim()
    .replace(/[\s-]+/g, '-');        // espaces et tirets multiples → un tiret
}

/**
 * Construit l'URL d'un cercle
 * "/cercles/nantes/claire-fontaine/cercle-des-origines-nantes"
 */
export function buildCercleUrl(cercle) {
  return `/cercles/${toSlug(cercle.ville)}/${toSlug(cercle.therapeute.nom)}/${toSlug(cercle.nom)}`;
}

/**
 * Retrouve un cercle depuis les paramètres URL
 * Retourne undefined si non trouvé
 */
export function findCercleBySlug(params, cercles) {
  return cercles.find((c) =>
    toSlug(c.ville) === params.ville &&
    toSlug(c.therapeute.nom) === params.therapeute &&
    toSlug(c.nom) === params.nom
  );
}
