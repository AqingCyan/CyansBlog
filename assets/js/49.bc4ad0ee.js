(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{217:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("p",[t._v("我们说了，Vue 应用都应该从构建一个 Vue 实例开始。它管理着挂载在它身上的所有内容，因此实例是一个根实例，\n所有的组件都应该挂载在根实例上面。创建一个 Vue 实例，需要通过 new 一个构造函数的方式，同时传入一个对象。\n该对象可以传入很多内容，驱动页面的数据，模板，挂载的元素节点，方法，生命周期函数，子组件等。")]),t._v(" "),t._m(2),t._m(3),t._v(" "),t._m(4),t._v(" "),a("p",[t._v("每个 Vue 实例都会代理其 data 对象里的所有属性，并且让其作为驱动页面的数据。当 data 中的数据改变时，页面也会响应式的发生改变（响应式稍后讨论）。")]),t._v(" "),t._m(5),a("p",[t._v("我们看到，把 data 作为 vm 实例中的 data 的属性值，它们其实是等价的。这里就体现出一个问题，修改外面的 data 对象，\n也会影响到 vm 实例中的 data。那么为了数据的安全，我们不建议把 data 定义在外面。")]),t._v(" "),t._m(6),t._v(" "),a("p",[t._v("既然 data 中的属性被 vm 实例代理，并且将作为驱动页面的数据，那该如何绑定到页面呢？")]),t._v(" "),t._m(7),t._v(" "),a("p",[t._v("小胡子语法是我们常用的绑定数据的方法。\n以两个大括号开始，以两个大括号结尾，中间通常放 data 的属性（也可以放表达式，但除非特殊情况不建议这么操作），也就是将数据绑定到元素上。")]),t._v(" "),t._m(8),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),a("ul",[a("li",[a("code",[t._v("v-text")]),t._v("：直接写在 DOM 元素上，指令值是 data 中的属性，"),a("code",[t._v('<div v-text="message"></div>')]),t._v("与"),a("code",[t._v("<div>"+t._s(t.message)+"</div>")]),t._v("是等价的。这里要提到一点，如果绑定的值是一个 html 标签，那么它是会被转义的。如果的确想展示的数据是被作为 html 模板编译过的话，请使用"),a("code",[t._v("v-html")])]),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),a("li",[a("code",[t._v("v-for")]),t._v("：基于源数据多次渲染元素或者模板，前提是实例的 data 中提供的数据能够被遍历。"),a("code",[t._v('<li v-for="(item, index) in list">'+t._s(t.item)+"</li>")]),t._v("，这么写的意为，遍历 list，item 是遍历的每一项，而 index 是遍历每一项的时候，它的索引值。这么遍历出来的内容，可以重复渲染"),a("code",[t._v("li")]),t._v("标签到页面上，但它的数据如何展示在于你的代码，示例用小胡子语法简单展示了 item 项。")]),t._v(" "),t._m(16)]),t._v(" "),t._m(17),t._v(" "),t._m(18),t._v(" "),t._m(19),t._v(" "),t._m(20),t._v(" "),t._m(21),t._v(" "),t._m(22),t._v(" "),t._m(23)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"实例与生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实例与生命周期","aria-hidden":"true"}},[this._v("#")]),this._v(" 实例与生命周期")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"什么是实例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是实例","aria-hidden":"true"}},[this._v("#")]),this._v(" 什么是实例")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" vm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  el"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#app'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 挂载的元素")]),t._v("\n  data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 数据")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  methods"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 方法")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  components"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 挂载组件")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("vm")]),this._v("就是实例的变量名，我们可以在 console 控制台通过"),s("code",[this._v("vm")]),this._v("访问到我们创建的 Vue 实例。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"属性与方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#属性与方法","aria-hidden":"true"}},[this._v("#")]),this._v(" 属性与方法")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" data "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"AqingCyan"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" vm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" data\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nvm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -> true")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"数据绑定页面的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据绑定页面的方法","aria-hidden":"true"}},[this._v("#")]),this._v(" 数据绑定页面的方法")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"小胡子语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#小胡子语法","aria-hidden":"true"}},[this._v("#")]),this._v(" 小胡子语法")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("#app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{name}}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("你好，我的名字是：{{name}}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--也可以放入表达式--\x3e")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{1+1}}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("假设 id 为 app 的节点已经被 vm 实例接管，这样写意为，"),s("code",[this._v("h1")]),this._v("标签被绑定了 vm.data 的 name 属性，\n该标签在页面上应该是以一级标题显示的 name 的值。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"响应式数据"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#响应式数据","aria-hidden":"true"}},[this._v("#")]),this._v(" 响应式数据")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("当"),s("code",[this._v("data")]),this._v("的属性的值发生改变时，页面视图将会产生“响应”，即匹配更新为新的值。这个现象，我们称之为响应式数据。\n"),s("strong",[this._v("请打开控制台，执行"),s("code",[this._v("vm.name='HelloWorld'")]),this._v("观察页面的变化。")]),this._v(" 另外，不止数据可以影响页面，页面反过来也可以影响数据，后面我们可以看到。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"指令绑定"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#指令绑定","aria-hidden":"true"}},[this._v("#")]),this._v(" 指令绑定")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("指令 (Directives) 是带有"),s("code",[this._v("v-")]),this._v("前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。\n指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。这里有几个指令常用语绑定数据到页面("),s("strong",[this._v("其他的以后细讲")]),this._v(")：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",[a("code",[t._v("v-html")]),t._v("：与"),a("code",[t._v("v-text")]),t._v("一样的作用，但是与其不同的是，当我们绑定的数据是"),a("code",[t._v("<h1>123</h1>")]),t._v("的话，那么展示的数据会是一级标题格式的 123。这么做具有风险，容易导致 XSS 攻击，Vue 官方也写道只在可信内容上使用"),a("code",[t._v("v-html")]),t._v("，永不用在用户提交的内容上。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[s("code",[this._v("v-bind")]),this._v("：通常，我们需要在页面的元素上绑定 data 属性作为元素的属性的时候，就使用这个指令，这个指令很常用，基本在绑定属性的时候都会出现。它有一个简写"),s("code",[this._v(":属性名")]),this._v("，"),s("code",[this._v('<div :name="name"></div>')]),this._v("，这样写的含义就是，给 div 绑定一个 name 属性，它的属性值就是 data 中的 name 属性值。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",[a("code",[t._v("v-model")]),t._v("：这是一个极具特点的指令，它提供了双向的数据绑定，通常用在用户输入的元素上，以做到页面与数据的相互影响。"),a("code",[t._v('<input v-model="content"/>')]),t._v("，input 框会展示 content 的值，input 的值改变，content 的值也会改变。它的用处有很多，我们以后再讲。"),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("⚠️指令等号后面的内容，虽然用引号括起来，但并不是字符串，而是一个变量名或者其他，如果要让它的值是字符串的话，就要用不一样的引号包裹。\n👌"),a("code",[t._v("v-for")]),t._v("指令中，重复渲染的每一项都推荐添加一项 key 属性，这样有利于虚拟 DOM 的渲染，当然我们通常"),a("code",[t._v(':key="index"')]),t._v("这样给 key 赋值，这样做并不能对虚拟 DOM 的渲染起到性能提升的作用，如果你想了解虚拟 DOM 渲染与 Diff 算法，可以"),a("a",{attrs:{href:"#"}},[t._v("看这里")]),t._v("。")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法","aria-hidden":"true"}},[this._v("#")]),this._v(" 方法")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("方法，就是定义在"),s("code",[this._v("vm")]),this._v("实例中的 methods 中的逻辑代码。它通常用来处理 data 中的属性或者其他组件传递过来的属性。具体我们以后展开来讲，需要知道的是："),s("strong",[this._v("vm 实例中的 this 指向是 vm 实例本身，因此，当 methods 中的方法需要操作 vm 中的属性时，需要使用 this 来指向 vm 来获取")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"生命周期函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生命周期函数","aria-hidden":"true"}},[this._v("#")]),this._v(" 生命周期函数")])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("Vue 生命周期函数就是 Vue 实例在某个时间点自动执行的函数，我们不必做太费力的理解，当做它们像衣架挂在杆子上，到时候成熟的时候，自然就触发了。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"官方图解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#官方图解","aria-hidden":"true"}},[this._v("#")]),this._v(" 官方图解")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"https://cn.vuejs.org/images/lifecycle.png",alt:"VueHook"}}),this._v("\n这其实是一个很明了的流程图，我们拆开来看流程（仅做理解，不够专业）。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ol",[a("li",[t._v("通过构造函数，创建了一个实例")]),t._v(" "),a("li",[t._v("实例开始初始化，在初始化之前会执行"),a("code",[t._v("beforeCreate")]),t._v("函数")]),t._v(" "),a("li",[t._v("实例初始化结束后，会执行"),a("code",[t._v("created")]),t._v("函数")]),t._v(" "),a("li",[t._v("这个时候会做一个判断，要将实例挂载的元素根节点是否存在？如果存在的话，执行下一步，若没有，则等挂载元素的函数被调用")]),t._v(" "),a("li",[t._v("接下来判断是否有模板设置？有的话就将模板放到"),a("code",[t._v("render")]),t._v("函数中，如果没有的话，就将挂载的根节点作为模板。")]),t._v(" "),a("li",[t._v("现在开始挂载，在挂载之前，会自动执行"),a("code",[t._v("beforeMount")]),t._v("函数。之后就开始将实例挂载在元素节点上。")]),t._v(" "),a("li",[t._v("在挂载后，自动执行"),a("code",[t._v("mounted")]),t._v("函数，这个时候，我们可以看到如果挂载后，数据发生变化，会促使两个函数"),a("code",[t._v("beforeUpdate")]),t._v("和"),a("code",[t._v("updated")]),t._v("自动执行，一个在重新渲染页面之前执行，一个重新渲染后执行。")]),t._v(" "),a("li",[t._v("当实例被销毁的时候，也会在销毁前自动执行"),a("code",[t._v("beforeDestroy")]),t._v("函数和销毁之后的"),a("code",[t._v("destroyed")]),t._v("函数。"),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("请到源码仓库中的 vue 实例文件夹下，运行示例代码，阅读注释查看控制台打印，观察生命周期的自动执行。生命周期函数在特定时间自动执行，我们可以利用其在不同的时间段，处理不同的业务，例如可以在"),a("code",[t._v("mounted")]),t._v("中处理页面初次加载的 ajax 请求。")])])])])}],!1,null,null,null);s.default=n.exports}}]);