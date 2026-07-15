# Text Area Prompt

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Text Area Prompt**. Поле ввода промпта (для генерации). Это самая "черновая" из трёх Text Area страниц — на ней же лежат более старые версии TextAreaChat и TextArea с размерами, отличными от их актуальных отдельных страниц ([Text Area](../Text%20Area/Text%20Area.md), [Text Area Chat](../Text%20Area%20Chat/Text%20Area%20Chat.md)); ниже приведены только компоненты, относящиеся собственно к Prompt.

## Размеры (px)

| Семейство | Вариант | Высота | Ширина |
|---|---|---|---|
| TextAreaPrompt (набор 1) | Type=Placeholder/Filled/Error/Filled Undo × State=Default/Hover/Active | 101px | 320px (пример) |
| TextAreaPrompt (набор 2) | state=default/filled/focus/loading/hover/disabled | 123px | 337px (пример) |
| TextAreaPrompt (набор 2) | state=error | 139px | 337px (пример) |
| _textarea-prompt_button | type=random | 24px | 85px (пример) |
| _textarea-prompt_button | type=improve | 24px | 84px (пример) |
| _textarea-prompt_button | type=undo | 24px | 69px (пример) |
| _textarea-prompt_button | type=translate | 24px | 67px (пример) |
| _textarea-more_less | state=more | 16px | 88px (пример) |
| _textarea-more_less | state=less | 16px | 80px (пример) |

В файле есть два разных набора символов с одинаковым именем "TextAreaPrompt" и разными размерами (320×101 и 337×123/139) — оба присутствуют на странице, явного "актуального" не помечено.

## Семейства

### 1. TextAreaPrompt
- **Type**: Placeholder / Filled / Error / Filled Undo
- **State**: Default / Hover / Active

### 2. TextAreaPrompt (второй набор)
- **state**: default / filled / focus / loading / hover / error / disabled

### 3. _textarea-prompt_button
Кнопки действий под полем промпта (кубик по краю поля).
- **type**: random / improve / undo / translate

### 4. _textarea-more_less
Переключатель "показать больше / меньше" для длинного промпта.
- **state**: more / less

Назначение не задокументировано в Figma (нет блока "Для чего применяется?") ни для одного из семейств на этой странице.

## Реализация в коде (продакшен-референс)

> ⚠️ Прямого компонента с таким названием в реальном коде нет. Ниже — наиболее близкая по смыслу реализация, использовать как ориентир, а не как эталон.

Путь в исходном репозитории: `src/solidJs/entities/ChatGptEntities/ChatGptPromptGenLayout`

Отдельного UI-компонента текстового поля для промпта в коде нет. `ChaGptPromptGenLayout` — layout-сущность сценария генерации промпта ChatGPT: отображает сообщение пользователя (промпт), ответ ассистента, спиннер во время ожидания (`isPending`) и блок текстовых подсказок (`ChatGptHintMessage`), которые показываются по таймеру или по группе подписки пользователя через `PromptGenContext`/`hintRes`. Само поле ввода промпта с кнопками random/improve/undo/translate и переключателем more/less из Figma-инвентаря в этих файлах не реализовано — судя по всему, оно расположено в другом месте кодовой базы, вне скопированных файлов.

Скопированные файлы:
- `Reference Code/index.ts` — реэкспорт из `./ui`
- `Reference Code/ui/ChaGptPromptGenLayout.tsx` — layout сообщений режима генерации промпта и подсказок (`ChatGptHintMessage`)
- `Reference Code/ui/index.ts` — реэкспорт `ChaGptPromptGenLayout`
- `Reference Code/models/contexts/PromptGenContext.ts` — контекст с ресурсом хинтов (`hintRes`)
