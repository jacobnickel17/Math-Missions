# School and home setup — no local master copy

## One-time teacher setup, before merging this PR
These steps change release controls and are intentionally left for teacher approval. The existing site remains the baseline until you approve a release.

1. Sign into the GitHub account that owns jacobnickel17/Math-Missions. Enable two-factor authentication and retain recovery access.
2. Open Settings → Environments → github-pages (create it if absent). Add jacobnickel17 as a required reviewer. Limit deployment branches to main. Disable administrator bypass where available. If you are the only teacher/reviewer, leave Prevent self-review OFF so you can approve a release you initiated; enable it only after adding another teacher.
3. Open Settings → Pages. Record the existing live URL and publishing source. Change Source to GitHub Actions BEFORE merging code into main. Do not choose a new source branch. This replaces branch-triggered publication with the manual workflow. Verify the old site still loads. This configuration change does not authorize publishing the proposal.
4. Open Settings → Rules → Rulesets (or Branches → protection rule) for main. Require a pull request, require the Test and preview / test check (select its actual check name after the first run), require branches up to date, block force pushes and deletion, and apply rules to administrators where available. Add another trusted teacher and require one approval if you want a separate reviewer. GitHub PR authors cannot approve their own PR: a solo owner should use the deployment reviewer gate plus an explicit recorded teacher acceptance, rather than configuring an impossible self-approval requirement.
5. Review the draft PR below, confirm tests and preview, and record the reviewed SHA. Do not enable auto-merge.
6. After you have confirmed steps 2–4 and approved the code, set Settings → Secrets and variables → Actions → Variables → New repository variable: PAGES_RELEASE_ENABLED = true. Leave it absent until ready. It is a release switch, not a substitute for the reviewer protection.
7. Merge only when you approve the proposal. Merging does not run our release workflow. Verify Pages Source is Actions again before merging, because legacy branch publication bypasses this workflow.
8. Actions → Teacher-approved Pages release → Run workflow. Select main and paste the full main SHA you reviewed. The workflow checks that the SHA matches its own revision and runs tests/build.
9. When Waiting appears, review the exact commit and select Review deployments → github-pages → Approve and deploy. This is your production approval.
10. Open the deployment URL, /missions/, /teacher/, and the existing /unit-4/equation-vault/ link. Try a Vault answer, reload to check storage, and export a report. If the deployment fails, review Actions logs; do not bypass approval to force publication.

GitHub environment reviewers and branch restrictions are settings, not created by the YAML files. Their availability varies by repository visibility and plan. This repository was public when reviewed. If a protection option is unavailable, keep the release switch disabled until an equivalent control is established.

Official references:
- [Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Environment reviewers and deployment rules](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)

## Set up the school laptop
1. Use an approved browser and sign into the SAME teacher GitHub account.
2. Bookmark the repository, Pull requests tab, Actions tab, and its Settings → Pages URL. After approval/release, also bookmark the live /teacher/ and /missions/ pages.
3. Open the staged branch in GitHub. For quick file edits, press the period key to open github.dev. Create a new branch before editing.
4. For a working preview, on that branch choose Code → Codespaces → Create codespace on this branch. Run npm test, then npm run build, then npm run preview in the cloud terminal.
5. Open the Ports tab, port 4173, keep visibility Private, and choose Open in Browser. Add /missions/ to inspect assignments or /teacher/ for the editor. The PR artifact is another option, but a Codespace avoids local downloads or software installs.
6. Test the live student site from a student-accessible browser/device. Students need the Pages URL, not GitHub accounts. Ask school IT to permit the actual Pages domain; for teacher editing/preview also test github.com, github.dev, and the generated app.github.dev preview address.
7. If a teacher preview domain is blocked, use GitHub diffs and Actions checks from school while IT approves browser preview access. Do not assume a home-only preview proves school compatibility.

## Set up the home computer
1. Sign into the SAME account; bookmark the same repository, PRs, Actions, and live URLs.
2. Open GitHub Codespaces and resume the SAME cloud Codespace used at school. You do not need to clone or copy any folder.
3. If you create a different Codespace, open the correct branch and use committed/pushed GitHub files. Uncommitted changes in a different Codespace will not appear automatically.
4. Run the preview command if the server is stopped. Open port 4173 from the Ports tab. Check the same assignment and teacher pages.
5. Commit and push your branch before closing either computer. Record unfinished work in the PR description. Stop the Codespace when finished to manage usage.

github.dev edits remain in that browser until committed; Codespaces have usage limits/costs. Neither should be treated as permanent storage. [Browser editor details](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor) · [Private preview ports](https://docs.github.com/en/codespaces/reference/security-in-github-codespaces).

## Change a title or assignment from either computer
1. Open the teacher page in the preview or approved live site.
2. Choose a mission, edit title/description/skills/unit/time/story arc, then Update proposal.
3. For assignment directions, order, theme briefings or status, expand the full catalog editor and edit the relevant fields. Validate catalog.
4. Copy proposed catalog. Open the GitHub catalog editor, paste, and use Commit changes → Create a NEW branch → Propose changes. Never commit directly to main.
5. In the PR, wait for Test and preview. Open a Codespace on its branch and preview the updated title/assignment.
6. Share the final /missions/?assignment=unit-4 link in your school LMS after release. Use the assignment ID from the catalog.
7. Approve, merge, and follow the separate release procedure above.

The form does not silently save. Confirm your branch commit exists on GitHub before switching devices. A live form may be based on an older deployed catalog: compare with current main before pasting, or use a preview built from the latest main to avoid overwriting newer work.

## What is and is not synchronized
- Titles, lesson content, themes, assignments, tests, and release history: GitHub cloud.
- Teacher edits: shared only after commit/push.
- Student Vault progress: browser/device-local, exactly as before.
- Submitted reports/grades: your school LMS; this public site has no roster, dashboard, or grade collection.
- New structured practice responses: in-memory only; clears on navigation. Students keep reasoning on paper.
