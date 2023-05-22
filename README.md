## v-text2svg

一个将文字转为svg图片的vue插件

## Install

```shell
npm install v-text2svg
```

## Quick Start
``` javascript
// main.js
import text2svg from 'v-text2svg'

Vue.use(text2svg)

// other.vue
<div v-text2svg="{ content: 'Hello World!', options: { fontSize: 100 } }"></div>
```
## Options

- `fontSize` 字体大小
- `fontWeight`  文字粗细
- `fontFamily` 文字字体
- `color` 文字颜色

## LICENSE

MIT
