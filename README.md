# blog-monorepo

## feature

这个是 blog 的 monorepo，打算以楼层为中间纽带，主要分为下面几个模块：

- 独立的（业务）组件
- 楼层
- 渲染服务

### 独立的（业务）组件的功能

1. 各个组件独立打包，使用静态缓存
2. 各个组件与布局解耦，这样 blog 的布局可以随时更换，包括换肤
3. 由于是 blog，所以要能支持渲染 markdown 文件（目前打算不进行预处理，也不存到数据库，直接在浏览器请求 md 文件，然后在浏览器处理 md 文件转成 html 进行渲染。到时候看看 vuepress 是怎么渲染的）

### 楼层的功能

1. loading 状态与骨架屏
2. 同步与异步楼层
3. 支持内嵌不同前端框架（后期做）

### 渲染服务的功能

1. 提供 ssr 渲染
2. 把各个组件根据 layout 组装到一起
3. 收集统计数据（uv、ip、监控）

## plan

预计 1 月底完工（不包括博客后台）

## ongoing

1.为了弄清除 Vue 的 ssr 的流程，目前正在逐句阅读 vue2 和 vue3 的源码，后续会整理出一篇博文说明 ssr 的流程。

（2021.12.6）今天看了 vue2.x 从 entry 到 init 的过程：

- 它把很多 api 挂载到了 Vue 和 Vue.config 上面。
- Ctor 其实就是 Vue 的构造函数，在合并 config 的时候为了兼容 Vue.extend，做了很多向上查找和合并。
- 稍微理解了 vue 项目的文件组织结构，为了兼容 weex、runtime、非 runtime 等情况，它把 vue 的初始化分成了很多层，每层干特定的事。
- 在 Vue 官方文档上面的 api 那页找到了全局配置和全局 API 对应的初始化代码
- 为后面阅读代码的时候查找相关属性做准备

（接下来看 update 和 hooks）

（2021.12.7）今天仍然在看`_init`的初始化过程，看到了`callHook(vm, 'beforeCreate')`:

- 对于 internal component 和非 internal component 的初始化过程是不同的，internal component 的 `$options` 多了几个属性比如`parent`等，这些属性在初始化的时候扮演了很重要的绝色
- 对于事件，有二种，一种是普通事件，它被加到`vm._events`里面，还有一种 hook 事件，它也被加到`vm._events`里面；但是它在组件调用自身的 hook 事件的时候会被调用，并且这种 hook 事件又和直接写 created、mounted 这种也不同，在调用`callhook`的时候，会首先在`$options`里面查找 created、mounted 方法然后调用，然后在`vm._events`里面查找 hooks 并调用。
- `$emit`方法其实就是调用组件自身`vm._events`里面的方法，而`vm._events`是哪里来的呢？它其实是`_parentListeners`里面拿的，而`opts._parentListeners = vnodeComponentOptions.listeners`又是从 internal component 的父 vnode 里面拿的，而父 vnode 的`vnodeComponentOptions`是什么时候初始化的呢？
- 如果在子组件里面调用`$emit('hook:created')`不会调用自身或者父组件的 created 方法，但是会调用父组件给自己的 created 钩子
- 由于 watcher 是被独立出来，所以和组件其实解耦了，在调用 defineReactive 设置响应式后，只要在取值的时候当前有一个 watcher 就能被观测到达成响应式的目的。由于 watcher 是一个队列，并且有一个当前 watcher 的指针，所以每次只会把当前的 watcher 加到 dep 里面去，那么假设有一个计算属性的 watcher 是当前 watcher，那要怎么触发最开始的 update watcher 呢？其实这是一个链式结构，在数据变动的时候，会触发计算属性的 watcher，导致计算属性重新计算，这个又会导致前一个 watcher 重新计算，最终导致组件 update。那么 watch 属性呢？watch 属性是没有 set 的，那它是怎么触发 update 的呢？（看了下代码，答案是如果在 watch 的方法里面有 data 的赋值操作，那么由这个 data 的响应式来触发 update，这样链式作用下去，直到没有。所以即使计算属性没有被其它地方使用，它没有触发 update watcher，它也会被默默被计算，这是一个缺陷？）

（接下来看后面的 initInjections 等）

（2021.12.8）leetcode 今天是困难题，花了不少时间。所以今天看的比较少。今天在研究响应式原理：

- 在 validateProp 的默认值的时候，为什么要 observe default value（感觉是一个缺陷？）
- 为什么 store 里面的属性能够跨组件？因为不论是 definereactive 或者是 watcher，都是和组件无关的，所以只要这个属性被 definereactive 了，它就能在其它组件加入这个组件里面建立的 watcher。但是前提是在这个 store 里面的属性被求值之前，需要先有一个 watcher，目前只有计算属性能做到这个
- observe 和 defineReactive 的区别，observe 只是一个壳子，相当于一个 traverse 方法，它主要有 2 个作用，第一个是给 value 添加`__ob__`标记，另一个是循环遍历对每个属性施加 observe。另外还有一点需要注意的是，observe 方法没有 key，也就是说不会给这个 key 本身添加响应式，所以 defineReactive 给自己和自己内部的所有属性添加响应式，而 observe 只会给自己内部的所有属性添加响应式。（然后 vue 内部还有一个全局的 shouldObserve 控制要不要给内部属性添加响应式，这个实现了 props 的浅层监听）
- 这里有一个疑问，props 里面的对象，如果在父组件已经对里面的属性设置响应式了的话，那传到子组件之后，在子组件中不是应该能继续触发响应式吗？为什么实际却不能？

（接下来继续看后面的 initState 等）

（2021.12.8）今天在深入研究响应式：

- 上个问题想了很久还不知道答案，继续想 ing
- 发现在`defineReactive`里面有 2 中 dep，一种是单个属性的 dep，这个 dep 是在定义 getter、setter 函数的时候设置的，它存在于闭包里面；还有一种是子对象或者子数组的 dep，这个 dep 是在 observe 的时候直接加到`__ob__`上面去的，它的作用是什么？目前只看到它会在父属性 setter 里面 depend，然后在$set 的时候 notify，但是想不出它的作用是什么？认真看了一下，应该是在添加和删除新属性的时候 notify，本来以为添加和删除新属性的时候不需要响应式，后来觉得还是有这种场景的。当时这里有一个问题，这里的 dep 和属性的 dep 能不能共用呢？（感觉是可以的，这个应该是缺陷？不过好像即使共用了，性能或者内存都没有什么提升）

（接下来继续看后面的 initState 等）
