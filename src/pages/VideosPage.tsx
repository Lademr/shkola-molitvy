import { useState } from 'react';
import { Video, Play, ExternalLink, Calendar, Clock } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  date: string;
  category: string;
}

const videos: VideoItem[] = [
  {
    id: '1',
    title: 'Основы молитвенной жизни',
    description: 'Введение в курс: что такое молитва, зачем она нужна и как начать строить регулярную молитвенную практику.',
    youtubeId: 'dQw4w9WgXcQ', // Замените на реальный YouTube ID
    duration: '15 мин',
    date: '2024-01-25',
    category: 'Основы'
  },
  {
    id: '2',
    title: 'Модель молитвы «Отче наш»',
    description: 'Глубокий разбор молитвы, которой Иисус научил учеников. Каждая фраза — это принцип молитвенной жизни.',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '20 мин',
    date: '2024-01-20',
    category: 'Основы'
  },
  {
    id: '3',
    title: 'Как слышать голос Бога',
    description: 'Практическое руководство по различению голоса Святого Духа через интуицию, Слово и обстоятельства.',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '25 мин',
    date: '2024-01-15',
    category: 'Продвинутое'
  },
  {
    id: '4',
    title: 'Молитва по Слову',
    description: 'Как превращать стихи Библии в личные молитвы и молиться по воле Бога.',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '18 мин',
    date: '2024-01-10',
    category: 'Практика'
  },
  {
    id: '5',
    title: 'Пост и молитва',
    description: 'Библейские основы поста, виды поста и как пост усиливает молитвенную жизнь.',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '22 мин',
    date: '2024-01-05',
    category: 'Практика'
  },
  {
    id: '6',
    title: 'Ходатайственная молитва',
    description: 'Как молиться за других эффективно. Примеры из Библии и практические советы.',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '28 мин',
    date: '2024-01-01',
    category: 'Продвинутое'
  },
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(videos.map(v => v.category))];

  const filteredVideos = selectedCategory
    ? videos.filter(v => v.category === selectedCategory)
    : videos;

  return (
    <div>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">🎥 Видеоуроки</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Смотрите видеоуроки для углубления понимания молитвенной жизни
        </p>
      </header>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            !selectedCategory ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Все
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Selected Video Player */}
      {selectedVideo && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="aspect-video bg-gray-900">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{selectedVideo.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedVideo.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedVideo.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(selectedVideo.date).toLocaleDateString('ru-RU')}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                {selectedVideo.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className={`text-left bg-white dark:bg-gray-800 rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all group ${
              selectedVideo?.id === video.id
                ? 'border-amber-400 dark:border-amber-600 ring-2 ring-amber-200 dark:ring-amber-800'
                : 'border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700'
            }`}
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-amber-400 to-orange-500 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-white text-xs font-medium">
                {video.duration}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                {video.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(video.date).toLocaleDateString('ru-RU')}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {video.category}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Note */}
      <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800 text-center">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          💡 Видеоуроки находятся в разработке. Скоро здесь появится полноценный видеоконтент!
        </p>
      </div>
    </div>
  );
}
