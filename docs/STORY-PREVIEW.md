# Refresh the existing Codespace preview

The two new missions are on codex/cloud-first-foundation, in draft PR #1. Nothing has been merged or deployed.

1. Open the Terminal in the SAME Codespace that is already on this branch.
2. If npm run preview is running, click in that terminal and press Ctrl+C once.
3. Run git status. If you have unexpected source edits, keep them and stop before pulling; the title experiment in the website form did not edit source files.
4. Run git pull --ff-only.
5. Run npm test (24 tests at this revision).
6. Run npm run build.
7. Run npm run preview.
8. Open the forwarded port 4173 from Ports, keeping it Private. Refresh the preview tab.
9. Open /teacher/ and click “Preview the three-mission story,” or select either new mission from the dropdown.
10. Review the full story, chapter checks, graphs, notes, mastery, persistence and report downloads. Use docs/STORY-MISSIONS.md for the answer key.

If the pull fails because your Codespace has local edits, do not reset or discard files. Save/inspect the work first. Updating a preview does not approve a merge or release. The school/home access check is still postponed.
