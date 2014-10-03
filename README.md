# Requirejs Guide

本文包含了对Requirejs的使用，以及对前端js文件组织的思考。
    
    
### Getting started
    
想要完整测试本项目的中的实例，需要安装nodejs和grunt环境 (不知道如何安装？请点 [这里](http://nodejs.org/) 和 [这里](http://www.gruntjs.net/))。
安装好后，打开命令行进入项目的根目录中执行：
```
$ npm install
```
等所有模块都下载好了后，执行：
``` 
$ grunt connect
```
这样本地的一个小型服务器就跑起来了，打开浏览器访问相关目录下的html文件，就能看到相应的效果。比如像这样：
```
http://127.0.0.1:8080/multi-page/myaccount-page1.html
```


### List

- [Why Requirejs](#why-requirejs)
- [Quick Start](#quick-start)
- [How to organize the file in project](#how-to-organize-the-file-in-project)
- [Optimize jsfile](#optimize-jsfile)


#### Why Requirejs

在前端js代码量越来越大的今天，在开发过程中，更加细粒度的去拆分js到不同文件是必然趋势
(如果你维护过一个有上千行js代码的文件，并且由不同人写的代码，那么你一定能理解这种痛苦)，
这样可以大大提高可维护性和可重用性。

但是当我们按模块化的编写和拆分js后，又出现了另一个问题：
文件之间的依赖关系和文件的加载顺序变得异常的棘手，想象一下在一个较大型项目中，一个页面可能需要引入20、 30个
js文件也不足为奇，并且我们还看不出它们之间的依赖关系，更痛苦的是当文件的加载顺序出问题时，面对页面中一大堆js文件，
要确定是哪个文件的顺序有问题，想想都觉得头大。

在这样的大背景下，requirejs出现了，它解决了前面说到的两大核心问题，它使文件之间的依赖关系清晰可见，
并且可以确保不会出现文件加载和执行顺序问题。还有一些额外的好处，比如异步加载js，一个页面只需要引入一个script标签等。

可以说类似于requirejs这样的模块加载器已经成为了中大型网站的标配，其实还有其他一些很出名的模块加载器，
比如由支付宝工程师 @玉伯也叫射雕 写的[Seajs](http://seajs.org/docs/)，它们之间其实只有一些细微的理念上的差异，
精通一种后，如果需要转向另一种，几乎没有任何成本。


#### Quick Start

以这个项目中的single-page为例，来介绍requirejs的基本使用，所谓single-page，指的是全站用一个js文件作为所有页面的入口。
在single-page目录下，index.html中有这样的定义：
```html
<script src="js/lib/require.js" data-main="js/main"></script>
```
data-main属性就是设置js执行的入口的，它被设置为了一个相对路径，是js目录下的main.js。
打开main.js：
```javascript
requirejs.config({
    baseUrl: 'js',
    paths: {
      jquery: 'lib/jquery-1.11.1',

      moduleA: 'module/moduleA',
      moduleB: 'module/moduleB',
      moduleC: 'module/moduleC'

    }
});

requirejs(['jquery', 'moduleA'], function($, moduleA) {
  // DOM ready
  $(function() {
    alert('document is ready...');
    moduleA.say();

    console.log('Expected results(you should know why?):');
    console.log('1. moduleC is executed!');
    console.log('2. moduleB is executed!');
    console.log('3. moduleC is saying...');
    console.log('4. moduleA is executed!');
    console.log('5. moduleB is saying...');
    console.log('6. document is ready...');
  });

});
```



ps：使用相对路径定义入口的时候，不要在末尾加上后缀.js，requirejs会为我们自动加上。


#### How to organize the file of project

some text



#### Optimize jsfile

some text






