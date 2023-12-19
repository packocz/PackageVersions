#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('./exec');

const MAJOR = 0;
const MINOR = 1;
const PATCH = 2;
const BUILD = 3;

try {
	let bumpType = evaluateBumpType();
	if (bumpType === BUILD) {
		console.log('Skipping version bump');
		process.exit(0);
	}

	const project = JSON.parse(fs.readFileSync('sfdx-project.json', { encoding: 'utf8' }));
	const packages = project.packageDirectories;
	const updatedPackages = [];

	let newPackageVersions = new Map();

	packages.forEach((item, index) => {
		if (!item.package) {
			console.log(`Skipping package ${item.path} because it has no package name`);
			updatedPackages.push(item);
			return;
		}
		const packageName = item.package;
		const packagePath = item.path;

		if (!isPackageChanged(packagePath) && !hasChangedDependencies(item, newPackageVersions)) {
			console.log(`Skipping package ${packageName} because it has not changed`);
			updatedPackages.push(item);
			return;
		}
		const currentVersionName = item.versionName;
		const currentVersionNumber = item.versionNumber;

		const bumpedVersionNumber = getBumpedString(currentVersionNumber, bumpType);
		const bumpedVersionName = getVersionNameString(bumpedVersionNumber);
		item.versionNumber = bumpedVersionNumber;
		item.versionName = bumpedVersionName;
		console.log(
			`${packageName} bumped from ${currentVersionNumber} (${currentVersionName}) to ${bumpedVersionNumber} (${bumpedVersionName})`
		);
		newPackageVersions.set(packageName, bumpedVersionNumber);
		if (!item.dependencies) {
			console.log(`Skipping dependency updated for package ${packageName} because it has no dependencies`);
			updatedPackages.push(item);
			return;
		}
		item.dependencies = getUpdatedDependencies(item, newPackageVersions);
		updatedPackages.push(item);
	});

	project.packageDirectories = updatedPackages;
	fs.writeFileSync('sfdx-project.json', JSON.stringify(project, null, '\t'));
	exec('npx prettier --write sfdx-project.json');
	exec('git add sfdx-project.json');
	exec('git commit --no-verify --amend --no-edit');
} catch (error) {
	console.error(error);
	process.exit(1);
}

function evaluateBumpType() {
	let bumpType;
	if (process.argv.length > 1) {
		bumpType = process.argv[2];
		console.log(`Override Version Bump Type: ${bumpType}`);
	}
	const commitMessage = exec('git log -1 --pretty=%B', { trim: true });
	console.log(`The commit message was: ${commitMessage}`);

	const isMajor = bumpType === 'major' || isSemanticMajor(commitMessage);
	const isMinor = !isMajor && (bumpType === 'minor' || isSemanticMinor(commitMessage));
	const isPatch = !(isMajor || isMinor) && (bumpType === 'patch' || isSemanticPatch(commitMessage));

	bumpType = isMajor ? MAJOR : isMinor ? MINOR : isPatch ? PATCH : BUILD;
	console.log(`Version Bump Type: ${isMajor ? 'major' : isMinor ? 'minor' : isPatch ? 'patch' : 'build'}`);
	return bumpType;
}

function isSemanticMajor(commitMessage) {
	const breakingChangeTokens = ['BREAKING CHANGE', 'BREAKING-CHANGE', '!:'];
	return breakingChangeTokens.some((token) => commitMessage.toLowerCase().includes(token));
}

function isSemanticMinor(commitMessage) {
	const featureTokens = ['feat', 'feature'];
	return featureTokens.some((token) => commitMessage.toLowerCase().startsWith(token));
}

function isSemanticPatch(commitMessage) {
	const patchTokens = ['fix', 'bugfix'];
	return patchTokens.some((token) => commitMessage.toLowerCase().startsWith(token));
}

function getBumpedString(versionString, bumpTypeIndex) {
	const versionParts = versionString.split('.');
	const major = parseInt(versionParts[MAJOR]);
	const minor = parseInt(versionParts[MINOR]);
	const patch = parseInt(versionParts[PATCH]);
	switch (bumpTypeIndex) {
		case MAJOR:
			return `${parseInt(major) + 1}.0.0.NEXT`;
		case MINOR:
			return `${major}.${parseInt(minor) + 1}.0.NEXT`;
		case PATCH:
			return `${major}.${minor}.${parseInt(patch) + 1}.NEXT`;
		default:
			return versionString;
	}
}

function getVersionNameString(versionString) {
	return 'ver ' + versionString.substring(0, 3);
}

function getUpdatedDependencies(packageItem, newPackageVersions) {
	const newDependencies = [];
	packageItem.dependencies.forEach((dependency) => {
		if (newPackageVersions.has(dependency.package)) {
			dependency.versionNumber = newPackageVersions.get(dependency.package);
			console.log(`Dependency on ${dependency.package} bumped to ${dependency.versionNumber}`);
		}
		newDependencies.push(dependency);
	});
	return newDependencies;
}

function isPackageChanged(packagePath) {
	const hasChangesInLastCommit = exec(`git diff --name-only HEAD..HEAD~1 -- ${packagePath}`, { trim: true });
	console.log(`Changes in ${packagePath} in last commit: ${hasChangesInLastCommit}`);
	if (hasChangesInLastCommit) {
		return true;
	}
	return false;
}

function hasChangedDependencies(packageItem, newPackageVersions) {
	if (!packageItem.dependencies) {
		return false;
	}
	const dependencyPackageNames = packageItem.dependencies.map((package) => package.package);
	return dependencyPackageNames.some((packageName) => newPackageVersions.has(packageName));
}
