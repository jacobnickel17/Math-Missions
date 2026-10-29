# Operation Signal Zero — teacher guide for Missions 2 and 3

## Sequence and purpose
1. Equation Vault (existing): equations with variables on both sides, special solution types, modeling and error analysis. Unchanged.
2. The Blackout Ledger (approximately 60 minutes): interpret fixed/variable cost, compare tables around a crossover, build revenue/cost/profit models, and justify minimum whole-number quantities.
3. The Signal Window (approximately 60 minutes): translate inclusive/strict limits, solve/graph inequalities, reverse direction for negative division, and combine limits into a feasible plan.

Vault already introduces break-even comparison. Mission 2 advances to NET PROFIT, assumptions, and discrete decisions rather than presenting break-even as a wholly new skill. Mission 3 formalizes those boundaries as sets of solutions. Negative coefficients are within Missouri Grade 7 7.EEI.B.4c; combined constraints and optimization add application. Pause for explicit instruction if this is a student's first inequality lesson. Signal Window revision 2 adds six interactive example steps in Chapter 1 and four with reduced support in Chapter 2; see UNIT-5-VERIFICATION.md for the updated review evidence.

The story follows Vault's rover into Meridian Middle's Night Market, an invented student showcase. Its missing broadcast turns out to be a student-made time capsule. Chapter clues gradually change the mystery from “what broke?” to “what do we want future students to remember?” No real emergencies or dangerous equipment instructions are used.

## Preview and assignment
The student release status of each mission is determined by content/catalog.json and the teacher-approved production deployment. The Signal Window is staged in the Unit 5 release review branch and must not be shared until that release is approved. In a private teacher Codespaces preview, click “Preview the three-mission story,” or open /missions/sequence.html. You can also select either story mission in the teacher dropdown and use Preview selected mission. Source content and answer keys are public repository files, not secure assessments.

The direct previews are /missions/story.html?id=blackout-ledger and /missions/story.html?id=signal-window. The recommended prerequisite order is visible in the sequence; it is not a centralized student completion lock. After mastery, the ledger links to the window. Use the Signal Window student assignment link only after you approve the release and verify it on a school Chromebook.

## Pacing
Allow two 30–35 minute sessions per mission if one 60-minute block is too long.
- First session: opening, first two chapters, quick discussion of reasoning.
- Second session: last two chapters, independent mastery, final reflection, report export.
- Students complete the worked teaching before the guided/practice/independent items.
- All three chapter answers must be checked correct, plus a reasoning note of at least 30 characters, to reveal the clue. The length check does not grade reasoning.
- Mastery is five items without hints, passing at 4/5. An alternate five-item form supports another attempt. Reports retain all submitted mastery attempts.
- Discuss model assumptions and explanations before treating completion as mastery.

## Materials and vocabulary
Graph questions first ask students which real numbers are solutions, then require the number at the circle, shading direction, and circle type. Wrong or missing solution-set interpretations do not pass even if the drawing is right. For graph interactions and the new correct-answer graphs, see [graph review](GRAPH-REVIEW.md). Students can place boundaries on scaled number lines, choose endpoint/shading with buttons or menus, or use a keyboard slider. Verified graphs appear after a correct formative check and in mastery review after submission.

Scratch paper and a way to submit a downloaded text report. Calculators may support decimal arithmetic; ask students to record the model and reasoning.
- Ledger: fixed cost, variable rate, total cost, revenue, profit/loss, crossover, assumption, whole-number threshold.
- Window: inequality, boundary, solution set, at most/at least, strict/inclusive, open/closed endpoint, domain, constraint, feasible, objective.

## Evidence and feedback
Each chapter has one guided question, one practice question, one independent checkpoint, and a reasoning prompt. Correct numerical checks are not proof that the written reasoning is sound. Use a quick 0–2 rubric for each chapter:
- 0: missing or unrelated explanation.
- 1: useful model or calculation, incomplete interpretation.
- 2: correct model/calculation AND contextual explanation with units, boundary/assumption or a check.

