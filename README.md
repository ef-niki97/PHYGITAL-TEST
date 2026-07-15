# Phygital Plus - Web Editor

Современное веб-приложение на SolidJS для генерации AI-изображений с помощью node-based редактора и расширенных возможностей обработки изображений.

## 🎯 О проекте

Phygital Plus - это мощная платформа для создания AI-контента, которая предоставляет:

- **Node-based редактор** для создания сложных AI workflows
- **Magic Canvas** - инструмент для inpainting/outpainting с расширенными возможностями кисти
- **Train Panel** - панель для обучения кастомных AI моделей (deprecated)
- **Библиотека шаблонов** - готовые воркспейсы и стили для быстрого старта
- **Система подписок** - управление кредитами и тарифными планами

## 🛠 Технологический стек

### Frontend
- **Framework**: [SolidJS](https://www.solidjs.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Язык**: TypeScript
- **Стилизация**: TailwindCSS + SASS
- **Роутинг**: @solidjs/router
- **State Management**:
  - XState (конечные автоматы)
  - TanStack Solid Query (серверное состояние)
- **Forms**: @tanstack/solid-form
- **UI Components**: @ark-ui/solid + @park-ui/tailwind-plugin

### Canvas & Graphics
- **Canvas Manipulation**: Fabric.js
- **3D Graphics**: Three.js
- **Image Processing**:
  - CropperJS
  - html2canvas
  - heic2any

## 📁 Структура проекта

```
phygital-plus-web-editor/
├── src/
│   ├── solidJs/               # SolidJS приложение
│   │   ├── app/               # Корневые компоненты приложения
│   │   ├── pages/             # Страницы (роутинг)
│   │   ├── widgets/           # Сложные композитные компоненты
│   │   ├── features/          # Бизнес-логика и функциональность
│   │   ├── entities/          # Бизнес-сущности
│   │   └── shared/            # Переиспользуемые компоненты
│   │       ├── api/           # API клиенты
│   │       ├── ui/            # UI kit компоненты
│   │       ├── helpers/       # Утилиты
│   │       ├── hooks/         # Кастомные хуки
│   │       └── models/        # Модели и схемы
│   ├── js/                    # Legacy код и graph editor
│   ├── styles/                # Глобальные стили (SASS)
│   └── serviceWorker.ts       # PWA Service Worker
├── static/                    # Статические файлы (публичная директория)
├── maintencePage/             # Страница технических работ
└── build/                     # Кастомные Vite плагины
```

### Архитектура Frontend

Проект использует модифицированную **Feature-Sliced Design** архитектуру:

- **app/** - инициализация приложения, провайдеры, роутинг
- **pages/** - страницы приложения (file-based routing)
- **widgets/** - композитные блоки страниц
- **features/** - функциональные блоки с бизнес-логикой
- **entities/** - бизнес-сущности
- **shared/** - переиспользуемый код без бизнес-логики

## 🎨 UI/UX

- **Design System**: Кастомная Tailwind конфигурация с темной темой
- **Typography**: Poppins font family + IBM Plex Mono для кода
- **Components**: Ark UI + Park UI для accessibility
- **Animations**: Motion library для плавных анимаций
- **Icons**: SVG спрайты с автоматической оптимизацией
