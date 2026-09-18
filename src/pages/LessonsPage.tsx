import { useState, useEffect } from 'react';
import { BookOpen, Clock, ArrowLeft, CheckCircle2, ChevronRight, Scroll, Lightbulb, Target, Pencil, Sparkles, ArrowRight, CheckSquare, XCircle } from 'lucide-react';
import { lessons, Lesson } from '../data/lessons';
import { useUser } from '../contexts/UserContext';
import FloatingTOC from '../components/FloatingTOC';
import ReviewerBlock from '../components/ReviewerBlock';
import CitationBlock from '../components/CitationBlock';

export default function LessonsPage() {
  const { user, isLoggedIn, completeLesson } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Скролл к началу при открытии урока
  useEffect(() => {
    if (selectedLesson) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedLesson]);
  
  // Используем данные из UserContext если пользователь авторизован, иначе localStorage
  const [localCompletedLessons, setLocalCompletedLessons] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  const completedLessons = isLoggedIn && user ? user.completedLessons : localCompletedLessons;

  const markComplete = (id: number) => {
    if (isLoggedIn) {
      // Сохраняем в UserContext для авторизованных пользователей
      completeLesson(id);
    } else {
      // Сохраняем в localStorage для неавторизованных
      const updated = [...new Set([...localCompletedLessons, id])];
      setLocalCompletedLessons(updated);
      localStorage.setItem('completedLessons', JSON.stringify(updated));
    }
  };

  if (selectedLesson) {
    return <LessonDetail lesson={selectedLesson} onBack={() => setSelectedLesson(null)} onComplete={markComplete} isCompleted={completedLessons.includes(selectedLesson.id)} />;
  }

  return (
    <div>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">📖 Уроки молитвенной жизни</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Пошаговое обучение, которое поможет вам углубить отношения с Богом через водительство Духом
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm">
          Пройдено: {completedLessons.length} из {lessons.length}
        </div>
      </header>

      <div className="grid gap-4">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            className={`text-left bg-white rounded-xl p-5 shadow-sm border hover:shadow-md hover:border-amber-200 transition-all group ${
              completedLessons.includes(lesson.id) ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                completedLessons.includes(lesson.id)
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
              }`}>
                {completedLessons.includes(lesson.id) ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold text-gray-800 text-lg">{lesson.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    lesson.level === 'начальный' ? 'bg-green-100 text-green-700' :
                    lesson.level === 'средний' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {lesson.level}
                  </span>
                </div>
                <p className="text-amber-600 text-sm font-medium italic mb-1">{lesson.subtitle}</p>
                <p className="text-gray-500 text-sm">{lesson.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock className="w-3 h-3" /> {lesson.duration}
                  </span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-gray-400 text-xs">{lesson.quizQuestions.length} вопросов</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LessonDetail({ lesson, onBack, onComplete, isCompleted }: { lesson: Lesson; onBack: () => void; onComplete: (id: number) => void; isCompleted: boolean }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'scriptures' | 'analysis' | 'quiz' | 'homework'>('overview');
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(new Array(lesson.quizQuestions.length).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const tabs = [
    { id: 'overview' as const, label: 'Обзор', icon: BookOpen },
    { id: 'scriptures' as const, label: 'Писание', icon: Scroll },
    { id: 'analysis' as const, label: 'Разбор', icon: Lightbulb },
    { id: 'quiz' as const, label: 'Тест', icon: CheckSquare },
    { id: 'homework' as const, label: 'Задание', icon: Pencil },
  ];

  const quizScore: number = quizAnswers.filter((ans, i) => ans === lesson.quizQuestions[i].correctAnswer).length;

  // Данные для плавающего оглавления
  const tocItems = [
    { id: 'main-thought', title: 'Главная мысль', level: 1 },
    { id: 'scriptures', title: 'Тексты Писания', level: 1 },
    { id: 'analysis', title: 'Разбор', level: 1 },
    { id: 'memory-verse', title: 'Стих для заучивания', level: 2 },
    { id: 'homework', title: 'Домашнее задание', level: 1 },
    { id: 'quiz', title: 'Тест', level: 1 },
  ];

  // Данные для блока рецензирования
  const reviewers = [
    {
      name: 'Плиев Владимир Бексултанович',
      title: 'Пресвитер, Руководитель ВЦ «Духовное Возрождение»',
      credentials: [
        'Более 20 лет пасторского служения',
        'Специалист по молитвенной жизни',
        'Выпускник богословских курсов МСЦ ЕХБ'
      ]
    }
  ];

  // Данные для цитирования
  const citations = [
    {
      source: 'Вочман Ни, «Духовный человек»',
      author: 'Watchman Nee',
      year: '1928',
      quote: 'Дух — это орган богопознания, через который мы непосредственно воспринимаем Бога.'
    },
    {
      source: 'Эндрю Мюррей, «В школе молитвы со Христом»',
      author: 'Andrew Murray',
      year: '1895'
    },
    {
      source: 'Ричард Фостер, «Прославление дисциплины»',
      author: 'Richard Foster',
      year: '1978'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-6 min-h-[48px]">
        <ArrowLeft className="w-4 h-4" /> Назад к урокам
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">Урок {lesson.id}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            lesson.level === 'начальный' ? 'bg-green-400/30' :
            lesson.level === 'средний' ? 'bg-yellow-400/30' :
            'bg-red-400/30'
          }`}>
            {lesson.level}
          </span>
          <span className="flex items-center gap-1 text-white/80 text-xs">
            <Clock className="w-3 h-3" /> {lesson.duration}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-white/90 text-lg italic">{lesson.subtitle}</p>
      </div>

      {/* Блок рецензирования (E-E-A-T) */}
      <ReviewerBlock 
        reviewers={reviewers} 
        reviewDate="2024-02-20"
        lastUpdated="2024-02-20"
      />

      {/* Tabs - Улучшенный дизайн для мобильных устройств */}
      <div className="mb-6">
        {/* Подсказка для мобильных */}
        <div className="lg:hidden mb-3 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <span className="text-base">💡</span>
            <span>Выберите раздел для просмотра содержимого урока</span>
          </p>
        </div>

        {/* Вкладки */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Плавный скролл к началу контента на мобильных
                  if (window.innerWidth < 1024) {
                    setTimeout(() => {
                      const contentElement = document.getElementById('tab-content');
                      if (contentElement) {
                        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }
                }}
                className={`relative flex flex-col md:flex-row items-center justify-center gap-2 px-4 py-4 md:py-3 rounded-xl font-medium transition-all min-h-[64px] md:min-h-[48px] ${
                  isActive
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg scale-105 ring-2 ring-amber-300 dark:ring-amber-600'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 hover:text-amber-700 dark:hover:text-amber-400 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600'
                }`}
              >
                <Icon className={`w-6 h-6 md:w-5 md:h-5 ${isActive ? 'text-white' : 'text-amber-500'}`} />
                <span className="text-sm md:text-xs font-semibold">{tab.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-md md:hidden"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div id="tab-content" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 border-gray-200 dark:border-gray-700 p-4 md:p-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div id="main-thought" className="pb-6 border-b-2 border-gray-100 dark:border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-amber-500" /> Главная мысль урока
              </h2>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 md:p-6 border-2 border-amber-200 dark:border-amber-800">
                {lesson.mainThought.split('\n').map((p, i) => (
                  <p key={i} className="text-gray-700 dark:text-gray-200 leading-relaxed mb-3 last:mb-0 text-base md:text-lg">{p}</p>
                ))}
              </div>
            </div>

            {/* Memory Verse */}
            <div id="memory-verse" className="pb-6 border-b-2 border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-5 md:p-6 border-2 border-sky-200 dark:border-sky-800">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-sky-600 dark:text-sky-400" />
                  <span className="text-sky-700 dark:text-sky-300 font-bold text-sm md:text-base">Стих для заучивания</span>
                </div>
                <p className="text-sky-900 dark:text-sky-100 italic text-lg md:text-xl leading-relaxed mb-2">«{lesson.memoryVerse.text}»</p>
                <p className="text-sky-700 dark:text-sky-300 font-semibold text-sm md:text-base">— {lesson.memoryVerse.reference}</p>
              </div>
            </div>

            {/* Bridge to next */}
            <div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-5 md:p-6 border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🔥</span>
                  <span className="font-bold text-purple-800 dark:text-purple-200 text-lg md:text-xl">Мостик к следующему уроку</span>
                </div>
                {lesson.bridgeToNext.split('\n').map((p, i) => (
                  <p key={i} className="text-purple-700 dark:text-purple-200 leading-relaxed mb-2 last:mb-0 text-base">{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scriptures' && (
          <div id="scriptures" className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
              <Scroll className="w-6 h-6 md:w-7 md:h-7 text-amber-500" /> Тексты Писания
            </h2>
            {lesson.scriptures.map((s, i) => (
              <div key={i} className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-5 md:p-6 border-2 border-sky-200 dark:border-sky-800">
                <p className="text-sky-700 dark:text-sky-300 font-bold text-base md:text-lg mb-3">{s.reference}</p>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic text-base md:text-lg">«{s.text}»</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div id="analysis" className="space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
              <Lightbulb className="w-6 h-6 md:w-7 md:h-7 text-amber-500" /> Разбор текстов Писания
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base italic mb-6">Метод изучения: Последовательный индуктивно-молитвенный разбор стихов на основе методологии активного изучения Библии</p>

            {/* Stage 1 */}
            <div className="border-l-4 border-amber-400 pl-4 md:pl-5 pb-6 mb-6 border-b-2 border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg md:text-xl mb-3">
                <span className="text-amber-500">ЭТАП 1:</span> {lesson.analysis.stage1.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 italic">(О чём говорит текст?)</p>
              <div className="space-y-3">
                {lesson.analysis.stage1.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-300 dark:bg-amber-700 text-amber-900 dark:text-amber-100 flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 2 */}
            <div className="border-l-4 border-sky-400 pl-4 md:pl-5 pb-6 mb-6 border-b-2 border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg md:text-xl mb-3">
                <span className="text-sky-500">ЭТАП 2:</span> {lesson.analysis.stage2.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 italic">(Что это означает?)</p>
              <div className="space-y-3">
                {lesson.analysis.stage2.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-sky-200 dark:border-sky-800">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-300 dark:bg-sky-700 text-sky-900 dark:text-sky-100 flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 3 - Acronym */}
            <div className="border-l-4 border-purple-400 pl-4 md:pl-5">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg md:text-xl mb-4">
                <span className="text-purple-500">ЭТАП 3:</span> {lesson.analysis.stage3.title}
              </h3>
              <div className="grid gap-3">
                {lesson.analysis.stage3.acronym.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-800">
                    <span className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-xl md:text-2xl shadow-md">{item.letter}</span>
                    <div className="flex-1">
                      <p className="font-bold text-purple-800 dark:text-purple-200 text-sm md:text-base mb-1">{item.word}</p>
                      <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div id="quiz" className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
              <CheckSquare className="w-6 h-6 md:w-7 md:h-7 text-amber-500" /> Тест для усвоения урока
            </h2>

            {lesson.quizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-xl p-5 md:p-6 border-2 border-gray-200 dark:border-gray-700">
                <p className="font-bold text-gray-800 dark:text-gray-100 mb-4 text-base md:text-lg">
                  <span className="text-amber-500">Вопрос {qIndex + 1}:</span> {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === q.correctAnswer;
                    let style = 'border-gray-200 dark:border-gray-600 hover:border-amber-200 dark:hover:border-amber-600 bg-white dark:bg-gray-700';
                    
                    if (quizSubmitted) {
                      if (isCorrect) style = 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/30';
                      else if (isSelected && !isCorrect) style = 'border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/30';
                      else style = 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 opacity-60';
                    } else if (isSelected) {
                      style = 'border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/30';
                    }

                    return (
                      <button
                        key={oIndex}
                        onClick={() => !quizSubmitted && setQuizAnswers(prev => {
                          const updated = [...prev];
                          updated[qIndex] = oIndex;
                          return updated;
                        })}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${style}`}
                      >
                        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          quizSubmitted && isCorrect ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100' :
                          quizSubmitted && isSelected && !isCorrect ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-100' :
                          isSelected ? 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-100' :
                          'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-200">{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />}
                        {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 ml-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className="mt-3 bg-sky-50 dark:bg-sky-900/30 rounded-lg p-3 border border-sky-100 dark:border-sky-800">
                    <p className="text-sky-800 dark:text-sky-200 text-sm"><strong>Пояснение:</strong> {q.explanation}</p>
                  </div>
                )}
              </div>
            ))}

            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={quizAnswers.some(a => a === null)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Проверить ответы
              </button>
            ) : (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl p-5 border border-emerald-200 dark:border-emerald-800 text-center">
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-1">{quizScore} из {lesson.quizQuestions.length}</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                  {quizScore === lesson.quizQuestions.length ? '🎉 Отлично! Все ответы верны!' :
                   quizScore >= lesson.quizQuestions.length / 2 ? '👍 Хороший результат! Перечитайте разбор.' :
                   '📖 Рекомендуем перечитать урок.'}
                </p>
                <button
                  onClick={() => { setQuizSubmitted(false); setQuizAnswers(new Array(lesson.quizQuestions.length).fill(null)); }}
                  className="mt-3 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  Пройти заново
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'homework' && (
          <div id="homework" className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
              <Pencil className="w-6 h-6 md:w-7 md:h-7 text-amber-500" /> Домашнее практическое задание
            </h2>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 md:p-6 border-2 border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-4 text-lg md:text-xl">{lesson.homework.title}</h3>
              <div className="space-y-5">
                {lesson.homework.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold text-base md:text-lg shadow-md">
                      {i + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-gray-800 dark:text-gray-100 text-base md:text-lg mb-2">
                        {step.title}
                        {step.duration && <span className="text-amber-600 dark:text-amber-400 font-normal ml-2 text-sm md:text-base">({step.duration})</span>}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-5 md:p-6 border-2 border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-lg md:text-xl flex items-center gap-2">
                <span className="text-2xl">📝</span> Практика проверки интуиции Словом
              </h3>
              <p className="text-purple-700 dark:text-purple-200 text-sm md:text-base leading-relaxed">
                В течение недели при возникновении внутренних побуждений не спешите действовать импульсивно и не отвергайте их сразу. Запишите их и проверьте обновлённым разумом на соответствие Библии.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Complete button */}
      <div className="mt-6">
        {!isCompleted ? (
          <button
            onClick={() => onComplete(lesson.id)}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-medium hover:from-emerald-600 hover:to-green-600 transition-all flex items-center justify-center gap-2 shadow-sm min-h-[48px]"
          >
            <CheckCircle2 className="w-5 h-5" />
            Отметить урок как пройденный
          </button>
        ) : (
          <div className="w-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 py-4 rounded-xl font-medium flex items-center justify-center gap-2 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-5 h-5" />
            Урок пройден ✓
          </div>
        )}
      </div>

      {/* Блок цитирования первоисточников */}
      <CitationBlock citations={citations} />

      {/* Плавающее оглавление */}
      <FloatingTOC items={tocItems} />
    </div>
  );
}
