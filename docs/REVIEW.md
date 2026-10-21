# Teacher review before merge or release

This proposal has not been merged or deployed. The existing Equation Vault file matches Git blob 7e62de31644b0d5363806a7820399ff94f2647cd from main.

Automated verification now includes 23 tests covering catalog integrity, assignment publication rules, stable links, unsafe paths, equation and inequality answers, graph endpoints/directions, scaled SVG graphs and graph control/reveal events, checkpoint gates, alternate mastery forms, saved-state roundtrips, reports, the Vault source baseline, and release-setting validation. The static build succeeds. In guided preview, the teacher confirmed the original assignment link, metadata proposal validation, sample practice answers/hints, Vault report download and Vault progress persistence. Those checks do not approve the new story missions. A browser surface was unavailable to the agent for the new batch; visual and interactive review of both sequels remains pending. The school/home device check is postponed at the teacher's request.

Before approving:
- Open /missions/, use the Unit 4 assignment, and follow its Vault link.
- Open /teacher/, change a title, validate/copy the proposal and inspect the resulting JSON.
- Preview /missions/lesson.html?id=signal-checkpoint. Confirm the draft banner, answer feedback and hints.
- Preview /missions/sequence.html and both full story missions. Use docs/STORY-MISSIONS.md for teaching notes and answers; check independent gates, number-line controls, alternative mastery, local saving and report exports.
- In Vault, test existing progress persistence and the downloaded report.
- Try a narrow screen and keyboard-only navigation on a school device.
- Check SETUP.md protections BEFORE merge, especially Pages Source = Actions. Legacy branch publishing can otherwise publish a merge immediately.
- Confirm whether exported reports are sufficient or a district-approved progress dashboard is needed later.

Release preflight additionally reads GitHub settings and fails if it cannot verify the required teacher reviewer, main-only environment policy, and Actions publishing source. These settings were not changed or verified during staging. The release activation variable is not configured by this proposal.
