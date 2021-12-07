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

（2021.12.7）今天仍然在看 \_init 初始化过程，看到了`callHook(vm, 'beforeCreate')`:

- 对于 internal component 和非 internal component 的初始化过程是不同的，internal component 的 `$options` 多了几个属性比如`parent`等，这些属性在初始化的时候扮演了很重要的绝色
- 对于事件，有二种，一种是普通事件，它被加到`vm._events`里面，还有一种 hook 事件，它也被加到`vm._events`里面；但是它在组件调用自身的 hook 事件的时候会被调用，并且这种 hook 事件又和直接写 created、mounted 这种也不同，在调用`callhook`的时候，会首先在`$options`里面查找 created、mounted 方法然后调用，然后在`vm._events`里面查找 hooks 并调用。
- `$emit`方法其实就是调用组件自身`vm._events`里面的方法，而`vm._events`是哪里来的呢？它其实是`_parentListeners`里面拿的，而`opts._parentListeners = vnodeComponentOptions.listeners`又是从 internal component 的父 vnode 里面拿的，而父 vnode 的`vnodeComponentOptions`是什么时候初始化的呢？
- 如果在子组件里面调用`$emit('hook:created')`不会调用自身或者父组件的 created 方法，但是会调用父组件给自己的 created 钩子
- 由于 watcher 是被独立出来，所以和组件其实解耦了，在调用 defineReactive 设置响应式后，只要在取值的时候当前有一个 watcher 就能被观测到达成响应式的目的。由于 watcher 是一个队列，并且有一个当前 watcher 的指针，所以每次只会把当前的 watcher 加到 dep 里面去，那么假设有一个计算属性的 watcher 是当前 watcher，那要怎么触发最开始的 update watcher 呢？其实这是一个链式结构，在数据变动的时候，会触发计算属性的 watcher，导致计算属性重新计算，这个又会导致前一个 watcher 重新计算，最终导致组件 update。那么 watch 属性呢？watch 属性是没有 set 的，那它是怎么触发 update 的呢？

（接下来看后面的 initInjections 等）
