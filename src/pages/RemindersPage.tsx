import { useState, useEffect } from 'react';
import { Bell, Clock, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface Reminder {
  id: number;
  time: string;
  label: string;
  enabled: boolean;
  days: string[];
}

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('prayerReminders');
    return saved ? JSON.parse(saved) : [
      { id: 1, time: '07:00', label: 'Утренняя молитва', enabled: true, days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
      { id: 2, time: '12:00', label: 'Молитва в полдень', enabled: false, days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'] },
      { id: 3, time: '21:00', label: 'Вечерняя молитва', enabled: true, days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
    ];
  });

  const [showAdd, setShowAdd] = useState(false);
  const [newTime, setNewTime] = useState('08:00');
  const [newLabel, setNewLabel] = useState('');
  const [newDays, setNewDays] = useState<string[]>(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']);

  useEffect(() => {
    localStorage.setItem('prayerReminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (!newLabel.trim()) return;
    const newReminder: Reminder = {
      id: Date.now(),
      time: newTime,
      label: newLabel,
      enabled: true,
      days: newDays,
    };
    setReminders([...reminders, newReminder]);
    setNewLabel('');
    setShowAdd(false);
  };

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleDay = (day: string) => {
    setNewDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">⏰ Напоминания о молитве</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Настройте регулярные напоминания для молитвы. Дисциплина молитвы — ключ к духовному росту.
        </p>
      </header>

      {/* Tips */}
      <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 mb-8">
        <h3 className="font-bold text-purple-800 mb-2">💡 Советы по молитвенной дисциплине</h3>
        <ul className="text-purple-700 text-sm space-y-1">
          <li>• Молитесь в одно и то же время каждый день — это формирует привычку</li>
          <li>• Начните с коротких молитв (5-10 минут) и постепенно увеличивайте</li>
          <li>• Найдите тихое место, где вас никто не побеспокоит</li>
          <li>• Используйте молитвенный список для ходатайства</li>
        </ul>
      </div>

      {/* Reminders List */}
      <div className="space-y-3 mb-6">
        {reminders.map(reminder => (
          <div
            key={reminder.id}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
              reminder.enabled ? 'border-purple-200' : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleReminder(reminder.id)}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  reminder.enabled ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {reminder.enabled ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </button>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-800">{reminder.time}</span>
                  <span className="text-gray-600">{reminder.label}</span>
                </div>
                <div className="flex gap-1 mt-1">
                  {dayLabels.map(day => (
                    <span
                      key={day}
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        reminder.days.includes(day)
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      {!showAdd ? (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full bg-white rounded-xl p-4 shadow-sm border border-dashed border-gray-300 hover:border-purple-300 hover:bg-purple-50/50 transition-all flex items-center justify-center gap-2 text-gray-500 hover:text-purple-600"
        >
          <Plus className="w-5 h-5" /> Добавить напоминание
        </button>
      ) : (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-200">
          <h3 className="font-bold text-gray-800 mb-4">Новое напоминание</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Название</label>
              <input
                type="text"
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                placeholder="Например: Утренняя молитва"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Время</label>
              <input
                type="time"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Дни недели</label>
              <div className="flex gap-2">
                {dayLabels.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      newDays.includes(day)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={addReminder}
                className="flex-grow bg-gradient-to-r from-purple-500 to-violet-500 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-violet-600 transition-all"
              >
                Сохранить
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Motivation */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm italic">
          «Молитесь непрестанно» — 1 Фессалоникийцам 5:17
        </p>
      </div>
    </div>
  );
}
