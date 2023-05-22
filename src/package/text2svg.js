import LRUCache from 'lru-cache'
const revokeCallback = 'requestIdleCallback' in window ? requestIdleCallback : requestAnimationFrame
// 设置url缓存
let UrlCache = new LRUCache({
	max: 100,
	dispose: (value, key) => {
		console.log(value, key)
		revokeCallback(() => {
			URL.revokeObjectURL(value)
		})
	}
})

// 创建svg图片URL
function createSvg(content, options = {}) {
	const { fontSize = 12, fontWeight = 'normal', fontFamily = 'sans-serif', color = '#515a6e', width, height } = options
	const svgStringTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject x="0" y="0" width="${width}" height="${height}">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:${fontSize}px;font-weight:${fontWeight};font-family:${fontFamily};color:${color};line-height:${height}px;text-align:center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${content}</div>
    </foreignObject></svg>`
	let svgString = svgStringTemplate.trim()

	return URL.createObjectURL(new Blob([svgString], { type: 'image/svg+xml' }))
}

// 获取父级盒子的高度
function getParentRenderedHeight(element) {
	// 如果本身有高度
	if (element.clientHeight) return element.clientHeight

	var parent = element.parentNode
	if (!parent) {
		return 0
	}
	var parentHeight = parent.clientHeight
	if (parentHeight === 0) {
		return getParentRenderedHeight(parent)
	}
	return parentHeight
}

// 获取父级盒子的宽度
function getParentRenderedWidth(element) {
	// 如果本身有高度
	if (element.clientWidth) return element.clientWidth

	var parent = element.parentNode
	if (!parent) {
		return 0
	}
	var parentWidth = parent.clientWidth
	if (parentWidth === 0) {
		return getParentRenderedWidth(parent)
	}
	return parentWidth
}

export default {
	bind: function (el, binding, vnode) {
		const { content, options = {} } = binding.value || {}
		if (!content && content !== 0) return

		const io = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const img = entry.target
						options.width = getParentRenderedWidth(img)
						options.height = getParentRenderedHeight(img)
						let cacheKey = `${content}${JSON.stringify(options)}`
						let url = ''
						// 缓存中存在读取缓存的
						if (!UrlCache.get(cacheKey)) {
							url = createSvg(content, options)
							UrlCache.set(cacheKey, url)
						} else {
							url = UrlCache.get(cacheKey)
						}
						let styleString = `;background: url(${url}) no-repeat center;height:${options.height}px;`
						// 如果父元素有宽度，不设置img的宽度
						if (img.parentNode.clientWidth == 0) styleString += `width:${options.width}px`
						img.style.cssText += styleString
						observer.unobserve(img)
					}
				})
			},
			{ once: true }
		)
		io.observe(el)
		el._io = io
	},
	unbind: function (el, binding, vnode) {
		const io = el._io // 获取 IntersectionObserver 实例
		if (io) {
			io.disconnect() // 断开观察器
			el._io = null // 将实例设为 null
		}
	}
}
