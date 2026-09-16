import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 признаков того, что ваша молитвенная жизнь нуждается в обновлении",
    excerpt: "Как понять, что вы застряли в рутине и пора сделать шаг вперёд? Разбираем ключевые сигналы.",
    content: "Многие христиане сталкиваются с периодом, когда молитва становится формальной, сухой, лишённой жизни. Это нормально — но важно вовремя распознать этот сигнал и предпринять шаги к обновлению.\n\nПризнак 1: Молитва стала механической\nВы молитесь по привычке, но сердце не вовлечено. Слова идут, а связи с Богом нет.\n\nПризнак 2: Вы не замечаете ответов\nБог действует, но вы настолько привыкли к «тишине», что перестаёте распознавать Его голос.\n\nПризнак 3: Нет желания молиться\nВместо радости от общения с Отцом вы чувствуете обязанность.\n\nПризнак 4: Духовная сухость\nСлово Божье не «горит» в сердце, как раньше.\n\nПризнак 5: Отсутствие плода\nГалатам 5:22-23 перечисляет плод Духа. Если его нет в вашей жизни — это сигнал.\n\nЧто делать? Начните с малого: вернитесь к тайной молитве, обновите разум Словом, ведите дневник. Бог всегда готов к общению — нужно лишь наше сердце.",
    date: "2024-01-25",
    readTime: "5 мин",
    tags: ["молитвенная жизнь", "духовный рост"],
    author: "Школа Молитвы"
  },
  {
    id: 2,
    title: "Что такое интуиция духа и как её развивать?",
    excerpt: "Интуиция — это не мистика, а реальный орган восприятия, данный каждому возрождённому верующему.",
    content: "Многие христиане путают интуицию духа с эмоциями или воображением. Но это разные вещи.\n\nИнтуиция духа — это способность, данная Святым Духом, непосредственно воспринимать Божью волю без цепочки логических рассуждений. Это тихий внутренний голос, который знает прежде, чем разум анализирует.\n\nКак отличить интуицию духа от эмоций?\n• Эмоции бурные, интуиция тихая\n• Эмоции проходят, интуиция остаётся\n• Эмоции эгоцентричны, интуиция богоцентрична\n\nКак развивать?\n1. Практикуйте тишину перед Богом\n2. Читайте Слово медленно, позволяя Духу говорить\n3. Записывайте внутренние побуждения\n4. Проверяйте их через Писание\n5. Будьте послушны — чем больше слушаете, тем яснее слышите\n\nИнтуиция духа — это дар, который нужно тренировать. Не бойтесь ошибиться — Бог милостив и исправит ваш путь.",
    date: "2024-01-20",
    readTime: "7 мин",
    tags: ["Святой Дух", "интуиция", "водительство"],
    author: "Школа Молитвы"
  },
  {
    id: 3,
    title: "Молитва P-R-A-Y: простая структура для ежедневного общения с Богом",
    excerpt: "Акростих, который поможет вам молиться полноценно и не забывать о важных аспектах.",
    content: "Многие верующие жалуются: «Не знаю, о чём молиться». Решение — структура P-R-A-Y.\n\nP — Praise (Прославление)\nНачните с того, Кто есть Бог. Прославьте Его за характер, дела, верность. Это настраивает сердце на правильную волну.\n\nR — Repent (Покаяние)\nИсповедуйте грехи. Дух Святой освещает то, что нужно исправить. Не проходите этот этап — он очищает канал общения.\n\nA — Ask (Просьба)\nТеперь просите. За себя, за близких, за церковь, за нужды. Бог хочет, чтобы мы просили!\n\nY — Yield (Посвящение)\nЗавершите посвящением: «Господь, я отдаю Тебе этот день. Пусть будет воля Твоя».\n\nЭта структура занимает 15-20 минут и покрывает все аспекты молитвенной жизни. Попробуйте сегодня!",
    date: "2024-01-15",
    readTime: "4 мин",
    tags: ["практика", "структура молитвы", "ежедневная молитва"],
    author: "Школа Молитвы"
  },
  {
    id: 4,
    title: "Почему важно вести молитвенный дневник?",
    excerpt: "Простая практика, которая радикально меняет молитвенную жизнь и укрепляет веру.",
    content: "Молитвенный дневник — это не просто запись. Это инструмент веры.\n\nЗачем он нужен?\n\n1. Память о верности Бога\nМы забываем. Через месяц не помним, за что молились. Дневник напоминает, как Бог отвечал.\n\n2. Рост веры\nКогда вы видите pattern ответов, вера укрепляется. Вы начинаете узнавать голос Бога.\n\n3. Фокус\nЗапись молитв делает их конкретными. Не «помоги мне», а «Господь, дай мудрости в решении X».\n\n4. Отчётность\nВы видите, за что молились месяц назад. Это дисциплинирует и мотивирует.\n\n5. Свидетельство\nВаш дневник — это история верности Бога. Её можно рассказывать другим для их ободрения.\n\nКак вести?\n• Записывайте дату\n• Формулируйте конкретно\n• Оставляйте место для ответа\n• Возвращайтесь и отмечайте исполнение\n• Благодарите Бога за ответы\n\nНачните сегодня. Через год вы будете поражены, сколько раз Бог был верен.",
    date: "2024-01-10",
    readTime: "6 мин",
    tags: ["дневник", "практика", "вера"],
    author: "Школа Молитвы"
  },
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = [...new Set(blogPosts.flatMap(p => p.tags))];

  const filteredPosts = selectedTag
    ? blogPosts.filter(p => p.tags.includes(selectedTag))
    : blogPosts;

  if (selectedPost) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium mb-6"
        >
          ← Назад к статьям
        </button>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {selectedPost.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-amber-100 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(selectedPost.date).toLocaleDateString('ru-RU')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {selectedPost.readTime}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {selectedPost.content.split('\n').map((line, i) => {
              if (line.trim() === '') return <br key={i} />;
              if (line.match(/^\d+\./)) {
                return <p key={i} className="text-gray-700 dark:text-gray-200 mb-2 pl-4 leading-relaxed">{line}</p>;
              }
              if (line.startsWith('•')) {
                return <p key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 mb-2"><span className="text-amber-500 mt-1">•</span>{line.slice(2)}</p>;
              }
              return <p key={i} className="text-gray-700 dark:text-gray-200 mb-3 leading-relaxed">{line}</p>;
            })}

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">Понравилась статья?</p>
              <Link
                to="/lessons"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                Перейти к урокам <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">📝 Блог</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Статьи о молитвенной жизни, духовном росте и практических аспектах хождения с Богом
        </p>
      </header>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            !selectedTag ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Все
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedTag === tag ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.map(post => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="text-left bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-amber-200 dark:hover:border-amber-700 transition-all group overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString('ru-RU')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
