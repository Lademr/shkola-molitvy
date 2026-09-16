import emailjs from '@emailjs/browser';

// ============================================================================
// КОНФИГУРАЦИЯ EMAILJS
// ============================================================================
// 
// ИНСТРУКЦИЯ ПО НАСТРОЙКЕ:
// 
// 1. Зарегистрируйтесь на https://www.emailjs.com/ (бесплатно)
// 
// 2. Добавьте Email Service:
//    - Перейдите в "Email Services" → "Add New Service"
//    - Выберите "Mail.ru" (так как ваш email vcdv@mail.ru)
//    - Подключите ваш аккаунт vcdv@mail.ru
//    - Скопируйте "Service ID" (например: service_abc123)
// 
// 3. Создайте Email Template:
//    - Перейдите в "Email Templates" → "Create New Template"
//    - В "To email" укажите: {{to_email}}
//    - В "From name" укажите: {{from_name}}
//    - В "Reply to" укажите: {{reply_to}}
//    - В теме укажите: {{subject}}
//    - В содержимом укажите:
//      ---
//      Новое сообщение от ученика Школы Молитвы!
//      
//      Имя: {{from_name}}
//      Email: {{reply_to}}
//      
//      Сообщение:
//      {{message}}
//      
//      ---
//      Это автоматическое письмо с сайта shkola-molitvy.ru
//      ---
//    - Сохраните и скопируйте "Template ID" (например: template_xyz789)
// 
// 4. Получите Public Key:
//    - Перейдите в "Account" → "General"
//    - Скопируйте "Public Key" (например: abcDEF123ghiJKL)
// 
// 5. Вставьте все три значения ниже:
// ============================================================================

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_w4pnw2a',        // Service ID
  TEMPLATE_ID: 'template_vpzel9r',      // Template ID
  PUBLIC_KEY: 'uhnbXL5wjDqXVnxdQ3NBG', // Public Key
  ADMIN_EMAIL: 'eksinss@gmail.com',     // Email администратора
};

// Функция для проверки, настроен ли EmailJS
export const isEmailConfigured = (): boolean => {
  return (
    EMAILJS_CONFIG.SERVICE_ID !== '' &&
    EMAILJS_CONFIG.TEMPLATE_ID !== '' &&
    EMAILJS_CONFIG.PUBLIC_KEY !== ''
  );
};

// Функция отправки сообщения администратору
export const sendAdminMessage = async (params: {
  from_name: string;
  reply_to: string;
  message: string;
  subject?: string;
}): Promise<boolean> => {
  if (!isEmailConfigured()) {
    console.warn('EmailJS не настроен. Пожалуйста, заполните конфигурацию в src/config/emailjs.ts');
    return false;
  }

  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
        from_name: params.from_name,
        reply_to: params.reply_to,
        message: params.message,
        subject: params.subject || 'Новое сообщение с Школы Молитвы',
      },
      {
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
      }
    );
    return true;
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return false;
  }
};

// Функция отправки автоответа ученику (опционально)
export const sendAutoReply = async (params: {
  to_email: string;
  from_name: string;
}): Promise<boolean> => {
  if (!isEmailConfigured()) {
    return false;
  }

  try {
    // Для автоответа нужно создать второй шаблон в EmailJS
    // с Template ID для автоответа
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      'YOUR_AUTO_REPLY_TEMPLATE_ID', // ← Создайте второй шаблон для автоответа
      {
        to_email: params.to_email,
        to_name: params.from_name,
        subject: 'Спасибо за ваше сообщение! Школа Молитвы',
        message: `Здравствуйте, ${params.from_name}!\n\nСпасибо за ваше сообщение. Мы получили его и ответим в ближайшее время.\n\nБлагословений вам в молитвенной жизни!\n\nС любовью,\nКоманда Школы Молитвы\nshkola-molitvy.ru`,
      },
      {
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
      }
    );
    return true;
  } catch (error) {
    console.error('Ошибка отправки автоответа:', error);
    return false;
  }
};
