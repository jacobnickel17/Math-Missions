# Unit 5 verification and release handoff

Reviewed October 28, 2026. Status: release branch only; teacher approval and device acceptance remain required. No production deployment was performed.

## Instruction and mathematics

The first example now requires six student responses: translate the cap, select the inverse operation, subtract, divide, test the included boundary, and apply the whole-number domain. Each correct check reveals the next step. Wrong responses keep the current step open. Hints are optional and recorded. The second example fades support to four steps: compute the reduced bound, solve, graph, and restrict the domain. Completed steps can be revisited. Both examples are required before their chapter unlocks. Chapters then retain guided/practice/independent checkpoints and reasoning.

Missouri alignment: [DESE Grade 7 expanded expectations](https://dese.mo.gov/sites/g/files/zuston521/files/media/pdf/2021/04/curr-math-mls%20expanded-expectaions-grade-7.pdf), page 3, 7.EEI.B.4c: writing, solving, graphing one-variable inequalities with rational coefficients; interpreting the solution set in context. Negative coefficients are included in this scope. Inclusive comparisons support the same solution-set reasoning. Combining several limits and optimizing a plan are additional applications, not a claim that the mission alone covers every Grade 7 expectation. Supporting arithmetic aligns to 7.NS.A.3; substitution checks support reasonableness under 7.EEI.B.3b.

Independently checked examples: 8 + 4t ≤ 44 gives t ≤ 9 (whole tickets 0–9); 3t + 2 < 20 gives t < 6 (open/left, whole trials 0–5). Main budget gives x ≤ 12; minimum loading time t ≥ 5 is filled/right; t < 9 is open/left. 50 − 4x ≥ 14 gives x ≤ 9, while 62 − 5x > 17 gives x < 9. Both exclude values on the wrong side when substituted. Combined feasible session counts are 6, 7, 8, 9; maximum 9 costs $72 and leaves 14 points; minimum-cost 6 costs $54 and leaves 26 points. Mastery A boundaries are 10, open/right at 4, and ≤ 6; maximum feasible count 6. Mastery B boundaries are 12, filled/right at 7, and < 8; maximum whole count 7.

## Verified automatically

- Content validation checks all 32 Signal Window questions, including the ten new example steps, and both mastery forms. Numeric and inequality/graph answers are verified from calculation metadata.
- A DOM/event test walks the full four-chapter student flow, answers both examples, unlocks each clue with reasoning, completes both mastery forms 5/5, and downloads the report. Mastery renders no hint disclosures or verified solutions before submission.
- Incorrect example responses cannot reveal the next step; hint use and first-attempt errors appear in the report. Saved intermediate example state survives JSON storage and app reinitialization.
- Storage failure shows a warning while retaining lesson use and report availability. Progress is local to the browser/profile/device, not cross-device student synchronization.
- Number-line events test click, numeric entry, slider, direction, endpoint and meaning changes. Mapping is checked at widths 720, 640 and 360; these are coordinate tests, not browser screenshots or Chromebook certification.
- Equation Vault matches its existing SHA-256 baseline. Its source file and baseline are excluded from the new commit. Blackout Ledger content is also unchanged.

## Remaining acceptance checks

Actual Chrome visual/keyboard testing and a 1366×768 or smaller Chromebook flow are NOT verified. Windows Computer Use stopped because it could not confidently identify the active browser URL for policy enforcement. The automated DOM tests do not replace tab-order, focus visibility, arrow-key behavior, screen-reader review or real-device checks. Test all of those before teacher approval.

The downloadable UTF-8 text report includes responses, first-check accuracy, hint use, reasoning, both mastery attempts and final reflection. Actual Canvas upload is NOT verified: no Canvas session or assignment was available. Configure Canvas as a File Uploads assignment accepting .txt, attach the downloaded report as a test submission, and inspect it as the teacher. No automatic Canvas grade passback is implemented.

## Cloud management and publication

Use [PR #3](https://github.com/jacobnickel17/Math-Missions/pull/3) for review and checks from either computer. An existing Codespace on this branch was visible: [dreadful coffin](https://github.com/codespaces/dreadful-coffin-wv5xq4r49xjq25v4w). Pull the latest branch before previewing; do not overwrite any uncommitted work. A new Codespace can be opened from the PR's Code → Codespaces menu. The checked-in devcontainer builds with Node 24 and forwards private port 4173; run `npm run preview` after building. No local downloads or installation are needed on the teacher's computer. Codespaces usage may consume the account's allowance.

CI uploads a revision-labeled preview artifact. It is a build artifact, not a hosted student link. A cloud preview of the new commit was not started or visually verified in this session.

GitHub reports main unprotected. The connector received HTTP 403 for branch-protection administration; no administration mutation tool is available. Protection was NOT changed. Repository settings for Pages, release activation and environment reviewers could not be fully verified with this connection. Keep publication disabled until these controls are configured:

1. Protect main: require PRs, the `test` check, up-to-date checks and resolved conversations; disable force pushes/deletion and apply protection to administrators. For a sole-owner repository, a mandatory separate PR approver may prevent the teacher from merging their own PR; use the deployment reviewer as the explicit teacher publication gate.
2. Set Pages to GitHub Actions. Require reviewer jacobnickel17 on github-pages, custom deployment branch `main` only, and disable administrator bypass. Allow that teacher to approve their own workflow if they are the only reviewer; the approval is a distinct manual action.
3. The release workflow only accepts teacher dispatch on main, requires the reviewed main SHA and `PAGES_RELEASE_ENABLED=true`, and fails closed if protection, reviewer, branch policy, Actions publishing or permissions cannot be verified. Controls and current main SHA are rechecked after environment approval immediately before deploy.
4. After device/Canvas acceptance, the teacher explicitly approves the exact PR revision. Merge, review the resulting main revision, run Teacher-approved Pages release with its full SHA, then approve the github-pages job. Do not bypass failed safeguards. Verify the resulting live assignment and unchanged Vault before sharing a student link.

Rollback: keep the existing deployment when checks fail. If an approved release misbehaves, revert through a new reviewed PR and the same approved deployment process. Do not directly rewrite main or force push.
