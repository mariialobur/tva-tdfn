# Установка версии 12.0

Версия 12.0 подготовлена как статический пакет для GitHub Pages.

## Что загружать

Загрузите содержимое этой папки в корень репозитория, из которого публикуется `mariialobur.github.io/tva-tdfn/`.

Критически важные файлы: `index.html`, `styles.css`, `app.js`, `data.js`, `logic.js`, `store.js`, `components.js`, `transition.js`, `.nojekyll`.

Папку `.github/workflows/` также стоит сохранить: там находится проверка smoke/unit/E2E в GitHub Actions.

## После загрузки

1. Дождитесь завершения GitHub Pages deployment и Quality workflow.
2. Откройте сайт в приватном окне или выполните hard refresh, чтобы исключить старый кэш.
3. Проверьте, что вверху отображается `Cas maîtrisés 0 / 36`, а первый модуль содержит J1, J2, J3.
4. На desktop пройдите J1, D3, N, M, P и L5.
5. На телефоне проверьте J1, D3 и L5: миссия и необходимые данные должны быть видны без открытия полного dossier.
6. Проверьте открытие `Mémo TDFN`, `Sources officielles`, checklist, импорт/экспорт прогресса и возврат после ошибки через `Corriger mes réponses`.

## Совместимость прогресса

Хранилище v12 использует ключ `tva_tdfn_v120_state`. Состояния v11 (`v100`) и прежних версий мигрируются. Старый большой кейс J был разделён на J1/J2/J3, поэтому прежний score J намеренно не засчитывается как освоение J1. Аналогично старый K не валидирует новый K0.

## Проверки перед публикацией

Локально в этой сборке подтверждены:

```text
Smoke: 62/62 PASS
Unit: 37 cases PASS
JavaScript syntax: PASS
```

Playwright E2E в среде сборки не запущен, потому что доступный npm registry не отдаёт `@playwright/test` / `@axe-core/playwright`. На GitHub Actions workflow устанавливает Chromium и должен выполнить E2E уже в нормальном npm-окружении.
