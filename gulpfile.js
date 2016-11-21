var gulp = require('gulp');
// 调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理。
var browserSync = require('browser-sync').create();
// 执行gulp命令就会执行default任务
gulp.task('default', function() {
	console.log('hello gulp');
});
// 定义一个任务，任务的名字，该任务所要执行的一些操作，可以用gulp watch命令执行这个任务
gulp.task('watch', function() {
	// 启动Browsersync服务。这将启动一个服务器，代理服务器（proxy）或静态服务器（server）
	browserSync.init({
		// 设置监听的文件，以gulpfile.js所在的根目录为起点，单个文件就用字符串，多个文件就用数组
		files: ["*.html", "css/*.css", "js/*.js"],
		// ，这里是静态服务器，监听3000端口
		server: {
			baseDir: "./"
		},
		// 在不同浏览器上镜像点击、滚动和表单，即所有浏览器都会同步
		ghostMode: {
			clicks: true,
			scroll: true
		},
		// 更改控制台日志前缀
		logPrefix: "resume with gulp",
		// 设置监听时打开的浏览器
		browser: "firefox",
		// 设置服务器监听的端口号
		port: 8080
	});
});