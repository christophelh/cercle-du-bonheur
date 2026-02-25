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
