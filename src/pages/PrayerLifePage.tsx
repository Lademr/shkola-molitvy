import { Link } from 'react-router-dom';
import { BookOpen, Heart, Scroll, CheckSquare, FileText, ArrowRight } from 'lucide-react';

export default function PrayerLifePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Полное руководство
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Молитвенная жизнь: от основ к глубине
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Исчерпывающее руководство по развитию глубокой молитвенной жизни через водительство Святым Духом. 
          Структурированный путь от разделения духа и души до несомненной веры и ходатайства.
        </p>
      </header>

      {/* Быстрый ответ */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Что такое молитвенная жизнь?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
          <strong>Молитвенная жизнь — это не просто регулярные молитвы, а постоянное общение с Богом через возрожденный человеческий дух, 
          ведомое Святым Духом через интуицию, совесть и прямое общение.</strong>
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Истинная молитвенная жизнь требует разделения духа и души (Евр. 4:12), подчинения воли Царству Божьему (Мф. 6:33), 
          и обитания в тайной комнате внутреннего святилища (Мф. 6:6). Это переход от душевной активности к духовному водительству, 
          где Святой Дух становится главным источником силы, откровения и руководства.
        </p>
      </div>

      {/* Структура курса */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Структура обучения: Блок I — Основы духовной молитвы
        </h2>
        <div className="grid gap-4">
          <Link to="/lessons" className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Единственный Учитель
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Переход от автономии разума к водительству Духом и интуиции. Понимание роли Святого Духа как Единственного Первоисточника Божественной истины.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">1 Кор. 2:11-14</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Рим. 12:2</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">1 Кор. 14:15</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>

          <Link to="/lessons" className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Истинные поклонники
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Разделение духа, души и тела. Понимание трехчастной структуры человека и функций духа: интуиция, совесть, общение.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">1 Фес. 5:23</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Евр. 4:12</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Ин. 4:23-24</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>

          <Link to="/lessons" className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Наедине с Богом
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Тишина интуиции против шума чувств. Практика укрощения душевного шума и входа в тайную комнату внутреннего святилища.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Мф. 6:6</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Пс. 45:11</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">1 Пет. 3:4</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>

          <Link to="/lessons" className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Образец молитвы
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Воля Царства против эгоизма души. Разбор Молитвы Господней и приоритетов в молитве.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Мф. 6:9-13</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Мф. 6:33</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Лк. 22:41-42</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>

          <Link to="/lessons" className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                5
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Несомненный ответ
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Закон Царства и интуитивное озарение. Как обрести уверенность в ответе на молитву через свидетельство Духа.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Мк. 11:22-24</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">1 Ин. 5:14-15</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Евр. 11:1</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>

          <Link to="/lessons" className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                6
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Бесконечное отцовство
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Дух сыновства. Переход от рабского страха к сыновней любви и дерзновению в молитве.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Рим. 8:14-17</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Гал. 4:6-7</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">1 Ин. 3:1</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>

          <Link to="/lessons" className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                7
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Всеобъемлющий дар
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Святой Дух в глубине духа. Обитание Духа во Святом Святых и разделение душевного и духовного христианина.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Лк. 11:9-13</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">1 Кор. 3:16-17</span>
                  <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded text-xs">Иез. 36:26-27</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>
        </div>
      </section>

      {/* Связанные статьи */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Углубленные статьи по теме
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/blog" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Статья</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
              Всеобъемлющий дар: Святой Дух в глубине духа
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Почему Святой Дух является главным даром Небесного Отца? Разбор на основе трудов Эндрю Мюррея, Вочмана Ни и Ричарда Фостера.
            </p>
          </Link>

          <Link to="/blog" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Статья</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
              Бесконечное отцовство: Дух сыновства и преображение молитвы
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Как перейти от сиротского мышления к живому переживанию отцовства Бога? Разбор Рим. 8:15.
            </p>
          </Link>

          <Link to="/blog" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Статья</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
              Несомненный ответ на молитву: Закон Царства
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Почему молитвы остаются без ответа и как обрести твердую веру? Интуитивное озарение духа.
            </p>
          </Link>

          <Link to="/blog" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Статья</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
              Наедине с Богом: Тишина интуиции против шума чувств
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Как войти в тайную комнату и отключить душевный шум? Практическое руководство.
            </p>
          </Link>
        </div>
      </section>

      {/* Практические инструменты */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Практические инструменты
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/prayers" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group text-center">
            <Heart className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              Коллекция молитв
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Примеры молитв на разные случаи жизни
            </p>
          </Link>

          <Link to="/scripture" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group text-center">
            <Scroll className="w-12 h-12 text-sky-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              Разбор Писания
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Глубокие разборы ключевых текстов
            </p>
          </Link>

          <Link to="/diary" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all group text-center">
            <FileText className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              Молитвенный дневник
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Записывайте молитвы и ответы
            </p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">
          Начните свой путь к глубокой молитвенной жизни
        </h2>
        <p className="mb-6 text-amber-100">
          Присоединяйтесь к тысячам верующих, которые уже углубили свои отношения с Богом
        </p>
        <Link
          to="/lessons"
          className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-bold hover:bg-amber-50 transition-colors"
        >
          Начать с Урока 1
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
