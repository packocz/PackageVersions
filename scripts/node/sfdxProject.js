const fs = require('fs');
const { exec } = require('./exec');

module.exports = {
	getVersionedPackages: function () {
		return this.getPackages((packageDefinition) => packageDefinition.package !== undefined);
	},
	getPackages: function (filterFunction) {
		const project = JSON.parse(fs.readFileSync('sfdx-project.json', { encoding: 'utf8' }));
		const packages = project.packageDirectories;
		if (filterFunction) {
			return packages.filter(filterFunction);
		}
		return packages;
	},
	getMatchingAndDependentPackages: function (filterFunction) {
		const matchingPackages = this.getPackages(filterFunction);
		var matchingPackageNames = matchingPackages.map(function (item) {
			return item['package'];
		});
		console.log(`matched package names ${matchingPackageNames}`);
		const allPackages = this.getPackages();
		const matchingPackagesAndTheirDependencies = [];
		for (let step = 0; step < allPackages.length; step++) {
			if (!this.isPackageOrDependencyChanged(allPackages[step], matchingPackageNames)) {
				continue;
			}
			matchingPackagesAndTheirDependencies.push(allPackages[step]);
		}
		return matchingPackagesAndTheirDependencies;
	},
	updatePackages: function (packageDefinitions) {
		console.log('saving..');
		if (!packageDefinitions) {
			console.log(`No updated packages provided`);
			return;
		}
		const updatedPackagesByName = new Map(packageDefinitions.map((obj) => [obj.package, obj]));
		const packagesToBe = [];
		for (packageDefinition of this.getPackages()) {
			console.log(`package: ${packageDefinition.package}, updated: ${updatedPackagesByName.has(packageDefinition.package)}`);
			if (packageDefinition.package && updatedPackagesByName.has(packageDefinition.package)) {
				packagesToBe.push(updatedPackagesByName.get(packageDefinition.package));
			} else {
				packagesToBe.push(packageDefinition);
			}
		}
		const project = JSON.parse(fs.readFileSync('sfdx-project.json', { encoding: 'utf8' }));
		project.packageDirectories = packagesToBe;
		fs.writeFileSync('sfdx-project.json', JSON.stringify(project, null, '\t'));
		exec('npx prettier --write sfdx-project.json');
	},
	updatePackageDependencies: function () {
		const packages = this.getVersionedPackages();

		const packageVersions = new Map(packages.map((i) => [i.package, i]));
		console.log(`version packages ${JSON.stringify(packageVersions)}`);
		for (let step = 0; step < packages.length; step++) {
			const newDependencies = [];
			if (packages[step].dependencies) {
				packages[step].dependencies.forEach((dependency) => {
					if (packageVersions.has(dependency.package)) {
						dependency.versionNumber = packageVersions.get(dependency.package).versionNumber.replace('NEXT', 'LATEST');
						const branch = packageVersions.get(dependency.package).branch;
						if (branch) {
							dependency.branch = packageVersions.get(dependency.package).branch;
						}
						const dependencyVersionWithBranch = dependency.versionNumber + (dependency.branch ? `-${dependency.branch}` : '');
						console.log(`Dependency on ${dependency.package} set to ${dependencyVersionWithBranch}`);
					}
					newDependencies.push(dependency);
				});
				packages[step].dependencies = newDependencies;
			}
		}
		this.updatePackages(packages);
	},
	isPackageOrDependencyChanged: function (packageItem, changedPackageNames) {
		const packageName = packageItem.package;
		if (changedPackageNames.includes(packageName)) {
			return true;
		}
		if (!packageItem.dependencies) {
			return false;
		}
		const dependencyPackageNames = packageItem.dependencies.map((package) => package.package);
		return dependencyPackageNames.some((item) => changedPackageNames.includes(item));
	}
};
