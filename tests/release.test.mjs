import test from 'node:test';import assert from 'node:assert/strict';import {verifySettings} from '../scripts/release-preflight.mjs';
const env={can_admins_bypass:false,protection_rules:[{type:'required_reviewers',reviewers:[{type:'User',reviewer:{login:'jacobnickel17'}}]}],deployment_branch_policy:{custom_branch_policies:true}};
const policies={branch_policies:[{name:'main',type:'branch'}]},pages={build_type:'workflow'};
test('release gate requires teacher, protected main, no admin bypass and Actions publishing',()=>{
 const main={protected:true};
 assert.doesNotThrow(()=>verifySettings(env,policies,pages,main));
 for(const environment of [{...env,protection_rules:[]},{...env,can_admins_bypass:true}])assert.throws(()=>verifySettings(environment,policies,pages,main));
 assert.throws(()=>verifySettings(env,{branch_policies:[{name:'*',type:'branch'}]},pages,main));
 assert.throws(()=>verifySettings(env,policies,{build_type:'legacy'},main));
 assert.throws(()=>verifySettings(env,{branch_policies:[{name:'main',type:'tag'}]},pages,main));
 assert.throws(()=>verifySettings(env,policies,pages,{protected:false}));
});

