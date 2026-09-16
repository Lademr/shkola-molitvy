import { useState, useEffect } from 'react';
import { List, X } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface FloatingTOCProps {
  items: TOCItem[];
}

export default function FloatingTOC({ items }: FloatingTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile TOC Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-all"
        aria-label="Открыть оглавление"
      >
        {isOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
      </button>

      {/* TOC Panel */}
      <div
        className={`fixed top-20 right-0 z-40 w-80 max-w-[90vw] bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 lg:static lg:w-64 lg:shadow-none lg:border-l-0 lg:bg-transparent lg:dark:bg-transparent`}
      >
        <div className="p-6">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase tracking-wide">
            Содержание
          </h3>
          <nav aria-label="Оглавление статьи">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left w-full py-2 px-3 rounded-lg text-sm transition-all ${
                      item.level === 1
                        ? 'font-semibold'
                        : item.level === 2
                        ? 'pl-6'
                        : 'pl-9 text-xs'
                    } ${
                      activeId === item.id
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
