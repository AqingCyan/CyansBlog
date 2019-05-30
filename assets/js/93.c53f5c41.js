(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{247:function(s,t,a){"use strict";a.r(t);var e=a(0),n=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"develoment-和-production-模式的区分打包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#develoment-和-production-模式的区分打包","aria-hidden":"true"}},[s._v("#")]),s._v(" Develoment 和 Production 模式的区分打包")]),s._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[s._v("develoment")]),s._v(" "),a("p",[s._v("我们在这个模式下，使用了 devserver，它帮我们启动了一个服务器，并且把我们打包的页面放在服务器中运行，我们所做的修改会在页面上实时的发生改变，首先在开发环境中 sourcemap 十分齐全，发现问题可以快速定位，并且一般代码不做压缩。")])]),s._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[s._v("production")]),s._v(" "),a("p",[s._v("一旦我们的源代码开发完成了，我们需要把代码打包上线。但在生产环境下，sourcemap 不是那么重要了，在该模式下，sourcemap 变的简化，可以产生一个.map 文件存储。生产环境代码尽可能的小，会被压缩。")])]),s._v(" "),a("h2",{attrs:{id:"区分打包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#区分打包","aria-hidden":"true"}},[s._v("#")]),s._v(" 区分打包")]),s._v(" "),a("p",[s._v("开发环境与生产环境的 config 配置是不同的，这样的来回切换十分麻烦，因此，我们需要做一个一劳永逸的配置，来实现区别打包。")]),s._v(" "),a("ul",[a("li",[s._v("我们生成两个 config 文件，一个是"),a("code",[s._v("webpack.dev.js")]),s._v("表示他是开发环境的配置")]),s._v(" "),a("li",[s._v("另一个是"),a("code",[s._v("webpack.prod.js")]),s._v("表示是线上环境的配置。")]),s._v(" "),a("li",[s._v("在 package.json 中做一个针对")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dev"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"webpack-dev-server --config webpack.dev.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"build"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"webpack --config webpack.prod.js"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])])])}],!1,null,null,null);t.default=n.exports}}]);