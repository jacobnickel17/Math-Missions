# Teacher review before merge or release

This proposal has not been merged or deployed. The existing Equation Vault file matches Git blob 7e62de31644b0d5363806a7820399ff94f2647cd from main.

Automated verification covers catalog integrity, assignment publication rules, stable links, unsafe paths, incorrect equation answers, the Vault source baseline, and release-setting validation. The static build succeeds. A browser surface was unavailable in this execution, so visual layout, live interactions, report downloads and school-domain access still require teacher preview checks.

Before approving:
- Open /missions/, use the Unit 4 assignment, and follow its Vault link.
- Open /teacher/, change a title, validate/copy the proposal and inspect the resulting JSON.
- Preview /missions/lesson.html?id=signal-checkpoint. Confirm the draft banner, answer feedback and hints.
- In Vault, test existing progress persistence and the downloaded report.
- Try a narrow screen and keyboard-only navigation on a school device.
- Check SETUP.md protections BEFORE merge, especially Pages Source = Actions. Legacy branch publishing can otherwise publish a merge immediately.
- Confirm whether exported reports are sufficient or a district-approved progress dashboard is needed later.

Release preflight additionally reads GitHub settings and fails if it cannot verify the required teacher reviewer, main-only environment policy, and Actions publishing source. These settings were not changed or verified during staging. The release activation variable is not configured by this proposal.
