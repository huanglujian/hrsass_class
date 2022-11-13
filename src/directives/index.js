//! 定义自定义指令

export const imageerror = {
  //! 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
  inserted(el, options) {
    el.onerror = function() {
      el.src = options.value
    }
  }
}
