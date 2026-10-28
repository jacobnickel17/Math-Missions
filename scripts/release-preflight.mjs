export function verifySettings(environment, policies, pages, main) {
 const rules=environment.protection_rules||[];
 const teacherRule=rules.find(r=>r.type==='required_reviewers' && r.reviewers?.some(x=>x.type==='User' && x.reviewer?.login==='jacobnickel17'));
 if(!teacherRule)throw Error('github-pages must require teacher jacobnickel17 approval');
 if(environment.deployment_branch_policy?.custom_branch_policies!==true)throw Error('Use custom deployment branch policy: main only');
 const branches=policies.branch_policies;
 if(!Array.isArray(branches)||branches.length!==1||branches[0].name!=='main'||branches[0].type!=='branch')throw Error('Only the main branch may deploy');
 if(pages.build_type!=='workflow')throw Error('Pages must use GitHub Actions, not legacy branch publishing');
 if(main?.protected!==true)throw Error('Protect main before production publication');
 if(environment.can_admins_bypass!==false)throw Error('Disable administrator bypass on github-pages');
}
if(process.argv[1]?.endsWith('release-preflight.mjs')){
 const base='https://api.github.com/repos/'+process.env.GITHUB_REPOSITORY;
 async function get(path){const r=await fetch(base+path,{headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});if(!r.ok)throw Error('Cannot verify release controls ('+r.status+'). Keep release disabled; inspect GitHub Settings.');return r.json();}
 const main=await get('/branches/main');
 if(main.commit?.sha!==process.env.GITHUB_SHA)throw Error('main changed since this release was selected. Review the latest revision.');
 verifySettings(await get('/environments/github-pages'),await get('/environments/github-pages/deployment-branch-policies'),await get('/pages'),main);
 console.log('Teacher reviewer, main-only environment, and Actions publishing verified.');
}

