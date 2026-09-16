import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { FileText, Plus, CheckCircle2, Circle, Trash2, Calendar, Filter, BookOpen } from 'lucide-react';

const categories = [
  { id: 'просьба', label: 'Просьба', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { id: 'благодарность', label: 'Благодарность', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { id: 'поклонение', label: 'Поклонение', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { id: 'исповедание', label: 'Исповедание', color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  { id: 'ходатайство', label: 'Ходатайство', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
] as const;

export default function DiaryPage() {
  const { user, isLoggedIn, addDiaryEntry, updateDiaryEntry, deleteDiaryEntry, updatePrayerStreak } = useUser();
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [newPrayer, setNewPrayer] = useState('');
  const [newCategory, setNewCategory] = useState<'просьба' | 'благодарность' | 'поклонение' | 'исповедание' | 'ходатайство'>('просьба');

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <FileText className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Молитвенный дневник</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Войдите в систему, чтобы вести молитвенный дневник и отслеживать ответы на молитвы
          </p>
          <Link
            to="/profile"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Войти / Зарегистрироваться
          </Link>
        </div>
      </div>
    );
  }

  const filteredEntries = filter === 'all'
    ? user!.diaryEntries
    : user!.diaryEntries.filter(e => e.category === filter);

  const answeredCount = user!.diaryEntries.filter(e => e.answered).length;
  const pendingCount = user!.diaryEntries.filter(e => !e.answered).length;

  const handleAdd = () => {
    if (!newPrayer.trim()) return;
    addDiaryEntry({
      date: new Date().toISOString(),
      prayerRequest: newPrayer,
      answered: false,
      category: newCategory,
    });
    updatePrayerStreak();
    setNewPrayer('');
    setShowAdd(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">🙏 Молитвенный дневник</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Записывайте молитвы и отмечайте ответы. Это укрепляет веру и помогает видеть верность Бога.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user!.diaryEntries.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Всего записей</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{answeredCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Отвечено</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">В процессе</p>
        </div>
      </div>

      {/* Add button */}
      {!showAdd ? (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-dashed border-gray-300 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 mb-6"
        >
          <Plus className="w-5 h-5" /> Добавить новую запись
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-amber-200 dark:border-amber-700 mb-6">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Новая запись</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-2 block">Категория</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setNewCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      newCategory === cat.id
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">Молитва</label>
              <textarea
                value={newPrayer}
                onChange={e => setNewPrayer(e.target.value)}
                placeholder="О чём вы молитесь? Запишите свою просьбу, благодарение или ходатайство..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900 outline-none resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-grow bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                Сохранить
              </button>
              <button
                onClick={() => { setShowAdd(false); setNewPrayer(''); }}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            filter === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Все
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              filter === cat.id ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'all' ? 'Пока нет записей. Начните вести молитвенный дневник!' : 'Нет записей в этой категории'}
            </p>
          </div>
        ) : (
          filteredEntries.map(entry => (
            <div
              key={entry.id}
              className={`bg-white dark:bg-gray-800 rounded-xl p-5 border transition-all ${
                entry.answered
                  ? 'border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/10'
                  : 'border-gray-100 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    categories.find(c => c.id === entry.category)?.color
                  }`}>
                    {entry.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(entry.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <button
                  onClick={() => deleteDiaryEntry(entry.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-3">{entry.prayerRequest}</p>

              {entry.answer && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-100 dark:border-green-800 mb-3">
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">✨ Ответ на молитву:</p>
                  <p className="text-green-800 dark:text-green-200 text-sm">{entry.answer}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateDiaryEntry(entry.id, { answered: !entry.answered })}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    entry.answered
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400'
                  }`}
                >
                  {entry.answered ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  {entry.answered ? 'Отвечено' : 'Отметить как отвеченное'}
                </button>

                {entry.answered && !entry.answer && (
                  <button
                    onClick={() => {
                      const answer = prompt('Как Бог ответил на эту молитву?');
                      if (answer) updateDiaryEntry(entry.id, { answer });
                    }}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    + Добавить свидетельство
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
