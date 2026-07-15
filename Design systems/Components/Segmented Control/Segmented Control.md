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

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/molecules/SegmentGroup`

В коде компонент называется `SegmentGroup` и построен на `SegmentGroup` из `@ark-ui/solid` с обёрткой `tailwind-variants` через `createStyleContext`. Реализованы варианты `size` (`sm` / `lg`) и `variant` (`rounded` / `square` / `line`) — это заметно шире, чем один вариант "Type/State" из Figma-инвентаря: `rounded` — таблетка с активным сегментом на фиолетовой заливке (ближе всего к Figma-версии), `square` — сегменты на сером фоне с белой активной плашкой, `line` — подчёркивание нижней границей без фона. Состояние активного сегмента передаётся через `data-[state=checked]`, отдельного React/CSS-состояния Disabled на уровне `Item` в коде не видно (в отличие от Figma, где для Item заявлены Default/Hover/Active/Disabled), disabled только как проп `Item`. Есть готовый "закрытый" компонент `SegmentGroupClosedComponent` — принимает массив `items` (`label`, `value`, `disabled`, `renderItem`) и `value`, без нужды вручную собирать `Root`/`Item`/`Indicator`.

Скопированные файлы:
- `Reference Code/SegmentGroup.tsx` — стили (`tv`) и обёртки Ark UI компонентов (`Root`, `Item`, `ItemText`, `ItemControl`, `Indicator`, `Label`), плюс `SegmentGroupClosedComponent`.
- `Reference Code/index.ts` — реэкспорт модуля.
