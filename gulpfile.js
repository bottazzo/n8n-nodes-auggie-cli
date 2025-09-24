const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);
task('build:schemas', copySchemas);

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	return src(nodeSource).pipe(dest(nodeDestination));
}

function copySchemas() {
	const schemaSource = path.resolve('nodes', '**', '__schema__', '**', '*.json');
	const nodeDestination = path.resolve('dist', 'nodes');

	return src(schemaSource).pipe(dest(nodeDestination));
}
