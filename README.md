# UI Конструктор

# Локальная разработка

## Запуск для разработки

https://oauth.yandex.ru/

- Вкл. vpn где доступен ChatGPT
- `nvm use && npm i`
- ```
  local run
  YANDEX_CLIENT_ID=<FROM_YANDEX_OAUTH_APP> \
  YANDEX_CLIENT_SECRET=<FROM_YANDEX_OAUTH_APP> \
  ADMIN_EMAIL=<YANDEX_EMAIL> \
  COOKIE_PSWD=<string> \
  npm run dev
  ```

# Деплой приложения

- Зайти на сервер
- Установить nodejs через nvm v20
- Сгенерировать ssh для github
- Склонировать репозиторий
- Установить зависимости
- Собрать приложение npm run build
- Сгенерировать ssl сертификат через certbot - см. /deploy/deploy.sh
- Описать env файл
- Собрать docker контейнер
- Запустить docker контейнер

Приложение NextJS запускается через pm2 и проксируется через nginx в докере

# Как обновить приложение

Это надо сделать, если мы доработали функциональность приложения или просто надо его перезапустить.

```(shell)
# Остановливаем и удаляем контейнеры, удаляем образ \
docker stop ui-builder-app-container && \
docker rm ui-builder-app-container && \
docker rmi keremin/ui-builder && \

cd ~/k-ai && \

# Удаляем сборку и node_modules \
rm -rf ./build && rm -rf node_modules && \

# Стягиваем актуальную ветку \
git pull && \

# Собираем приложение \
nvm use && npm i && npm run build && \

# Собираем образ \
docker build . -t keremin/ui-builder && \
# Запускаем контейнер \
docker run -p 443:443 -v /etc/letsencrypt/live/ui.keremin.ru:/usr/src/app/ssl -v /etc/letsencrypt/archive:/usr/src/archive -v /root/ui-builder-store:/usr/src/app/ui-builder-store --env-file ./env --name ui-builder-app-container -d keremin/ui-builder
```

# Как перезапустить приложение

Это надо делать если просто надо перезапустить приложение без пересборки приложения

```(shell)
docker restart ui-builder-app-container
```
