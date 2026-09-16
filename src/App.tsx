import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Heart, MessageCircle, CheckSquare, Bell, Sparkles, Home, Menu, X } from 'lucide-react';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import PrayersPage from './pages/PrayersPage';
import ScripturePage from './pages/ScripturePage';
import QuizPage from './pages/QuizPage';
import RemindersPage from './pages/RemindersPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/prayers" element={<PrayersPage />} />
            <Route path="/scripture" element={<ScripturePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/lessons', label: 'Уроки', icon: BookOpen },
    { path: '/prayers', label: 'Молитвы', icon: Heart },
    { path: '/scripture', label: 'Писание', icon: BookOpen },
    { path: '/quiz', label: 'Тесты', icon: CheckSquare },
    { path: '/reminders', label: 'Напоминания', icon: Bell },
    { path: '/feedback', label: 'Связь', icon: MessageCircle },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-amber-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-lg text-gray-800">Молитвенная жизнь</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-amber-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-amber-100 mt-2 pt-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-gray-600 hover:bg-amber-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-white/60 border-t border-amber-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-sm">
          ✝️ Молитвенная жизнь — Интерактивное обучение для христиан
        </p>
        <p className="text-gray-400 text-xs mt-2">
          «Непрестанно молитесь» — 1 Фессалоникийцам 5:17
        </p>
      </div>
    </footer>
  );
}

export default App;
