import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, ExternalLink, Mail, Users } from 'lucide-react';

interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  credentials: string[];
  experience: string;
  publications: string[];
  expertise: string[];
  email?: string;
  image?: string;
}

const authors: Author[] = [
  {
    id: 'pliev-vladimir',
    name: 'Плиев Владимир Бексултанович',
    title: 'Пресвитер, Руководитель ВЦ "Духовное Возрождение"',
    bio: 'Владимир Бексултанович служит пресвитером Владикавказской Церкви "Духовное Возрождение" ЕХБ более 20 лет. Имеет глубокий опыт духовного наставничества и преподавания библейских дисциплин. Специализируется на учении о молитвенной жизни и духовном росте.',
    credentials: [
      'Пресвитер церкви ЕХБ',
      'Более 20 лет пасторского служения',
      'Выпускник богословских курсов МСЦ ЕХБ',
      'Сертифицированный преподаватель библейских дисциплин'
    ],
    experience: 'Более 20 лет пасторского служения, духовного наставничества и преподавания. Провел сотни библейских исследований и семинаров по молитвенной жизни.',
    publications: [
      'Курс "Школа Молитвы" (6 уроков)',
      'Серия статей о водительстве Святым Духом',
      'Разборы посланий апостола Павла'
    ],
    expertise: [
      'Молитвенная жизнь',
      'Водительство Святым Духом',
      'Библейская антропология',
      'Духовные дисциплины'
    ],
    email: 'vladimir.pliev@shkola-molitvy.ru'
  },
  {
    id: 'editorial-team',
    name: 'Редакционная коллегия',
    title: 'Команда редакторов и богословов',
    bio: 'Редакционная коллегия состоит из опытных богословов, библеистов и редакторов, обеспечивающих точность и глубину материалов сайта. Все материалы проходят многоуровневую проверку на соответствие библейскому учению.',
    credentials: [
      'Коллективный опыт более 50 лет в богословии',
      'Знание библейских языков (греческий, иврит)',
      'Сотрудничество с богословскими учебными заведениями',
      'Членство в профессиональных богословских ассоциациях'
    ],
    experience: 'Редакционная коллегия обеспечивает богословскую точность всех материалов, проводит фактчекинг цитат из Писания и проверяет соответствие материалов ортодоксальному христианскому учению.',
    publications: [
      'Редактирование всех материалов сайта',
      'Проверка богословской точности',
      'Фактчекинг библейских цитат',
      'Рецензирование статей и уроков'
    ],
    expertise: [
      'Богословская редакция',
      'Библейские языки',
      'Фактчекинг',
      'Контроль качества'
    ],
    email: 'editors@shkola-molitvy.ru'
  }
];

export default function AuthorsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Вернуться на главную
      </Link>

      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Users className="w-4 h-4" />
          Наши авторы
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Команда «Школы Молитвы»
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Материалы сайта созданы опытными служителями и проверены редакционной коллегией богословов
        </p>
      </header>

      {/* Главный автор */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-5xl font-bold">
              {authors[0].name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {authors[0].name}
            </h2>
            <p className="text-amber-600 dark:text-amber-400 font-medium mb-4">
              {authors[0].title}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {authors[0].bio}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Квалификация и регалии
                </h3>
                <ul className="space-y-2">
                  {authors[0].credentials.map((cred, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-amber-500 mt-1">✓</span>
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  Экспертиза
                </h3>
                <div className="flex flex-wrap gap-2">
                  {authors[0].expertise.map((exp, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Опыт служения</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {authors[0].experience}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Публикации на сайте</h3>
              <ul className="space-y-1">
                {authors[0].publications.map((pub, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    <span>{pub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {authors[0].email && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${authors[0].email}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {authors[0].email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Редакционная коллегия */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white">
              <Users className="w-16 h-16" />
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {authors[1].name}
            </h2>
            <p className="text-purple-600 dark:text-purple-400 font-medium mb-4">
              {authors[1].title}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {authors[1].bio}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Квалификация
                </h3>
                <ul className="space-y-2">
                  {authors[1].credentials.map((cred, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Экспертиза
                </h3>
                <div className="flex flex-wrap gap-2">
                  {authors[1].expertise.map((exp, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Функции редакционной коллегии</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {authors[1].experience}
              </p>
            </div>

            {authors[1].email && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${authors[1].email}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {authors[1].email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Рецензирование */}
      <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          Процесс рецензирования
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Все материалы сайта проходят многоуровневую проверку качества:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-2xl mb-2">1️⃣</div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Богословская проверка</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Все материалы проверяются на соответствие библейскому учению и ортодоксальной христианской традиции
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-2xl mb-2">2️⃣</div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Фактчекинг</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Проверка всех цитат из Писания, исторических фактов и ссылок на авторитетные источники
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-2xl mb-2">3️⃣</div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Редактура</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Профессиональное редактирование для обеспечения ясности, точности и доступности материалов
            </p>
          </div>
        </div>
      </div>

      {/* Источники */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-500" />
          Авторитетные источники
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Материалы сайта основаны на следующих авторитетных источниках:
        </p>
        <div className="space-y-4">
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Священное Писание</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Синодальный перевод Библии — основной источник всех библейских цитат и учений
            </p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Классики христианской духовности</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Эндрю Мюррей — «В школе молитвы со Христом»</li>
              <li>• Вочман Ни — «Духовный человек», «Молитва об откровении»</li>
              <li>• Ричард Фостер — «Прославление дисциплины»</li>
            </ul>
          </div>
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Богословские учебные заведения</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Материалы соответствуют учению Российского объединенного Союза христиан веры евангельской (РОСХВЕ)
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
        >
          Узнать больше о проекте
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
