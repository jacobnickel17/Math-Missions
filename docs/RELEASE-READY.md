# First classroom release

The teacher has requested publication after previewing the hub, Vault, the new story chapters and graph interactions.

This release enables Equation Vault and The Blackout Ledger. Signal Checkpoint and The Signal Window remain drafts. The production build filters the student catalog and removes draft lesson JSON files, so the inequality mission cannot be opened on the live site. The full source and draft content remain saved in GitHub and available in Codespace previews.

The Blackout Ledger assignment is /missions/?assignment=blackout-ledger. Students should finish Vault first, work through the four Ledger chapters, complete mastery, and submit their downloaded report through the school class system. Its final link to the unreleased next mission is omitted automatically in production.

Teacher metadata proposals use the full saved catalog, including draft metadata, to avoid overwriting future work. Draft lesson previews require the Codespace. Student progress remains on the browser/device. The school/home device check is still postponed.

Validation: 25 tests pass, including a production-artifact check proving Vault/Ledger are included and draft lesson files are absent. The production build passes. Equation Vault's source is unchanged. The release still requires the configured GitHub environment approval.

Final publication steps:
1. Merge the checked PR with its exact tested head.
2. Set repository Actions variable PAGES_RELEASE_ENABLED to true.
3. Run Teacher-approved Pages release on main using the exact merged main SHA as approved_sha.
4. Review the preflight/test/build result, then approve github-pages when it waits.
5. Verify the live assignment URL and Vault link before sharing with students.

Do not approve an older workflow run or use a preview port as the student link. If preflight fails, retain the last successful site and inspect the failed step; do not remove the approval controls.
