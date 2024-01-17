const { Octokit } = require('@octokit/action');

module.exports = {
	createRelease: async function (repo, release) {
		const octokit = new Octokit();

		const { result } = await octokit.request('POST /repos/{owner}/{repo}/releases', {
			owner: repo.owner,
			repo: repo.name,
			tag_name: release.tag,
			target_commitish: release.commitsh,
			name: release.name,
			body: release.body,
			draft: release.isDraft
		});
		console.log(JSON.stringify(result));
	}
};
