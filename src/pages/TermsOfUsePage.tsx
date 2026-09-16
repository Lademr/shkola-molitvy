import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Mail } from 'lucide-react';

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Вернуться на главную
      </Link>

      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Условия использования
          </h1>
        </div>

        <div className="prose prose-amber dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            <strong>Дата вступления в силу:</strong> 1 февраля 2026 года<br />
            <strong>Последнее обновление:</strong> 1 февраля 2026 года
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              1. Принятие условий
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Настоящие Условия использования (далее — «Условия») регулируют использование сайта «Школа Молитвы» (далее — «Сайт»), расположенного по адресу: <a href="https://shkola-molitvy.ru" className="text-amber-600 dark:text-amber-400 hover:underline">https://shkola-molitvy.ru</a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Используя Сайт, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо положениями, пожалуйста, прекратите использование Сайта.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              2. Описание сервиса
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              «Школа Молитвы» — это бесплатный образовательный ресурс, предоставляющий:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Интерактивные уроки по молитвенной жизни</li>
              <li>Коллекцию молитв на различные случаи жизни</li>
              <li>Разборы библейских текстов</li>
              <li>Тесты для проверки знаний</li>
              <li>Молитвенный дневник</li>
              <li>Сообщество для общения верующих</li>
              <li>Блог со статьями о духовной жизни</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              3. Интеллектуальная собственность
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Все материалы Сайта (тексты уроков, статьи, разборы Писания, дизайн, код) защищены авторским правом и принадлежат Администрации Сайта или используются с разрешения правообладателей.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Разрешается:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Использование материалов для личного изучения</li>
              <li>Цитирование с обязательной ссылкой на источник</li>
              <li>Распространение информации о Сайте</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Запрещается:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Копирование материалов для коммерческого использования</li>
              <li>Изменение или удаление авторских указаний</li>
              <li>Использование материалов для создания конкурирующих продуктов</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              4. Библейские тексты
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Библейские тексты на Сайте приведены в Синодальном переводе, который является общественным достоянием на территории Российской Федерации. Цитаты из других переводов используются в соответствии с условиями их лицензирования.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              5. Ответственность
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Образовательный характер:</strong> Материалы Сайта носят образовательный и духовно-назидательный характер. Они не заменяют профессиональную психологическую, медицинскую или юридическую помощь.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Личная ответственность:</strong> Пользователь несет личную ответственность за применение полученных знаний и практик в своей жизни.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Ограничение ответственности:</strong> Администрация Сайта не несет ответственности за:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Духовные или эмоциональные последствия применения практик</li>
              <li>Точность интерпретации библейских текстов пользователями</li>
              <li>Действия пользователей в сообществе</li>
              <li>Технические проблемы, возникшие не по вине Администрации</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              6. Поведение пользователей
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              При использовании Сайта, особенно в разделах сообщества и обратной связи, пользователи обязуются:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Уважительно относиться к другим пользователям</li>
              <li>Не публиковать оскорбительный, дискриминационный или незаконный контент</li>
              <li>Не распространять спам или рекламу</li>
              <li>Не пытаться взломать или нарушить работу Сайта</li>
              <li>Не выдавать себя за других лиц</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Администрация оставляет за собой право блокировать пользователей, нарушающих настоящие Условия.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              7. Ссылки на сторонние ресурсы
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Сайт может содержать ссылки на сторонние ресурсы. Администрация не несет ответственности за содержание, политику конфиденциальности или практики сторонних сайтов. Переход по таким ссылкам осуществляется на ваш страх и риск.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              8. Изменение условий
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Администрация оставляет за собой право изменять настоящие Условия в любое время. Изменения вступают в силу с момента публикации новой редакции на Сайте. Продолжение использования Сайта после внесения изменений означает согласие с новой редакцией.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              9. Применимое право
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Настоящие Условия регулируются законодательством Российской Федерации. Все споры, возникающие из использования Сайта, подлежат рассмотрению в судах Российской Федерации по месту нахождения Администрации.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              10. Контактная информация
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              По всем вопросам, связанным с настоящими Условиями, обращайтесь:
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <strong>Email:</strong> <a href="mailto:legal@shkola-molitvy.ru" className="text-amber-600 dark:text-amber-400 hover:underline">legal@shkola-molitvy.ru</a>
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
