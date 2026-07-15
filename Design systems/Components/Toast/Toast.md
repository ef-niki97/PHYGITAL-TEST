# Toast

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Toast**.

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Type = Default / Success / Warning / Error | 52px | 247px (пример) |

Высота 52px одинакова для всех 4 типов — фиксированное значение. Ширина в файле — пример, в реальном использовании, вероятно, зависит от длины текста.

## Семейства

### Toast
- **Type**: Default / Success / Warning / Error

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/molecules/Toast`

Toast реализован как набор Ark UI примитивов (`Root`, `Title`, `Description`, `ActionTrigger`, `CloseTrigger`) через `createStyleContext`, варианты заданы `tailwind-variants`: `toastType` (default/error/success/warning/info — на один тип больше, чем в Figma-инвентаре, где только Default/Success/Warning/Error) и `size` (default/compact — этого варианта в Figma-инвентаре нет вовсе). Цвета типов заданы точечными hex-значениями (`#2E2D2D` для default/info, `#F20D33` для error), кроме success, который использует общий токен `bg-status-accent-positive`.

Скопированные файлы:
- `Reference Code/Toast.tsx` — примитивы Toast (Root/Title/Description/ActionTrigger/CloseTrigger), варианты toastType/size
- `Reference Code/index.ts` — реэкспорт как `StyledToast`
