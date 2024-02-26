import {createApp} from 'vue';
import App from './App.vue';
import './global.d.ts'

window.videoEl = null
window.rate = 1
window.funs = {
    checkWatchPageDiv() {
        let header: any = document.querySelector('#header-bar')
        let stickyPlayer: any = document.querySelector('#app.sticky-player')
        if (header) header.style['display'] = 'none'
        if (stickyPlayer) stickyPlayer.style['padding-top'] = '0'
    }
}
let mb = new MutationObserver(() => {
    let v = document.querySelector('video')
    if (v) {
        if (!window.videoEl) {
            console.log('init')
            v.playbackRate = 2
            window.videoEl = v
        }
    }
})

// mb.observe(document.body, {
//     childList: true,
//     subtree: true
// })

function proxyHTMLMediaElementEvent() {
    if (HTMLMediaElement.prototype._rawAddEventListener_) {
        return false
    }

    HTMLMediaElement.prototype._rawAddEventListener_ = HTMLMediaElement.prototype.addEventListener
    HTMLMediaElement.prototype._rawRemoveEventListener_ = HTMLMediaElement.prototype.removeEventListener

    HTMLMediaElement.prototype.addEventListener = new Proxy(HTMLMediaElement.prototype.addEventListener, {
        apply(target, ctx, args) {
            const eventName = args[0]
            const listener = args[1]
            // console.log('args', args)
            if (listener instanceof Function && eventName === 'ratechange') {
                /* 对注册了ratechange事件进行检测，如果存在异常行为，则尝试挂起事件 */
                args[1] = new Proxy(listener, {
                    apply(target, ctx, args) {
                        if (ctx) {
                            /* 阻止调速检测，并进行反阻止 */
                            if (ctx.playbackRate && eventName === 'ratechange') {
                                if (ctx._hasBlockRatechangeEvent_) {
                                    return true
                                }

                                const oldRate = ctx.playbackRate
                                const startTime = Date.now()

                                const result = target.apply(ctx, args)

                                /**
                                 * 通过判断执行ratechange前后的速率是否被改变，
                                 * 以及是否出现了超长的执行时间（可能出现了alert弹窗）来检测是否可能存在阻止调速的行为
                                 * 其他检测手段待补充
                                 */
                                const blockRatechangeBehave1 = oldRate !== ctx.playbackRate || Date.now() - startTime > 1000
                                const blockRatechangeBehave2 = ctx._setPlaybackRate_ && ctx._setPlaybackRate_.value !== ctx.playbackRate
                                if (blockRatechangeBehave1 || blockRatechangeBehave2) {
                                    debug.info(`[execVideoEvent][${eventName}]检测到可能存在阻止调速的行为，已禁止${eventName}事件的执行`, listener)
                                    ctx._hasBlockRatechangeEvent_ = true
                                    return true
                                } else {
                                    return result
                                }
                            }
                        }

                        try {
                            return target.apply(ctx, args)
                        } catch (e) {
                            debug.error(`[proxyPlayerEvent][${eventName}]`, listener, e)
                        }
                    }
                })
            }
            if (listener instanceof Function && eventName === 'play') {
                /* 对注册了ratechange事件进行检测，如果存在异常行为，则尝试挂起事件 */
                args[1] = new Proxy(listener, {
                    apply(target, ctx, args) {
                        console.log('play', window.rate)
                        ctx.playbackRate = window.rate
                        window.funs.checkWatchPageDiv()
                        try {
                            return target.apply(ctx, args)
                        } catch (e) {
                            debug.error(`[proxyPlayerEvent][${eventName}]`, listener, e)
                        }
                    }
                })
            }

            return target.apply(ctx, args)
        }
    })
}

proxyHTMLMediaElementEvent()

let $section = document.createElement('section')
$section.id = 'vue-app'
document.body.append($section)
let vueApp = createApp(App)
vueApp.config.unwrapInjectedRef = true
vueApp.mount($section);