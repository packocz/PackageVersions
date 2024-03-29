#!/usr/bin/env node
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

	const changedVersionedPackageFilter = (packageDefintion) => {
		if (packageDefintion.package === undefined) {
			return false;
		}
		const packagePath = packageDefintion.path;
		const hasChangesInLastCommit = exec(`git diff --name-only HEAD..HEAD~1 -- ${packagePath}`, { trim: true });
		console.log(`Changes in ${packagePath} in last commit: ${hasChangesInLastCommit}`);
		if (hasChangesInLastCommit) {
			return true;
		}
		return false;
	};

	const project = require('./sfdxProject.js');
	const changedPackagesAndDependencies = project.getMatchingAndDependentPackages(changedVersionedPackageFilter);

	for (let step = 0; step < changedPackagesAndDependencies.length; step++) {
		const packageName = changedPackagesAndDependencies[step].package;

		const currentVersionName = changedPackagesAndDependencies[step].versionName;
		const currentVersionNumber = changedPackagesAndDependencies[step].versionNumber;

		const bumpedVersionNumber = getBumpedString(currentVersionNumber, bumpType);
		const bumpedVersionName = getVersionNameString(bumpedVersionNumber);
		changedPackagesAndDependencies[step].versionNumber = bumpedVersionNumber;
		changedPackagesAndDependencies[step].versionName = bumpedVersionName;
		console.log(
			`${packageName} bumped from ${currentVersionNumber} (${currentVersionName}) to ${bumpedVersionNumber} (${bumpedVersionName})`
		);
	}

	project.updatePackages(changedPackagesAndDependencies);
	project.updatePackageDependencies();
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
