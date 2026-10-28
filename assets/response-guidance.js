// Writing supports are separate from scoring and never populate student responses.
const guide=(prompt,steps,starter,sample)=>({prompt,steps,starter,sample});
export const storyGuidance={
 'signal-window':{
  translate:guide('Explain what x ≤ 12 tells us about affordable session counts.',
   ['Name at least two session counts that fit the budget.','Explain whether 12 is allowed.','Compare “at most 12” with “fewer than 12.”'],
   'More than one plan works because ___. “At most” includes ___, while “fewer than” ___.',
   'Both 10 sessions ($78) and 12 sessions ($90) fit the budget, so x = 12 is not the only plan. “At most 12” includes 12; “fewer than 12” excludes it. Actual session counts must be whole numbers from 0 through 12.'),
  graph:guide('Choose one graph and explain its circle and shading.',
   ['Write the inequality you chose.','Test the number at the circle: does it work?','Give a decimal or fraction that works, then explain which direction to shade.'],
   'I chose ___. The circle is open/filled because ___. The value ___ works, so I shade ___.',
   'For t ≥ 5, the solutions are all real numbers at least 5. Five is included, so the circle is filled. The value 5.5 also works. I shade right because those values are greater than 5.'),
  reverse:guide('Explain why dividing by a negative reverses the sign. Then test a wrong answer.',
   ['Use two numbers to show how multiplying by −1 reverses their order.','State the correct session limit.','Substitute one session count that fails into the original inequality.'],
   'For example, ___ < ___, but after multiplying by −1, ___. The limit is ___. The count ___ fails because ___.',
   'Two is less than five, but −2 is greater than −5: negatives reverse their order on the number line. In 50 − 4x ≥ 14, dividing −4x ≥ −36 by −4 gives x ≤ 9. Ten sessions leave 50 − 40 = 10 points, which is less than 14, so ten fails.'),
  combine:guide('Choose a goal and show that your session plan meets all three limits.',
   ['Choose maximum sessions OR lowest cost.','State your session count.','Check the minimum of 6, the $90 budget, and the 14-point reserve with numbers.'],
   'My goal is ___. I choose ___ sessions. This meets the minimum because ___. It costs ___ and leaves ___.',
   'My goal is lowest cost, so I choose 6 sessions. Six meets the minimum. The cost is 18 + 6(6) = $54, below $90. The reserve is 50 − 4(6) = 26 points, at least 14. Six is the smallest feasible count, and each additional session costs $6.'),
  final:guide('Recommend one session plan and explain why it works.',
   ['Name your goal and write x ≥ 6, x ≤ 12, and x ≤ 9.','List the whole-number counts that meet all three limits.','Check your chosen count in the budget and reserve. Explain one included or excluded boundary.'],
   'To ___, I recommend ___. The possible whole counts are ___. My plan costs ___ and leaves ___. The boundary ___ is included/excluded because ___.',
   'To maximize sessions, I recommend 9. The limits x ≥ 6, x ≤ 12, and x ≤ 9 allow 6, 7, 8, or 9 whole sessions. Nine costs $72 and leaves 14 energy points. It meets the minimum, and equality is allowed at the reserve limit. Ten would leave only 10 points, so nine is the maximum.')
 },
 'blackout-ledger':{
  model:guide('Explain the one-time fee, the per-badge cost, and your receipt check.',
   ['Identify the fixed fee and the cost of each badge.','Show how you found the number of badges on the $81 receipt.','Put that number back into the cost model.'],
   'The fixed fee is ___ and each badge costs ___. I solved ___. I checked by ___.',
   'The $36 fee is charged once, while $1.50 is charged for every badge. From 36 + 1.50n = 81, I subtract 36 to get 1.50n = 45, then divide by 1.50 to get 30 badges. My check is 36 + 1.50(30) = $81.'),
  compare:guide('Show why neither printing service is always cheaper.',
   ['Choose a badge count below the crossover of 16 and calculate both costs.','Choose a count above 16 and calculate both costs.','Say which service wins in each case.'],
   'At ___ badges, A costs ___ and B costs ___, so ___ is cheaper. At ___ badges, ___. Therefore ___.',
   'At 10 badges, A costs $51 and B costs $42, so B is cheaper. At 20 badges, A costs $66 and B costs $72, so A is cheaper. They tie at 16 badges for $60. A smaller setup fee does not make B cheaper for every order.'),
  profit:guide('Explain why sales money is different from profit.',
   ['State what revenue and profit mean.','Use 24 badge sales to subtract printing costs from revenue.','Name the assumption needed to use the same n for printing and sales.'],
   'Revenue is ___, but profit is ___. At 24 badges, ___. One n works only if ___.',
   'Revenue is all the sales money; profit is what remains after costs. At 24 badges, revenue is 5(24) = $120 and printing costs 36 + 1.50(24) = $72, leaving $48 profit. We can use one n only if every printed badge sells.'),
  whole:guide('Explain the smallest badge order that meets the $77 profit goal.',
   ['Compare profit from 32 badges with profit from 33 badges.','Explain why rounding down misses the goal.','Explain what changes if some printed badges do not sell.'],
   'The minimum is ___ because ___ gives only ___, while ___ gives ___. If some badges do not sell, ___.',
   'The minimum is 33 sold badges: 32 produce $76 profit, but 33 produce $79.50, meeting the $77 goal. Rounding 32.29 down would leave us short. If 33 badges are printed but only 28 sell, profit is 5(28) − [36 + 1.50(33)] = $54.50. Printing and sales need separate quantities.'),
  final:guide('Recommend a badge order and a sales target, with evidence.',
   ['Choose a printing service and a whole-number order.','Calculate cost, revenue, and profit for your sales target.','Check the $77 goal and describe one way the model could fail.'],
   'I recommend ___ and aim to sell ___. Cost is ___, revenue is ___, so profit is ___. This plan assumes ___.',
   'I recommend printing 33 badges with A and selling all 33. Cost is $85.50 and revenue is $165, so profit is $79.50, enough for the $77 goal. Thirty-two sales from an order of 32 would earn only $76 profit. The plan assumes every badge sells; unsold stock would reduce profit.')
 }
};
export const vaultNotes=[
 guide('Why must you make the same change to both sides?', ['Name an operation.','Explain how it keeps the sides equal.','Connect it to finding x.'], 'I ___ on both sides because ___. This keeps ___ and helps me ___.', 'I subtract the same x-term from both sides so the equation stays balanced. Making the same change preserves equality and collects the variable terms on one side.'),
 guide('What do true and false statements tell you after x disappears?', ['Give an always-true statement.','Give an impossible statement.','Match each to its solution type.'], 'If I get ___, then ___. If I get ___, then ___.', 'If x disappears and I get 4 = 4, every x works, so there are infinitely many solutions. If I get 4 = 7, no x can make it true, so there is no solution.'),
 guide('What does the break-even month mean?', ['State the month.','Calculate the total for each plan then.','Explain what the equal totals mean.'], 'At ___ months, both plans cost ___. That means ___.', 'At 4 months, Plan A costs 10 + 6(4) = $34 and Plan B costs 18 + 4(4) = $34. The solution m = 4 is the month when their total costs match.'),
 guide('How can substitution help you check a step?', ['Pick a value for x.','Evaluate the original and rewritten expressions.','Explain what unequal results prove.'], 'When x = ___, the original gives ___ and the rewritten expression gives ___. This shows ___.', 'At x = 1, 5(x − 2) equals −5, but the incorrect 5x − 2 equals 3. Since they give different results, they are not equivalent. Matching at just one value would not prove two expressions are always equivalent.')
];
export const vaultGates=[
 guide('Show a useful equation step and explain why it works.', ['Copy one step from your own solution.','Name the operation and say what it accomplishes.','Check your final value in the original equation.'], 'I changed ___ to ___ by ___. This helps because ___. My check is ___.', 'Different example: for 3x + 2 = x + 10, I subtract x from both sides to get 2x + 2 = 10. Then x = 4, and both original sides equal 14.'),
 guide('Choose one circuit and explain its solution type.', ['Name circuit A, B, or C.','Show what remains after simplifying.','Explain why that statement allows every x, no x, or one x.'], 'Circuit ___ simplifies to ___. This is always/sometimes/never true, so ___.', 'Different example: 2(x + 3) = 2x + 8 becomes 6 = 8 after subtracting 2x. That is false for every x, so there is no solution.'),
 guide('Explain your cost equation and what its solution means.', ['Write each plan as setup fee + monthly rate × months.','Set the total costs equal and state the solution with units.','Check both totals at that month.'], 'My equation is ___. I found ___ months, when both plans cost ___.', 'Different example: 8 + 3m = 14 + m gives 2m = 6, so m = 3 months. Each plan then costs $17. This is when their total costs match.'),
 guide('Identify the distribution error and show the corrected step.', ['Name the term that was multiplied incorrectly.','Show the correct distribution.','Explain that the outside number multiplies every term inside.'], 'The mistake was ___. The corrected step is ___. This is because ___.', 'Different example: 3(2x − 5) should become 6x − 15, not 6x − 5. The 3 must multiply both 2x and −5.')
];
export const architectGuidance=[
 guide('Create a lock with exactly one solution.', ['Put x on both sides of an equation.','Solve and state the one x-value.','Check it in the original equation.'], 'My equation is ___. Solving gives ___. Substituting gives ___ on both sides.', 'One possible lock is 3x + 2 = x + 10. Subtract x and 2 to get 2x = 8, so x = 4. Both original sides equal 14.'),
 guide('Create a lock with no solution.', ['Write an equation whose x-terms cancel.','Show the false number statement that remains.','Explain why no x can fix it.'], 'My equation is ___. It simplifies to ___, which is false, so ___.', 'One possible lock is 2x + 3 = 2x + 5. Subtracting 2x leaves 3 = 5, which is false. No value of x can solve it.'),
 guide('Create a lock with infinitely many solutions.', ['Write two equivalent sides.','Simplify until the x-terms cancel.','Explain why the remaining statement is always true.'], 'My equation is ___. Both sides simplify to ___. Therefore ___.', 'One possible lock is 2(x + 3) = 2x + 6. Both sides are 2x + 6, so subtracting 2x leaves 6 = 6. Every real x is a solution.')
];
export const vaultDebrief=guide('Compare no solution with infinitely many solutions.', ['Give an equation for each type.','Simplify each to a number statement.','Explain why false means none and always true means infinitely many.'], 'No solution looks like ___ because ___. Infinitely many solutions looks like ___ because ___.', 'The equation x + 2 = x + 5 leaves 2 = 5, so no x works. The equation 2(x + 1) = 2x + 2 leaves 2 = 2, so every real x works. The remaining statement decides the solution type.');
export const masteryWriting=guide('Explain your own work on one mastery question.', ['Identify the question number.','Show two steps from your own work, or the statement left after x cancels.','Explain what those steps tell you about the solution.'], 'Question ___. First I ___. Then I ___. This shows ___ because ___.', null);
export const blueprintGuidance=[
 guide('Explain how to check whether two expressions are equivalent.', ['Name a property or simplify both expressions.','Show one algebra step.','Explain why trying one value alone is not proof for every value.'], 'I used ___ to rewrite ___ as ___. They are equivalent because ___.', 'I distribute −4 to rewrite −4(3x − 5) as −12x + 20. The distributive property makes them equal for every x. Testing one value can reveal a mismatch, but cannot prove equivalence for all values.'),
 guide('Show how factoring and distributing undo each other.', ['Factor one expression.','Distribute to check it.','Explain why the expressions stay equal.'], 'Factoring ___ gives ___. Distributing gives ___ again, so ___.', 'Factoring −8n − 20 gives −4(2n + 5). Distributing −4 gives −8n − 20 again. Factoring writes the common factor outside; distributing multiplies it back into every term.'),
 guide('Choose an equation and check your solution by substitution.', ['Name the equation and your x-value.','Replace x with that value.','Show that both sides have the same value.'], 'For ___, I found x = ___. Replacing x gives ___, so ___.', 'For 3.6x − 5 = 22, I found x = 7.5. Substituting gives 3.6(7.5) − 5 = 27 − 5 = 22. Both sides equal 22, so my value works.'),
 guide('Name a variable and explain its units in one word problem.', ['Choose a problem and say what its variable measures.','State the units.','Explain one term in its equation using those units.'], 'In problem ___, ___ represents ___ measured in ___. The term ___ means ___.', 'In the panel problem, p is the price of one panel in dollars per panel. The term 45p is the cost of 45 panels in dollars. Adding the one-time $60 fee gives the total cost, so 45p + 60 = 330.'),
 guide('Compare the plans at 12 cells and explain when the cheaper plan changes.', ['Calculate both totals for 12 cells.','State the cheaper plan and savings.','Describe the tie at 8 and which plan wins on either side.'], 'At 12 cells, A costs ___ and B costs ___. I choose ___ because ___. Below/above 8 cells, ___.', 'At 12 cells, A costs 36 + 4(12) = $84 and B costs 12 + 7(12) = $96. A saves $12. Both cost $68 at 8 cells. B is cheaper below 8; A is cheaper above 8.')
];

export function renderWritingSupport(parent,g,id,{onSample}={}){
 const doc=parent.ownerDocument;
 const add=(p,tag,text)=>{const e=doc.createElement(tag);e.textContent=text;p.append(e);return e;};
 const box=add(parent,'section','');box.className='writing-support';box.id=id;
 add(box,'h4','Build your response');const ol=add(box,'ol','');for(const step of g.steps)add(ol,'li',step);
 add(box,'p','Sentence starter: '+g.starter);
 if(g.sample){const details=add(box,'details','');add(details,'summary','See one possible correct response');add(details,'p',g.sample);add(details,'p','Answers may vary. This is one model, not the only correct wording. Use your own reasoning and check that you included the points above.');details.ontoggle=()=>{if(details.open)onSample?.();};}
 else add(box,'p','Use your own mastery work. Model responses are available in training; no sample solution is shown during this independent check.');
 return box;
}
