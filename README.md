# CloudCo - Сервис бронирования оборудования и курсов

Современный веб-приложение для бронирования оборудования и записи на курсы в образовательных учреждениях.

## 🚀 Быстрый старт

### Вариант 1: Docker (Рекомендуется)

1. Клонируйте репозиторий:
```bash
git clone <YOUR_GIT_URL>
cd cloudco
```

2. Создайте файл `.env`:
```bash
cp .env.example .env
# Отредактируйте .env при необходимости
```

3. Запустите все сервисы:
```bash
docker-compose up -d
```

4. Инициализируйте базу данных:
```bash
docker-compose exec backend npm run db:seed
```

5. Откройте приложение:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001/api

**Подробнее**: См. [docker-guide.md](docker-guide.md)

### Вариант 2: Локальная установка

1. Клонируйте репозиторий:
```bash
git clone <YOUR_GIT_URL>
cd cloudco
```

2. Установите зависимости:
```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

3. Создайте базу данных PostgreSQL:
```bash
createdb cloudco
```

4. Настройте backend:
```bash
cd server
cp .env.example .env
# Отредактируйте .env
npm run db:seed
cd ..
```

5. Запустите сервисы:

Терминал 1 (Backend):
```bash
cd server && npm run dev
```

Терминал 2 (Frontend):
```bash
npm run dev
```

## 📚 Технологии

### Frontend
- Vite
- TypeScript
- React 18
- shadcn-ui
- Tailwind CSS
- React Query
- React Router

### Backend
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcryptjs

## 🔑 Тестовые данные

После запуска seed скрипта будут созданы:

**Администратор:**
- Email: `admin@cloudco.ru`
- Password: `admin123`

**Тестовый пользователь:**
- Email: `user@cloudco.ru`
- Password: `user123`

## 📖 Документация

- [Инструкция по установке backend](server/INSTALLATION.md)
- [API Документация](server/README.md)
- [Docker Guide](docker-guide.md)

## 🐳 Docker Services

Проект включает:

- **frontend** - React приложение (порт 5173)
- **backend** - Express API (порт 3001)
- **postgres** - PostgreSQL база данных (порт 5432)
