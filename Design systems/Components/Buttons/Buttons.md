# Buttons

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Button**.

## Размеры (px)

Чтобы кодогенерация не придумывала свои значения каждый раз — фиксированные размеры, которые реально стоят в Figma (высота/ширина компонента, не текста):

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Button Primary | Large | 40px | auto (по содержимому) |
| Button Primary | Medium | 40px | auto |
| Button Primary | Small | 32px | auto |
| Button Extra Bold | — | 58px | auto |
| Button Premium | вариант 1 | 55px | auto |
| Button Premium | вариант 2 | 32px | auto |
| Button Flex | — | не задокументировано в Figma | не задокументировано |
| Button Icon | Large | 32px | 32px |
| Button Icon | Small | 20px | 20px |
| Button Cut Node | — | 20px | 20px |
| Button Generation | — | 56px | 320px (min) |
| Ask AI Button | — | 24px | 69px |
| Button Login | Default / Hover | 66px | 336px |

Для Button Primary высота — это фиксированное значение из геометрии компонента (в Figma нет отдельного redline-блока "Расстояния и отступы" для этого семейства, в отличие от остальных). Для Button Flex такого блока в файле вообще нет — размеры не заданы явно, это стоит уточнить у дизайнера, а не додумывать.

## Семейства кнопок

### 1. Button Primary
Базовая кнопка, основной набор.
- **Size**: Large / Medium / Small
- **Type**: Primary / Secondary / Tertiary / Tertiary v.2 / White / Ghost / Accent / Danger
- **State**: Default / Hover / Disabled / Loader

### 2. Button Extra Bold
> Применяется в основном на маркетинговых страницах (лендинги, промо-страницы), есть на страницах пейвола и апгрейда плана.
- **Type**: Primary / Secondary / Tertiary
- **State**: Default / Disabled / Hover
- Есть Link for Storybook

### 3. Button Premium
> Применяется для отображения фичей, которые доступны только для плана выше.
- **Size**: Large / Medium / Small
- **Icon**: вкл/выкл
- **Text**: свободный ввод

### 4. Button Flex
> Текстовая кнопка.
- **Size**: Large / Small
- **Type**: Primary / Secondary
- **State**: Default / Hover

### 5. Button Icon
> Кнопка для иконок.
- **Size**: Large / Small
- **Type**: Primary / Accent / Secondary / Outline / Ghost / Overlay
- **State**: Default / Hover / Disabled
- **Rounded**: On / Off
- **Icon**: выбор иконки

### 6. Button Cut Node
> Отображается при наведении на связях между нодами. При нажатии удаляет связь.
- **Type**: Image / Text / Audio / Video / 3D / SVG / Document

### 7. Button Generation
> Основная кнопка для взаимодействия и старта генерации в нодах.
- **State**: Default / 50% / 99% / Stop / Re-generate / Queued / Upload / Compose
- **Credit**: числовое значение

### 8. Ask AI Button
> Кнопка внутри ноды для взаимодействия с ИИ-ассистентом.
- **State**: Default / Error
- **Hover**: вкл/выкл

### 9. Button Login
Соц. логин ("Continue with Google").
- **State**: Default / Hover

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/Button` и `src/solidJs/shared/ui/atoms/ButtonSwitcher`

`Button.tsx` содержит два компонента. Основной `Button` — полиморфный (`component` меняет рендер-элемент через `Dynamic`), с пропами `variant`, `size` (small/medium/large), `pending`, `disabled`, `component`. Вариантов `color` в коде на порядок больше, чем типов в Figma-инвентаре, и они называются иначе: вместо Figma-схемы Primary/Secondary/Tertiary/Tertiary v2/White/Ghost/Accent/Danger в коде используется матрица вида `{Primary|Secondary|Tertiary}{Accent|Neutral|Overlay}[Icon]` (`PrimaryAccent`, `SecondaryNeutral`, `TertiaryOverlay`, `SecondaryNeutralIcon` и т.д.) плюс отдельные одиночные варианты под конкретные места использования (`ButtonPremium`, `ButtonNode`, `ButtonFooter`, `FlexButtonPrimary`/`FlexButtonSecondary`, `Ghost`, `dark`, `opacity`, `headerButton` и др.). Судя по названиям, `ButtonPremium` и `ButtonNode` соответствуют Figma-семействам "Button Premium" и "Button Generation"/кнопкам в нодах, а `FlexButtonPrimary`/`FlexButtonSecondary` — семейству "Button Flex"; остальные Figma-семейства (Button Icon, Button Cut Node, Ask AI Button, Button Login) отдельными вариантами здесь не выделены и, возможно, реализованы в других, не скопированных файлах. Состояние `pending` даёт shimmer-анимацию (аналог Figma-состояния Loader), `disabled` — стандартное затемнение с `pointer-events-none`. Второй компонент, `ButtonExtraBold`, реализует ровно то, что задокументировано в Figma для "Button Extra Bold": варианты `Primary`/`Secondary`/`Tertiary` и состояние `disabled`.

`ButtonSwitcher.tsx` и соседние файлы — не отдельное семейство кнопок из Figma, а обвязка для переключателя между несколькими значениями (аналог сегмент-контрола), построенная поверх `Button`: `ButtonSwitcher` — générик-компонент на `Index`, вычисляющий `isSelected` для каждого элемента (поддерживает как одиночный `activeIndex`, так и множественный выбор через объект-Record); `ButtonSwitcherBtnItemsContainer`/`ButtonSwitcherBtnItemsContainerPremiumBanner` — контейнеры-списки для текстовых кнопок-переключателей; `SwitcherButtonItem`/`SwitcherButtonPremiumItem` — сами кнопки-переключатели (текстовые); `SwitcherImageItemsContainer`/`SwitcherImageItem` — вариант с карточками-изображениями вместо текста (используется, например, для выбора среди визуальных превью). В Figma-инвентаре этого компонента нет как отдельного семейства.

Скопированные файлы:
- `Reference Code/Button/Button.tsx` — `Button` (полиморфный, варианты color/size/pending/disabled) и `ButtonExtraBold`
- `Reference Code/Button/Button.stories.tsx` — Storybook-истории с примерами всех вариантов и размеров
- `Reference Code/ButtonSwitcher/ButtonSwitcher.tsx` — générик-логика переключателя (одиночный/множественный выбор)
- `Reference Code/ButtonSwitcher/ButtonSwitcherBtnItemsContainer.tsx` — контейнеры-списки для текстовых кнопок-переключателей
- `Reference Code/ButtonSwitcher/SwitcherButtonItem.tsx` — текстовые кнопки-переключатели (обычная и Premium-версия)
- `Reference Code/ButtonSwitcher/SwitcherImageItem.tsx` — элемент-переключатель на основе изображения
- `Reference Code/ButtonSwitcher/SwitcherImageItemsContainer.tsx` — контейнер-сетка для image-переключателей
