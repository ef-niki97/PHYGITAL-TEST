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

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/shared/ui/molecules/TextAreaChat`

Компонент `TextAreaChat` — составной: textarea с авторесайзом по высоте (`recalculateTextAreaHeight`), опциональное превью прикреплённого файла/изображения с кнопкой удаления, кнопка `FileInput` для добавления изображения (включается пропом `renderFileInput`) и кнопка отправки/остановки генерации (`SendIcon`/`StopIcon` в зависимости от `isPending`). Отправка по Enter без Shift/Ctrl обрабатывается через `onSubmit`. В Figma-инвентаре зафиксирована фиксированная высота 56px во всех состояниях, в коде же высота textarea задана как `h-4 max-h-20` (растёт с контентом до предела) — то есть 56px в Figma, вероятно, высота примера с одной строкой текста, а не жёсткое ограничение.

Скопированные файлы:
- `Reference Code/ui.tsx` — компонент `TextAreaChat`: textarea, превью файла, кнопки добавления файла и отправки/стопа
- `Reference Code/index.ts` — реэкспорт `TextAreaChat` из `./ui`
