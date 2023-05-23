## v-text2svg

一个将文字转为 svg 图片的 vue 插件

## Install

```shell
npm install v-text2svg
```

## Quick Start

```javascript
// main.js
import text2svg from 'v-text2svg'

Vue.use(text2svg)

// other.vue
<div v-text2svg="{ content: 'Hello World!', options: { fontSize: 100 } }"></div>
```

## Options

Currently, only these options are supported, and the visible height and width of the container will be read internally. If not, it will be searched for at the parent level

-   `fontSize` 字体大小
-   `fontWeight` 文字粗细
-   `fontFamily` 文字字体
-   `color` 文字颜色

## LICENSE

MIT
