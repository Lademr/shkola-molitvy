import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <Shield className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Политика конфиденциальности
          </h1>
        </div>

        <div className="prose prose-amber dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            <strong>Дата вступления в силу:</strong> 1 февраля 2026 года<br />
            <strong>Последнее обновление:</strong> 1 февраля 2026 года
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              1. Общие положения
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта «Школа Молитвы» (далее — Сайт), расположенного по адресу: <a href="https://shkola-molitvy.ru" className="text-amber-600 dark:text-amber-400 hover:underline">https://shkola-molitvy.ru</a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Администрация Сайта (далее — Администрация) уважает право на конфиденциальность пользователей Сайта и обязуется защищать их персональные данные в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              2. Какие данные мы собираем
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Сайт собирает следующие категории данных:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Технические данные:</strong> IP-адрес, информация о браузере, операционной системе, устройстве</li>
              <li><strong>Данные использования:</strong> посещенные страницы, время пребывания на сайте, действия пользователя</li>
              <li><strong>Регистрационные данные:</strong> имя пользователя, email (при добровольной регистрации)</li>
              <li><strong>Локальные данные:</strong> прогресс обучения, молитвенный дневник, настройки (хранятся локально в браузере пользователя)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              3. Цели обработки данных
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Персональные данные обрабатываются для следующих целей:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Предоставление доступа к функционалу Сайта</li>
              <li>Персонализация пользовательского опыта</li>
              <li>Улучшение качества контента и услуг</li>
              <li>Анализ статистики использования Сайта</li>
              <li>Обратная связь с пользователями (при наличии согласия)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              4. Хранение и защита данных
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Локальное хранение:</strong> Большинство данных (прогресс обучения, молитвенный дневник, настройки) хранятся локально в браузере пользователя (localStorage) и не передаются на серверы Администрации.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Серверное хранение:</strong> При использовании функций обратной связи или регистрации, данные могут временно храниться на защищенных серверах Администрации с применением современных методов шифрования и защиты.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Срок хранения:</strong> Персональные данные хранятся до момента удаления пользователем или до истечения срока необходимости для достижения целей обработки.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              5. Передача данных третьим лицам
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Администрация не передает персональные данные пользователей третьим лицам, за исключением случаев:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Получения явного согласия пользователя</li>
              <li>Требований законодательства Российской Федерации</li>
              <li>Защиты прав и безопасности Администрации или пользователей</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              6. Cookies и аналитика
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Сайт может использовать cookies для улучшения пользовательского опыта. Пользователь может отключить cookies в настройках браузера, однако это может повлиять на функциональность Сайта.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Сайт может использовать сервисы аналитики (Google Analytics, Яндекс.Метрика) для сбора обезличенной статистики использования.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              7. Права пользователей
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Пользователь имеет право:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Получить информацию о своих персональных данных</li>
              <li>Требовать уточнения, блокирования или удаления персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия Администрации в Роскомнадзор или суд</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              8. Изменение Политики конфиденциальности
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Администрация оставляет за собой право вносить изменения в настоящую Политику конфиденциальности. Новая редакция вступает в силу с момента её размещения на Сайте.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              9. Контактная информация
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              По всем вопросам, связанным с обработкой персональных данных, обращайтесь:
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <strong>Email:</strong> <a href="mailto:privacy@shkola-molitvy.ru" className="text-amber-600 dark:text-amber-400 hover:underline">privacy@shkola-molitvy.ru</a>
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
