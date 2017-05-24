// @flow

import Config from './tools/config'
import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import babel from 'gulp-babel';

const paths: { src: string[], js: string[], destination: string } = {
    src: [Config.PROJECT_ROOT + '/src/**'],
    js: [Config.PROJECT_ROOT + '/src/**/*.js'],
    destination: Config.PROJECT_ROOT + '/dist'
};

let express: server;

gulp.task('serve.dev', (cb: mixed): void => run('server', 'build', 'watch', cb));

gulp.task('serve.prod', (cb: mixed): void => run('server', 'build', cb));

gulp.task('build', (cb: mixed): void => run('clean', 'flow', 'babel', 'restart', cb));

gulp.task('clean', (cb: mixed): void => rimraf(paths.destination, cb));

gulp.task('flow', shell.task(['flow'], { ignoreErrors: true }));

gulp.task('babel', (): void => gulp.src(paths.js).pipe(babel()).pipe(gulp.dest('dist')));

gulp.task('server', (): void => { express = server.new(paths.destination) });

gulp.task('restart', (): void => { express.start.bind(express)() });

gulp.task('watch', (): watch => watch(paths.js, (): void => gulp.start('build')));