# Requirejs Guide

本文包含了对Requirejs的使用，以及对前端js文件组织的思考。
    
    
### Getting started
    
想要完整测试本项目的中的实例，需要安装nodejs和grunt环境 (不知道如何安装？请点 [这里](http://nodejs.org/) 和 [这里](http://www.gruntjs.net/))。
安装好后，首先使用git clone把本项目下载到你本地, 然后打开命令行进入项目的根目录中执行：
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
``` javascript
require(['jquery', 'moduleA'], function($, moduleA) { ... });
``` 
和上面的调用是等效的。requirejs的使用是很简单的，它仅仅提供了两个接口供我们调用，一个是define，一个是require，
define用于定义一个模块，require则用于加载和执行模块的代码。

内部机理：RequireJS使用head.appendChild()将每一个依赖加载为一个script标签。
RequireJS会等待所有的依赖加载完毕，计算出模块定义函数正确调用顺序，然后依次调用它们。

如果你理解了这样的机制，就能明白 Expected results(you should know why?) 的结果。

* ps：使用相对路径定义入口的时候，不要在末尾加上后缀.js，requirejs会为我们自动加上。*


#### How to organize the file in project

以何种方式组织文件是有挑战性的，一般来说我们可以很容易的达成一个共识：
对于中小型项目(如网站页面在20个以内)，采用single-page的形式，全站用一个js文件作为入口文件就ok了。
对于中大型项目(如网站页面在50个以上)，如果继续用一个js文件作为入口，自然就会感觉这个文件太大了，
通常我们就会想站在网站大的模块角度进行一次拆分，比如myaccount, checkout等等， 
也就是myaccount有一个js文件作为入口，而checkout有另外一个入口，这就是所谓的multi-page形式。

现在我们正在做的Ferguson项目，采用的就是multi-page形式，但是即使我们采用multi-page形式，现在依旧出现了代码难以维护的窘境。
具体问题表现在：入口文件代码量太大，一个入口文件代码量可能高达2000+行之多，即使是在已经把公共的模块提取出来作为单独的文件了。

解决很多大型问题有一个很好用的方法：添加一个抽象层。 我们可以添加一个page层解决入口文件代码量过大的问题。
之前其实只有两层：入口层 ——> 公共模块层。 现在我们引入page层，就变成了这样的三层结构：入口层 ——> page层 ——> 公共模块层。
目录结构就像这样：

![目录结构](https://raw.githubusercontent.com/nange/requirejs-guide/master/img/multi-page-structure.png)

变成3层之后就足以应付大型项目了。这样分了之后，入口文件将变得异常的简洁，只剩下了对page和公共模块的一次调用而已。
具体代码请查看multi-page目录下的源码。

* ps: 这种组织方式通常只适用于展示类页面，比如电商类的前端用户界面；并不适合于像单页面应用这种类型。 *


#### Optimize jsfile

最后当上生产环境时，一般来说会压缩js文件，主要目的是减少http请求数和总的文件大小。压缩基于requirejs写的代码有两种方式：

1. 使用和requirejs配套的r.js。 r.js是吧入口文件所依赖的所有模块以及入口文件本身压缩到一个文件里面，
然后把data-main设置为这个压缩后的文件即可。完整文档请点[这里](https://github.com/jrburke/r.js)。
2. 使用requirejs作者写的另外一个工具almond。 使用这个工具，可以让我们在生产环境中完全抛弃requirejs，
它是把入口文件以及其所依赖的文件，再加上requirejs全部压缩进一个文件(其实不是把requirejs也压缩进去了，
它是提取了requirejs的核心，去掉了对于生产环境没用的功能，因此这个代码非常的小，gzip压缩之后仅有1kb)。
因此如果采用这种压缩方式，页面就无需引入requirejs文件了，直接在页面引入这个压缩之后js文件即可。完整文档请点[这里](https://github.com/jrburke/almond)

为什么会有两种压缩方式呢？而且这两种压缩方式还都是一个人写的，就是requirejs的作者。先来看看requirejs官方文档中的这一段：
> Internet Explorer has a set of problems that make it difficult to detect load failures for errbacks/paths fallbacks:
- script.onerror does not work in IE 6-8. There is no way to know if loading a script generates a 404, worse, it triggers the onreadystatechange with a complete state even in a 404 case.
- script.onerror does work in IE 9+, but it has a bug where it does not fire script.onload event handlers right after execution of script, so it cannot support the standard method of allowing anonymous AMD modules. So script.onreadystatechange is still used. However, onreadystatechange fires with a complete state before the script.onerror function fires.

> So it is very difficult with IE to allow both anonymous AMD modules, which are a core benefit of AMD modules, and reliable detect errors.

大概意思是：
IE有一系列问题导致检测errbacks/paths fallbacks中的加载错误变得很困难：

- IE6-8中的script.onerror不起作用。没有办法判断是否加载一个脚本出现了404错误，更糟糕的是，即使出现404错误之后，依然会触发state为complete的onreadystatechange事件。
- IE9+中的script.onerror起作用，但有一个bug：在执行脚本之后不会触发script.onload事件句柄。因此它无法支持匿名AMD模块的标准方法。所以即使script.onreadystatechange事件有用。但是state为complete的onreadystatechange事件会在script.onerror函数触发之前触发。

因此匿名AMD(AMD模块机制的核心优势)和可靠的错误检测机制，在IE环境下很难两全其美。

由此可以看出使用requirejs在IE上是有一系列问题的，甚至都有放弃它的念头，可是如果我们采用了第二种压缩方式，这个问题就不存在了。
因为采用第二种压缩方式，根本就不需要引入requirejs，页面上也只会出现一个script标签(采用第一种压缩方式，会出现两个script标签，有一个是requirejs生成的)，
也不需要去检测加载出错等问题。

在requirejs的文档中也说了解决IE一系列问题的办法，比如在config配置enforceDefine: true,然后所有的js代码都用define定义，而不用require。
但是这就和requirejs的基本思想是相违背的，define的任务太重了，require却变得没用了。我们何不就采用第二种压缩方式，而不用去改动任何代码呢？

采用第二种压缩方式好处是很明显的：在所有浏览器下都不用担心出现各种兼容性问题，编码符合人的直觉，减少了http请求数，并且减小了总代码量的体积。
虽然也有一些缺点，比如不包含requirejs的所有功能，很多功能用第二种压缩方式都被阉割掉了。但是在生产环境中，一般的项目根本不需要那些高级功能。

所以我推荐使用第二种压缩方式。由于我们采用的是grunt构建的环境，因此统一使用grunt来压缩会更加方便，
[grunt requirejs](https://github.com/asciidisco/grunt-requirejs) 插件就支持almond压缩(其实内部就是简单封装了对almond的调用而已)。

完整的压缩配置请看本项目根目录下的Gruntfile.js文件中的requirejs部分配置。配置好后，只需要执行：
``` 
$ grunt requirejs
```
最终的js文件就压缩合并好了。然后把html中的script标签的src改为压缩后的js路径，就可以上生产环境了。
