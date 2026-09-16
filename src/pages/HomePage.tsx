import { Link } from 'react-router-dom';
import { BookOpen, Heart, CheckSquare, Bell, MessageCircle, Sparkles, ArrowRight, Scroll, FileText } from 'lucide-react';
import { getDailyVerse, getDailyMotivation } from '../data/scriptures';
import { lessons } from '../data/lessons';

export default function HomePage() {
  const dailyVerse = getDailyVerse();
  const motivation = getDailyMotivation();
  const latestLesson = lessons[lessons.length - 1];

  const sections = [
    { path: '/lessons', title: 'Уроки', description: 'Глубокое обучение молитвенной жизни', icon: BookOpen, color: 'from-amber-400 to-orange-500' },
    { path: '/prayers', title: 'Молитвы', description: 'Примеры молитв на каждый день', icon: Heart, color: 'from-rose-400 to-pink-500' },
    { path: '/scripture', title: 'Писание', description: 'Тексты и глубокие разборы', icon: Scroll, color: 'from-sky-400 to-blue-500' },
    { path: '/blog', title: 'Блог', description: 'Статьи о молитвенной жизни', icon: FileText, color: 'from-indigo-400 to-purple-500' },
    { path: '/quiz', title: 'Тесты', description: 'Проверь свои знания', icon: CheckSquare, color: 'from-emerald-400 to-green-500' },
    { path: '/reminders', title: 'Напоминания', description: 'Настрой время для молитвы', icon: Bell, color: 'from-purple-400 to-violet-500' },
    { path: '/feedback', title: 'Обратная связь', description: 'Связь с наставником и братьями', icon: MessageCircle, color: 'from-teal-400 to-cyan-500' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <header className="text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Добро пожаловать!
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Углуби свою <span className="text-amber-600">молитвенную жизнь</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Интерактивная платформа для тех, кто хочет развивать глубокие отношения с Богом через водительство Духом, изучение Слова и духовный рост.
        </p>
      </header>

      {/* Daily Verse */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium text-amber-100">Стих дня</span>
        </div>
        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-3">
          «{dailyVerse.verse}»
        </blockquote>
        <p className="text-amber-100 font-medium">— {dailyVerse.reference}</p>
      </div>

      {/* Motivation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100 text-center">
        <p className="text-lg text-gray-700 italic">{motivation}</p>
      </div>

      {/* Latest Lesson Highlight */}
      {latestLesson && (
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 rounded-2xl p-6 md:p-8 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">НОВЫЙ УРОК</span>
            <span className="text-purple-600 text-sm font-medium">Урок {latestLesson.id}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{latestLesson.title}</h2>
          <p className="text-amber-600 font-medium italic mb-3">{latestLesson.subtitle}</p>
          <p className="text-gray-600 mb-5 line-clamp-2">{latestLesson.description}</p>
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
          >
            Начать урок <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <Link
              key={section.path}
              to={section.path}
              className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{section.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{section.description}</p>
              <span className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium group-hover:gap-2 transition-all">
                Перейти <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 border border-sky-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 С чего начать?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl mb-2">📖</div>
            <h3 className="font-bold text-gray-800 mb-1">Шаг 1: Уроки</h3>
            <p className="text-gray-500 text-sm">Начни с Урока 1 «Единственный Учитель» — пойми, как Дух Божий ведёт тебя</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl mb-2">🙏</div>
            <h3 className="font-bold text-gray-800 mb-1">Шаг 2: Практика</h3>
            <p className="text-gray-500 text-sm">Выполняй домашние задания и молись по структуре P-R-A-Y каждый день</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-bold text-gray-800 mb-1">Шаг 3: Рост</h3>
            <p className="text-gray-500 text-sm">Проходи тесты, изучай разбор Писания и делись опытом с другими</p>
          </div>
        </div>
      </div>
    </div>
  );
}
