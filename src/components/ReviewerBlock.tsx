import { ShieldCheck, BookOpen, Users } from 'lucide-react';

interface ReviewerInfo {
  name: string;
  title: string;
  credentials: string[];
}

interface ReviewerBlockProps {
  reviewers: ReviewerInfo[];
  reviewDate: string;
  lastUpdated?: string;
}

export default function ReviewerBlock({ reviewers, reviewDate, lastUpdated }: ReviewerBlockProps) {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-sky-200 dark:border-sky-800 my-8">
      <div className="flex items-start gap-3 mb-4">
        <ShieldCheck className="w-6 h-6 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
            Рецензирование и проверка
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Материал проверен экспертами на соответствие библейскому учению
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {reviewers.map((reviewer, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-sky-100 dark:border-sky-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {reviewer.name.charAt(0)}
              </div>
              <div className="flex-grow">
                <p className="font-bold text-gray-800 dark:text-gray-100">{reviewer.name}</p>
                <p className="text-sm text-sky-600 dark:text-sky-400 mb-2">{reviewer.title}</p>
                {reviewer.credentials.length > 0 && (
                  <ul className="space-y-1">
                    {reviewer.credentials.map((cred, i) => (
                      <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-sky-500 mt-0.5">✓</span>
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400 pt-4 border-t border-sky-200 dark:border-sky-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>Проверено: {new Date(reviewDate).toLocaleDateString('ru-RU')}</span>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Обновлено: {new Date(lastUpdated).toLocaleDateString('ru-RU')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
