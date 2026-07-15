# Badge

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Badge**.

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Badge | Outline, Size=Medium | 24px | 53px (пример) |
| Badge | Default, Size=Medium | 22px | 53px (пример) |
| Badge | Grey, Size=Medium | 22px | 53px (пример) |
| Badge | Default, Size=Small | 16px | 35px (пример) |
| Badge | New, Size=Small | 16px | 35px (пример) |
| Badge | Accent, Size=Small | 15px | 41px (пример) |
| Badge Sale | — | 18px | 36px (пример) |
| Node Coins Balance | Default / Error | 22px | 63px (пример) |
| Badge (иконка + текст) | — | 24px | auto (по тексту, примеры 62/64/68px) |

Ширина везде зависит от текста (hug-content) — фиксирована только высота. У Outline высота на 2px больше, чем у Default/Grey того же размера (за счёт обводки).

## Семейства

### 1. Badge (основная матрица)
- **Type**: Outline / Default / Grey / New / Accent
- **Size**: Medium / Small

### 2. Badge Sale
Отдельный одиночный вариант (без Type/State/Size).

### 3. Node Coins Balance
Бейдж для отображения баланса кредитов в нод-канвасе.
- **State**: Default / Error

### 4. Badge (иконка + текст)
Компактный бейдж с иконкой слева и текстом (встречается в узлах/нодах), ширина по контенту.

Назначение не задокументировано в Figma (нет блока "Для чего применяется?") ни для одного из семейств.
