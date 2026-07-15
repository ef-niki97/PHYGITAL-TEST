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

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/RadioGroup` и `src/solidJs/shared/ui/atoms/RadioSwitcher`

`RadioGroup` — обёртка над `@ark-ui/solid` (`RadioGroup.Root/Item/ItemControl/ItemText/Indicator` через `createStyleContext`), стили на `tailwind-variants`. Реализован единственный размер `size: "md"` (кружок `size-5`, 20px) — вариантов Small/Medium из Figma-семейства "Radio group item" в стилях нет, размер не параметризован по факту. Есть `disabled` (общий, снижает opacity и глушит pointer-events) и `data-[state=checked]` для отображения залитой точки внутри кружка через `before:`-псевдоэлемент — отдельного "Active"-типа как в Figma нет, состояние checked управляется через ark-ui `value`/`onValueChange`. Дополнительно есть закрытый хелпер `ArkClosedRadioGroup`, собирающий полный список радио-пунктов из массива `options` с лейблом.

`RadioSwitcher` — принципиально другой паттерн: это горизонтальный сегментированный переключатель (набор скрытых `<input type="radio">` + связанные `<label>`), внешне похожий на табы/switcher, а не на список "радио-кнопка + текст" из Figma-семейства "Radio group item". Стилизация вынесена в отдельный `RadioSwitcher.module.sass`, который не запрашивался и не копировался — в скопированном `.tsx` на него есть импорт, но самого файла стилей в `Reference Code/` нет.

Скопированные файлы:
- `Reference Code/RadioGroup/RadioGroup.tsx` — компоненты RadioGroup на базе Ark UI (Root/Item/ItemControl/ItemText/Indicator, стили через tailwind-variants) + закрытые хелперы ArkClosedRadioItem/ArkClosedRadioGroup.
- `Reference Code/RadioGroup/index.ts` — реэкспорт `RadioGroup` из папки.
- `Reference Code/RadioSwitcher/RadioSwitcher.tsx` — сегментированный переключатель на скрытых radio-инпутах (обособленный паттерн, не список радио-пунктов).
