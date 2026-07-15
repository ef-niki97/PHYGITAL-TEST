# Slider

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Slider**.

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Slider | Label Position = Top (любой Fill/State) | 48px | 200px (пример) |
| Slider | Label Position = Side (любой Fill/State) | 32px | 264px (пример) |
| Input Slider | Property 1 = Default/Filled/Filled_Active | 43px | 378px (пример) |

Высота зависит только от **Label Position** — Fill (No Fill / Amount Fill / Negative Offset Fill / Positive Offset Fill) и State (Default/Hover/Focus/Touch/Disabled) на неё не влияют, это подтверждено полной матрицей вариантов в файле.

## Семейства

### 1. Slider
- **Label Position**: Top / Side
- **Fill**: No Fill / Amount Fill / Negative Offset Fill / Positive Offset Fill
- **State**: Default / Hover / Focus / Touch / Disabled

### 2. Input Slider
Слайдер с числовым полем ввода значения.
- **Property 1**: Default / Filled / Filled_Active

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/Slider`

Компонент `StyledSlider` — тонкая обёртка над `Slider` из `@ark-ui/solid`: `Root` → `Control` → `Track` (с `Range` и `Thumb`). Принимает все нативные пропсы `SliderRootProps` (в том числе `orientation` — горизонтальный/вертикальный, что покрывает Label Position Top/Side из Figma на уровне ориентации трека, но не как отдельный проп разметки лейбла) плюс кастомные `trackClass`/`controllClass` для переопределения стилей. Трек — `h-4` (16px) со скруглением и градиентной заливкой (`Range`, градиент violet→fuchsia→violet), бегунок (`Thumb`) — квадрат `size-4` (16px) со скруглением в круг и focus-состоянием (`focus:outline-blue-500`) и disabled-состоянием (`disabled:opacity-50`). Явного варианта "Input Slider" с числовым полем ввода, заявленного в Figma-инвентаре, в этом файле нет — реализован только базовый ползунок без вложенного текстового инпута; Fill-варианты (No Fill/Amount Fill/Negative Offset Fill/Positive Offset Fill) в коде не выделены как отдельные пропсы, а выражаются через позицию `Range` относительно `Track`, которую нужно вычислять на вызывающей стороне.

Скопированные файлы:
- `Reference Code/Slider.tsx` — компонент `StyledSlider` (Track/Range/Thumb на Ark UI Slider).
