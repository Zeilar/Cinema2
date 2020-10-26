const mix = require('laravel-mix');
require('mix-env-file');

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

// Copy into dist folder for production
if (mix.inProduction()) {
    mix.env(process.env.ENV_FILE);

	// App
	mix.copyDirectory('app', 'dist/cinema/app');
    mix.copyDirectory('bootstrap', 'dist/cinema/bootstrap');
	mix.copyDirectory('config', 'dist/cinema/config');
	mix.copyDirectory('database', 'dist/cinema/database');
	mix.copyDirectory('resources', 'dist/cinema/resources');
	mix.copyDirectory('routes', 'dist/cinema/routes');
    // mix.copyDirectory('storage', 'dist/cinema/storage');
	mix.copyDirectory('tests', 'dist/cinema/tests');

	// Public
	mix.copyDirectory('public/css', 'dist/cinema.angelin.dev/css');
	mix.copyDirectory('public/js', 'dist/cinema.angelin.dev/js');
}
