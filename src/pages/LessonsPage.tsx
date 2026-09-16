import { useState } from 'react';
import { BookOpen, Clock, ArrowLeft, CheckCircle2, ChevronRight, Scroll, Lightbulb, Target, Pencil, Sparkles, ArrowRight, CheckSquare, XCircle } from 'lucide-react';
import { lessons, Lesson } from '../data/lessons';

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  const markComplete = (id: number) => {
    const updated = [...new Set([...completedLessons, id])];
    setCompletedLessons(updated);
    localStorage.setItem('completedLessons', JSON.stringify(updated));
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

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-6">
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

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 mb-6 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-500 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-500" /> Главная мысль урока
              </h2>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                {lesson.mainThought.split('\n').map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-3 last:mb-0">{p}</p>
                ))}
              </div>
            </div>

            {/* Memory Verse */}
            <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span className="text-sky-600 font-medium text-sm">Стих для заучивания</span>
              </div>
              <p className="text-sky-900 italic text-lg leading-relaxed">«{lesson.memoryVerse.text}»</p>
              <p className="text-sky-600 font-medium mt-2 text-sm">— {lesson.memoryVerse.reference}</p>
            </div>

            {/* Bridge to next */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔥</span>
                <span className="font-bold text-purple-800">Мостик к следующему уроку</span>
              </div>
              {lesson.bridgeToNext.split('\n').map((p, i) => (
                <p key={i} className="text-purple-700 leading-relaxed mb-2 last:mb-0">{p}</p>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'scriptures' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Scroll className="w-5 h-5 text-amber-500" /> Тексты Писания
            </h2>
            {lesson.scriptures.map((s, i) => (
              <div key={i} className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                <p className="text-sky-600 font-bold text-sm mb-2">{s.reference}</p>
                <p className="text-gray-700 leading-relaxed italic">«{s.text}»</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Разбор текстов Писания
            </h2>
            <p className="text-gray-500 text-sm italic">Метод изучения: Последовательный индуктивно-молитвенный разбор стихов на основе методологии активного изучения Библии</p>

            {/* Stage 1 */}
            <div className="border-l-4 border-amber-400 pl-5">
              <h3 className="font-bold text-gray-800 text-lg mb-3">
                <span className="text-amber-500">ЭТАП 1:</span> {lesson.analysis.stage1.title}
              </h3>
              <p className="text-gray-500 text-sm mb-3 italic">(О чём говорит текст?)</p>
              <div className="space-y-3">
                {lesson.analysis.stage1.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-amber-50/50 rounded-lg p-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 2 */}
            <div className="border-l-4 border-sky-400 pl-5">
              <h3 className="font-bold text-gray-800 text-lg mb-3">
                <span className="text-sky-500">ЭТАП 2:</span> {lesson.analysis.stage2.title}
              </h3>
              <p className="text-gray-500 text-sm mb-3 italic">(Что это означает?)</p>
              <div className="space-y-3">
                {lesson.analysis.stage2.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-sky-50/50 rounded-lg p-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 3 - Acronym */}
            <div className="border-l-4 border-purple-400 pl-5">
              <h3 className="font-bold text-gray-800 text-lg mb-3">
                <span className="text-purple-500">ЭТАП 3:</span> {lesson.analysis.stage3.title}
              </h3>
              <div className="grid gap-3">
                {lesson.analysis.stage3.acronym.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-purple-50/50 rounded-lg p-3">
                    <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white flex items-center justify-center font-bold text-lg">{item.letter}</span>
                    <div>
                      <p className="font-bold text-purple-800 text-sm">{item.word}</p>
                      <p className="text-gray-700 text-sm leading-relaxed mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-amber-500" /> Тест для усвоения урока
            </h2>

            {lesson.quizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="font-bold text-gray-800 mb-3">
                  <span className="text-amber-500">Вопрос {qIndex + 1}:</span> {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === q.correctAnswer;
                    let style = 'border-gray-200 hover:border-amber-200 bg-white';
                    
                    if (quizSubmitted) {
                      if (isCorrect) style = 'border-green-400 bg-green-50';
                      else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50';
                      else style = 'border-gray-200 bg-white opacity-60';
                    } else if (isSelected) {
                      style = 'border-amber-400 bg-amber-50';
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
                          quizSubmitted && isCorrect ? 'bg-green-200 text-green-800' :
                          quizSubmitted && isSelected && !isCorrect ? 'bg-red-200 text-red-800' :
                          isSelected ? 'bg-amber-200 text-amber-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span className="text-sm text-gray-700">{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />}
                        {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 ml-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className="mt-3 bg-sky-50 rounded-lg p-3 border border-sky-100">
                    <p className="text-sky-800 text-sm"><strong>Пояснение:</strong> {q.explanation}</p>
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
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200 text-center">
                <p className="text-2xl font-bold text-emerald-700 mb-1">{quizScore} из {lesson.quizQuestions.length}</p>
                <p className="text-emerald-600 text-sm">
                  {quizScore === lesson.quizQuestions.length ? '🎉 Отлично! Все ответы верны!' :
                   quizScore >= lesson.quizQuestions.length / 2 ? '👍 Хороший результат! Перечитайте разбор.' :
                   '📖 Рекомендуем перечитать урок.'}
                </p>
                <button
                  onClick={() => { setQuizSubmitted(false); setQuizAnswers(new Array(lesson.quizQuestions.length).fill(null)); }}
                  className="mt-3 text-emerald-600 text-sm font-medium hover:text-emerald-700"
                >
                  Пройти заново
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'homework' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-amber-500" /> Домашнее практическое задание
            </h2>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
              <h3 className="font-bold text-amber-800 mb-4">{lesson.homework.title}</h3>
              <div className="space-y-4">
                {lesson.homework.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-gray-800 text-sm">
                        {step.title}
                        {step.duration && <span className="text-amber-600 font-normal ml-2">({step.duration})</span>}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <h3 className="font-bold text-purple-800 mb-2">📝 Практика проверки интуиции Словом</h3>
              <p className="text-purple-700 text-sm leading-relaxed">
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
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-medium hover:from-emerald-600 hover:to-green-600 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5" />
            Отметить урок как пройденный
          </button>
        ) : (
          <div className="w-full bg-green-50 text-green-700 py-4 rounded-xl font-medium flex items-center justify-center gap-2 border border-green-200">
            <CheckCircle2 className="w-5 h-5" />
            Урок пройден ✓
          </div>
        )}
      </div>
    </div>
  );
}
