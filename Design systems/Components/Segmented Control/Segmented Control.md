# Segmented Control

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Segmented Control**.

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Segmented Control (вся полоса) | 68px | 444px (пример) |
| Item (один сегмент) | 42px | 74px (пример) |

Высота одного сегмента (42px) надёжнее как токен, чем высота всей полосы (68px), которая зависит от количества сегментов и внешних отступов.

## Семейства

### 1. Segmented Control
Вся полоса целиком, без вариантов Type/State в файле.

### 2. Item
Один сегмент внутри полосы.
- **State**: Default / Hover / Active / Disabled

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").
