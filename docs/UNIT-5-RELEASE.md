# Unit 5 · The Signal Window — publication review

Status: STAGED for teacher review only. The proposed change lives on release/unit-5-signal-window. Do not merge or deploy until the teacher approves the math and experience.

For the current evidence, remaining device/Canvas checks, cloud preview and publication blockers, read [UNIT-5-VERIFICATION.md](UNIT-5-VERIFICATION.md). The first two examples now use six guided steps and four steps with reduced support; they are no longer passive worked lists. Negative-coefficient inequalities align with Grade 7 7.EEI.B.4c; combined constraints/optimization add application beyond that core expectation.

## Proposed student experience
- Title: The Signal Window (Unit 5 · Mission 3)
- Story: continue Operation Signal Zero after The Blackout Ledger
- Four chapters: translate inequalities; graph real-number solution sets; reverse the symbol after negative division; combine whole-number constraints
- Each chapter: instructional explanation, worked example, guided question, practice question, independent gate and a required reasoning note
- Mastery: five new items, 4/5 passing, alternate form available without hints
- Duration: approximately 60 minutes; allow two sessions
- Student report: downloadable, submitted through Canvas; local browser storage only
- Intended assignment: /missions/?assignment=signal-window
- Lesson preview: /missions/story.html?id=signal-window
- Teacher answer key: docs/STORY-MISSIONS.md

## Teacher acceptance checks before release
1. From the PR branch, run npm test and npm run build and preview port 4173 privately in Codespaces. Check that main and Equation Vault are unchanged.
2. Check the first chapter's worked example as a student new to inequalities. Ensure the instructions are explicit enough about interpreting a solution *set*. Decide whether more step-by-step interactive scaffolding is required before approving.
3. Check number-line placement on both laptop and school Chromebook: x ≤ 12 closed/left; t ≥ 5 closed/right; t < 9 open/left. Verify meaning selection is required and keyboard controls work.
4. Check negative division: 50 − 4x ≥ 14 yields x ≤ 9, while 62 − 5x > 17 yields x < 9. Test boundary and one value beyond it.
5. Check combined whole-session choices 6, 7, 8, 9; maximum 9 and minimum-cost 6, $54.
6. Complete the 5-item mastery and alternate form. Confirm no hints and verified solution graphs hidden until submission; teacher reviews reasoning, not just auto-score.
7. Refresh in the middle of a lesson; confirm saved progress. Complete and download the text report. Do not put student names or private data in the public repository.
8. Review the student homepage, /missions/, and the direct assignment link on a student Chromebook. The teacher-only Codespaces preview is not an appropriate student URL.
9. Check the PR's Test and preview workflow succeeds. Teacher explicitly approves changes before merging.

## Publication process
- Ensure Settings → Pages uses GitHub Actions and the github-pages environment requires teacher approval, restricted to main. Check main branch protection; it was reported unprotected during the Oct 28 audit.
- Merge only the reviewed release PR after teacher acceptance. Merge alone is not the intended publication action.
- Actions → Teacher-approved Pages release → Run workflow from main, supplying the exact reviewed main SHA and with PAGES_RELEASE_ENABLED=true only after the controls are configured.
- Approve the waiting github-pages deployment.
- Verify live home card, assignment link, story access, number-line interaction, mastery and report download, and Equation Vault.
- Only then post the student link to Canvas.

## Rollback
Retain the previous working production release if any tests or approval controls fail. Do not bypass the reviewer gate. Revert a bad release through a new reviewed PR and approved deployment.

