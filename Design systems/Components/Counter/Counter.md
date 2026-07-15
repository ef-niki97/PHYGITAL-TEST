# Counter

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Counter**.

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Counter (весь виджет: минус / значение / плюс) | 66px | 125px |
| Кнопка minus (Inactive / Active) | 24px | 24px |
| Кнопка plus (Inactive / Active) | 24px | 24px |

## Семейства

### Counter
Виджет из двух кнопок (минус/плюс) и числового значения между ними.
- **Кнопка minus — Property 1**: Inactive / Active
- **Кнопка plus — Property 1**: Inactive / Active

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

> ⚠️ Прямого компонента с таким названием в реальном коде нет. Ниже — наиболее близкая по смыслу реализация, использовать как ориентир, а не как эталон.

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/NumberInput`

Ближайший аналог — `NumberInputClosed`, числовой степпер на базе `@ark-ui/solid` `NumberInput` с кнопками decrement/input/increment (порядок как в Figma: минус / значение / плюс). Реализовано два визуальных варианта (`variant`): `default` (голый, без обёртки) и `seats` (пилюля с фоном `background-gray-light`, круглые кнопки на чёрном фоне, `disabled:bg-interaction-grey` — это и есть аналог состояния Inactive для кнопок). Размеры (`size`): `md`/`lg`/`xl` — в Figma зафиксирован только один размер виджета (66×125px), кнопки заданы как 24×24px. Состояние Active/Inactive в коде управляется через встроенный `disabled` пропс ark-ui (например, при достижении min/max), а не через ручной пропс, как можно было бы предположить из Figma-инвентаря.

Скопированные файлы:
- `Reference Code/NumberInput.tsx` — компаунд-компоненты `Root/Control/Input/IncrementTrigger/DecrementTrigger` и готовый `NumberInputClosed`
- `Reference Code/index.ts` — реэкспорт модуля `NumberInput`
