# VUE组件-日期选择器（移动端）
仿framework7日历控件，实现包括滑动手势来切换月份

[demo](http://note.youdao.com/) 请使用手机扫描二维码查看

<img src="https://github.com/lx544690189/vue-calendar/blob/master/screenshot/screenshot.png"  width="200"/>
<img src="https://github.com/lx544690189/vue-calendar/blob/master/screenshot/QRcode.png" width="300"/>

- [x] ui
- [x] 基本操作
- [ ] 设定日期范围、设定不可选日期
- [ ] 手势切换
- [ ] npm

## 参考
- [framework7](https://github.com/nolimits4web/Framework7)
- [mint-ui](https://github.com/ElemeFE/mint-ui/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build
```
## 使用

```
<calendar
    v-model="calendarShow"
    @onChange="dateChange">
</calendar>
```
## Attributes

参数 | 说明 | 类型 | 默认值
---|--- | --- | ---
v-model | 显示/隐藏日期组件 | Boolean | false
format | 日期格式化 | String | "yyyy-MM-dd"
defaultDate | 默认已选日期 | Date | new Date()
month | 月份文本 | Array | ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
week | 星期文本 | Array | ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

## Events

事件名称 | 说明 | 	回调参数
---|--- | ---
onChange | 当改变所选日期 | (date,formatDate)

## 总结
-   相关知识：node、npm、es6、Vue组件、transform、Date相关api、移动端手势操作；
-   思路：页面始终存在三个月份的模板，始终显示中间那个月的，通过transform位移来达到切换动画效果，在动画结束后重新生成模板（将当前月份置于中间）；
-   **要点一**：每次动画执行过程，需设置计时器来判断动画是否执行完成，防止动画执行过程中的点击事件
-   **要点二**：vue2.0强调单向数据流，来保证业务的清晰，但插件的show/hide的确需要双向绑定。其官方解释如下：
> **单向数据流**
> - prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。
> -  另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。

解决办法也是有的，参考mint-ui部分组件，如Action sheet：
```
<mt-actionsheet
  v-model="sheetVisible">
</mt-actionsheet>
```
很奇怪也很神奇，居然是双向绑定的！而且用的是v-model，查看官方文档：
> 自定义事件可以用来创建自定义的表单输入组件，使用 v-model 来进行数据双向绑定。看看这个：

```
<input v-model="something">
```
> 这不过是以下示例的语法糖：
```
<input
    v-bind:value="something"
    v-on:input="something = $event.target.value">
```
> 所以在组件中使用时，它相当于下面的简写：

```
<custom-input v-bind:value="something" v-on:input="something = arguments[0]"></custom-input>
```

> 所以要让组件的 v-model 生效，它必须：
> - 接受一个 value 属性
> - 在有新的 value 时触发 input 事件

原来如此，那接下来就简单多了
```
props: {
    //一定要是value哦
	value: {
		type: Boolean,
		default: false
	}
}
```
然后在组件内部显示隐藏时触发input事件：this.$emit('input', val)

**后来逛vue官网，突然发现vue又把1.0的sync属性给加上了：**
> 在一些情况下，我们可能会需要对一个 prop 进行『双向绑定』。事实上，这正是 Vue 1.x 中的 .sync修饰符所提供的功能。当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定的值。这很方便，但也会导致问题，因为它破坏了『单向数据流』的假设。由于子组件改变 prop 的代码和普通的状态改动代码毫无区别，当光看子组件的代码时，你完全不知道它何时悄悄地改变了父组件的状态。这在 debug 复杂结构的应用时会带来很高的维护成本。

> 上面所说的正是我们在 2.0 中移除 .sync 的理由。但是在 2.0 发布之后的实际应用中，我们发现 .sync 还是有其适用之处，比如在开发可复用的组件库时。我们需要做的只是让子组件改变父组件状态的代码更容易被区分。

> 在 2.3 我们重新引入了 .sync 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 侦听器。

不过需要vue2.3及以上版本哦！之前的版本可以用第一种办法。本插件为兼容性使用第一种写法。