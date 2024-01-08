#!/usr/bin/env node

const project = require('./sfdxProject.js');
const { exec } = require('./exec');

let baseBranch = 'main';
let branchName = exec('git rev-parse --abbrev-ref HEAD', { trim: true });
if (process.argv.length > 1) {
	baseBranch = process.argv[2];
	console.log(`Override base branch: ${baseBranch}`);
}
if (process.argv.length > 2) {
	branchName = process.argv[3];
	console.log(`Override head branch: ${branchName}`);
}

/*const changedVersionedPackageFilter = (packageDefinition) => {
	if (packageDefinition.package === undefined) {
		return false;
	}
	const packagePath = packageDefinition.path;
	const hasChangesSinceForked = exec(
		`git diff --name-only --diff-filter=MCRA $(git merge-base ${branchName} ${baseBranch})..${branchName} ${packagePath}`,
		{ trim: true }
	);
	console.log(`Changes in ${packagePath} on [${branchName}] branch: ${hasChangesSinceForked}`);
	if (hasChangesSinceForked) {
		return true;
	}
	return false;
};

const changedVersionedPackages = project.getMatchingAndDependentPackages(changedVersionedPackageFilter);
*/
const changedVersionedPackages = project.getVersionedPackages();
const packagesWithBranch = changedVersionedPackages.map((obj) => ({ ...obj, branch: branchName }));

project.updatePackages(packagesWithBranch);
project.updatePackageDependencies();
