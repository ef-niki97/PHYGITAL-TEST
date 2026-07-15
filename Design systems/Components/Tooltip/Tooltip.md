# Tooltip

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Tooltip**. На странице три разных семейства: Popover, Tooltip и вспомогательный _Image.

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Popover | Appearance=Accent/Secondary × Type=Top Left/Top Right/Bottom Right | 196px | 382px (пример) |
| Tooltip | Type=Bottom Center/Top Center | 264.87px (пример) | 319px (пример) |
| Tooltip | Type=Left Center/Right Center | 268.38px (пример) | 319px (пример) |
| _Image (внутри Popover) | Ratio=16:9 | 176px | 314px |
| _Image (внутри Popover) | Ratio=3:2 | 210px | 314px |
| _Image (внутри Popover) | Ratio=1:1 | 314px | 314px |

⚠️ У семейства "Tooltip" размеры (319×265/268px, с нецелым числом пикселей) выглядят как размер целой демо-композиции (якорный элемент + подсказка + направляющие), а не как размер самого облака тултипа. Не стоит использовать эти цифры как готовый токен для пузыря тултипа без дополнительной проверки в Figma.

## Семейства

### 1. Popover
Более крупная всплывающая карточка (с заголовком/описанием, судя по размеру) — не путать с простым Tooltip.
- **Appearance**: Accent / Secondary
- **Type**: Top Left / Top Right / Bottom Right

### 2. Tooltip
- **Type**: Bottom Center / Top Center / Left Center / Right Center

### 3. _Image
Плейсхолдер изображения с фиксированным соотношением сторон, используется внутри Popover.
- **Ratio**: 16:9 / 3:2 / 1:1

Назначение не задокументировано в Figma (нет блока "Для чего применяется?") ни для одного из семейств.

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/Tooltip`

В файле — два разных компонента. `TooltipClosedComponent` — актуальная реализация на Ark UI: `Root`/`Trigger`/`Positioner`/`Content`/`Arrow`/`ArrowTip`, с пропами `showArrow`, `portaled`/`portalMount`, `content` и кастомизацией триггера/контента через `children`/`asContent`; `openDelay`/`closeDelay` = 0, `lazyMount`/`unmountOnExit` включены, `placement` по умолчанию `top`. Второй компонент, `Tooltip` (стили из `.module.scss`), — старая версия на обычном `div` без Ark UI, с шрифтом 0.4rem и чёрным фоном; в файле стори (`TooltipClosedComponent.stories.tsx`) она прямо помечена как "Tooltip (Legacy Variant)". Семейство Popover (Accent/Secondary, Top Left/Top Right/Bottom Right) из Figma-инвентаря в скопированных файлах не реализовано.

Скопированные файлы:
- `Reference Code/Tooltip.tsx` — компоненты `TooltipClosedComponent` (актуальный, Ark UI) и `Tooltip` (легаси, div)
- `Reference Code/Tooltip.module.scss` — стили легаси-компонента `Tooltip`
- `Reference Code/TooltipClosedComponent.stories.tsx` — Storybook-стори с таблицей вариантов (placement × content) и описанием токенов стилей
- `Reference Code/index.ts` — реэкспорт как `StyledTooltip`
