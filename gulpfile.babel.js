// @flow

import Config from './tools/config'
import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import babel from 'gulp-babel';

const paths = {
    src: [Config.PROJECT_ROOT + '/src/**'],
    js: [Config.PROJECT_ROOT + '/src/**/*.js'],
    destination: Config.PROJECT_ROOT + '/dist'
}

gulp.task('default', (cb: any) => {
    run('lint', cb);
});

gulp.task('serve.dev', (cb: any) => {
    run('server', 'build', 'watch', cb);
});

gulp.task('serve.prod', (cb: any) => {
    run('server', 'build', cb);
});

gulp.task('build', (cb: any) => {
    run('clean', 'flow', 'babel', 'restart', cb);
});

gulp.task('clean', (cb: any) => {
    rimraf(paths.destination, cb);
});

gulp.task('flow', shell.task([
    'flow'
], { ignoreErrors: true }));

gulp.task('babel', () => gulp.src(paths.js).pipe(babel()).pipe(gulp.dest('dist')));

let express: any;

gulp.task('server', () => express = server.new(paths.destination));

gulp.task('restart', () => express.start.bind(express)());

gulp.task('watch', () => {
    return watch(paths.js, () => {
        gulp.start('build');
    });
});