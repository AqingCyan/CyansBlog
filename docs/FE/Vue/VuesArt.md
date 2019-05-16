# 动画与过渡

在页面切换组件或者数据改变导致视图层重新渲染的时候，Vue提供了页面重新渲染的过渡（动画）。依靠CSS或者JS能够提供良好的效果

## CSS实现过渡动画原理

Vue提供了一个内置标签来包裹需要实现过渡效果的组件

``` html
<transition name="fade">
    <div v-if="show">hello world</div>
  </transition>
```
