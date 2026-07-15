# Link

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Link**.

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Size = M | 24px | 81px (пример) |
| Size = S | 16px | 69px (пример) |

Ширина зависит от текста (hug-content) — фиксирована только высота.

## Семейства

### Link
- **Type**: Secondary / Tertiary
- **Size**: M / S
- **State**: Default / Hover / Disabled

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/TextLink`

В коде это `TextLink` — не `<a>`, а `<div>` с ролью ссылки, обязательный проп `text` (строка) и всегда рендерящаяся справа иконка `ChevronDown`, которую можно развернуть на 180° через `chevronUp` (используется как индикатор раскрытия дропдауна/секции, а не только как декоративная стрелка). Пропсы: `text`, `disabled`, `chevronUp`, `chevronClass`, `class`, `style`, плюс стандартные атрибуты div. Вариантов `Type: Secondary/Tertiary` и `Size: M/S` из Figma в коде нет — реализован один визуальный стиль (подчёркнутый текст пунктиром + иконка), без переключателя размера. `disabled` даёт `pointer-events-none`, приглушённый цвет текста и `aria-disabled`, `tabIndex=-1` — состояние Hover покрывается через `hover:text-text-primary`.

Скопированные файлы:
- `Reference Code/TextLink.tsx` — компонент TextLink (текст + иконка chevron, disabled-состояние).
