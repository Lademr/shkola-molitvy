import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, User, ThumbsUp, Calendar } from 'lucide-react';

interface ForumPost {
  id: number;
  author: string;
  text: string;
  date: string;
  likes: number;
  lessonRef?: string;
}

export default function CommunityPage() {
  const { user, isLoggedIn } = useUser();
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('forumPosts');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        author: 'Мария К.',
        text: 'Урок 1 полностью изменил моё понимание молитвы! Раньше я думала, что нужно «отключать» разум, а теперь поняла — нужно обновлять его Словом. Спасибо за глубокий разбор!',
        date: '2024-01-15',
        likes: 12,
        lessonRef: 'Урок 1',
      },
      {
        id: 2,
        author: 'Алексей П.',
        text: 'Кто-нибудь практикует структуру P-R-A-Y из домашнего задания? Поделитесь опытом — как вам?',
        date: '2024-01-18',
        likes: 8,
        lessonRef: 'Урок 1',
      },
      {
        id: 3,
        author: 'Елена С.',
        text: 'Начала вести молитвенный дневник по совету с сайта. Уже за неделю вижу, как Бог отвечает! Это укрепляет веру невероятно.',
        date: '2024-01-20',
        likes: 15,
      },
      {
        id: 4,
        author: 'Дмитрий В.',
        text: 'Вопрос к тем, кто давно в молитвенной жизни: как вы различаете голос Бога от своих мыслей? Особенно в сложных ситуациях.',
        date: '2024-01-22',
        likes: 20,
      },
    ];
  });
  const [newPost, setNewPost] = useState('');
  const [lessonRef, setLessonRef] = useState('');

  useEffect(() => {
    localStorage.setItem('forumPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = () => {
    if (!newPost.trim() || !user) return;
    const post: ForumPost = {
      id: Date.now(),
      author: user.name,
      text: newPost,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      lessonRef: lessonRef || undefined,
    };
    setPosts([post, ...posts]);
    setNewPost('');
    setLessonRef('');
  };

  const likePost = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <MessageCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Сообщество учеников</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Войдите, чтобы общаться с другими учениками, делиться опытом и задавать вопросы
          </p>
          <Link
            to="/profile"
            className="inline-block bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-violet-600 transition-all"
          >
            Войти / Зарегистрироваться
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">💬 Сообщество учеников</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Делитесь опытом, задавайте вопросы и поддерживайте друг друга в духовном росте
        </p>
      </header>

      {/* Add post */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
            {user!.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-grow">
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="Поделитесь мыслью, вопросом или свидетельством..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none resize-none mb-3"
            />
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={lessonRef}
                onChange={e => setLessonRef(e.target.value)}
                placeholder="Ссылка на урок (необязательно)"
                className="flex-grow px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 text-sm outline-none"
              />
              <button
                onClick={addPost}
                disabled={!newPost.trim()}
                className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-1.5 rounded-lg font-medium hover:from-purple-600 hover:to-violet-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <Send className="w-4 h-4" /> Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-bold text-gray-800 dark:text-gray-100">{post.author}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('ru-RU')}
                  </span>
                  {post.lessonRef && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                      {post.lessonRef}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-3">{post.text}</p>
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
