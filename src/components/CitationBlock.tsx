import { BookMarked, Quote } from 'lucide-react';

interface Citation {
  source: string;
  author?: string;
  year?: string;
  page?: string;
  quote?: string;
}

interface CitationBlockProps {
  citations: Citation[];
}

export default function CitationBlock({ citations }: CitationBlockProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 my-8">
      <div className="flex items-start gap-3 mb-4">
        <BookMarked className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
            Первоисточники и цитирование
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Материалы, использованные при подготовке урока
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {citations.map((citation, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            {citation.quote && (
              <div className="mb-3 pl-4 border-l-4 border-amber-400 italic text-gray-700 dark:text-gray-300 text-sm">
                <Quote className="w-4 h-4 inline-block mr-2 text-amber-500" />
                {citation.quote}
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">[{index + 1}]</span>
              <div className="flex-grow text-sm">
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {citation.source}
                </p>
                {citation.author && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {citation.author}
                    {citation.year && `, ${citation.year}`}
                    {citation.page && `, с. ${citation.page}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
