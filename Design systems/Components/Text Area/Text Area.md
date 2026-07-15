# Text Area

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Text Area**.

> Используется для ввода или отображения текста в несколько строчек в интерфейсе.

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Type=Placeholder/Filled, любое State/Scrolled | 139px (пример) | 381px (пример) |

Все состояния (Default/Hover/Focus/Disabled) и оба значения Scrolled дают одинаковый размер в примере — но textarea по своей природе растягивается по контенту, так что 381×139 стоит считать демо-размером из документации, а не жёстким токеном для всех случаев использования.

## Семейства

### Text Area
- **Type**: Placeholder / Filled
- **State**: Default / Hover / Focus / Disabled
- **Scrolled**: True / False

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/TextArea`

Компонент — тонкая обёртка над нативным `<textarea>`: принимает все стандартные атрибуты (`ComponentProps<"textarea">`), стили заданы Tailwind-классами через `twMerge` (проп `class` можно переопределять снаружи). Явных вариантов Type=Placeholder/Filled в коде нет — это просто наличие/отсутствие введённого текста, а не отдельные классы; Hover/Focus реализованы через псевдоклассы (`hover:`, `focus:outline-interaction-violet`). Disabled и Scrolled из Figma-инвентаря отдельно в коде не заданы вовсе.

Скопированные файлы:
- `Reference Code/TextArea.tsx` — обёртка над `<textarea>` с Tailwind-стилями (outline, скролл, hover/focus)