The final reflection is teacher-reviewed. Ledger: defend a plan with costs, revenue, profit and an assumption. Window: identify the shared set, choose an objective, and verify each constraint. A 4/5 score plus a weak reflection needs follow-up rather than automatic credit.

## Differentiation
Support: read the story aloud, underline units, color-code fixed fee versus variable rate, and compare only two table rows before the full rule. For inequalities, physically test points to the left/right and say whether equality is allowed.
Extend: have students propose two feasible showcase schedules with different objectives; change one price or time limit and explain which decision changes. Students can also redesign an ending with an honest record of school life for the next crew.

## Progress and submission
These new missions save responses, checked answers, hints, reasoning and mastery attempts in localStorage by mission ID and content revision. They do not alter Vault's storage. Unsupported storage produces a notice to export before leaving. A content revision change starts a new local attempt. Work does not transfer automatically across devices.

Download mission report works during or after a mission. It includes responses, number of checks, first-check correctness, hint usage, chapter reasoning, mastery submissions and final reflection. It is a local self-report, not a tamper-proof grade or a teacher dashboard. Submit through the school's approved class system.

## Teacher acceptance checks
- First ledger price calculation: 20 badges cost $66; inverse invoice: $81 means 30 badges.
- Profit vs revenue: $100 − $66 = $34 for 20 sold; $77 target requires 33, since 32 yields only $76.
- Unsold inventory: 33 printed and 28 sold yields $54.50.
- Window: 50 − 4x ≥ 14 gives x ≤ 9; do not accept x ≥ 9.
- Number line: x < 9 uses an open circle and left shading.
- All rules: whole game rounds 6, 7, 8, 9; most rounds 9, lowest-cost choice 6.
- Verify draft banners, progress refresh, alternate mastery, report downloads and narrow-screen usability before approving.

## Full answer key

### The Blackout Ledger

#### The receipt nobody signed
- guided: **36 + 1.50n** — The $36 fee is fixed; $1.50 is multiplied by the number of badges.
- practice: **66** — 36 + 1.50(20) = 36 + 30 = $66.
- unlock: **30** — 36 + 1.50n = 81 gives 1.50n = 45, so n = 30 badges. Check: 36 + 45 = 81.

#### The crossover clue
- guided: **16** — The fixed-cost difference is $24 and the rate difference is $1.50 per badge. 24 ÷ 1.50 = 16 badges.
- practice: **Choose A: $72 versus B’s $84.** — A costs $72, B costs $84. A saves $12 for this order.
- unlock: **B below 16 badges; either at 16; A above 16.** — B’s lower setup wins below the crossover. A’s lower rate wins above it. At n = 16 both cost $60.

#### The money that is not yours yet
- guided: **5n − (36 + 1.50n)** — Profit is 5n − (36 + 1.50n), which simplifies to 3.50n − 36.
- practice: **34** — Revenue = $100. Cost = $66. Profit = $34.
- unlock: **30** — 3.50n − 36 = 69 gives 3.50n = 105, so n = 30. Revenue $150 minus cost $81 leaves $69.

#### The fraction on the invoice
- guided: **Profit is $76, which is $1 short.** — 32 badges produce $76 profit. A target is met by checking the quantity, not by ordinary rounding.
- practice: **33** — 32 gives $76; 33 gives $79.50. The minimum is 33 badges.
- unlock: **Profit is 5(28) − [36 + 1.50(33)] = $54.50, so the $77 goal is missed.** — Revenue is $140 from 28 sales. Printing cost is $85.50 for 33 badges. Profit is $54.50. The all-sell assumption matters.

