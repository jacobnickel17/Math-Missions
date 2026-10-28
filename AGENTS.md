# Math Missions contributor instructions

- Use the connected repository and PR workflow so teacher review works from school or home. Keep cloud preview ports private. Source control is the source of truth; do not require the teacher to maintain local copies.
- Preserve `unit-4/equation-vault/index.html` and `tests/vault-baseline.json` unless the teacher explicitly requests a Vault change. Do not weaken its regression check.
- Inequality instruction must progress from interactive steps with optional hints to reduced support, independent checkpoints and mastery without hints. Record hint use separately from mastery. Verify arithmetic, relation reversal, endpoint inclusion, shading, units and whole-number domains.
- Run `npm test` and `npm run build -- --production` before requesting review. Report device, keyboard and Canvas checks honestly; DOM tests are not real-device evidence.
- Keep production deployment separate from preview. The teacher must approve the exact reviewed revision before publication; preserve fail-closed release controls. Never use a workflow edit, administrator bypass or branch auto-publishing to skip that approval.
- Do not store student names, reports or other student data in this public repository. Progress is browser-local; reports are submitted through Canvas, not automatically transmitted.
