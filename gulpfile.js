const gulp = require('gulp');
// 调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理。
const browserSync = require('browser-sync').create();
const plugins = require('gulp-load-plugins')();
const reload = browserSync.reload;
const gutil = require('gulp-util');
const cleanCSS = require('gulp-clean-css');
const combiner = require('stream-combiner2');
const handleError = function(err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
};
// 执行gulp命令就会执行default任务
gulp.task('default', function() {
	console.log('hello gulp');
});
/*开发阶段，只监听文件变动和刷新浏览器*/
// 定义一个任务，任务的名字，该任务所要执行的一些操作，可以用gulp watch命令执行这个任务
gulp.task('watch', function() {
	// 启动Browsersync服务。这将启动一个服务器，代理服务器（proxy）或静态服务器（server）
	browserSync.init({
		// 设置监听的文件，以gulpfile.js所在的根目录为起点，单个文件就用字符串，多个文件就用数组
		files: ["src/*.html", "src/css/*.css", "src/image/*.*"],
		// 这里是静态服务器，默认监听3000端口，baseDir设置启动文件的路径
		server: {
			baseDir: "./src"
		},
		// 在不同浏览器上镜像点击、滚动和表单，即所有浏览器都会同步
		ghostMode: {
			clicks: true,
			scroll: true
		},
		// 更改控制台日志前缀
		logPrefix: "resume with gulp",
		// 设置监听时打开的浏览器
		browser: ["firefox", "chrome"],
		// 设置服务器监听的端口号
		port: 8090
	});
});
/*发布阶段，css、js的合并压缩，image的压缩等（合并，重命名，防缓存……）*/
/*如果开发阶段各种调试测试没问题了，就一次性压缩所有文件*/
/*一次压缩所有CSS文件*/
gulp.task('minifycss', function() {
    return gulp.src('src/css/**/*.css')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.autoprefixer({
      	// 设置支持的浏览器，这里是主要浏览器的最新两个版本
      	browsers: 'last 2 versions'
      }))
      .pipe(cleanCSS())
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest('dist/css/'));
});
// 压缩所有图片
gulp.task('image', function () {
    return gulp.src('src/image/**/*')
        .pipe(plugins.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/image/'));
});
/*复制HTML*/
gulp.task('html',['minifycss', 'image'], function() {
    return gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'));
});
// 提示failed to find git repository in undefined
gulp.task('deploy', function() {
	return gulp.src('./**/*')
		.pipe(plugins.ghPages());
})