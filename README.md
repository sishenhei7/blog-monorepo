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

【2021.12.6】今天看了 vue2.x 从 entry 到 init 的过程：

- 它把很多 api 挂载到了 Vue 和 Vue.config 上面。
- Ctor 其实就是 Vue 的构造函数，在合并 config 的时候为了兼容 Vue.extend，做了很多向上查找和合并。
- 稍微理解了 vue 项目的文件组织结构，为了兼容 weex、runtime、非 runtime 等情况，它把 vue 的初始化分成了很多层，每层干特定的事。
- 在 Vue 官方文档上面的 api 那页找到了全局配置和全局 API 对应的初始化代码
- 为后面阅读代码的时候查找相关属性做准备

（接下来看 update 和 hooks）

【2021.12.7】今天仍然在看`_init`的初始化过程，看到了`callHook(vm, 'beforeCreate')`:

- 对于 internal component 和非 internal component 的初始化过程是不同的，internal component 的 `$options` 多了几个属性比如`parent`等，这些属性在初始化的时候扮演了很重要的绝色
- 对于事件，有二种，一种是普通事件，它被加到`vm._events`里面，还有一种 hook 事件，它也被加到`vm._events`里面；但是它在组件调用自身的 hook 事件的时候会被调用，并且这种 hook 事件又和直接写 created、mounted 这种也不同，在调用`callhook`的时候，会首先在`$options`里面查找 created、mounted 方法然后调用，然后在`vm._events`里面查找 hooks 并调用。
- `$emit`方法其实就是调用组件自身`vm._events`里面的方法，而`vm._events`是哪里来的呢？它其实是`_parentListeners`里面拿的，而`opts._parentListeners = vnodeComponentOptions.listeners`又是从 internal component 的父 vnode 里面拿的，而父 vnode 的`vnodeComponentOptions`是什么时候初始化的呢？
- 如果在子组件里面调用`$emit('hook:created')`不会调用自身或者父组件的 created 方法，但是会调用父组件给自己的 created 钩子
- 由于 watcher 是被独立出来，所以和组件其实解耦了，在调用 defineReactive 设置响应式后，只要在取值的时候当前有一个 watcher 就能被观测到达成响应式的目的。由于 watcher 是一个队列，并且有一个当前 watcher 的指针，所以每次只会把当前的 watcher 加到 dep 里面去，那么假设有一个计算属性的 watcher 是当前 watcher，那要怎么触发最开始的 update watcher 呢？其实这是一个链式结构，在数据变动的时候，会触发计算属性的 watcher，导致计算属性重新计算，这个又会导致前一个 watcher 重新计算，最终导致组件 update。那么 watch 属性呢？watch 属性是没有 set 的，那它是怎么触发 update 的呢？（看了下代码，答案是如果在 watch 的方法里面有 data 的赋值操作，那么由这个 data 的响应式来触发 update，这样链式作用下去，直到没有。所以即使计算属性没有被其它地方使用，它没有触发 update watcher，它也会被默默被计算，这是一个缺陷？）

（接下来看后面的 initInjections 等）

【2021.12.8】leetcode 今天是困难题，花了不少时间。所以今天看的比较少。今天在研究响应式原理：

- 在 validateProp 的默认值的时候，为什么要 observe default value（感觉是一个缺陷？）
- 为什么 store 里面的属性能够跨组件？因为不论是 definereactive 或者是 watcher，都是和组件无关的，所以只要这个属性被 definereactive 了，它就能在其它组件加入这个组件里面建立的 watcher。但是前提是在这个 store 里面的属性被求值之前，需要先有一个 watcher，目前只有计算属性能做到这个
- observe 和 defineReactive 的区别，observe 只是一个壳子，相当于一个 traverse 方法，它主要有 2 个作用，第一个是给 value 添加`__ob__`标记，另一个是循环遍历对每个属性施加 observe。另外还有一点需要注意的是，observe 方法没有 key，也就是说不会给这个 key 本身添加响应式，所以 defineReactive 给自己和自己内部的所有属性添加响应式，而 observe 只会给自己内部的所有属性添加响应式。（然后 vue 内部还有一个全局的 shouldObserve 控制要不要给内部属性添加响应式，这个实现了 props 的浅层监听）
- 这里有一个疑问，props 里面的对象，如果在父组件已经对里面的属性设置响应式了的话，那传到子组件之后，在子组件中不是应该能继续触发响应式吗？为什么实际却不能？

（接下来继续看后面的 initState 等）

【2021.12.9】今天在死磕 data 和 props 的初始化：

- 上个问题想了很久还不知道答案，继续想 ing
- 发现在`defineReactive`里面有 2 中 dep，一种是单个属性的 dep，这个 dep 是在定义 getter、setter 函数的时候设置的，它存在于闭包里面；还有一种是子对象或者子数组的 dep，这个 dep 是在 observe 的时候直接加到`__ob__`上面去的，它的作用是什么？目前只看到它会在父属性 setter 里面 depend，然后在$set 的时候 notify，但是想不出它的作用是什么？认真看了一下，应该是在添加和删除新属性的时候 notify，本来以为添加和删除新属性的时候不需要响应式，后来觉得还是有这种场景的。当时这里有一个问题，这里的 dep 和属性的 dep 能不能共用呢？（感觉是可以的，这个应该是缺陷？不过好像即使共用了，性能或者内存都没有什么提升）

（接下来继续看后面的 initState 等）

【2021.12.10】今天在死磕 watcher 和 dep：

