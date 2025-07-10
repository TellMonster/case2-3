
## Технологический стек

### Frontend Framework
- **React 18.3.1** - Основная библиотека для создания пользовательского интерфейса
- **TypeScript 5.5.3** - Типизированный JavaScript для лучшей разработки

### Сборка и разработка
- **Vite 5.4.2** - Быстрый сборщик и dev-сервер
- **@vitejs/plugin-react 4.3.1** - Плагин React для Vite

### Стилизация
- **Tailwind CSS 3.4.1** - Utility-first CSS фреймворк
- **PostCSS 8.4.35** - Инструмент для трансформации CSS
- **Autoprefixer 10.4.18** - Автоматическое добавление вендорных префиксов

### Иконки
- **Lucide React 0.344.0** - Современная библиотека иконок

### Линтинг и качество кода
- **ESLint 9.9.1** - Линтер для JavaScript/TypeScript
- **@eslint/js 9.9.1** - Базовые правила ESLint
- **typescript-eslint 8.3.0** - ESLint правила для TypeScript
- **eslint-plugin-react-hooks 5.1.0-rc.0** - Правила для React Hooks
- **eslint-plugin-react-refresh 0.4.11** - Правила для React Refresh

### Типы
- **@types/react 18.3.5** - Типы для React
- **@types/react-dom 18.3.0** - Типы для React DOM

### Глобальные переменные
- **globals 15.9.0** - Определения глобальных переменных для ESLint


## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр собранного проекта
npm run preview

# Проверка кода линтером
npm run lint
```

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── DateInput.tsx   # Форма ввода даты
│   ├── Results.tsx     # Результаты анализа
│   └── ScoreboardDisplay.tsx # Электронное табло
├── App.tsx             # Главный компонент
├── main.tsx           # Точка входа
├── index.css          # Глобальные стили
└── vite-env.d.ts      # Типы для Vite

dist/                   # Собранный проект (готов к деплою)
```

