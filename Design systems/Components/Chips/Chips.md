# Chips

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Chips**.

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Tag | Type=Label, все State/Status | 32px | 89px (пример) |
| Chips | Size=Medium | 32px | 71px (пример) |
| Chips | Size=Small | 24px | 59px (пример) |

Ширина везде зависит от текста (hug-content) — фиксирована только высота.

## Семейства

### 1. Tag
- **Type**: Label
- **State**: Default / Hover
- **Status**: Default / Active / TagsInput

### 2. Chips
- **Size**: Medium / Small
- **State**: Default / Hover / Error

Есть также "Chips Group" — пример-контейнер с несколькими чипсами рядом (360×104px), не отдельный компонент.

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/Tag`

В коде компонент называется `Tag`, не Chips/Chips-Tag. Это кнопка (`<button>`) с `pointer-events-none` — то есть фактически нередактируемая, невзаимодействующая метка, без hover/active/error-состояний из Figma-инвентаря. Размеры (`size`): `sm`/`md`/`lg` (все — `px-2 py-1 text-xs`, кроме `lg` — `px-3 py-1.5`), что не совпадает с Figma, где у Chips только Medium/Small, а у Tag варианты по Type/State/Status. Цветовых вариантов (`color`) в коде семь: `default`, `blur`, `premium`, `lightBlur`, `blueGradient`, `grayGradient`, `yellowGradient` — в основном градиентные/blur-заливки, не соответствующие Figma-статусам Default/Active/TagsInput/Error. Прямого соответствия между Figma-семействами (Tag/Chips) и цветовыми вариантами кода нет — код реализует более широкую и по-другому организованную палитру.

Скопированные файлы:
- `Reference Code/Tag.tsx` — компонент `Tag`, все 7 цветовых вариантов и 3 размера
