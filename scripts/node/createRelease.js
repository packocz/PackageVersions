#!/usr/bin/env node

const repo = {
	owner: 'packocz',
	name: 'PackageVersions'
};
const release = {
	tag: 'v1.0.0',
	commitsh: 'create-release',
	name: 'v1.0.0',
	body: 'Initial release',
	isDraft: false
};
const github = require('./github.js');
github.createRelease(repo, release);