- 把 props 的问题想清楚了。props 在被传递给子组件的时候，是关闭了 observing 的，所以在给 props 的属性设置响应式的时候，不会设置内部属性的响应式，但这并不意味着内部属性没有响应式，内部属性有没有响应式取决于它在父组件里面本身被设置了响应式没有。所以父组件把 props 传到子组件，如果这个 props 在父组件里面被设置了响应式的话，那么在子组件里面也会有响应式；如果在父组件里面没有被设置为响应式的话，那么在子组件里面就没有响应式。
- 今天把以前碰到的 2 个不触发响应式的问题的原因想清楚了。
- observe 的第二个参数 asRootData 到底有啥用处？
- 在初始化 data 的时候为什么要 pushTarget 来关闭收收集依赖，正常情况下是不会出现 data 函数里面出现响应式数据的，但是还是有特殊情况的，比如在 data 函数里面调用了具有响应式的 props
- 在初始化 props 的时候关闭了深度监听，只使用 defineReactive 给 `_props` 上面的属性设置了 getter 和 setter，所以 `_props` 没有 `__ob__` 属性；在初始化 data 的时候是直接 observe 的 `_data` 对象，所以 `_data` 对象里面啥都有。
- $data 其实就是 `_data`, $props 其实就是 `_props`
- 以前我一直以为计算属性是初始化一个 watcher + defineReactive 的结合，所以才导致它能被依赖也能依赖别人，现在仔细看了一遍代码，才发现完全是错误的。计算属性其实就是一个 lazy watcher，它在被代理到 vm 上面的时候和 `_data` 或者 `_props` 不同，`_data` 或者 `_props` 是直接代理，而计算属性的这个 watcher 在被代理的时候会判断 dirty 再求值，并且在求值的时候会把自己这个 watcher 推到 watcher 队列的最前面，这就导致在 touch 到其它具有响应式的数据的时候会把这个计算属性 watcher 加到自己的依赖中；由于每个 watcher 自身也收集了依赖于这个 watcher 的 dep，所以在这个计算属性求值结束之后，它对自己调用 depend，就迫使这个 watcher 收集的所有依赖于它的 dep 再次收集依赖，而收集的这个依赖就是依赖于这个计算属性的计算属性，这就实现了计算属性的互相依赖。（其实不是互相依赖，而是在 A 依赖 B 的时候，B 强制让所有依赖它的 dep 也依赖 A 而已）
- 在计算属性初始化的时候有一点需要注意，就是在 ssr 的情境下，计算属性会直接求值，不具备响应式。

（接下来继续看 initWatch 和 initComputed 的不同，以及 dep、subs 里面的具体内容）

【2021.12.11】今天在死磕 dep 和 sub：

- 在 watcher 求值的时候，会在 get 方法里面调用 pushTarget，这样每次建立一个非 lazy watcher 的时候，都会自动把这个 watcher 推到 watcher 队列的最前面。如果是 lazy watcher 呢？lazy watcher 不会在初始化的时候求值，需要手动调用 evaluate 方法求值，所以它在初始化的时候是不会成为别人的依赖的。那么它在什么时候才求值并成为以来的呢？计算属性就是一个 lazy watcher，它在需要被求值的时候，才会成为别人的依赖，然后在别人更新的时候收到通知来更新自己。所以计算属性如果没有被逼迫着求值，那么在整个组件的生命周期里面，它是不会运行的！！！（之前好像理解错了，以为会运行，这里更正心智模型。）
- 一个 dep 的 sub 里面有很多 watcher，然后 dep 按顺序一个个调用这些 watcher 的 notify 方法来提醒它们更新。但是 watcher 真正的更新如果按这个顺序的话可能有问题，因为 dep 里面的 watcher，肯定父组件在前面，子组件在后面，如果按照这个的话，那么是父组件先更新，子组件后更新，可能会有问题。所以有一个 watcher 的更新调度器（当然，性能也是这个调度器建立的另一个原因），这个调度器在更新 watcher 的时候，会按照 id 从小到大的顺序更新，即先更新父组件，再更新子组件。（为什么是这样？？？）
- 在劫持数组方法的时候，只劫持了 observe 的数组的方法
- 在什么时候会依赖`$data.__ob__`？（这是一个 root 级别的 observer）（按理说应该不会依赖它，因为`__ob__`的依赖是通过调用这个响应式属性来更新的，而`_data`并不是 vm 的一个响应式属性。记住，data 的初始化是对`_data`使用 observe，而不是 defineReactive）
- 看完了关于响应式的内容，只觉得所有的响应式机制都不依赖于组件，都是跨组件的，这就是为什么 vuex 的 store 里面的响应式数据能在任意组件里面触发响应式的原因。然后如果 render 的时候如果引用了计算属性，那么计算属性的变更是间接导致重新 render 的，计算属性在 evaluate 之后调用了自己这个 watcher 的 depend 方法，导致所有依赖它的 dep 再重新收集一次依赖，这又导致了触发计算属性变化的改动能够直接通知组件重新 render，并且由于 watcher 的调度，id 小的 watcher 先执行，导致 update 的 watcher 总是最后一个执行，所以组件总是最后一个重新 render。（如果在组件 mounted 之后使用`$watch`方法建立的 watcher 貌似是在 update 的 watcher 之后执行的，不过貌似也没有什么影响。）
- provide 和 inject 的属性也和 props 一样，如果父组件里面的数据没有响应式，那么在子组件里面也没有响应式，如果在父组件里面有响应式，那么在子组件里面就有响应式；它和 props 有一点不同，provide 的属性在改变的时候，是没有响应式的，但是 props 的属性在改变的时候是一定有响应式，为什么呢？我看他们都使用了 defineReactive 了啊？
- 为什么有一个 vm 为 vue 的 watcher ？是怎么建立组件的？

（明天解决上面 2 个疑问，因为没有在`_props`的依赖里面看到 update watcher，所以怀疑是不是父组件造成的子组件更新，而不是 props 的响应式导致子组件更新的）
