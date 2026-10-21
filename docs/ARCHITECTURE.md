# Cloud-first Math Missions blueprint

## Reviewed baseline
At d70a3e2f45402bd7089a85b2989352e0d2cb4440 the repository held README.md, index.html, and unit-4/equation-vault/index.html. No application build, test suite, workflow, or server existed. Main was unprotected when inspected. GitHub reports Pages exists, but its publishing settings have not been inspected or changed here.

Equation Vault is a standalone application with four guided gates, mastery assessment, localStorage progress, and a downloadable text report. Its URL, source bytes, storage key, answer checks, and report behavior remain unchanged. A SHA-256 baseline guards its file. Updating that baseline requires a separate, explicit review.

## Phase 1 — Stage and protect (this proposal)
- Keep production untouched while a draft PR is reviewed.
- Add dependency-free Node checks, static preview artifacts, and a disabled manual release workflow.
- Configure repository protection and the Pages approval environment before merging. See SETUP.md.
- Acceptance: tests green, Vault hash unchanged, teacher opens preview on school and home devices.

## Phase 2 — Content and assignments (implemented in this proposal)
- content/catalog.json owns stable IDs, editable titles, unit, skills, duration, status, story arc, and assignments.
- /missions/ shows assignment instructions, ordered mission links, and what to do next. Share ?assignment=unit-4.
- /teacher/ offers a metadata proposal form and a validated complete catalog editor. Copy into GitHub on a new branch; no website token or browser-only master copy.
- /missions/lesson.html renders the initial structured linear-equation practice format.
- /missions/story.html renders the two full draft sequels: The Blackout Ledger (profit models and discrete decisions) and The Signal Window (inequalities and feasible plans). Teaching, worked steps, guided/practice/independent checkpoints, reasoning, story reveals and alternate mastery forms live in story-v1 JSON. Each mission has isolated local saving and report export. The draft sequence is available from the teacher workspace; neither sequel is assigned automatically.
- Draft/archived lessons do not appear in the student library; assignments cannot target them.
- Assignment IDs and lesson IDs survive title edits. Current public assignments are class-wide, without student identifiers.
- Acceptance: rename a lesson in a branch, see it in preview, preserve its ID and link.

## Phase 3 — AI-assisted authoring (staged, human initiated)
- Issue template records objective, prerequisites, reading level, theme and success criteria.
- AI authors structured drafts or revises existing files on a branch; import script checks new drafts and automatically registers them.
- Automated checks verify each linear equation has a unique solution and its numeric answer is correct.
- Teacher checks explanations, pedagogy, accessibility, and story continuity, then reviews the preview PR.
- Draft status and release approval are separate. A paid API generator, scheduled generation, and automatic AI PR creation are not configured.
- Acceptance: import one proposal, reject an incorrect answer, preview, then approve content separately.

## Phase 4 — Controlled release (prepared, not activated)
- PR workflow tests and packages static previews; it cannot deploy.
- Manual release accepts only its exact main revision, rebuilds/test checks, and deploys through github-pages.
- PAGES_RELEASE_ENABLED must explicitly be true after environment protection and Actions publishing are configured.
- A release preflight also verifies teacher reviewer, main-only deployment policy, and Pages Actions mode through GitHub; unreadable or missing settings fail the release.
- Main-branch-only deployment and required teacher reviewers must be set in GitHub Settings; workflow YAML alone does not establish these settings.
- No automatic push deployment is included. Existing branch-based Pages publishing must be replaced before the first merge, or a merge could publish immediately.
- Acceptance: a release waits for teacher approval; a non-main release and mismatched SHA fail; the live Vault link and report download work.

## Decisions requiring teacher input before expanding
1. Tracking: retain exported reports in the school LMS initially. A dashboard with student accounts would require district-approved identity/storage and a separate design; GitHub Pages alone cannot supply it.
2. Editing: start with this form plus GitHub branch review. If copy/paste proves cumbersome, add an authenticated CMS whose saves create PRs, rather than storing personal tokens in the site.
3. AI: start with existing AI tools and teacher-triggered drafts. Add a server-side provider only after choosing a budget, key ownership, and allowed data policy.
4. Themes: story arc IDs and briefings are reusable. The new practice renderer reads them. Vault's internal narrative remains embedded until a separately approved refactor.
5. Previews: use private Codespaces ports or Actions artifacts initially. These are review previews, not automatically hosted per-PR websites. Add a distinct preview host only after choosing hosting/access requirements.

## Sources of truth and boundaries
GitHub main = approved source; branches = proposals; Pages = last approved published build. A Codespace is disposable cloud working space, not the master. Commit/push before switching computers. Teacher form edits are temporary until committed. Teacher management works cross-device; existing student Vault progress remains device-specific. Repository content, including draft answer keys, is public.

## Monitoring and recovery
Use PR checks for proposed changes, Actions for logs/artifacts, and the release environment history for production. Nothing runs on either personal computer after it closes. Workflow execution does not measure student activity or guarantee uptime. On failure, leave the last successful Pages version in place. To roll back, create a PR reverting the faulty source commit, preview it, and release the resulting new main SHA with teacher approval.
