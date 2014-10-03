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
requirejs.config是对requirejs执行环境相关的配置，其实``` requirejs.config ``` 和 ``` require.config ```是等效的。

1. baseUrl 配置查询其他文件的根目录。这里配置成了js目录。
2. paths 对于那些没有直接存放在baseUrl下面的模块，提供一个便捷的访问，可以是目录或者文件。
   比如这里配置的jquery，moduleA等等，我们就可以直接在代码里面使用，而不需要从baseUrl的根目录开始，
   就像``` requirejs(['jquery', 'moduleA'], function($, moduleA) { ... }); ``` 这样。

接下来的代码``` requirejs(['jquery', 'moduleA'], function($, moduleA) { ... }); ```就是真正的调用了，
jquery和moduleA都是我们已经配置好的模块，它们被映射为了后面function的$和moduleA参数。如你所想:
``` 
require(['jquery', 'moduleA'], function($, moduleA) { ... });
``` 
和上面的调用是等效的。

内部机理：RequireJS使用head.appendChild()将每一个依赖加载为一个script标签。
RequireJS会等待所有的依赖加载完毕，计算出模块定义函数正确调用顺序，然后依次调用它们。

如果你理解了这样的机制，就能明白 Expected results(you should know why?) 的结果。

*ps：使用相对路径定义入口的时候，不要在末尾加上后缀.js，requirejs会为我们自动加上。*


#### How to organize the file of project

以何种方式组织文件是有挑战性的，一般来说我们可以很容易的达成一个共识：
对于中小型项目(如网站页面在20个以内)，采用single-page的形式，全站用一个js文件作为入口文件就ok了。
对于中大型项目(如网站页面在50个以上)，如果继续用一个js文件作为入口，自然就会感觉这个文件太大了，
通常我们就会想站在网站大的模块角度进行一次拆分，比如myaccount, checkout等等， 
也就是myaccount有一个js文件作为入口，而checkout有另外一个入口，这就是所谓的multi-page形式。

现在我们正在做的Ferguson项目，采用的就是multi-page形式，但是即使我们采用multi-page形式，现在依旧出现了代码难以维护的窘境。
具体问题表现在：入口文件代码量太大，一个入口文件代码量可能高达2000+行之多，即使是在已经把公共的模块提取出来作为单独的文件了。

解决很多大型问题有一个很好用的方法：添加一个抽象层。 我们可以添加一个page层解决入口文件代码量过大的问题。
之前其实只有两层：入口层 ——> 公共模块层。 现在我们引入page层，就变成了这样的三层结构：入口层 ——> page层 ——> 公共模块层。
就像这样：
![目录结构](https://raw.githubusercontent.com/nange/requirejs-guide/master/img/multi-page-structure.png)




#### Optimize jsfile

some text






