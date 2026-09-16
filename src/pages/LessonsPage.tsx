import { useState } from 'react';
import { BookOpen, Clock, ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedLesson(null)}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Назад к урокам
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                selectedLesson.level === 'начальный' ? 'bg-green-400/30' :
                selectedLesson.level === 'средний' ? 'bg-yellow-400/30' :
                'bg-red-400/30'
              }`}>
                {selectedLesson.level}
              </span>
              <span className="flex items-center gap-1 text-amber-100 text-sm">
                <Clock className="w-3 h-3" /> {selectedLesson.duration}
              </span>
            </div>
            <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
            <p className="text-amber-100 mt-1">{selectedLesson.description}</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="prose prose-amber max-w-none">
              {selectedLesson.content.split('\n').map((line, i) => {
                if (line.startsWith('•') || line.startsWith('-')) {
                  return <p key={i} className="flex items-start gap-2 text-gray-700 mb-2"><span className="text-amber-500 mt-1">•</span>{line.slice(2)}</p>;
                }
                if (line.match(/^\d+\./)) {
                  return <p key={i} className="text-gray-700 mb-2 pl-4">{line}</p>;
                }
                if (line.startsWith('→')) {
                  return <p key={i} className="text-amber-700 bg-amber-50 rounded-lg p-3 mb-3 italic">{line}</p>;
                }
                if (line.startsWith('«') || line.startsWith('"')) {
                  return <p key={i} className="text-sky-700 bg-sky-50 rounded-lg p-3 mb-3 font-medium">{line}</p>;
                }
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="text-gray-700 mb-2 leading-relaxed">{line}</p>;
              })}
            </div>

            {!completedLessons.includes(selectedLesson.id) && (
              <button
                onClick={() => markComplete(selectedLesson.id)}
                className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Отметить как пройденный
              </button>
            )}
            {completedLessons.includes(selectedLesson.id) && (
              <div className="mt-8 w-full bg-green-50 text-green-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 border border-green-200">
                <CheckCircle2 className="w-5 h-5" />
                Урок пройден ✓
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">📖 Уроки молитвы</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Пошаговое обучение, которое поможет вам углубить отношения с Богом через молитву
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm">
          Пройдено: {completedLessons.length} из {lessons.length}
        </div>
      </div>

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
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                completedLessons.includes(lesson.id)
                  ? 'bg-green-100 text-green-600'
                  : 'bg-amber-100 text-amber-600'
              }`}>
                {completedLessons.includes(lesson.id) ? '✓' : index + 1}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    lesson.level === 'начальный' ? 'bg-green-100 text-green-700' :
                    lesson.level === 'средний' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {lesson.level}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{lesson.description}</p>
                <span className="flex items-center gap-1 text-gray-400 text-xs mt-2">
                  <Clock className="w-3 h-3" /> {lesson.duration}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
