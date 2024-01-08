const shell = require('shelljs');

function exec(cmd, options) {
	console.log(`Executing command: ${cmd}`);
	const defaultOptions = { silent: true };
	let output = shell.exec(cmd, { ...defaultOptions, ...(options || {}) });
	if (options && options.toString !== false) {
		output = output.toString();
		output = options.trim ? output.trim() : output;
	}

	return output;
}

exports.exec = exec;