#### Mastery form 1
1. **60** — 24 + 2(18) = $60.
2. **18** — 24 + 2n = 6 + 3n gives 18 = n; both totals equal $60.
3. **X: $84, versus Y’s $96.** — At n = 30, X is $84 and Y is $96.
4. **36** — Revenue is $100 and cost is $64, leaving $36.
5. **25** — The threshold is 74/3 ≈ 24.67. 24 gives $48; 25 gives $51, so 25 is the minimum.

#### Mastery form 2
1. **52** — 28 + 1.50(16) = $52.
2. **20** — 28 + 1.50n = 8 + 2.50n gives n = 20. Both cost $58.
3. **X: $73 versus Y’s $83.** — X(30) = $73; Y(30) = $83. $58 is their cost at 20 badges.
4. **44** — Revenue is $99; cost is $55; profit is $44.
5. **19** — 73/4 = 18.25. 18 gives $44, short; 19 gives $48, enough.

### The Signal Window

Current scenario: class Game Day. Snacks cost $18; prizes cost $6 per round; budget $90. Each round takes 4 minutes out of 50, with at least 14 minutes for cleanup.

#### Stay within the budget
- guided: **18 + 6x ≤ 90** — 18 + 6x ≤ 90 means the snack and prize costs stay at $90 or less.
- practice: **x <= 12** — Subtract 18: 6x ≤ 72. Divide by 6: x ≤ 12. You can afford up to 12 rounds.
- unlock: **v > 8: the smallest possible number of students is 9.** — “More than 8” leaves out 8. The smallest whole number that works is 9.

#### Show answers on a number line
- guided: **12, filled, left** — Fill the circle at 12 and shade left. Twelve and smaller numbers work.
- practice: **5, filled, right** — Fill the circle at 5 and shade right. Five minutes and longer times work.
- unlock: **9, open, left** — Use an open circle at 9 and shade left. Nine is not allowed; shorter times work.

#### Solve with a negative number
- guided: **x <= 9** — −4x ≥ −36 gives x ≤ 9 after dividing by −4 and flipping the sign. Play 9 rounds or fewer.
- practice: **Dividing by −4 should flip ≥ to ≤. Ten rounds leave too little cleanup time.** — Dividing by a negative flips the sign. Ten rounds use 40 minutes and leave only 10, so x ≥ 9 cannot be right.
- unlock: **x < 9** — Subtract 62: −5x > −45. Divide by −5 and flip: x < 9. Nine rounds leave exactly 17 minutes, so 9 is not allowed.

#### Choose a plan that works
- guided: **6, 7, 8, 9** — 6, 7, 8, and 9 meet all three rules.
- practice: **9** — Nine rounds meet every rule. Ten would leave too little cleanup time.
- unlock: **6 rounds: $54 total and 26 minutes left for cleanup.** — Six is the smallest number that meets every rule. Each extra round adds $6.

#### Mastery form A
1. **x <= 10** — The answer is x ≤ 10. 5x ≤ 50 gives x ≤ 10; equality is allowed.
2. **4, open, right** — The answer is t > 4. Open circle at 4; shade right. 4 is not a solution.
3. **x <= 6** — The answer is x ≤ 6. −6x ≥ −36 becomes x ≤ 6 after dividing by −6.
4. **6** — The common whole-number choices are 4, 5, 6. Maximum: 6.
5. **Exclude 7; the valid list is 3, 4, 5, 6.** — The ≤ includes 3, but < excludes 7.

#### Mastery form B
1. **x <= 12** — The answer is x ≤ 12. 4x ≤ 48 gives x ≤ 12. Twelve is included.
2. **7, filled, right** — The answer is t ≥ 7. Filled circle at 7; shade right. 7 is a solution.
3. **x < 8** — The answer is x < 8. −5x > −40 gives x < 8 after dividing by −5. Eight is excluded.
4. **7** — The whole numbers that work are 5, 6, and 7. Eight is not allowed because x < 8.
5. **5 rounds, because it is the smallest allowed number.** — Choose 5 rounds. It meets the rules and costs less than 6 or 7 rounds.
