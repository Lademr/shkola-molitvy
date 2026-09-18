import { Share2, Facebook, Twitter, Send } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const currentUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}&description=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    ok: `https://connect.ok.ru/offer?url=${encodedUrl}&title=${encodedTitle}&description=${encodedDescription}`,
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
        <Share2 className="w-4 h-4" />
        Поделиться:
      </span>
      
      <a
        href={shareLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        aria-label="Поделиться в Telegram"
      >
        <Send className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.vk}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors"
        aria-label="Поделиться ВКонтакте"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.46c-.55 0-.72-.44-1.71-1.44-.86-.83-1.23-.94-1.44-.94-.3 0-.38.08-.38.5v1.31c0 .35-.11.56-1.03.56-1.52 0-3.2-.92-4.39-2.64-1.79-2.51-2.28-4.4-2.28-4.78 0-.21.08-.38.5-.38h1.46c.37 0 .51.17.66.58.72 2.08 1.93 3.9 2.42 3.9.18 0 .26-.08.26-.55V9.98c-.06-.96-.56-1.04-.56-1.38 0-.17.14-.34.37-.34h2.3c.31 0 .42.17.42.55v4.13c0 .31.14.42.22.42.18 0 .33-.11.67-.44 1.04-1.17 1.78-2.97 1.78-2.97.1-.21.26-.38.63-.38h1.46c.44 0 .54.23.44.55-.18.83-1.93 3.29-1.93 3.29-.15.25-.21.38 0 .66.15.21.65.65.98 1.05.61.7 1.07 1.29 1.2 1.7.13.41-.08.62-.5.62z"/>
        </svg>
      </a>

      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
        aria-label="Поделиться в WhatsApp"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-colors"
        aria-label="Поделиться в Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        aria-label="Поделиться в Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.ok}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
        aria-label="Поделиться в Одноклассниках"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2zm5.4 9.6c0 .6-.4 1-1 1h-1.2l1.8 1.8c.4.4.4 1 0 1.4-.2.2-.4.2-.6.2s-.4-.1-.6-.2L12 14.4l-3.8 3.8c-.2.2-.4.2-.6.2s-.4-.1-.6-.2c-.4-.4-.4-1 0-1.4l1.8-1.8H7.6c-.6 0-1-.4-1-1s.4-1 1-1h3.2l-1.8-1.8c-.4-.4-.4-1 0-1.4.2-.2.4-.2.6-.2s.4.1.6.2l3.8 3.8 3.8-3.8c.2-.2.4-.2.6-.2s.4.1.6.2c.4.4.4 1 0 1.4l-1.8 1.8h1.2c.6 0 1 .4 1 1z"/>
        </svg>
      </a>
    </div>
  );
}
