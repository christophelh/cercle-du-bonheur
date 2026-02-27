import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const liens = [
  { label: "Qu'est-ce qu'un cercle ?", to: '/cercle-de-parole' },
  { label: 'Thérapeutes', to: '/therapeutes' },
];

export default function Navbar() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (to) =>
    `text-sm transition-colors no-underline ${
      pathname === to
        ? 'text-[#3ECEC6] font-medium'
        : 'font-light text-[#14171A]/60 hover:text-[#3ECEC6]'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[rgba(20,23,26,0.15)] shadow-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-medium text-[#14171A] text-base no-underline hover:text-[#3ECEC6] transition-colors">
          Les Cercles du Bonheur
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {liens.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(l.to)}>
              {l.label}
            </Link>
          ))}
          <Link
            to="/therapeutes"
            className="inline-flex items-center gap-1.5 bg-[#3ECEC6] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5dd8d1] transition-colors no-underline"
          >
            Référencer mon cercle
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 text-[#14171A]/60 hover:text-[#3ECEC6] transition-colors"
          onClick={() => setMenuOuvert((o) => !o)}
          aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOuvert}
        >
          {menuOuvert ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOuvert && (
        <div className="md:hidden border-t border-[rgba(20,23,26,0.06)] bg-white px-4 py-4 space-y-3">
          {liens.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOuvert(false)}
              className={`block py-2 ${linkClass(l.to)}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/therapeutes"
            onClick={() => setMenuOuvert(false)}
            className="flex items-center justify-center gap-1.5 bg-[#3ECEC6] text-white w-full py-3 rounded-xl text-sm font-medium hover:bg-[#5dd8d1] transition-colors no-underline mt-2"
          >
            Référencer mon cercle
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </nav>
  );
}
