# Checkbox

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Checkbox**.

## Размеры (px)

| Семейство | Вариант | Высота/Ширина |
|---|---|---|
| Checkbox Large | Default / Active × Default / Hover / Disabled | 24×24px |
| Checkbox Small | Default / Active × Default / Hover / Disabled | 18×18px |
| Checkbox (в Node) | checked × hover × disabled | 16×16px |
| Checkbox group item | Small | 268px (пример) × 58px |
| Checkbox group item | Medium | 268px (пример) × 40px |

Для "Checkbox group item" ширина 268px — это ширина примера в редлайне, не жёсткий токен (строка обычно тянется на всю ширину контейнера); высота (58 / 40) фиксирована.

## Семейства

### 1. Checkbox Large
- **Type**: Default / Active
- **State**: Default / Hover / Disabled

### 2. Checkbox Small
- **Type**: Default / Active
- **State**: Default / Hover / Disabled

### 3. Checkbox (Node)
> Используется для активации / деактивации свойства в Node.
- **checked**: on / off
- **hover**: on / off
- **disabled**: on / off

### 4. Checkbox group item
Чекбокс как пункт списка (с лейблом и, возможно, описанием), а не одиночный квадрат.
- **Type**: Small / Medium
- **Active**: True / False
- **State**: Default / Hover / Disabled

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/CheckBox`

В коде существуют два независимых компонента чекбокса. Первый — `CheckBox` (нижний, на native `<input type="checkbox">` + `<label>`), стилизован через `CheckBox.module.scss` с зашитыми хардкод-цветами (`#9570FC` на checked, `#CBD5E1` на border) и фиксированным размером 16×16px — состояние disabled/hover в CSS не описано. Второй — `ArkClosedCheckBox`/`Root`/`Control`/`Indicator`/`Label`, построенный на `@ark-ui/solid` Checkbox с tailwind-variants: реализован только один размер (`size: "md"`, 20×20px через `size-5`) и вариант `disabled` (снижение opacity, `pointer-events-none`); слот `color` объявлен, но пуст. Индикатор поддерживает как `checked` (иконка `Check`), так и `indeterminate` (иконка `Minus`) — в Figma-инвентаре indeterminate не упомянут. В целом набор размеров из Figma (Large 24px, Small 18px, Node 16px, group item 268×58/40px) в коде не реализован — есть только один размер md и отдельный ручной 16px-вариант; hover-состояние для ArkCheckBox задано (`hover:outline-border-gray-dark`), а group item (пункт списка с лейблом) как отдельный компонент не найден.

Скопированные файлы:
- `Reference Code/CheckBox.tsx` — оба компонента: native `CheckBox` (input+label) и ark-ui-based `Root/Control/Indicator/Label`/`ArkClosedCheckBox`
- `Reference Code/CheckBox.module.scss` — стили native-варианта (checked-цвета, размер 16×16px)
- `Reference Code/index.ts` — реэкспорт модуля `CheckBox`
