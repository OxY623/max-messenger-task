# MAX Messenger

Веб-приложение для обмена текстовыми сообщениями через Green API. Подключите аккаунт, укажите ID чата, чтобы отправлять сообщения и получать входящие.

## Возможности

- Подключение по `idInstance` и `apiTokenInstance`.
- Отправка и получение текстовых сообщений.
- Очистка списка сообщений и смена аккаунта.

## Технологии

React, TypeScript, Vite, Ant Design и Axios.

## Запуск

Нужны Node.js и npm.

```bash
npm install
npm run dev
```

Откройте адрес, указанный Vite в терминале (обычно `http://localhost:5173`). Команда `npm run build` собирает production-версию, а `npm run lint` проверяет код.

Для подключения укажите адрес Green API и учётные данные в форме приложения. При необходимости их можно задать через `.env`:

```env
VITE_GREEN_API_URL=https://api.green-api.com
VITE_ID_INSTANCE=your_instance_id
VITE_API_TOKEN=your_api_token
```

!!! Не публикуйте реальные токены в открытом репозитории.!!!!

## Публикация

Ссылка на репозиторий: [MAX Messenger](https://oxy623.github.io/max-messenger-task/)
