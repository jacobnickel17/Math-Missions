# Guided written responses across missions

The teacher requested clearer, more guided short-answer prompts with correct sample responses. This release adds that support to every existing written-response field, plus the paper-reasoning directions in the draft practice lesson.

Students see a plain-language prompt, a three-part evidence checklist and a sentence starter. An expandable “See one possible correct response” section models what to include, with a reminder that answers may vary and students should use their own reasoning. Samples never populate or overwrite their response. Teachers still review reasoning; existing automatic checks do not grade wording or mathematical explanation quality.

Coverage:

- Signal Window: all four chapter explanations and final plan recommendation.
- Blackout Ledger: all four chapter explanations and final badge recommendation.
- Equation Vault: all four mathematical takeaways, four gate reasoning logs, three create-a-lock responses and final debrief. Gate models use different problems. The active mastery explanation gets a neutral checklist and frame, with no worked sample or assessment answer.
- Lost Blueprint: the team explanation in each of the five rooms.
- Signal Checkpoint draft: a sample showing how to write and check equation reasoning on paper.

The shared content is in `assets/response-guidance.js`. New missions should add their writing supports there. Story missions render supports directly. The build attaches the shared enhancer to legacy mission pages; it handles newly rendered textareas after navigation. Equation Vault's original source, answer keys, grading, storage and checksum baseline remain unchanged. Its built page gains only a stylesheet and the support module. Tests verify that removing those two additions restores the exact original HTML.

Story reports record which writing models were opened, separately from question hints and mastery scores. Opening a writing model does not change the mastery score. Existing story progress remains compatible because neither lesson identity nor question content changed. Legacy reports continue to record the student's own text.

Validation: the automated suite checks story coverage, legacy field routing, accessible field descriptions, sample toggling without overwriting responses, duplicate prevention, no active mastery samples, unchanged legacy HTML after removing the added resources, and the existing full student flow. Browser visual/keyboard and school-device acceptance remain pending as recorded in UNIT-5-VERIFICATION.md.

These changes are part of PR #3 for teacher review. The preview is updated; production has not been deployed.
