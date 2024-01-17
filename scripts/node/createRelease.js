#!/usr/bin/env node

const fs = require('fs');
const changeLogMd = fs.readFileSync('changelog/test.md', { encoding: 'utf8' });

const repo = {
	owner: 'packocz',
	name: 'PackageVersions'
};
const release = {
	tag: 'v1.0.0',
	commitsh: 'create-release',
	name: 'v1.0.0',
	body: changeLogMd,
	isDraft: false
};
const github = require('./github.js');
github.createRelease(repo, release);
