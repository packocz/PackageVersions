#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('./exec');

if (process.argv.length <= 2) {
	console.log('No release name provided');
	process.exit(1);
}
const releaseTagName = process.argv[2];

let changelogFileName = 'changelog.md';
if (process.argv.length > 3) {
	changelogFileName = process.argv[3];
}
console.log(`Changelog file name: ${changelogFileName}`);
const changeLogMd = fs.readFileSync(changelogFileName, { encoding: 'utf8' });

const branchName = exec('git rev-parse --abbrev-ref HEAD', { trim: true });
console.log(`Release branch name: ${branchName}!`);

const repo = {
	owner: 'packocz',
	name: 'PackageVersions'
};
const release = {
	tag: releaseTagName,
	commitsh: branchName,
	name: releaseTagName,
	body: changeLogMd,
	isDraft: false
};
const github = require('./github.js');
github.createRelease(repo, release);
