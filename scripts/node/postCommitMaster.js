#!/usr/bin/env node

const { exec } = require('./exec');

const branchName = exec('git rev-parse --abbrev-ref HEAD', { trim: true });
console.log(`You just commited to ${branchName}!`);

if (branchName !== 'master' && branchName !== 'main') {
	console.log('Not master/main branch, skipping version bump');
	return;
}

const changedProjectJson = exec('git diff --name-only HEAD~1 HEAD | grep sfdx-project.json', { trim: true });
if (changedProjectJson) {
	console.log('Last commit included change to sfdx-project.json, skip version bump!');
	return;
}

console.log('Bumping versions...');

exec(`./scripts/node/bumpVersion.js`);
