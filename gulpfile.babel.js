// @flow

import Config from './tools/config'
import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';

const paths = {
    src: [Config.PROJECT_ROOT+'/src/**'],
    js: [Config.PROJECT_ROOT + '/src/**/*.js'],
    destination: Config.PROJECT_ROOT + '/dist'
}

gulp.task('default', cb => {
    run('lint', cb);
});

gulp.task('serve.dev', cb => {
    run('server', 'build', 'watch', cb);
});

gulp.task('serve.prod', cb => {
    run('server', 'build', cb);
});

gulp.task('build', cb => {
    run('clean', 'flow', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
    rimraf(paths.destination, cb);
});

gulp.task('flow', shell.task([
    'flow'
], { ignoreErrors: true }));

gulp.task('babel', () => gulp.src(paths.js).pipe(babel()).pipe(gulp.dest('dist')));

gulp.task('lint', () => gulp.src(paths.src).pipe(eslint(
    {
        'rules':{
            'quotes': [1, 'single']
        }
    }
)).pipe(eslint.format()).pipe(eslint.failOnError()));

let express;

gulp.task('server', () => {
    express = server.new(paths.destination);
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('watch', () => {
    return watch(paths.js, () => {
        gulp.start('build');
    });
});