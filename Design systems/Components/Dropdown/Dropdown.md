# Dropdown

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Dropdown**. Это самая составная страница из Base Components — под именем "Dropdown" в файле лежат 4 разных семейства.

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| Dropdown Trigger (кнопка) | Size=Medium | 46px | 200px (пример) |
| Dropdown Trigger (кнопка) | Size=Small | 36px | 200px (пример) |
| Dropdown Menu (список) | Size=Medium, контейнер | auto (по кол-ву пунктов) | 220px |
| Dropdown Menu (список) | Size=Small, контейнер | auto | 208px |
| Dropdown Menu — пункт списка | Size=Medium | ~30px | 196px |
| Dropdown Menu — пункт списка | Size=Small | ~24px | 196px |
| Dropdown Picker | Size=Default | 34px | 132px (пример) |
| Dropdown Picker | Size=Rich | 34px | 162px (пример) |
| Dropdown Picker | Size=Picker Dark / Switch / Violet | 24px | 178px (пример) |
| Node Dropdown | Default / Hover / Disabled / Open | 24px | 90px |

## Семейства

### 1. Dropdown Trigger (кнопка, вызывающая меню)
- **Size**: Medium / Small
- **Type**: Black / White
- **State**: Default / Hover

### 2. Dropdown Menu (сам список)
> Компонент, который вызывает список действий по клику на кнопку или другой интерактивный элемент.
- **Size**: Medium / Small
- **Type**: Text / Divider / Search / Icon / Icon & Subtitle
- **Color**: Black / White

Высота контейнера зависит от количества пунктов — фиксирована высота одного пункта (30px Medium / 24px Small) и ширина контейнера (220px Medium / 208px Small). Поддерживает скролл, если пункты не помещаются; перенос текста максимум на 2 строки, дальше — многоточие; может открываться в разные стороны экрана, если не помещается.

### 3. Dropdown Picker
> Помечено в самой Figma как легаси: "много стилей, которые уже не используются в приложении + у нас нет тёмной темы".
- **Size**: Default / Rich / Picker Dark / Picker Switch / Picker Violet
- **Open**: Off / On (размер не меняется между Off/On)

### 4. Node Dropdown
> Компонент используется в ноде для выбора параметров.
- **State**: Default / Hover / Disabled / Open

Фиксированный размер 90×24px во всех состояниях.
