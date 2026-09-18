import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from './BlogPostPage';
import { generateSlug } from '../utils/transliterate';

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = [...new Set(blogPosts.flatMap(p => p.tags))];

  const filteredPosts = selectedTag
    ? blogPosts.filter(p => p.tags.includes(selectedTag))
    : blogPosts;

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
          <Link
            key={post.id}
            to={`/blog/${generateSlug(post.title)}`}
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
          </Link>
        ))}
      </div>
    </div>
  );
}
