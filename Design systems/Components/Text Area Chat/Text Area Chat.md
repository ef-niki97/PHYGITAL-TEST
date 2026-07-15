# Text Area Chat

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Text Area Chat**. Текстовое поле для чата с ИИ-ассистентом (отдельно от обычного [Text Area](../Text%20Area/Text%20Area.md) и от черновых версий на странице [Text Area Prompt](../Text%20Area%20Prompt/Text%20Area%20Prompt.md)).

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| TextAreaChat | State=default/hover/filled/loading | 56px | 334px (пример) |
| _TextAreaChat_new_button | Type=Default/Stop, State=Default/Hover | 44px | 44px |

## Семейства

### 1. TextAreaChat
- **State**: default / hover / filled / loading

Фиксированная высота 56px во всех состояниях (в отличие от черновой версии на странице Text Area Prompt, где размеры того же компонента другие и зависят от Scrolled/Attachment).

### 2. _TextAreaChat_new_button
Круглая кнопка отправки/остановки генерации рядом с полем чата.
- **Type**: Default / Stop
- **State**: Default / Hover

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").
