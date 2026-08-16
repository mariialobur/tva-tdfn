from pathlib import Path
p = Path('scripts/apply-hardening-v16-4-1.mjs')
s = p.read_text(encoding='utf-8')
start = s.index("evaluation = replaceOrFail(evaluation,\n`        <p>${result.passed")
end_marker = "`,'best result message');"
end = s.index(end_marker, start) + len(end_marker)
replacement = r'''evaluation = replaceOrFail(evaluation,
"        <div class=\"tdfn-result-actions\">\n          ${result.passed ? '<button class=\"btn primary\" id=\"tdfnResultAttestation\" type=\"button\">Générer mon attestation</button>' : ''}",
"        ${result.bestResultPreserved ? `<p class=\"tdfn-best-result\"><strong>Meilleur résultat conservé :</strong> ${lastResult.score} / ${lastResult.total}. L’attestation reste liée à ce meilleur résultat enregistré localement.</p>` : ''}\n        <div class=\"tdfn-result-actions\">\n          ${lastResult?.passed ? '<button class=\"btn primary\" id=\"tdfnResultAttestation\" type=\"button\">Générer mon attestation</button>' : ''}",'best result message');'''
s = s[:start] + replacement + s[end:]
p.write_text(s, encoding='utf-8')
print('Hardening script interpolation fixed.')
