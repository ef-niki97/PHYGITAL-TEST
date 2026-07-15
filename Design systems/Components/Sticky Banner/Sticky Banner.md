# Sticky Banner

Часть [Design systems](../..). Инвентарь собран из Figma-файла [Components](https://www.figma.com/design/j5KLNIldIndVDcg5bsHZhC/Components), страница **Sticky Banner**.

## Размеры (px)

| Вариант | Высота | Ширина |
|---|---|---|
| Type = Primary / Info | 44px | 1440px (пример; в других примерах на той же странице — 741px) |

Высота 44px одинакова во всех примерах на странице (при разной ширине контейнера — 1440px и 741px), так что это надёжный фиксированный токен. Ширина везде — по контейнеру (баннер на всю ширину экрана/секции).

## Семейства

### Sticky Banner
- **Type**: Primary / Info

Назначение не задокументировано в Figma (нет блока "Для чего применяется?").

## Реализация в коде (продакшен-референс)

Путь в исходном репозитории: `src/solidJs/widgets/MinorUpdateStickyWidget`

> ⚠️ Прямого компонента с таким названием в реальном коде нет. Ниже — наиболее близкая по смыслу реализация, использовать как ориентир, а не как эталон.

В shared/ui переиспользуемого компонента "Sticky Banner" нет — вместо этого в проде несколько виджет-специфичных полос-уведомлений (`MinorUpdateStickyWidget`, `PromoCodeStickyWidget`, `MaintenanceStickyWidget`, `ConfirmPaymentStickyWidget`), каждая со своей логикой и разметкой. Здесь скопирован `MinorUpdateStickyWidget` как показательный пример: компонент `StickyHeader` показывается по условию (`versionCtx.getIsMinorUpdateVisible()` или debug-флаг `MinorUpdateModal`), высота полосы — `h-12` (48px, близко к 44px из Figma-инвентаря), фон — токен `bg-status-positive`, содержимое — иконка + текст сообщения об обновлении и кнопка `Save & Reload` (`variant="SecondaryAccent"`) с состояниями `pending`/`disabled` через хук `useSaveWorkspaceFeature`. Отдельных вариантов `Type=Primary/Info`, заявленных в Figma, в коде нет — вариативность в проде реализована не через пропсы одного компонента, а через отдельные компоненты-виджеты под конкретный сценарий (минорное обновление, промокод, техобслуживание, подтверждение платежа).

Скопированные файлы:
- `Reference Code/ui.tsx` — компонент `StickyHeader`: условный рендер полосы, иконка, текст, кнопка сохранения и перезагрузки страницы.
- `Reference Code/index.ts` — реэкспорт `StickyHeader` как `MinorUpdateStickyBanner` и default-экспорт.
