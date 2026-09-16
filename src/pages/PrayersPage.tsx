import { useState } from 'react';
import { Heart, BookOpen, X } from 'lucide-react';
import { prayers, prayerCategories, Prayer } from '../data/prayers';

export default function PrayersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favoritePrayers');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('favoritePrayers', JSON.stringify(updated));
  };

  const filteredPrayers = selectedCategory
    ? prayers.filter(p => p.category === selectedCategory)
    : prayers;

  if (selectedPrayer) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedPrayer(null)}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-6"
        >
          ← Назад к молитвам
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-rose-100 text-sm">{selectedPrayer.category}</span>
                <h1 className="text-2xl font-bold mt-1">{selectedPrayer.title}</h1>
              </div>
              <button
                onClick={() => toggleFavorite(selectedPrayer.id)}
                className={`p-2 rounded-full ${favorites.includes(selectedPrayer.id) ? 'bg-white/30' : 'hover:bg-white/20'} transition-colors`}
              >
                <Heart className={`w-6 h-6 ${favorites.includes(selectedPrayer.id) ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {selectedPrayer.text}
            </p>

            {selectedPrayer.scripture && (
              <div className="mt-8 bg-sky-50 rounded-xl p-4 border border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span className="text-sky-600 font-medium text-sm">Связанный стих</span>
                </div>
                <p className="text-sky-800 italic">{selectedPrayer.scripture}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">🙏 Коллекция молитв</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Молитвы на каждый день и для особых случаев. Выберите категорию или молитесь любой из них.
        </p>
      </header>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !selectedCategory ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        {prayerCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prayer Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredPrayers.map(prayer => (
          <button
            key={prayer.id}
            onClick={() => setSelectedPrayer(prayer)}
            className="text-left bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-rose-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-rose-500 font-medium">{prayer.category}</span>
                <h3 className="font-bold text-gray-800 mt-1">{prayer.title}</h3>
              </div>
              <Heart
                className={`w-5 h-5 flex-shrink-0 ${
                  favorites.includes(prayer.id) ? 'text-rose-500 fill-rose-500' : 'text-gray-300'
                }`}
                onClick={(e) => { e.stopPropagation(); toggleFavorite(prayer.id); }}
              />
            </div>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
              {prayer.text.substring(0, 100)}...
            </p>
            {prayer.scripture && (
              <p className="text-sky-600 text-xs mt-2 italic">
                {prayer.scripture.split('—')[0]}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
