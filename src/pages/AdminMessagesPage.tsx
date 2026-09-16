import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { getAllMessages, addAdminReply } from '../utils/adminUtils';
import { MessageCircle, Send, Filter } from 'lucide-react';

export default function AdminMessagesPage() {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'feedback' | 'community'>('all');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    loadMessages();
  }, [isAdmin, navigate]);

  const loadMessages = () => {
    setMessages(getAllMessages());
  };

  const handleReply = (messageId: number, type: 'feedback' | 'community') => {
    if (!replyText.trim()) return;
    addAdminReply(messageId, replyText, type);
    setReplyText('');
    setReplyingTo(null);
    loadMessages();
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true;
    return msg.type === filter;
  });

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Сообщения
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Управление сообщениями от учеников и обратная связь
        </p>
      </header>

      {/* Фильтры */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-400" />
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Все ({messages.length})
        </button>
        <button
          onClick={() => setFilter('feedback')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'feedback'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Обратная связь ({messages.filter(m => m.type === 'feedback').length})
        </button>
        <button
          onClick={() => setFilter('community')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'community'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Сообщество ({messages.filter(m => m.type === 'community').length})
        </button>
      </div>

      {/* Список сообщений */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-100 dark:border-gray-700 text-center">
            <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Нет сообщений</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={`${msg.type}-${msg.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{msg.author}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        msg.type === 'feedback'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      }`}
                    >
                      {msg.type === 'feedback' ? 'Обратная связь' : 'Сообщество'}
                    </span>
                    {msg.adminReply && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        ✓ Отвечено
                      </span>
                    )}
                  </div>
                  {msg.email && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{msg.email}</p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(msg.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">{msg.text}</p>

              {/* Ответ администратора */}
              {msg.adminReply && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
                    Ваш ответ:
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">{msg.adminReply}</p>
                </div>
              )}

              {/* Форма ответа */}
              {replyingTo === msg.id ? (
                <div className="space-y-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Введите ваш ответ..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReply(msg.id, msg.type)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Отправить ответ
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setReplyingTo(msg.id)}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                >
                  {msg.adminReply ? 'Изменить ответ' : 'Ответить'}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
