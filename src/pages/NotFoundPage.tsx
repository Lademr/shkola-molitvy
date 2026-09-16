import { Link } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-amber-500 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Страница не найдена
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            К сожалению, страница, которую вы ищете, не существует или была перемещена.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            Возможно, вы искали:
          </h2>
          <div className="space-y-3">
            <Link
              to="/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Home className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Главная страница
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Начните с главной страницы сайта
                </p>
              </div>
            </Link>

            <Link
              to="/lessons"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Уроки молитвы
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Перейти к урокам молитвенной жизни
                </p>
              </div>
            </Link>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
