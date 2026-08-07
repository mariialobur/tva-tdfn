# Установка TVA TDFN v13.0 на GitHub Pages

1. Распакуйте ZIP.
2. Загрузите содержимое папки `tva-tdfn-v13.0` в корень репозитория GitHub Pages, заменив предыдущие файлы.
3. Сохраните `.nojekyll` и папку `.github`.
4. После публикации выполните жёсткое обновление браузера (`Ctrl+F5` / `Cmd+Shift+R`).
5. Проверьте, что загружаются `styles.css?v=13.0.0` и `app.js?v=13.0.0`.

## Прогресс пользователей

v13 использует localStorage-ключ `tva_tdfn_v130_state`.

Состояние v12 (`tva_tdfn_v120_state`) мигрируется автоматически. Старые миграции v10/v9/v8 также сохранены, поэтому обновление сайта не должно само по себе обнулять ранее сохранённый прогресс.

## Что проверить после публикации

Desktop:
- J1 — mission-first и Base légale;
- D3 — несколько TDFN + export;
- N — option и art. 77 al. 3 OTVA;
- M/P — procédure de déclaration / ch. 415;
- L5 — таблица dégrèvement ultérieur.

Mobile 375–390 px:
- миссия видна до вторичного контекста;
- `Données utiles` читаются без горизонтального скролла;
- `Base légale du cas` не перегружает экран;
- полный dossier закрыт по умолчанию;
- нижняя основная кнопка не перекрывает поля;
- calculator и QCM не вызывают горизонтальный overflow.

## Автоматические проверки

```bash
npm run test:smoke
npm run test:unit
npm run test:e2e
```
