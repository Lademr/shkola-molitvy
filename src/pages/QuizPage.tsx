import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';
import { quizzes } from '../data/quizzes';

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const startQuiz = (index: number) => {
    setSelectedQuiz(index);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers([]);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    const quiz = quizzes[selectedQuiz!];
    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    setAnswers([...answers, selectedAnswer]);
  };

  const nextQuestion = () => {
    const quiz = quizzes[selectedQuiz!];
    if (currentQuestion + 1 >= quiz.questions.length) {
      setQuizComplete(true);
    } else {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz === null) {
    return (
      <div>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">✅ Тесты знаний</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Проверьте свои знания о молитвенной жизни и духовном росте
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {quizzes.map((quiz, index) => (
            <button
              key={index}
              onClick={() => startQuiz(index)}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">{quiz.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{quiz.description}</p>
              <p className="text-emerald-600 text-xs mt-1 font-medium">{quiz.questions.length} вопросов</p>
              <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                Начать тест <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const quiz = quizzes[selectedQuiz];

  if (quizComplete) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            percentage >= 80 ? 'bg-green-100 text-green-600' :
            percentage >= 60 ? 'bg-yellow-100 text-yellow-600' :
            'bg-red-100 text-red-600'
          }`}>
            <Trophy className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Тест завершён!</h2>
          <p className="text-gray-500 mb-4">{quiz.title}</p>
          <div className="text-4xl font-bold text-amber-600 mb-2">{score}/{quiz.questions.length}</div>
          <p className="text-gray-500 mb-6">
            {percentage >= 80 ? '🎉 Отлично! Вы хорошо знаете материал!' :
             percentage >= 60 ? '👍 Хорошо! Но есть куда расти.' :
             '📖 Рекомендуем пройти уроки ещё раз.'}
          </p>

          {/* Answers review */}
          <div className="text-left space-y-3 mb-6">
            {quiz.questions.map((q, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm ${
                answers[i] === q.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <p className="font-medium text-gray-800">{q.question}</p>
                <p className={`mt-1 ${answers[i] === q.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                  {answers[i] === q.correctAnswer ? '✓ Верно' : `✗ Ваш ответ: ${q.options[answers[i]]}`}
                </p>
                {answers[i] !== q.correctAnswer && (
                  <p className="text-green-700 mt-1">Правильный ответ: {q.options[q.correctAnswer]}</p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Выбрать другой тест
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={resetQuiz} className="text-amber-600 hover:text-amber-700 font-medium text-sm">
          ← Выйти
        </button>
        <span className="text-gray-500 text-sm">
          Вопрос {currentQuestion + 1} из {quiz.questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all"
          style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, i) => {
            let className = 'w-full text-left p-4 rounded-xl border-2 transition-all ';
            if (!showResult) {
              className += selectedAnswer === i
                ? 'border-amber-400 bg-amber-50 text-gray-800'
                : 'border-gray-200 hover:border-amber-200 hover:bg-amber-50/50 text-gray-700';
            } else {
              if (i === question.correctAnswer) {
                className += 'border-green-400 bg-green-50 text-green-800';
              } else if (i === selectedAnswer && i !== question.correctAnswer) {
                className += 'border-red-400 bg-red-50 text-red-800';
              } else {
                className += 'border-gray-200 text-gray-400';
              }
            }

            return (
              <button
                key={i}
                onClick={() => !showResult && setSelectedAnswer(i)}
                className={className}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showResult && i === question.correctAnswer ? 'bg-green-200 text-green-800' :
                    showResult && i === selectedAnswer && i !== question.correctAnswer ? 'bg-red-200 text-red-800' :
                    selectedAnswer === i ? 'bg-amber-200 text-amber-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{option}</span>
                  {showResult && i === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />}
                  {showResult && i === selectedAnswer && i !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-sky-50 rounded-xl border border-sky-100">
            <p className="text-sky-800 text-sm">{question.explanation}</p>
          </div>
        )}

        <div className="mt-6">
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Проверить ответ
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-green-600 transition-all flex items-center justify-center gap-2"
            >
              {currentQuestion + 1 >= quiz.questions.length ? 'Завершить тест' : 'Следующий вопрос'} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
