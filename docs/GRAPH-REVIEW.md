# Scaled inequality graphs — preview review

The graph questions now include a student graph builder on a labeled number line. Click/tap to place the boundary; the typed boundary, slider, direction/endpoint menus and graph buttons stay synchronized. The keyboard-accessible slider moves one tick at a time. Horizontal scrolling preserves legible ticks on narrow screens.

The student's drawing is labeled “Your graph — not checked.” After a correct formative check, a separate “Correct solution graph” shows the expected boundary, filled/open circle, and shaded ray. Editing any answer clears the verified graph and requires another check. Solved inequality questions also reveal a graph after a correct check. Mastery solution graphs appear only after the whole form is submitted, including review graphs for incorrect items.

Current graphs show -5 through 15 at one-unit tick intervals. Boundary positions use actual numeric coordinates; fractional typed values are placed between ticks. The line's arrows represent continuation beyond its viewport. These are real-number solution graphs; the lesson separately explains whole-number context restrictions. A future question can supply graphScale with min, max, and step to use another interval.

Progress storage and lesson IDs/revisions are unchanged, so the interface update preserves the current student attempt. Vault is unchanged. Neither new mission is assigned or deployed.

Automated verification: 23 tests pass, including coordinate scaling, fractional/negative positions, all four inequality directions/endpoints, SVG fills/labels, click and slider events, verified-graph clearing, and mastery reveal timing. Event tests use a DOM fixture; visual/browser and touch-device checks still require teacher preview.

Teacher review:
1. Rebuild the latest branch preview using docs/STORY-PREVIEW.md.
2. In The Signal Window, revisit Draw the signal window.
3. For x ≤ 12, click 12 on the number line, select Filled circle and Shade left, then Check answer. Confirm a separate correct graph appears at tick 12.
4. Change the endpoint to Open. The verified graph should disappear, and Check answer should reject it.
5. Check t ≥ 5 and t < 9 for right/filled and left/open respectively.
6. Return to an inequality-solving question. After solving correctly, confirm its solution graph appears too.
7. Refresh and confirm your progress and correctly checked graphs return.
8. In mastery, confirm no correct-solution graph appears before submission.
