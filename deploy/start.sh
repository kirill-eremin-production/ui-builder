#!/bin/bash

# Убиваем все запущенные nodejs процессы
killall node;

# Запускаем nginx
service nginx start;

ls -la;

# Идем в папку приложения
cd /usr/src/app;

ls -la;

ls -la ./build/;

# Запускаем NextJS приложение
pm2-runtime start npm  --name "ui.keremin.ru" -- start