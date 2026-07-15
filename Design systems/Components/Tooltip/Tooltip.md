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
