# Logo

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Logo**.

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Logo Phygital+ | Rus = Off | 32px | 165px |
| Logo Phygital+ | Rus = On | 32px | 204px |
| Favicon | любой Color | 120px | 120px |

Высота логотипа фиксирована (32px) для обеих версий, ширина больше у Rus=On за счёт дополнительного текста. Favicon — квадратный знак 120×120px.

## Семейства

### 1. Logo Phygital+
- **Color**: Black / White / Violet
- **Rus**: Off / On

### 2. Favicon
- **Color**: Violet / White / Black / Invert

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/atoms/Logo`

Реальный компонент `Logo` намного проще Figma-инвентаря: это без пропсов фиксированный кружок 26×26px с градиентной подложкой (`from-[#7D7AF2] to-[#FC51FF]`), внутри — SVG-иконка `Logo.svg`. Ни `Color` (Black/White/Violet), ни `Rus` (Off/On), ни отдельного семейства `Favicon` в коде нет — реализован один-единственный вариант знака, без текстовой части "Phygital+" и без переключения размера (32px в Figma vs 26px в коде — тоже расхождение).

Скопированные файлы:
- `Reference Code/Logo.tsx` — единственный вариант компонента: круглая градиентная подложка + SVG-иконка, без пропсов.
