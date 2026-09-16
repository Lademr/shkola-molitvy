import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { dailyVerses } from '../data/scriptures';

interface ScriptureStudy {
  id: number;
  reference: string;
  text: string;
  context: string;
  analysis: string;
  application: string;
}

const scriptureStudies: ScriptureStudy[] = [
  {
    id: 1,
    reference: "Иоанна 15:5",
    text: "Я есмь лоза, а вы ветви; кто пребывает во Мне, и Я в нём, тот приносит много плода: ибо без Меня не можете делать ничего.",
    context: "Иисус говорит эти слова ученикам на Тайной Вечере, незадолго до Своего распятия. Это часть прощальной беседы, где Он объясняет отношения между Ним и учениками через образ виноградника.",
    analysis: "Образ лозы и ветвей — один из самых глубоких в Новом Завете. Лоза — источник жизни для ветвей. Ветвь не может жить самостоятельно — она полностью зависит от лозы. Так и верующий не может приносить духовный плод без постоянного соединения с Христом.\n\nКлючевые моменты:\n• «Пребывает во Мне» — это постоянное, непрерывное общение\n• «Много плода» — результат близости с Богом, а не человеческих усилий\n• «Без Меня не можете» — абсолютная зависимость от Христа\n\nСлово «плод» здесь относится к характеру (Гал. 5:22-23), служению (Ин. 4:35-36) и свидетельству (Ин. 15:16).",
    application: "Как «пребывать» в Христе практически? Через ежедневное чтение Слова, молитву, послушание и общение с другими верующими. Задайте себе вопрос: где я пытаюсь действовать своими силами, вместо того чтобы черпать силу от Христа?"
  },
  {
    id: 2,
    reference: "Филиппийцам 4:6-7",
    text: "Не заботьтесь ни о чём, но всегда в молитве и прошении с благодарением открывайте свои желания пред Богом, и мир Божий, который превыше всякого ума, соблюдёт сердца ваши и помышления ваши во Христе Иисусе.",
    context: "Павел пишет это письмо из тюрьмы. Несмотря на неопределённость своего будущего, он говорит филиппийцам о мире и радости. Это не теория — это опыт человека, который жил этим.",
    analysis: "Этот отрывок содержит формулу духовного покоя:\n\n1. ЗАПРЕТ: «Не заботьтесь» — не переживайте тревожно. Это не значит не планировать, а не позволять тревоге править вами.\n\n2. ПРЕДПИСАНИЕ: «В молитве открывайте» — замените беспокойство молитвой. Каждую тревогу превращайте в обращение к Богу.\n\n3. ОТНОШЕНИЕ: «С благодарением» — благодарность меняет перспективу. Когда мы благодарим, мы вспоминаем, что Бог уже делал.\n\n4. ОБЕЩАНИЕ: «Мир Божий соблюдёт» — результат не всегда изменение обстоятельств, но внутренний мир, который охраняет нас.\n\nСлово «соблюдёт» (φρουρήσει) — военный термин, означающий «охранять как гарнизон». Мир Божий стоит на страже нашего сердца.",
    application: "Создайте практику: каждый раз, когда чувствуете тревогу, сразу превращайте это в молитву с благодарением. Записывайте, как Бог даёт мир в конкретных ситуациях."
  },
  {
    id: 3,
    reference: "Псалом 45:11",
    text: "Остановитесь и познайте, что Я — Бог: буду превознесён в народах, превознесён на земле.",
    context: "Этот псалом написан в контексте национальной угрозы. Израиль окружён врагами, народы шумят, земли трясёт. Но посреди хаоса Бог говорит: «Остановитесь».",
    analysis: "Оригинальный еврейский текст содержит глубокую игру слов:\n\n«Остановитесь» (הַרְפּוּ — harpu) — буквально «отпустите руки», «прекратите бороться». Это призыв перестать суетиться и довериться.\n\n«Познайте» (דְּעוּ — du) — не интеллектуальное знание, а глубокое, опытное познание через остановку и тишину.\n\nПарадокс: в момент наибольшей опасности Бог призывает не к действию, а к остановке. Не к бездействию, а к доверию.\n\nЭтот стих учит нас:\n• Божий суверенитет не зависит от нашей суеты\n• Познание Бога приходит в тишине\n• Когда мы «отпускаем руки», Бог действует",
    application: "Выделите 10 минут тишины сегодня. Не молитесь словами — просто будьте в присутствии Бога. «Отпустите руки» от контроля и позвольте Ему быть Богом в вашей ситуации."
  },
  {
    id: 4,
    reference: "Римлянам 8:28",
    text: "Притом знаем, что любящим Бога, призванным по Его изволению, всё содействует ко благу.",
    context: "Павел пишет римлянам о глубинах Божьего плана спасения. Глава 8 — вершина его богословия, где он описывает уверенность верующего в Христе.",
    analysis: "Один из самых цитируемых, но часто неправильно понимаемых стихов.\n\nВажные уточнения:\n• «Любящим Бога» — обещание не универсальное, а для тех, кто в отношениях с Богом\n• «Всё содействует» — не всё само по себе хорошо, но Бог использует всё для добра\n• «Ко благу» — не обязательно к комфорту или успеху, а к духовному росту и подобию Христа (см. ст. 29)\n\nГреческое слово «συνεργεί» (synergei) — «работает вместе». Как оркестр: каждый инструмент может звучать отдельно, но дирижёр создаёт из всего гармонию.\n\nЭто не значит, что зло — это хорошо. Это значит, что Бог достаточно могущественен, чтобы даже зло использовать для Своей цели.",
    application: "Вспомните ситуацию в вашей жизни, которая казалась плохой, но Бог использовал её для добра. Запишите это и благодарите Его. Это укрепит веру для будущих испытаний."
  },
  {
    id: 5,
    reference: "Матфея 6:6",
    text: "Ты же, когда молишься, войди в комнату твою и, затворив дверь, помолись Отцу твоему, Который втайне; и Отец твой, видящий тайное, воздаст тебе явно.",
    context: "Часть Нагорной проповеди. Иисус критикует лицемерную молитву фарисеев, которые молятся напоказ, и даёт инструкцию об истинной молитве.",
    analysis: "Иисус противопоставляет два вида молитвы:\n\n1. МОЛИТВА НАПОКАЗ (ст. 5): «На углах улиц, чтобы показаться людям» — мотив: слава от людей. Результат: «получают награду свою» (только человеческое одобрение).\n\n2. МОЛИТВА ВТАЙНЕ (ст. 6): «Войди в комнату, затвори дверь» — мотив: общение с Отцом. Результат: «Отец... воздаст явно».\n\n«Комната» (ταμεῖον — tameion) — это внутренняя кладовая, самое укромное место в доме. Образ глубокой интимности с Богом.\n\nПринципы:\n• Тайная молитва — основа духовной жизни\n• Бог ценит искренность больше публичности\n• То, что происходит в тайне, формирует наш публичный характер\n• «Воздаст явно» — Бог откроет плоды тайной молитвы в вашей жизни",
    application: "Создайте «тайное место» — физическое место, где вы можете уединиться для молитвы. Начните с 15 минут в день. Это основа всей молитвенной жизни."
  }
];

