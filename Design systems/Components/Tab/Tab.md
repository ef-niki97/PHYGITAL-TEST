# Tab

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Tab**.

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Tab (полоса из нескольких табов) | Size=Small, Type=Primary | 36px | 130px (пример, 2 таба) |
| Tab (полоса) | Size=Large, Type=Primary | 50px | 126px (пример, 2 таба) |
| Tab (полоса) | Size=Small, Type=Secondary | 32px | 198px (пример, 3 таба) |
| Tab_Item (один таб) | Size=Small (Primary или Secondary) | 32px | auto (по тексту) |
| Tab_Item (один таб) | Size=Large, Type=Primary | 42px | auto |
| Tabs Billing Plan | Property=Active/Inactive | 115–116px | 190px |

"Tab" (целая полоса) и "Tab_Item" (один таб) — разные по смыслу сущности: высота одного таба (32/42px) более надёжна как токен, чем высота целой полосы, которая зависит от количества и типа табов внутри. "Tabs Billing Plan" — отдельный паттерн для карточек выбора тарифа, не обычный таб.

## Семейства

### 1. Tab (полоса)
- **Type**: Primary / Secondary
- **Size**: Small / Large
- **Tabs**: 2 Tabs / 3 Tabs (количество табов в примере)

### 2. Tab_Item (один таб)
- **Size**: Small / Large
- **Type**: Primary / Secondary
- **Status**: Default / Active
- **State**: Default / Hover

### 3. Tabs Billing Plan
Карточка выбора тарифного плана (не текстовый таб, а крупная карточка).
- **Property 1**: Active / Inactive

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").
