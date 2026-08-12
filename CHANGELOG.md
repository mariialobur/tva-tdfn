# Changelog — v16 refined

## UX / pédagogie
- Onboarding: 4 учебных шага + лишние понятия заменены на 3 TDFN-ориентира.
- Acquis/Maîtrisé убраны из onboarding.
- Module legal intro показывается только в первом кейсе relevant module.
- Module legal intro перенесён перед micro-lesson.

## Théorie / droit
- `Repères de chiffre d’affaires` переименованы в `Repères AFC pour l’entrée aux TDFN`.
- Уточнена область применения ориентиров первой année / année précédant effective → TDFN.
- Добавлено явное разграничение с maintien après dépassement.
- Réforme 2025 представлена как Avant / Depuis 2025.
- Effective → TDFN: rappel ch. 415.
- TDFN → effective: rappel ch. 410.

## Technique
- Удалён enhancement-layer как архитектурный принцип.
- Нет MutationObserver.
- Рендер module context добавляется в `renderCaseHead()`.
- CSS и JS version query обновляются до `16.0.0`.
- Перед записью создаётся backup v15.
