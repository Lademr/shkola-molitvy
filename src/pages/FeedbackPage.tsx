import { useState } from 'react';
import { MessageCircle, Send, User, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendAdminMessage, isEmailConfigured } from '../config/emailjs';

interface Message {
  id: number;
  author: string;
  text: string;
  date: string;
  isReply: boolean;
}

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('feedbackMessages');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        author: 'Мария К.',
        text: 'Благодарю за уроки о молитве! Урок «Молитва по Слову» полностью изменил моё время с Богом. Теперь я молюсь конкретнее и увереннее.',
        date: '2024-01-15',
        isReply: false,
      },
      {
        id: 2,
        author: 'Администратор',
        text: 'Мария, спасибо за отзыв! Рады, что уроки приносят пользу. Продолжайте в том же духе! 🙏',
        date: '2024-01-16',
        isReply: true,
      },
      {
        id: 3,
        author: 'Алексей П.',
        text: 'Хотел бы предложить добавить уроки о молитве за исцеление и духовной войне. Думаю, это будет полезно многим.',
        date: '2024-01-20',
        isReply: false,
      },
      {
        id: 4,
        author: 'Администратор',
        text: 'Алексей, отличная идея! Мы уже работаем над этими темами. Следите за обновлениями! ✨',
        date: '2024-01-21',
        isReply: true,
      },
    ];
  });

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSending(true);
    setSendError(false);

    // Сохраняем сообщение локально
    const newMessage: Message = {
      id: Date.now(),
      author: name,
      text: message,
      date: new Date().toISOString().split('T')[0],
      isReply: false,
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem('feedbackMessages', JSON.stringify(updated));

    // Отправляем email администратору
    if (isEmailConfigured()) {
      const success = await sendAdminMessage({
        from_name: name,
        reply_to: email || 'не указан',
        message: message,
        subject: `Сообщение от ${name} - Школа Молитвы`,
      });

      if (!success) {
        setSendError(true);
        setIsSending(false);
        return;
      }
    } else {
      // Если EmailJS не настроен, показываем предупреждение
      console.warn('EmailJS не настроен. Сообщение сохранено только локально.');
    }

    setIsSending(false);
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">💬 Обратная связь</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Делитесь опытом, задавайте вопросы, оставляйте отзывы. Мы — сообщество, растущее вместе.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-teal-500" />
              Написать сообщение
            </h2>

            {sent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-green-700 font-medium">Сообщение отправлено!</p>
                <p className="text-gray-500 text-sm mt-1">
                  {isEmailConfigured() 
                    ? 'Мы получили ваше сообщение и ответим в ближайшее время'
                    : 'Сообщение сохранено. Администратор получит его после настройки системы уведомлений'
                  }
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isEmailConfigured() && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Система уведомлений в настройке</p>
                        <p className="text-xs mt-1">Сообщения сохраняются локально. Для получения email-уведомлений администратору необходимо настроить EmailJS.</p>
                      </div>
                    </div>
                  </div>
                )}

                {sendError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Ошибка отправки</p>
                        <p className="text-xs mt-1">Не удалось отправить сообщение. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую: eksinss@gmail.com</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Ваше имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Как к вам обращаться?"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:ring-2 focus:ring-teal-100 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email (необязательно)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Для ответа на email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:ring-2 focus:ring-teal-100 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Сообщение</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Ваш вопрос, отзыв или предложение..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:ring-2 focus:ring-teal-100 outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Отправить
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick Links */}
          <div className="mt-6 bg-teal-50 rounded-xl p-5 border border-teal-100">
            <h3 className="font-bold text-teal-800 mb-3">📌 Что можно написать:</h3>
            <ul className="text-teal-700 text-sm space-y-2">
              <li>• Вопросы по урокам и молитвам</li>
              <li>• Предложения новых тем</li>
              <li>• Свидетельства и отзывы</li>
              <li>• Просьба о молитве</li>
              <li>• Техническая обратная связь</li>
            </ul>
          </div>
        </div>

        {/* Messages Board */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-teal-500" />
            Сообщения учеников
          </h2>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`rounded-xl p-4 ${
                  msg.isReply
                    ? 'bg-teal-50 border border-teal-100 ml-4'
                    : 'bg-white border border-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    msg.isReply ? 'bg-teal-200 text-teal-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {msg.isReply ? '✝' : <User className="w-3 h-3" />}
                  </div>
                  <span className="font-medium text-gray-800 text-sm">{msg.author}</span>
                  <span className="text-gray-400 text-xs ml-auto">{msg.date}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