export default function ScripturePage() {
  const [selectedStudy, setSelectedStudy] = useState<ScriptureStudy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudies = scriptureStudies.filter(s =>
    s.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedStudy) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedStudy(null)}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-6"
        >
          ← Назад к Писанию
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white">
            <span className="text-sky-100 text-sm font-medium">Разбор Писания</span>
            <h1 className="text-2xl font-bold mt-1">{selectedStudy.reference}</h1>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Text */}
            <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span className="text-sky-600 font-medium text-sm">Текст</span>
              </div>
              <p className="text-sky-900 italic text-lg leading-relaxed">
                «{selectedStudy.text}»
              </p>
            </div>

            {/* Context */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Контекст
              </h3>
              <p className="text-gray-600 leading-relaxed">{selectedStudy.context}</p>
            </div>

            {/* Analysis */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                Глубокий разбор
              </h3>
              <div className="text-gray-600 leading-relaxed space-y-3">
                {selectedStudy.analysis.split('\n').map((line, i) => {
                  if (line.startsWith('•')) return <p key={i} className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>{line.slice(2)}</p>;
                  if (line.match(/^\d+\./)) return <p key={i} className="pl-4">{line}</p>;
                  if (line.trim() === '') return null;
                  return <p key={i}>{line}</p>;
                })}
              </div>
            </div>

            {/* Application */}
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                <span className="text-lg">💡</span>
                Применение
              </h3>
              <p className="text-amber-900 leading-relaxed">{selectedStudy.application}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">📖 Изучение Писания</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Глубокие разборы ключевых текстов Библии с контекстом, анализом и практическим применением
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по стихам..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Studies List */}
      <div className="grid gap-4">
        {filteredStudies.map(study => (
          <button
            key={study.id}
            onClick={() => setSelectedStudy(study)}
            className="text-left bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-sky-200 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-800">{study.reference}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {study.text.substring(0, 120)}...
                </p>
                <p className="text-sky-600 text-xs mt-2 font-medium">
                  Контекст → Разбор → Применение
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Daily Verses Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">✨ Стихи для размышления</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {dailyVerses.slice(0, 6).map((verse, i) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="text-gray-700 text-sm italic">«{verse.verse}»</p>
              <p className="text-amber-600 text-xs font-medium mt-2">— {verse.reference}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
