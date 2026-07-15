# Switch

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Switch**.

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Switch_Small | 13px | 24px |
| Switch_Medium | 19px | 34px |
| Switch_Large | 24px | 44px |

Все размеры фиксированы (не зависят от Type/State — только от Size).

## Семейства

### Switch
- **Size**: Small / Medium / Large
- **Type**: Default / Active
- **State**: Default / Hover

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/Toggle`

В папке `Toggle` реализованы два разных компонента. `Switch` — обёртка над Ark UI (`@ark-ui/solid`) с вариантами `size` (sm/md/lg) и `colorStyle` (purple/green), стилизована через `tailwind-variants`; поддерживает подпись через `children` и `inputProps` для нативного `<input>`. `Toggle` — более простой нативный чекбокс с ручной вёрсткой через `Toggle.module.scss` (переключатель на CSS-transition, зелёный фон включённого состояния). В Figma-инвентаре выше зафиксированы только размеры (Small/Medium/Large) и Type/State — без деления на два разных компонента и без цветового варианта purple, это расхождение с кодом.

Скопированные файлы:
- `Reference Code/Toggle.tsx` — компоненты `Switch` (Ark UI, варианты size/colorStyle) и `Toggle` (нативный чекбокс)
- `Reference Code/Toggle.module.scss` — стили для `Toggle` (нативной версии)
