# Accordion

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Accordion**.

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Expanded = True | 64px | 420px (пример) |
| Expanded = False | 90px | 420px (пример) |

В файле нет блоков "Для чего применяется?" / "Настройка компонента" / "Расстояния и отступы" — это просто два примера-инстанса, без формальной документации. Высота, скорее всего, зависит от контента конкретного примера (текста внутри), а не является жёстким токеном — фиксированной можно считать только высоту хедера-строки.

## Семейства

### Accordion
- **is Expanded**: True / False

Назначение и настройка компонента не задокументированы в Figma.

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/molecules/Accordion` и `src/solidJs/shared/ui/molecules/StyledAccordion`

В проде есть две разные реализации. `Accordion.tsx` — headless-компонент: состояние open/closed хранится в `createSignal`, хедер рендерится через проп `accordionHeaderRenderFc` (кастомная функция-рендерер), тело показывается через `<Show>` при открытии. Есть пропы `removeDefaultContainer` (убрать обёртку тела) и `headerClassName`. Рядом экспортированы готовые хелперы: `DefaultAccordionContainer`, `DefaultAccordionBodyContainer`, `AccordionHeader` и `AccordionGroupHeader` (два варианта кнопки-хедера). Анимация раскрытия — CSS `@keyframes openAnim` (opacity 0→1, 0.5s) в модуле `Accordion.module.scss`. Это соответствует единственному состоянию из Figma (`is Expanded`: True/False), но количество размеров/вариантов в Figma не задокументировано вовсе, а в коде размеры не заданы как токены — только структурные отступы (padding 15px, border-radius 10px).

`StyledAccordion` — вторая, более новая реализация на примитивах Ark UI (`@ark-ui/solid` `Accordion.Root/Item/ItemTrigger/ItemContent/ItemIndicator`), обёрнутых в `tailwind-variants` через `createStyleContext`. Даёт `Root`, `RootProvider`, `Item`, `ItemTrigger`, `ItemContent`, `ItemIndicator` со слотами стилей и вариантом `size` (в коде определён только `size: "md"` — заготовка под будущие размеры, второго значения нет). Прямого соответствия Figma-инвентарю (там только один булев параметр `is Expanded`) в этой версии нет — компонент заметно более гибкий, чем задокументированный в Figma набор.

Скопированные файлы:
- `Reference Code/Accordion/Accordion.tsx` — headless-логика открытия/закрытия, кастомный хедер, дефолтные обёртки
- `Reference Code/Accordion/Accordion.module.scss` — стили контейнера, хедера, анимация раскрытия тела
- `Reference Code/Accordion/index.ts` — реэкспорт модуля
- `Reference Code/StyledAccordion/StyledAccordion.tsx` — обёртка над Ark UI Accordion с tailwind-variants и style-context
- `Reference Code/StyledAccordion/index.ts` — реэкспорт модуля (под неймспейсом `StyledAccordion`)
