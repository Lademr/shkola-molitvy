import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Target, Heart, Mail, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Вернуться на главную
      </Link>

      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            О проекте «Школа Молитвы»
          </h1>
        </div>

        <div className="prose prose-amber dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Наша миссия
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">
              «Школа Молитвы» — это бесплатный интерактивный образовательный ресурс, созданный для помощи христианам в развитии глубокой и осмысленной молитвенной жизни. Мы верим, что молитва — это не просто религиозный ритуал, а живое общение с Богом, которое требует понимания, практики и духовного роста.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Наша цель — помочь верующим перейти от формальной молитвы к подлинному общению с Отцом, научиться слышать голос Святого Духа и строить свою духовную жизнь на библейских основаниях.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Что мы предлагаем
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-100">Структурированные уроки</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  6 фундаментальных уроков, охватывающих основы молитвенной жизни: от разделения духа и души до несомненной веры.
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-100">Практические задания</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Конкретные упражнения для применения полученных знаний в повседневной молитвенной практике.
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-100">Сообщество</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Возможность общаться с единомышленниками, делиться опытом и поддерживать друг друга в духовном росте.
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-100">Молитвенный дневник</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Инструмент для записи молитв и отслеживания ответов Бога, укрепляющий веру.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Богословские основания
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Материалы «Школы Молитвы» основаны на:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Священном Писании (Синодальный перевод)</li>
              <li>Трудах классиков христианской духовности: Эндрю Мюррея, Вочмана Ни, Ричарда Фостера</li>
              <li>Библейской антропологии (трихотомия: дух, душа, тело)</li>
              <li>Практике созерцательной молитвы и духовных дисциплин</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Мы стремимся представить сбалансированное учение, избегая крайностей эмоционализма с одной стороны и сухого рационализма с другой.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Для кого этот ресурс
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              «Школа Молитвы» предназначена для:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Новообращенных христиан, желающих научиться молиться</li>
              <li>Верующих, испытывающих сухость или rutine в молитвенной жизни</li>
              <li>Тех, кто хочет углубить понимание духовных процессов</li>
              <li>Церковных служителей, ищущих материалы для обучения</li>
              <li>Всех, кто стремится к более близким отношениям с Богом</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Команда проекта
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              «Школа Молитвы» создана командой христианских авторов и редакторов, имеющих многолетний опыт духовного наставничества и преподавания. Мы объединяем богословские знания с практическим опытом молитвенной жизни.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Редакционная коллегия:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Авторы уроков — служители с опытом более 15 лет</li>
              <li>Редакторы — специалисты по богословию и библейским языкам</li>
              <li>Техническая команда — разработчики и дизайнеры</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Наши принципы
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Библейская верность</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Все учения основаны на Священном Писании и проверяются через призму библейской истины.
                </p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Практическая применимость</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Мы предлагаем не только теорию, но и конкретные практики для ежедневного применения.
                </p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Доступность</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Все материалы полностью бесплатны и доступны каждому желающему.
                </p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Уважение к читателю</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Мы не навязываем свои взгляды, но предлагаем инструменты для личного духовного поиска.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Контакты
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <strong>Общие вопросы:</strong> <a href="mailto:info@shkola-molitvy.ru" className="text-amber-600 dark:text-amber-400 hover:underline">info@shkola-molitvy.ru</a>
                </p>
                <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <strong>Обратная связь:</strong> <a href="mailto:feedback@shkola-molitvy.ru" className="text-amber-600 dark:text-amber-400 hover:underline">feedback@shkola-molitvy.ru</a>
                </p>
                <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <strong>Веб-сайт:</strong> <a href="https://shkola-molitvy.ru" className="text-amber-600 dark:text-amber-400 hover:underline">shkola-molitvy.ru</a>
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Благодарности
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Мы выражаем благодарность:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Авторам цитируемых трудов за их вклад в христианскую духовную литературу</li>
              <li>Нашим читателям и пользователям за обратную связь и поддержку</li>
              <li>Всем, кто молится за развитие этого служения</li>
            </ul>
          </section>

          <section>
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white text-center">
              <h2 className="text-xl font-bold mb-3">Начните свой путь сегодня</h2>
              <p className="mb-4 text-amber-100">
                Присоединяйтесь к тысячам верующих, которые уже углубили свою молитвенную жизнь с помощью «Школы Молитвы»
              </p>
              <Link
                to="/lessons"
                className="inline-block bg-white text-amber-600 px-6 py-3 rounded-lg font-bold hover:bg-amber-50 transition-colors"
              >
                Начать обучение
              </Link>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
