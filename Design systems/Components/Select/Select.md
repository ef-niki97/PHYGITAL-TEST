# Select

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Select**.

> Компонент для выбора из списка. Представляет собой однострочное поле, которое позволяет выбрать из списка нужный пункт (доступен только один выбор).

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Select — само поле (без Label/Description) | Small | 32px | auto |
| Select — само поле (без Label/Description) | Medium | 40px | auto |
| Select — composite (с Label/Description) | Small | 72px | 392px (пример) |
| Select — composite (с Label/Description) | Medium | 90px | 392px (пример) |
| Dropdown Select / Item | Type=Default | 48px | 300px (пример) |
| Dropdown Select / Item | Type=User | 72px | 300px (пример) |

Как и у [Input](../Input/Input.md), высота 32px/40px подтверждена явным правилом из самой Figma: "если кнопка стоит рядом с селектом, кнопка должна быть размера как селект, чтобы высота была одинакова" (Small-селект = 32px рядом с 32px-кнопкой, Medium = 40px рядом с 40px-кнопкой). 72/90px — это уже поле + Label + Description вместе, не атомарный токен. Ширина везде auto по контейнеру.

## Семейства

### 1. Select
- **Size**: Small / Medium
- **State**: Default / Hover / Active / Filled / Filled Hover / Filled Active / Disabled / Error

Внутри можно включать/выключать Description, Label, Link (если есть Label), Icon left, Icon right — так же, как у Input.

### 2. Dropdown Select (сам список опций)
- **Type**: Text / Text & Icon / User

### 3. Dropdown Select / Item (пункт списка)
- **Type**: Default / User
- **State**: Default / Hover

> ❗ Легаси: в файле отдельно отмечено, что "в легаси встречаются ещё вот такие варианты селекта, когда выделение чёрное и Label 16px, а также когда дропдаун при открытии увеличен" — это старые варианты, не текущий стандарт.

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/molecules/Select`

Компонент `Select` (файл `Select.tsx`) построен на `Select` из `@ark-ui/solid` с обёрткой `tailwind-variants`/`createStyleContext`. Реализованы варианты `variant` (`default` / `ghost`) и `size` (`sm` / `md` / `lg`) — то есть в коде три размера против двух (Small/Medium) в Figma-инвентаре, добавлен `lg` с отдельной раскладкой (лейбл сверху, серый фон триггера). Есть готовый композитный компонент `SelectClosedComponent` с пропсами `items` (`label`, `value`, `subtitle`, `icon`, `avatar`, `disabled`, `group`, `onSelect`, `as`), `value`/`defaultValue`, `placeholder`, `label`, `renderValue` — покрывает Type=Default/User из Dropdown Select инвентаря (иконка/аватар в пункте списка соответствуют Type=User). Отдельный файл `SelectClosed.tsx` содержит вторую, более "тяжёлую" реализацию closed-select с поддержкой `multiple`, `clearable`, `searchable`, `renderTrigger`, `renderItem`, группами (`SelectClosedGroup`) и вариантом без обёртки `Root` (`SelectClosedComponentWithoutRoot`) — в файле спеки эти возможности (мультивыбор, группы, поиск) не упомянуты как отдельные Figma-варианты. Состояния Hover/Active/Filled/Error из Figma-инвентаря в коде выражены через Tailwind data-атрибуты (`data-[state=open]`, `hover:`, `focus`) и не документированы как отдельные пропсы.

Скопированные файлы:
- `Reference Code/Select.tsx` — основной компонент `Select` (варианты `default`/`ghost`, размеры `sm`/`md`/`lg`) и `SelectClosedComponent`.
- `Reference Code/SelectClosed.tsx` — расширенная версия closed-select с мультивыбором, поиском, группами и рендер-пропсами.
- `Reference Code/Select.stories.tsx` — Storybook-примеры использования компонента.
- `Reference Code/index.ts` — реэкспорт `StyledSelect` и `StyledSelectClosed`.
