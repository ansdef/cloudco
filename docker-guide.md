# Docker Guide - CloudCo

## Быстрый старт

### 1. Создайте файл .env

```bash
cp .env.example .env
```

Отредактируйте `.env` с нужными настройками.

### 2. Запустите с помощью Docker Compose

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down

# Остановка с удалением volumes (удалит все данные БД)
docker-compose down -v
```

### 3. Инициализация базы данных

После первого запуска выполните seed скрипт:

```bash
docker-compose exec backend npm run db:seed
```

### 4. Доступ к приложению

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **PostgreSQL**: localhost:5432

## Отдельные сервисы

### Только база данных

```bash
docker-compose up -d postgres
```

### Только backend

```bash
docker-compose up -d postgres backend
```

### Только frontend (требует запущенный backend на хосте)

```bash
docker-compose up -d frontend
```

## Полезные команды

### Просмотр логов
```bash
docker-compose logs -f backend    # Backend логи
docker-compose logs -f frontend  # Frontend логи
docker-compose logs -f postgres  # Database логи
```

### Выполнение команд в контейнере
```bash
docker-compose exec backend sh          # Зайти в backend контейнер
docker-compose exec postgres psql -U postgres cloudco  # Подключиться к БД
```

### Пересборка после изменений
```bash
docker-compose build backend    # Пересобрать только backend
docker-compose build frontend   # Пересобрать только frontend
docker-compose build            # Пересобрать все
docker-compose up -d --build    # Пересобрать и запустить
```

### Очистка
```bash
docker-compose down           # Остановить и удалить контейнеры
docker-compose down -v        # + Удалить volumes (удалит данные БД)
docker-compose down --rmi all # + Удалить образы
docker system prune           # Очистить неиспользуемые данные Docker
```

## Тестовые данные

После выполнения seed скрипта:

**Администратор:**
- Email: admin@cloudco.ru
- Password: admin123

**Пользователь:**
- Email: user@cloudco.ru
- Password: user123

## Структура Docker

```
cloudco/
├── docker-compose.yml       # Оркестрация всех сервисов
├── Dockerfile               # Frontend образ
├── .dockerignore           # Исключения для frontend
│
└── server/
    ├── Dockerfile          # Backend образ
    └── .dockerignore       # Исключения для backend
```

## Production Build

Для production использования измените docker-compose.yml:

1. Измените CMD в Dockerfile на:
   - Frontend: `npm run build && npm run preview`
   - Backend: `npm run build && npm start`

2. Используйте production .env переменные

3. Используйте nginx для статики или cloud-решение для деплоя
