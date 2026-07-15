# Input Chips

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Input Chips**. Поле ввода с тегами/чипсами внутри — вариант [Input](../Input/Input.md).

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Size=Medium (с лейблом) | 90px | 392px (пример) |
| Size=Small (с лейблом) | 72px | 392px (пример) |

Как и у обычного Input, ширина — по контейнеру (auto), фиксирована только высота. Значения 90/72px совпадают с высотой composite-примеров Input "с лейблом" (см. [Input.md](../Input/Input.md)) — то есть здесь тоже насчитана высота поля + лейбл, а не голого поля.

## Семейства

### Input Chips
- **Size**: Medium / Small
- **State**: Default / Hover / Active / Active tag / Filled / Filled Hover / Filled Active / Disabled / Error

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

> ⚠️ Прямого компонента с таким названием в реальном коде нет. Ниже — наиболее близкая по смыслу реализация, использовать как ориентир, а не как эталон.

Путь в исходном репозитории: `src/solidJs/shared/ui/molecules/MultiselectTagFilter`

Переиспользуемого компонента "текстовый инпут с чипами внутри" в `shared/ui` не нашлось. `MultiselectTagFilter` — это строка "Toggle + произвольный children" для фильтра по тегам (например, в списке фильтров), а не текстовое поле ввода: сам компонент не содержит `<input type="text">`, только `Toggle` (переключатель) и слот `children` для лейбла тега. Пропсы: `isSelected`, `setIsSelected`, `id`, `children`. Стилизация минимальная — flex-контейнер с gap 10px, без вариантов Size/State из Figma-инвентаря (Medium/Small, Default/Hover/Active/Filled/Disabled/Error там не реализованы вовсе).

Скопированные файлы:
- `Reference Code/MultiselectTagFilter.tsx` — компонент строки фильтра (Toggle + children), не текстовый инпут.
- `Reference Code/MultiTagFilter.module.scss` — стили контейнера (flex, gap 10px).
