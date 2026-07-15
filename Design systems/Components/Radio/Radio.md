# Radio

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Radio**.

## Размеры (px)

| Семейство | Вариант | Высота/Ширина |
|---|---|---|
| Radio | Default / Active × Default / Hover / Disabled | 24×24px |
| Radio group item | Small | 268px (пример) × 58px |
| Radio group item | Medium | 268px (пример) × 40px |

Для "Radio group item" ширина 268px — ширина примера, не токен (строка обычно тянется на всю ширину контейнера); высота (58 / 40) фиксирована. Размеры совпадают с [Checkbox group item](../Checkbox/Checkbox.md) — общий паттерн строки списка.

## Семейства

### 1. Radio
- **Type**: Default / Active
- **State**: Default / Hover / Disabled

Единственный размер (в отличие от Checkbox, у которого есть Large/Small/Node).

### 2. Radio group item
Радио-кнопка как пункт списка (с лейблом), а не одиночный кружок.
- **Type**: Small / Medium
- **Active**: True / False
- **State**: Default / Hover / Disabled

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").
