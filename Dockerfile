FROM node:20

# Устанавливаем nginx
RUN apt update && apt install nginx -y

# ##### HTTP #####
# Копируем конфиг для nginx
# COPY deploy/http-nginx-config /etc/nginx/sites-available/gpt.keremin.ru
# Создаем symlink в sites-enabled, проверяем конфигурацию и перезапускаем nginx
# RUN ln -s /etc/nginx/sites-available/gpt.keremin.ru /etc/nginx/sites-enabled/ && rm /etc/nginx/sites-enabled/default

##### HTTPS #####
# Копируем конфиг для nginx
COPY deploy/https-nginx-config /etc/nginx/sites-available/ui.keremin.ru
# Создаем symlink в sites-enabled, проверяем конфигурацию и перезапускаем nginx
RUN ln -s /etc/nginx/sites-available/ui.keremin.ru /etc/nginx/sites-enabled/ && rm /etc/nginx/sites-enabled/default

# Создаем папочку для приложения
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY ./package*.json ./
# Устанавливаем зависимости
RUN npm ci --omit=dev && npm install -g pm2

# Копируем собранное приложение
COPY ./build ./build
# Копируем конфигурацию NextJS
COPY ./next.config.ts ./next.config.ts

# Копируем скрипт запуска приложения
COPY ./deploy/start.sh ./start.sh
# Делаем файл исполняемым
RUN chmod 744 start.sh

EXPOSE 80

CMD [ "sh", "./start.sh" ]