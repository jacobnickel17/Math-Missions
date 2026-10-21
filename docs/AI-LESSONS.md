# AI-assisted drafting and revision

## Story missions added in this batch
The Blackout Ledger and The Signal Window use the richer story-v1 format: four teaching chapters, guided/practice/unlock items, reasoning, story reveals, two mastery forms, and report export. See docs/STORY-MISSIONS.md and assets/story-model.js. For AI revisions, preserve this schema and stable IDs; run npm test and npm run build. The simple import-draft script below remains for practice-format lessons only. New story-format proposals should be added on a review branch, registered with type story and status draft, and verified by validateStory. Update revision only when changed content should start a new local student attempt.

This workflow works with your chosen AI writing/coding tool. It does not require a browser API key, paid API integration, or unattended automation. Automated tests validate drafts; teachers approve pedagogy and release. Scheduled AI generation and an API-powered one-click generator are later decisions.

## New lesson
1. Open a Lesson creation or revision issue and specify grade, objective, prerequisites, reading level, duration, theme arc, misconceptions and evidence of mastery. Do not include student records.
2. In a cloud Codespace on a NEW branch, give your AI tool the prompt below plus content/catalog.json, content/lessons/signal-checkpoint.json, and assets/model.js as references.
3. Save the proposed JSON as proposal.json in the Codespace, not as a new public assignment. Inspect it before importing.
4. Run node scripts/import-draft.mjs proposal.json. This validates/registers a NEW draft; it refuses duplicate IDs, unsafe paths, wrong answers and non-draft status.
5. Remove proposal.json from the branch if it is just a duplicate working file. Run npm test and npm run build.
6. Preview /missions/lesson.html?id=YOUR-ID. Review every question, solution, hint, explanation, objective, reading demand and theme connection. Check keyboard usability on a school device.
7. Commit the catalog and lesson file, push, and open a DRAFT PR with the preview SHA and completed review template. Tests/preview artifact run automatically.
8. Once the content is teacher-approved, set its status to published and add its ID to an assignment in the same review branch. Re-test/re-preview that exact revision. Merge and release only through SETUP.md.

## Reusable prompt
Create a NEW Math Missions practice lesson proposal as a single JSON object with exactly two top-level keys: mission and lesson. Follow the repository's existing example and validators. Use a new stable lowercase kebab-case ID; mission.id and lesson.id must match. Set mission.type to practice and status to draft. Reference an existing arcId, use content/lessons/ID.json, and include title, unit, summary, skills array and minutes.

Lesson fields: id, objective, instructions, problems. Use 3–8 problems. Each problem needs a unique ID, student-facing prompt, numeric a/b/c/d/answer, hint and explanation. The renderer displays ax+b=cx+d. Use a different from c, finite modest integer coefficients, and integer answers. Verify each answer by substituting in both sides. Explain both algebraic steps and substitution. Scaffold from simpler problems to more demanding reasoning. Follow the requested grade, prerequisites, reading level, misconceptions and story briefing. Never add HTML, scripts, student records, secrets, or publishing actions. Return a draft for teacher review.

## Revise or extend an existing lesson
- Create a new branch. Ask the AI to revise the existing JSON while preserving the mission ID, file path, schema and arc continuity.
- Keep related assignments intact. For a substantially different lesson, use a NEW ID through the import workflow.
- Run tests/build; review the diff and preview before PR acceptance.
- Do not ask an AI to rewrite Equation Vault as part of routine content editing. Its embedded narrative/titles require a separate reviewed migration.
- Theme changes can update a reusable arc briefing and affected structured mission metadata. Vault does not read external arcs yet.

## What the automation proves
Validators check IDs/references/status, safe paths, required metadata, and unique linear-equation solutions with correct numeric answers. They do NOT establish the truth of prose explanations, curricular alignment, good pedagogy, or suitability of every story. Teacher review remains necessary. Answer keys/drafts are public in this repository; use the school LMS for secure assessments.
