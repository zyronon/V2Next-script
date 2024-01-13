// ==UserScript==
// @name         V2Next-Mobile
// @namespace    http://tampermonkey.net/
// @version      7.9.1
// @author       zyronon
// @description  楼中楼、简洁模式、高赞回复排序、查看回复上下文、发送图片和表情、UI美化、base64 解码等功能
// @license      GPL License
// @icon         https://www.google.com/s2/favicons?sz=64&domain=v2ex.com
// @downloadURL  https://github.com/zyronon/v2ex-script/raw/master/dist/vite-project.user.js
// @updateURL    https://github.com/zyronon/v2ex-script/raw/master/dist/vite-project.user.js
// @match        https://v2ex.com/
// @match        https://v2ex.com/?tab=*
// @match        https://v2ex.com/t/*
// @match        https://v2ex.com/recent*
// @match        https://v2ex.com/go/*
// @match        https://v2ex.com/member/*
// @match        https://*.v2ex.com/
// @match        https://*.v2ex.com/?tab=*
// @match        https://*.v2ex.com/t/*
// @match        https://*.v2ex.com/recent*
// @match        https://*.v2ex.com/go/*
// @match        https://*.v2ex.com/member/*
// @match        http://localhost:8000/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.12/dist/vue.global.prod.js
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const e=document.createElement("style");e.textContent=o,document.head.append(e)})(' .v-enter-active,.v-leave-active{transition:opacity .3s ease}.v-enter-from,.v-leave-to{opacity:0}.username{font-weight:700;font-size:1.4rem;margin-right:1rem}.link-num{font-weight:700;color:var(--color-font-8)}.owner{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.mod{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.my-tag{font-size:1.4rem;color:red;margin-left:1rem}.my-tag .remove{margin-left:.5rem;display:none}.add-tag{font-size:2.4rem;transform:translateY(.2rem);line-height:1rem;display:inline-block;margin-left:1rem;position:absolute;display:none}.floor{font-size:1.1rem;line-height:1rem;border-radius:.5rem;display:inline-block;color:var(--color-floor-font);cursor:default;margin-right:1rem}.avatar{margin-right:1rem;display:inline-flex}.avatar img{width:2.8rem;height:2.8rem;border-radius:.4rem}:root{--color-main-bg: #e2e2e2;--color-second-bg: white;--color-third-bg: #e2e2e2;--color-item-bg: white;--color-swtich-bg: #dcdfe6;--color-active: #409eff;--color-font: #999;--color-font-8: rgba(0, 0, 0, .8);--color-font-3: rgba(0, 0, 0, .3);--color-font-pure: black;--color-input-bg: white;--color-input-border: #e2e2e2;--color-input-border-hover: #a3a6ad;--color-radio-border: #e2e2e2;--color-tooltip-bg: white;--color-tooltip-shadow: #bbbbbb;--color-scrollbar: #93ade3;--color-line: #e2e2e2;--color-loading-1: #00000033;--color-loading-2: #000;--color-floor: #f0f0f0;--color-floor-font: #bdbdbd;--color-editor-toolbar: #f6f7f8;--color-sp-btn-bg: #f1f1f1;--color-call-list-bg: white}html.dark{--color-main-bg: #22303f;--color-second-bg: #18222d;--color-third-bg: #31475e;--color-item-bg: #18222d;--color-swtich-bg: #4c4d4f;--color-active: #409eff;--color-font: rgba(255, 255, 255, .5);--color-font-8: rgba(255, 255, 255, .8);--color-font-3: rgba(255, 255, 255, .3);--color-font-pure: white;--color-input-bg: #333333;--color-input-border: #6c6e72;--color-input-border-hover: #a3a6ad;--color-radio-border: #454847;--color-tooltip-bg: #31475e;--color-tooltip-shadow: #3b3b3b;--color-scrollbar: #5c5d5e;--color-line: var(--box-border-color);--color-loading-1: rgba(178, 177, 177, .2);--color-loading-2: #ffffff;--color-floor: #293b4d;--color-floor-font: rgba(255, 255, 255, .3);--color-editor-toolbar: var(--box-background-hover-color);--color-sp-btn-bg: #31475e;--color-call-list-bg: #31475e}html,body{font-size:62.5%}.flex{display:flex;align-items:center;justify-content:space-between}.flex-end{justify-content:flex-end}.flex-center{justify-content:center}.p1{padding:1rem}.p2{padding:2rem}.p0{padding:0!important}body :is(.topic_content,.reply_content) a[href^=http]{text-underline-offset:.46ex;color:currentcolor;text-decoration:underline 1.5px}a{text-decoration:none}.tool{position:relative;display:flex;align-items:center;border-radius:.3rem;height:2.6rem;padding:0 .5rem;gap:.6rem}.tool>svg{width:1.6rem!important;height:1.6rem!important}.tool.disabled{cursor:not-allowed}.tool span{font-weight:700;line-height:1rem}.my-node{border-radius:.2rem;padding:.4rem;font-size:1rem;color:#999;background:#f5f5f5}.msgs{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.my-box{background:var(--box-background-color);margin-bottom:.5rem;width:100%;overflow:hidden;box-sizing:border-box;transition:background-color .3s}.my-box .box-content{padding:.5rem}.my-cell{color:var(--color-font);height:4.2rem;padding:0 1rem;font-size:1.4rem;line-height:150%;text-align:left;border-bottom:1px solid var(--color-line)}.modal{position:fixed;z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center}.modal .title{font-size:2.4rem;margin-bottom:1rem;text-align:center}.modal .option{display:flex;align-items:center;padding:.6rem 0}.modal .option>span{position:relative}.modal .mask{position:fixed;width:100vw;height:100vh;left:0;top:0;background-color:#1d1c1c47}.radio-group2{display:inline-flex;border-radius:.5rem;overflow:hidden;border:1px solid var(--color-radio-border);background:var(--box-background-alt-color)}.radio-group2 .radio{background:transparent;padding:.5rem 1.2rem;border-left:1px solid var(--color-radio-border);font-size:1.3rem;color:var(--color-gray)}.radio-group2 .radio:first-child{border-left:none}.radio-group2 .active{background:var(--color-third-bg);color:var(--color-font)}.pop-confirm{position:relative;display:inline-flex;justify-content:center}input{height:3rem;outline:unset;border:1px solid var(--color-input-border);padding:0 .5rem;border-radius:5px;box-sizing:border-box;transition:all .3s;background:var(--color-input-bg);color:var(--color-font)}input:focus{border:1px solid var(--color-active)}.danger{color:red!important}.topic_content,.reply_content{font-size:1.6rem}.tip[data-v-ee672411]{position:fixed;font-size:1.6rem;z-index:9999;max-width:10rem;border-radius:.5rem;padding:1rem;color:var(--color-font-8);background:var(--color-tooltip-bg);box-shadow:0 0 6px 1px var(--color-tooltip-shadow)}.v-enter-active[data-v-e7c0fbef],.v-leave-active[data-v-e7c0fbef]{transition:opacity .3s ease}.v-enter-from[data-v-e7c0fbef],.v-leave-to[data-v-e7c0fbef]{opacity:0}.username[data-v-e7c0fbef]{font-weight:700;font-size:1.4rem;margin-right:1rem}.link-num[data-v-e7c0fbef]{font-weight:700;color:var(--color-font-8)}.owner[data-v-e7c0fbef]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.mod[data-v-e7c0fbef]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.my-tag[data-v-e7c0fbef]{font-size:1.4rem;color:red;margin-left:1rem}.my-tag .remove[data-v-e7c0fbef]{margin-left:.5rem;display:none}.add-tag[data-v-e7c0fbef]{font-size:2.4rem;transform:translateY(.2rem);line-height:1rem;display:inline-block;margin-left:1rem;position:absolute;display:none}.floor[data-v-e7c0fbef]{font-size:1.1rem;line-height:1rem;border-radius:.5rem;display:inline-block;color:var(--color-floor-font);cursor:default;margin-right:1rem}.avatar[data-v-e7c0fbef]{margin-right:1rem;display:inline-flex}.avatar img[data-v-e7c0fbef]{width:2.8rem;height:2.8rem;border-radius:.4rem}[data-v-e7c0fbef]:root{--color-main-bg: #e2e2e2;--color-second-bg: white;--color-third-bg: #e2e2e2;--color-item-bg: white;--color-swtich-bg: #dcdfe6;--color-active: #409eff;--color-font: #999;--color-font-8: rgba(0, 0, 0, .8);--color-font-3: rgba(0, 0, 0, .3);--color-font-pure: black;--color-input-bg: white;--color-input-border: #e2e2e2;--color-input-border-hover: #a3a6ad;--color-radio-border: #e2e2e2;--color-tooltip-bg: white;--color-tooltip-shadow: #bbbbbb;--color-scrollbar: #93ade3;--color-line: #e2e2e2;--color-loading-1: #00000033;--color-loading-2: #000;--color-floor: #f0f0f0;--color-floor-font: #bdbdbd;--color-editor-toolbar: #f6f7f8;--color-sp-btn-bg: #f1f1f1;--color-call-list-bg: white}html.dark[data-v-e7c0fbef]{--color-main-bg: #22303f;--color-second-bg: #18222d;--color-third-bg: #31475e;--color-item-bg: #18222d;--color-swtich-bg: #4c4d4f;--color-active: #409eff;--color-font: rgba(255, 255, 255, .5);--color-font-8: rgba(255, 255, 255, .8);--color-font-3: rgba(255, 255, 255, .3);--color-font-pure: white;--color-input-bg: #333333;--color-input-border: #6c6e72;--color-input-border-hover: #a3a6ad;--color-radio-border: #454847;--color-tooltip-bg: #31475e;--color-tooltip-shadow: #3b3b3b;--color-scrollbar: #5c5d5e;--color-line: var(--box-border-color);--color-loading-1: rgba(178, 177, 177, .2);--color-loading-2: #ffffff;--color-floor: #293b4d;--color-floor-font: rgba(255, 255, 255, .3);--color-editor-toolbar: var(--box-background-hover-color);--color-sp-btn-bg: #31475e;--color-call-list-bg: #31475e}html[data-v-e7c0fbef],body[data-v-e7c0fbef]{font-size:62.5%}.flex[data-v-e7c0fbef]{display:flex;align-items:center;justify-content:space-between}.flex-end[data-v-e7c0fbef]{justify-content:flex-end}.flex-center[data-v-e7c0fbef]{justify-content:center}.p1[data-v-e7c0fbef]{padding:1rem}.p2[data-v-e7c0fbef]{padding:2rem}.p0[data-v-e7c0fbef]{padding:0!important}body :is(.topic_content,.reply_content) a[href^=http][data-v-e7c0fbef]{text-underline-offset:.46ex;color:currentcolor;text-decoration:underline 1.5px}a[data-v-e7c0fbef]{text-decoration:none}.tool[data-v-e7c0fbef]{position:relative;display:flex;align-items:center;border-radius:.3rem;height:2.6rem;padding:0 .5rem;gap:.6rem}.tool>svg[data-v-e7c0fbef]{width:1.6rem!important;height:1.6rem!important}.tool.disabled[data-v-e7c0fbef]{cursor:not-allowed}.tool span[data-v-e7c0fbef]{font-weight:700;line-height:1rem}.my-node[data-v-e7c0fbef]{border-radius:.2rem;padding:.4rem;font-size:1rem;color:#999;background:#f5f5f5}.msgs[data-v-e7c0fbef]{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.my-box[data-v-e7c0fbef]{background:var(--box-background-color);margin-bottom:.5rem;width:100%;overflow:hidden;box-sizing:border-box;transition:background-color .3s}.my-box .box-content[data-v-e7c0fbef]{padding:.5rem}.my-cell[data-v-e7c0fbef]{color:var(--color-font);height:4.2rem;padding:0 1rem;font-size:1.4rem;line-height:150%;text-align:left;border-bottom:1px solid var(--color-line)}.modal[data-v-e7c0fbef]{position:fixed;z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center}.modal .title[data-v-e7c0fbef]{font-size:2.4rem;margin-bottom:1rem;text-align:center}.modal .option[data-v-e7c0fbef]{display:flex;align-items:center;padding:.6rem 0}.modal .option>span[data-v-e7c0fbef]{position:relative}.modal .mask[data-v-e7c0fbef]{position:fixed;width:100vw;height:100vh;left:0;top:0;background-color:#1d1c1c47}.radio-group2[data-v-e7c0fbef]{display:inline-flex;border-radius:.5rem;overflow:hidden;border:1px solid var(--color-radio-border);background:var(--box-background-alt-color)}.radio-group2 .radio[data-v-e7c0fbef]{background:transparent;padding:.5rem 1.2rem;border-left:1px solid var(--color-radio-border);font-size:1.3rem;color:var(--color-gray)}.radio-group2 .radio[data-v-e7c0fbef]:first-child{border-left:none}.radio-group2 .active[data-v-e7c0fbef]{background:var(--color-third-bg);color:var(--color-font)}.pop-confirm[data-v-e7c0fbef]{position:relative;display:inline-flex;justify-content:center}input[data-v-e7c0fbef]{height:3rem;outline:unset;border:1px solid var(--color-input-border);padding:0 .5rem;border-radius:5px;box-sizing:border-box;transition:all .3s;background:var(--color-input-bg);color:var(--color-font)}input[data-v-e7c0fbef]:focus{border:1px solid var(--color-active)}.danger[data-v-e7c0fbef]{color:red!important}.topic_content[data-v-e7c0fbef],.reply_content[data-v-e7c0fbef]{font-size:1.6rem}.switch[data-v-e7c0fbef]{width:4.5rem;height:2.2rem;border-radius:2rem;position:relative;display:flex;align-items:center;background:var(--color-swtich-bg);transition:all .3s}.switch.active[data-v-e7c0fbef]{background:var(--color-active)}.switch.active[data-v-e7c0fbef]:before{right:.2rem}.switch[data-v-e7c0fbef]:before{position:absolute;content:" ";transition:all .3s;right:calc(100% - 2rem);width:1.8rem;height:1.8rem;background:white;border-radius:50%}.setting-modal .modal-root[data-v-70f55b93]{z-index:9;background:var(--color-main-bg);border-radius:1.6rem;font-size:1.4rem;overflow:hidden;color:var(--color-font-pure)}.setting-modal .modal-root .modal-header[data-v-70f55b93]{padding:2.4rem;display:flex;justify-content:space-between}.setting-modal .modal-root .modal-header .title[data-v-70f55b93]{font-size:2.6rem;font-weight:700;text-align:left;margin-bottom:0}.setting-modal .modal-root .modal-header i[data-v-70f55b93]{font-size:2.2rem}.setting-modal .modal-root .body[data-v-70f55b93]{width:45vw;height:70vh;display:flex}.setting-modal .modal-root .body .left[data-v-70f55b93]{display:flex;flex-direction:column;justify-content:space-between;align-items:center;font-size:1.8rem}.setting-modal .modal-root .body .left .tabs[data-v-70f55b93]{padding:1rem 2rem;display:flex;flex-direction:column;gap:1rem}.setting-modal .modal-root .body .left .tabs .tab[data-v-70f55b93]{padding:1rem 1.5rem;border-radius:.8rem;display:flex;align-items:center;gap:1rem}.setting-modal .modal-root .body .left .tabs .tab.active[data-v-70f55b93]{background:var(--color-item-bg)}.setting-modal .modal-root .body .modal-content[data-v-70f55b93]{background:var(--color-second-bg);flex:1;height:100%;box-sizing:border-box;padding:1rem 1rem 1rem 2rem;border-radius:1.6rem;display:flex}.setting-modal .modal-root .body .modal-content .scroll[data-v-70f55b93]{flex:1;padding-right:1rem;overflow:auto}.setting-modal .modal-root .body .modal-content .scroll .row[data-v-70f55b93]{min-height:5rem;display:flex;justify-content:space-between;align-items:center}.setting-modal .modal-root .body .modal-content .scroll .row .wrapper[data-v-70f55b93]{height:3rem;flex:1;display:flex;justify-content:flex-end;align-items:center;gap:var(--space)}.setting-modal .modal-root .body .modal-content .scroll .row .wrapper span[data-v-70f55b93]{text-align:right;font-size:1.4rem;color:gray}.setting-modal .modal-root .body .modal-content .scroll .row .wrapper .set-key[data-v-70f55b93]{align-items:center}.setting-modal .modal-root .body .modal-content .scroll .row .wrapper .set-key input[data-v-70f55b93]{width:15rem;box-sizing:border-box;margin-right:1rem;height:2.8rem;outline:none;font-size:1.6rem;border:1px solid gray;border-radius:.3rem;padding:0 .5rem;background:var(--color-second-bg);color:var(--color-font-1)}.setting-modal .modal-root .body .modal-content .scroll .row .main-title[data-v-70f55b93]{font-size:2.2rem;font-weight:700;color:var(--color-font-8)}.setting-modal .modal-root .body .modal-content .scroll .row .item-title[data-v-70f55b93]{font-size:1.8rem}.setting-modal .modal-root .body .modal-content .scroll .desc[data-v-70f55b93]{margin-bottom:1rem;font-size:1.4rem;text-align:left;color:var(--color-font)}.setting-modal .modal-root .body .modal-content .scroll .project-desc[data-v-70f55b93]{text-align:start;font-size:1.6rem;padding-bottom:10rem}.setting-modal .modal-root .body .modal-content .scroll .line[data-v-70f55b93]{border-bottom:1px solid #c4c3c3}.loading[data-v-2697baa2]{border:2px solid;border-color:var(--color-loading-2) var(--color-loading-1) var(--color-loading-1) var(--color-loading-1);border-radius:100%;animation:circle-2697baa2 infinite 1s linear;width:2rem;height:2rem}.loading.small[data-v-2697baa2]{width:1.2rem;height:1.2rem}.loading.large[data-v-2697baa2]{width:3rem;height:3rem}@keyframes circle-2697baa2{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.base-button[data-v-04f4c89d]{border-radius:.6rem;padding:0 1.5rem;display:inline-flex;align-items:center;justify-content:center;transition:all .3s;height:3.6rem;line-height:1;position:relative}.base-button .loading[data-v-04f4c89d]{position:absolute}.base-button.disabled[data-v-04f4c89d]{opacity:.6;cursor:not-allowed;-webkit-user-select:none;user-select:none}.base-button.small[data-v-04f4c89d]{height:3rem}.base-button.small>span[data-v-04f4c89d]{font-size:1.3rem}.base-button.large[data-v-04f4c89d]{height:5rem;font-size:1.8rem;padding:0 2.2rem}.base-button.large>span[data-v-04f4c89d]{font-size:1.8rem}.base-button.primary[data-v-04f4c89d]{background:var(--color-active)}.base-button.primary>span[data-v-04f4c89d]{color:#fff}.base-button.gary[data-v-04f4c89d]{background:#4b5563}.base-button.link[data-v-04f4c89d]{border-radius:0;border-bottom:2px solid transparent}.base-button.link>span[data-v-04f4c89d]{color:var(--color-font-8)}.base-button.active[data-v-04f4c89d]{opacity:.4}.key-notice[data-v-04f4c89d]{margin-left:1rem;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:#fff}.key-notice .key[data-v-04f4c89d]{transform:scale(.8)}.pop-confirm-content[data-v-05424197]{position:fixed;background:var(--color-tooltip-bg);box-shadow:0 0 6px 1px var(--color-tooltip-shadow);color:var(--color-font-8);padding:1.5rem;border-radius:.8rem;transform:translate(-50%,calc(-100% - 1rem));z-index:999}.pop-confirm-content .text[data-v-05424197]{text-align:start;font-size:1.6rem;width:15rem;min-width:15rem}.pop-confirm-content .options[data-v-05424197]{margin-top:1.5rem;display:flex;justify-content:flex-end;align-items:center;gap:1rem}.more[data-v-fec104f6]{height:1.6rem;width:1.6rem;display:flex;flex-direction:column;justify-content:space-between;align-items:center}.more div[data-v-fec104f6]{background:var(--color-floor-font);width:.3rem;height:.3rem;border-radius:50%}.Author[data-v-5a16636d]{display:flex;align-items:center;justify-content:space-between;font-size:1.2rem;position:relative}.Author.expand[data-v-5a16636d]{margin-bottom:0}.Author .Author-left[data-v-5a16636d]{display:flex;align-items:center;max-width:65%;word-break:break-all}.Author .Author-left .info[data-v-5a16636d]{display:flex;flex-direction:column}.Author .Author-left .username[data-v-5a16636d]{font-size:1.4rem;margin-right:1rem}.Author .Author-left .expand-icon[data-v-5a16636d]{margin-right:.8rem;width:2rem;height:2rem;transform:rotate(90deg)}.Author .Author-left .texts[data-v-5a16636d]{flex:1}.Author .Author-left .owner[data-v-5a16636d]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.Author .Author-left .dup[data-v-5a16636d]{display:inline-block;background-color:transparent;color:red;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid red;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.Author .Author-left .mod[data-v-5a16636d]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.Author .Author-right[data-v-5a16636d]{position:absolute;right:0;display:flex;align-items:center}.Author .Author-right .toolbar[data-v-5a16636d]{display:flex;align-items:center;color:var(--color-gray);opacity:0;font-weight:700;gap:1rem}.post-editor-wrapper[data-v-a0447529]{width:100%;box-sizing:border-box;position:relative;overflow:hidden;transition:all .3s;color:var(--color-font)}.post-editor-wrapper.reply-post .post-editor[data-v-a0447529]{border:1px solid var(--color-line)}.post-editor-wrapper.reply-post.isFocus .post-editor[data-v-a0447529]{border:1px solid var(--color-active)}.post-editor-wrapper.reply-comment[data-v-a0447529]{border-radius:var(--box-border-radius);overflow:hidden;border:1px solid var(--color-line)}.post-editor-wrapper.reply-comment.isFocus[data-v-a0447529]{border:1px solid var(--color-active)}.post-editor-wrapper.reply-comment .toolbar[data-v-a0447529]{background:var(--color-editor-toolbar)}.post-editor-wrapper .post-editor[data-v-a0447529]{border-radius:var(--box-border-radius);transition:border .3s;width:100%;max-width:100%;padding:.6rem 1.4rem;box-sizing:border-box;outline:none;font-family:Avenir,Helvetica,Arial,sans-serif;font-size:1.4rem;min-height:13rem;resize:none;background:var(--box-background-color);color:var(--color-font-pure);border:1px solid transparent}.post-editor-wrapper .toolbar[data-v-a0447529]{box-sizing:border-box;padding:.5rem 1rem;width:100%;position:relative;display:flex;justify-content:space-between;align-items:center}.post-editor-wrapper .toolbar .left[data-v-a0447529]{display:flex;gap:1rem}.post-editor-wrapper .toolbar .left .upload input[data-v-a0447529]{position:absolute;width:20px;height:20px;opacity:0}.post-editor-wrapper .toolbar span[data-v-a0447529]{color:gray;font-size:1.3rem}.post-editor-wrapper .get-cursor[data-v-a0447529]{border-radius:var(--box-border-radius);transition:border .3s;width:100%;max-width:100%;padding:.6rem 1.4rem;box-sizing:border-box;outline:none;font-family:Avenir,Helvetica,Arial,sans-serif;font-size:1.4rem;min-height:13rem;resize:none;background:var(--box-background-color);color:var(--color-font-pure);border:1px solid transparent;position:absolute;top:0;z-index:-100}.post-editor-wrapper .emoticon-pack[data-v-a0447529]{z-index:999999999;border-radius:1rem;padding:1rem;width:31rem;max-width:31rem;height:30rem;max-height:30rem;overflow:auto;background:var(--color-third-bg);border:1px solid var(--color-font-3);box-shadow:0 9px 24px -3px #0000000f,0 4px 8px -1px #0000001f;position:fixed;bottom:11rem;left:14rem}.post-editor-wrapper .emoticon-pack i[data-v-a0447529]{position:absolute;right:2rem;font-size:2rem;color:#e2e2e2}.post-editor-wrapper .emoticon-pack .list[data-v-a0447529]{margin:1rem 0}.post-editor-wrapper .emoticon-pack img[data-v-a0447529]{width:3rem;height:3rem;padding:.5rem}.post-editor-wrapper .emoticon-pack span[data-v-a0447529]{display:inline-block;font-size:2.3rem;padding:.5rem}.v-enter-active[data-v-0276a65d],.v-leave-active[data-v-0276a65d]{transition:opacity .3s ease}.v-enter-from[data-v-0276a65d],.v-leave-to[data-v-0276a65d]{opacity:0}.username[data-v-0276a65d]{font-weight:700;font-size:1.4rem;margin-right:1rem}.link-num[data-v-0276a65d]{font-weight:700;color:var(--color-font-8)}.owner[data-v-0276a65d]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.mod[data-v-0276a65d]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.my-tag[data-v-0276a65d]{font-size:1.4rem;color:red;margin-left:1rem}.my-tag .remove[data-v-0276a65d]{margin-left:.5rem;display:none}.add-tag[data-v-0276a65d]{font-size:2.4rem;transform:translateY(.2rem);line-height:1rem;display:inline-block;margin-left:1rem;position:absolute;display:none}.floor[data-v-0276a65d]{font-size:1.1rem;line-height:1rem;border-radius:.5rem;display:inline-block;color:var(--color-floor-font);cursor:default;margin-right:1rem}.avatar[data-v-0276a65d]{margin-right:1rem;display:inline-flex}.avatar img[data-v-0276a65d]{width:2.8rem;height:2.8rem;border-radius:.4rem}[data-v-0276a65d]:root{--color-main-bg: #e2e2e2;--color-second-bg: white;--color-third-bg: #e2e2e2;--color-item-bg: white;--color-swtich-bg: #dcdfe6;--color-active: #409eff;--color-font: #999;--color-font-8: rgba(0, 0, 0, .8);--color-font-3: rgba(0, 0, 0, .3);--color-font-pure: black;--color-input-bg: white;--color-input-border: #e2e2e2;--color-input-border-hover: #a3a6ad;--color-radio-border: #e2e2e2;--color-tooltip-bg: white;--color-tooltip-shadow: #bbbbbb;--color-scrollbar: #93ade3;--color-line: #e2e2e2;--color-loading-1: #00000033;--color-loading-2: #000;--color-floor: #f0f0f0;--color-floor-font: #bdbdbd;--color-editor-toolbar: #f6f7f8;--color-sp-btn-bg: #f1f1f1;--color-call-list-bg: white}html.dark[data-v-0276a65d]{--color-main-bg: #22303f;--color-second-bg: #18222d;--color-third-bg: #31475e;--color-item-bg: #18222d;--color-swtich-bg: #4c4d4f;--color-active: #409eff;--color-font: rgba(255, 255, 255, .5);--color-font-8: rgba(255, 255, 255, .8);--color-font-3: rgba(255, 255, 255, .3);--color-font-pure: white;--color-input-bg: #333333;--color-input-border: #6c6e72;--color-input-border-hover: #a3a6ad;--color-radio-border: #454847;--color-tooltip-bg: #31475e;--color-tooltip-shadow: #3b3b3b;--color-scrollbar: #5c5d5e;--color-line: var(--box-border-color);--color-loading-1: rgba(178, 177, 177, .2);--color-loading-2: #ffffff;--color-floor: #293b4d;--color-floor-font: rgba(255, 255, 255, .3);--color-editor-toolbar: var(--box-background-hover-color);--color-sp-btn-bg: #31475e;--color-call-list-bg: #31475e}html[data-v-0276a65d],body[data-v-0276a65d]{font-size:62.5%}.flex[data-v-0276a65d]{display:flex;align-items:center;justify-content:space-between}.flex-end[data-v-0276a65d]{justify-content:flex-end}.flex-center[data-v-0276a65d]{justify-content:center}.p1[data-v-0276a65d]{padding:1rem}.p2[data-v-0276a65d]{padding:2rem}.p0[data-v-0276a65d]{padding:0!important}body :is(.topic_content,.reply_content) a[href^=http][data-v-0276a65d]{text-underline-offset:.46ex;color:currentcolor;text-decoration:underline 1.5px}a[data-v-0276a65d]{text-decoration:none}.tool[data-v-0276a65d]{position:relative;display:flex;align-items:center;border-radius:.3rem;height:2.6rem;padding:0 .5rem;gap:.6rem}.tool>svg[data-v-0276a65d]{width:1.6rem!important;height:1.6rem!important}.tool.disabled[data-v-0276a65d]{cursor:not-allowed}.tool span[data-v-0276a65d]{font-weight:700;line-height:1rem}.my-node[data-v-0276a65d]{border-radius:.2rem;padding:.4rem;font-size:1rem;color:#999;background:#f5f5f5}.msgs[data-v-0276a65d]{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.my-box[data-v-0276a65d]{background:var(--box-background-color);margin-bottom:.5rem;width:100%;overflow:hidden;box-sizing:border-box;transition:background-color .3s}.my-box .box-content[data-v-0276a65d]{padding:.5rem}.my-cell[data-v-0276a65d]{color:var(--color-font);height:4.2rem;padding:0 1rem;font-size:1.4rem;line-height:150%;text-align:left;border-bottom:1px solid var(--color-line)}.modal[data-v-0276a65d]{position:fixed;z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center}.modal .title[data-v-0276a65d]{font-size:2.4rem;margin-bottom:1rem;text-align:center}.modal .option[data-v-0276a65d]{display:flex;align-items:center;padding:.6rem 0}.modal .option>span[data-v-0276a65d]{position:relative}.modal .mask[data-v-0276a65d]{position:fixed;width:100vw;height:100vh;left:0;top:0;background-color:#1d1c1c47}.radio-group2[data-v-0276a65d]{display:inline-flex;border-radius:.5rem;overflow:hidden;border:1px solid var(--color-radio-border);background:var(--box-background-alt-color)}.radio-group2 .radio[data-v-0276a65d]{background:transparent;padding:.5rem 1.2rem;border-left:1px solid var(--color-radio-border);font-size:1.3rem;color:var(--color-gray)}.radio-group2 .radio[data-v-0276a65d]:first-child{border-left:none}.radio-group2 .active[data-v-0276a65d]{background:var(--color-third-bg);color:var(--color-font)}.pop-confirm[data-v-0276a65d]{position:relative;display:inline-flex;justify-content:center}input[data-v-0276a65d]{height:3rem;outline:unset;border:1px solid var(--color-input-border);padding:0 .5rem;border-radius:5px;box-sizing:border-box;transition:all .3s;background:var(--color-input-bg);color:var(--color-font)}input[data-v-0276a65d]:focus{border:1px solid var(--color-active)}.danger[data-v-0276a65d]{color:red!important}.topic_content[data-v-0276a65d],.reply_content[data-v-0276a65d]{font-size:1.6rem}.html-wrapper[data-v-0276a65d]{position:relative}.html-wrapper .mask[data-v-0276a65d]{max-height:90rem;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,#000 80%,transparent)}.html-wrapper .expand[data-v-0276a65d]{position:absolute;z-index:1;bottom:2rem;padding:.2rem 1.5rem;border-radius:2rem;border:1px solid gray;background:white;color:gray;left:50%;transform:translate(-50%)}.comment[data-v-4ff6e11b]{width:100%;box-sizing:border-box;margin-top:.6rem}.comment.isLevelOne[data-v-4ff6e11b]{border-bottom:1px solid var(--color-line);padding:.8rem 1rem;margin-top:0}.comment.ding[data-v-4ff6e11b]{background:rgba(255,255,0,.3)!important}.comment.isSimple .avatar[data-v-4ff6e11b],.comment.isSimple .expand-line[data-v-4ff6e11b]{display:none}.comment.isSimple .simple-wrapper[data-v-4ff6e11b]{padding-left:2.8rem}.comment.isSimple .w[data-v-4ff6e11b]{padding-left:0!important;padding-top:.5rem}.comment .comment-content-w .more[data-v-4ff6e11b]{text-align:center;margin:2rem 0}.comment .comment-content[data-v-4ff6e11b]{display:flex;position:relative}.comment .comment-content .expand-line[data-v-4ff6e11b]{margin-top:.6rem;width:2.8rem;min-width:2.8rem;position:relative}.comment .comment-content .expand-line[data-v-4ff6e11b]:after{position:absolute;left:50%;content:" ";height:100%;width:0;border-right:1px solid var(--color-line)}.comment .comment-content .right[data-v-4ff6e11b]{flex:1;width:calc(100% - 3rem)}.comment .comment-content .right .w[data-v-4ff6e11b]{padding-left:1rem}.comment .comment-content .right .w .post-editor-wrapper[data-v-4ff6e11b]{margin-top:1rem}.wrong-wrapper[data-v-4ff6e11b]{font-size:1.4rem;margin-bottom:1rem}.wrong-wrapper .del-line[data-v-4ff6e11b]{text-decoration:line-through}.wrong-wrapper .wrong-icon[data-v-4ff6e11b]{margin-left:.5rem}.wrong-wrapper .warning[data-v-4ff6e11b]{border-top:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1;padding:1rem 0;margin-top:1rem;font-size:1.2rem;color:red}.toolbar[data-v-7f81cb15]{border-top:1px solid var(--color-line);height:3.8rem;padding:0 1rem;display:flex;align-items:center;color:var(--color-font);font-size:1.4rem;justify-content:space-between}.toolbar .left[data-v-7f81cb15],.toolbar .right[data-v-7f81cb15]{gap:1rem;display:flex}.toolbar .right[data-v-7f81cb15]{gap:.6rem}.comment[data-v-953d8ab1]{width:100%;box-sizing:border-box;display:flex;gap:1rem;padding:1rem;border-bottom:1px solid var(--color-line)}.comment.isSimple .avatar[data-v-953d8ab1]{display:none}.comment.isSimple .reply_content[data-v-953d8ab1]{margin-top:.5rem!important}.comment .avatar[data-v-953d8ab1]{display:flex}.comment .avatar img[data-v-953d8ab1]{width:3.8rem;height:3.8rem;border-radius:.3rem}.comment .comment-body[data-v-953d8ab1]{flex:1;display:flex;flex-direction:column}.comment .comment-body .texts[data-v-953d8ab1]{display:flex;align-items:center}.comment .comment-body .reply_content[data-v-953d8ab1]{margin-top:1rem;max-width:calc(100% - 5rem)}.comment .isRight[data-v-953d8ab1]{align-items:flex-end}.comment .isRight .owner[data-v-953d8ab1],.comment .isRight .mod[data-v-953d8ab1],.comment .isRight .username[data-v-953d8ab1]{margin:0 0 0 1rem}.comment .Author-right[data-v-953d8ab1]{display:flex;flex-direction:column;align-items:center}.comment .Author-right .floor[data-v-953d8ab1]{margin-left:0}.comment .Author-right .jump[data-v-953d8ab1]{color:#929596;margin-top:.4rem;font-size:1.4rem}.comment .point[data-v-953d8ab1]{margin:0 .5rem;font-size:1.4rem;display:flex;gap:.5rem;align-items:center;font-weight:700;color:#000}.sticky{position:sticky;bottom:-2px;z-index:2;background:var(--box-background-hover-color)!important}.sticky[stuck]{box-shadow:0 2px 20px #00000059!important}.v-enter-active[data-v-723e2e62],.v-leave-active[data-v-723e2e62]{transition:opacity .3s ease}.v-enter-from[data-v-723e2e62],.v-leave-to[data-v-723e2e62]{opacity:0}.username[data-v-723e2e62]{font-weight:700;font-size:1.4rem;margin-right:1rem}.link-num[data-v-723e2e62]{font-weight:700;color:var(--color-font-8)}.owner[data-v-723e2e62]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.mod[data-v-723e2e62]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.my-tag[data-v-723e2e62]{font-size:1.4rem;color:red;margin-left:1rem}.my-tag .remove[data-v-723e2e62]{margin-left:.5rem;display:none}.add-tag[data-v-723e2e62]{font-size:2.4rem;transform:translateY(.2rem);line-height:1rem;display:inline-block;margin-left:1rem;position:absolute;display:none}.floor[data-v-723e2e62]{font-size:1.1rem;line-height:1rem;border-radius:.5rem;display:inline-block;color:var(--color-floor-font);cursor:default;margin-right:1rem}.avatar[data-v-723e2e62]{margin-right:1rem;display:inline-flex}.avatar img[data-v-723e2e62]{width:2.8rem;height:2.8rem;border-radius:.4rem}[data-v-723e2e62]:root{--color-main-bg: #e2e2e2;--color-second-bg: white;--color-third-bg: #e2e2e2;--color-item-bg: white;--color-swtich-bg: #dcdfe6;--color-active: #409eff;--color-font: #999;--color-font-8: rgba(0, 0, 0, .8);--color-font-3: rgba(0, 0, 0, .3);--color-font-pure: black;--color-input-bg: white;--color-input-border: #e2e2e2;--color-input-border-hover: #a3a6ad;--color-radio-border: #e2e2e2;--color-tooltip-bg: white;--color-tooltip-shadow: #bbbbbb;--color-scrollbar: #93ade3;--color-line: #e2e2e2;--color-loading-1: #00000033;--color-loading-2: #000;--color-floor: #f0f0f0;--color-floor-font: #bdbdbd;--color-editor-toolbar: #f6f7f8;--color-sp-btn-bg: #f1f1f1;--color-call-list-bg: white}html.dark[data-v-723e2e62]{--color-main-bg: #22303f;--color-second-bg: #18222d;--color-third-bg: #31475e;--color-item-bg: #18222d;--color-swtich-bg: #4c4d4f;--color-active: #409eff;--color-font: rgba(255, 255, 255, .5);--color-font-8: rgba(255, 255, 255, .8);--color-font-3: rgba(255, 255, 255, .3);--color-font-pure: white;--color-input-bg: #333333;--color-input-border: #6c6e72;--color-input-border-hover: #a3a6ad;--color-radio-border: #454847;--color-tooltip-bg: #31475e;--color-tooltip-shadow: #3b3b3b;--color-scrollbar: #5c5d5e;--color-line: var(--box-border-color);--color-loading-1: rgba(178, 177, 177, .2);--color-loading-2: #ffffff;--color-floor: #293b4d;--color-floor-font: rgba(255, 255, 255, .3);--color-editor-toolbar: var(--box-background-hover-color);--color-sp-btn-bg: #31475e;--color-call-list-bg: #31475e}html[data-v-723e2e62],body[data-v-723e2e62]{font-size:62.5%}.flex[data-v-723e2e62]{display:flex;align-items:center;justify-content:space-between}.flex-end[data-v-723e2e62]{justify-content:flex-end}.flex-center[data-v-723e2e62]{justify-content:center}.p1[data-v-723e2e62]{padding:1rem}.p2[data-v-723e2e62]{padding:2rem}.p0[data-v-723e2e62]{padding:0!important}body :is(.topic_content,.reply_content) a[href^=http][data-v-723e2e62]{text-underline-offset:.46ex;color:currentcolor;text-decoration:underline 1.5px}a[data-v-723e2e62]{text-decoration:none}.tool[data-v-723e2e62]{position:relative;display:flex;align-items:center;border-radius:.3rem;height:2.6rem;padding:0 .5rem;gap:.6rem}.tool>svg[data-v-723e2e62]{width:1.6rem!important;height:1.6rem!important}.tool.disabled[data-v-723e2e62]{cursor:not-allowed}.tool span[data-v-723e2e62]{font-weight:700;line-height:1rem}.my-node[data-v-723e2e62]{border-radius:.2rem;padding:.4rem;font-size:1rem;color:#999;background:#f5f5f5}.msgs[data-v-723e2e62]{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.my-box[data-v-723e2e62]{background:var(--box-background-color);margin-bottom:.5rem;width:100%;overflow:hidden;box-sizing:border-box;transition:background-color .3s}.my-box .box-content[data-v-723e2e62]{padding:.5rem}.my-cell[data-v-723e2e62]{color:var(--color-font);height:4.2rem;padding:0 1rem;font-size:1.4rem;line-height:150%;text-align:left;border-bottom:1px solid var(--color-line)}.modal[data-v-723e2e62]{position:fixed;z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center}.modal .title[data-v-723e2e62]{font-size:2.4rem;margin-bottom:1rem;text-align:center}.modal .option[data-v-723e2e62]{display:flex;align-items:center;padding:.6rem 0}.modal .option>span[data-v-723e2e62]{position:relative}.modal .mask[data-v-723e2e62]{position:fixed;width:100vw;height:100vh;left:0;top:0;background-color:#1d1c1c47}.radio-group2[data-v-723e2e62]{display:inline-flex;border-radius:.5rem;overflow:hidden;border:1px solid var(--color-radio-border);background:var(--box-background-alt-color)}.radio-group2 .radio[data-v-723e2e62]{background:transparent;padding:.5rem 1.2rem;border-left:1px solid var(--color-radio-border);font-size:1.3rem;color:var(--color-gray)}.radio-group2 .radio[data-v-723e2e62]:first-child{border-left:none}.radio-group2 .active[data-v-723e2e62]{background:var(--color-third-bg);color:var(--color-font)}.pop-confirm[data-v-723e2e62]{position:relative;display:inline-flex;justify-content:center}input[data-v-723e2e62]{height:3rem;outline:unset;border:1px solid var(--color-input-border);padding:0 .5rem;border-radius:5px;box-sizing:border-box;transition:all .3s;background:var(--color-input-bg);color:var(--color-font)}input[data-v-723e2e62]:focus{border:1px solid var(--color-active)}.danger[data-v-723e2e62]{color:red!important}.topic_content[data-v-723e2e62],.reply_content[data-v-723e2e62]{font-size:1.6rem}.Post[data-v-723e2e62]{position:unset!important;background:transparent!important;overflow:unset!important}.Post .main[data-v-723e2e62]{background:transparent!important;padding:unset!important;width:100%!important}.Post .close-btn[data-v-723e2e62]{display:none}.mobile .main[data-v-723e2e62]{padding:unset!important;width:100%!important}.post-detail[data-v-723e2e62]{text-align:start;position:fixed;z-index:99;left:0;right:0;bottom:0;top:0;background:rgba(46,47,48,.8);overflow:auto;font-size:1.4rem;display:flex;justify-content:center;flex-wrap:wrap}.post-detail[data-v-723e2e62] .subtle{background-color:#ecfdf5e6;border-left:4px solid #a7f3d0}.post-detail.isNight[data-v-723e2e62] .subtle{background-color:#1a3332;border-left:4px solid #047857}.post-detail .main[data-v-723e2e62]{display:flex;justify-content:flex-end;padding:3rem 8rem 15rem;background:var(--color-main-bg);position:relative;outline:none}.post-detail .main .nav-bar[data-v-723e2e62]{position:fixed;top:0;z-index:9999;height:4.6rem;display:flex;justify-content:space-between;align-items:center;padding:1rem;margin-bottom:-1px}.post-detail .main .nav-bar svg[data-v-723e2e62]{width:2rem;height:2rem;color:var(--color-font)}.post-detail .main .nav-bar .left[data-v-723e2e62],.post-detail .main .nav-bar .right[data-v-723e2e62]{display:flex;align-items:center;gap:1rem}.post-detail .main .main-wrapper[data-v-723e2e62]{width:77rem;padding-top:4.6rem;padding-bottom:2rem;display:flex;flex-direction:column;align-items:center;position:relative}.post-detail .main .main-wrapper .post-wrapper .box-content[data-v-723e2e62],.post-detail .main .main-wrapper .post-wrapper .header[data-v-723e2e62]{padding-top:0}.post-detail .main .main-wrapper .post-wrapper .header h1[data-v-723e2e62]{margin:0;margin-bottom:1rem}.post-detail .main .main-wrapper .post-wrapper .header small[data-v-723e2e62]{display:flex;align-items:center}.post-detail .main .main-wrapper .loading-wrapper[data-v-723e2e62]{height:20rem;display:flex;justify-content:center;align-items:center}.post-detail .main .main-wrapper .display-type[data-v-723e2e62]{height:3rem;padding:0 .3rem;background:#f1f1f1;border-radius:1rem;display:flex;font-size:1.4rem;align-items:center}.post-detail .main .main-wrapper .display-type .type[data-v-723e2e62]{border-radius:.8rem;padding:0 1.3rem;height:2.5rem;align-items:center;display:flex;position:relative}.post-detail .main .main-wrapper .display-type .type.active[data-v-723e2e62]{background:white;color:#000;box-shadow:0 0 6px 0 var(--color-tooltip-shadow)}.post-detail .main .main-wrapper .display-type .type-list[data-v-723e2e62]{position:absolute;background:white;right:0rem;top:3rem;font-size:1.4rem;box-shadow:0 0 6px 0 var(--color-tooltip-shadow);border-radius:.6rem;z-index:9;color:var(--color-font)}.post-detail .main .main-wrapper .display-type .type-list .item[data-v-723e2e62]{word-break:keep-all;padding:.8rem 1rem}.post-detail .main .main-wrapper .display-type .type-list .item.active[data-v-723e2e62]{color:var(--color-font-pure)}.post-detail .main .main-wrapper .display-type svg[data-v-723e2e62]{width:1.5rem}.post-detail .main .main-wrapper #no-comments-yet[data-v-723e2e62]{color:#a9a9a9;font-weight:700;text-align:center;width:100%;margin-bottom:2rem;box-sizing:border-box}.post-detail .main .relationReply[data-v-723e2e62]{position:fixed;width:25vw;top:6.5rem;bottom:15rem;z-index:100;transform:translate(calc(100% + 2rem));font-size:2rem;overflow:hidden}.post-detail .main .relationReply .my-cell[data-v-723e2e62]{background:var(--color-second-bg);border-radius:var(--box-border-radius) var(--box-border-radius) 0 0}.post-detail .main .relationReply .comments[data-v-723e2e62]{max-height:calc(100% - 4.2rem);overflow:auto;background:var(--color-second-bg);border-radius:0 0 var(--box-border-radius) var(--box-border-radius)}.post-detail .main .call-list[data-v-723e2e62]{z-index:9;position:absolute;top:12rem;border:1px solid var(--color-main-bg);background:var(--color-call-list-bg);box-shadow:0 5px 15px #0000001a;overflow:auto;max-height:30rem;border-radius:var(--box-border-radius);min-width:8rem;box-sizing:content-box}.post-detail .main .call-list .call-item[data-v-723e2e62]{border-top:1px solid var(--color-main-bg);height:3rem;display:flex;padding:0 1rem;align-items:center;font-size:14px;box-sizing:border-box}.post-detail .main .call-list .call-item .select[data-v-723e2e62],.post-detail .main .call-list .call-item.select[data-v-723e2e62]{background:var(--color-main-bg);text-decoration:none}.post-detail .main .call-list .call-item[data-v-723e2e62]:nth-child(1){border-top:1px solid transparent}@media screen and (max-width: 1500px){.post-detail .main-wrapper[data-v-723e2e62]{width:65vw!important}}@media screen and (max-width: 1280px){.post-detail .main-wrapper[data-v-723e2e62]{width:75vw!important}}@media screen and (max-width: 960px){.post-detail .main-wrapper[data-v-723e2e62]{width:100vw!important}}.post-detail .scroll-top[data-v-723e2e62]{position:fixed;border-radius:.6rem;display:flex;align-items:center;justify-content:center;bottom:10rem;z-index:99;padding:.8rem 0;gap:1rem;width:4.5rem;font-size:2rem;background:var(--color-sp-btn-bg)}.post-detail .refresh[data-v-723e2e62]{position:fixed;border-radius:.6rem;display:flex;align-items:center;justify-content:center;bottom:10rem;z-index:99;padding:.8rem 0;gap:1rem;width:4.5rem;font-size:2rem;background:var(--color-sp-btn-bg);bottom:23.5rem}.post-detail .scroll-to[data-v-723e2e62]{position:fixed;border-radius:.6rem;align-items:center;justify-content:center;bottom:10rem;z-index:99;padding:.8rem 0;gap:1rem;width:4.5rem;font-size:2rem;background:var(--color-sp-btn-bg);bottom:15rem;display:flex;flex-direction:column}.post-detail .scroll-to input[data-v-723e2e62]{height:2.6rem;width:3.6rem;font-size:1.4rem;text-align:center;color:gray}.post-detail .read-notice[data-v-723e2e62]{display:flex;align-items:center;color:gray}.post-detail .read-notice .jump[data-v-723e2e62]{background:var(--color-third-bg);color:gray;padding:.3rem 1rem;border-radius:.4rem;margin:0 1rem}.post-detail .top-reply[data-v-723e2e62]{color:var(--color-font-3);font-size:2rem;margin-right:1rem}.base64_tooltip[data-v-676e51be]{box-shadow:0 3px 6px -4px #0000001f,0 6px 16px #00000014,0 9px 28px 8px #0000000d;background:var(--color-third-bg);min-height:2.2rem;max-width:20rem;padding:1rem;position:fixed;z-index:9998;display:flex;align-items:center;border-radius:.5rem;line-break:anywhere;font-size:1.4rem;color:var(--color-font-8)}.base64_tooltip svg[data-v-676e51be]{margin-left:1rem;min-width:1.8rem}.base64_tooltip[data-v-676e51be] .base-button{margin-left:1rem;margin-top:1rem}.msg[data-v-31e55c59]{cursor:default;margin-bottom:2rem;display:flex;font-size:1.4rem;box-sizing:border-box;border-radius:var(--box-border-radius);color:var(--color-font-8);background:var(--color-tooltip-bg);box-shadow:0 0 6px 1px var(--color-tooltip-shadow)}.msg.success .left[data-v-31e55c59]{background:var(--color-active)}.msg.warning .left[data-v-31e55c59]{background:#c8c002}.msg.error .left[data-v-31e55c59]{background:red}.msg .left[data-v-31e55c59]{border-radius:var(--box-border-radius) 0 0 var(--box-border-radius);display:flex;align-items:center;background:var(--color-active)}.msg .left svg[data-v-31e55c59]{margin:0 .3rem}.msg .right[data-v-31e55c59]{flex:1;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.tag-modal .wrapper[data-v-674b86aa]{z-index:9;background:var(--color-main-bg);color:var(--color-font-8);border-radius:1.6rem;font-size:1.4rem;padding:2rem 4rem;width:25rem}.tag-modal .wrapper .title[data-v-674b86aa]{font-weight:700}.tag-modal .wrapper .btns[data-v-674b86aa]{margin-top:1.5rem;display:flex;justify-content:flex-end;align-items:center;gap:1.5rem;font-size:1.4rem}.msgs[data-v-5af31c45]{position:fixed;margin-left:calc(50% - 40vw);width:80vw;z-index:9999;bottom:0;left:0;right:0}.tag-modal .modal-root[data-v-19a5903e]{z-index:9;background:var(--color-second-bg);color:var(--color-font-8);border-radius:1.6rem;font-size:1.4rem;width:50vw;height:70vh;display:flex;flex-direction:column}.tag-modal .modal-root .modal-header[data-v-19a5903e]{padding:2.4rem;display:flex;justify-content:space-between}.tag-modal .modal-root .modal-header .title[data-v-19a5903e]{font-size:2.6rem;font-weight:700;text-align:left;margin-bottom:0}.tag-modal .modal-root .modal-header i[data-v-19a5903e]{font-size:2.2rem}.tag-modal .modal-root .modal-body[data-v-19a5903e]{padding:2rem;padding-top:0;flex:1;overflow:auto}.tag-modal .modal-root .modal-body[data-v-19a5903e] .cell{padding:2rem}.target-user-tags[data-v-11e6ce00]{background:var(--color-second-bg);color:var(--color-font);word-break:break-all;text-align:start;font-size:1.4rem;box-shadow:0 2px 3px #0000001a;border-bottom-left-radius:3px;border-bottom-right-radius:3px}.target-user-tags .add-tag[data-v-11e6ce00]{display:inline-block}.loaded[data-v-11e6ce00]{font-size:1.4rem;display:flex;align-items:center;gap:1rem} ');

(function (vue) {
  'use strict';

  var PageType = /* @__PURE__ */ ((PageType2) => {
    PageType2["Home"] = "Home";
    PageType2["Node"] = "Node";
    PageType2["Post"] = "Post";
    PageType2["Member"] = "Member";
    return PageType2;
  })(PageType || {});
  var CommentDisplayType$1 = /* @__PURE__ */ ((CommentDisplayType2) => {
    CommentDisplayType2[CommentDisplayType2["FloorInFloor"] = 0] = "FloorInFloor";
    CommentDisplayType2[CommentDisplayType2["FloorInFloorNoCallUser"] = 4] = "FloorInFloorNoCallUser";
    CommentDisplayType2[CommentDisplayType2["FloorInFloorNested"] = 5] = "FloorInFloorNested";
    CommentDisplayType2[CommentDisplayType2["Like"] = 1] = "Like";
    CommentDisplayType2[CommentDisplayType2["V2exOrigin"] = 2] = "V2exOrigin";
    CommentDisplayType2[CommentDisplayType2["OnlyOp"] = 3] = "OnlyOp";
    CommentDisplayType2[CommentDisplayType2["New"] = 6] = "New";
    return CommentDisplayType2;
  })(CommentDisplayType$1 || {});
  const MAX_REPLY_LIMIT$1 = 300;
  const _sfc_main$k = {
    name: "Tooltip",
    props: {
      title: {
        type: String,
        default() {
          return "";
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        show: false
      };
    },
    methods: {
      showPop(e2) {
        if (this.disabled)
          return;
        if (!this.title)
          return;
        e2.stopPropagation();
        let rect = e2.target.getBoundingClientRect();
        this.show = true;
        vue.nextTick(() => {
          var _a, _b;
          let tip = (_b = (_a = this.$refs) == null ? void 0 : _a.tip) == null ? void 0 : _b.getBoundingClientRect();
          if (!tip)
            return;
          if (rect.top < 50) {
            this.$refs.tip.style.top = rect.top + rect.height + 10 + "px";
          } else {
            this.$refs.tip.style.top = rect.top - tip.height - 10 + "px";
          }
          let tipWidth = tip.width;
          let rectWidth = rect.width;
          this.$refs.tip.style.left = rect.left - (tipWidth - rectWidth) / 2 + "px";
        });
      }
    },
    render() {
      let Vnode = this.$slots.default()[0];
      return vue.createVNode(vue.Fragment, null, [this.show && this.title && vue.createVNode(vue.Teleport, {
        "to": "body"
      }, {
        default: () => [vue.createVNode(vue.Transition, {
          "name": "fade"
        }, {
          default: () => [vue.createVNode("div", {
            "ref": "tip",
            "className": "tip"
          }, [this.title])]
        })]
      }), vue.createVNode(Vnode, {
        "onClick": () => this.show = false,
        "onmouseenter": (e2) => this.showPop(e2),
        "onmouseleave": () => this.show = false
      }, null)]);
    }
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-ee672411"]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "BaseSwitch",
    props: {
      modelValue: { type: Boolean }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["switch", { active: _ctx.modelValue }]),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", !_ctx.modelValue))
        }, null, 2);
      };
    }
  });
  const BaseSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-e7c0fbef"]]);
  const _sfc_main$i = {
    name: "Setting",
    components: {
      BaseSwitch,
      Tooltip
    },
    inject: ["isNight"],
    props: {
      modelValue: {
        type: Object,
        default() {
          return {};
        }
      },
      show: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        tabIndex: 0,
        config: window.clone(this.modelValue)
      };
    },
    computed: {
      windowConst() {
        return window.const;
      },
      CommentDisplayType() {
        return CommentDisplayType$1;
      },
      isNew() {
        return this.config.version < window.currentVersion;
      }
    },
    watch: {
      config: {
        handler(n2) {
          n2.topReplyLoveMinCount = Math.trunc(n2.topReplyLoveMinCount);
          if (n2.topReplyLoveMinCount < 0) {
            n2.topReplyLoveMinCount = 1;
          }
          this.$emit("update:modelValue", n2);
        },
        deep: true
      }
    },
    methods: {
      close() {
        this.config.version = window.currentVersion;
        this.$emit("update:show", false);
      }
    }
  };
  const _withScopeId$c = (n2) => (vue.pushScopeId("data-v-70f55b93"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$h = {
    key: 0,
    class: "setting-modal modal"
  };
  const _hoisted_2$g = { class: "modal-root" };
  const _hoisted_3$d = { class: "modal-header" };
  const _hoisted_4$b = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, " 脚本设置 ", -1));
  const _hoisted_5$9 = { class: "body" };
  const _hoisted_6$8 = { class: "left" };
  const _hoisted_7$7 = { class: "tabs" };
  const _hoisted_8$7 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("span", null, "列表设置", -1));
  const _hoisted_9$7 = [
    _hoisted_8$7
  ];
  const _hoisted_10$6 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("span", null, "帖子设置", -1));
  const _hoisted_11$6 = [
    _hoisted_10$6
  ];
  const _hoisted_12$5 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("span", null, "其他设置", -1));
  const _hoisted_13$5 = [
    _hoisted_12$5
  ];
  const _hoisted_14$5 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("span", null, "关于脚本", -1));
  const _hoisted_15$5 = [
    _hoisted_14$5
  ];
  const _hoisted_16$6 = { class: "modal-content" };
  const _hoisted_17$6 = { class: "scroll" };
  const _hoisted_18$6 = { key: 0 };
  const _hoisted_19$5 = { class: "row" };
  const _hoisted_20$5 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "列表展示方式", -1));
  const _hoisted_21$4 = { class: "wrapper" };
  const _hoisted_22$3 = { class: "radio-group2" };
  const _hoisted_23$3 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc danger" }, " 提示：此项需要刷新页面才能生效 ", -1));
  const _hoisted_24$3 = { class: "row" };
  const _hoisted_25$3 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "列表hover时显示预览按钮", -1));
  const _hoisted_26$3 = { class: "wrapper" };
  const _hoisted_27$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc danger" }, " 提示：此项需要刷新页面才能生效 ", -1));
  const _hoisted_28$2 = { class: "row" };
  const _hoisted_29$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "帖子弹框显示", -1));
  const _hoisted_30$1 = { class: "wrapper" };
  const _hoisted_31$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " 开启此选项后，帖子始终会以弹框的方式显示。优先级大于“新标签页打开链接” ", -1));
  const _hoisted_32$1 = { class: "row" };
  const _hoisted_33$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "新标签页打开链接", -1));
  const _hoisted_34$1 = { class: "wrapper" };
  const _hoisted_35$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " 网页上所有链接通过新标签页打开 ", -1));
  const _hoisted_36$1 = { key: 1 };
  const _hoisted_37$1 = { class: "row" };
  const _hoisted_38$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "显示回复展示方式", -1));
  const _hoisted_39$1 = { class: "wrapper" };
  const _hoisted_40$1 = { class: "row" };
  const _hoisted_41$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "回复展示方式", -1));
  const _hoisted_42$1 = { class: "wrapper" };
  const _hoisted_43$1 = { class: "radio-group2" };
  const _hoisted_44$1 = { class: "row" };
  const _hoisted_45$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "单独打开帖子时默认显示楼中楼", -1));
  const _hoisted_46$1 = { class: "wrapper" };
  const _hoisted_47$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " 单独打开这种地址 https://v2ex.com/t/xxxx 时，是否默认显示楼中楼 ", -1));
  const _hoisted_48$1 = { class: "row" };
  const _hoisted_49$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "点击左右两侧透明处关闭帖子详情弹框", -1));
  const _hoisted_50$1 = { class: "wrapper" };
  const _hoisted_51$1 = { class: "row" };
  const _hoisted_52$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "正文超长自动折叠", -1));
  const _hoisted_53$1 = { class: "wrapper" };
  const _hoisted_54$1 = { class: "row" };
  const _hoisted_55$1 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "帖子宽度", -1));
  const _hoisted_56 = { class: "wrapper" };
  const _hoisted_57 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, [
    /* @__PURE__ */ vue.createTextVNode(" 未设定此值时，则默认宽度为77rem。接受合法的width值： "),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://vue3js.cn/interview/css/em_px_rem_vh_vw.html#%E4%BA%8C%E3%80%81%E5%8D%95%E4%BD%8D",
      target: "_blank"
    }, "rem、px、vw、vh(点此查看)"),
    /* @__PURE__ */ vue.createTextVNode("。 vw代表屏幕百分比，如想要屏幕的66%，请填写66vw ")
  ], -1));
  const _hoisted_58 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " 提示：此项设置以后，单独打开详情页时会出现帖子突然变宽（窄）的问题，暂时无解 ", -1));
  const _hoisted_59 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc danger" }, " 提示：此项需要刷新页面才能生效 ", -1));
  const _hoisted_60 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "row" }, [
    /* @__PURE__ */ vue.createElementVNode("label", { class: "main-title" }, "高赞回复")
  ], -1));
  const _hoisted_61 = { class: "row" };
  const _hoisted_62 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "显示高赞回复", -1));
  const _hoisted_63 = { class: "wrapper" };
  const _hoisted_64 = { class: "row" };
  const _hoisted_65 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "最多显示多少个高赞回复", -1));
  const _hoisted_66 = { class: "wrapper" };
  const _hoisted_67 = { class: "row" };
  const _hoisted_68 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "最少需要多少赞才能被判定为高赞", -1));
  const _hoisted_69 = { class: "wrapper" };
  const _hoisted_70 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "row" }, [
    /* @__PURE__ */ vue.createElementVNode("label", { class: "main-title" }, "记忆阅读")
  ], -1));
  const _hoisted_71 = { class: "row" };
  const _hoisted_72 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "记录上次阅读楼层（误差1层左右）：", -1));
  const _hoisted_73 = { class: "wrapper" };
  const _hoisted_74 = { class: "row" };
  const _hoisted_75 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "打开帖子自动跳转到上次阅读楼层", -1));
  const _hoisted_76 = { class: "wrapper" };
  const _hoisted_77 = { key: 2 };
  const _hoisted_78 = { class: "row" };
  const _hoisted_79 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "用户打标签(跨平台，数据保存在自己的记事本)：", -1));
  const _hoisted_80 = { class: "wrapper" };
  const _hoisted_81 = { class: "row" };
  const _hoisted_82 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "划词显示Base64解码框", -1));
  const _hoisted_83 = { class: "wrapper" };
  const _hoisted_84 = { class: "row" };
  const _hoisted_85 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "自动签到", -1));
  const _hoisted_86 = { class: "wrapper" };
  const _hoisted_87 = { class: "row" };
  const _hoisted_88 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "自定义背景", -1));
  const _hoisted_89 = { class: "wrapper" };
  const _hoisted_90 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, [
    /* @__PURE__ */ vue.createTextVNode(" 未设定此值时，则背景颜色默认为 #e2e2e2。接受一个合法的css color值：例如"),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value",
      target: "_blank"
    }, "red、#ffffff、rgb(222,222,22)(点此查看)"),
    /* @__PURE__ */ vue.createTextVNode("等等。 ")
  ], -1));
  const _hoisted_91 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc danger" }, " 提示：此项需要刷新页面才能生效 ", -1));
  const _hoisted_92 = { class: "row" };
  const _hoisted_93 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "收藏时提醒添加到书签", -1));
  const _hoisted_94 = { class: "wrapper" };
  const _hoisted_95 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " V站帐号一旦被封禁，则无法登录，无法查看账号收藏了 ", -1));
  const _hoisted_96 = { key: 3 };
  const _hoisted_97 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("h1", null, "V2EX Next", -1));
  const _hoisted_98 = { class: "project-desc" };
  const _hoisted_99 = ["href"];
  const _hoisted_100 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("b", null, "请帮我点一个Star，您的Star是对我最大的鼓励", -1));
  const _hoisted_101 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "为什么选择这个，而不是其他？", -1));
  const _hoisted_102 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("h3", null, "其他脚本：", -1));
  const _hoisted_103 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("h3", null, "本脚本：", -1));
  const _hoisted_104 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("b", null, "最好用的楼中楼、查看回复上下文、高赞回复、简洁模式等特色功能。", -1));
  const _hoisted_105 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "特色功能", -1));
  const _hoisted_106 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("ul", null, [
    /* @__PURE__ */ vue.createElementVNode("li", null, [
      /* @__PURE__ */ vue.createTextVNode("楼中楼 "),
      /* @__PURE__ */ vue.createElementVNode("ol", null, [
        /* @__PURE__ */ vue.createElementVNode("li", null, "可按高赞排序显示"),
        /* @__PURE__ */ vue.createElementVNode("li", null, "可只看楼主")
      ])
    ]),
    /* @__PURE__ */ vue.createElementVNode("li", null, "简洁模式"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "查看回复上下文"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "高赞回复")
  ], -1));
  const _hoisted_107 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "增强（辅助）功能", -1));
  const _hoisted_108 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("ul", null, [
    /* @__PURE__ */ vue.createElementVNode("li", null, "预览帖子正文"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "弹框显示帖子正文和回复"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "帖子显示OP注册时间"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "链接自动转图片"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "快捷发送贴吧表情、emoji、图片"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "新标签页打开链接，默认打开，可单独关闭"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "对用户打标签"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "划词 base64 解码，支持解码中文"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "一键@所有人，@管理员：回复时，可一键@所有人和@管理员"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "自适应屏幕宽度，支持黑暗模式"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "记忆上次阅读位置"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "按钮异步请求：操作按钮（感谢、收藏、回复、隐藏）异步请求，不会刷新页面"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "收藏时提醒添加到浏览器书签，防止账号被封无法查看收藏"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "自动签到"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "正文超长自动折叠")
  ], -1));
  const _hoisted_109 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "如何帮助我", -1));
  const _hoisted_110 = ["href"];
  const _hoisted_111 = ["href"];
  const _hoisted_112 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ vue.createElementVNode("div", null, [
    /* @__PURE__ */ vue.createTextVNode(" 更新日志："),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://greasyfork.org/zh-CN/scripts/458024/versions",
      target: "_blank"
    }, "https://greasyfork.org/zh-CN/scripts/458024/versions")
  ], -1));
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_BaseSwitch = vue.resolveComponent("BaseSwitch");
    const _component_Tooltip = vue.resolveComponent("Tooltip");
    return vue.openBlock(), vue.createBlock(vue.Transition, null, {
      default: vue.withCtx(() => [
        $props.show ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$h, [
          vue.createElementVNode("div", {
            class: "mask",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.close && $options.close(...args))
          }),
          vue.createElementVNode("div", _hoisted_2$g, [
            vue.createElementVNode("div", _hoisted_3$d, [
              _hoisted_4$b,
              vue.createElementVNode("i", {
                class: "fa fa-times",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.close && $options.close(...args))
              })
            ]),
            vue.createElementVNode("div", _hoisted_5$9, [
              vue.createElementVNode("div", _hoisted_6$8, [
                vue.createElementVNode("div", _hoisted_7$7, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["tab", $data.tabIndex === 0 && "active"]),
                    onClick: _cache[2] || (_cache[2] = ($event) => $data.tabIndex = 0)
                  }, _hoisted_9$7, 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["tab", $data.tabIndex === 1 && "active"]),
                    onClick: _cache[3] || (_cache[3] = ($event) => $data.tabIndex = 1)
                  }, _hoisted_11$6, 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["tab", $data.tabIndex === 2 && "active"]),
                    onClick: _cache[4] || (_cache[4] = ($event) => $data.tabIndex = 2)
                  }, _hoisted_13$5, 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["tab", $data.tabIndex === 3 && "active"]),
                    onClick: _cache[5] || (_cache[5] = ($event) => $data.tabIndex = 3)
                  }, _hoisted_15$5, 2)
                ])
              ]),
              vue.createElementVNode("div", _hoisted_16$6, [
                vue.createElementVNode("div", _hoisted_17$6, [
                  $data.tabIndex === 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_18$6, [
                    vue.createElementVNode("div", _hoisted_19$5, [
                      _hoisted_20$5,
                      vue.createElementVNode("div", _hoisted_21$4, [
                        vue.createElementVNode("div", _hoisted_22$3, [
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.viewType === "simple" ? "active" : ""]),
                            onClick: _cache[6] || (_cache[6] = ($event) => $data.config.viewType = "simple")
                          }, "简洁 ", 2),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.viewType === "table" ? "active" : ""]),
                            onClick: _cache[7] || (_cache[7] = ($event) => $data.config.viewType = "table")
                          }, "表格 ", 2),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.viewType === "card" ? "active" : ""]),
                            onClick: _cache[8] || (_cache[8] = ($event) => $data.config.viewType = "card")
                          }, "卡片 ", 2)
                        ])
                      ])
                    ]),
                    _hoisted_23$3,
                    vue.createElementVNode("div", _hoisted_24$3, [
                      _hoisted_25$3,
                      vue.createElementVNode("div", _hoisted_26$3, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.showPreviewBtn,
                          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.config.showPreviewBtn = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_27$1,
                    vue.createElementVNode("div", _hoisted_28$2, [
                      _hoisted_29$1,
                      vue.createElementVNode("div", _hoisted_30$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.clickPostItemOpenDetail,
                          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.config.clickPostItemOpenDetail = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_31$1,
                    vue.createElementVNode("div", _hoisted_32$1, [
                      _hoisted_33$1,
                      vue.createElementVNode("div", _hoisted_34$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.newTabOpen,
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.config.newTabOpen = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_35$1
                  ])) : vue.createCommentVNode("", true),
                  $data.tabIndex === 1 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_36$1, [
                    vue.createElementVNode("div", _hoisted_37$1, [
                      _hoisted_38$1,
                      vue.createElementVNode("div", _hoisted_39$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.showToolbar,
                          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.config.showToolbar = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_40$1, [
                      _hoisted_41$1,
                      vue.createElementVNode("div", _hoisted_42$1, [
                        vue.createElementVNode("div", _hoisted_43$1, [
                          vue.createVNode(_component_Tooltip, { title: "不隐藏@用户" }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("div", {
                                class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.FloorInFloor ? "active" : ""]),
                                onClick: _cache[13] || (_cache[13] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.FloorInFloor)
                              }, "楼中楼(@) ", 2)
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_Tooltip, { title: "隐藏第一个@用户，双击内容可显示原文" }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("div", {
                                class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.FloorInFloorNoCallUser ? "active" : ""]),
                                onClick: _cache[14] || (_cache[14] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.FloorInFloorNoCallUser)
                              }, " 楼中楼 ", 2)
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_Tooltip, { title: "重复显示楼中楼的回复" }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("div", {
                                class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.FloorInFloorNested ? "active" : ""]),
                                onClick: _cache[15] || (_cache[15] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.FloorInFloorNested)
                              }, " 冗余楼中楼 ", 2)
                            ]),
                            _: 1
                          }),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.Like ? "active" : ""]),
                            onClick: _cache[16] || (_cache[16] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.Like)
                          }, "感谢 ", 2),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.OnlyOp ? "active" : ""]),
                            onClick: _cache[17] || (_cache[17] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.OnlyOp)
                          }, "只看楼主 ", 2),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.V2exOrigin ? "active" : ""]),
                            onClick: _cache[18] || (_cache[18] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.V2exOrigin)
                          }, "V2原版 ", 2)
                        ])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_44$1, [
                      _hoisted_45$1,
                      vue.createElementVNode("div", _hoisted_46$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.autoOpenDetail,
                          "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $data.config.autoOpenDetail = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_47$1,
                    vue.createElementVNode("div", _hoisted_48$1, [
                      _hoisted_49$1,
                      vue.createElementVNode("div", _hoisted_50$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.closePostDetailBySpace,
                          "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $data.config.closePostDetailBySpace = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_51$1, [
                      _hoisted_52$1,
                      vue.createElementVNode("div", _hoisted_53$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.contentAutoCollapse,
                          "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $data.config.contentAutoCollapse = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_54$1, [
                      _hoisted_55$1,
                      vue.createElementVNode("div", _hoisted_56, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $data.config.postWidth = $event)
                        }, null, 512), [
                          [vue.vModelText, $data.config.postWidth]
                        ])
                      ])
                    ]),
                    _hoisted_57,
                    _hoisted_58,
                    _hoisted_59,
                    _hoisted_60,
                    vue.createElementVNode("div", _hoisted_61, [
                      _hoisted_62,
                      vue.createElementVNode("div", _hoisted_63, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.showTopReply,
                          "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $data.config.showTopReply = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_64, [
                      _hoisted_65,
                      vue.createElementVNode("div", _hoisted_66, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "number",
                          min: "1",
                          "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => $data.config.topReplyCount = $event)
                        }, null, 512), [
                          [vue.vModelText, $data.config.topReplyCount]
                        ])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_67, [
                      _hoisted_68,
                      vue.createElementVNode("div", _hoisted_69, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "number",
                          min: "1",
                          "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => $data.config.topReplyLoveMinCount = $event)
                        }, null, 512), [
                          [vue.vModelText, $data.config.topReplyLoveMinCount]
                        ])
                      ])
                    ]),
                    _hoisted_70,
                    vue.createElementVNode("div", _hoisted_71, [
                      _hoisted_72,
                      vue.createElementVNode("div", _hoisted_73, [
                        vue.createVNode(_component_BaseSwitch, {
                          "model-value": $data.config.rememberLastReadFloor,
                          "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => {
                            $data.config.rememberLastReadFloor = !$data.config.rememberLastReadFloor;
                            $data.config.autoJumpLastReadFloor = false;
                          })
                        }, null, 8, ["model-value"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_74, [
                      _hoisted_75,
                      vue.createElementVNode("div", _hoisted_76, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.autoJumpLastReadFloor,
                          "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => $data.config.autoJumpLastReadFloor = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ])) : vue.createCommentVNode("", true),
                  $data.tabIndex === 2 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_77, [
                    vue.createElementVNode("div", _hoisted_78, [
                      _hoisted_79,
                      vue.createElementVNode("div", _hoisted_80, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.openTag,
                          "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => $data.config.openTag = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_81, [
                      _hoisted_82,
                      vue.createElementVNode("div", _hoisted_83, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.base64,
                          "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => $data.config.base64 = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_84, [
                      _hoisted_85,
                      vue.createElementVNode("div", _hoisted_86, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.autoSignin,
                          "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => $data.config.autoSignin = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_87, [
                      _hoisted_88,
                      vue.createElementVNode("div", _hoisted_89, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => $data.config.customBgColor = $event)
                        }, null, 512), [
                          [vue.vModelText, $data.config.customBgColor]
                        ])
                      ])
                    ]),
                    _hoisted_90,
                    _hoisted_91,
                    vue.createElementVNode("div", _hoisted_92, [
                      _hoisted_93,
                      vue.createElementVNode("div", _hoisted_94, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.collectBrowserNotice,
                          "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => $data.config.collectBrowserNotice = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_95
                  ])) : vue.createCommentVNode("", true),
                  $data.tabIndex === 3 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_96, [
                    _hoisted_97,
                    vue.createElementVNode("div", _hoisted_98, [
                      vue.createElementVNode("div", null, [
                        vue.createTextVNode(" 本项目完全开源，项目地址："),
                        vue.createElementVNode("a", {
                          href: $options.windowConst.git,
                          target: "_blank"
                        }, vue.toDisplayString($options.windowConst.git), 9, _hoisted_99),
                        vue.createTextVNode("，目前由我一个人维护，如果您觉得好用，"),
                        _hoisted_100
                      ]),
                      vue.createElementVNode("div", null, [
                        _hoisted_101,
                        _hoisted_102,
                        vue.createTextVNode(" 大多只是对V2EX修修补补、美化UI，在使用体验上依旧是10年前的网站，太多脚本年久失修无人维护。楼中楼只能解析当前页，如果有多页回复，楼中楼就会前言不搭后语莫名其妙的 "),
                        _hoisted_103,
                        _hoisted_104,
                        vue.createTextVNode(" 对V2EX进行了整体改造，如预览、点赞、回复、屏蔽等等都走异步请求，使用体验上已和现代网站无异，同时也集成了市面上常见的增强（辅助）功能， "),
                        _hoisted_105,
                        _hoisted_106,
                        _hoisted_107,
                        _hoisted_108,
                        _hoisted_109,
                        vue.createTextVNode(" 这个项目花了我很多精力，如果对您有用： 点个 "),
                        vue.createElementVNode("a", {
                          href: $options.windowConst.git
                        }, "Star ⭐️", 8, _hoisted_110),
                        vue.createTextVNode(" 或分享给他人，让更多的人知道我的存在。 "),
                        vue.createElementVNode("div", null, [
                          vue.createTextVNode("提供反馈，帮助我改进，以持续完善脚本。在 "),
                          vue.createElementVNode("a", {
                            href: $options.windowConst.issue
                          }, "这里", 8, _hoisted_111),
                          vue.createTextVNode(" 提出。")
                        ]),
                        _hoisted_112
                      ])
                    ])
                  ])) : vue.createCommentVNode("", true)
                ])
              ])
            ])
          ])
        ])) : vue.createCommentVNode("", true)
      ]),
      _: 1
    });
  }
  const Setting = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$9], ["__scopeId", "data-v-70f55b93"]]);
  const eventBus = {
    eventMap: /* @__PURE__ */ new Map(),
    on(eventType, cb) {
      let cbs = this.eventMap.get(eventType);
      if (cbs) {
        cbs.push(cb);
      } else {
        cbs = [cb];
      }
      this.eventMap.set(eventType, cbs);
    },
    emit(eventType, val) {
      let cbs = this.eventMap.get(eventType);
      if (cbs) {
        cbs.map((cb) => cb(val));
      }
    },
    off(eventType) {
      let cbs = this.eventMap.has(eventType);
      if (cbs) {
        this.eventMap.delete(eventType);
      }
    },
    clear() {
      this.eventMap = /* @__PURE__ */ new Map();
    }
  };
  const CMD = {
    SHOW_TOOLTIP: "SHOW_TOOLTIP",
    SHOW_MSG: "SHOW_MSG",
    SET_CALL: "SET_CALL",
    SHOW_CALL: "SHOW_CALL",
    REFRESH_ONCE: "REFRESH_ONCE",
    ADD_REPLY: "ADD_REPLY",
    IGNORE: "IGNORE",
    MERGE: "MERGE",
    REMOVE: "REMOVE",
    CHANGE_COMMENT_THANK: "CHANGE_COMMENT_THANK",
    CHANGE_POST_THANK: "CHANGE_POST_THANK",
    ADD_TAG: "ADD_TAG",
    REMOVE_TAG: "REMOVE_TAG",
    RELATION_REPLY: "RELATION_REPLY",
    JUMP: "JUMP",
    ADD_READ: "ADD_READ",
    REFRESH_POST: "REFRESH_POST"
  };
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "BaseLoading",
    props: {
      size: { default: "normal" }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["loading", [_ctx.size]])
        }, null, 2);
      };
    }
  });
  const BaseLoading = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-2697baa2"]]);
  const _hoisted_1$g = {
    key: 1,
    class: "key-notice"
  };
  const _hoisted_2$f = { class: "key" };
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "BaseButton",
    props: {
      keyboard: {},
      active: { type: Boolean },
      disabled: { type: Boolean },
      loading: { type: Boolean },
      size: { default: "normal" },
      type: { default: "primary" }
    },
    emits: ["click"],
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(Tooltip, {
          disabled: !_ctx.keyboard,
          title: `快捷键: ${_ctx.keyboard}`
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("div", vue.mergeProps({ class: "base-button" }, _ctx.$attrs, {
              onClick: _cache[0] || (_cache[0] = (e2) => !_ctx.disabled && !_ctx.loading && _ctx.$emit("click", e2)),
              class: [
                _ctx.active && "active",
                _ctx.size,
                _ctx.type,
                (_ctx.disabled || _ctx.loading) && "disabled",
                !_ctx.disabled && "hvr-grow"
              ]
            }), [
              vue.createElementVNode("span", {
                style: vue.normalizeStyle({ opacity: _ctx.loading ? 0 : 1 })
              }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ], 4),
              _ctx.loading ? (vue.openBlock(), vue.createBlock(BaseLoading, {
                key: 0,
                size: "small"
              })) : vue.createCommentVNode("", true),
              _ctx.keyboard ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$g, [
                vue.createElementVNode("span", _hoisted_2$f, vue.toDisplayString(_ctx.keyboard), 1)
              ])) : vue.createCommentVNode("", true)
            ], 16)
          ]),
          _: 3
        }, 8, ["disabled", "title"]);
      };
    }
  });
  const BaseButton = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-04f4c89d"]]);
  const _sfc_main$f = {
    name: "PopConfirm",
    components: { BaseButton },
    props: {
      title: {
        type: String,
        default() {
          return "";
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        show: false
      };
    },
    methods: {
      showPop(e2) {
        if (this.disabled)
          return;
        let rect = e2.target.getBoundingClientRect();
        this.show = true;
        vue.nextTick(() => {
          this.$refs.tip.style.top = rect.top + "px";
          this.$refs.tip.style.left = rect.left + rect.width / 2 - 50 + "px";
        });
      },
      confirm() {
        this.show = false;
        this.$emit("confirm");
      }
    }
  };
  const _hoisted_1$f = { class: "pop-confirm" };
  const _hoisted_2$e = {
    key: 0,
    ref: "tip",
    class: "pop-confirm-content"
  };
  const _hoisted_3$c = { class: "text" };
  const _hoisted_4$a = { class: "options" };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_BaseButton = vue.resolveComponent("BaseButton");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$f, [
      (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
        vue.createVNode(vue.Transition, null, {
          default: vue.withCtx(() => [
            $data.show ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$e, [
              vue.createElementVNode("div", _hoisted_3$c, vue.toDisplayString($props.title), 1),
              vue.createElementVNode("div", _hoisted_4$a, [
                vue.createVNode(_component_BaseButton, {
                  type: "link",
                  size: "small",
                  onClick: _cache[0] || (_cache[0] = ($event) => $data.show = false)
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("取消")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_BaseButton, {
                  size: "small",
                  onClick: $options.confirm
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("确认")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ], 512)) : vue.createCommentVNode("", true)
          ]),
          _: 1
        })
      ])),
      vue.createElementVNode("span", {
        onClick: _cache[1] || (_cache[1] = (...args) => $options.showPop && $options.showPop(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const PopConfirm = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$8], ["__scopeId", "data-v-05424197"]]);
  const loveColor = "rgb(224,42,42)";
  const _sfc_main$e = {
    name: "Point",
    components: { PopConfirm },
    inject: ["post", "isLogin"],
    props: {
      item: {
        type: Object,
        default() {
          return {};
        }
      },
      full: {
        type: Boolean,
        default() {
          return true;
        }
      },
      apiUrl: ""
    },
    computed: {
      disabled() {
        return this.item.username === window.user.username || this.item.isThanked || !this.isLogin;
      }
    },
    methods: {
      getColor() {
        if (this.item.isThanked)
          return loveColor;
        return this.full ? loveColor : "#929596";
      },
      getIsFull() {
        if (this.item.isThanked)
          return loveColor;
        return this.full ? loveColor : "none";
      },
      thankError() {
        if (!this.isLogin) {
          return eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "请先登录！" });
        }
        if (this.item.username === window.user.username) {
          return eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "不能感谢自己" });
        }
        if (this.item.isThanked) {
          return eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "已经感谢过了" });
        }
        this.thank();
      },
      async thank() {
        this.$emit("addThank");
        let url = `${window.baseUrl}/thank/${this.apiUrl}?once=${this.post.once}`;
        $.post(url).then((res) => {
          if (!res.success) {
            this.$emit("recallThank");
            eventBus.emit(CMD.SHOW_MSG, { type: "error", text: res.message });
          }
          eventBus.emit(CMD.REFRESH_ONCE, res.once);
        }, (err) => {
          this.$emit("recallThank");
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "感谢失败" });
          eventBus.emit(CMD.REFRESH_ONCE);
        });
      }
    }
  };
  const _hoisted_1$e = {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_2$d = ["fill", "stroke"];
  const _hoisted_3$b = {
    key: 0,
    class: "link-num"
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["tool", $options.disabled ? "disabled" : ""]),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.thankError && $options.thankError(...args))
    }, [
      (vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$e, [
        vue.createElementVNode("path", {
          d: "M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z",
          fill: $options.getIsFull(),
          stroke: $options.getColor(),
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, null, 8, _hoisted_2$d)
      ])),
      $props.item.thankCount ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$b, vue.toDisplayString($props.item.thankCount), 1)) : vue.createCommentVNode("", true)
    ], 2);
  }
  const Point = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$7]]);
  const _sfc_main$d = {};
  const _withScopeId$b = (n2) => (vue.pushScopeId("data-v-fec104f6"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$d = { class: "more" };
  const _hoisted_2$c = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", null, null, -1));
  const _hoisted_3$a = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", null, null, -1));
  const _hoisted_4$9 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", null, null, -1));
  const _hoisted_5$8 = [
    _hoisted_2$c,
    _hoisted_3$a,
    _hoisted_4$9
  ];
  function _sfc_render$6(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$d, _hoisted_5$8);
  }
  const MoreIcon = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$6], ["__scopeId", "data-v-fec104f6"]]);
  const _sfc_main$c = {
    name: "Author",
    components: { MoreIcon, PopConfirm, Point },
    inject: ["isLogin", "tags", "config", "isNight"],
    props: {
      modelValue: false,
      comment: {
        type: Object,
        default() {
          return {};
        }
      },
      type: {
        type: String,
        default() {
          return "list";
        }
      }
    },
    computed: {
      isDev() {
        return false;
      },
      pointInfo() {
        return {
          isThanked: this.comment.isThanked,
          thankCount: this.comment.thankCount,
          username: this.comment.username
        };
      },
      myTags() {
        return this.tags[this.comment.username] ?? [];
      },
      context() {
        return this.comment.replyUsers.length;
      }
    },
    methods: {
      jump() {
        eventBus.emit(CMD.JUMP, this.comment.floor);
      },
      showRelationReply() {
        if (!this.comment.replyUsers.length) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "该回复无上下文" });
          return;
        }
        eventBus.emit(CMD.RELATION_REPLY, {
          left: this.comment.replyUsers,
          right: this.comment.username,
          rightFloor: this.comment.floor
        });
      },
      addTag() {
        eventBus.emit(CMD.ADD_TAG, this.comment.username);
      },
      removeTag(tag) {
        eventBus.emit(CMD.REMOVE_TAG, { username: this.comment.username, tag });
      },
      checkIsLogin(emitName = "") {
        if (!this.isLogin) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "请先登录！" });
          return false;
        }
        this.$emit(emitName);
        return true;
      },
      addThank() {
        eventBus.emit(CMD.CHANGE_COMMENT_THANK, { id: this.comment.id, type: "add" });
      },
      recallThank() {
        eventBus.emit(CMD.CHANGE_COMMENT_THANK, { id: this.comment.id, type: "recall" });
      }
    }
  };
  const _withScopeId$a = (n2) => (vue.pushScopeId("data-v-5a16636d"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$c = { class: "Author-left" };
  const _hoisted_2$b = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M22 42H6V26",
    stroke: "#177EC9",
    "stroke-width": "4",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_3$9 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M26 6H42V22",
    stroke: "#177EC9",
    "stroke-width": "4",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_4$8 = [
    _hoisted_2$b,
    _hoisted_3$9
  ];
  const _hoisted_5$7 = ["href"];
  const _hoisted_6$7 = ["src"];
  const _hoisted_7$6 = { class: "info" };
  const _hoisted_8$6 = { class: "top" };
  const _hoisted_9$6 = { class: "texts" };
  const _hoisted_10$5 = ["href"];
  const _hoisted_11$5 = {
    key: 0,
    class: "owner"
  };
  const _hoisted_12$4 = {
    key: 1,
    class: "dup"
  };
  const _hoisted_13$4 = {
    key: 2,
    class: "mod"
  };
  const _hoisted_14$4 = { class: "my-tag" };
  const _hoisted_15$4 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_16$5 = ["onClick"];
  const _hoisted_17$5 = { class: "floor" };
  const _hoisted_18$5 = { class: "ago" };
  const _hoisted_19$4 = { class: "Author-right" };
  const _hoisted_20$4 = {
    key: 0,
    class: "toolbar"
  };
  const _hoisted_21$3 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "tool" }, [
    /* @__PURE__ */ vue.createElementVNode("span", null, "隐藏")
  ], -1));
  const _hoisted_22$2 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("span", null, "上下文", -1));
  const _hoisted_23$2 = [
    _hoisted_22$2
  ];
  const _hoisted_24$2 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("span", null, "跳转", -1));
  const _hoisted_25$2 = [
    _hoisted_24$2
  ];
  const _hoisted_26$2 = /* @__PURE__ */ vue.createStaticVNode('<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5a16636d><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="#929596" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5a16636d></path><path d="M23 21H25.0025" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-5a16636d></path><path d="M33.001 21H34.9999" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-5a16636d></path><path d="M13.001 21H14.9999" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-5a16636d></path></svg><span data-v-5a16636d>回复</span>', 2);
  const _hoisted_28$1 = [
    _hoisted_26$2
  ];
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PopConfirm = vue.resolveComponent("PopConfirm");
    const _component_Point = vue.resolveComponent("Point");
    const _component_MoreIcon = vue.resolveComponent("MoreIcon");
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["Author", { expand: !$props.modelValue }])
    }, [
      vue.createElementVNode("div", _hoisted_1$c, [
        !$props.modelValue ? (vue.openBlock(), vue.createElementBlock("svg", {
          key: 0,
          class: "expand-icon",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", true)),
          width: "24",
          height: "24",
          viewBox: "0 0 48 48",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_4$8)) : vue.createCommentVNode("", true),
        $options.config.viewType !== "simple" ? (vue.openBlock(), vue.createElementBlock("a", {
          key: 1,
          class: "avatar",
          href: `/member/${$props.comment.username}`
        }, [
          vue.createElementVNode("img", {
            src: $props.comment.avatar,
            alt: ""
          }, null, 8, _hoisted_6$7)
        ], 8, _hoisted_5$7)) : vue.createCommentVNode("", true),
        vue.createElementVNode("div", _hoisted_7$6, [
          vue.createElementVNode("div", _hoisted_8$6, [
            vue.createElementVNode("span", _hoisted_9$6, [
              vue.createElementVNode("strong", null, [
                vue.createElementVNode("a", {
                  href: `/member/${$props.comment.username}`,
                  class: vue.normalizeClass(["username", { "dark": $options.isNight }])
                }, vue.toDisplayString($props.comment.username), 11, _hoisted_10$5)
              ]),
              $props.comment.isOp ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$5, "OP")) : vue.createCommentVNode("", true),
              $props.comment.isDup ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$4, "DUP")) : vue.createCommentVNode("", true),
              $props.comment.isMod ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13$4, "MOD")) : vue.createCommentVNode("", true),
              $options.isLogin && $options.config.openTag ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.myTags, (i) => {
                  return vue.openBlock(), vue.createElementBlock("span", _hoisted_14$4, [
                    _hoisted_15$4,
                    vue.createElementVNode("span", null, vue.toDisplayString(i), 1),
                    vue.createElementVNode("i", {
                      class: "fa fa-trash-o remove",
                      onClick: ($event) => $options.removeTag(i)
                    }, null, 8, _hoisted_16$5)
                  ]);
                }), 256)),
                vue.createElementVNode("span", {
                  class: "add-tag ago",
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.addTag && $options.addTag(...args)),
                  title: "添加标签"
                }, "+")
              ], 64)) : vue.createCommentVNode("", true)
            ])
          ]),
          vue.createElementVNode("div", null, [
            vue.createElementVNode("div", _hoisted_17$5, vue.toDisplayString($props.comment.floor) + "楼", 1),
            vue.createElementVNode("span", _hoisted_18$5, vue.toDisplayString($props.comment.date), 1)
          ])
        ])
      ]),
      vue.createElementVNode("div", _hoisted_19$4, [
        $options.isLogin ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_20$4, [
          vue.createVNode(_component_PopConfirm, {
            title: "确认隐藏这条回复?",
            onConfirm: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("hide"))
          }, {
            default: vue.withCtx(() => [
              _hoisted_21$3
            ]),
            _: 1
          }),
          $options.context ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "tool",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.showRelationReply && $options.showRelationReply(...args))
          }, _hoisted_23$2)) : vue.createCommentVNode("", true),
          $props.type === "top" ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            class: "tool",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.jump && $options.jump(...args))
          }, _hoisted_25$2)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", {
            class: "tool",
            onClick: _cache[5] || (_cache[5] = ($event) => $options.checkIsLogin("reply"))
          }, _hoisted_28$1),
          vue.withDirectives(vue.createVNode(_component_Point, {
            item: $options.pointInfo,
            onAddThank: $options.addThank,
            onRecallThank: $options.recallThank,
            "api-url": "reply/" + $props.comment.id
          }, null, 8, ["item", "onAddThank", "onRecallThank", "api-url"]), [
            [vue.vShow, !$props.comment.thankCount]
          ])
        ])) : vue.createCommentVNode("", true),
        vue.withDirectives(vue.createVNode(_component_Point, {
          style: { "margin-left": "1rem" },
          item: $options.pointInfo,
          onAddThank: $options.addThank,
          onRecallThank: $options.recallThank,
          "api-url": "reply/" + $props.comment.id
        }, null, 8, ["item", "onAddThank", "onRecallThank", "api-url"]), [
          [vue.vShow, $props.comment.thankCount]
        ]),
        vue.createVNode(_component_MoreIcon)
      ])
    ], 2);
  }
  const Author = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$5], ["__scopeId", "data-v-5a16636d"]]);
  const _withScopeId$9 = (n2) => (vue.pushScopeId("data-v-a0447529"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$b = { class: "get-cursor" };
  const _hoisted_2$a = ["innerHTML"];
  const _hoisted_3$8 = { class: "toolbar" };
  const _hoisted_4$7 = { class: "left" };
  const _hoisted_5$6 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",
    fill: "none",
    stroke: "#929596",
    "stroke-width": "2",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_6$6 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M24 35C29 35 31 31 31 31H17C17 31 19 35 24 35Z",
    stroke: "#929596",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_7$5 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M31 18V22",
    stroke: "#929596",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_8$5 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M17 18V22",
    stroke: "#929596",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_9$5 = [
    _hoisted_5$6,
    _hoisted_6$6,
    _hoisted_7$5,
    _hoisted_8$5
  ];
  const _hoisted_10$4 = { class: "upload" };
  const _hoisted_11$4 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M5 10C5 8.89543 5.89543 8 7 8L41 8C42.1046 8 43 8.89543 43 10V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V10Z",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M14.5 18C15.3284 18 16 17.3284 16 16.5C16 15.6716 15.3284 15 14.5 15C13.6716 15 13 15.6716 13 16.5C13 17.3284 13.6716 18 14.5 18Z",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M15 24L20 28L26 21L43 34V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V34L15 24Z",
      fill: "none",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_12$3 = {
    key: 0,
    style: { "color": "black", "font-size": "1.4rem" }
  };
  const _hoisted_13$3 = { class: "right" };
  const _hoisted_14$3 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, "经典表情", -1));
  const _hoisted_15$3 = { class: "list" };
  const _hoisted_16$4 = ["src", "onClick"];
  const _hoisted_17$4 = { class: "emoji" };
  const _hoisted_18$4 = { class: "title" };
  const _hoisted_19$3 = { class: "list" };
  const _hoisted_20$3 = ["onClick"];
  const _sfc_main$b = {
    __name: "PostEditor",
    props: {
      replyUser: null,
      replyFloor: null,
      useType: {
        type: String,
        default() {
          return "reply-comment";
        }
      }
    },
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const { replyUser, replyFloor, useType } = props;
      const replyInfo = replyUser ? `@${replyUser} #${replyFloor} ` : "";
      const emits = __emit;
      const post = vue.inject("post");
      const show = vue.inject("show");
      const isNight = vue.inject("isNight");
      vue.inject("pageType");
      const allReplyUsers = vue.inject("allReplyUsers");
      let isFocus = vue.ref(false);
      const loading = vue.ref(false);
      const uploadLoading = vue.ref(false);
      const isShowEmoticons = vue.ref(false);
      const editorId = vue.ref("editorId_" + Date.now());
      const content = vue.ref(replyInfo);
      const txtRef = vue.ref(null);
      const cursorRef = vue.ref(null);
      const emoticonsRef = vue.ref(null);
      const none = vue.ref('<span style="white-space:pre-wrap;"> </span>');
      const emojiEmoticons = [
        {
          title: "小黄脸",
          list: [
            "😀",
            "😁",
            "😂",
            "🤣",
            "😅",
            "😊",
            "😋",
            "😘",
            "🥰",
            "😗",
            "🤩",
            "🤔",
            "🤨",
            "😐",
            "😑",
            "🙄",
            "😏",
            "😪",
            "😫",
            "🥱",
            "😜",
            "😒",
            "😔",
            "😨",
            "😰",
            "😱",
            "🥵",
            "😡",
            "🥳",
            "🥺",
            "🤭",
            "🧐",
            "😎",
            "🤓",
            "😭",
            "🤑",
            "🤮"
          ]
        },
        {
          title: "手势",
          list: [
            "🙋",
            "🙎",
            "🙅",
            "🙇",
            "🤷",
            "🤏",
            "👉",
            "✌️",
            "🤘",
            "🤙",
            "👌",
            "🤌",
            "👍",
            "👎",
            "👋",
            "🤝",
            "🙏",
            "👏"
          ]
        },
        {
          title: "庆祝",
          list: ["✨", "🎉", "🎊"]
        },
        {
          title: "其他",
          list: ["👻", "🤡", "🐔", "👀", "💩", "🐴", "🦄", "🐧", "🐶", "🐒", "🙈", "🙉", "🙊", "🐵"]
        }
      ];
      const classicsEmoticons = [
        {
          name: "[狗头]",
          low: "https://i.imgur.com/io2SM1h.png",
          high: "https://i.imgur.com/0icl60r.png"
        },
        {
          name: "[马]",
          low: "https://i.imgur.com/8EKZv7I.png",
          high: "https://i.imgur.com/ANFUX52.png"
        },
        {
          name: "[不高兴]",
          low: "https://i.imgur.com/huX6coX.png",
          high: "https://i.imgur.com/N7JEuvc.png"
        },
        {
          name: "[呵呵]",
          low: "https://i.imgur.com/RvoLAbX.png",
          high: "https://i.imgur.com/xSzIqrK.png"
        },
        {
          name: "[真棒]",
          low: "https://i.imgur.com/xr1UOz1.png",
          high: "https://i.imgur.com/w8YEw9Q.png"
        },
        {
          name: "[鄙视]",
          low: "https://i.imgur.com/u6jlqVq.png",
          high: "https://i.imgur.com/8JFNANq.png"
        },
        {
          name: "[疑问]",
          low: "https://i.imgur.com/F29pmQ6.png",
          high: "https://i.imgur.com/EbbTQAR.png"
        },
        {
          name: "[吐舌]",
          low: "https://i.imgur.com/InmIzl9.png",
          high: "https://i.imgur.com/Ovj56Cd.png"
        },
        // {
        //   name: '[嘲笑]',
        //   low: 'https://i.imgur.com/BaWcsMR.png',
        //   high: 'https://i.imgur.com/0OGfJw4.png'
        // },
        // {
        //   name: '[滑稽]',
        //   low: 'https://i.imgur.com/lmbN0yI.png',
        //   high: 'https://i.imgur.com/Pc0wH85.png'
        // },
        {
          name: "[笑眼]",
          low: "https://i.imgur.com/ZveiiGy.png",
          high: "https://i.imgur.com/PI1CfEr.png"
        },
        {
          name: "[狂汗]",
          low: "https://i.imgur.com/veWihk6.png",
          high: "https://i.imgur.com/3LtHdQv.png"
        },
        {
          name: "[大哭]",
          low: "https://i.imgur.com/hu4oR6C.png",
          high: "https://i.imgur.com/b4X9XLE.png"
        },
        {
          name: "[喷]",
          low: "https://i.imgur.com/bkw3VRr.png",
          high: "https://i.imgur.com/wnZL13L.png"
        },
        {
          name: "[苦笑]",
          low: "https://i.imgur.com/VUWFktU.png",
          high: "https://i.imgur.com/NAfspZ1.png"
        },
        {
          name: "[喝酒]",
          low: "https://i.imgur.com/2ZZSapE.png",
          high: "https://i.imgur.com/rVbSVak.png"
        },
        {
          name: "[吃瓜]",
          low: "https://i.imgur.com/ee8Lq7H.png",
          high: "https://i.imgur.com/0L26og9.png"
        },
        {
          name: "[捂脸]",
          low: "https://i.imgur.com/krir4IG.png",
          high: "https://i.imgur.com/qqBqgVm.png"
        },
        {
          name: "[呕]",
          low: "https://i.imgur.com/6CUiUxv.png",
          high: "https://i.imgur.com/kgdxRsG.png"
        },
        {
          name: "[阴险]",
          low: "https://i.imgur.com/MA8YqTP.png",
          high: "https://i.imgur.com/e94jbaT.png"
        },
        {
          name: "[怒]",
          low: "https://i.imgur.com/n4kWfGB.png",
          high: "https://i.imgur.com/iMXxNxh.png"
        },
        {
          name: "[衰]",
          low: "https://i.imgur.com/voHFDyQ.png",
          high: "https://i.imgur.com/XffE6gu.png"
        },
        {
          name: "[合十]",
          low: "https://i.imgur.com/I8x3ang.png",
          high: "https://i.imgur.com/T4rJVee.png"
        },
        {
          name: "[赞]",
          low: "https://i.imgur.com/lG44yUl.png",
          high: "https://i.imgur.com/AoF5PLp.png"
        },
        {
          name: "[踩]",
          low: "https://i.imgur.com/cJp0uKZ.png",
          high: "https://i.imgur.com/1XYGfXj.png"
        },
        {
          name: "[爱心]",
          low: "https://i.imgur.com/sLENaF5.png",
          high: "https://i.imgur.com/dND56oX.png"
        },
        {
          name: "[心碎]",
          low: "https://i.imgur.com/AZxJzve.png",
          high: "https://i.imgur.com/RiUsPci.png"
        }
      ];
      const imgurClientIdPool = [
        "3107b9ef8b316f3",
        "442b04f26eefc8a",
        "59cfebe717c09e4",
        "60605aad4a62882",
        "6c65ab1d3f5452a",
        "83e123737849aa9",
        "9311f6be1c10160",
        "c4a4a563f698595",
        "81be04b9e4a08ce"
      ];
      __expose({ content, isFocus: () => isFocus.value });
      const editorClass = vue.computed(() => {
        return [useType, isFocus.value ? "isFocus" : "", isNight.value ? "isNight" : ""];
      });
      const cursorHtml = vue.computed(() => {
        var _a;
        if (!txtRef.value || !content.value)
          return "";
        let index2 = ((_a = txtRef.value) == null ? void 0 : _a.selectionStart) || 0;
        return content.value.substring(0, index2).replace(/</g, "<").replace(/>/g, ">").replace(/\n/g, "<br/>").replace(/\s/g, none.value);
      });
      const disabled = vue.computed(() => {
        if (content.value) {
          return content.value === replyInfo;
        } else {
          return true;
        }
      });
      function drop(e2) {
        e2.preventDefault();
        upload(e2.dataTransfer.files[0]);
      }
      async function upload(file) {
        if (!file)
          return;
        if (uploadLoading.value)
          return;
        uploadLoading.value = true;
        const formData = new FormData();
        formData.append("image", file);
        const randomIndex = Math.floor(Math.random() * imgurClientIdPool.length);
        const clidenId = imgurClientIdPool[randomIndex];
        const res = await fetch("https://api.imgur.com/3/upload", {
          method: "POST",
          headers: { Authorization: `Client-ID ${clidenId}` },
          body: formData
        });
        uploadLoading.value = false;
        if (res.ok) {
          const resData = await res.json();
          if (resData.success) {
            return insert(" " + resData.data.link + " ");
          }
        }
        eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "上传失败" });
      }
      async function submit() {
        if (disabled.value || loading.value)
          return;
        loading.value = true;
        let submit_content = content.value.replace(/\[((?!\[).)+\]/g, function(match) {
          let item2 = classicsEmoticons.find((v) => v.name === match);
          if (item2) {
            return item2.low + " ";
          }
          return match;
        });
        let show_content = content.value.replace(/https?:\/\/(i\.)?imgur\.com\/((?!http).)+\.(gif|png|jpg|jpeg|GIF|PNG|JPG|JPEG)/g, function(match) {
          return `<img src="${match}" data-originUrl="${match}" data-notice="这个img标签由v2ex-超级增强脚本解析" style="max-width: 100%">`;
        });
        show_content = show_content.replace(/\[((?!\[).)+\]/g, function(match) {
          let item2 = classicsEmoticons.find((v) => v.name === match);
          if (item2) {
            return `<a target="_blank" href="${item2.low}" rel="nofollow noopener"><img src="${item2.low}" class="embedded_image" rel="noreferrer"></a> `;
          }
          return match;
        });
        let matchUsers = show_content.match(/@([\w]+?[\s])/g);
        if (matchUsers) {
          matchUsers.map((i) => {
            let username = i.replace("@", "").replace(" ", "");
            show_content = show_content.replace(username, `<a href="/member/${username}">${username}</a>`);
          });
        }
        show_content = show_content.replaceAll("\n", "<br/>");
        let item = {
          thankCount: 0,
          isThanked: false,
          isOp: post.value.username === window.user.username,
          isDup: false,
          id: Date.now(),
          username: window.user.username,
          avatar: window.user.avatar,
          date: "几秒前",
          floor: post.value.replyCount + 1,
          reply_content: show_content ?? "",
          children: [],
          replyUsers: replyUser ? [replyUser] : [],
          replyFloor: replyFloor || -1,
          level: useType === "reply-comment" ? 1 : 0
        };
        item.hideCallUserReplyContent = item.reply_content;
        if (item.replyUsers.length === 1) {
          item.hideCallUserReplyContent = item.reply_content.replace(/@<a href="\/member\/[\s\S]+?<\/a>(\s#[\d]+)?\s(<br>)?/, () => "");
        }
        console.log("回复", item);
        let url = `${window.baseUrl}/t/${post.value.id}`;
        $.post(url, { content: submit_content, once: 123 }).then(
          (res) => {
            loading.value = false;
            let r2 = res.search("你上一条回复的内容和这条相同");
            if (r2 > -1)
              return eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "你上一条回复的内容和这条相同" });
            r2 = res.search("请不要在每一个回复中都包括外链，这看起来像是在 spamming");
            if (r2 > -1)
              return eventBus.emit(CMD.SHOW_MSG, {
                type: "error",
                text: "请不要在每一个回复中都包括外链，这看起来像是在 spamming"
              });
            let r22 = res.search("创建新回复");
            if (r22 > -1) {
              eventBus.emit(CMD.REFRESH_ONCE, res);
              eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "回复出现了问题，请使用原版进行回复" });
              let clientWidth = window.document.body.clientWidth;
              let windowWidth = 1200;
              let left = clientWidth / 2 - windowWidth / 2;
              let newWin = window.open("创建新回复", "", `width=${windowWidth},height=600,left=${left},top=100`);
              newWin.document.write(res);
              let loop = setInterval(function() {
                if (newWin.closed) {
                  clearInterval(loop);
                  eventBus.emit(CMD.REFRESH_POST);
                }
              }, 1e3);
              return;
            }
            content.value = replyInfo;
            emits("close");
            eventBus.emit(CMD.REFRESH_ONCE, res);
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "回复成功" });
            eventBus.emit(CMD.ADD_REPLY, item);
          },
          (err) => {
            console.log("err", err);
            loading.value = false;
            eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "回复失败" });
          }
        ).catch((r2) => {
          console.log("catch", r2);
        });
      }
      function showEmoticons(e2) {
        if (isShowEmoticons.value) {
          return isShowEmoticons.value = false;
        }
        let rect = e2.currentTarget.getBoundingClientRect();
        emoticonsRef.value.style.left = rect.left + 30 + "px";
        emoticonsRef.value.style.bottom = window.innerHeight - rect.top - 20 + "px";
        isShowEmoticons.value = true;
      }
      function off() {
        eventBus.emit(CMD.SHOW_CALL, { show: false });
        eventBus.off(CMD.SET_CALL);
      }
      function checkHeight2() {
        txtRef.value.style.height = 0;
        txtRef.value.style.height = txtRef.value.scrollHeight + "px";
      }
      function insert(str) {
        let cursorPos = txtRef.value.selectionStart;
        let start = content.value.slice(0, cursorPos);
        let end = content.value.slice(cursorPos, content.value.length);
        content.value = start + str + end;
        let moveCursorPos = start.length + str.length;
        setTimeout(() => {
          txtRef.value.focus();
          txtRef.value.setSelectionRange(moveCursorPos, moveCursorPos);
          checkHeight2();
        });
      }
      function showCallPopover(text) {
        let r2 = cursorRef.value.getBoundingClientRect();
        eventBus.emit(CMD.SHOW_CALL, { show: true, top: r2.top, left: r2.left, text });
        eventBus.off(CMD.SET_CALL);
        eventBus.on(CMD.SET_CALL, (e2) => {
          let cursorPos = txtRef.value.selectionStart;
          let start = content.value.slice(0, cursorPos);
          let end = content.value.slice(cursorPos, content.value.length);
          let lastCallPos = start.lastIndexOf("@");
          start = content.value.slice(0, lastCallPos + 1);
          if (e2 === "管理员") {
            e2 = "Livid @Kai @Olivia @GordianZ @sparanoid";
          }
          if (e2 === "所有人") {
            e2 = allReplyUsers.value.map((v, i) => {
              if (i)
                return "@" + v;
              else
                return v;
            }).join(" ");
          }
          content.value = start + e2 + " " + end;
          let moveCursorPos = start.length + e2.length + 1;
          setTimeout(() => {
            txtRef.value.setSelectionRange(moveCursorPos, moveCursorPos);
            checkHeight2();
          });
          eventBus.off(CMD.SET_CALL);
        });
      }
      function onKeydown(e2) {
        let code = e2.keyCode;
        switch (code) {
          case 8:
            if (content.value === "@") {
              off();
            }
            break;
          case 37:
          case 38:
          case 39:
          case 40:
            setTimeout(() => onInput({ data: "" }), 100);
            break;
          case 27:
            e2.preventDefault();
            e2.stopPropagation();
            e2.stopImmediatePropagation();
            return false;
          case 13:
            if (e2.ctrlKey)
              submit();
            if (e2.metaKey)
              submit();
            break;
        }
      }
      function onInput(e2) {
        let cursorPos = txtRef.value.selectionStart;
        if (!content.value)
          return;
        if (e2.data === " ") {
          return off();
        }
        if (e2.data === "@") {
          if (content.value.length !== 1) {
            if (content.value[cursorPos - 2] === " " || content.value[cursorPos - 2] === "\n") {
              return showCallPopover("");
            }
          } else {
            return showCallPopover("");
          }
          off();
        } else {
          let judgeStr = content.value.slice(0, cursorPos);
          let lastCallPos = judgeStr.lastIndexOf("@");
          if (lastCallPos === -1) {
            return off();
          }
          let callStr = judgeStr.slice(lastCallPos, cursorPos);
          let hasSpace = callStr.includes(" ");
          if (hasSpace) {
            off();
          } else {
            if (lastCallPos === 0) {
              return showCallPopover(callStr.replace("@", ""));
            }
            if (content.value.length !== 1) {
              if (content.value[lastCallPos - 1] === " " || content.value[lastCallPos - 1] === "\n") {
                return showCallPopover(callStr.replace("@", ""));
              }
            } else {
              return showCallPopover(callStr.replace("@", ""));
            }
            off();
          }
        }
      }
      function onPaste(e2) {
        const dataTransferItemList = e2.clipboardData.items;
        const items = [].slice.call(dataTransferItemList).filter(function(item) {
          return item.type.indexOf("image") !== -1;
        });
        if (items.length === 0) {
          return;
        }
        const dataTransferItem = items[0];
        const blob = dataTransferItem.getAsFile();
        upload(blob);
      }
      function onBlur() {
        document.removeEventListener("paste", onPaste);
        isFocus.value = false;
      }
      function onFocusin() {
        document.addEventListener("paste", onPaste);
      }
      vue.watch(() => show, (n2) => {
        if (n2.value)
          isShowEmoticons.value = false;
      }, { deep: true });
      vue.onMounted(() => {
        $(`.${editorId.value}`).each(function() {
          this.setAttribute("style", "height:" + this.scrollHeight + "px;overflow-y:hidden;");
        }).on("input", function() {
          this.style.height = 0;
          this.style.height = this.scrollHeight + "px";
        });
        if (useType === "reply-comment") {
          txtRef.value && txtRef.value.focus();
        }
      });
      vue.onBeforeUnmount(() => {
        $(`.${editorId.value}`).off();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["post-editor-wrapper", editorClass.value])
        }, [
          vue.withDirectives(vue.createElementVNode("textarea", {
            class: vue.normalizeClass(["post-editor", editorId.value]),
            ref_key: "txtRef",
            ref: txtRef,
            onFocus: _cache[0] || (_cache[0] = ($event) => vue.isRef(isFocus) ? isFocus.value = true : isFocus = true),
            onBlur,
            onFocusin,
            placeholder: "请尽量让自己的回复能够对别人有帮助",
            onInput,
            onKeydown,
            onDrop: drop,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => content.value = $event)
          }, null, 34), [
            [vue.vModelText, content.value]
          ]),
          vue.createElementVNode("div", _hoisted_1$b, [
            vue.createElementVNode("span", { innerHTML: cursorHtml.value }, null, 8, _hoisted_2$a),
            vue.createElementVNode("span", {
              class: "cursor",
              ref_key: "cursorRef",
              ref: cursorRef
            }, "|", 512)
          ]),
          vue.createElementVNode("div", _hoisted_3$8, [
            vue.createElementVNode("div", _hoisted_4$7, [
              (vue.openBlock(), vue.createElementBlock("svg", {
                onClick: showEmoticons,
                width: "20",
                height: "20",
                viewBox: "0 0 48 48",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, _hoisted_9$5)),
              vue.createElementVNode("div", _hoisted_10$4, [
                vue.createElementVNode("input", {
                  type: "file",
                  accept: "image/*",
                  onChange: _cache[2] || (_cache[2] = (e2) => upload(e2.currentTarget.files[0]))
                }, null, 32),
                _hoisted_11$4
              ]),
              uploadLoading.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_12$3, "上传中.....")) : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("div", _hoisted_13$3, [
              vue.unref(useType) === "reply-comment" ? (vue.openBlock(), vue.createBlock(BaseButton, {
                key: 0,
                type: "link",
                size: "small",
                style: { "margin-right": "1rem" },
                onClick: _cache[3] || (_cache[3] = ($event) => emits("close"))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" 关闭 ")
                ]),
                _: 1
              })) : vue.createCommentVNode("", true),
              vue.createVNode(BaseButton, {
                size: "small",
                disabled: disabled.value,
                loading: loading.value,
                onClick: submit
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("回复 ")
                ]),
                _: 1
              }, 8, ["disabled", "loading"])
            ])
          ]),
          vue.withDirectives(vue.createElementVNode("div", {
            class: "emoticon-pack",
            ref_key: "emoticonsRef",
            ref: emoticonsRef
          }, [
            vue.createElementVNode("i", {
              class: "fa fa-times",
              "aria-hidden": "true",
              onClick: _cache[4] || (_cache[4] = ($event) => isShowEmoticons.value = false)
            }),
            _hoisted_14$3,
            vue.createElementVNode("div", _hoisted_15$3, [
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(classicsEmoticons, (item) => {
                return vue.createElementVNode("img", {
                  src: item.high,
                  onClick: ($event) => {
                    insert(item.name);
                    isShowEmoticons.value = false;
                  }
                }, null, 8, _hoisted_16$4);
              }), 64))
            ]),
            vue.createElementVNode("div", _hoisted_17$4, [
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(emojiEmoticons, (item) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                  vue.createElementVNode("div", _hoisted_18$4, vue.toDisplayString(item.title), 1),
                  vue.createElementVNode("div", _hoisted_19$3, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.list, (emoji) => {
                      return vue.openBlock(), vue.createElementBlock("span", {
                        onClick: ($event) => {
                          insert(emoji);
                          isShowEmoticons.value = false;
                        }
                      }, vue.toDisplayString(emoji), 9, _hoisted_20$3);
                    }), 256))
                  ])
                ], 64);
              }), 64))
            ])
          ], 512), [
            [vue.vShow, isShowEmoticons.value]
          ])
        ], 2);
      };
    }
  };
  const PostEditor = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-a0447529"]]);
  const _hoisted_1$a = {
    key: 0,
    class: "html-wrapper"
  };
  const _hoisted_2$9 = ["innerHTML"];
  const checkHeight = 900;
  const _sfc_main$a = {
    __name: "BaseHtmlRender",
    props: ["html"],
    setup(__props) {
      const config2 = vue.inject("config");
      const props = __props;
      const contentRef = vue.ref(null);
      const mask = vue.ref(false);
      const handOpen = vue.ref(false);
      function mouseup(e2) {
        if (!config2.value.base64)
          return;
        let selectionText = window.win().getSelection().toString();
        if (selectionText) {
          let r2 = selectionText.match(/([A-Za-z0-9+/=]+)/g);
          if (r2) {
            if (r2[0].length < 4)
              return;
            eventBus.emit(CMD.SHOW_TOOLTIP, { text: r2[0], e: e2 });
          }
        }
      }
      vue.watch(config2.value, (newVale) => {
        if (!newVale.contentAutoCollapse) {
          mask.value = false;
        }
      });
      vue.watch([() => contentRef.value, () => props.html], () => {
        if (!contentRef.value || !props.html)
          return;
        if (!config2.value.contentAutoCollapse)
          return;
        contentRef.value.querySelectorAll("img").forEach((item) => {
          item.removeEventListener("load", checkContentHeight);
          item.addEventListener("load", checkContentHeight);
        });
        checkContentHeight();
      }, { immediate: true, flush: "post" });
      function checkContentHeight() {
        if (handOpen.value)
          return;
        let rect = contentRef.value.getBoundingClientRect();
        mask.value = rect.height >= checkHeight;
      }
      return (_ctx, _cache) => {
        return props.html ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$a, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass({ mask: mask.value })
          }, [
            vue.createElementVNode("div", {
              ref_key: "contentRef",
              ref: contentRef,
              innerHTML: props.html,
              onMouseup: mouseup
            }, null, 40, _hoisted_2$9)
          ], 2),
          mask.value ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "expand",
            onClick: _cache[0] || (_cache[0] = ($event) => {
              mask.value = false;
              handOpen.value = true;
            })
          }, "展开")) : vue.createCommentVNode("", true)
        ])) : vue.createCommentVNode("", true);
      };
    }
  };
  const BaseHtmlRender = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-0276a65d"]]);
  const _sfc_main$9 = {
    name: "Comment",
    components: { BaseHtmlRender, Author, PostEditor, Point },
    inject: ["post", "postDetailWidth", "show", "isNight", "config"],
    props: {
      modelValue: {
        reply_content: ""
      },
      type: {
        type: String,
        default() {
          return "list";
        }
      }
    },
    data() {
      return {
        showOrigin: false,
        edit: false,
        ding: false,
        expand: true,
        expandWrong: false,
        replyInfo: `@${this.modelValue.username} #${this.modelValue.floor} `,
        cssStyle: null,
        floor: this.modelValue.floor
      };
    },
    watch: {
      show(e2) {
        if (e2) {
          this.edit = false;
        }
      },
      postDetailWidth(n2, o) {
        this.checkIsTooLong(n2);
      }
    },
    computed: {
      CommentDisplayType() {
        return CommentDisplayType$1;
      },
      myClass() {
        return {
          isOp: this.modelValue.isOp,
          isSimple: this.config.viewType === "simple",
          ding: this.ding,
          isLevelOne: this.modelValue.level === 0,
          ["c_" + this.floor]: this.type !== "top"
        };
      }
    },
    mounted() {
      this.checkIsTooLong(this.postDetailWidth);
    },
    methods: {
      checkIsTooLong(postDetailWidth) {
        if (postDetailWidth !== 0) {
          let rect = this.$refs.comment.getBoundingClientRect();
          let ban = postDetailWidth / 2;
          if (ban < rect.width && rect.width < ban + 25 && this.modelValue.children.length) {
            this.expand = false;
            let padding = 2;
            this.cssStyle = {
              padding: "1rem 0",
              width: `calc(${postDetailWidth}px - ${padding}rem)`,
              transform: `translateX(calc(${rect.width - postDetailWidth}px + ${padding}rem))`,
              background: this.isNight ? "#18222d" : "white"
            };
          }
        }
      },
      //高亮一下
      showDing() {
        this.ding = true;
        setTimeout(() => {
          this.ding = false;
        }, 2e3);
      },
      hide() {
        let url = `${window.baseUrl}/ignore/reply/${this.modelValue.id}?once=${this.post.once}`;
        eventBus.emit(CMD.REMOVE, this.modelValue.floor);
        $.post(url).then((res) => {
          eventBus.emit(CMD.REFRESH_ONCE);
          eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "隐藏成功" });
        }, (err) => {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "隐藏成功,仅本次有效（接口调用失败！）" });
        });
      },
      toggle() {
        this.expand = !this.expand;
      },
      toggleContent() {
        if (this.modelValue.level === 0 && this.modelValue.replyUsers.length === 0)
          return;
        this.showOrigin = !this.showOrigin;
      }
    }
  };
  const _withScopeId$8 = (n2) => (vue.pushScopeId("data-v-4ff6e11b"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$9 = ["data-floor"];
  const _hoisted_2$8 = { class: "comment-content" };
  const _hoisted_3$7 = { class: "right" };
  const _hoisted_4$6 = { class: "w" };
  const _hoisted_5$5 = {
    key: 0,
    class: "wrong-wrapper"
  };
  const _hoisted_6$5 = ["href"];
  const _hoisted_7$4 = { class: "del-line" };
  const _hoisted_8$4 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("i", {
    class: "fa fa-question-circle-o wrong-icon",
    "aria-hidden": "true"
  }, null, -1));
  const _hoisted_9$4 = {
    key: 0,
    class: "warning"
  };
  const _hoisted_10$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_11$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_12$2 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_13$2 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_14$2 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_15$2 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("a", {
    href: "https://github.com/zyronon/v2ex-script/discussions/7",
    target: "_blank"
  }, "这里", -1));
  const _hoisted_16$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("p", null, "---原文---", -1));
  const _hoisted_17$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("p", null, "-----------", -1));
  const _hoisted_18$3 = { class: "simple-wrapper" };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Author = vue.resolveComponent("Author");
    const _component_BaseHtmlRender = vue.resolveComponent("BaseHtmlRender");
    const _component_PostEditor = vue.resolveComponent("PostEditor");
    const _component_Comment = vue.resolveComponent("Comment", true);
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["comment", $options.myClass]),
      ref: "comment",
      "data-floor": $data.floor
    }, [
      vue.createVNode(_component_Author, {
        modelValue: $data.expand,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.expand = $event),
        comment: $props.modelValue,
        onReply: _cache[1] || (_cache[1] = ($event) => $data.edit = !$data.edit),
        type: $props.type,
        onHide: $options.hide
      }, null, 8, ["modelValue", "comment", "type", "onHide"]),
      $data.cssStyle && !$data.expand ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: "more ago",
        onClick: _cache[2] || (_cache[2] = ($event) => $data.expand = !$data.expand)
      }, " 由于嵌套回复层级太深，自动将后续回复隐藏 ")) : vue.createCommentVNode("", true),
      $data.expand ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        class: "comment-content-w",
        style: vue.normalizeStyle($data.cssStyle)
      }, [
        $data.cssStyle ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "more ago",
          onClick: _cache[3] || (_cache[3] = ($event) => $data.expand = !$data.expand)
        }, " 由于嵌套回复层级太深，自动将以下回复移至可见范围 ")) : vue.createCommentVNode("", true),
        vue.createElementVNode("div", _hoisted_2$8, [
          vue.createElementVNode("div", {
            class: "left expand-line",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.toggle && $options.toggle(...args))
          }),
          vue.createElementVNode("div", _hoisted_3$7, [
            vue.createElementVNode("div", _hoisted_4$6, [
              $props.modelValue.isWrong ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$5, [
                vue.createElementVNode("span", {
                  onClick: _cache[5] || (_cache[5] = ($event) => $data.expandWrong = !$data.expandWrong),
                  title: "点击楼层号查看提示"
                }, [
                  vue.createElementVNode("a", {
                    href: "/member/" + $props.modelValue.replyUsers[0]
                  }, "@" + vue.toDisplayString($props.modelValue.replyUsers[0]) + "  ", 9, _hoisted_6$5),
                  vue.createElementVNode("span", _hoisted_7$4, "#" + vue.toDisplayString($props.modelValue.replyFloor), 1),
                  _hoisted_8$4
                ]),
                $data.expandWrong ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$4, [
                  vue.createTextVNode(" 这条回复似乎有点问题，指定的楼层号与@的人对应不上 "),
                  _hoisted_10$3,
                  vue.createTextVNode(" 原因可能有下面几种： "),
                  _hoisted_11$3,
                  vue.createTextVNode(" 一、屏蔽用户导致楼层塌陷：你屏蔽了A，自A以后的回复的楼层号都会减1 "),
                  _hoisted_12$2,
                  vue.createTextVNode(" 二、忽略回复导致楼层塌陷：原理同上 "),
                  _hoisted_13$2,
                  vue.createTextVNode(" 三、层主回复时指定错了楼层号（同一，层主屏蔽了别人，导致楼层塌陷） "),
                  _hoisted_14$2,
                  vue.createTextVNode(" 四、脚本解析错误，请在"),
                  _hoisted_15$2,
                  vue.createTextVNode("反馈 ")
                ])) : vue.createCommentVNode("", true)
              ])) : vue.createCommentVNode("", true),
              $options.config.commentDisplayType === $options.CommentDisplayType.FloorInFloorNoCallUser && this.type !== "top" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                $data.showOrigin ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  onDblclick: _cache[6] || (_cache[6] = (...args) => $options.toggleContent && $options.toggleContent(...args))
                }, [
                  _hoisted_16$3,
                  vue.createVNode(_component_BaseHtmlRender, {
                    class: "reply_content",
                    html: $props.modelValue.reply_content
                  }, null, 8, ["html"]),
                  _hoisted_17$3
                ], 32)) : vue.createCommentVNode("", true),
                vue.createVNode(_component_BaseHtmlRender, {
                  class: "reply_content",
                  onDblclick: $options.toggleContent,
                  html: $props.modelValue.hideCallUserReplyContent
                }, null, 8, ["onDblclick", "html"])
              ], 64)) : (vue.openBlock(), vue.createBlock(_component_BaseHtmlRender, {
                key: 2,
                class: "reply_content",
                html: $props.modelValue.reply_content
              }, null, 8, ["html"])),
              $data.edit ? (vue.openBlock(), vue.createBlock(_component_PostEditor, {
                key: 3,
                onClose: _cache[7] || (_cache[7] = ($event) => $data.edit = false),
                replyInfo: $data.replyInfo,
                replyUser: $props.modelValue.username,
                replyFloor: $props.modelValue.floor
              }, null, 8, ["replyInfo", "replyUser", "replyFloor"])) : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("div", _hoisted_18$3, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.modelValue.children, (item, index2) => {
                return vue.openBlock(), vue.createBlock(_component_Comment, {
                  modelValue: $props.modelValue.children[index2],
                  "onUpdate:modelValue": ($event) => $props.modelValue.children[index2] = $event,
                  key: index2
                }, null, 8, ["modelValue", "onUpdate:modelValue"]);
              }), 128))
            ])
          ])
        ]),
        $data.cssStyle ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "more ago",
          onClick: _cache[8] || (_cache[8] = ($event) => $data.expand = !$data.expand)
        }, " 由于嵌套回复层级太深，自动将以上回复移至可见范围 ")) : vue.createCommentVNode("", true)
      ], 4)) : vue.createCommentVNode("", true)
    ], 10, _hoisted_1$9);
  }
  const Comment = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4], ["__scopeId", "data-v-4ff6e11b"]]);
  const _sfc_main$8 = {
    name: "Toolbar",
    components: { BaseLoading },
    inject: [
      "isLogin",
      "post",
      "pageType"
    ],
    data() {
      return {
        timer: null,
        loading: false,
        loading2: false,
        loading3: false
      };
    },
    methods: {
      checkIsLogin(emitName = "") {
        if (!this.isLogin) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "请先登录！" });
          return false;
        }
        this.$emit(emitName);
        return true;
      },
      getColor(val) {
        return val ? "#ff4500" : "#929596";
      },
      getIsFull(val) {
        return val ? "#ff4500" : "none";
      },
      tweet() {
        if (!this.checkIsLogin())
          return;
        let username = window.user.username;
        let url = `https://twitter.com/intent/tweet?url=${window.baseUrl}/t/${this.post.id}?r=${username}&related=v2ex&text=${this.post.title}`;
        window.win().open(url, "_blank", "width=550,height=370");
      },
      report() {
        if (!this.checkIsLogin())
          return;
        if (!this.isLogin)
          return;
        if (this.post.isReport)
          return;
        let username = window.user.username;
        let url = `https://twitter.com/share?url=${window.baseUrl}/t/${this.post.id}?r=${username}&amp;related=v2ex&amp;hashtags=apple&amp;text=${this.post.title}`;
        window.win().open(url, "_blank", "width=550,height=370");
      },
      async toggleIgnore() {
        if (!this.checkIsLogin())
          return;
        let url = `${window.baseUrl}/${this.post.isIgnore ? "unignore" : "ignore"}/topic/${this.post.id}?once=${this.post.once}`;
        if (this.pageType === PageType.Post) {
          this.loading2 = true;
          let apiRes = await window.win().fetch(url);
          if (apiRes.redirected) {
            if (!this.post.isIgnore) {
              window.win().location = window.baseUrl;
            }
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: this.post.isIgnore ? "取消成功" : "忽略成功" });
            eventBus.emit(CMD.MERGE, { isIgnore: !this.post.isIgnore });
          } else {
            eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "忽略失败" });
          }
          this.loading2 = false;
        } else {
          if (this.post.isIgnore) {
            this.loading2 = true;
          } else {
            eventBus.emit(CMD.IGNORE);
          }
          let apiRes = await window.win().fetch(url);
          if (apiRes.redirected) {
            if (this.post.isIgnore) {
              eventBus.emit(CMD.REFRESH_ONCE);
            }
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: this.post.isIgnore ? "取消成功" : "忽略成功" });
            eventBus.emit(CMD.MERGE, { isIgnore: !this.post.isIgnore });
          } else {
            eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "忽略成功,仅本次有效（接口调用失败！）" });
          }
          this.loading2 = false;
        }
      },
      async toggleFavorite() {
        if (!this.post.isFavorite && config.collectBrowserNotice) {
          eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "别忘记按Command/Cmd/CTRL + D添加到书签哦" });
        }
        if (!this.checkIsLogin())
          return;
        this.loading = true;
        let url = `${window.baseUrl}/${this.post.isFavorite ? "unfavorite" : "favorite"}/topic/${this.post.id}?once=${this.post.once}`;
        let apiRes = await window.win().fetch(url);
        this.loading = false;
        if (apiRes.redirected) {
          let htmlText = await apiRes.text();
          if (htmlText.search(this.post.isFavorite ? "加入收藏" : "取消收藏")) {
            eventBus.emit(CMD.MERGE, { collectCount: this.post.isFavorite ? this.post.collectCount - 1 : this.post.collectCount + 1 });
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: this.post.isFavorite ? "取消成功" : "收藏成功" });
            eventBus.emit(CMD.REFRESH_ONCE, htmlText);
            eventBus.emit(CMD.MERGE, { isFavorite: !this.post.isFavorite });
            return;
          }
        }
        eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "操作失败" });
      }
    }
  };
  const _withScopeId$7 = (n2) => (vue.pushScopeId("data-v-7f81cb15"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$8 = { class: "toolbar" };
  const _hoisted_2$7 = { class: "left" };
  const _hoisted_3$6 = { class: "right" };
  const _hoisted_4$5 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M28 6H42V20",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M25.7998 22.1999L41.0998 6.8999",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_5$4 = [
    _hoisted_4$5
  ];
  const _hoisted_6$4 = {
    key: 1,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_7$3 = ["fill", "stroke"];
  const _hoisted_8$3 = ["fill", "stroke"];
  const _hoisted_9$3 = ["fill", "stroke"];
  const _hoisted_10$2 = {
    key: 1,
    width: "19",
    height: "19",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_11$2 = /* @__PURE__ */ vue.createStaticVNode('<path d="M36 35H12V21C12 14.3726 17.3726 9 24 9C30.6274 9 36 14.3726 36 21V35Z" fill="#929596" stroke="#929596" stroke-width="4" stroke-linejoin="round" data-v-7f81cb15></path><path d="M8 42H40" stroke="#929596" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-v-7f81cb15></path><path d="M4 13L7 14" stroke="#929596" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-v-7f81cb15></path><path d="M13 3.9999L14 6.9999" stroke="#929596" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-v-7f81cb15></path><path d="M10.0001 9.99989L7.00009 6.99989" stroke="#929596" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-v-7f81cb15></path>', 5);
  const _hoisted_16$2 = [
    _hoisted_11$2
  ];
  const _hoisted_17$2 = {
    key: 1,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_18$2 = ["fill", "stroke"];
  const _hoisted_19$2 = { key: 2 };
  const _hoisted_20$2 = /* @__PURE__ */ vue.createStaticVNode('<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-7f81cb15><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="#929596" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7f81cb15></path><path d="M23 21H25.0025" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-7f81cb15></path><path d="M33.001 21H34.9999" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-7f81cb15></path><path d="M13.001 21H14.9999" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-7f81cb15></path></svg>', 1);
  const _hoisted_21$2 = [
    _hoisted_20$2
  ];
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_BaseLoading = vue.resolveComponent("BaseLoading");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
      vue.createElementVNode("div", _hoisted_2$7, [
        vue.createElementVNode("div", null, vue.toDisplayString($options.post.createDate.substring(0, 16)), 1)
      ]),
      vue.createElementVNode("div", _hoisted_3$6, [
        vue.createElementVNode("div", {
          class: "tool",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.tweet && $options.tweet(...args))
        }, _hoisted_5$4),
        $options.post.once ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(["tool", { "disabled": $data.loading2 }]),
          onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleIgnore && $options.toggleIgnore(...args))
        }, [
          $data.loading2 ? (vue.openBlock(), vue.createBlock(_component_BaseLoading, {
            key: 0,
            size: "small"
          })) : (vue.openBlock(), vue.createElementBlock("svg", _hoisted_6$4, [
            vue.createElementVNode("path", {
              fill: $options.getIsFull($options.post.isIgnore),
              stroke: $options.getColor($options.post.isIgnore),
              d: "M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 8, _hoisted_7$3),
            vue.createElementVNode("path", {
              fill: $options.getIsFull($options.post.isIgnore),
              d: "M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705",
              stroke: $options.getColor($options.post.isIgnore),
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 8, _hoisted_8$3),
            vue.createElementVNode("path", {
              d: "M42 42L6 6",
              fill: $options.getIsFull($options.post.isIgnore),
              stroke: $options.getColor($options.post.isIgnore),
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 8, _hoisted_9$3)
          ]))
        ], 2)) : vue.createCommentVNode("", true),
        $options.post.once && $options.isLogin && false ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: vue.normalizeClass(["tool", { "disabled": $data.loading3 }]),
          onClick: _cache[2] || (_cache[2] = (...args) => $options.report && $options.report(...args))
        }, [
          $data.loading3 ? (vue.openBlock(), vue.createBlock(_component_BaseLoading, {
            key: 0,
            size: "small"
          })) : (vue.openBlock(), vue.createElementBlock("svg", _hoisted_10$2, _hoisted_16$2)),
          vue.createElementVNode("span", null, vue.toDisplayString($options.post.isReport ? "你已对本主题进行了报告" : "报告这个主题"), 1)
        ], 2)) : vue.createCommentVNode("", true),
        $options.post.once ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 2,
          class: vue.normalizeClass(["tool", { disabled: $data.loading }]),
          onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleFavorite && $options.toggleFavorite(...args))
        }, [
          $data.loading ? (vue.openBlock(), vue.createBlock(_component_BaseLoading, {
            key: 0,
            size: "small"
          })) : (vue.openBlock(), vue.createElementBlock("svg", _hoisted_17$2, [
            vue.createElementVNode("path", {
              d: "M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z",
              fill: $options.getIsFull($options.post.isFavorite),
              stroke: $options.getColor($options.post.isFavorite),
              "stroke-width": "2",
              "stroke-linejoin": "round"
            }, null, 8, _hoisted_18$2)
          ])),
          $options.post.collectCount !== 0 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_19$2, vue.toDisplayString($options.post.collectCount), 1)) : vue.createCommentVNode("", true)
        ], 2)) : vue.createCommentVNode("", true),
        vue.createElementVNode("div", {
          class: "tool",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.checkIsLogin("reply"))
        }, _hoisted_21$2)
      ])
    ]);
  }
  const Toolbar = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$3], ["__scopeId", "data-v-7f81cb15"]]);
  const _withScopeId$6 = (n2) => (vue.pushScopeId("data-v-953d8ab1"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$7 = ["href"];
  const _hoisted_2$6 = ["src"];
  const _hoisted_3$5 = { class: "texts" };
  const _hoisted_4$4 = {
    key: 0,
    class: "point"
  };
  const _hoisted_5$3 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 48 48",
    fill: "none"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z",
      fill: "#E02A2A",
      stroke: "#E02A2A",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_6$3 = { class: "link-num" };
  const _hoisted_7$2 = { class: "my-tag" };
  const _hoisted_8$2 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_9$2 = {
    key: 2,
    class: "ago"
  };
  const _hoisted_10$1 = {
    key: 3,
    class: "mod"
  };
  const _hoisted_11$1 = {
    key: 4,
    class: "owner"
  };
  const _hoisted_12$1 = ["href"];
  const _hoisted_13$1 = {
    key: 5,
    class: "owner"
  };
  const _hoisted_14$1 = {
    key: 6,
    class: "mod"
  };
  const _hoisted_15$1 = {
    key: 7,
    class: "ago"
  };
  const _hoisted_16$1 = { class: "my-tag" };
  const _hoisted_17$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_18$1 = {
    key: 9,
    class: "point"
  };
  const _hoisted_19$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 48 48",
    fill: "none"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z",
      fill: "#E02A2A",
      stroke: "#E02A2A",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_20$1 = { class: "link-num" };
  const _hoisted_21$1 = ["href"];
  const _hoisted_22$1 = ["src"];
  const _hoisted_23$1 = { class: "Author-right" };
  const _hoisted_24$1 = { class: "floor" };
  const _hoisted_25$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("span", null, "跳转", -1));
  const _hoisted_26$1 = [
    _hoisted_25$1
  ];
  const _sfc_main$7 = {
    __name: "SingleComment",
    props: {
      comment: {
        reply_content: ""
      },
      isRight: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    setup(__props) {
      const config2 = vue.inject("config");
      const isLogin = vue.inject("isLogin");
      const tags = vue.inject("tags");
      const props = __props;
      const myTags = vue.computed(() => {
        return tags[props.comment.username] ?? [];
      });
      function jump() {
        eventBus.emit(CMD.JUMP, props.comment.floor);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["comment", { isSimple: vue.unref(config2).viewType === "simple" }]),
          ref: "comment"
        }, [
          !__props.isRight ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 0,
            class: "avatar",
            href: `/member/${__props.comment.username}`
          }, [
            vue.createElementVNode("img", {
              src: __props.comment.avatar,
              alt: ""
            }, null, 8, _hoisted_2$6)
          ], 8, _hoisted_1$7)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(["comment-body", { isRight: __props.isRight }])
          }, [
            vue.createElementVNode("div", _hoisted_3$5, [
              __props.comment.thankCount && __props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$4, [
                _hoisted_5$3,
                vue.createElementVNode("div", _hoisted_6$3, vue.toDisplayString(__props.comment.thankCount), 1)
              ])) : vue.createCommentVNode("", true),
              vue.unref(isLogin) && vue.unref(config2).openTag && __props.isRight ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(myTags.value, (i) => {
                return vue.openBlock(), vue.createElementBlock("span", _hoisted_7$2, [
                  _hoisted_8$2,
                  vue.createElementVNode("span", null, vue.toDisplayString(i), 1)
                ]);
              }), 256)) : vue.createCommentVNode("", true),
              __props.isRight ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9$2, vue.toDisplayString(__props.comment.date), 1)) : vue.createCommentVNode("", true),
              __props.comment.isMod && __props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10$1, "MOD")) : vue.createCommentVNode("", true),
              __props.comment.isOp && __props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$1, "OP")) : vue.createCommentVNode("", true),
              vue.createElementVNode("a", {
                href: `/member/${__props.comment.username}`,
                class: "username"
              }, vue.toDisplayString(__props.comment.username), 9, _hoisted_12$1),
              __props.comment.isOp && !__props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13$1, "OP")) : vue.createCommentVNode("", true),
              __props.comment.isMod && !__props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14$1, "MOD")) : vue.createCommentVNode("", true),
              !__props.isRight ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_15$1, vue.toDisplayString(__props.comment.date), 1)) : vue.createCommentVNode("", true),
              vue.unref(isLogin) && vue.unref(config2).openTag && !__props.isRight ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 8 }, vue.renderList(myTags.value, (i) => {
                return vue.openBlock(), vue.createElementBlock("span", _hoisted_16$1, [
                  _hoisted_17$1,
                  vue.createElementVNode("span", null, vue.toDisplayString(i), 1)
                ]);
              }), 256)) : vue.createCommentVNode("", true),
              __props.comment.thankCount && !__props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_18$1, [
                _hoisted_19$1,
                vue.createElementVNode("div", _hoisted_20$1, vue.toDisplayString(__props.comment.thankCount), 1)
              ])) : vue.createCommentVNode("", true)
            ]),
            vue.createVNode(BaseHtmlRender, {
              class: "reply_content",
              html: __props.comment.reply_content
            }, null, 8, ["html"])
          ], 2),
          __props.isRight ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 1,
            class: "avatar",
            href: `/member/${__props.comment.username}`
          }, [
            vue.createElementVNode("img", {
              src: __props.comment.avatar,
              alt: ""
            }, null, 8, _hoisted_22$1)
          ], 8, _hoisted_21$1)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", _hoisted_23$1, [
            vue.createElementVNode("div", _hoisted_24$1, vue.toDisplayString(__props.comment.floor), 1),
            vue.createElementVNode("div", {
              class: "tool jump",
              onClick: jump
            }, _hoisted_26$1)
          ])
        ], 2);
      };
    }
  };
  const SingleComment = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-953d8ab1"]]);
  function debounce(fn, delay, scope) {
    let timer = null;
    return function() {
      let context = scope || this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
        timer = null;
      }, delay);
    };
  }
  const _sfc_main$6 = {
    name: "detail",
    components: {
      MoreIcon,
      BaseButton,
      SingleComment,
      PopConfirm,
      Comment,
      PostEditor,
      Point,
      Toolbar,
      BaseHtmlRender,
      Tooltip,
      BaseLoading
    },
    inject: ["allReplyUsers", "user", "post", "isMobile", "tags", "isLogin", "config", "pageType", "isNight", "showConfig"],
    provide() {
      return {
        postDetailWidth: vue.computed(() => this.postDetailWidth)
      };
    },
    props: {
      modelValue: {
        type: Boolean,
        default() {
          return false;
        }
      },
      loading: {
        type: Boolean,
        default() {
          return false;
        }
      },
      refreshLoading: {
        type: Boolean,
        default() {
          return false;
        }
      },
      displayType: CommentDisplayType$1.FloorInFloorNoCallUser
    },
    data() {
      return {
        isSticky: false,
        selectCallIndex: 0,
        postDetailWidth: 0,
        showCallList: false,
        showRelationReply: false,
        replyText: "",
        callStyle: {
          top: 0,
          left: 0
        },
        targetUser: {
          left: [],
          right: "",
          rightFloor: -1
        },
        debounceScroll: () => {
        },
        read: {
          floor: 0,
          total: 0
        },
        currentFloor: "",
        showOpTag: false,
        showChangeDisplayType: false,
        lastDisplayType: CommentDisplayType$1.FloorInFloorNoCallUser
      };
    },
    computed: {
      currentDisplayType() {
        let judge = this.displayType;
        if ([CommentDisplayType$1.New, CommentDisplayType$1.Like].includes(this.displayType)) {
          judge = this.lastDisplayType;
        }
        switch (judge) {
          case CommentDisplayType$1.FloorInFloorNoCallUser:
            return "楼中楼";
          case CommentDisplayType$1.FloorInFloor:
            return "楼中楼(@)";
          case CommentDisplayType$1.FloorInFloorNested:
            return "冗余楼中楼";
          case CommentDisplayType$1.V2exOrigin:
            return "V2原版";
          case CommentDisplayType$1.OnlyOp:
            return "只看楼主";
        }
        return "";
      },
      isMy() {
        return this.post.member.username === window.user.username;
      },
      myTags() {
        return this.tags[this.post.member.username] ?? [];
      },
      CommentDisplayType() {
        return CommentDisplayType$1;
      },
      isPost() {
        return this.pageType === PageType.Post;
      },
      filterCallList() {
        if (this.showCallList) {
          let list = ["管理员", "所有人"].concat(this.allReplyUsers);
          if (this.replyText)
            return list.filter((i) => i.search(this.replyText) > -1);
          return list;
        }
        return [];
      },
      topReply() {
        return this.post.replyList.filter((v) => v.thankCount >= this.config.topReplyLoveMinCount).sort((a, b) => b.thankCount - a.thankCount).slice(0, this.config.topReplyCount);
      },
      replyList() {
        if ([CommentDisplayType$1.FloorInFloor, CommentDisplayType$1.FloorInFloorNoCallUser].includes(this.displayType))
          return this.post.nestedReplies;
        if (this.displayType === CommentDisplayType$1.Like) {
          return window.clone(this.post.nestedReplies).sort((a, b) => b.thankCount - a.thankCount);
        }
        if (this.displayType === CommentDisplayType$1.V2exOrigin)
          return this.post.replyList;
        if (this.displayType === CommentDisplayType$1.FloorInFloorNested)
          return this.post.nestedRedundReplies;
        if (this.displayType === CommentDisplayType$1.OnlyOp)
          return this.post.replyList.filter((v) => {
            var _a;
            return v.username === ((_a = this.post.member) == null ? void 0 : _a.username);
          });
        return [];
      },
      //关联回复
      relationReply() {
        if (this.targetUser.left.length && this.targetUser.right) {
          return this.post.replyList.filter((v) => {
            if (this.targetUser.left.includes(v.username)) {
              if (v.floor > this.targetUser.rightFloor) {
                if (v.replyUsers.includes(this.targetUser.right)) {
                  return true;
                }
              } else {
                return true;
              }
            }
            if (v.username === this.targetUser.right) {
              for (let i = 0; i < this.targetUser.left.length; i++) {
                if (v.replyUsers.includes(this.targetUser.left[i])) {
                  return true;
                }
              }
            }
          });
        }
        return [];
      }
    },
    watch: {
      "post.id"(n2, o) {
        if (this.$refs["post-editor"]) {
          this.$refs["post-editor"].content = "";
          vue.nextTick(() => {
            var _a, _b;
            (_b = (_a = this.$refs) == null ? void 0 : _a.detail) == null ? void 0 : _b.scrollTo({ top: 0 });
          });
        }
      },
      "post.headerTemplate"(n2, o) {
        let mountEl = document.querySelector(".main-wrapper .post-wrapper .html-wrapper .header");
        if (mountEl) {
          this.showOpTag = true;
        }
      },
      modelValue: {
        handler(newVal) {
          if (this.isPost) {
            return;
          }
          if (newVal) {
            document.body.style.overflow = "hidden";
            if (!window.history.state) {
              window.history.pushState({}, 0, this.post.url);
            }
            this.read = this.post.read;
            this.currentFloor = "";
            vue.nextTick(() => {
              var _a, _b;
              window.document.title = this.post.title ?? "V2EX";
              (_b = (_a = this.$refs) == null ? void 0 : _a.main) == null ? void 0 : _b.focus();
            });
          } else {
            this.$emit("saveReadList");
            document.body.style.overflow = "unset";
            window.document.title = "V2EX";
            this.isSticky = false;
            this.showRelationReply = false;
            if (window.history.state) {
              window.history.back();
            }
          }
        }
      }
    },
    mounted() {
      setTimeout(() => {
        var _a;
        this.postDetailWidth = ((_a = this.$refs.mainWrapper) == null ? void 0 : _a.getBoundingClientRect().width) || 0;
      });
      this.debounceScroll = debounce(this.scroll, 300, false);
      if (this.isLogin) {
        const observer = new IntersectionObserver(
          ([e2]) => e2.target.toggleAttribute("stuck", e2.intersectionRatio < 1),
          { threshold: [1] }
        );
        observer.observe(this.$refs.replyBox);
        window.addEventListener("keydown", this.onKeyDown);
      }
      eventBus.on(CMD.SHOW_CALL, (val) => {
        if (val.show) {
          this.showCallList = true;
          this.replyText = val.text;
          if (this.isPost) {
            this.callStyle.top = val.top + $(window.win()).scrollTop() + -40 + "px";
          } else {
            this.callStyle.top = val.top + $(".post-detail").scrollTop() + 15 + "px";
          }
          this.callStyle.left = val.left - $(".main")[0].getBoundingClientRect().left + 10 + "px";
          if (this.selectCallIndex >= this.filterCallList.length) {
            this.selectCallIndex = 0;
          }
        } else {
          this.replyText = "";
          this.showCallList = false;
          this.selectCallIndex = 0;
        }
      });
      eventBus.on(CMD.RELATION_REPLY, (val) => {
        this.targetUser = val;
        this.showRelationReply = true;
      });
      eventBus.on(CMD.JUMP, this.jump);
      if (this.isPost) {
        window.addEventListener("scroll", this.debounceScroll);
      }
    },
    beforeUnmount() {
      window.removeEventListener("keydown", this.onKeyDown);
      eventBus.off(CMD.SHOW_CALL);
    },
    methods: {
      clickAvatar() {
        let menu = $("#menu-body");
        if (menu.css("--show-dropdown") === "block") {
          menu.css("--show-dropdown", "none");
        } else {
          menu.css("--show-dropdown", "block");
        }
      },
      clickDisplayType() {
        if ([CommentDisplayType$1.New, CommentDisplayType$1.Like].includes(this.displayType)) {
          return this.changeOption(this.lastDisplayType);
        }
        this.showChangeDisplayType = !this.showChangeDisplayType;
      },
      addTag() {
        eventBus.emit(CMD.ADD_TAG, this.post.member.username);
      },
      removeTag(tag) {
        eventBus.emit(CMD.REMOVE_TAG, { username: this.post.member.username, tag });
      },
      scroll() {
        if (!this.config.rememberLastReadFloor)
          return;
        let height = window.innerHeight * 0.3;
        let comments = $(".comments  .comment");
        let forCount = 0;
        for (let i = 0; i < comments.length; i++) {
          forCount++;
          let ins = comments[i];
          let rect = ins.getBoundingClientRect();
          if (rect.top > height) {
            let lastReadFloor = Number(ins.dataset["floor"]);
            console.log("当前阅读楼层", lastReadFloor);
            eventBus.emit(CMD.ADD_READ, {
              floor: lastReadFloor > 3 ? lastReadFloor : 0,
              total: this.post.replyList.length
            });
            if (lastReadFloor > 3) {
              this.read.floor = 0;
            }
            break;
          }
        }
        if (forCount === comments.length) {
          console.log("看到最后了");
          eventBus.emit(CMD.ADD_READ, {
            floor: forCount,
            total: this.post.replyList.length
          });
        }
      },
      stop(e2) {
      },
      jump(floor) {
        let lastItem = this.replyList[this.replyList.length - 1];
        if (floor === "") {
          floor = lastItem.floor;
        } else {
          try {
            floor = Number(floor);
          } catch (e2) {
            floor = lastItem.floor;
          }
          if (floor === 0) {
            floor = 1;
          }
          if (floor > lastItem.floor)
            floor = lastItem.floor;
        }
        if (!this.post.replyList.length) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "没有回复可跳转！" });
          this.read.floor = 0;
          return;
        }
        if (floor > this.post.replyList.length) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "没有找到对应回复！" });
          this.read.floor = 0;
          return;
        }
        let comment = $(`.c_${floor}`);
        if (!comment.length) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "没有找到对应回复！" });
          this.read.floor = 0;
          return;
        }
        comment[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        comment.addClass("ding");
        this.read.floor = 0;
        this.currentFloor = floor + 1;
        setTimeout(() => {
          comment.removeClass("ding");
        }, 2e3);
      },
      jumpLastRead(floor) {
        if (this.config.autoJumpLastReadFloor) {
          if (!floor)
            return;
          setTimeout(() => {
            console.log("上次跳转", floor);
            this.jump(floor);
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "已跳转到上次阅读位置" });
          }, 300);
        }
      },
      collapseTopReplyList() {
        $(this.$refs.topReply).slideToggle("fast");
      },
      goBottom() {
        this.isSticky = false;
        setTimeout(() => {
          if (this.isPost) {
            let body = $("body , html");
            let scrollHeight = body.prop("scrollHeight");
            body.animate({ scrollTop: scrollHeight - 850 }, 300);
          } else {
            this.$refs.detail.scrollTo({ top: this.$refs.detail.scrollHeight, behavior: "smooth" });
          }
        });
      },
      close(from) {
        if (this.isPost)
          return;
        if (from === "space") {
          if (this.config.closePostDetailBySpace) {
            this.$emit("update:modelValue", false);
          }
        } else {
          this.$emit("update:modelValue", false);
        }
      },
      setCall(e2) {
        eventBus.emit(CMD.SET_CALL, e2);
        this.showCallList = false;
      },
      onKeyDown(e2) {
        if (!this.modelValue)
          return;
        if (!this.showCallList)
          return;
        let length = this.filterCallList.slice(0, 10).length;
        if (e2.keyCode === 13) {
          this.setCall(this.filterCallList[this.selectCallIndex]);
          e2.preventDefault();
        }
        if (e2.keyCode === 38) {
          this.selectCallIndex--;
          if (this.selectCallIndex < 0) {
            this.selectCallIndex = length - 1;
          }
          e2.preventDefault();
        }
        if (e2.keyCode === 40) {
          this.selectCallIndex++;
          if (this.selectCallIndex > length - 1) {
            this.selectCallIndex = 0;
          }
          e2.preventDefault();
        }
      },
      changeOption(item) {
        if (![CommentDisplayType$1.New, CommentDisplayType$1.Like].includes(this.displayType)) {
          this.lastDisplayType = this.displayType;
        }
        this.$emit("update:displayType", item);
        this.showChangeDisplayType = false;
      },
      addThank() {
        eventBus.emit(CMD.CHANGE_POST_THANK, { id: this.post.id, type: "add" });
      },
      recallThank() {
        eventBus.emit(CMD.CHANGE_POST_THANK, { id: this.post.id, type: "recall" });
      },
      scrollTop() {
        if (this.isPost) {
          $("body , html").animate({ scrollTop: 0 }, 300);
        } else {
          this.$refs.detail.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };
  const _withScopeId$5 = (n2) => (vue.pushScopeId("data-v-723e2e62"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$6 = { class: "my-box nav-bar" };
  const _hoisted_2$5 = { class: "left" };
  const _hoisted_3$4 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1.5",
    d: "M20 12H4m0 0l6-6m-6 6l6 6"
  }, null, -1));
  const _hoisted_4$3 = [
    _hoisted_3$4
  ];
  const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("a", { href: "/" }, "V2EX", -1));
  const _hoisted_6$2 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", { class: "chevron" }, "  ›  ", -1));
  const _hoisted_7$1 = ["href"];
  const _hoisted_8$1 = { class: "right" };
  const _hoisted_9$1 = ["src"];
  const _hoisted_10 = { class: "my-box post-wrapper" };
  const _hoisted_11 = { class: "box-content" };
  const _hoisted_12 = { class: "header" };
  const _hoisted_13 = { class: "gray" };
  const _hoisted_14 = ["href"];
  const _hoisted_15 = ["src", "alt"];
  const _hoisted_16 = { class: "info" };
  const _hoisted_17 = { class: "top" };
  const _hoisted_18 = ["href"];
  const _hoisted_19 = {
    key: 0,
    class: "center"
  };
  const _hoisted_20 = { class: "my-tag" };
  const _hoisted_21 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_22 = ["onClick"];
  const _hoisted_23 = { class: "bottom" };
  const _hoisted_24 = ["title"];
  const _hoisted_25 = ["href"];
  const _hoisted_26 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("li", { class: "fa fa-info-circle" }, null, -1));
  const _hoisted_27 = [
    _hoisted_26
  ];
  const _hoisted_28 = ["href"];
  const _hoisted_29 = {
    key: 0,
    class: "my-box"
  };
  const _hoisted_30 = { class: "my-cell flex" };
  const _hoisted_31 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", { class: "" }, "高赞回复", -1));
  const _hoisted_32 = { class: "top-reply" };
  const _hoisted_33 = { ref: "topReply" };
  const _hoisted_34 = {
    key: 1,
    class: "my-box my-cell"
  };
  const _hoisted_35 = ["innerHTML"];
  const _hoisted_36 = { class: "my-box comment-wrapper" };
  const _hoisted_37 = {
    key: 0,
    class: "my-cell flex"
  };
  const _hoisted_38 = { class: "display-type" };
  const _hoisted_39 = { style: { "position": "relative" } };
  const _hoisted_40 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "48",
    height: "48",
    viewBox: "0 0 48 48"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "4",
      d: "M36 18L24 30L12 18"
    })
  ], -1));
  const _hoisted_41 = {
    key: 0,
    class: "type-list"
  };
  const _hoisted_42 = {
    key: 0,
    class: "loading-wrapper"
  };
  const _hoisted_43 = {
    key: 1,
    class: "comments"
  };
  const _hoisted_44 = {
    key: 2,
    id: "no-comments-yet"
  };
  const _hoisted_45 = { class: "my-cell flex" };
  const _hoisted_46 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", null, "添加一条新回复", -1));
  const _hoisted_47 = { class: "notice-right gray" };
  const _hoisted_48 = { class: "p1" };
  const _hoisted_49 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", { class: "gray" }, "上下文", -1));
  const _hoisted_50 = { class: "top-reply" };
  const _hoisted_51 = ["onClick"];
  const _hoisted_52 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", {
    class: "fa fa-long-arrow-up",
    "aria-hidden": "true"
  }, null, -1));
  const _hoisted_53 = [
    _hoisted_52
  ];
  const _hoisted_54 = {
    key: 1,
    class: "fa fa-refresh",
    "aria-hidden": "true"
  };
  const _hoisted_55 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-long-arrow-down" }, null, -1));
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_MoreIcon = vue.resolveComponent("MoreIcon");
    const _component_BaseHtmlRender = vue.resolveComponent("BaseHtmlRender");
    const _component_Point = vue.resolveComponent("Point");
    const _component_Toolbar = vue.resolveComponent("Toolbar");
    const _component_Comment = vue.resolveComponent("Comment");
    const _component_BaseLoading = vue.resolveComponent("BaseLoading");
    const _component_PostEditor = vue.resolveComponent("PostEditor");
    const _component_SingleComment = vue.resolveComponent("SingleComment");
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["post-detail", [$options.isNight ? "isNight" : "", $options.pageType, $options.isMobile ? "mobile" : ""]]),
      ref: "detail",
      onScroll: _cache[26] || (_cache[26] = (...args) => $data.debounceScroll && $data.debounceScroll(...args)),
      onClick: _cache[27] || (_cache[27] = ($event) => $options.close("space"))
    }, [
      vue.createElementVNode("div", {
        ref: "main",
        class: "main",
        tabindex: "1",
        onClick: _cache[25] || (_cache[25] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"]))
      }, [
        vue.createElementVNode("div", _hoisted_1$6, [
          vue.createElementVNode("div", _hoisted_2$5, [
            (vue.openBlock(), vue.createElementBlock("svg", {
              onClick: _cache[0] || (_cache[0] = ($event) => $options.close("btn")),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24"
            }, _hoisted_4$3)),
            _hoisted_5$2,
            _hoisted_6$2,
            vue.createElementVNode("a", {
              href: $options.post.node.url
            }, vue.toDisplayString($options.post.node.title), 9, _hoisted_7$1)
          ]),
          vue.createElementVNode("div", _hoisted_8$1, [
            $options.user.avatar ? (vue.openBlock(), vue.createElementBlock("img", {
              key: 0,
              onClick: _cache[1] || (_cache[1] = (...args) => $options.clickAvatar && $options.clickAvatar(...args)),
              style: { "margin-right": "0" },
              class: "avatar mobile",
              src: $options.user.avatar
            }, null, 8, _hoisted_9$1)) : vue.createCommentVNode("", true),
            vue.createVNode(_component_MoreIcon)
          ])
        ]),
        vue.createElementVNode("div", {
          class: "main-wrapper",
          ref: "mainWrapper",
          style: vue.normalizeStyle({ width: $options.config.postWidth })
        }, [
          vue.createElementVNode("div", _hoisted_10, [
            vue.createElementVNode("div", _hoisted_11, [
              vue.createElementVNode("div", _hoisted_12, [
                vue.createElementVNode("h1", null, vue.toDisplayString($options.post.title), 1),
                vue.createElementVNode("small", _hoisted_13, [
                  $options.post.member.avatar_large ? (vue.openBlock(), vue.createElementBlock("a", {
                    key: 0,
                    class: "avatar",
                    href: `/member/${$options.post.member.username}`
                  }, [
                    vue.createElementVNode("img", {
                      src: $options.post.member.avatar_large,
                      border: "0",
                      align: "default",
                      alt: $options.post.member.username
                    }, null, 8, _hoisted_15)
                  ], 8, _hoisted_14)) : vue.createCommentVNode("", true),
                  vue.createElementVNode("div", _hoisted_16, [
                    vue.createElementVNode("div", _hoisted_17, [
                      vue.createElementVNode("a", {
                        href: `/member/${$options.post.member.username}`
                      }, vue.toDisplayString($options.post.member.username), 9, _hoisted_18),
                      vue.createTextVNode(" · "),
                      $options.post.member.createDate ? (vue.openBlock(), vue.createElementBlock("span", {
                        key: 0,
                        class: vue.normalizeClass($options.post.member.isNew && "danger")
                      }, vue.toDisplayString($options.post.member.createDate), 3)) : vue.createCommentVNode("", true)
                    ]),
                    $options.isLogin && $options.config.openTag ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_19, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.myTags, (i) => {
                        return vue.openBlock(), vue.createElementBlock("span", _hoisted_20, [
                          _hoisted_21,
                          vue.createElementVNode("span", null, vue.toDisplayString(i), 1),
                          vue.createElementVNode("i", {
                            class: "fa fa-trash-o remove",
                            onClick: ($event) => $options.removeTag(i)
                          }, null, 8, _hoisted_22)
                        ]);
                      }), 256)),
                      vue.createElementVNode("span", {
                        class: "add-tag ago",
                        onClick: _cache[2] || (_cache[2] = (...args) => $options.addTag && $options.addTag(...args)),
                        title: "添加标签"
                      }, "+")
                    ])) : vue.createCommentVNode("", true),
                    vue.createElementVNode("div", _hoisted_23, [
                      $options.post.createDateAgo ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                        vue.createElementVNode("span", {
                          title: $options.post.createDate
                        }, vue.toDisplayString($options.post.createDateAgo), 9, _hoisted_24),
                        vue.createTextVNode(" · ")
                      ], 64)) : vue.createCommentVNode("", true),
                      vue.createTextVNode(" " + vue.toDisplayString($options.post.clickCount) + " 次点击 ", 1),
                      $options.isMy ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                        vue.createTextVNode("   "),
                        vue.createElementVNode("a", {
                          href: `/t/${$options.post.id}/info`
                        }, _hoisted_27, 8, _hoisted_25),
                        vue.createTextVNode("   "),
                        vue.createElementVNode("a", {
                          href: `/append/topic/${$options.post.id}`,
                          class: "op"
                        }, "APPEND", 8, _hoisted_28)
                      ], 64)) : vue.createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              vue.createVNode(_component_BaseHtmlRender, {
                html: $options.post.headerTemplate
              }, null, 8, ["html"])
            ]),
            vue.createVNode(_component_Toolbar, {
              onReply: _cache[3] || (_cache[3] = ($event) => $data.isSticky = !$data.isSticky)
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_Point, {
                  onAddThank: $options.addThank,
                  onRecallThank: $options.recallThank,
                  full: false,
                  item: {
                    isThanked: $options.post.isThanked,
                    thankCount: $options.post.thankCount,
                    username: $options.post.username
                  },
                  "api-url": "topic/" + $options.post.id
                }, null, 8, ["onAddThank", "onRecallThank", "item", "api-url"])
              ]),
              _: 1
            })
          ]),
          $options.topReply.length && $options.config.showTopReply ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_29, [
            vue.createElementVNode("div", _hoisted_30, [
              _hoisted_31,
              vue.createElementVNode("div", _hoisted_32, [
                vue.createElementVNode("i", {
                  class: "fa fa-compress",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.collapseTopReplyList && $options.collapseTopReplyList(...args))
                })
              ])
            ]),
            vue.createElementVNode("div", _hoisted_33, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.topReply, (item, index2) => {
                return vue.openBlock(), vue.createBlock(_component_Comment, {
                  key: item.floor,
                  type: "top",
                  modelValue: $options.topReply[index2],
                  "onUpdate:modelValue": ($event) => $options.topReply[index2] = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"]);
              }), 128))
            ], 512)
          ])) : vue.createCommentVNode("", true),
          $options.isMobile && false ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_34, [
            vue.createElementVNode("div", {
              class: "inner",
              innerHTML: $options.post.fr
            }, null, 8, _hoisted_35)
          ])) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", _hoisted_36, [
            $options.post.replyList.length || $props.loading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_37, [
              vue.createElementVNode("span", null, vue.toDisplayString($options.post.replyCount) + " 条回复", 1),
              vue.createElementVNode("div", _hoisted_38, [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(["type", $props.displayType === $options.CommentDisplayType.Like && "active"]),
                  onClick: _cache[5] || (_cache[5] = ($event) => $options.changeOption($options.CommentDisplayType.Like))
                }, "最热 ", 2),
                vue.createElementVNode("div", _hoisted_39, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["type", ![$options.CommentDisplayType.New, $options.CommentDisplayType.Like].includes($props.displayType) && "active"]),
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.clickDisplayType && $options.clickDisplayType(...args))
                  }, [
                    vue.createElementVNode("span", null, vue.toDisplayString($options.currentDisplayType), 1),
                    _hoisted_40
                  ], 2),
                  $data.showChangeDisplayType ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_41, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(["item", $props.displayType === $options.CommentDisplayType.FloorInFloorNoCallUser && "active"]),
                      onClick: _cache[7] || (_cache[7] = vue.withModifiers(($event) => $options.changeOption($options.CommentDisplayType.FloorInFloorNoCallUser), ["stop"]))
                    }, "楼中楼 ", 2),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(["item", $props.displayType === $options.CommentDisplayType.FloorInFloor && "active"]),
                      onClick: _cache[8] || (_cache[8] = vue.withModifiers(($event) => $options.changeOption($options.CommentDisplayType.FloorInFloor), ["stop"]))
                    }, "楼中楼(@) ", 2),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(["item", $props.displayType === $options.CommentDisplayType.FloorInFloorNested && "active"]),
                      onClick: _cache[9] || (_cache[9] = vue.withModifiers(($event) => $options.changeOption($options.CommentDisplayType.FloorInFloorNested), ["stop"]))
                    }, "冗余楼中楼 ", 2),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(["item", $props.displayType === $options.CommentDisplayType.OnlyOp && "active"]),
                      onClick: _cache[10] || (_cache[10] = vue.withModifiers(($event) => $options.changeOption($options.CommentDisplayType.OnlyOp), ["stop"]))
                    }, "只看楼主 ", 2),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(["item", $props.displayType === $options.CommentDisplayType.V2exOrigin && "active"]),
                      onClick: _cache[11] || (_cache[11] = vue.withModifiers(($event) => $options.changeOption($options.CommentDisplayType.V2exOrigin), ["stop"]))
                    }, "V2原版 ", 2)
                  ])) : vue.createCommentVNode("", true)
                ])
              ])
            ])) : vue.createCommentVNode("", true),
            $options.replyList.length || $props.loading ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              $props.loading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_42, [
                vue.createVNode(_component_BaseLoading, { size: "large" })
              ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_43, [
                $props.modelValue ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($options.replyList, (item, index2) => {
                  return vue.openBlock(), vue.createBlock(_component_Comment, {
                    key: item.floor,
                    modelValue: $options.replyList[index2],
                    "onUpdate:modelValue": ($event) => $options.replyList[index2] = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]);
                }), 128)) : vue.createCommentVNode("", true)
              ]))
            ], 64)) : vue.createCommentVNode("", true)
          ]),
          !($options.replyList.length || $props.loading) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_44, "目前尚无回复")) : vue.createCommentVNode("", true),
          $options.isLogin ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 3,
            class: vue.normalizeClass(["my-box", { "sticky": $data.isSticky }]),
            ref: "replyBox"
          }, [
            vue.createElementVNode("div", _hoisted_45, [
              _hoisted_46,
              vue.createElementVNode("div", _hoisted_47, [
                $data.isSticky ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  style: { "margin-right": "2rem" },
                  onClick: _cache[12] || (_cache[12] = ($event) => $data.isSticky = false)
                }, "取消回复框停靠")) : vue.createCommentVNode("", true),
                vue.createElementVNode("a", {
                  onClick: _cache[13] || (_cache[13] = (...args) => $options.scrollTop && $options.scrollTop(...args))
                }, "回到顶部")
              ])
            ]),
            vue.createElementVNode("div", _hoisted_48, [
              vue.createVNode(_component_PostEditor, {
                onClose: $options.goBottom,
                ref: "post-editor",
                useType: "reply-post",
                onClick: _cache[14] || (_cache[14] = ($event) => $data.isSticky = true)
              }, null, 8, ["onClose"])
            ])
          ], 2)) : vue.createCommentVNode("", true)
        ], 4),
        $data.showRelationReply ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "relationReply",
          onClick: _cache[18] || (_cache[18] = ($event) => $options.close("space"))
        }, [
          vue.createElementVNode("div", {
            class: "my-cell flex",
            onClick: _cache[16] || (_cache[16] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"]))
          }, [
            _hoisted_49,
            vue.createElementVNode("div", _hoisted_50, [
              vue.createElementVNode("i", {
                class: "fa fa-times",
                onClick: _cache[15] || (_cache[15] = ($event) => $data.showRelationReply = false)
              })
            ])
          ]),
          vue.createElementVNode("div", {
            class: "comments",
            onClick: _cache[17] || (_cache[17] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"]))
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.relationReply, (item, index2) => {
              return vue.openBlock(), vue.createBlock(_component_SingleComment, {
                "is-right": item.username === $data.targetUser.right,
                key: item.floor,
                comment: item
              }, null, 8, ["is-right", "comment"]);
            }), 128))
          ])
        ])) : vue.createCommentVNode("", true),
        $data.showCallList && $options.filterCallList.length ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "call-list",
          style: vue.normalizeStyle($data.callStyle)
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.filterCallList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(["call-item", { select: index2 === $data.selectCallIndex }]),
              onClick: ($event) => $options.setCall(item)
            }, [
              vue.createElementVNode("a", null, vue.toDisplayString(item), 1)
            ], 10, _hoisted_51);
          }), 256))
        ], 4)) : vue.createCommentVNode("", true),
        vue.createElementVNode("div", {
          class: "scroll-top gray",
          onClick: _cache[19] || (_cache[19] = vue.withModifiers((...args) => $options.scrollTop && $options.scrollTop(...args), ["stop"]))
        }, _hoisted_53),
        vue.createElementVNode("div", {
          class: "refresh gray",
          onClick: _cache[20] || (_cache[20] = vue.withModifiers(($event) => _ctx.$emit("refresh"), ["stop"]))
        }, [
          $props.refreshLoading ? (vue.openBlock(), vue.createBlock(_component_BaseLoading, { key: 0 })) : (vue.openBlock(), vue.createElementBlock("i", _hoisted_54))
        ]),
        vue.createElementVNode("div", {
          class: "scroll-to gray",
          onClick: _cache[24] || (_cache[24] = vue.withModifiers(($event) => $options.jump($data.currentFloor), ["stop"]))
        }, [
          _hoisted_55,
          vue.withDirectives(vue.createElementVNode("input", {
            type: "text",
            "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $data.currentFloor = $event),
            onClick: _cache[22] || (_cache[22] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"])),
            onKeydown: _cache[23] || (_cache[23] = vue.withKeys(($event) => $options.jump($data.currentFloor), ["enter"]))
          }, null, 544), [
            [vue.vModelText, $data.currentFloor]
          ])
        ])
      ], 512)
    ], 34)), [
      [vue.vShow, $props.modelValue]
    ]);
  }
  const PostDetail = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$2], ["__scopeId", "data-v-723e2e62"]]);
  const _withScopeId$4 = (n2) => (vue.pushScopeId("data-v-676e51be"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$5 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M17 32L19.1875 27M31 32L28.8125 27M19.1875 27L24 16L28.8125 27M19.1875 27H28.8125",
      stroke: "#929596",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M43.1999 20C41.3468 10.871 33.2758 4 23.5999 4C13.9241 4 5.85308 10.871 4 20L10 18",
      stroke: "#929596",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M4 28C5.85308 37.129 13.9241 44 23.5999 44C33.2758 44 41.3468 37.129 43.1999 28L38 30",
      stroke: "#929596",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_2$4 = { key: 1 };
  const _sfc_main$5 = {
    __name: "Base64Tooltip",
    setup(__props) {
      const tooltip = vue.ref(null);
      const show = vue.ref(false);
      const originalText = vue.ref("");
      const decodeText = vue.ref("");
      const styleObject = vue.reactive({
        left: "-100vw",
        top: "-100vh"
      });
      vue.onMounted(() => {
        eventBus.on(CMD.SHOW_TOOLTIP, ({ text, e: e2 }) => {
          setTimeout(() => show.value = true);
          originalText.value = text;
          decodeText.value = "";
          styleObject.left = e2.clientX + "px";
          styleObject.top = e2.clientY + 20 + "px";
        });
        window.addEventListener("click", (e2) => {
          if (!tooltip.value)
            return;
          if (!tooltip.value.contains(e2.target) && show.value) {
            show.value = false;
          }
        }, { capture: true });
        const fn = () => show.value && (show.value = false);
        $(".post-detail", window.win().doc).on("scroll", fn);
      });
      function copy() {
        if (window.win().navigator.clipboard) {
          window.win().navigator.clipboard.writeText(decodeText.value);
          eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "复制成功" });
        } else {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "复制失败！浏览器不支持！" });
        }
      }
      function base64ToArrayBuffer(base64) {
        let binary_string = window.atob(base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
      }
      function decode() {
        try {
          new Blob([base64ToArrayBuffer(originalText.value)]).text().then((r2) => {
            decodeText.value = r2;
          });
        } catch (e2) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "Base64解码失败！不是标准数据！" });
        }
      }
      return (_ctx, _cache) => {
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          class: "base64_tooltip",
          style: vue.normalizeStyle(styleObject),
          onClick: decode,
          ref_key: "tooltip",
          ref: tooltip
        }, [
          !decodeText.value ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createTextVNode(" Base64解码：" + vue.toDisplayString(originalText.value) + " ", 1),
            _hoisted_1$5
          ], 64)) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$4, [
            vue.createElementVNode("span", null, vue.toDisplayString(decodeText.value), 1),
            vue.createVNode(BaseButton, {
              class: "btn",
              size: "small",
              onClick: copy
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("点击复制")
              ]),
              _: 1
            })
          ]))
        ], 4)), [
          [vue.vShow, show.value]
        ]);
      };
    }
  };
  const Base64Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-676e51be"]]);
  const _sfc_main$4 = {
    name: "Msg",
    props: {
      type: "",
      text: ""
    },
    created() {
      setTimeout(() => {
        this.$emit("close");
      }, 3e3);
    }
  };
  const _withScopeId$3 = (n2) => (vue.pushScopeId("data-v-31e55c59"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M14 14L34 34",
      stroke: "#ffffff",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M14 34L34 14",
      stroke: "#ffffff",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_2$3 = [
    _hoisted_1$4
  ];
  const _hoisted_3$3 = { class: "right" };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["msg", $props.type])
    }, [
      vue.createElementVNode("div", {
        class: "left",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
      }, _hoisted_2$3),
      vue.createElementVNode("div", _hoisted_3$3, vue.toDisplayString($props.text), 1)
    ], 2);
  }
  const Msg = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__scopeId", "data-v-31e55c59"]]);
  const _withScopeId$2 = (n2) => (vue.pushScopeId("data-v-674b86aa"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$3 = {
    key: 0,
    class: "tag-modal modal"
  };
  const _hoisted_2$2 = { class: "wrapper" };
  const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, " 添加标签 ", -1));
  const _hoisted_4$2 = { class: "option" };
  const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode("span", null, "用户：", -1));
  const _hoisted_6$1 = { class: "btns" };
  const _sfc_main$3 = {
    __name: "TagModal",
    props: ["tags"],
    emits: ["update:tags"],
    setup(__props, { emit: __emit }) {
      const tagModal = vue.reactive({
        show: false,
        currentUsername: "",
        tag: ""
      });
      const props = __props;
      const emit = __emit;
      const inputRef = vue.ref();
      vue.onMounted(() => {
        eventBus.on(CMD.ADD_TAG, (username) => {
          tagModal.currentUsername = username;
          tagModal.show = true;
          vue.nextTick(() => {
            inputRef.value.focus();
          });
        });
      });
      async function addTag() {
        if (!tagModal.tag) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "请输入标签" });
          return;
        }
        let oldTag = window.clone(props.tags);
        let tempTag = window.clone(props.tags);
        let userTags = tempTag[tagModal.currentUsername] ?? [];
        let rIndex = userTags.findIndex((v) => v === tagModal.tag);
        if (rIndex > -1) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "标签已存在！" });
          return;
        } else {
          userTags.push(tagModal.tag);
        }
        tempTag[tagModal.currentUsername] = userTags;
        emit("update:tags", tempTag);
        tagModal.tag = "";
        tagModal.show = false;
        let res = await window.parse.saveTags(tempTag);
        if (!res) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "标签添加失败！" });
          emit("update:tags", oldTag);
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Transition, null, {
          default: vue.withCtx(() => [
            tagModal.show ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
              vue.createElementVNode("div", {
                class: "mask",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => tagModal.show = false, ["stop"]))
              }),
              vue.createElementVNode("div", _hoisted_2$2, [
                _hoisted_3$2,
                vue.createElementVNode("div", _hoisted_4$2, [
                  _hoisted_5$1,
                  vue.createElementVNode("div", null, [
                    vue.createElementVNode("b", null, vue.toDisplayString(tagModal.currentUsername), 1)
                  ])
                ]),
                vue.withDirectives(vue.createElementVNode("input", {
                  type: "text",
                  ref_key: "inputRef",
                  ref: inputRef,
                  style: { "width": "100%" },
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tagModal.tag = $event),
                  onKeydown: vue.withKeys(addTag, ["enter"])
                }, null, 544), [
                  [vue.vModelText, tagModal.tag]
                ]),
                vue.createElementVNode("div", _hoisted_6$1, [
                  vue.createVNode(BaseButton, {
                    type: "link",
                    onClick: _cache[2] || (_cache[2] = ($event) => tagModal.show = false)
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("取消")
                    ]),
                    _: 1
                  }),
                  vue.createVNode(BaseButton, { onClick: addTag }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("确定")
                    ]),
                    _: 1
                  })
                ])
              ])
            ])) : vue.createCommentVNode("", true)
          ]),
          _: 1
        });
      };
    }
  };
  const TagModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-674b86aa"]]);
  const _hoisted_1$2 = { class: "msgs" };
  const _sfc_main$2 = {
    __name: "MsgModal",
    setup(__props) {
      const msgList = vue.reactive([
        // {type: 'success', text: '123', id: Date.now()}
      ]);
      vue.onMounted(() => {
        eventBus.on(CMD.SHOW_MSG, (val) => {
          msgList.push({ ...val, id: Date.now() });
        });
      });
      function removeMsg(id) {
        let rIndex = msgList.findIndex((item) => item.id === id);
        if (rIndex > -1) {
          msgList.splice(rIndex, 1);
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(msgList, (v) => {
            return vue.openBlock(), vue.createBlock(Msg, {
              key: v.id,
              type: v.type,
              text: v.text,
              onClose: ($event) => removeMsg(v.id)
            }, null, 8, ["type", "text", "onClose"]);
          }), 128))
        ]);
      };
    }
  };
  const MsgModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5af31c45"]]);
  let u = ".__cf_email__", f = "data-cfemail", d = document.createElement("div");
  function e(e2) {
    console.error(e2);
  }
  function r(e2, t) {
    let r2 = e2.substr(t, 2);
    return parseInt(r2, 16);
  }
  function n(href, index2) {
    let o = "", a = r(href, index2);
    for (let i = index2 + 2; i < href.length; i += 2) {
      let l = r(href, i) ^ a;
      o += String.fromCharCode(l);
    }
    try {
      o = decodeURIComponent(escape(o));
    } catch (u2) {
      e(u2);
    }
    d.innerHTML = '<a href="' + o.replace(/"/g, "&quot;") + '"></a>';
    return d.childNodes[0].getAttribute("href") || "";
  }
  function decodeEmail(body) {
    try {
      let as = body.find(u);
      as.each(function() {
        try {
          let o = this, a = o.parentNode, i = o.getAttribute(f);
          if (i) {
            let l = n(i, 0), d2 = document.createTextNode(l);
            a.replaceChild(d2, o);
          }
        } catch (h) {
          e(h);
        }
      });
    } catch (s) {
      e(s);
    }
  }
  const _withScopeId$1 = (n2) => (vue.pushScopeId("data-v-19a5903e"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$1 = {
    key: 0,
    class: "tag-modal modal"
  };
  const _hoisted_2$1 = { class: "modal-root" };
  const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, " 提醒系统 ", -1));
  const _hoisted_4$1 = ["innerHTML"];
  const _sfc_main$1 = {
    __name: "NotificationModal",
    props: ["modelValue", "h"],
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      vue.onMounted(() => {
      });
      function close() {
        emit("update:modelValue", false);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Transition, null, {
          default: vue.withCtx(() => [
            __props.modelValue ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
              vue.createElementVNode("div", {
                class: "mask",
                onClick: vue.withModifiers(close, ["stop"])
              }),
              vue.createElementVNode("div", _hoisted_2$1, [
                vue.createElementVNode("div", { class: "modal-header" }, [
                  _hoisted_3$1,
                  vue.createElementVNode("i", {
                    class: "fa fa-times",
                    onClick: close
                  })
                ]),
                vue.createElementVNode("div", {
                  innerHTML: __props.h,
                  class: "modal-body"
                }, null, 8, _hoisted_4$1)
              ])
            ])) : vue.createCommentVNode("", true)
          ]),
          _: 1
        });
      };
    }
  };
  const NotificationModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-19a5903e"]]);
  var CommentDisplayType = /* @__PURE__ */ ((CommentDisplayType2) => {
    CommentDisplayType2[CommentDisplayType2["FloorInFloor"] = 0] = "FloorInFloor";
    CommentDisplayType2[CommentDisplayType2["FloorInFloorNoCallUser"] = 4] = "FloorInFloorNoCallUser";
    CommentDisplayType2[CommentDisplayType2["FloorInFloorNested"] = 5] = "FloorInFloorNested";
    CommentDisplayType2[CommentDisplayType2["Like"] = 1] = "Like";
    CommentDisplayType2[CommentDisplayType2["V2exOrigin"] = 2] = "V2exOrigin";
    CommentDisplayType2[CommentDisplayType2["OnlyOp"] = 3] = "OnlyOp";
    return CommentDisplayType2;
  })(CommentDisplayType || {});
  const MAX_REPLY_LIMIT = 300;
  var _GM_notification = /* @__PURE__ */ (() => typeof GM_notification != "undefined" ? GM_notification : void 0)();
  var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  const DefaultPost = {
    allReplyUsers: [],
    content_rendered: "",
    createDate: "",
    createDateAgo: "",
    fr: "",
    replyList: [],
    nestedReplies: [],
    nestedRedundReplies: [],
    username: "",
    url: "",
    member: {},
    node: {
      title: "",
      url: ""
    },
    headerTemplate: "",
    title: "",
    id: "",
    type: "post",
    once: "",
    replyCount: 0,
    clickCount: 0,
    thankCount: 0,
    collectCount: 0,
    lastReadFloor: 0,
    isFavorite: false,
    isIgnore: false,
    isThanked: false,
    isReport: false,
    inList: false
  };
  const DefaultUser = {
    tagPrefix: "--用户标签--",
    tags: {},
    tagsId: "",
    username: "",
    avatar: "",
    readPrefix: "--已读楼层--",
    readNoteItemId: "",
    readList: {},
    imgurPrefix: "--imgur图片删除hash--",
    imgurList: {},
    imgurNoteId: ""
  };
  const DefaultConfig = {
    showToolbar: true,
    showPreviewBtn: true,
    autoOpenDetail: true,
    openTag: true,
    //给用户打标签
    clickPostItemOpenDetail: true,
    closePostDetailBySpace: true,
    //点击空白处关闭详情
    contentAutoCollapse: true,
    //正文超长自动折叠
    viewType: "table",
    commentDisplayType: CommentDisplayType.FloorInFloorNoCallUser,
    newTabOpen: false,
    //新标签打开
    base64: true,
    //base功能
    sov2ex: false,
    postWidth: "",
    showTopReply: true,
    topReplyLoveMinCount: 3,
    topReplyCount: 3,
    autoJumpLastReadFloor: false,
    rememberLastReadFloor: true,
    autoSignin: true,
    customBgColor: "",
    version: 1,
    collectBrowserNotice: false
  };
  const functions = {
    //获取所有回复
    getAllReply(repliesMap = []) {
      return repliesMap.sort((a, b) => a.i - b.i).reduce((pre, i) => {
        pre = pre.concat(i.replyList);
        return pre;
      }, []);
    },
    //查找子回复
    findChildren(item, endList, all) {
      var _a;
      const fn = (child, endList2, parent2) => {
        child.level = parent2.level + 1;
        let rIndex = all.findIndex((v) => v.floor === child.floor);
        if (rIndex > -1) {
          all[rIndex].isUse = true;
        }
        parent2.children.push(this.findChildren(child, endList2, all));
      };
      item.children = [];
      let floorReplyList = [];
      for (let i = 0; i < endList.length; i++) {
        let currentItem = endList[i];
        if (currentItem.isUse)
          continue;
        if (currentItem.replyFloor === item.floor) {
          if (currentItem.replyUsers.length === 1 && currentItem.replyUsers[0] === item.username) {
            currentItem.isUse = true;
            floorReplyList.push({ endList: endList.slice(i + 1), currentItem });
          } else {
            currentItem.isWrong = true;
          }
        }
      }
      floorReplyList.reverse().map(({ currentItem, endList: endList2 }) => {
        fn(currentItem, endList2, item);
      });
      let nextMeIndex = endList.findIndex((v) => {
        var _a2;
        return v.username === item.username && ((_a2 = v.replyUsers) == null ? void 0 : _a2[0]) !== item.username;
      });
      let findList = nextMeIndex > -1 ? endList.slice(0, nextMeIndex) : endList;
      for (let i = 0; i < findList.length; i++) {
        let currentItem = findList[i];
        if (currentItem.isUse)
          continue;
        if (currentItem.replyUsers.length === 1) {
          if (currentItem.replyFloor !== -1) {
            if (((_a = all[currentItem.replyFloor - 1]) == null ? void 0 : _a.username) === currentItem.replyUsers[0]) {
              continue;
            }
          }
          let endList2 = endList.slice(i + 1);
          if (currentItem.username === item.username) {
            if (currentItem.replyUsers[0] === item.username) {
              fn(currentItem, endList2, item);
            }
            break;
          } else {
            if (currentItem.replyUsers[0] === item.username) {
              fn(currentItem, endList2, item);
            }
          }
        } else {
          if (currentItem.username === item.username)
            break;
        }
      }
      item.children = item.children.sort((a, b) => a.floor - b.floor);
      return item;
    },
    //生成嵌套回复
    createNestedList(allList = []) {
      if (!allList.length)
        return [];
      let list = window.clone(allList);
      let nestedList = [];
      list.map((item, index2) => {
        let startList = list.slice(0, index2);
        let startReplyUsers = Array.from(new Set(startList.map((v) => v.username)));
        let endList = list.slice(index2 + 1);
        if (index2 === 0) {
          nestedList.push(this.findChildren(item, endList, list));
        } else {
          if (!item.isUse) {
            let isOneLevelReply = false;
            if (item.replyUsers.length) {
              if (item.replyUsers.length > 1) {
                isOneLevelReply = true;
              } else {
                isOneLevelReply = !startReplyUsers.find((v) => v === item.replyUsers[0]);
              }
            } else {
              isOneLevelReply = true;
            }
            if (isOneLevelReply) {
              item.level = 0;
              nestedList.push(this.findChildren(item, endList, list));
            }
          }
        }
      });
      return nestedList;
    },
    //生成嵌套冗余回复
    createNestedRedundantList(allList = []) {
      if (!allList.length)
        return [];
      let list = window.clone(allList);
      let nestedList = [];
      list.map((item, index2) => {
        let startList = list.slice(0, index2);
        let startReplyUsers = Array.from(new Set(startList.map((v) => v.username)));
        let endList = list.slice(index2 + 1);
        if (index2 === 0) {
          nestedList.push(this.findChildren(item, endList, list));
        } else {
          if (!item.isUse) {
            let isOneLevelReply = false;
            if (item.replyUsers.length) {
              if (item.replyUsers.length > 1) {
                isOneLevelReply = true;
              } else {
                isOneLevelReply = !startReplyUsers.find((v) => v === item.replyUsers[0]);
              }
            } else {
              isOneLevelReply = true;
            }
            if (isOneLevelReply) {
              item.level = 0;
              nestedList.push(this.findChildren(item, endList, list));
            }
          } else {
            let newItem = window.clone(item);
            newItem.children = [];
            newItem.level = 0;
            newItem.isDup = true;
            nestedList.push(newItem);
          }
        }
      });
      return nestedList;
    },
    //解析A标签
    parseA(a) {
      let href = a.href;
      let id;
      if (href.includes("/t/")) {
        id = a.pathname.substring("/t/".length);
      }
      return { href, id, title: a.innerText };
    },
    //图片链接转Img标签
    checkPhotoLink2Img(str) {
      if (!str)
        return;
      try {
        let imgWebs = [
          /<a((?!<a).)*href="https?:\/\/((?!<a).)*imgur.com((?!<a).)*>(((?!<a).)*)<\/a>/g,
          /<a((?!<a).)*href="https?:\/\/((?!<a).)*\.(gif|png|jpg|jpeg|GIF|PNG|JPG|JPEG) ((?!<a).)*>(((?!<a).)*)<\/a>/g
        ];
        imgWebs.map((v, i) => {
          let has = str.matchAll(v);
          let res2 = [...has];
          res2.map((r2) => {
            let p = i === 0 ? r2[4] : r2[5];
            if (p) {
              let link = p.toLowerCase();
              let src = p;
              if (link.includes(".png") || link.includes(".jpg") || link.includes(".jpeg") || link.includes(".gif")) {
              } else {
                src = p + ".png";
              }
              str = str.replace(r2[0], `<img src="${src}" data-originUrl="${p}" data-notice="此img标签由v2ex-超级增强脚本解析" style="max-width: 100%">`);
            }
          });
        });
      } catch (e2) {
        console.log("正则解析html里面的a标签的图片链接出错了");
      }
      return str;
    },
    //检测帖子回复长度
    async checkPostReplies(id, needOpen = true) {
      return new Promise(async (resolve) => {
        var _a;
        let showJsonUrl = `${location.origin}/api/topics/show.json?id=${id}`;
        let r2 = await fetch(showJsonUrl);
        if (r2) {
          let res = await r2.json();
          if (res) {
            if (((_a = res[0]) == null ? void 0 : _a.replies) > MAX_REPLY_LIMIT) {
              if (needOpen) {
                window.parse.openNewTab(`https://www.v2ex.com/t/${id}?p=1&script=1`);
              }
              return resolve(true);
            }
          }
        }
        resolve(false);
      });
    },
    async sleep(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    },
    //打开新标签页
    openNewTab(href) {
      _GM_openInTab(href, { active: true });
    },
    async cbChecker(val, count = 0) {
      if (window.cb) {
        window.cb(val);
      } else {
        while (!window.cb && count < 30) {
          await functions.sleep(500);
          count++;
        }
        window.cb && window.cb(val);
      }
    },
    //初始化脚本菜单
    initMonkeyMenu() {
      try {
        _GM_registerMenuCommand("脚本设置", () => {
          functions.cbChecker({ type: "openSetting" });
        });
        _GM_registerMenuCommand("仓库地址", () => {
          functions.openNewTab(window.const.git);
        });
        _GM_registerMenuCommand("反馈 & 建议", window.functions.feedback);
      } catch (e2) {
        console.error("无法使用Tampermonkey");
      }
    }
  };
  const _sfc_main = {
    components: {
      BaseButton,
      NotificationModal,
      BaseLoading,
      BaseSwitch,
      MsgModal,
      TagModal,
      Tooltip,
      Setting,
      PostDetail,
      Base64Tooltip,
      Msg
    },
    provide() {
      return {
        user: vue.computed(() => window.user),
        isMobile: vue.computed(() => window.vals.isMobile),
        isLogin: vue.computed(() => this.isLogin),
        isNight: vue.computed(() => this.isNight),
        pageType: vue.computed(() => this.pageType),
        tags: vue.computed(() => this.tags),
        show: vue.computed(() => this.show),
        post: vue.computed(() => this.current),
        config: vue.computed(() => this.config),
        allReplyUsers: vue.computed(() => {
          var _a, _b, _c;
          if ((_a = this.current) == null ? void 0 : _a.replyList) {
            return Array.from(new Set(((_c = (_b = this.current) == null ? void 0 : _b.replyList) == null ? void 0 : _c.map((v) => v.username)) ?? []));
          }
          return [];
        }),
        showConfig: this.showConfig
      };
    },
    data() {
      return {
        loading: window.pageType === PageType.Post,
        refreshLoading: false,
        loadMore: false,
        isLogin: !!window.user.username,
        pageType: window.pageType,
        isNight: window.isNight,
        stopMe: window.stopMe,
        //停止使用脚本
        show: false,
        current: window.clone(window.initPost),
        list: [],
        config: window.clone(window.config),
        tags: window.user.tags,
        readList: window.user.readList,
        configModal: {
          show: false
        },
        notificationModal: {
          show: false,
          h: ""
        }
      };
    },
    computed: {
      targetUserTags() {
        return this.tags[window.targetUserName] ?? [];
      },
      isList() {
        return [PageType.Home, PageType.Node].includes(this.pageType);
      },
      isPost() {
        return this.pageType === PageType.Post;
      },
      isMember() {
        return this.pageType === PageType.Member;
      }
    },
    watch: {
      config: {
        handler(newVal) {
          let config2 = { [window.user.username ?? "default"]: newVal };
          localStorage.setItem("v2ex-config", JSON.stringify(config2));
          window.config = newVal;
        },
        deep: true
      },
      tags(newVal) {
        window.user.tags = newVal;
      },
      "config.viewType"(newVal) {
        if (!newVal)
          return;
        if (newVal === "card") {
          $(".post-item").each(function() {
            $(this).addClass("preview");
          });
        } else {
          $(".post-item").each(function() {
            $(this).removeClass("preview");
          });
        }
      }
    },
    created() {
      let that = this;
      this.initEvent();
      window.cb = this.winCb;
      if (!window.canParseV2exPage)
        return;
      $(document).on("click", "a", this.clickA);
      $(document).on("click", ".post-item", function(e2) {
        if (e2.currentTarget.getAttribute("script"))
          return;
        if (that.stopMe)
          return true;
        if (this.classList.contains("preview")) {
          if (e2.target.tagName !== "A" && e2.target.tagName !== "IMG" && !e2.target.classList.contains("toggle")) {
            console.log("点空白处", this);
            let id = this.dataset["id"];
            let href = this.dataset["href"];
            if (id) {
              that.clickPost(e2, id, href);
            } else {
              if (href)
                location.href = href;
            }
          }
        }
      });
      $(document).on("click", ".toggle", (e2) => {
        if (this.stopMe)
          return true;
        let id = e2.currentTarget.dataset["id"];
        let itemDom = window.win().query(`.id_${id}`);
        if (itemDom.classList.contains("preview")) {
          itemDom.classList.remove("preview");
        } else {
          itemDom.classList.add("preview");
        }
      });
      window.onpopstate = (event) => {
        if (event.state) {
          if (!this.show)
            this.show = true;
        } else {
          if (this.show)
            this.show = false;
        }
      };
      window.onbeforeunload = () => {
      };
      window.deleteNotification = (nId, token) => {
        console.log("deleteNotification", nId, token);
        let item = $("#n_" + nId);
        item.slideUp("fast");
        $.post({
          url: "/delete/notification/" + nId + "?once=" + token,
          success() {
            $.get({
              url: "/notifications/below/" + window.notificationBottom,
              success(data, status, request) {
                item.remove();
                $("#notifications").append(data);
                window.notificationBottom = request.getResponseHeader("X-V2EX-New-Notification-Bottom");
              },
              error() {
                item.slideDown("fast");
              }
            });
          },
          error() {
            item.slideDown("fast");
          }
        });
      };
    },
    beforeUnmount() {
      eventBus.clear();
      $(document).off("click", "a", this.clickA);
    },
    methods: {
      async getUnreadMessagesCount() {
        var _a, _b;
        const res = await fetch(`${location.origin}/mission`);
        const htmlText = await res.text();
        const $page = $(htmlText);
        const text = $page.find('#Rightbar a[href^="/notifications"]').text();
        if (text.includes("未读提醒")) {
          const countStr = (_a = text.match(/\d+/)) == null ? void 0 : _a.at(0);
          if (countStr) {
            return Number((_b = text.match(/\d+/)) == null ? void 0 : _b.at(0));
          }
        } else {
          return 0;
        }
        throw new Error("无法获取未读消息数量");
      },
      clickA(e2) {
        let that = this;
        if (e2.currentTarget.getAttribute("script"))
          return;
        if (that.stopMe)
          return true;
        let { href, id, title } = functions.parseA(e2.currentTarget);
        console.log("click-a", e2.currentTarget, e2, href, id, title);
        if (href.includes("/settings/night/toggle"))
          return;
        if (href.includes("/?tab="))
          return;
        if (href.includes("/go"))
          return;
        if (href === window.origin + "/#;")
          return;
        if (href === window.origin + "/")
          return;
        if (href.includes("/notifications"))
          ;
        if (id) {
          that.clickPost(e2, id, href, title);
        } else {
          if (that.config.newTabOpen) {
            that.stopEvent(e2);
            functions.openNewTab(href);
          }
        }
      },
      stopEvent(e2) {
        e2.preventDefault();
        e2.stopPropagation();
      },
      saveReadList() {
        window.parse.saveReadList(this.readList);
      },
      async clickPost(e2, id, href, title = "") {
        if (id) {
          if (this.config.clickPostItemOpenDetail) {
            this.stopEvent(e2);
            let index2 = this.list.findIndex((v) => v.id == id);
            let postItem = this.clone(window.initPost);
            if (index2 > -1) {
              postItem = this.list[index2];
            }
            if (!postItem.title) {
              postItem.title = title ?? "加载中";
            }
            postItem.inList = index2 > -1;
            if (postItem.inList) {
              if (postItem.replyCount > MAX_REPLY_LIMIT$1) {
                return functions.openNewTab(`${location.origin}/t/${id}?p=1&script=1`);
              }
            }
            postItem.id = id;
            postItem.href = href;
            if (!postItem.headerTemplate) {
              let template = `
            <div class="cell">
              <div class="topic_content">
                <div class="markdown_body">
                 ${(postItem == null ? void 0 : postItem.content_rendered) ?? ""}
                </div>
              </div>
            </div>
            `;
              postItem.headerTemplate = template;
            }
            this.getPostDetail(postItem);
            return;
          }
          if (this.config.newTabOpen) {
            this.stopEvent(e2);
            functions.openNewTab(`https://www.v2ex.com/t/${id}?p=1`);
          }
        }
      },
      showPost() {
        this.show = true;
        $("#site-header").hide();
        $("#reply-box").hide();
        $(`#Wrapper .box:lt(3)`).each(function() {
          $(this).hide();
        });
      },
      showConfig() {
        this.configModal.show = true;
      },
      async winCb({ type, value }) {
        if (type === "openSetting") {
          this.showConfig();
        }
        if (type === "syncData") {
          this.list = window.postList;
          this.config = window.config;
          this.stopMe = window.stopMe;
          this.tags = window.user.tags;
          this.readList = window.user.readList;
          this.current.read = this.readList[this.current.id] ?? {};
          if (this.show && this.isPost && this.current.read.floor) {
            this.$refs.postDetail.read = this.current.read;
          }
        }
        if (type === "warningNotice") {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: value });
        }
        if (this.stopMe)
          return;
        if (type === "restorePost") {
          this.show = false;
          this.loading = false;
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "脚本无法查看此页面！" });
          $(`#Wrapper #Main .box:lt(3)`).each(function() {
            $(this).show();
          });
        }
        if (type === "postContent") {
          this.current = value;
          this.current.inList = true;
          if (this.config.autoOpenDetail) {
            this.showPost();
          }
        }
        if (type === "postReplies") {
          console.log("当前帖子", this.current);
          this.list.push(this.clone(this.current));
          this.loading = false;
        }
      },
      clone(val) {
        return window.clone(val);
      },
      regenerateReplyList() {
        if (this.current.replyList.length) {
          this.current.replyCount = this.current.replyList.length;
          let res = functions.createNestedList(this.current.replyList);
          if (res) {
            this.current.nestedReplies = res;
          }
          let dup_res = functions.createNestedRedundantList(this.current.replyList);
          if (dup_res) {
            this.current.nestedRedundReplies = dup_res;
          }
        } else {
          this.current.replyCount = 0;
          this.current.nestedReplies = [];
          this.current.nestedRedundReplies = [];
        }
        if (this.list.length) {
          let rIndex = this.list.findIndex((i) => i.id === this.current.id);
          if (rIndex > -1) {
            this.list[rIndex] = this.clone(this.current);
          }
        }
      },
      initEvent() {
        eventBus.on(CMD.CHANGE_COMMENT_THANK, (val) => {
          console.log("CHANGE_COMMENT_THANK", val);
          const { id, type } = val;
          let currentI = this.current.replyList.findIndex((i) => i.id === id);
          if (currentI > -1) {
            this.current.replyList[currentI].isThanked = type === "add";
            if (type === "add") {
              this.current.replyList[currentI].thankCount++;
            } else {
              this.current.replyList[currentI].thankCount--;
            }
            this.regenerateReplyList();
          }
        });
        eventBus.on(CMD.CHANGE_POST_THANK, (val) => {
          const { id, type } = val;
          this.current.isThanked = type === "add";
          if (type === "add") {
            this.current.thankCount++;
          } else {
            this.current.thankCount--;
          }
          let currentI = this.list.findIndex((i) => i.id === id);
          if (currentI > -1) {
            this.list[currentI].isThanked = type === "add";
            if (type === "add") {
              this.list[currentI].thankCount++;
            } else {
              this.list[currentI].thankCount++;
            }
          }
        });
        eventBus.on(CMD.REMOVE, (val) => {
          let removeIndex = this.current.replyList.findIndex((i) => i.floor === val);
          if (removeIndex > -1) {
            this.current.replyList.splice(removeIndex, 1);
          }
          this.regenerateReplyList();
        });
        eventBus.on(CMD.IGNORE, () => {
          this.show = false;
          let rIndex = this.list.findIndex((i) => i.id === this.current.id);
          if (rIndex > -1) {
            this.list.splice(rIndex, 1);
          }
          this.current = this.clone(window.initPost);
        });
        eventBus.on(CMD.MERGE, (val) => {
          this.current = Object.assign(this.current, val);
          let rIndex = this.list.findIndex((i) => i.id === this.current.id);
          if (rIndex > -1) {
            this.list[rIndex] = this.clone(this.current);
          }
        });
        eventBus.on(CMD.ADD_READ, (val) => {
          this.readList[this.current.id] = val;
        });
        eventBus.on(CMD.ADD_REPLY, (item) => {
          this.current.replyList.push(item);
          this.regenerateReplyList();
        });
        eventBus.on(CMD.REFRESH_ONCE, async (once) => {
          if (once) {
            if (typeof once === "string") {
              let res = once.match(/var once = "([\d]+)";/);
              if (res && res[1]) {
                this.current.once = Number(res[1]);
                return;
              }
            }
            if (typeof once === "number") {
              this.current.once = once;
              return;
            }
          }
          window.fetchOnce().then((r2) => {
            this.current.once = r2;
          });
        });
        eventBus.on(CMD.REMOVE_TAG, async ({ username, tag }) => {
          let oldTag = this.clone(this.tags);
          let tags = this.tags[username] ?? [];
          let rIndex = tags.findIndex((v) => v === tag);
          if (rIndex > -1) {
            tags.splice(rIndex, 1);
          }
          this.tags[username] = tags;
          let res = await window.parse.saveTags(this.tags);
          if (!res) {
            eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "标签删除失败！" });
            this.tags = oldTag;
          }
        });
        eventBus.on(CMD.REFRESH_POST, () => this.getPostDetail(this.current));
      },
      async getPostDetail(post) {
        this.current = post;
        this.current.read = this.readList[this.current.id] ?? { floor: 0, total: 0 };
        this.show = true;
        if (!this.current.inList) {
          this.loading = true;
          let r2 = await functions.checkPostReplies(post.id, true);
          if (r2) {
            eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "由于回复数量较多，已为您单独打开此主题" });
            this.loading = this.show = false;
            return;
          }
        }
        let url = window.baseUrl + "/t/" + post.id;
        this.current.url = url;
        let alreadyHasReply = this.current.replyList.length;
        if (alreadyHasReply) {
          this.refreshLoading = true;
          this.$refs.postDetail.jumpLastRead(this.current.read.floor);
        } else {
          this.loading = true;
        }
        let apiRes = await window.fetch(url + "?p=1");
        if (apiRes.status === 404) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "主题未找到" });
          return this.refreshLoading = this.loading = false;
        }
        if (apiRes.status === 403) {
          this.refreshLoading = this.show = this.loading = false;
          functions.openNewTab(`${location.origin}/t/${post.id}?p=1&script=0`);
          return;
        }
        if (apiRes.redirected) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "没有权限" });
          return this.refreshLoading = this.loading = false;
        }
        let htmlText = await apiRes.text();
        let hasPermission = htmlText.search("你要查看的页面需要先登录");
        if (hasPermission > -1) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "你要查看的页面需要先登录" });
          return this.refreshLoading = this.loading = false;
        }
        let bodyText = htmlText.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
        let body = $(bodyText[0]);
        decodeEmail(body);
        await window.parse.getPostDetail(this.current, body, htmlText);
        let index2 = this.list.findIndex((v) => v.id == this.current.id);
        if (index2 > -1) {
          this.list[index2] = this.clone(this.current);
        } else {
          this.list.push(this.clone(this.current));
        }
        this.refreshLoading = this.loading = false;
        if (!alreadyHasReply) {
          vue.nextTick(() => {
            this.$refs.postDetail.jumpLastRead(this.current.read.floor);
          });
        }
        await window.parse.parseOp(this.current);
        console.log("当前帖子", this.current);
      },
      addTargetUserTag() {
        eventBus.emit(CMD.ADD_TAG, window.targetUserName);
      },
      removeTargetUserTag(tag) {
        eventBus.emit(CMD.REMOVE_TAG, { username: window.targetUserName, tag });
      }
    }
  };
  const _withScopeId = (n2) => (vue.pushScopeId("data-v-11e6ce00"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1 = {
    key: 0,
    class: "target-user-tags p1"
  };
  const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "标签：", -1));
  const _hoisted_3 = { class: "my-tag" };
  const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_5 = ["onClick"];
  const _hoisted_6 = {
    key: 1,
    class: "my-box p2",
    style: { "margin-top": "2rem" }
  };
  const _hoisted_7 = {
    key: 0,
    class: "flex flex-center"
  };
  const _hoisted_8 = {
    key: 1,
    class: "loaded"
  };
  const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "楼中楼解析完成", -1));
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Setting = vue.resolveComponent("Setting");
    const _component_TagModal = vue.resolveComponent("TagModal");
    const _component_PostDetail = vue.resolveComponent("PostDetail");
    const _component_Base64Tooltip = vue.resolveComponent("Base64Tooltip");
    const _component_MsgModal = vue.resolveComponent("MsgModal");
    const _component_NotificationModal = vue.resolveComponent("NotificationModal");
    const _component_BaseLoading = vue.resolveComponent("BaseLoading");
    const _component_BaseButton = vue.resolveComponent("BaseButton");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createVNode(_component_Setting, {
        modelValue: $data.config,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.config = $event),
        show: $data.configModal.show,
        "onUpdate:show": _cache[1] || (_cache[1] = ($event) => $data.configModal.show = $event)
      }, null, 8, ["modelValue", "show"]),
      vue.createVNode(_component_TagModal, {
        tags: $data.tags,
        "onUpdate:tags": _cache[2] || (_cache[2] = ($event) => $data.tags = $event)
      }, null, 8, ["tags"]),
      vue.createVNode(_component_PostDetail, {
        modelValue: $data.show,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.show = $event),
        ref: "postDetail",
        displayType: $data.config.commentDisplayType,
        "onUpdate:displayType": _cache[4] || (_cache[4] = ($event) => $data.config.commentDisplayType = $event),
        onSaveReadList: $options.saveReadList,
        onRefresh: _cache[5] || (_cache[5] = ($event) => $options.getPostDetail($data.current)),
        loading: $data.loading,
        refreshLoading: $data.refreshLoading
      }, null, 8, ["modelValue", "displayType", "onSaveReadList", "loading", "refreshLoading"]),
      vue.createVNode(_component_Base64Tooltip),
      vue.createVNode(_component_MsgModal),
      vue.createVNode(_component_NotificationModal, {
        modelValue: $data.notificationModal.show,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.notificationModal.show = $event),
        h: $data.notificationModal.h
      }, null, 8, ["modelValue", "h"]),
      !$data.stopMe ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
        $options.isMember && $data.isLogin && $data.config.openTag ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          _hoisted_2,
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.targetUserTags, (i) => {
            return vue.openBlock(), vue.createElementBlock("span", _hoisted_3, [
              _hoisted_4,
              vue.createElementVNode("span", null, vue.toDisplayString(i), 1),
              vue.createElementVNode("i", {
                class: "fa fa-trash-o remove",
                onClick: ($event) => $options.removeTargetUserTag(i)
              }, null, 8, _hoisted_5)
            ]);
          }), 256)),
          vue.createElementVNode("span", {
            class: "add-tag ago",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.addTargetUserTag && $options.addTargetUserTag(...args)),
            title: "添加标签"
          }, "+")
        ])) : vue.createCommentVNode("", true),
        $options.isPost && !$data.show && $data.config.autoOpenDetail ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
          $data.loading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
            vue.createVNode(_component_BaseLoading)
          ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
            _hoisted_9,
            vue.createVNode(_component_BaseButton, {
              size: "small",
              onClick: $options.showPost
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("点击显示")
              ]),
              _: 1
            }, 8, ["onClick"])
          ]))
        ])) : vue.createCommentVNode("", true)
      ], 64)) : vue.createCommentVNode("", true)
    ], 64);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-11e6ce00"]]);
  var eruda = { exports: {} };
  /*! eruda v3.0.1 https://eruda.liriliri.io/ */
  (function(module, exports) {
    !function(e2, t) {
      module.exports = t();
    }(self, function() {
      return function() {
        var __webpack_modules__ = { 422: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return G;
          } });
          var o = n2(5671), r2 = n2(3144), i = n2(9340), a = n2(2963), s = n2(1120), c = n2(2461), l = n2.n(c), u2 = n2(3990), d2 = n2.n(u2), f2 = n2(6768), h = n2.n(f2), p = n2(4331), v = n2.n(p), m = n2(5610), g = n2.n(m), b = n2(7483), y = n2.n(b), w = n2(6341), _ = n2.n(w), x = n2(3875), A = n2.n(x), k = n2(6954), C = n2.n(k);
          n2(9585);
          function S(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return l()(v()(e4).split(/\s+/), function(e5) {
                return _()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = y().parse(e4);
                  return E(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), y().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function E(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && E(r3.content, t2);
            }
          }
          g();
          function O() {
            var e3 = C()();
            return "os x" === e3 ? "mac" : e3;
          }
          var T = n2(1443), N = n2.n(T), M = n2(1512), j = n2.n(M), z = n2(3783), R = n2.n(z), Z = n2(6329), I = n2.n(Z), D = n2(4193), B = n2.n(D), F = n2(5852), L = n2.n(F);
          function P(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, s.Z)(e3);
              if (t2) {
                var r3 = (0, s.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, a.Z)(this, n3);
            };
          }
          var H = function(e3) {
            (0, i.Z)(n3, e3);
            var t2 = P(n3);
            function n3(e4, r3) {
              var i2, a2 = r3.compName, s2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, c2 = void 0 === s2 ? "light" : s2;
              return (0, o.Z)(this, n3), (i2 = t2.call(this)).subComponents = [], i2.compName = a2, i2.c = S(a2), i2.options = {}, i2.container = e4, i2.$container = j()(e4), i2.$container.addClass(["luna-".concat(a2), i2.c("platform-".concat(O()))]), i2.on("optionChange", function(e5, t3, n4) {
                var o2 = i2.c;
                "theme" === e5 && (i2.$container.rmClass(o2("theme-".concat(n4))).addClass(o2("theme-".concat(t3))), R()(i2.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), i2.setOption("theme", c2), i2;
            }
            return (0, r2.Z)(n3, [{ key: "destroy", value: function() {
              this.destroySubComponents();
              var e4 = this.c;
              this.$container.rmClass("luna-".concat(this.compName)).rmClass(e4("platform-".concat(O()))).rmClass(e4("theme-".concat(this.options.theme))), this.$container.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, R()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              L()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              R()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              B()(e4, t3), I()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(N());
          function $2(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, s.Z)(e3);
              if (t2) {
                var r3 = (0, s.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, a.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var G = function(e3) {
            (0, i.Z)(n3, e3);
            var t2 = $2(n3);
            function n3(e4) {
              var r3, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (0, o.Z)(this, n3), (r3 = t2.call(this, e4, { compName: "box-model" })).initOptions(i2), r3.options.element && r3.render(), r3.bindEvent(), r3;
            }
            return (0, r2.Z)(n3, [{ key: "bindEvent", value: function() {
              var e4 = this;
              this.on("optionChange", function(t3) {
                if ("element" === t3)
                  e4.render();
              });
            } }, { key: "render", value: function() {
              var e4 = this.c, t3 = this.getBoxModelData();
              this.$container.html(['<div class="'.concat(e4("box-model"), '">'), t3.position ? '<div class="'.concat(e4("position"), '">') : "", t3.position ? '<div class="'.concat(e4("label"), '">position</div><div class="').concat(e4("top"), '">').concat(t3.position.top, '</div><br><div class="').concat(e4("left"), '">').concat(t3.position.left, "</div>") : "", '<div class="'.concat(e4("margin"), '">'), '<div class="'.concat(e4("label"), '">margin</div><div class="').concat(e4("top"), '">').concat(t3.margin.top, '</div><br><div class="').concat(e4("left"), '">').concat(t3.margin.left, "</div>"), '<div class="'.concat(e4("border"), '">'), '<div class="'.concat(e4("label"), '">border</div><div class="').concat(e4("top"), '">').concat(t3.border.top, '</div><br><div class="').concat(e4("left"), '">').concat(t3.border.left, "</div>"), '<div class="'.concat(e4("padding"), '">'), '<div class="'.concat(e4("label"), '">padding</div><div class="').concat(e4("top"), '">').concat(t3.padding.top, '</div><br><div class="').concat(e4("left"), '">').concat(t3.padding.left, "</div>"), '<div class="'.concat(e4("content"), '">'), "<span>".concat(t3.content.width, "</span>&nbsp;×&nbsp;<span>").concat(t3.content.height, "</span>"), "</div>", '<div class="'.concat(e4("right"), '">').concat(t3.padding.right, '</div><br><div class="').concat(e4("bottom"), '">').concat(t3.padding.bottom, "</div>"), "</div>", '<div class="'.concat(e4("right"), '">').concat(t3.border.right, '</div><br><div class="').concat(e4("bottom"), '">').concat(t3.border.bottom, "</div>"), "</div>", '<div class="'.concat(e4("right"), '">').concat(t3.margin.right, '</div><br><div class="').concat(e4("bottom"), '">').concat(t3.margin.bottom, "</div>"), "</div>", t3.position ? '<div class="'.concat(e4("right"), '">').concat(t3.position.right, '</div><br><div class="').concat(e4("bottom"), '">').concat(t3.position.bottom, "</div>") : "", t3.position ? "</div>" : "", "</div>"].join(""));
            } }, { key: "getBoxModelData", value: function() {
              var e4 = this.options.element, t3 = window.getComputedStyle(e4);
              function n4(e5) {
                var n5 = ["top", "left", "right", "bottom"];
                return "position" !== e5 && (n5 = l()(n5, function(t4) {
                  return "".concat(e5, "-").concat(t4);
                })), "border" === e5 && (n5 = l()(n5, function(e6) {
                  return "".concat(e6, "-width");
                })), { top: Y(t3[n5[0]], e5), left: Y(t3[n5[1]], e5), right: Y(t3[n5[2]], e5), bottom: Y(t3[n5[3]], e5) };
              }
              var o2 = { margin: n4("margin"), border: n4("border"), padding: n4("padding"), content: { width: Y(t3.width), height: Y(t3.height) } };
              return "static" !== t3.position && (o2.position = n4("position")), o2;
            } }]), n3;
          }(H);
          function Y(e3, t2) {
            if (d2()(e3))
              return e3;
            if (!h()(e3))
              return "‒";
            var n3, o2 = (n3 = e3, A()(n3.replace("px", "")));
            return isNaN(o2) ? e3 : "position" === t2 ? o2 : 0 === o2 ? "‒" : o2;
          }
          (function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          })(e2, G);
        }, 8816: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return tn;
          } });
          var o = n2(168);
          var r2 = n2(181);
          function i(e3, t2) {
            return function(e4) {
              if (Array.isArray(e4))
                return e4;
            }(e3) || function(e4, t3) {
              var n3 = null == e4 ? null : "undefined" != typeof Symbol && e4[Symbol.iterator] || e4["@@iterator"];
              if (null != n3) {
                var o2, r3, i2, a2, s2 = [], c2 = true, l2 = false;
                try {
                  if (i2 = (n3 = n3.call(e4)).next, 0 === t3) {
                    if (Object(n3) !== n3)
                      return;
                    c2 = false;
                  } else
                    for (; !(c2 = (o2 = i2.call(n3)).done) && (s2.push(o2.value), s2.length !== t3); c2 = true)
                      ;
                } catch (e5) {
                  l2 = true, r3 = e5;
                } finally {
                  try {
                    if (!c2 && null != n3.return && (a2 = n3.return(), Object(a2) !== a2))
                      return;
                  } finally {
                    if (l2)
                      throw r3;
                  }
                }
                return s2;
              }
            }(e3, t2) || (0, r2.Z)(e3, t2) || function() {
              throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }();
          }
          var a = n2(5671), s = n2(3144), c = n2(1752), l = n2(9340), u2 = n2(2963), d2 = n2(1120), f2 = n2(7326), h = n2(8901), p = n2.n(h), v = n2(3367), m = n2.n(v), g = n2(6341), b = n2.n(g), y = n2(6930), w = n2.n(y), _ = n2(4187), x = n2.n(_), A = n2(3783), k = n2.n(A), C = n2(4858), S = n2.n(C), E = n2(8887), O = n2.n(E), T = n2(7756), N = n2.n(T), M = n2(3023), j = n2.n(M);
          function z(e3) {
            return e3.constructor && e3.constructor.name ? e3.constructor.name : j()({}.toString.call(e3).replace(/(\[object )|]/g, ""));
          }
          var R = n2(2461), Z = n2.n(R), I = n2(4331), D = n2.n(I), B = n2(5610), F = n2.n(B), L = n2(7483), P = n2.n(L), H = n2(3990), $2 = n2.n(H), G = n2(3875), Y = n2.n(G), q = n2(6954), J = n2.n(q), Q = n2(9585), W = n2.n(Q);
          function U(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return Z()(D()(e4).split(/\s+/), function(e5) {
                return b()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = P().parse(e4);
                  return V(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), P().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function V(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && V(r3.content, t2);
            }
          }
          F();
          var K = U("console");
          function X(e3) {
            var t2, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o2 = n3.topObj, r3 = n3.level, i2 = void 0 === r3 ? 0 : r3, a2 = n3.getterVal, s2 = void 0 !== a2 && a2, c2 = n3.unenumerable, l2 = void 0 === c2 || c2, u3 = "", d3 = "", f3 = [], h2 = [], v2 = "";
            o2 = o2 || e3;
            var g2 = { getterVal: s2, unenumerable: l2, level: i2 + 1 }, y2 = 0 === i2, _2 = '<span class="'.concat(K("key"), '">'), x2 = '<span class="'.concat(K("number"), '">'), A2 = '<span class="'.concat(K("null"), '">'), C2 = '<span class="'.concat(K("string"), '">'), E2 = '<span class="'.concat(K("boolean"), '">'), O2 = '<span class="'.concat(K("special"), '">'), T2 = function(e4) {
              return p()(e4).replace(/\\n/g, "↵").replace(/\\f|\\r|\\t/g, "").replace(/\\/g, "");
            }, M2 = "</span>";
            function j2(e4) {
              return e4 = m()(e4), b()(ee, e4) || w()(e4, "Array[") ? O2 + T2(e4) + M2 : (e4.length > 100 && (e4 = N()(e4, 100, { separator: " ", ellipsis: "…" })), C2 + T2('"'.concat(e4, '"')) + M2);
            }
            function R2(n4) {
              if (t2 > 5)
                v2 = ", …";
              else {
                var r4 = function(e4) {
                  return _2 + T2(e4) + M2;
                }(ne(n4));
                if (!s2) {
                  var i3 = Object.getOwnPropertyDescriptor(e3, n4);
                  if (i3 && i3.get)
                    return f3.push("".concat(r4, ": ").concat(j2("(...)"))), void t2++;
                }
                f3.push("".concat(r4, ": ").concat(X(o2[n4], g2))), t2++;
              }
            }
            try {
              d3 = {}.toString.call(e3);
            } catch (e4) {
              d3 = "[object Object]";
            }
            var Z2, I2 = "[object Array]" == d3, D2 = "[object Object]" == d3, B2 = "[object Number]" == d3, F2 = "[object RegExp]" == d3, L2 = "[object Symbol]" == d3, P2 = "[object Function]" == d3, H2 = "[object Boolean]" == d3;
            if ("[object String]" == d3)
              u3 = j2(ne(e3));
            else if (F2)
              Z2 = ne(e3.toString()), u3 = C2 + Z2 + M2;
            else if (P2)
              u3 = j2("ƒ");
            else if (I2)
              if (y2) {
                u3 = "[";
                var $3 = e3.length, G2 = "";
                $3 > 100 && ($3 = 100, G2 = ", …");
                for (var Y2 = 0; Y2 < $3; Y2++)
                  f3.push("".concat(X(e3[Y2], g2)));
                u3 += f3.join(", ") + G2 + "]";
              } else
                u3 = "Array(".concat(e3.length, ")");
            else if (D2)
              te(e3) && (e3 = Object.getPrototypeOf(e3)), h2 = l2 ? Object.getOwnPropertyNames(e3) : Object.keys(e3), y2 ? (t2 = 1, u3 = "{", k()(h2, R2), u3 += f3.join(", ") + v2 + "}") : "Object" === (u3 = z(e3)) && (u3 = "{…}");
            else if (B2)
              u3 = e3 + "", u3 = S()(u3, "Infinity") || "NaN" === u3 ? '"'.concat(u3, '"') : x2 + u3 + M2;
            else if (H2)
              u3 = E2 + (e3 ? "true" : "false") + M2;
            else if (null === e3)
              u3 = function(e4) {
                return A2 + e4 + M2;
              }("null");
            else if (L2)
              u3 = j2("Symbol");
            else if (void 0 === e3)
              u3 = j2("undefined");
            else
              try {
                te(e3) && (e3 = Object.getPrototypeOf(e3)), y2 ? (t2 = 1, u3 = "{", h2 = l2 ? Object.getOwnPropertyNames(e3) : Object.keys(e3), k()(h2, R2), u3 += f3.join(", ") + v2 + "}") : "Object" === (u3 = z(e3)) && (u3 = "{…}");
              } catch (t3) {
                u3 = j2(e3);
              }
            return u3;
          }
          var ee = ["(...)", "undefined", "Symbol", "Object", "ƒ"];
          function te(e3) {
            var t2 = O()(Object.getOwnPropertyNames(e3)), n3 = Object.getPrototypeOf(e3);
            return t2 && n3 && n3 !== Object.prototype;
          }
          function ne(e3) {
            return x()(e3).replace(/\\'/g, "'").replace(/\t/g, "\\t");
          }
          var oe, re = n2(8299), ie = n2(5564), ae = n2(8209), se = n2(242), ce = n2.n(se), le = n2(5166), ue = n2.n(le), de = n2(6768), fe = n2.n(de), he = n2(2749), pe = n2.n(he), ve = n2(6997), me = n2.n(ve), ge = n2(4193), be = n2.n(ge), ye = n2(9833), we = n2.n(ye), _e = n2(9296), xe = n2.n(_e), Ae = n2(8099), ke = n2.n(Ae), Ce = n2(6156), Se = n2.n(Ce), Ee = n2(1286), Oe = n2.n(Ee), Te = n2(4777), Ne = n2.n(Te), Me = n2(1352), je = n2.n(Me), ze = n2(6472), Re = n2.n(ze), Ze = n2(42), Ie = n2.n(Ze), De = n2(4675), Be = n2.n(De), Fe = n2(3063), Le = n2.n(Fe), Pe = n2(2533), He = n2.n(Pe), $e = n2(1512), Ge = n2.n($e), Ye = n2(8613), qe = n2.n(Ye), Je = n2(1443), Qe = n2.n(Je), We = n2(6049), Ue = n2.n(We), Ve = n2(4400), Ke = n2.n(Ve), Xe = n2(2327), et = n2.n(Xe), tt = n2(9963), nt = n2.n(tt), ot = n2(6837), rt = n2.n(ot), it = n2(3988), at = n2.n(it), st = n2(3651), ct = n2.n(st), lt = n2(6053), ut = n2.n(lt), dt = n2(1907), ft = n2.n(dt), ht = n2(4891), pt = n2.n(ht), vt = n2(5229), mt = n2.n(vt), gt = n2(4696), bt = n2.n(gt), yt = n2(9804), wt = n2.n(yt), _t = n2(1754), xt = n2.n(_t);
          function At(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, d2.Z)(e3);
              if (t2) {
                var r3 = (0, d2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, u2.Z)(this, n3);
            };
          }
          var kt = /https?:\/\/([0-9.\-A-Za-z]+)(?::(\d+))?\/[A-Z.a-z0-9/]*\.js/g, Ct = { comment: "", string: "", number: "", keyword: "", operator: "" }, St = function(e3) {
            (0, l.Z)(n3, e3);
            var t2 = At(n3);
            function n3(e4, o2) {
              var r3, i2 = o2.type, s2 = void 0 === i2 ? "log" : i2, c2 = o2.args, l2 = void 0 === c2 ? [] : c2, u3 = o2.id, d3 = o2.group, h2 = o2.targetGroup, p2 = o2.header, v2 = o2.ignoreFilter, m2 = void 0 !== v2 && v2, g2 = o2.accessGetter, b2 = o2.unenumerable, y2 = o2.lazyEvaluation;
              (0, a.Z)(this, n3), (r3 = t2.call(this)).container = qe()("div"), r3.count = 1, r3.width = 0, r3.height = 0, r3.isHidden = false, r3.columns = [], r3.elements = {}, r3.objects = {}, r3.console = e4, r3.type = s2, r3.group = d3, r3.targetGroup = h2, r3.args = l2, r3.id = u3, r3.header = p2, r3.ignoreFilter = m2, r3.collapsed = false, r3.container.log = (0, f2.Z)(r3), r3.height = 0, r3.width = 0, r3.$container = Ge()(r3.container), r3.accessGetter = g2, r3.unenumerable = b2, r3.lazyEvaluation = y2;
              var w2 = "info";
              switch (s2) {
                case "debug":
                  w2 = "verbose";
                  break;
                case "error":
                  w2 = "error";
                  break;
                case "warn":
                  w2 = "warning";
              }
              return r3.level = w2, r3.resizeSensor = new (ce())(r3.container), r3.onResize = Ue()(function() {
                W()(r3.container) ? r3.isHidden = true : (r3.isHidden || r3.updateSize(false), r3.isHidden = false);
              }, 16), r3.formatMsg(), r3.group && r3.checkGroup(), r3.bindEvent(), r3;
            }
            return (0, s.Z)(n3, [{ key: "checkGroup", value: function() {
              for (var e4 = this.group, t3 = false; e4; ) {
                if (e4.collapsed) {
                  t3 = true;
                  break;
                }
                e4 = e4.parent;
              }
              return t3 !== this.collapsed && (this.collapsed = t3, true);
            } }, { key: "updateIcon", value: function(e4) {
              var t3 = this.console.c;
              return this.$container.find(t3(".icon-container")).find(t3(".icon")).rmAttr("class").addClass([t3("icon"), t3("icon-".concat(e4))]), this;
            } }, { key: "addCount", value: function() {
              this.count++;
              var e4 = this.$container, t3 = this.count, n4 = this.console.c, o2 = e4.find(n4(".count-container")), r3 = e4.find(n4(".icon-container")), i2 = o2.find(n4(".count"));
              return 2 === t3 && o2.rmClass(n4("hidden")), i2.text(m()(t3)), r3.addClass(n4("hidden")), this;
            } }, { key: "groupEnd", value: function() {
              var e4 = this.$container, t3 = this.console.c;
              return e4.find(".".concat(t3("nesting-level"), ":not(.").concat(t3("group-closed"), ")")).last().addClass(t3("group-closed")), this;
            } }, { key: "updateTime", value: function(e4) {
              var t3 = this.$container.find(this.console.c(".time-container"));
              return this.header && (t3.find("span").eq(0).text(e4), this.header.time = e4), this;
            } }, { key: "isAttached", value: function() {
              return !!this.container.parentNode;
            } }, { key: "isSimple", value: function() {
              return !ut()(this.args, function(e4) {
                return ue()(e4);
              });
            } }, { key: "updateSize", value: function() {
              var e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t3 = this.container.getBoundingClientRect(), n4 = t3.width, o2 = t3.height - 1;
              this.height !== o2 && (this.height = o2, e4 || this.emit("updateHeight")), this.width !== n4 && (this.width = n4);
            } }, { key: "html", value: function() {
              return this.container.outerHTML;
            } }, { key: "text", value: function() {
              return this.content.textContent || "";
            } }, { key: "select", value: function() {
              this.$container.addClass(this.console.c("selected"));
            } }, { key: "deselect", value: function() {
              this.$container.rmClass(this.console.c("selected"));
            } }, { key: "copy", value: function() {
              var e4 = this.args, t3 = "";
              k()(e4, function(e5, n4) {
                0 !== n4 && (t3 += " "), ue()(e5) ? t3 += Ke()(e5) : t3 += m()(e5);
              }), et()(t3);
            } }, { key: "bindEvent", value: function() {
              var e4 = this, t3 = this.console.c, n4 = this;
              this.resizeSensor.addListener(this.onResize), this.$container.on("click", t3(".dom-viewer"), function(e5) {
                return e5.stopPropagation();
              }).on("click", t3(".preview"), function(e5) {
                e5.stopPropagation();
                var o2 = Ge()(this).find(t3(".preview-icon-container")).find(t3(".icon")), r3 = "caret-down";
                o2.hasClass(t3("icon-caret-down")) && (r3 = "caret-right"), o2.rmAttr("class").addClass([t3("icon"), t3("icon-".concat(r3))]), n4.renderObjectViewer(this);
              }).on("click", function() {
                return e4.click();
              });
            } }, { key: "renderEl", value: function() {
              var e4 = this.elements, t3 = this.console.c, n4 = this;
              this.$container.find(t3(".dom-viewer")).each(function() {
                var t4 = Ge()(this).data("id");
                new ae.Z(this, { node: e4[t4], theme: n4.console.getOption("theme") });
              });
            } }, { key: "renderObjectViewer", value: function(e4) {
              var t3 = this.console, n4 = this.unenumerable, o2 = this.accessGetter, r3 = this.lazyEvaluation, i2 = t3.c, a2 = Ge()(e4), s2 = a2.data("id");
              if (s2) {
                var c2 = this.objects[s2], l2 = a2.find(i2(".json"));
                if (l2.hasClass(i2("hidden"))) {
                  if ("true" !== l2.data("init")) {
                    if (r3) {
                      var u3 = new re.Z(l2.get(0), { unenumerable: n4, accessGetter: o2 });
                      u3.setOption("theme", t3.getOption("theme")), u3.set(c2);
                    } else {
                      var d3 = new re.q(l2.get(0));
                      d3.setOption("theme", t3.getOption("theme")), d3.set(c2);
                    }
                    l2.data("init", "true");
                  }
                  l2.rmClass(i2("hidden"));
                } else
                  l2.addClass(i2("hidden"));
              }
            } }, { key: "renderTable", value: function(e4) {
              var t3 = this, n4 = "__LunaConsoleValue", o2 = this.columns, r3 = this.$container, i2 = this.console, a2 = i2.c, s2 = r3.find(a2(".data-grid")), c2 = e4[0], l2 = new ie.Z(s2.get(0), { columns: ke()([{ id: "(index)", title: "(index)", sortable: true }], Z()(o2, function(e5) {
                return { id: e5, title: e5 === n4 ? "Value" : e5, sortable: true };
              })), theme: i2.getOption("theme") });
              k()(c2, function(e5, r4) {
                var i3 = { "(index)": m()(r4) };
                o2.forEach(function(o3) {
                  ue()(e5) ? i3[o3] = o3 === n4 ? "" : t3.formatTableVal(e5[o3]) : me()(e5) && (i3[o3] = o3 === n4 ? t3.formatTableVal(e5) : "");
                }), l2.append(i3);
              });
            } }, { key: "extractObj", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n4 = arguments.length > 2 ? arguments[2] : void 0, o2 = this.accessGetter, r3 = this.unenumerable;
              be()(t3, { accessGetter: o2, unenumerable: r3, symbol: r3, timeout: 1e3 }), function(e5, t4, n5) {
                var o3 = nt()(e5, t4);
                rt()(function() {
                  return n5(o3);
                });
              }(e4, t3, function(e5) {
                return n4(JSON.parse(e5));
              });
            } }, { key: "click", value: function() {
              var e4 = this.type, t3 = this.$container, n4 = this.console, o2 = n4.c;
              switch (e4) {
                case "log":
                case "warn":
                case "info":
                case "debug":
                case "output":
                case "table":
                case "dir":
                  break;
                case "group":
                case "groupCollapsed":
                  n4.toggleGroup(this);
                  break;
                case "error":
                  t3.find(o2(".stack")).toggleClass(o2("hidden"));
              }
            } }, { key: "formatMsg", value: function() {
              var e4 = this.args, t3 = this.type, n4 = this.id, o2 = this.header, r3 = this.group, i2 = this.console.c;
              e4 = Be()(e4);
              var a2, s2, c2 = "";
              switch ("group" !== t3 && "groupCollapsed" !== t3 || 0 === e4.length && (e4 = ["console.group"]), t3) {
                case "log":
                case "info":
                case "debug":
                  c2 = this.formatCommon(e4);
                  break;
                case "dir":
                  c2 = this.formatDir(e4);
                  break;
                case "warn":
                  a2 = "warn", c2 = this.formatCommon(e4);
                  break;
                case "error":
                  fe()(e4[0]) && 1 !== e4.length && (e4 = this.substituteStr(e4)), s2 = e4[0], a2 = "error", s2 = pe()(s2) ? s2 : new Error(this.formatCommon(e4)), c2 = this.formatErr(s2);
                  break;
                case "table":
                  c2 = this.formatTable(e4);
                  break;
                case "html":
                  c2 = e4[0];
                  break;
                case "input":
                  c2 = this.formatJs(e4[0]), a2 = "input";
                  break;
                case "output":
                  c2 = this.formatCommon(e4), a2 = "output";
                  break;
                case "groupCollapsed":
                  c2 = this.formatCommon(e4), a2 = "caret-right";
                  break;
                case "group":
                  c2 = this.formatCommon(e4), a2 = "caret-down";
              }
              if (b()(["log", "debug", "warn"], t3) && this.isSimple() && (c2 = at()(c2, function(e5) {
                return '<a href="'.concat(e5, '" target="_blank">').concat(e5, "</a>");
              })), c2 = this.render({ msg: c2, type: t3, icon: a2, id: n4, header: o2, group: r3 }), this.$container.addClass("".concat(i2("log-container"))).html(c2), "table" === t3)
                O()(this.columns) || this.renderTable(e4);
              O()(this.elements) || this.renderEl(), this.$content = this.$container.find(i2(".log-content")), this.content = this.$content.get(0);
            } }, { key: "render", value: function(e4) {
              var t3 = this.console.c, n4 = "", r3 = "";
              if (e4.group)
                for (var i2 = e4.group.indentLevel, a2 = 0; a2 < i2; a2++)
                  r3 += '<div class="'.concat(t3("nesting-level"), '"></div>');
              e4.header && (n4 += ft()(oe || (oe = (0, o.Z)(['\n      <div class="', '">\n        ', '\n        <div class="', '">\n          <span>', "</span> <span>", "</span>\n        </div>\n      </div>"])), t3("header"), r3, t3("time-from-container"), e4.header.time, e4.header.from));
              var s2 = "";
              return e4.icon && (s2 = '<div class="'.concat(t3("icon-container"), '"><span class="').concat(t3("icon icon-" + e4.icon), '"></span></div>')), n4 += '\n    <div class="'.concat(t3(e4.type + " log-item"), '">\n      ').concat(r3, "\n      ").concat(s2, '\n      <div class="').concat(t3("count-container hidden"), '">\n        <div class="').concat(t3("count"), '"></div>\n      </div>    \n      <div class="').concat(t3("log-content-wrapper"), '">\n        <div class="').concat(t3("log-content"), '">').concat(e4.msg, "</div>\n      </div>\n    </div>");
            } }, { key: "formatTable", value: function(e4) {
              var t3 = e4[0], n4 = e4[1], o2 = [];
              return fe()(n4) && (n4 = je()(n4)), Re()(n4) || (n4 = null), ue()(t3) ? (k()(t3, function(e5) {
                me()(e5) ? o2.push("__LunaConsoleValue") : ue()(e5) && (o2 = o2.concat(He()(e5)));
              }), (o2 = Ie()(o2)).sort(), n4 && (o2 = o2.filter(function(e5) {
                return b()(n4, e5);
              })), o2.length > 20 && (o2 = o2.slice(0, 20)), O()(o2) ? this.formatCommon(e4) : (this.columns = o2, this.console.c('<div class="data-grid"></div>') + this.formatPreview(t3))) : this.formatCommon(e4);
            } }, { key: "formatErr", value: function(e4) {
              var t3 = e4.stack ? e4.stack.split("\n") : [], n4 = "".concat(e4.message || t3[0], "<br/>");
              return t3 = t3.map(function(e5) {
                return p()(e5);
              }), n4 + '<div class="'.concat(this.console.c("stack hidden"), '">').concat(t3.slice(1).join("<br/>"), "</div>").replace(kt, function(e5) {
                return '<a href="'.concat(e5, '" target="_blank">').concat(e5, "</a>");
              });
            } }, { key: "formatCommon", value: function(e4) {
              var t3 = this.console.c, n4 = fe()(e4[0]) && 1 !== e4.length;
              n4 && (e4 = this.substituteStr(e4));
              for (var o2 = 0, r3 = e4.length; o2 < r3; o2++) {
                var i2 = e4[o2];
                we()(i2) ? e4[o2] = this.formatEl(i2) : Ne()(i2) ? e4[o2] = this.formatFn(i2) : xt()(i2) ? e4[o2] = '<span class="'.concat(t3("regexp"), '">').concat(p()(m()(i2)), "</span>") : ue()(i2) ? e4[o2] = this.formatPreview(i2) : Oe()(i2) ? e4[o2] = '<span class="'.concat(t3("undefined"), '">undefined</span>') : Se()(i2) ? e4[o2] = '<span class="'.concat(t3("null"), '">null</span>') : $2()(i2) ? e4[o2] = '<span class="'.concat(t3("number"), '">').concat(m()(i2), "</span>") : "bigint" == typeof i2 ? e4[o2] = '<span class="'.concat(t3("number"), '">').concat(m()(i2), "n</span>") : bt()(i2) ? e4[o2] = '<span class="'.concat(t3("boolean"), '">').concat(m()(i2), "</span>") : wt()(i2) ? e4[o2] = '<span class="'.concat(t3("symbol"), '">').concat(p()(m()(i2)), "</span>") : (i2 = m()(i2), 0 === o2 && n4 || (i2 = p()(i2)), i2.length > 5e3 && (i2 = N()(i2, 5e3, { separator: " ", ellipsis: "…" })), e4[o2] = i2);
              }
              return e4.join(" ");
            } }, { key: "formatDir", value: function(e4) {
              return ue()(e4[0]) ? this.formatPreview(e4[0]) : this.formatCommon(e4);
            } }, { key: "formatTableVal", value: function(e4) {
              var t3 = this.console.c;
              return ue()(e4) ? "{…}" : me()(e4) ? pt()('<div class="'.concat(t3("preview"), '">').concat(X(e4), "</div>")) : m()(e4);
            } }, { key: "formatPreview", value: function(e4) {
              var t3 = this, n4 = this.console.c, o2 = mt()();
              this.lazyEvaluation ? this.objects[o2] = e4 : this.extractObj(e4, {}, function(e5) {
                t3.objects[o2] = e5;
              });
              var r3 = b()(["dir", "table"], this.type), i2 = z(e4);
              return "Array" === i2 && e4.length > 1 ? (i2 = "(".concat(e4.length, ")"), r3 && (i2 = "Array".concat(i2))) : "RegExp" === i2 ? i2 = m()(e4) : we()(e4) && (i2 = this.formatElName(e4)), '<div class="'.concat(n4("preview"), '" data-id="').concat(o2, '">') + '<div class="'.concat(n4("preview-container"), '">') + '<div class="'.concat(n4("preview-icon-container"), '"><span class="').concat(n4("icon icon-caret-right"), '"></span></div>') + '<span class="'.concat(n4("preview-content-container"), '">') + '<span class="'.concat(n4("descriptor"), '">').concat(p()(i2), "</span> ") + '<span class="'.concat(n4("object-preview"), '">').concat(r3 ? "" : X(e4, { getterVal: this.accessGetter, unenumerable: false }), "</span>") + "</span></div>" + '<div class="'.concat(n4("json hidden"), '"></div></div>');
            } }, { key: "substituteStr", value: function(e4) {
              var t3 = p()(e4[0]), n4 = false, o2 = "";
              e4.shift();
              for (var r3 = 0, i2 = t3.length; r3 < i2; r3++) {
                var a2 = t3[r3];
                if ("%" === a2 && 0 !== e4.length) {
                  r3++;
                  var s2 = e4.shift();
                  switch (t3[r3]) {
                    case "i":
                    case "d":
                      o2 += xe()(s2);
                      break;
                    case "f":
                      o2 += Y()(s2);
                      break;
                    case "s":
                      o2 += m()(s2);
                      break;
                    case "O":
                      ue()(s2) ? o2 += this.formatPreview(s2) : o2 += m()(s2);
                      break;
                    case "o":
                      we()(s2) ? o2 += this.formatEl(s2) : ue()(s2) ? o2 += this.formatPreview(s2) : o2 += m()(s2);
                      break;
                    case "c":
                      if (t3.length <= r3 + 1)
                        break;
                      n4 && (o2 += "</span>"), n4 = true, o2 += '<span style="'.concat(Et(s2), '">');
                      break;
                    default:
                      r3--, e4.unshift(s2), o2 += a2;
                  }
                } else
                  o2 += a2;
              }
              return n4 && (o2 += "</span>"), e4.unshift(o2), e4;
            } }, { key: "formatJs", value: function(e4) {
              return '<pre class="'.concat(this.console.c("code"), '">').concat(this.console.c(ct()(e4, "js", Ct)), "</pre>");
            } }, { key: "formatFn", value: function(e4) {
              return '<pre style="display:inline">'.concat(this.formatJs(e4.toString()), "</pre>");
            } }, { key: "formatElName", value: function(e4) {
              var t3 = e4.id, n4 = e4.className, o2 = e4.tagName.toLowerCase();
              if ("" !== t3 && (o2 += "#".concat(t3)), fe()(n4)) {
                var r3 = "";
                k()(n4.split(/\s+/g), function(e5) {
                  "" !== e5.trim() && (r3 += ".".concat(e5));
                }), o2 += r3;
              }
              return o2;
            } }, { key: "formatEl", value: function(e4) {
              var t3 = mt()();
              return this.elements[t3] = e4, this.console.c('<div class="dom-viewer" data-id="'.concat(t3, '"></div>'));
            } }]), n3;
          }(Qe());
          function Et(e3) {
            var t2 = (e3 = Le()(e3)).split(";"), n3 = {};
            k()(t2, function(e4) {
              if (b()(e4, ":")) {
                var t3 = i(e4.split(":"), 2), o3 = t3[0], r3 = t3[1];
                n3[D()(o3)] = D()(r3);
              }
            }), n3.display = "inline-block", n3["max-width"] = "100%", delete n3.width, delete n3.height;
            var o2 = "";
            return k()(n3, function(e4, t3) {
              o2 += "".concat(t3, ":").concat(e4, ";");
            }), o2;
          }
          var Ot = n2(1194), Tt = n2.n(Ot), Nt = n2(8847), Mt = n2.n(Nt), jt = n2(6329), zt = n2.n(jt), Rt = n2(9001), Zt = n2.n(Rt), It = n2(9702), Dt = n2.n(It), Bt = n2(2439), Ft = n2.n(Bt), Lt = n2(8933), Pt = n2.n(Lt), Ht = n2(4407), $t = n2.n(Ht), Gt = n2(5852), Yt = n2.n(Gt);
          function qt(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, d2.Z)(e3);
              if (t2) {
                var r3 = (0, d2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, u2.Z)(this, n3);
            };
          }
          var Jt, Qt = function(e3) {
            (0, l.Z)(n3, e3);
            var t2 = qt(n3);
            function n3(e4, o2) {
              var r3, i2, s2 = o2.compName, c2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, l2 = void 0 === c2 ? "light" : c2;
              return (0, a.Z)(this, n3), (r3 = t2.call(this)).subComponents = [], r3.compName = s2, r3.c = U(s2), r3.options = {}, r3.container = e4, r3.$container = Ge()(e4), r3.$container.addClass(["luna-".concat(s2), r3.c("platform-".concat((i2 = J()(), "os x" === i2 ? "mac" : i2)))]), r3.on("optionChange", function(e5, t3, n4) {
                var o3 = r3.c;
                "theme" === e5 && (r3.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t3))), k()(r3.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), r3.setOption("theme", l2), r3;
            }
            return (0, s.Z)(n3, [{ key: "destroy", value: function() {
              var e4 = this;
              this.destroySubComponents();
              var t3 = this.$container, n4 = t3.attr("class");
              k()(n4.split(/\s+/), function(n5) {
                w()(n5, "luna-".concat(e4.compName)) && t3.rmClass(n5);
              }), t3.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, k()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              Yt()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              k()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              be()(e4, t3), zt()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(Qe()), Wt = n2(1571), Ut = n2.n(Wt);
          function Vt(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, d2.Z)(e3);
              if (t2) {
                var r3 = (0, d2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, u2.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var Kt = navigator.userAgent, Xt = Kt.indexOf("Android") > -1 || Kt.indexOf("Adr") > -1, en = 0, tn = function(e3) {
            (0, l.Z)(n3, e3);
            var t2 = Vt(n3);
            function n3(e4) {
              var o2, r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (0, a.Z)(this, n3), (o2 = t2.call(this, e4, { compName: "console" }, r3)).spaceHeight = 0, o2.topSpaceHeight = 0, o2.bottomSpaceHeight = 0, o2.lastScrollTop = 0, o2.lastTimestamp = 0, o2.speedToleranceFactor = 100, o2.maxSpeedTolerance = 2e3, o2.minSpeedTolerance = 100, o2.logs = [], o2.displayLogs = [], o2.timer = {}, o2.counter = {}, o2.asyncList = [], o2.asyncTimer = null, o2.isAtBottom = true, o2.groupStack = new (Zt())(), o2.selectedLog = null, o2.onScroll = function() {
                var e5 = o2.container, t3 = e5.scrollHeight, n4 = e5.offsetHeight, r4 = e5.scrollTop;
                if (!(r4 <= 0 || n4 + r4 > t3)) {
                  var i2 = false;
                  (t3 === n4 || r4 === t3 - n4) && (i2 = true), o2.isAtBottom = i2;
                  var a2 = o2.lastScrollTop, s2 = o2.lastTimestamp, c2 = Mt()(), l2 = c2 - s2, u3 = r4 - a2, d3 = Math.abs(u3 / l2) * o2.speedToleranceFactor;
                  l2 > 1e3 && (d3 = 1e3), d3 > o2.maxSpeedTolerance && (d3 = o2.maxSpeedTolerance), d3 < o2.minSpeedTolerance && (d3 = o2.minSpeedTolerance), o2.lastScrollTop = r4, o2.lastTimestamp = c2;
                  var f3 = 0, h2 = 0;
                  a2 < r4 ? (f3 = o2.minSpeedTolerance, h2 = d3) : (f3 = d3, h2 = o2.minSpeedTolerance), o2.topSpaceHeight < r4 - f3 && o2.topSpaceHeight + o2.el.offsetHeight > r4 + n4 + h2 || o2.renderViewport({ topTolerance: 2 * f3, bottomTolerance: 2 * h2 });
                }
              }, o2.initTpl(), o2.initOptions(r3, { maxNum: 0, asyncRender: true, showHeader: false, filter: "", level: ["verbose", "info", "warning", "error"], accessGetter: false, unenumerable: true, lazyEvaluation: true }), o2.$el = o2.find(".logs"), o2.el = o2.$el.get(0), o2.$fakeEl = o2.find(".fake-logs"), o2.fakeEl = o2.$fakeEl.get(0), o2.$space = o2.find(".logs-space"), o2.space = o2.$space.get(0), Xt && (o2.speedToleranceFactor = 800, o2.maxSpeedTolerance = 3e3, o2.minSpeedTolerance = 800), o2.resizeSensor = new (ce())(e4), o2.renderViewport = Ft()(function(e5) {
                o2._renderViewport(e5);
              }, 16), o2.global = { copy: function(e5) {
                fe()(e5) || (e5 = JSON.stringify(e5, null, 2)), et()(e5);
              }, $: function(e5) {
                return document.querySelector(e5);
              }, $$: function(e5) {
                return je()(document.querySelectorAll(e5));
              }, $x: function(e5) {
                return Pt()(e5);
              }, clear: function() {
                o2.clear();
              }, dir: function(e5) {
                o2.dir(e5);
              }, table: function(e5, t3) {
                o2.table(e5, t3);
              }, keys: He() }, o2.bindEvent(), o2;
            }
            return (0, s.Z)(n3, [{ key: "setGlobal", value: function(e4, t3) {
              this.global[e4] = t3;
            } }, { key: "destroy", value: function() {
              this.$container.off("scroll", this.onScroll), this.resizeSensor.destroy(), (0, c.Z)((0, d2.Z)(n3.prototype), "destroy", this).call(this);
            } }, { key: "count", value: function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default", t3 = this.counter;
              Oe()(t3[e4]) ? t3[e4] = 1 : t3[e4]++, this.info("".concat(e4, ": ").concat(t3[e4]));
            } }, { key: "countReset", value: function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default";
              this.counter[e4] = 0;
            } }, { key: "assert", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              O()(t3) || (t3.shift() || (0 === t3.length && t3.unshift("console.assert"), t3.unshift("Assertion failed: "), this.insert("error", t3)));
            } }, { key: "log", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              O()(t3) || this.insert("log", t3);
            } }, { key: "debug", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              O()(t3) || this.insert("debug", t3);
            } }, { key: "dir", value: function(e4) {
              Oe()(e4) || this.insert("dir", [e4]);
            } }, { key: "table", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              O()(t3) || this.insert("table", t3);
            } }, { key: "time", value: function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default";
              if (this.timer[e4])
                return this.insert("warn", ["Timer '".concat(e4, "' already exists")]);
              this.timer[e4] = Tt()();
            } }, { key: "timeLog", value: function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default", t3 = this.timer[e4];
              if (!t3)
                return this.insert("warn", ["Timer '".concat(e4, "' does not exist")]);
              this.info("".concat(e4, ": ").concat(Tt()() - t3, "ms"));
            } }, { key: "timeEnd", value: function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default";
              this.timeLog(e4), delete this.timer[e4];
            } }, { key: "clear", value: function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              this.logs = [], this.displayLogs = [], this.selectLog(null), this.lastLog = void 0, this.counter = {}, this.timer = {}, this.groupStack = new (Zt())(), this.asyncList = [], this.asyncTimer && (clearTimeout(this.asyncTimer), this.asyncTimer = null), e4 ? this.render() : this.insert("log", ["%cConsole was cleared", "color:#808080;font-style:italic;"]);
            } }, { key: "info", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              O()(t3) || this.insert("info", t3);
            } }, { key: "error", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              O()(t3) || this.insert("error", t3);
            } }, { key: "warn", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              O()(t3) || this.insert("warn", t3);
            } }, { key: "group", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              this.insert({ type: "group", args: t3, ignoreFilter: true });
            } }, { key: "groupCollapsed", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              this.insert({ type: "groupCollapsed", args: t3, ignoreFilter: true });
            } }, { key: "groupEnd", value: function() {
              this.insert("groupEnd");
            } }, { key: "evaluate", value: function(e4) {
              this.insert({ type: "input", args: [e4], ignoreFilter: true });
              try {
                this.output(this.evalJs(e4));
              } catch (e5) {
                this.insert({ type: "error", ignoreFilter: true, args: [e5] });
              }
            } }, { key: "html", value: function() {
              for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                t3[n4] = arguments[n4];
              this.insert("html", t3);
            } }, { key: "toggleGroup", value: function(e4) {
              e4.targetGroup.collapsed ? this.openGroup(e4) : this.collapseGroup(e4);
            } }, { key: "output", value: function(e4) {
              this.insert({ type: "output", args: [e4], ignoreFilter: true });
            } }, { key: "render", value: function() {
              var e4 = this.logs, t3 = this.selectedLog;
              this.$el.html(""), this.isAtBottom = true, this.updateBottomSpace(0), this.updateTopSpace(0), this.displayLogs = [];
              for (var n4 = 0, o2 = e4.length; n4 < o2; n4++)
                this.attachLog(e4[n4]);
              t3 && (b()(this.displayLogs, t3) || this.selectLog(null));
            } }, { key: "insert", value: function(e4, t3) {
              var n4, o2 = this.options, r3 = o2.showHeader, i2 = o2.asyncRender;
              if (r3 && (n4 = { time: nn(), from: on() }), i2)
                return this.insertAsync(e4, t3, n4);
              this.insertSync(e4, t3, n4);
            } }, { key: "insertAsync", value: function(e4, t3, n4) {
              this.asyncList.push([e4, t3, n4]), this.handleAsyncList();
            } }, { key: "insertSync", value: function(e4, t3, n4) {
              var o2, r3 = this, i2 = this.logs, a2 = this.groupStack, s2 = this.options, c2 = s2.maxNum, l2 = s2.accessGetter, u3 = s2.unenumerable, d3 = s2.lazyEvaluation;
              if ("groupEnd" === (o2 = fe()(e4) ? { type: e4, args: t3, header: n4 } : e4).type)
                return this.lastLog.groupEnd(), void this.groupStack.pop();
              if (a2.size > 0 && (o2.group = a2.peek()), zt()(o2, { id: ++en, accessGetter: l2, unenumerable: u3, lazyEvaluation: d3 }), "group" === o2.type || "groupCollapsed" === o2.type) {
                var f3 = { id: mt()("group"), collapsed: false, parent: a2.peek(), indentLevel: a2.size + 1 };
                "groupCollapsed" === o2.type && (f3.collapsed = true), o2.targetGroup = f3, a2.push(f3);
              }
              var h2 = new St(this, o2);
              h2.on("updateHeight", function() {
                r3.isAtBottom = false, r3.renderViewport();
              });
              var p2 = this.lastLog;
              if (p2 && !b()(["html", "group", "groupCollapsed"], h2.type) && p2.type === h2.type && h2.isSimple() && p2.text() === h2.text() ? (p2.addCount(), h2.header && p2.updateTime(h2.header.time), h2 = p2, this.detachLog(p2)) : (i2.push(h2), this.lastLog = h2), 0 !== c2 && i2.length > c2) {
                var v2 = i2[0];
                this.detachLog(v2), i2.shift();
              }
              this.attachLog(h2), this.emit("insert", h2);
            } }, { key: "updateTopSpace", value: function(e4) {
              this.topSpaceHeight = e4, this.el.style.top = e4 + "px";
            } }, { key: "updateBottomSpace", value: function(e4) {
              this.bottomSpaceHeight = e4;
            } }, { key: "updateSpace", value: function(e4) {
              this.spaceHeight !== e4 && (this.spaceHeight = e4, this.space.style.height = e4 + "px");
            } }, { key: "detachLog", value: function(e4) {
              var t3 = this.displayLogs, n4 = t3.indexOf(e4);
              n4 > -1 && (t3.splice(n4, 1), this.renderViewport());
            } }, { key: "attachLog", value: function(e4) {
              if (this.filterLog(e4) && !e4.collapsed) {
                var t3 = this.displayLogs;
                if (0 === t3.length)
                  return t3.push(e4), void this.renderViewport();
                var n4 = Dt()(t3);
                if (e4.id > n4.id)
                  return t3.push(e4), void this.renderViewport();
                for (var o2, r3 = 0, i2 = t3.length - 1, a2 = 0; r3 <= i2; ) {
                  if ((o2 = t3[a2 = r3 + Math.floor((i2 - r3) / 2)]).id === e4.id)
                    return;
                  o2.id < e4.id ? r3 = a2 + 1 : i2 = a2 - 1;
                }
                o2.id < e4.id ? t3.splice(a2 + 1, 0, e4) : t3.splice(a2, 0, e4), this.renderViewport();
              }
            } }, { key: "handleAsyncList", value: function() {
              var e4 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 20, n4 = this.asyncList;
              this.asyncTimer || (this.asyncTimer = setTimeout(function() {
                e4.asyncTimer = null;
                var t4, o2, r3 = false, a2 = n4.length;
                a2 < 1e3 ? (o2 = 200, t4 = 400) : a2 < 5e3 ? (o2 = 500, t4 = 800) : a2 < 1e4 ? (o2 = 800, t4 = 1e3) : a2 < 25e3 ? (o2 = 1e3, t4 = 1200) : a2 < 5e4 ? (o2 = 1500, t4 = 1500) : (o2 = 2e3, t4 = 2500), o2 > a2 && (o2 = a2, r3 = true);
                for (var s2 = 0; s2 < o2; s2++) {
                  var c2 = i(n4.shift(), 3), l2 = c2[0], u3 = c2[1], d3 = c2[2];
                  e4.insertSync(l2, u3, d3);
                }
                r3 || Ut()(function() {
                  return e4.handleAsyncList(t4);
                });
              }, t3));
            } }, { key: "injectGlobal", value: function() {
              k()(this.global, function(e4, t3) {
                window[t3] || (window[t3] = e4);
              });
            } }, { key: "clearGlobal", value: function() {
              k()(this.global, function(e4, t3) {
                window[t3] && window[t3] === e4 && delete window[t3];
              });
            } }, { key: "evalJs", value: function(e4) {
              var t3;
              this.injectGlobal();
              try {
                t3 = eval.call(window, "(".concat(e4, ")"));
              } catch (n4) {
                t3 = eval.call(window, e4);
              }
              return this.setGlobal("$_", t3), this.clearGlobal(), t3;
            } }, { key: "filterLog", value: function(e4) {
              var t3 = this.options.level, n4 = this.options.filter;
              if (e4.ignoreFilter)
                return true;
              if (!b()(t3, e4.level))
                return false;
              if (n4) {
                if (Ne()(n4))
                  return n4(e4);
                if (xt()(n4))
                  return n4.test(Le()(e4.text()));
                if (fe()(n4) && (n4 = D()(n4)))
                  return b()(Le()(e4.text()), Le()(n4));
              }
              return true;
            } }, { key: "collapseGroup", value: function(e4) {
              e4.targetGroup.collapsed = true, e4.updateIcon("caret-right"), this.updateGroup(e4);
            } }, { key: "openGroup", value: function(e4) {
              e4.targetGroup.collapsed = false, e4.updateIcon("caret-down"), this.updateGroup(e4);
            } }, { key: "updateGroup", value: function(e4) {
              for (var t3 = e4.targetGroup, n4 = this.logs, o2 = n4.length, r3 = n4.indexOf(e4) + 1; r3 < o2; ) {
                var i2 = n4[r3];
                if (!i2.checkGroup() && i2.group === t3)
                  break;
                i2.collapsed ? this.detachLog(i2) : this.attachLog(i2), r3++;
              }
            } }, { key: "selectLog", value: function(e4) {
              var t3;
              (this.selectedLog && (this.selectedLog.deselect(), this.selectedLog = null), Se()(e4)) ? this.emit("deselect") : (this.selectedLog = e4, null === (t3 = this.selectedLog) || void 0 === t3 || t3.select(), this.emit("select", e4));
            } }, { key: "bindEvent", value: function() {
              var e4 = this, t3 = this.$el, n4 = this.c;
              this.resizeSensor.addListener(this.renderViewport);
              var o2 = this;
              t3.on("click", n4(".log-container"), function() {
                o2.selectLog(this.log);
              }), this.on("optionChange", function(t4, n5) {
                var o3 = e4.logs;
                switch (t4) {
                  case "maxNum":
                    n5 > 0 && o3.length > n5 && (e4.logs = o3.slice(o3.length - n5), e4.render());
                    break;
                  case "filter":
                    e4.render();
                    break;
                  case "level":
                    e4.options.level = je()(n5), e4.render();
                }
              }), this.$container.on("scroll", this.onScroll);
            } }, { key: "_renderViewport", value: function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t3 = e4.topTolerance, n4 = void 0 === t3 ? 500 : t3, o2 = e4.bottomTolerance, r3 = void 0 === o2 ? 500 : o2, i2 = this.el, a2 = this.container, s2 = this.space;
              if (!W()(a2)) {
                for (var c2 = a2.scrollTop, l2 = a2.offsetHeight, u3 = s2.getBoundingClientRect().width, d3 = c2 - n4, f3 = c2 + l2 + r3, h2 = this.displayLogs, p2 = 0, v2 = 0, m2 = 0, g2 = h2.length, b2 = this.fakeEl, y2 = document.createDocumentFragment(), w2 = [], _2 = 0; _2 < g2; _2++) {
                  var x2 = h2[_2], A2 = x2.width;
                  0 !== x2.height && A2 === u3 || (y2.appendChild(x2.container), w2.push(x2));
                }
                if (w2.length > 0) {
                  b2.appendChild(y2);
                  for (var k2 = 0, C2 = w2.length; k2 < C2; k2++)
                    w2[k2].updateSize();
                  b2.textContent = "";
                }
                for (var S2 = document.createDocumentFragment(), E2 = 0; E2 < g2; E2++) {
                  var O2 = h2[E2], T2 = O2.container, N2 = O2.height;
                  m2 > f3 ? v2 += N2 : m2 + N2 > d3 ? S2.appendChild(T2) : m2 < d3 && (p2 += N2), m2 += N2;
                }
                for (this.updateSpace(m2), this.updateTopSpace(p2), this.updateBottomSpace(v2); i2.firstChild; )
                  i2.lastChild && i2.removeChild(i2.lastChild);
                i2.appendChild(S2);
                var M2 = a2.scrollHeight;
                this.isAtBottom && c2 <= M2 - l2 && (a2.scrollTop = 1e7);
              }
            } }, { key: "initTpl", value: function() {
              this.$container.html(this.c(ft()(Jt || (Jt = (0, o.Z)(['\n      <div class="logs-space">\n        <div class="fake-logs"></div>\n        <div class="logs"></div>\n      </div>\n    '])))));
            } }]), n3;
          }(Qt), nn = function() {
            return $t()("HH:MM:ss ");
          };
          function on() {
            for (var e3 = new Error(), t2 = "", n3 = e3.stack ? e3.stack.split("\n") : "", o2 = 0, r3 = n3.length; o2 < r3; o2++)
              if ((t2 = n3[o2]).indexOf("winConsole") > -1 && o2 < r3 - 1) {
                t2 = n3[o2 + 1];
                break;
              }
            return t2;
          }
          (function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          })(e2, tn);
        }, 5564: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return je;
          } });
          var o = n2(168), r2 = n2(5671), i = n2(3144), a = n2(7326), s = n2(1752), c = n2(9340), l = n2(2963), u2 = n2(1120), d2 = n2(1512), f2 = n2.n(d2), h = n2(1907), p = n2.n(h), v = n2(1443), m = n2.n(v), g = n2(2461), b = n2.n(g), y = n2(4331), w = n2.n(y), _ = n2(5610), x = n2.n(_), A = n2(7483), k = n2.n(A), C = (n2(3990), n2(6341)), S = n2.n(C), E = n2(3875), O = n2.n(E), T = n2(6954), N = n2.n(T);
          n2(9585);
          function M(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return b()(w()(e4).split(/\s+/), function(e5) {
                return S()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = k().parse(e4);
                  return j(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), k().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function j(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && j(r3.content, t2);
            }
          }
          var z = "ontouchstart" in x(), R = "PointerEvent" in x(), Z = { start: "touchstart", move: "touchmove", end: "touchend" }, I = { start: "mousedown", move: "mousemove", end: "mouseup" }, D = { start: "pointerdown", move: "pointermove", end: "pointerup" };
          function B(e3) {
            return R ? D[e3] : z ? Z[e3] : I[e3];
          }
          function F(e3, t2) {
            var n3 = "x" === e3 ? "clientX" : "clientY";
            return t2[n3] ? t2[n3] : t2.changedTouches ? t2.changedTouches[0][n3] : 0;
          }
          function L(e3) {
            return O()(e3.replace("px", ""));
          }
          var P = n2(3783), H = n2.n(P), $2 = n2(6329), G = n2.n($2), Y = n2(4193), q = n2.n(Y), J = n2(5852), Q = n2.n(J), W = n2(6930), U = n2.n(W);
          function V(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, u2.Z)(e3);
              if (t2) {
                var r3 = (0, u2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, l.Z)(this, n3);
            };
          }
          var K, X = function(e3) {
            (0, c.Z)(n3, e3);
            var t2 = V(n3);
            function n3(e4, o2) {
              var i2, a2, s2 = o2.compName, c2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, l2 = void 0 === c2 ? "light" : c2;
              return (0, r2.Z)(this, n3), (i2 = t2.call(this)).subComponents = [], i2.compName = s2, i2.c = M(s2), i2.options = {}, i2.container = e4, i2.$container = f2()(e4), i2.$container.addClass(["luna-".concat(s2), i2.c("platform-".concat((a2 = N()(), "os x" === a2 ? "mac" : a2)))]), i2.on("optionChange", function(e5, t3, n4) {
                var o3 = i2.c;
                "theme" === e5 && (i2.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t3))), H()(i2.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), i2.setOption("theme", l2), i2;
            }
            return (0, i.Z)(n3, [{ key: "destroy", value: function() {
              var e4 = this;
              this.destroySubComponents();
              var t3 = this.$container, n4 = t3.attr("class");
              H()(n4.split(/\s+/), function(n5) {
                U()(n5, "luna-".concat(e4.compName)) && t3.rmClass(n5);
              }), t3.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, H()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              Q()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              H()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              q()(e4, t3), G()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(m()), ee = n2(8901), te = n2.n(ee), ne = n2(8613), oe = n2.n(ne), re = n2(3367), ie = n2.n(re), ae = n2(9833), se = n2.n(ae), ce = n2(1286), le = n2.n(ce), ue = n2(242), de = n2.n(ue), fe = n2(2439), he = n2.n(fe), pe = n2(6156), ve = n2.n(pe), me = n2(4777), ge = n2.n(me), be = n2(1754), ye = n2.n(be), we = n2(6768), _e = n2.n(we), xe = n2(3063), Ae = n2.n(xe), ke = n2(9882), Ce = n2.n(ke), Se = n2(9853), Ee = n2.n(Se), Oe = n2(6435), Te = n2.n(Oe);
          function Ne(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, u2.Z)(e3);
              if (t2) {
                var r3 = (0, u2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, l.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var Me = f2()(document), je = function(e3) {
            (0, c.Z)(n3, e3);
            var t2 = Ne(n3);
            function n3(e4, o2) {
              var i2;
              (0, r2.Z)(this, n3), (i2 = t2.call(this, e4, { compName: "data-grid" }, o2)).resizeIdx = 0, i2.resizeStartX = 0, i2.resizeStartLeft = 0, i2.resizeDeltaX = 0, i2.nodes = [], i2.colWidthsInitialized = false, i2.colMap = {}, i2.selectedNode = null, i2.isAscending = true, i2.colWidths = [], i2.onResizeColMove = function(e5) {
                var t3 = (0, a.Z)(i2), n4 = t3.resizeIdx, o3 = t3.$resizers, r3 = t3.colWidths, s3 = t3.$colgroup, c3 = F("x", e5 = e5.origEvent) - i2.resizeStartX, l3 = r3[n4], u4 = r3[n4 + 1], d3 = Te()(24 - l3, 0), h2 = Ee()(u4 - 24, 0);
                c3 = Ce()(c3, d3, h2), s3.each(function() {
                  var e6 = f2()(this).find("col");
                  e6.eq(n4).css("width", l3 + c3 + "px"), e6.eq(n4 + 1).css("width", u4 - c3 + "px");
                }), i2.resizeDeltaX = c3;
                var p2 = i2.resizeStartLeft + c3;
                o3.eq(n4).css("left", "".concat(p2, "px"));
              }, i2.onResizeColEnd = function(e5) {
                i2.onResizeColMove(e5);
                var t3 = (0, a.Z)(i2), n4 = t3.c, o3 = t3.colWidths, r3 = t3.resizeIdx, s3 = t3.resizeDeltaX, c3 = i2.options.columns, l3 = c3[r3], u4 = c3[r3 + 1], d3 = o3[r3] + s3, h2 = d3 + (o3[r3 + 1] - s3), p2 = l3.weight + u4.weight, v2 = p2 * (d3 / h2), m2 = p2 - v2;
                l3.weight = v2, u4.weight = m2, i2.applyColWeights(), f2()(document.body).rmClass(n4("resizing")), Me.off(B("move"), i2.onResizeColMove), Me.off(B("end"), i2.onResizeColEnd);
              }, i2.$container.attr("tabindex", "0"), i2.resizeSensor = new (de())(e4), i2.onResize = he()(function() {
                i2.updateHeight(), i2.updateWeights();
              }, 16), o2.height && (o2.maxHeight = o2.height, o2.minHeight = o2.height), i2.initOptions(o2, { minHeight: 41, maxHeight: 1 / 0, filter: "" });
              var s2 = i2.options, c2 = s2.columns, l2 = s2.minHeight, u3 = s2.maxHeight;
              return H()(c2, function(e5) {
                q()(e5, { sortable: false }), i2.colMap[e5.id] = e5;
              }), u3 < l2 && i2.setOption("maxHeight", l2), i2.initTpl(), i2.$headerRow = i2.find(".header").find("tr"), i2.$fillerRow = i2.find(".filler-row"), i2.fillerRow = i2.$fillerRow.get(0), i2.$tableBody = i2.find(".data").find("tbody"), i2.tableBody = i2.$tableBody.get(0), i2.$colgroup = i2.$container.find("colgroup"), i2.$dataContainer = i2.find(".data-container"), i2.renderHeader(), i2.renderResizers(), i2.updateWeights(), i2.updateHeight(), i2.bindEvent(), i2;
            }
            return (0, i.Z)(n3, [{ key: "destroy", value: function() {
              (0, s.Z)((0, u2.Z)(n3.prototype), "destroy", this).call(this), this.resizeSensor.destroy(), this.$container.rmAttr("tabindex");
            } }, { key: "remove", value: function(e4) {
              var t3 = this.nodes, n4 = t3.indexOf(e4);
              n4 > -1 && (e4.detach(), t3.splice(n4, 1), e4 === this.selectedNode && this.selectNode(t3[n4] || t3[n4 - 1] || null), this.updateHeight());
            } }, { key: "append", value: function(e4, t3) {
              var n4 = new ze(this, e4, t3);
              return this.nodes.push(n4), this.sortId ? this.sortNodes(this.sortId, this.isAscending) : this.filterNode(n4) && (this.tableBody.insertBefore(n4.container, this.fillerRow), this.updateHeight()), n4;
            } }, { key: "clear", value: function() {
              H()(this.nodes, function(e4) {
                return e4.detach();
              }), this.nodes = [], this.selectNode(null), this.updateHeight();
            } }, { key: "updateHeight", value: function() {
              var e4 = this.$fillerRow, t3 = this.c, n4 = this.$container, o2 = this.options, r3 = o2.maxHeight, i2 = o2.minHeight;
              this.$dataContainer.css({ height: "auto" });
              var a2 = this.$headerRow.offset().height + L(n4.css("border-top-width")) + L(n4.css("border-bottom-width"));
              (i2 -= a2) < 0 && (i2 = 0), r3 -= a2;
              var s2 = this.$dataContainer.find(t3(".node")), c2 = s2.length, l2 = 0;
              c2 > 0 && (l2 = s2.offset().height * c2);
              l2 > i2 ? e4.hide() : e4.show(), l2 < i2 ? l2 = i2 : l2 >= r3 && (l2 = r3), this.$dataContainer.css({ height: l2 });
            } }, { key: "selectNode", value: function(e4) {
              var t3;
              (ve()(e4) || null != e4 && e4.selectable) && (this.selectedNode && (this.selectedNode.deselect(), this.selectedNode = null), ve()(e4) ? this.emit("deselect") : (this.selectedNode = e4, null === (t3 = this.selectedNode) || void 0 === t3 || t3.select(), this.emit("select", e4)));
            } }, { key: "onResizeColStart", value: function(e4) {
              var t3 = this.c, n4 = this.resizeIdx, o2 = this.$resizers;
              e4.stopPropagation(), e4.preventDefault(), e4 = e4.origEvent, this.resizeStartX = F("x", e4), this.resizeStartLeft = L(o2.eq(n4).css("left")), f2()(document.body).addClass(t3("resizing")), Me.on(B("move"), this.onResizeColMove), Me.on(B("end"), this.onResizeColEnd);
            } }, { key: "bindEvent", value: function() {
              var e4 = this, t3 = this.c, n4 = this.$headerRow, o2 = this.$tableBody, r3 = this.$resizers;
              this.resizeSensor.addListener(this.onResize);
              var i2 = this;
              o2.on("click", t3(".node"), function() {
                i2.selectNode(this.dataGridNode);
              }), n4.on("click", t3(".sortable"), function(e5) {
                e5.stopPropagation();
                var t4 = f2()(this), o3 = t4.data("id"), r4 = "descending" !== t4.data("order");
                t4.data("order", r4 ? "descending" : "ascending"), i2.sortNodes(o3, r4), n4.find("th").each(function() {
                  var e6 = f2()(this);
                  e6.data("id") !== o3 && e6.rmAttr("data-order");
                });
              }), r3.on(B("start"), function(e5) {
                var t4 = f2()(this);
                i2.resizeIdx = O()(t4.data("idx")), i2.onResizeColStart(e5);
              }), this.on("optionChange", function(t4) {
                switch (t4) {
                  case "minHeight":
                  case "maxHeight":
                    e4.updateHeight();
                    break;
                  case "filter":
                    e4.renderData();
                }
              });
            } }, { key: "sortNodes", value: function(e4, t3) {
              var n4 = this.colMap[e4].comparator || Re;
              this.nodes.sort(function(o2, r3) {
                var i2 = o2.data[e4], a2 = r3.data[e4];
                return se()(i2) && (i2 = i2.innerText), se()(a2) && (a2 = a2.innerText), t3 ? n4(i2, a2) : n4(a2, i2);
              }), this.renderData(), this.sortId = e4, this.isAscending = t3;
            } }, { key: "updateWeights", value: function() {
              var e4 = this.container, t3 = this.$headerRow, n4 = this.options.columns, o2 = e4.offsetWidth;
              if (!this.colWidthsInitialized && o2) {
                for (var r3 = 0, i2 = n4.length; r3 < i2; r3++) {
                  var a2 = n4[r3];
                  if (!a2.weight) {
                    var s2 = t3.find("th").get(r3).offsetWidth;
                    a2.weight = 100 * s2 / o2;
                  }
                }
                this.colWidthsInitialized = true;
              }
              this.applyColWeights();
            } }, { key: "applyColWeights", value: function() {
              var e4 = this.container, t3 = this.$colgroup, n4 = this.options.columns, o2 = e4.offsetWidth;
              if (!(o2 <= 0)) {
                for (var r3 = 0, i2 = n4.length, a2 = 0; a2 < i2; a2++)
                  r3 += n4[a2].weight;
                var s2 = "", c2 = 0, l2 = 0;
                this.colWidths = [];
                for (var u3 = 0; u3 < i2; u3++) {
                  var d3 = (c2 += n4[u3].weight) * o2 / r3 | 0, f3 = Math.max(d3 - l2, 14);
                  l2 = d3, s2 += '<col style="width:'.concat(f3, 'px"></col>'), this.colWidths[u3] = f3;
                }
                t3.html(s2), this.positionResizers();
              }
            } }, { key: "positionResizers", value: function() {
              for (var e4 = this.colWidths, t3 = [], n4 = e4.length - 1, o2 = 0; o2 < n4; o2++)
                t3[o2] = (t3[o2 - 1] || 0) + e4[o2];
              for (var r3 = 0; r3 < n4; r3++)
                this.$resizers.eq(r3).css("left", t3[r3] + "px");
            } }, { key: "renderData", value: function() {
              var e4 = this, t3 = this.tableBody, n4 = this.nodes, o2 = this.fillerRow;
              H()(n4, function(e5) {
                return e5.detach();
              }), H()(n4, function(n5) {
                e4.filterNode(n5) && t3.insertBefore(n5.container, o2);
              }), this.selectedNode && !this.filterNode(this.selectedNode) && this.selectNode(null), this.updateHeight();
            } }, { key: "filterNode", value: function(e4) {
              var t3 = this.options.filter;
              if (t3) {
                if (ge()(t3))
                  return t3(e4);
                if (ye()(t3))
                  return t3.test(e4.text());
                if (_e()(t3) && (t3 = w()(t3)))
                  return S()(Ae()(e4.text()), Ae()(t3));
              }
              return true;
            } }, { key: "renderHeader", value: function() {
              var e4 = this.c, t3 = "", n4 = "";
              H()(this.options.columns, function(o2) {
                var r3 = te()(o2.title);
                o2.sortable ? t3 += e4('<th class="sortable" data-id="'.concat(o2.id, '">').concat(r3, "</th>")) : t3 += "<th>".concat(r3, "</th>"), n4 += "<td></td>";
              }), this.$headerRow.html(t3), this.$fillerRow.html(n4);
            } }, { key: "renderResizers", value: function() {
              for (var e4 = "", t3 = this.options.columns.length - 1, n4 = 0; n4 < t3; n4++)
                e4 += this.c('<div class="resizer" data-idx="'.concat(n4, '"></div>'));
              this.$container.append(e4), this.$resizers = this.find(".resizer");
            } }, { key: "initTpl", value: function() {
              this.$container.html(this.c(p()(K || (K = (0, o.Z)(['\n        <div class="header-container">\n          <table class="header">\n            <colgroup></colgroup>\n            <tbody>\n              <tr></tr>\n            </tbody>\n          </table>\n        </div>\n        <div class="data-container">\n          <table class="data">\n            <colgroup></colgroup>\n            <tbody>\n              <tr class="filler-row"></tr>\n            </tbody>\n          </table>\n        </div>\n      '])))));
            } }]), n3;
          }(X), ze = function() {
            function e3(t2, n3) {
              var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { selectable: false };
              (0, r2.Z)(this, e3), this.container = oe()("tr"), this.selectable = false, this.container.dataGridNode = this, this.$container = f2()(this.container), this.$container.addClass(t2.c("node")), this.dataGrid = t2, this.data = n3, o2.selectable && (this.selectable = o2.selectable), this.render();
            }
            return (0, i.Z)(e3, [{ key: "text", value: function() {
              return this.$container.text();
            } }, { key: "detach", value: function() {
              this.$container.remove();
            } }, { key: "select", value: function() {
              this.$container.addClass(this.dataGrid.c("selected"));
            } }, { key: "deselect", value: function() {
              this.$container.rmClass(this.dataGrid.c("selected"));
            } }, { key: "render", value: function() {
              var e4 = this.data, t2 = this.$container, n3 = this.container, o2 = this.dataGrid.getOption("columns");
              t2.html(""), H()(o2, function(t3) {
                var o3 = oe()("td"), r3 = e4[t3.id];
                le()(r3) || (se()(r3) ? o3.appendChild(r3) : o3.innerText = ie()(r3)), n3.appendChild(o3);
              });
            } }]), e3;
          }();
          function Re(e3, t2) {
            if (e3 = ie()(e3), t2 = ie()(t2), U()(e3, "_") && !U()(t2, "_"))
              return 1;
            if (U()(t2, "_") && !U()(e3, "_"))
              return -1;
            for (var n3, o2, r3, i2, a2 = /^\d+|^\D+/; ; ) {
              if (!e3)
                return t2 ? -1 : 0;
              if (!t2)
                return 1;
              if (n3 = e3.match(a2)[0], o2 = t2.match(a2)[0], r3 = !isNaN(n3), i2 = !isNaN(o2), r3 && !i2)
                return -1;
              if (i2 && !r3)
                return 1;
              if (r3 && i2) {
                var s2 = n3 - o2;
                if (s2)
                  return s2;
                if (n3.length !== o2.length)
                  return +n3 || +o2 ? o2.length - n3.length : n3.length - o2.length;
              } else if (n3 !== o2)
                return n3 < o2 ? -1 : 1;
              e3 = e3.substring(n3.length), t2 = t2.substring(o2.length);
            }
          }
          (function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          })(e2, je);
        }, 8209: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return ue;
          } });
          var o = n2(168), r2 = n2(4942), i = n2(5671), a = n2(3144), s = n2(7326), c = n2(9340), l = n2(2963), u2 = n2(1120), d2 = n2(1443), f2 = n2.n(d2), h = n2(1512), p = n2.n(h), v = n2(2461), m = n2.n(v), g = n2(4331), b = n2.n(g), y = n2(5610), w = n2.n(y), _ = n2(7483), x = n2.n(_), A = (n2(3990), n2(6341)), k = n2.n(A), C = (n2(3875), n2(6954)), S = n2.n(C);
          n2(9585);
          function E(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return m()(b()(e4).split(/\s+/), function(e5) {
                return k()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = x().parse(e4);
                  return O(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), x().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function O(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && O(r3.content, t2);
            }
          }
          var T = "ontouchstart" in w();
          function N() {
            var e3 = S()();
            return "os x" === e3 ? "mac" : e3;
          }
          var M = n2(3783), j = n2.n(M), z = n2(6329), R = n2.n(z), Z = n2(4193), I = n2.n(Z), D = n2(5852), B = n2.n(D);
          function F(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, u2.Z)(e3);
              if (t2) {
                var r3 = (0, u2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, l.Z)(this, n3);
            };
          }
          var L, P = function(e3) {
            (0, c.Z)(n3, e3);
            var t2 = F(n3);
            function n3(e4, o2) {
              var r3, a2 = o2.compName, s2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, c2 = void 0 === s2 ? "light" : s2;
              return (0, i.Z)(this, n3), (r3 = t2.call(this)).subComponents = [], r3.compName = a2, r3.c = E(a2), r3.options = {}, r3.container = e4, r3.$container = p()(e4), r3.$container.addClass(["luna-".concat(a2), r3.c("platform-".concat(N()))]), r3.on("optionChange", function(e5, t3, n4) {
                var o3 = r3.c;
                "theme" === e5 && (r3.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t3))), j()(r3.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), r3.setOption("theme", c2), r3;
            }
            return (0, a.Z)(n3, [{ key: "destroy", value: function() {
              this.destroySubComponents();
              var e4 = this.c;
              this.$container.rmClass("luna-".concat(this.compName)).rmClass(e4("platform-".concat(N()))).rmClass(e4("theme-".concat(this.options.theme))), this.$container.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, j()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              B()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              j()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              I()(e4, t3), R()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(f2()), H = n2(8613), $2 = n2.n(H), G = n2(5972), Y = n2.n(G), q = n2(1907), J = n2.n(q), Q = n2(1352), W = n2.n(Q), U = n2(2289), V = n2.n(U), K = n2(3651), X = n2.n(K), ee = n2(7756), te = n2.n(ee), ne = n2(8901), oe = n2.n(ne), re = n2(1672), ie = n2.n(re);
          function ae(e3, t2) {
            var n3 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var o2 = Object.getOwnPropertySymbols(e3);
              t2 && (o2 = o2.filter(function(t3) {
                return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
              })), n3.push.apply(n3, o2);
            }
            return n3;
          }
          function se(e3) {
            for (var t2 = 1; t2 < arguments.length; t2++) {
              var n3 = null != arguments[t2] ? arguments[t2] : {};
              t2 % 2 ? ae(Object(n3), true).forEach(function(t3) {
                (0, r2.Z)(e3, t3, n3[t3]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n3)) : ae(Object(n3)).forEach(function(t3) {
                Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n3, t3));
              });
            }
            return e3;
          }
          function ce(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, u2.Z)(e3);
              if (t2) {
                var r3 = (0, u2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, l.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var le = { comment: "", string: "", number: "", keyword: "", operator: "" }, ue = function(e3) {
            (0, c.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4) {
              var o2, r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (0, i.Z)(this, n3), (o2 = t2.call(this, e4, { compName: "dom-viewer" }, r3)).isExpanded = false, o2.childNodes = [], o2.childNodeDomViewers = [], o2.toggle = function() {
                o2.isExpanded ? o2.collapse() : o2.expand();
              }, o2.initOptions(r3, { node: document.documentElement, parent: null, isEndTag: false, rootContainer: e4, rootDomViewer: (0, s.Z)(o2), ignore: function() {
                return false;
              } }), o2.initTpl(), o2.bindEvent(), o2.options.isEndTag || o2.initObserver(), o2;
            }
            return (0, a.Z)(n3, [{ key: "select", value: function(e4) {
              var t3 = this.c, n4 = this.options;
              if (!e4 || e4 && n4.node === e4) {
                if (this.$tag.hasClass(t3("selected")))
                  return;
                return p()(this.options.rootContainer).find(t3(".selected")).rmClass(t3("selected")).rmAttr("tabindex"), this.$tag.attr("tabindex", "0").get(0).focus(), this.$tag.addClass(t3("selected")), void n4.rootDomViewer.emit("select", n4.node);
              }
              if (e4.nodeType === Node.ELEMENT_NODE)
                for (var o2 = e4, r3 = e4.parentElement; r3; ) {
                  if (r3 === n4.node) {
                    this.expand(), this.childNodeDomViewers[this.childNodes.indexOf(o2)].select(e4);
                    break;
                  }
                  o2 = r3, r3 = r3.parentElement;
                }
            } }, { key: "attach", value: function() {
              this.container.appendChild(this.$tag.get(0)), this.$children && this.container.appendChild(this.$children.get(0));
            } }, { key: "isAttached", value: function() {
              return !!this.$tag.get(0).parentNode;
            } }, { key: "detach", value: function() {
              this.$tag.remove(), this.$children && this.$children.remove();
            } }, { key: "expand", value: function() {
              this.isExpandable() && !this.isExpanded && (this.isExpanded = true, this.renderExpandTag(), this.renderChildNodes());
            } }, { key: "collapse", value: function() {
              this.isExpandable() && this.isExpanded && (this.isExpanded = false, this.renderCollapseTag());
            } }, { key: "destroy", value: function() {
              var e4 = this.c;
              this.$tag.hasClass(e4("selected")) && this.options.rootDomViewer.emit("deselect"), this.detach(), this.observer && this.observer.disconnect(), this.destroySubComponents(), this.options.rootDomViewer === this && this.$container.rmClass("luna-dom-viewer").rmClass(e4("platform-".concat(N()))).rmClass(e4("theme-".concat(this.options.theme))), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "renderExpandTag", value: function() {
              var e4 = this.$tag, t3 = this.c, n4 = this.options.node;
              e4.html(this.renderHtmlTag(se(se({}, de(n4)), {}, { hasTail: false, hasToggleButton: true }))), e4.addClass(t3("expanded")), this.$children.rmClass(t3("hidden"));
            } }, { key: "renderCollapseTag", value: function() {
              var e4 = this.$tag, t3 = this.c, n4 = this.options.node;
              this.$children.addClass(t3("hidden")), this.$tag.html(this.renderHtmlTag(se(se({}, de(n4)), {}, { hasTail: true, hasToggleButton: true }))), e4.rmClass(t3("expanded"));
            } }, { key: "initObserver", value: function() {
              var e4 = this;
              this.observer = new (V())(function(t3) {
                j()(t3, function(t4) {
                  e4.handleMutation(t4);
                });
              }), this.observer.observe(this.options.node, { attributes: true, childList: true, characterData: true });
            } }, { key: "handleMutation", value: function(e4) {
              var t3 = this.$tag, n4 = this.c, o2 = this.options, r3 = o2.node, i2 = o2.ignore;
              if (k()(["attributes", "childList"], e4.type)) {
                if ("childList" === e4.type) {
                  if (ie()(e4.addedNodes, i2) && ie()(e4.removedNodes, i2))
                    return;
                  this.renderChildNodes();
                }
                this.isExpandable() ? this.isExpanded ? this.renderExpandTag() : this.renderCollapseTag() : (this.$children.addClass(n4("hidden")), t3.html(this.renderHtmlTag(se(se({}, de(r3)), {}, { hasTail: false }))));
              } else
                "characterData" === e4.type && (r3.nodeType === Node.TEXT_NODE ? t3.html(this.renderTextNode(r3)) : r3.nodeType === Node.COMMENT_NODE && t3.html(this.renderHtmlComment(r3.nodeValue)));
            } }, { key: "bindEvent", value: function() {
              var e4 = this, t3 = this.c, n4 = this.$tag;
              this.options.node.nodeType === Node.ELEMENT_NODE && n4.on("click", t3(".toggle"), function(t4) {
                t4.stopPropagation(), e4.toggle();
              }), T ? n4.on("click", function() {
                return e4.select();
              }) : n4.on("mousedown", function() {
                return e4.select();
              });
            } }, { key: "isExpandable", value: function() {
              return this.options.node.nodeType === Node.ELEMENT_NODE && this.getChildNodes().length > 0;
            } }, { key: "getChildNodes", value: function() {
              var e4 = this.options, t3 = e4.rootContainer, n4 = e4.ignore, o2 = this.options.node, r3 = W()(o2.childNodes);
              return r3 = Y()(r3, function(e5) {
                if (e5.nodeType === Node.TEXT_NODE || e5.nodeType === Node.COMMENT_NODE) {
                  var o3 = e5.nodeValue;
                  if ("" === b()(o3))
                    return false;
                }
                return e5 !== t3 && !n4(e5);
              });
            } }, { key: "initTpl", value: function() {
              var e4 = this.container, t3 = this.c, n4 = this.options, o2 = n4.node, r3 = n4.isEndTag, i2 = p()($2()("li"));
              if (i2.addClass(t3("tree-item")), this.$tag = i2, r3)
                i2.html(t3('<span class="html-tag" style="margin-left: -15px;">&lt;<span class="tag-name">/'.concat(o2.tagName.toLocaleLowerCase(), '</span>&gt;</span><span class="selection"></span>')));
              else if (o2.nodeType === Node.ELEMENT_NODE) {
                var a2 = this.isExpandable(), s2 = se(se({}, de(o2)), {}, { hasTail: a2, hasToggleButton: a2 });
                i2.html(this.renderHtmlTag(s2));
              } else if (o2.nodeType === Node.TEXT_NODE)
                i2.html(this.renderTextNode(o2));
              else {
                if (o2.nodeType !== Node.COMMENT_NODE)
                  return;
                var c2 = o2.nodeValue;
                if ("" === c2.trim())
                  return;
                i2.html(this.renderHtmlComment(c2));
              }
              if (e4.appendChild(i2.get(0)), o2.nodeType === o2.ELEMENT_NODE) {
                var l2 = p()($2()("ul"));
                l2.addClass([t3("children"), t3("hidden")]), e4.appendChild(l2.get(0)), this.$children = l2;
              }
            } }, { key: "renderChildNodes", value: function() {
              var e4 = this, t3 = this.options.node, o2 = this.options, r3 = o2.rootContainer, i2 = o2.ignore, a2 = o2.rootDomViewer, s2 = this.$children.get(0), c2 = this.childNodes, l2 = this.childNodeDomViewers;
              j()(l2, function(t4) {
                t4.detach(), e4.removeSubComponent(t4);
              }), this.endTagDomViewer && this.endTagDomViewer.detach();
              var u3 = this.getChildNodes();
              this.childNodes = u3;
              var d3 = [];
              this.childNodeDomViewers = d3, j()(u3, function(t4, o3) {
                var u4, f3 = c2.indexOf(t4);
                (u4 = f3 > -1 ? l2[f3] : new n3(s2, { node: t4, parent: e4, rootContainer: r3, rootDomViewer: a2, ignore: i2 })).attach(), d3[o3] = u4, e4.addSubComponent(u4);
              }), j()(l2, function(e5) {
                e5.isAttached() || e5.destroy();
              }), t3 && (this.endTagDomViewer ? this.endTagDomViewer.attach() : (this.endTagDomViewer = new n3(s2, { node: t3, parent: this, isEndTag: true, rootContainer: r3, rootDomViewer: a2, ignore: i2 }), this.addSubComponent(this.endTagDomViewer)));
            } }, { key: "renderHtmlTag", value: function(e4) {
              var t3 = m()(e4.attributes, function(e5) {
                var t4 = e5.name, n5 = e5.value, o2 = e5.isLink;
                return '<span class="attribute">\n          <span class="attribute-name">'.concat(oe()(t4), "</span>").concat(n5 ? '="<span class="attribute-value'.concat(o2 ? " attribute-underline" : "", '">').concat(oe()(n5), '</span>"') : "", "</span>");
              }).join(""), n4 = "";
              e4.hasTail ? n4 = "".concat(e4.hasTail ? "…" : "", '<span class="html-tag">&lt;<span class="tag-name">/').concat(e4.tagName, "</span>&gt;</span>") : this.isExpandable() || (n4 = '<span class="html-tag">&lt;<span class="tag-name">/'.concat(e4.tagName, "</span>&gt;</span>"));
              var r3 = "";
              return e4.hasToggleButton && (r3 = '<div class="toggle "><span class="icon icon-arrow-right"></span><span class="icon icon-arrow-down"></span></div>'), this.c(J()(L || (L = (0, o.Z)(["\n      ", '\n      <span class="html-tag">&lt;<span class="tag-name">', "</span>", "&gt;</span>", '\n      <span class="selection"></span>'])), r3, e4.tagName, t3, n4));
            } }, { key: "renderTextNode", value: function(e4) {
              var t3 = this.c, n4 = e4.nodeValue, o2 = e4.parentElement, r3 = '<span class="text-node">', i2 = '</span><span class="selection"></span>';
              if (o2 && n4.length < 1e4) {
                if ("STYLE" === o2.tagName)
                  return t3("".concat(r3).concat(X()(n4, "css", le)).concat(i2));
                if ("SCRIPT" === o2.tagName)
                  return t3("".concat(r3).concat(X()(n4, "js", le)).concat(i2));
              }
              return t3('"'.concat(r3).concat(oe()(te()(n4, 1e4, { separator: " ", ellipsis: "…" }))).concat(i2, '"'));
            } }, { key: "renderHtmlComment", value: function(e4) {
              return this.c('<span class="html-comment">&lt;!-- '.concat(oe()(e4), ' --&gt;</span><span class="selection"></span>'));
            } }]), n3;
          }(P);
          function de(e3) {
            var t2 = { tagName: "", attributes: [] };
            t2.tagName = e3.tagName.toLocaleLowerCase();
            var n3 = [];
            return j()(e3.attributes, function(t3) {
              var o2 = t3.name, r3 = t3.value;
              n3.push({ name: o2, value: r3, isLink: fe(e3, o2) });
            }), t2.attributes = n3, t2;
          }
          function fe(e3, t2) {
            var n3 = e3.tagName;
            return ("SCRIPT" === n3 || "IMAGE" === n3 || "VIDEO" === n3 || "AUDIO" === n3) && "src" === t2 || "LINK" === n3 && "href" === t2;
          }
          (function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          })(e2, ue);
        }, 129: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return U;
          } });
          var o = n2(907);
          var r2 = n2(181);
          function i(e3) {
            return function(e4) {
              if (Array.isArray(e4))
                return (0, o.Z)(e4);
            }(e3) || function(e4) {
              if ("undefined" != typeof Symbol && null != e4[Symbol.iterator] || null != e4["@@iterator"])
                return Array.from(e4);
            }(e3) || (0, r2.Z)(e3) || function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }();
          }
          var a = n2(168), s = n2(5671), c = n2(3144), l = n2(7326), u2 = n2(1752), d2 = n2(9340), f2 = n2(2963), h = n2(1120), p = n2(1443), v = n2.n(p), m = n2(1512), g = n2.n(m), b = n2(2461), y = n2.n(b), w = n2(4331), _ = n2.n(w), x = n2(5610), A = n2.n(x), k = n2(7483), C = n2.n(k), S = (n2(3990), n2(6341)), E = n2.n(S), O = (n2(3875), n2(6954)), T = n2.n(O);
          n2(9585);
          function N(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return y()(_()(e4).split(/\s+/), function(e5) {
                return E()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = C().parse(e4);
                  return M(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), C().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function M(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && M(r3.content, t2);
            }
          }
          A();
          var j = n2(3783), z = n2.n(j), R = n2(6329), Z = n2.n(R), I = n2(4193), D = n2.n(I), B = n2(5852), F = n2.n(B), L = n2(6930), P = n2.n(L);
          function H(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, h.Z)(e3);
              if (t2) {
                var r3 = (0, h.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, f2.Z)(this, n3);
            };
          }
          var $2, G = function(e3) {
            (0, d2.Z)(n3, e3);
            var t2 = H(n3);
            function n3(e4, o2) {
              var r3, i2, a2 = o2.compName, c2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, l2 = void 0 === c2 ? "light" : c2;
              return (0, s.Z)(this, n3), (r3 = t2.call(this)).subComponents = [], r3.compName = a2, r3.c = N(a2), r3.options = {}, r3.container = e4, r3.$container = g()(e4), r3.$container.addClass(["luna-".concat(a2), r3.c("platform-".concat((i2 = T()(), "os x" === i2 ? "mac" : i2)))]), r3.on("optionChange", function(e5, t3, n4) {
                var o3 = r3.c;
                "theme" === e5 && (r3.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t3))), z()(r3.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), r3.setOption("theme", l2), r3;
            }
            return (0, c.Z)(n3, [{ key: "destroy", value: function() {
              var e4 = this;
              this.destroySubComponents();
              var t3 = this.$container, n4 = t3.attr("class");
              z()(n4.split(/\s+/), function(n5) {
                P()(n5, "luna-".concat(e4.compName)) && t3.rmClass(n5);
              }), t3.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, z()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              F()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              z()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              D()(e4, t3), Z()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(v()), Y = n2(1907), q = n2.n(Y), J = n2(8613), Q = n2.n(J);
          function W(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, h.Z)(e3);
              if (t2) {
                var r3 = (0, h.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, f2.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var U = function(e3) {
            (0, d2.Z)(n3, e3);
            var t2 = W(n3);
            function n3(e4) {
              var o2, r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (0, s.Z)(this, n3), (o2 = t2.call(this, e4, { compName: "modal" }, r3)).render = function() {
                var e5 = (0, l.Z)(o2), t3 = e5.options, n4 = e5.c, r4 = e5.$body;
                t3.title ? (r4.rmClass(n4("no-title")), o2.$title.text(t3.title)) : r4.addClass(n4("no-title")), t3.footer ? (r4.rmClass(n4("no-footer")), o2.$footer.html("").append(t3.footer)) : r4.addClass(n4("no-footer")), t3.showClose ? o2.$close.show() : o2.$close.hide(), o2.$body.css("width", t3.width + "px"), o2.$content.html("").append(t3.content);
              }, o2.hide(), o2.initOptions(r3, { title: "", content: "", footer: "", showClose: true, width: te() }), o2.initTpl(), o2.$title = o2.find(".title"), o2.$content = o2.find(".content"), o2.$body = o2.find(".body"), o2.$footer = o2.find(".footer"), o2.$close = o2.find(".icon-close"), o2.bindEvent(), o2;
            }
            return (0, c.Z)(n3, [{ key: "show", value: function() {
              this.render(), this.$container.rmClass(this.c("hidden"));
            } }, { key: "hide", value: function() {
              this.$container.addClass(this.c("hidden"));
            } }, { key: "destroy", value: function() {
              (0, u2.Z)((0, h.Z)(n3.prototype), "destroy", this).call(this), this.$container.rmClass(this.c("hidden"));
            } }, { key: "bindEvent", value: function() {
              var e4 = this;
              this.$body.on("click", this.c(".icon-close"), function() {
                return e4.hide();
              }), this.on("optionChange", this.render);
            } }, { key: "initTpl", value: function() {
              this.$container.html(this.c(q()($2 || ($2 = (0, a.Z)(['\n      <div class="body">\n        <span class="icon icon-close"></span>\n        <div class="title"></div>\n        <div class="content"></div>\n        <div class="footer"></div>\n      </div>\n      '])))));
            } }], [{ key: "alert", value: function(e4) {
              var t3 = X(), n4 = t3.c;
              t3.setOption({ title: "", content: e4, width: te(), footer: ee({ OK: { type: "primary", onclick: function() {
                t3.hide();
              } } }, n4) }), t3.show();
            } }, { key: "confirm", value: function(e4) {
              return new Promise(function(t3) {
                var n4 = X(), o2 = n4.c;
                n4.setOption({ title: "", content: e4, width: te(), footer: ee({ Cancel: { type: "secondary", onclick: function() {
                  n4.hide(), t3(false);
                } }, OK: { type: "primary", onclick: function() {
                  n4.hide(), t3(true);
                } } }, o2) }), n4.show();
              });
            } }, { key: "prompt", value: function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
              return new Promise(function(n4) {
                var o2 = X(), r3 = o2.c, i2 = Q()("input" + r3(".input"), { value: t3 });
                function a2() {
                  o2.hide(), n4(i2.value);
                }
                g()(i2).on("keypress", function(e5) {
                  "Enter" === (e5 = e5.origEvent).key && a2();
                }), o2.setOption({ title: e4, content: i2, width: te(), footer: ee({ Cancel: { type: "secondary", onclick: function() {
                  o2.hide(), n4(null);
                } }, OK: { type: "primary", onclick: a2 } }, r3) }), o2.show();
                var s2 = i2.value.length;
                i2.setSelectionRange(s2, s2), i2.focus();
              });
            } }, { key: "setContainer", value: function(e4) {
              K = e4;
            } }]), n3;
          }(G), V = null, K = null;
          function X() {
            return K || (K = Q()("div"), document.body.append(K)), V || (V = new U(K, { showClose: false })), V;
          }
          function ee(e3, t2) {
            var n3 = y()(e3, function(e4, n4) {
              return Q()(t2(".button") + t2("." + e4.type), { onclick: e4.onclick }, n4);
            });
            return Q().apply(void 0, [t2(".button-group"), {}].concat(i(n3)));
          }
          function te() {
            return window.innerWidth < 500 ? window.innerWidth - 32 : 500;
          }
          (function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          })(e2, U);
        }, 8299: function(e2, t, n2) {
          n2.d(t, { q: function() {
            return Pe;
          }, Z: function() {
            return Ge;
          } });
          var o = n2(1002), r2 = n2(5671), i = n2(3144), a = n2(7326), s = n2(1752), c = n2(9340), l = n2(2963), u2 = n2(1120), d2 = n2(415), f2 = n2.n(d2), h = n2(3990), p = n2.n(h), v = n2(4696), m = n2.n(v), g = n2(3063), b = n2.n(g), y = n2(5166), w = n2.n(y), _ = n2(6472), x = n2.n(_), A = n2(3023), k = n2.n(A), C = n2(2533), S = n2.n(C), E = n2(3783), O = n2.n(E), T = n2(300), N = n2.n(T), M = n2(4321), j = n2.n(M), z = n2(3085), R = n2.n(z), Z = n2(1512), I = n2.n(Z), D = n2(801), B = n2.n(D), F = n2(7756), L = n2.n(F), P = n2(6768), H = n2.n(P), $2 = n2(1116), G = n2.n($2), Y = n2(5972), q = n2.n(Y), J = n2(996), Q = n2.n(J), W = n2(3367), U = n2.n(W), V = n2(1214), K = n2.n(V), X = n2(6339), ee = n2.n(X), te = n2(6329), ne = n2.n(te), oe = function() {
            function e3() {
              (0, r2.Z)(this, e3), this.id = 0, this.visited = [];
            }
            return (0, i.Z)(e3, [{ key: "set", value: function(e4, t2) {
              var n3 = this.visited, o2 = this.id, r3 = { id: o2, val: e4 };
              return ne()(r3, t2), n3.push(r3), this.id++, o2;
            } }, { key: "get", value: function(e4) {
              for (var t2 = this.visited, n3 = 0, o2 = t2.length; n3 < o2; n3++) {
                var r3 = t2[n3];
                if (e4 === r3.val)
                  return r3;
              }
              return false;
            } }]), e3;
          }(), re = n2(4331), ie = n2.n(re), ae = n2(8901), se = n2.n(ae), ce = function(e3) {
            return se()(U()(e3)).replace(/\n/g, "↵").replace(/\f|\r|\t/g, "");
          };
          function le(e3) {
            return e3.length > 500 && (e3 = e3.slice(0, 500) + "..."), "ƒ " + ie()(function(e4) {
              var t2 = e4.match(ue);
              return t2 ? t2[0] : e4;
            }(e3).replace("function", ""));
          }
          var ue = /function(.*?)\((.*?)\)/;
          var de = n2(6930), fe = n2.n(de), he = n2(5229), pe = n2.n(he), ve = n2(3875), me = n2.n(ve), ge = n2(9433), be = n2.n(ge), ye = n2(1443), we = n2.n(ye), _e = n2(2461), xe = n2.n(_e), Ae = n2(5610), ke = n2.n(Ae), Ce = n2(7483), Se = n2.n(Ce), Ee = n2(6341), Oe = n2.n(Ee), Te = n2(6954), Ne = n2.n(Te);
          n2(9585);
          function Me(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return xe()(ie()(e4).split(/\s+/), function(e5) {
                return Oe()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = Se().parse(e4);
                  return je(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), Se().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function je(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && je(r3.content, t2);
            }
          }
          ke();
          function ze() {
            var e3 = Ne()();
            return "os x" === e3 ? "mac" : e3;
          }
          var Re = n2(4193), Ze = n2.n(Re), Ie = n2(5852), De = n2.n(Ie);
          function Be(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, u2.Z)(e3);
              if (t2) {
                var r3 = (0, u2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, l.Z)(this, n3);
            };
          }
          var Fe = function(e3) {
            (0, c.Z)(n3, e3);
            var t2 = Be(n3);
            function n3(e4, o2) {
              var i2, a2 = o2.compName, s2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, c2 = void 0 === s2 ? "light" : s2;
              return (0, r2.Z)(this, n3), (i2 = t2.call(this)).subComponents = [], i2.compName = a2, i2.c = Me(a2), i2.options = {}, i2.container = e4, i2.$container = I()(e4), i2.$container.addClass(["luna-".concat(a2), i2.c("platform-".concat(ze()))]), i2.on("optionChange", function(e5, t3, n4) {
                var o3 = i2.c;
                "theme" === e5 && (i2.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t3))), O()(i2.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), i2.setOption("theme", c2), i2;
            }
            return (0, i.Z)(n3, [{ key: "destroy", value: function() {
              this.destroySubComponents();
              var e4 = this.c;
              this.$container.rmClass("luna-".concat(this.compName)).rmClass(e4("platform-".concat(ze()))).rmClass(e4("theme-".concat(this.options.theme))), this.$container.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, O()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              De()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              O()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              Ze()(e4, t3), ne()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(we());
          function Le(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, u2.Z)(e3);
              if (t2) {
                var r3 = (0, u2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, l.Z)(this, n3);
            };
          }
          var Pe = function(e3) {
            (0, c.Z)(n3, e3);
            var t2 = Le(n3);
            function n3(e4) {
              var o2;
              return (0, r2.Z)(this, n3), (o2 = t2.call(this, e4, { compName: "object-viewer" })).onItemClick = function(e5) {
                var t3 = (0, a.Z)(o2), n4 = t3.map, r3 = t3.c, i2 = I()(e5.curTarget), s2 = i2.data("object-id"), c2 = i2.find("span").eq(0);
                if (!i2.data("first-level") && (s2 && (i2.find("ul").html(o2.objToHtml(n4[s2], false)), i2.rmAttr("data-object-id")), e5.stopImmediatePropagation(), c2.hasClass(r3("expanded")))) {
                  var l2 = i2.find("ul").eq(0);
                  c2.hasClass(r3("collapsed")) ? (c2.rmClass(r3("collapsed")), l2.show()) : (c2.addClass(r3("collapsed")), l2.hide()), o2.emit("change");
                }
              }, o2.bindEvent(), o2;
            }
            return (0, i.Z)(n3, [{ key: "set", value: function(e4) {
              H()(e4) && (e4 = JSON.parse(e4)), this.data = { id: pe()("json"), enumerable: { 0: e4 } }, this.map = {}, He(this.map, this.data), this.render();
            } }, { key: "destroy", value: function() {
              (0, s.Z)((0, u2.Z)(n3.prototype), "destroy", this).call(this), this.$container.off("click", "li", this.onItemClick);
            } }, { key: "objToHtml", value: function(e4, t3) {
              var n4 = this, o2 = "";
              return O()(["enumerable", "unenumerable", "symbol"], function(r3) {
                if (e4[r3]) {
                  var i2 = S()(e4[r3]);
                  ee()(i2);
                  for (var a2 = 0, s2 = i2.length; a2 < s2; a2++) {
                    var c2 = i2[a2];
                    o2 += n4.createEl(c2, e4[r3][c2], r3, t3);
                  }
                }
              }), e4.proto && ("" === o2 ? o2 = this.objToHtml(e4.proto) : o2 += this.createEl("[[Prototype]]", e4.proto, "proto")), o2;
            } }, { key: "createEl", value: function(e4, t3, n4) {
              var r3 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], i2 = this.c, a2 = (0, o.Z)(t3);
              if (null === t3)
                return "<li>".concat(f3(e4), '<span class="').concat(i2("null"), '">null</span></li>');
              if (p()(t3) || m()(t3))
                return "<li>".concat(f3(e4), '<span class="').concat(i2(a2), '">').concat(ce(t3), "</span></li>");
              if ("RegExp" === t3.type && (a2 = "regexp"), "Number" === t3.type && (a2 = "number"), "Number" === t3.type || "RegExp" === t3.type)
                return "<li>".concat(f3(e4), '<span class="').concat(i2(a2), '">').concat(ce(t3.value), "</span></li>");
              if ("Undefined" === t3.type || "Symbol" === t3.type)
                return "<li>".concat(f3(e4), '<span class="').concat(i2("special"), '">').concat(b()(t3.type), "</span></li>");
              if ("(...)" === t3)
                return "<li>".concat(f3(e4), '<span class="').concat(i2("special"), '">').concat(t3, "</span></li>");
              if (w()(t3)) {
                var s2 = t3.id, c2 = t3.reference, l2 = function(e5) {
                  var t4 = e5.type, n5 = e5.value;
                  if (!t4)
                    return;
                  if ("Function" === t4)
                    return le(n5);
                  if ("Array" === t4 && e5.unenumerable)
                    return "Array(".concat(e5.unenumerable.length, ")");
                  return e5.type;
                }(t3) || k()(a2), u3 = r3 ? "" : '<span class="'.concat(i2("expanded collapsed"), '"><span class="').concat(i2("icon icon-caret-right"), '"></span><span class="').concat(i2("icon icon-caret-down"), '"></span></span>'), d3 = "<li ".concat(r3 ? 'data-first-level="true"' : "", " ").concat('data-object-id="' + (c2 || s2) + '"', ">").concat(u3).concat(f3(e4), '<span class="').concat(i2("open"), '">').concat(r3 ? "" : l2, '</span><ul class="').concat(i2(a2), '" ').concat(r3 ? "" : 'style="display:none"', ">");
                return r3 && (d3 += this.objToHtml(this.map[s2])), d3 + '</ul><span class="'.concat(i2("close"), '"></span></li>');
              }
              function f3(e5) {
                if (r3)
                  return "";
                if (w()(t3) && t3.jsonSplitArr)
                  return "";
                var o2 = i2("key");
                return "unenumerable" === n4 || "symbol" === n4 ? o2 = i2("key-lighter") : "proto" === n4 && (o2 = i2("key-special")), '<span class="'.concat(o2, '">').concat(ce(e5), "</span>: ");
              }
              return H()(t3) && t3.length > 1e4 && (t3 = L()(t3, 50, { separator: " ", ellipsis: "…" })), "<li>".concat(f3(e4), '<span class="').concat(i2((0, o.Z)(t3)), '">"').concat(ce(t3), '"</span></li>');
            } }, { key: "render", value: function() {
              var e4 = this.map[this.data.id];
              this.$container.html(this.objToHtml(e4, true));
            } }, { key: "bindEvent", value: function() {
              this.$container.on("click", "li", this.onItemClick);
            } }]), n3;
          }(Fe);
          function He(e3, t2) {
            var n3 = t2.id;
            if (n3 || 0 === n3) {
              if (t2.type && fe()(t2.type, "Array") && t2.enumerable) {
                var o2 = function(e4, t3, n4) {
                  var o3 = [], r4 = {};
                  O()(e4.enumerable, function(e5, t4) {
                    var n5 = me()(t4);
                    be()(n5) ? r4[t4] = e5 : o3[n5] = e5;
                  }), o3.enumerable = r4, o3.type = n4, o3.id = t3, e4.unenumerable && (o3.unenumerable = e4.unenumerable);
                  e4.symbol && (o3.symbol = e4.symbol);
                  e4.proto && (o3.proto = e4.proto);
                  return o3;
                }(t2, n3, t2.type);
                o2.length > 100 && (t2 = function(e4) {
                  var t3 = 0, n4 = {};
                  O()(Q()(e4, 100), function(e5) {
                    var o4 = {}, r4 = t3;
                    o4.type = "[" + r4, o4.enumerable = {}, O()(e5, function(e6) {
                      o4.enumerable[t3] = e6, t3 += 1;
                    });
                    var i3 = t3 - 1;
                    o4.type += (i3 - r4 > 0 ? " … " + i3 : "") + "]", o4.id = pe()("json"), o4.jsonSplitArr = true, n4[t3] = o4;
                  });
                  var o3 = {};
                  o3.enumerable = n4, o3.id = e4.id, o3.type = e4.type, e4.unenumerable && (o3.unenumerable = e4.unenumerable);
                  e4.symbol && (o3.symbol = e4.symbol);
                  e4.proto && (o3.proto = e4.proto);
                  return o3;
                }(o2));
              }
              e3[n3] = t2;
              var r3 = [];
              O()(["enumerable", "unenumerable", "symbol"], function(e4) {
                if (t2[e4])
                  for (var n4 in t2[e4])
                    r3.push(t2[e4][n4]);
              }), t2.proto && r3.push(t2.proto);
              for (var i2 = 0, a2 = r3.length; i2 < a2; i2++) {
                var s2 = r3[i2];
                w()(s2) && He(e3, s2);
              }
            }
          }
          function $e(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, u2.Z)(e3);
              if (t2) {
                var r3 = (0, u2.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, l.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var Ge = function(e3) {
            (0, c.Z)(n3, e3);
            var t2 = $e(n3);
            function n3(e4) {
              var o2, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (0, r2.Z)(this, n3), (o2 = t2.call(this, e4, { compName: "object-viewer" })).onItemClick = function(e5) {
                var t3 = (0, a.Z)(o2), n4 = t3.map, r3 = t3.c, i3 = I()(e5.curTarget), s2 = i3.data("object-id"), c2 = i3.find("span").eq(0);
                if (!i3.data("first-level") && (s2 && (i3.find("ul").html(o2.objToHtml(n4[s2], false)), i3.rmAttr("data-object-id")), e5.stopImmediatePropagation(), c2.hasClass(r3("expanded")))) {
                  var l2 = i3.find("ul").eq(0);
                  c2.hasClass(r3("collapsed")) ? (c2.rmClass(r3("collapsed")), l2.show()) : (c2.addClass(r3("collapsed")), l2.hide()), o2.emit("change");
                }
              }, o2.initOptions(i2, { unenumerable: false, accessGetter: false }), o2.bindEvent(), o2;
            }
            return (0, i.Z)(n3, [{ key: "set", value: function(e4) {
              this.data = [e4], this.visitor = new oe(), this.map = {}, this.render();
            } }, { key: "destroy", value: function() {
              (0, s.Z)((0, u2.Z)(n3.prototype), "destroy", this).call(this), this.$container.off("click", "li", this.onItemClick);
            } }, { key: "objToHtml", value: function(e4, t3) {
              var n4 = this, r3 = this.visitor, i2 = e4, a2 = false, s2 = r3.get(e4);
              s2 && s2.self && (i2 = s2.self);
              var c2 = "", l2 = ["enumerable"], u3 = S()(e4), d3 = [], h2 = [], p2 = [], v2 = {};
              if (this.options.unenumerable && !t3 && (l2.push("unenumerable"), l2.push("symbol"), d3 = B()(G()(e4, { prototype: false, unenumerable: true }), u3), h2 = q()(G()(e4, { prototype: false, symbol: true }), function(e5) {
                return "symbol" === (0, o.Z)(e5);
              })), x()(e4) && e4.length > 100) {
                l2.unshift("virtual"), a2 = true;
                var m2 = 0, g2 = {};
                O()(Q()(e4, 100), function(e5) {
                  var t4 = /* @__PURE__ */ Object.create(null), n5 = m2, o2 = "[" + n5;
                  O()(e5, function(e6) {
                    t4[m2] = e6, g2[m2] = true, m2++;
                  });
                  var r4 = m2 - 1;
                  v2[o2 += (r4 - n5 > 0 ? " … " + r4 : "") + "]"] = t4;
                }), p2 = S()(v2), u3 = q()(u3, function(e5) {
                  return !g2[e5];
                });
              }
              O()(l2, function(o2) {
                var r4 = [];
                r4 = "symbol" === o2 ? h2 : "unenumerable" === o2 ? d3 : "virtual" === o2 ? p2 : u3, a2 || ee()(r4);
                for (var s3 = 0, l3 = r4.length; s3 < l3; s3++) {
                  var f3 = U()(r4[s3]), m3 = "", g3 = Object.getOwnPropertyDescriptor(e4, f3), b3 = g3 && g3.get, y3 = g3 && g3.set;
                  if (b3 && !n4.options.accessGetter)
                    m3 = "(...)";
                  else
                    try {
                      m3 = "virtual" === o2 ? v2[f3] : i2[f3], j()(m3) && m3.catch(K());
                    } catch (e5) {
                      m3 = e5 instanceof Error ? e5.message : U()(e5);
                    }
                  c2 += n4.createEl(f3, e4, m3, o2, t3), b3 && (c2 += n4.createEl("get ".concat(f3), e4, g3.get, o2, t3)), y3 && (c2 += n4.createEl("set ".concat(f3), e4, g3.set, o2, t3));
                }
              });
              var b2 = f2()(e4);
              if (!t3 && b2)
                if ("" === c2) {
                  var y2 = r3.set(b2, { self: e4 });
                  this.map[y2] = b2, c2 = this.objToHtml(b2);
                } else
                  c2 += this.createEl("[[Prototype]]", i2 || e4, b2, "proto");
              return c2;
            } }, { key: "createEl", value: function(e4, t3, n4, r3) {
              var i2 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a2 = this.visitor, s2 = this.c, c2 = (0, o.Z)(n4), l2 = R()(n4, false);
              if ("virtual" === r3 && (l2 = e4), null === n4)
                return "<li>".concat(y2(e4), '<span class="').concat(s2("null"), '">null</span></li>');
              if (p()(n4) || m()(n4))
                return "<li>".concat(y2(e4), '<span class="').concat(s2(c2), '">').concat(ce(n4), "</span></li>");
              if ("RegExp" === l2 && (c2 = "regexp"), "Number" === l2 && (c2 = "number"), "Undefined" === l2 || "Symbol" === l2)
                return "<li>".concat(y2(e4), '<span class="').concat(s2("special"), '">').concat(b()(l2), "</span></li>");
              if ("(...)" === n4)
                return "<li>".concat(y2(e4), '<span class="').concat(s2("special"), '">').concat(n4, "</span></li>");
              if (w()(n4)) {
                var u3, d3 = a2.get(n4);
                if (d3)
                  u3 = d3.id;
                else {
                  var f3 = {};
                  "proto" === r3 && (f3.self = t3), u3 = a2.set(n4, f3), this.map[u3] = n4;
                }
                var h2 = "Object";
                h2 = "regexp" === c2 ? '<span class="'.concat(s2(c2), '">').concat(ce(n4)) : ce(function(e5, t4) {
                  if (!t4)
                    return;
                  if ("Function" === t4)
                    return le(N()(e5));
                  if ("Array" === t4)
                    return "Array(".concat(e5.length, ")");
                  return t4;
                }(n4, l2) || k()(c2));
                var v2 = i2 ? "" : '<span class="'.concat(s2("expanded collapsed"), '"><span class="').concat(s2("icon icon-caret-right"), '"></span><span class="').concat(s2("icon icon-caret-down"), '"></span></span>'), g2 = "<li ".concat(i2 ? 'data-first-level="true"' : "", " ").concat('data-object-id="' + u3 + '"', ">").concat(v2).concat(y2(e4), '<span class="').concat(s2("open"), '">').concat(i2 ? "" : h2, '</span><ul class="').concat(s2(c2), '" ').concat(i2 ? "" : 'style="display:none"', ">");
                return i2 && (g2 += this.objToHtml(n4)), g2 + '</ul><span class="'.concat(s2("close"), '"></span></li>');
              }
              function y2(e5) {
                if (i2)
                  return "";
                if (w()(n4) && "virtual" === r3)
                  return "";
                var t4 = s2("key");
                return "unenumerable" === r3 || "symbol" === r3 ? t4 = s2("key-lighter") : "proto" === r3 && (t4 = s2("key-special")), '<span class="'.concat(t4, '">').concat(ce(e5), "</span>: ");
              }
              return H()(n4) && n4.length > 1e4 && (n4 = L()(n4, 50, { separator: " ", ellipsis: "…" })), "<li>".concat(y2(e4), '<span class="').concat(s2((0, o.Z)(n4)), '">"').concat(ce(n4), '"</span></li>');
            } }, { key: "render", value: function() {
              this.$container.html(this.objToHtml(this.data, true));
            } }, { key: "bindEvent", value: function() {
              this.$container.on("click", "li", this.onItemClick);
            } }]), n3;
          }(Fe);
          Ge.Static = Pe, function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          }(e2, Ge);
        }, 8692: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return le;
          } });
          var o = n2(7326), r2 = n2(5671), i = n2(3144), a = n2(9340), s = n2(2963), c = n2(1120), l = n2(1512), u2 = n2.n(l), d2 = n2(8613), f2 = n2.n(d2), h = n2(8901), p = n2.n(h), v = n2(5229), m = n2.n(v), g = n2(5166), b = n2.n(g), y = n2(4193), w = n2.n(y), _ = n2(2461), x = n2.n(_), A = n2(3875), k = n2.n(A), C = n2(3367), S = n2.n(C), E = n2(4777), O = n2.n(E), T = n2(9702), N = n2.n(T), M = n2(1754), j = n2.n(M), z = n2(6768), R = n2.n(z), Z = n2(4331), I = n2.n(Z), D = n2(6341), B = n2.n(D), F = n2(3063), L = n2.n(F), P = n2(6156), H = n2.n(P), $2 = n2(3783), G = n2.n($2);
          var Y = n2(1443), q = n2.n(Y), J = n2(5610), Q = n2.n(J), W = n2(7483), U = n2.n(W), V = (n2(3990), n2(6954)), K = n2.n(V);
          n2(9585);
          function X(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return x()(I()(e4).split(/\s+/), function(e5) {
                return B()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = U().parse(e4);
                  return ee(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), U().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function ee(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && ee(r3.content, t2);
            }
          }
          Q();
          function te() {
            var e3 = K()();
            return "os x" === e3 ? "mac" : e3;
          }
          var ne = n2(6329), oe = n2.n(ne), re = n2(5852), ie = n2.n(re);
          function ae(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, c.Z)(e3);
              if (t2) {
                var r3 = (0, c.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, s.Z)(this, n3);
            };
          }
          var se = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ae(n3);
            function n3(e4, o2) {
              var i2, a2 = o2.compName, s2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, c2 = void 0 === s2 ? "light" : s2;
              return (0, r2.Z)(this, n3), (i2 = t2.call(this)).subComponents = [], i2.compName = a2, i2.c = X(a2), i2.options = {}, i2.container = e4, i2.$container = u2()(e4), i2.$container.addClass(["luna-".concat(a2), i2.c("platform-".concat(te()))]), i2.on("optionChange", function(e5, t3, n4) {
                var o3 = i2.c;
                "theme" === e5 && (i2.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t3))), G()(i2.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), i2.setOption("theme", c2), i2;
            }
            return (0, i.Z)(n3, [{ key: "destroy", value: function() {
              this.destroySubComponents();
              var e4 = this.c;
              this.$container.rmClass("luna-".concat(this.compName)).rmClass(e4("platform-".concat(te()))).rmClass(e4("theme-".concat(this.options.theme))), this.$container.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, G()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              ie()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              G()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              w()(e4, t3), oe()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(q());
          function ce(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, c.Z)(e3);
              if (t2) {
                var r3 = (0, c.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, s.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var le = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4) {
              var o2, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (0, r2.Z)(this, n3), (o2 = t2.call(this, e4, { compName: "setting" }, i2)).items = [], o2.selectedItem = null, o2.initOptions(i2, { separatorCollapse: true, filter: "" }), o2.bindEvent(), o2;
            }
            return (0, i.Z)(n3, [{ key: "appendTitle", value: function(e4) {
              var t3 = new de(this, e4);
              return this.append(t3), t3;
            } }, { key: "appendSeparator", value: function() {
              var e4 = this.items, t3 = this.options.separatorCollapse, n4 = N()(e4);
              if (t3 && n4 instanceof fe)
                return n4;
              var o2 = new fe(this);
              return this.append(o2), o2;
            } }, { key: "appendNumber", value: function(e4, t3, n4, o2, r3) {
              b()(o2) && (r3 = o2, o2 = "");
              var i2 = new pe(this, e4, t3, n4, o2, r3);
              return this.append(i2), i2;
            } }, { key: "appendButton", value: function(e4, t3, n4) {
              O()(t3) && (n4 = t3, t3 = "");
              var o2 = new be(this, e4, t3, n4);
              return this.append(o2), o2;
            } }, { key: "appendInput", value: function(e4, t3, n4) {
              var o2 = new he(this, e4, t3, n4, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "");
              return this.append(o2), o2;
            } }, { key: "appendCheckbox", value: function(e4, t3, n4, o2) {
              o2 || (o2 = n4, n4 = "");
              var r3 = new me(this, e4, t3, n4, o2);
              return this.append(r3), r3;
            } }, { key: "appendSelect", value: function(e4, t3, n4, o2, r3) {
              b()(o2) && (r3 = o2, o2 = "");
              var i2 = new ge(this, e4, t3, n4, o2, r3);
              return this.append(i2), i2;
            } }, { key: "remove", value: function(e4) {
              var t3 = this.items, n4 = t3.indexOf(e4);
              n4 > -1 && (e4.detach(), t3.splice(n4, 1), e4 === this.selectedItem && this.selectItem(null));
            } }, { key: "clear", value: function() {
              G()(this.items, function(e4) {
                return e4.detach();
              }), this.items = [], this.selectItem(null);
            } }, { key: "selectItem", value: function(e4) {
              var t3;
              (this.selectedItem && (this.selectedItem.deselect(), this.selectedItem = null), H()(e4)) || (this.selectedItem = e4, null === (t3 = this.selectedItem) || void 0 === t3 || t3.select());
            } }, { key: "renderSettings", value: function() {
              var e4 = this, t3 = this.items;
              G()(t3, function(e5) {
                return e5.detach();
              }), G()(t3, function(t4) {
                e4.filterItem(t4) && e4.$container.append(t4.container);
              });
            } }, { key: "bindEvent", value: function() {
              var e4 = this, t3 = this.c;
              this.on("optionChange", function(t4) {
                if ("filter" === t4)
                  e4.renderSettings();
              });
              var n4 = this;
              this.$container.on("click", t3(".item"), function() {
                n4.selectItem(this.settingItem);
              });
            } }, { key: "filterItem", value: function(e4) {
              var t3 = this.options.filter;
              if (t3) {
                if (O()(t3))
                  return t3(e4);
                if (j()(t3))
                  return t3.test(e4.text());
                if (R()(t3) && (t3 = I()(t3)))
                  return B()(L()(e4.text()), L()(t3));
              }
              return true;
            } }, { key: "append", value: function(e4) {
              this.items.push(e4), this.filterItem(e4) && this.$container.append(e4.container);
            } }]), n3;
          }(se), ue = function() {
            function e3(t2, n3, o2, i2) {
              (0, r2.Z)(this, e3), this.container = f2()("div", { tabindex: "0" }), this.setting = t2, this.container.settingItem = this, this.$container = u2()(this.container), this.$container.addClass(t2.c("item")).addClass(t2.c("item-".concat(i2))), this.key = n3, this.value = o2;
            }
            return (0, i.Z)(e3, [{ key: "select", value: function() {
              this.$container.addClass(this.setting.c("selected"));
            } }, { key: "deselect", value: function() {
              this.$container.rmClass(this.setting.c("selected"));
            } }, { key: "detach", value: function() {
              this.$container.remove();
            } }, { key: "text", value: function() {
              return this.$container.text();
            } }, { key: "onChange", value: function(e4) {
              this.setting.emit("change", this.key, e4, this.value), this.value = e4;
            } }]), e3;
          }(), de = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4, o2) {
              var i2;
              return (0, r2.Z)(this, n3), (i2 = t2.call(this, e4, "", "", "title")).$container.text(o2), i2;
            }
            return (0, i.Z)(n3);
          }(ue), fe = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4) {
              return (0, r2.Z)(this, n3), t2.call(this, e4, "", "", "separator");
            }
            return (0, i.Z)(n3);
          }(ue), he = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4, o2, i2, a2, s2) {
              var c2;
              (0, r2.Z)(this, n3), c2 = t2.call(this, e4, o2, i2, "input");
              var l2 = e4.c;
              c2.$container.html('<div class="'.concat(l2("title"), '">').concat(p()(a2), '</div>\n      <div class="').concat(l2("description"), '">').concat(s2, '</div>\n      <div class="').concat(l2("control"), '">\n        <input type="text"></input>\n      </div>'));
              var u3 = c2.$container.find("input");
              return u3.val(i2), u3.on("change", function() {
                return c2.onChange(u3.val());
              }), c2;
            }
            return (0, i.Z)(n3);
          }(ue), pe = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4, i2, a2, s2, c2) {
              var l2, u3 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
              (0, r2.Z)(this, n3), l2 = t2.call(this, e4, i2, a2, "number"), w()(u3, { min: 0, max: 10, step: 1 });
              var d3 = (0, o.Z)(l2).$container, f3 = e4.c, h2 = !!u3.range;
              delete u3.range;
              var v2 = u3.min, m2 = u3.max, g2 = '<input type="'.concat(h2 ? "range" : "number", '"').concat(x()(u3, function(e5, t3) {
                return " ".concat(t3, '="').concat(e5, '"');
              }), "></input>");
              h2 && (g2 = "".concat(v2, '<div class="').concat(f3("range-container"), '">\n        <div class="').concat(f3("range-track"), '">\n          <div class="').concat(f3("range-track-bar"), '">\n            <div class="').concat(f3("range-track-progress"), '" style="width: ').concat(ve(a2, v2, m2), '%;"></div>\n          </div>\n        </div>\n        ').concat(g2, '\n      </div><span class="').concat(f3("value"), '">').concat(a2, "</span>/").concat(m2)), d3.html('<div class="'.concat(f3("title"), '">').concat(p()(s2), '</div>\n      <div class="').concat(f3("description"), '">').concat(c2, '</div>\n      <div class="').concat(f3("control"), '">').concat(g2, "</div>"));
              var b2 = d3.find(f3(".value")), y2 = d3.find("input"), _2 = d3.find(f3(".range-track-progress"));
              return y2.val(S()(a2)), y2.on("change", function() {
                var e5 = k()(y2.val());
                l2.onChange(e5);
              }), y2.on("input", function() {
                var e5 = k()(y2.val());
                _2.css("width", ve(e5, v2, m2) + "%"), b2.text(S()(e5));
              }), l2;
            }
            return (0, i.Z)(n3);
          }(ue), ve = function(e3, t2, n3) {
            return ((e3 - t2) / (n3 - t2) * 100).toFixed(2);
          }, me = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4, o2, i2, a2, s2) {
              var c2;
              (0, r2.Z)(this, n3), c2 = t2.call(this, e4, o2, i2, "checkbox");
              var l2 = e4.c, u3 = m()(e4.c("checkbox-"));
              c2.$container.html('<div class="'.concat(l2("title"), '">').concat(p()(a2), '</div>\n      <div class="').concat(l2("control"), '">\n        <input type="checkbox" id="').concat(u3, '"></input>\n        <label for="').concat(u3, '">').concat(s2, "</label>\n      </div>"));
              var d3 = c2.$container.find("input"), f3 = d3.get(0);
              return f3.checked = i2, d3.on("change", function() {
                return c2.onChange(f3.checked);
              }), c2;
            }
            return (0, i.Z)(n3);
          }(ue), ge = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4, o2, i2, a2, s2, c2) {
              var l2;
              (0, r2.Z)(this, n3), l2 = t2.call(this, e4, o2, i2, "select");
              var u3 = e4.c;
              l2.$container.html('<div class="'.concat(u3("title"), '">').concat(p()(a2), '</div>\n      <div class="').concat(u3("description"), '">').concat(s2, '</div>\n      <div class="').concat(u3("control"), '">\n        <div class="').concat(u3("select"), '">\n          <select>\n            ').concat(x()(c2, function(e5, t3) {
                return '<option value="'.concat(p()(e5), '"').concat(e5 === i2 ? " selected" : "", ">").concat(p()(t3), "</option>");
              }).join(""), "\n          </select>\n        </div>\n      </div>"));
              var d3 = l2.$container.find("select");
              return d3.on("change", function() {
                return l2.onChange(d3.val());
              }), l2;
            }
            return (0, i.Z)(n3);
          }(ue), be = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = ce(n3);
            function n3(e4, o2, i2, a2) {
              var s2;
              return (0, r2.Z)(this, n3), i2 || (i2 = o2, o2 = ""), (s2 = t2.call(this, e4, "", "", "button")).$container.html(e4.c('<div class="title">'.concat(p()(o2), '</div>\n      <div class="control">\n        <button>').concat(p()(i2), "</button>\n      </div>"))), s2.$container.find("button").on("click", a2), s2;
            }
            return (0, i.Z)(n3);
          }(ue);
          (function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          })(e2, le);
        }, 7638: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return J;
          } });
          var o = n2(168), r2 = n2(5671), i = n2(3144), a = n2(9340), s = n2(2963), c = n2(1120), l = n2(1443), u2 = n2.n(l), d2 = n2(1512), f2 = n2.n(d2), h = n2(2461), p = n2.n(h), v = n2(4331), m = n2.n(v), g = n2(5610), b = n2.n(g), y = n2(7483), w = n2.n(y), _ = n2(3990), x = n2.n(_), A = n2(6341), k = n2.n(A), C = (n2(3875), n2(6954)), S = n2.n(C);
          n2(9585);
          function E(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return p()(m()(e4).split(/\s+/), function(e5) {
                return k()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = w().parse(e4);
                  return O(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), w().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function O(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && O(r3.content, t2);
            }
          }
          var T;
          b();
          function N() {
            var e3 = S()();
            return "os x" === e3 ? "mac" : e3;
          }
          var M = n2(3783), j = n2.n(M), z = n2(6329), R = n2.n(z), Z = n2(4193), I = n2.n(Z), D = n2(5852), B = n2.n(D);
          function F(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, c.Z)(e3);
              if (t2) {
                var r3 = (0, c.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, s.Z)(this, n3);
            };
          }
          var L, P = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = F(n3);
            function n3(e4, o2) {
              var i2, a2 = o2.compName, s2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, c2 = void 0 === s2 ? "light" : s2;
              return (0, r2.Z)(this, n3), (i2 = t2.call(this)).subComponents = [], i2.compName = a2, i2.c = E(a2), i2.options = {}, i2.container = e4, i2.$container = f2()(e4), i2.$container.addClass(["luna-".concat(a2), i2.c("platform-".concat(N()))]), i2.on("optionChange", function(e5, t3, n4) {
                var o3 = i2.c;
                "theme" === e5 && (i2.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t3))), j()(i2.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), i2.setOption("theme", c2), i2;
            }
            return (0, i.Z)(n3, [{ key: "destroy", value: function() {
              this.destroySubComponents();
              var e4 = this.c;
              this.$container.rmClass("luna-".concat(this.compName)).rmClass(e4("platform-".concat(N()))).rmClass(e4("theme-".concat(this.options.theme))), this.$container.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, j()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              B()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              j()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              I()(e4, t3), R()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(u2()), H = n2(1907), $2 = n2.n(H), G = n2(8901), Y = n2.n(G);
          function q(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, c.Z)(e3);
              if (t2) {
                var r3 = (0, c.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, s.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var J = function(e3) {
            (0, a.Z)(n3, e3);
            var t2 = q(n3);
            function n3(e4) {
              var o2, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (0, r2.Z)(this, n3), (o2 = t2.call(this, e4, { compName: "tab" }, i2)).initOptions(i2, { height: 30 }), o2.initTpl(), o2.$tabs = o2.find(".tabs"), o2.tabs = o2.$tabs.get(0), o2.$slider = o2.find(".slider"), o2.bindEvent(), o2.updateHeight(), o2;
            }
            return (0, i.Z)(n3, [{ key: "length", get: function() {
              return this.$tabs.find(this.c(".item")).length;
            } }, { key: "insert", value: function(e4, t3) {
              var n4 = this.c, o2 = this.$tabs, r3 = this.options.height - 1, i2 = o2.find(n4(".item")), a2 = i2.length, s2 = '<div class="'.concat(this.c("item"), '" data-id="').concat(Y()(t3.id), '" style="height: ').concat(r3, "px; line-height: ").concat(r3, 'px;">').concat(Y()(t3.title), "</div>");
              e4 > a2 - 1 ? o2.append(s2) : i2.eq(e4).before(s2), this.updateSlider();
            } }, { key: "append", value: function(e4) {
              this.insert(this.length, e4);
            } }, { key: "remove", value: function(e4) {
              var t3 = this.c, n4 = this;
              this.$tabs.find(t3(".item")).each(function() {
                var o2 = f2()(this);
                if (o2.data("id") === e4) {
                  if (o2.hasClass(t3("selected")))
                    if (n4.length > 0) {
                      var r3 = n4.$tabs.find(t3(".item")).eq(0).data("id");
                      n4.select(r3);
                    } else
                      n4.emit("deselect");
                  o2.remove();
                }
              }), this.updateSlider();
            } }, { key: "select", value: function(e4) {
              var t3 = this.c, n4 = this;
              this.$tabs.find(t3(".item")).each(function() {
                var o2 = f2()(this);
                o2.data("id") === e4 ? (o2.addClass(t3("selected")), n4.updateSlider(), n4.scrollToSelected(), n4.emit("select", e4)) : o2.rmClass(t3("selected"));
              });
            } }, { key: "scrollToSelected", value: function() {
              var e4, t3 = this.$tabs, n4 = this.tabs, o2 = this.c, r3 = t3.find(o2(".selected")).get(0), i2 = r3.offsetLeft, a2 = r3.offsetWidth, s2 = n4.offsetWidth, c2 = n4.scrollLeft;
              i2 < c2 ? e4 = i2 : i2 + a2 > s2 + c2 && (e4 = i2 + a2 - s2), x()(e4) && (n4.scrollLeft = e4);
            } }, { key: "hideScrollbar", value: function() {
              var e4 = this.$tabs;
              if ("none" !== getComputedStyle(this.tabs, "::-webkit-scrollbar").display) {
                var t3 = function() {
                  if (x()(T))
                    return T;
                  if (!document)
                    return 16;
                  var e5 = document.createElement("div"), t4 = document.createElement("div");
                  e5.setAttribute("style", "display: block; width: 100px; height: 100px; overflow: scroll;"), t4.setAttribute("style", "height: 200px"), e5.appendChild(t4);
                  var n4 = document.body || document.documentElement;
                  return n4.appendChild(e5), T = e5.offsetWidth - e5.clientWidth, n4.removeChild(e5), T;
                }();
                e4.css("height", this.options.height - 1 + t3 + "px");
              }
            } }, { key: "updateSlider", value: function() {
              var e4 = this.$slider, t3 = this.$tabs, n4 = this.c, o2 = t3.find(n4(".selected")).get(0);
              o2 ? e4.css({ width: o2.offsetWidth, left: o2.offsetLeft - t3.get(0).scrollLeft }) : e4.css({ width: 0 });
            } }, { key: "updateHeight", value: function() {
              var e4 = this.options.height, t3 = e4 - 1;
              this.find(".tabs-container").css("height", e4 + "px"), this.find(".item").css({ height: t3, lineHeight: t3 }), this.hideScrollbar();
            } }, { key: "bindEvent", value: function() {
              var e4 = this, t3 = this.tabs, n4 = this.c;
              this.on("optionChange", function(t4) {
                if ("height" === t4)
                  e4.updateHeight();
              });
              var o2 = this;
              this.$tabs.on("wheel", function(e5) {
                e5.preventDefault(), t3.scrollLeft += e5.origEvent.deltaY;
              }).on("click", n4(".item"), function() {
                var e5 = f2()(this);
                o2.select(e5.data("id"));
              }).on("scroll", function() {
                e4.updateSlider();
              });
            } }, { key: "initTpl", value: function() {
              this.$container.html(this.c($2()(L || (L = (0, o.Z)(['\n        <div class="tabs-container">\n          <div class="tabs"></div>\n        </div>\n        <div class="slider"></div>\n      '])))));
            } }]), n3;
          }(P);
          (function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          })(e2, J);
        }, 7049: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return oe;
          } });
          var o = n2(5671), r2 = n2(3144), i = n2(7326), a = n2(1752), s = n2(9340), c = n2(2963), l = n2(1120), u2 = n2(1443), d2 = n2.n(u2), f2 = n2(1512), h = n2.n(f2), p = n2(2461), v = n2.n(p), m = n2(4331), g = n2.n(m), b = n2(5610), y = n2.n(b), w = n2(7483), _ = n2.n(w), x = (n2(3990), n2(6341)), A = n2.n(x), k = (n2(3875), n2(6954)), C = n2.n(k);
          n2(9585);
          function S(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return v()(g()(e4).split(/\s+/), function(e5) {
                return A()(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = _().parse(e4);
                  return E(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), _().stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          }
          function E(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && E(r3.content, t2);
            }
          }
          var O = "ontouchstart" in y();
          function T() {
            var e3 = C()();
            return "os x" === e3 ? "mac" : e3;
          }
          var N = n2(3783), M = n2.n(N), j = n2(6329), z = n2.n(j), R = n2(4193), Z = n2.n(R), I = n2(5852), D = n2.n(I);
          function B(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var F = function(e3) {
            (0, s.Z)(n3, e3);
            var t2 = B(n3);
            function n3(e4, r3) {
              var i2, a2 = r3.compName, s2 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).theme, c2 = void 0 === s2 ? "light" : s2;
              return (0, o.Z)(this, n3), (i2 = t2.call(this)).subComponents = [], i2.compName = a2, i2.c = S(a2), i2.options = {}, i2.container = e4, i2.$container = h()(e4), i2.$container.addClass(["luna-".concat(a2), i2.c("platform-".concat(T()))]), i2.on("optionChange", function(e5, t3, n4) {
                var o2 = i2.c;
                "theme" === e5 && (i2.$container.rmClass(o2("theme-".concat(n4))).addClass(o2("theme-".concat(t3))), M()(i2.subComponents, function(e6) {
                  return e6.setOption("theme", t3);
                }));
              }), i2.setOption("theme", c2), i2;
            }
            return (0, r2.Z)(n3, [{ key: "destroy", value: function() {
              this.destroySubComponents();
              var e4 = this.c;
              this.$container.rmClass("luna-".concat(this.compName)).rmClass(e4("platform-".concat(T()))).rmClass(e4("theme-".concat(this.options.theme))), this.$container.html(""), this.emit("destroy"), this.removeAllListeners();
            } }, { key: "setOption", value: function(e4, t3) {
              var n4 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, M()(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n4.emit("optionChange", t4, e5, r4);
              });
            } }, { key: "getOption", value: function(e4) {
              return this.options[e4];
            } }, { key: "addSubComponent", value: function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            } }, { key: "removeSubComponent", value: function(e4) {
              D()(this.subComponents, function(t3) {
                return t3 === e4;
              });
            } }, { key: "destroySubComponents", value: function() {
              M()(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            } }, { key: "initOptions", value: function(e4) {
              var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              Z()(e4, t3), z()(this.options, e4);
            } }, { key: "find", value: function(e4) {
              return this.$container.find(this.c(e4));
            } }]), n3;
          }(d2()), L = n2(9702), P = n2.n(L), H = n2(8887), $2 = n2.n(H), G = n2(2439), Y = n2.n(G), q = n2(6049), J = n2.n(q), Q = n2(2327), W = n2.n(Q), U = n2(8901), V = n2.n(U), K = n2(7387), X = n2.n(K), ee = n2(6677), te = n2.n(ee);
          function ne(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          e2 = n2.hmd(e2);
          var oe = function(e3) {
            (0, s.Z)(n3, e3);
            var t2 = ne(n3);
            function n3(e4) {
              var r3, a2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (0, o.Z)(this, n3), (r3 = t2.call(this, e4, { compName: "text-viewer" }, a2)).lineNum = 0, r3.copy = function() {
                var e5 = (0, i.Z)(r3).c, t3 = r3.options, n4 = t3.text, o2 = t3.escape;
                W()(o2 ? n4 : X()(te()(n4)));
                var a3 = r3.$copy.find(e5(".icon"));
                a3.addClass(e5("icon-check")).rmClass(e5("icon-copy")), setTimeout(function() {
                  a3.rmClass(e5("icon-check")).addClass(e5("icon-copy"));
                }, 1e3);
              }, r3._updateCopyPos = function() {
                var e5 = (0, i.Z)(r3).container;
                r3.$copy.css({ top: e5.scrollTop + 5, right: 5 - e5.scrollLeft });
              }, r3.initOptions(a2, { text: "", escape: true, showLineNumbers: true, wrapLongLines: true, maxHeight: 1 / 0 }), r3.render = Y()(function() {
                return r3._render();
              }, 16), r3.updateCopyPos = J()(function() {
                return r3._updateCopyPos();
              }, 300), r3.initTpl(), r3.$text = r3.find(".text"), r3.$copy = r3.find(".copy"), O && r3.$copy.css("opacity", "1"), r3.options.text && r3.render(), r3.bindEvent(), r3.updateHeight(), r3;
            }
            return (0, r2.Z)(n3, [{ key: "append", value: function(e4) {
              var t3 = this, n4 = this.options, o2 = this.$copy, r3 = this.c, i2 = this.$text, a2 = n4.showLineNumbers;
              if (this.options.text += e4, !a2)
                return this.$text.append(n4.escape ? V()(e4) : e4);
              var s2 = function(e5) {
                if (0 === e5.length)
                  return [];
                return e5.split(re);
              }(e4);
              $2()(s2) && (s2 = ["&nbsp;"]), g()(P()(s2)) || s2.pop();
              var c2 = "";
              M()(s2, function(e5, o3) {
                t3.lineNum += 1, c2 += '<div class="'.concat(r3("table-row"), '"><div class="').concat(r3("line-number"), '">').concat(t3.lineNum, '</div><div class="').concat(r3("line-text"), '">').concat(n4.escape ? V()(e5) : e5 || " ", "</div></div>");
              }), i2.find(r3(".table")).append(c2), o2.hide(), i2.offset().height > 40 && o2.show(), this.updateCopyPos();
            } }, { key: "destroy", value: function() {
              this.$container.off("scroll", this.updateCopyPos), (0, a.Z)((0, l.Z)(n3.prototype), "destroy", this).call(this);
            } }, { key: "updateHeight", value: function() {
              var e4 = this.options.maxHeight;
              e4 > 0 && e4 !== 1 / 0 ? this.$text.css("max-height", e4) : this.$text.css("max-height", "none");
            } }, { key: "initTpl", value: function() {
              this.$container.html(this.c('<div class="text"></div><div class="copy"><span class="icon icon-copy"></span></div>'));
            } }, { key: "bindEvent", value: function() {
              var e4 = this;
              this.on("optionChange", function(t3) {
                if ("maxHeight" === t3)
                  e4.updateHeight();
                else
                  e4.render();
              }), this.$container.on("scroll", this.updateCopyPos), this.$copy.on("click", this.copy);
            } }, { key: "_render", value: function() {
              var e4 = this.c, t3 = this.$text, n4 = this.options, o2 = n4.text, r3 = n4.wrapLongLines, i2 = n4.showLineNumbers;
              r3 ? t3.addClass(e4("wrap-long-lines")) : t3.rmClass(e4("wrap-long-lines")), i2 ? t3.addClass(e4("line-numbers")) : t3.rmClass(e4("line-numbers")), t3.html('<div class="'.concat(e4("table"), '"></div>')), this.lineNum = 0, this.options.text = "", this.append(o2);
            } }]), n3;
          }(F), re = /\r\n|\r|\n/g;
          (function(e3, t2) {
            try {
              e3.exports = t2, e3.exports.default = t2;
            } catch (e4) {
            }
          })(e2, oe);
        }, 6672: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return ur;
          } });
          var o = {};
          n2.r(o), n2.d(o, { classPrefix: function() {
            return Pe;
          }, drag: function() {
            return We;
          }, escapeJsonStr: function() {
            return Re;
          }, evalCss: function() {
            return Le;
          }, eventClient: function() {
            return Ue;
          }, eventPage: function() {
            return Ve;
          }, getFileName: function() {
            return Ie;
          }, hasSafeArea: function() {
            return ze;
          }, isChobitsuEl: function() {
            return Fe;
          }, isErudaEl: function() {
            return Be;
          }, pxToNum: function() {
            return De;
          }, safeStorage: function() {
            return Ze;
          } });
          var r2 = n2(5671), i = n2(3144), a = n2(7326), s = n2(9340), c = n2(2963), l = n2(1120), u2 = n2(4942), d2 = n2(1443), f2 = n2.n(d2), h = new (f2())();
          h.ADD = "ADD", h.SHOW = "SHOW", h.SCALE = "SCALE";
          var p = h, v = n2(1752), m = n2(7496), g = n2.n(m)()({ init: function(e3) {
            this._$el = e3;
          }, show: function() {
            return this._$el.show(), this;
          }, hide: function() {
            return this._$el.hide(), this;
          }, destroy: function() {
            this._$el.remove();
          } }), b = n2(1512), y = n2.n(b), w = n2(125), _ = n2.n(w), x = n2(5229), A = n2.n(x), k = n2(3783), C = n2.n(k), S = n2(5972), E = n2.n(S), O = n2(6768), T = n2.n(O), N = n2(6341), M = n2.n(N), j = n2(4675), z = n2.n(j), R = n2(3367), Z = n2.n(R), I = n2(2533), D = n2.n(I), B = n2(7622), F = n2.n(B), L = n2(4193), P = n2.n(L), H = n2(6329), $2 = n2.n(H), G = n2(6472), Y = n2.n(G), q = ["background", "foreground", "selectForeground", "accent", "highlight", "border", "primary", "contrast", "varColor", "stringColor", "keywordColor", "numberColor", "operatorColor", "linkColor", "textColor", "tagNameColor", "functionColor", "attributeNameColor", "commentColor"], J = q.length;
          function Q(e3) {
            for (var t2 = {}, n3 = 0; n3 < J; n3++)
              t2[q[n3]] = e3[n3];
            return t2;
          }
          function W(e3) {
            return Y()(e3) && (e3 = Q(e3)), e3.darkerBackground || (e3.darkerBackground = e3.contrast), $2()({ consoleWarnBackground: "#332a00", consoleWarnForeground: "#ffcb6b", consoleWarnBorder: "#650", consoleErrorBackground: "#290000", consoleErrorForeground: "#ff8080", consoleErrorBorder: "#5c0000", light: "#ccc", dark: "#aaa" }, e3);
          }
          function U(e3) {
            return Y()(e3) && (e3 = Q(e3)), e3.darkerBackground || (e3.darkerBackground = e3.contrast), $2()({ consoleWarnBackground: "#fffbe5", consoleWarnForeground: "#5c5c00", consoleWarnBorder: "#fff5c2", consoleErrorBackground: "#fff0f0", consoleErrorForeground: "#f00", consoleErrorBorder: "#ffd6d6", light: "#fff", dark: "#eee" }, e3);
          }
          var V = ["Dark", "Material Oceanic", "Material Darker", "Material Palenight", "Material Deep Ocean", "Monokai Pro", "Dracula", "Arc Dark", "Atom One Dark", "Solarized Dark", "Night Owl"];
          var K = { Light: U({ darkerBackground: "#f3f3f3", background: "#fff", foreground: "#333", selectForeground: "#333", accent: "#1a73e8", highlight: "#eaeaea", border: "#ccc", primary: "#333", contrast: "#f2f7fd", varColor: "#c80000", stringColor: "#1a1aa6", keywordColor: "#881280", numberColor: "#1c00cf", operatorColor: "#808080", linkColor: "#1155cc", textColor: "#8097bd", tagNameColor: "#881280", functionColor: "#222", attributeNameColor: "#994500", commentColor: "#236e25", cssProperty: "#c80000" }), Dark: W({ darkerBackground: "#333", background: "#242424", foreground: "#a5a5a5", selectForeground: "#eaeaea", accent: "#555", highlight: "#000", border: "#3d3d3d", primary: "#ccc", contrast: "#0b2544", varColor: "#e36eec", stringColor: "#f29766", keywordColor: "#9980ff", numberColor: "#9980ff", operatorColor: "#7f7f7f", linkColor: "#ababab", textColor: "#42597f", tagNameColor: "#5db0d7", functionColor: "#d5d5d5", attributeNameColor: "#9bbbdc", commentColor: "#747474" }), "Material Oceanic": W(["#263238", "#B0BEC5", "#FFFFFF", "#009688", "#425B67", "#2A373E", "#607D8B", "#1E272C", "#eeffff", "#c3e88d", "#c792ea", "#f78c6c", "#89ddff", "#80cbc4", "#B0BEC5", "#f07178", "#82aaff", "#ffcb6b", "#546e7a"]), "Material Darker": W(["#212121", "#B0BEC5", "#FFFFFF", "#FF9800", "#3F3F3F", "#292929", "#727272", "#1A1A1A", "#eeffff", "#c3e88d", "#c792ea", "#f78c6c", "#89ddff", "#80cbc4", "#B0BEC5", "#f07178", "#82aaff", "#ffcb6b", "#616161"]), "Material Lighter": U(["#FAFAFA", "#546E7A", "#546e7a", "#00BCD4", "#E7E7E8", "#d3e1e8", "#94A7B0", "#F4F4F4", "#272727", "#91B859", "#7C4DFF", "#F76D47", "#39ADB5", "#39ADB5", "#546E7A", "#E53935", "#6182B8", "#F6A434", "#AABFC9"]), "Material Palenight": W(["#292D3E", "#A6ACCD", "#FFFFFF", "#ab47bc", "#444267", "#2b2a3e", "#676E95", "#202331", "#eeffff", "#c3e88d", "#c792ea", "#f78c6c", "#89ddff", "#80cbc4", "#A6ACCD", "#f07178", "#82aaff", "#ffcb6b", "#676E95"]), "Material Deep Ocean": W(["#0F111A", "#8F93A2", "#FFFFFF", "#84ffff", "#1F2233", "#41465b", "#4B526D", "#090B10", "#eeffff", "#c3e88d", "#c792ea", "#f78c6c", "#89ddff", "#80cbc4", "#8F93A2", "#f07178", "#82aaff", "#ffcb6b", "#717CB4"]), "Monokai Pro": W(["#2D2A2E", "#fcfcfa", "#FFFFFF", "#ffd866", "#5b595c", "#423f43", "#939293", "#221F22", "#FCFCFA", "#FFD866", "#FF6188", "#AB9DF2", "#FF6188", "#78DCE8", "#fcfcfa", "#FF6188", "#A9DC76", "#78DCE8", "#727072"]), Dracula: W(["#282A36", "#F8F8F2", "#8BE9FD", "#FF79C5", "#6272A4", "#21222C", "#6272A4", "#191A21", "#F8F8F2", "#F1FA8C", "#FF79C6", "#BD93F9", "#FF79C6", "#F1FA8C", "#F8F8F2", "#FF79C6", "#50FA78", "#50FA7B", "#6272A4"]), "Arc Dark": W(["#2f343f", "#D3DAE3", "#FFFFFF", "#42A5F5", "#3F3F46", "#404552", "#8b9eb5", "#262b33", "#CF6A4C", "#8F9D6A", "#9B859D", "#CDA869", "#A7A7A7", "#7587A6", "#D3DAE3", "#CF6A4C", "#7587A6", "#F9EE98", "#747C84"]), "Atom One Dark": W(["#282C34", "#979FAD", "#FFFFFF", "#2979ff", "#383D48", "#2e3239", "#979FAD", "#21252B", "#D19A66", "#98C379", "#C679DD", "#D19A66", "#61AFEF", "#56B6C2", "#979FAD", "#F07178", "#61AEEF", "#E5C17C", "#59626F"]), "Atom One Light": U(["#FAFAFA", "#232324", "#232324", "#2979ff", "#EAEAEB", "#DBDBDC", "#9D9D9F", "#FFFFFF", "#986801", "#50A14E", "#A626A4", "#986801", "#4078F2", "#0184BC", "#232324", "#E4564A", "#4078F2", "#C18401", "#A0A1A7"]), "Solarized Dark": W(["#002B36", "#839496", "#FFFFFF", "#d33682", "#11353F", "#0D3640", "#586e75", "#00252E", "#268BD2", "#2AA198", "#859900", "#D33682", "#93A1A1", "#268BD2", "#839496", "#268BD2", "#B58900", "#B58900", "#657B83"]), "Solarized Light": U(["#fdf6e3", "#586e75", "#002b36", "#d33682", "#F6F0DE", "#f7f2e2", "#93a1a1", "#eee8d5", "#268BD2", "#2AA198", "#859900", "#D33682", "#657B83", "#268BD2", "#586e75", "#268BD2", "#B58900", "#657B83", "#93A1A1"]), Github: U(["#F7F8FA", "#5B6168", "#FFFFFF", "#79CB60", "#CCE5FF", "#DFE1E4", "#292D31", "#FFFFFF", "#24292E", "#032F62", "#D73A49", "#005CC5", "#D73A49", "#005CC5", "#5B6168", "#22863A", "#6F42C1", "#6F42C1", "#6A737D"]), "Night Owl": W(["#011627", "#b0bec5", "#ffffff", "#7e57c2", "#152C3B", "#2a373e", "#607d8b", "#001424", "#addb67", "#ecc48d", "#c792ea", "#f78c6c", "#c792ea", "#80CBC4", "#b0bec5", "#7fdbca", "#82AAFF", "#FAD430", "#637777"]), "Light Owl": U(["#FAFAFA", "#546e7a", "#403f53", "#269386", "#E0E7EA", "#efefef", "#403F53", "#FAFAFA", "#0C969B", "#c96765", "#994cc3", "#aa0982", "#7d818b", "#994cc3", "#546e7a", "#994cc3", "#4876d6", "#4876d6", "#637777"]) }, X = [], ee = 1, te = K.Light, ne = function e3(t2, n3) {
            t2 = Z()(t2);
            for (var o2 = 0, r3 = X.length; o2 < r3; o2++)
              if (X[o2].css === t2)
                return;
            n3 = n3 || e3.container || document.head;
            var i2 = document.createElement("style");
            i2.type = "text/css", n3.appendChild(i2);
            var a2 = { css: t2, el: i2, container: n3 };
            return re(a2), X.push(a2), a2;
          };
          function oe() {
            C()(X, function(e3) {
              return re(e3);
            });
          }
          function re(e3) {
            var t2 = e3.css, n3 = e3.el;
            t2 = (t2 = t2.replace(/(\d+)px/g, function(e4, t3) {
              return +t3 * ee + "px";
            })).replace(/_/g, "eruda-");
            var o2 = D()(K.Light);
            C()(o2, function(e4) {
              t2 = t2.replace(new RegExp("var\\(--".concat(F()(e4), "\\)"), "g"), te[e4]);
            }), n3.innerText = t2;
          }
          ne.setScale = function(e3) {
            ee = e3, oe();
          }, ne.setTheme = function(e3) {
            te = T()(e3) ? K[e3] || K.Light : P()(e3, K.Light), oe();
          }, ne.getCurTheme = function() {
            return te;
          }, ne.getThemes = function() {
            return K;
          }, ne.clear = function() {
            C()(X, function(e3) {
              var t2 = e3.container, n3 = e3.el;
              return t2.removeChild(n3);
            }), X = [];
          }, ne.remove = function(e3) {
            X = E()(X, function(t2) {
              return t2 !== e3;
            }), e3.container.removeChild(e3.el);
          };
          var ie = ne, ae = n2(8692);
          function se(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var ce = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = se(o2);
            function o2() {
              var e4;
              return (0, r2.Z)(this, o2), (e4 = t2.call(this))._style = ie(n2(8011)), e4.name = "settings", e4._settings = [], e4;
            }
            return (0, i.Z)(o2, [{ key: "init", value: function(e4) {
              (0, v.Z)((0, l.Z)(o2.prototype), "init", this).call(this, e4), this._setting = new ae.Z(e4.get(0)), this._bindEvent();
            } }, { key: "remove", value: function(e4, t3) {
              var n3 = this;
              if (T()(e4)) {
                var o3 = this;
                this._$el.find(".luna-setting-item-title").each(function() {
                  y()(this).text() === e4 && o3._setting.remove(this.settingItem);
                });
              } else
                this._settings = E()(this._settings, function(o4) {
                  return o4.config !== e4 || o4.key !== t3 || (n3._setting.remove(o4.item), false);
                });
              return this._cleanSeparator(), this;
            } }, { key: "destroy", value: function() {
              this._setting.destroy(), (0, v.Z)((0, l.Z)(o2.prototype), "destroy", this).call(this), ie.remove(this._style);
            } }, { key: "clear", value: function() {
              this._settings = [], this._setting.clear();
            } }, { key: "switch", value: function(e4, t3, n3) {
              var o3 = this._genId(), r3 = this._setting.appendCheckbox(o3, !!e4.get(t3), n3);
              return this._settings.push({ config: e4, key: t3, id: o3, item: r3 }), this;
            } }, { key: "select", value: function(e4, t3, n3, o3) {
              var r3 = this._genId(), i2 = {};
              C()(o3, function(e5) {
                return i2[e5] = e5;
              });
              var a2 = this._setting.appendSelect(r3, e4.get(t3), "", n3, i2);
              return this._settings.push({ config: e4, key: t3, id: r3, item: a2 }), this;
            } }, { key: "range", value: function(e4, t3, n3, o3) {
              var r3 = o3.min, i2 = void 0 === r3 ? 0 : r3, a2 = o3.max, s2 = void 0 === a2 ? 1 : a2, c2 = o3.step, l2 = void 0 === c2 ? 0.1 : c2, u3 = this._genId(), d3 = this._setting.appendNumber(u3, e4.get(t3), n3, { max: s2, min: i2, step: l2, range: true });
              return this._settings.push({ config: e4, key: t3, min: i2, max: s2, step: l2, id: u3, item: d3 }), this;
            } }, { key: "button", value: function(e4, t3) {
              return this._setting.appendButton(e4, t3), this;
            } }, { key: "separator", value: function() {
              return this._setting.appendSeparator(), this;
            } }, { key: "text", value: function(e4) {
              return this._setting.appendTitle(e4), this;
            } }, { key: "_cleanSeparator", value: function() {
              var e4 = z()(this._$el.get(0).children);
              function t3(e5) {
                return M()(e5.getAttribute("class"), "luna-setting-item-separator");
              }
              for (var n3 = 0, o3 = e4.length; n3 < o3 - 1; n3++)
                t3(e4[n3]) && t3(e4[n3 + 1]) && y()(e4[n3]).remove();
            } }, { key: "_genId", value: function() {
              return A()("eruda-settings");
            } }, { key: "_getSetting", value: function(e4) {
              var t3;
              return C()(this._settings, function(n3) {
                n3.id === e4 && (t3 = n3);
              }), t3;
            } }, { key: "_bindEvent", value: function() {
              var e4 = this;
              this._setting.on("change", function(t3, n3) {
                var o3 = e4._getSetting(t3);
                o3.config.set(o3.key, n3);
              });
            } }], [{ key: "createCfg", value: function(e4, t3) {
              return new (_())("eruda-" + e4, t3);
            } }]), o2;
          }(g), le = n2(6837), ue = n2.n(le), de = n2(442), fe = n2.n(de), he = n2(6334), pe = n2.n(he), ve = n2(4187), me = n2.n(ve), ge = n2(1286), be = n2.n(ge), ye = n2(9702), we = n2.n(ye), _e = n2(2461), xe = n2.n(_e), Ae = n2(5026), ke = n2.n(Ae), Ce = n2(5610), Se = n2.n(Ce), Ee = n2(3875), Oe = n2.n(Ee), Te = n2(4331), Ne = n2.n(Te), Me = n2(7483), je = n2.n(Me);
          function ze() {
            var e3 = false, t2 = document.createElement("div");
            if (CSS.supports("padding-bottom: env(safe-area-inset-bottom)") ? (t2.style.paddingBottom = "env(safe-area-inset-bottom)", e3 = true) : CSS.supports("padding-bottom: constant(safe-area-inset-bottom)") && (t2.style.paddingBottom = "constant(safe-area-inset-bottom)", e3 = true), e3) {
              document.body.appendChild(t2);
              var n3 = parseInt(window.getComputedStyle(t2).paddingBottom);
              if (document.body.removeChild(t2), n3 > 0)
                return true;
            }
            return false;
          }
          function Re(e3) {
            return me()(e3).replace(/\\'/g, "'").replace(/\t/g, "\\t");
          }
          function Ze(e3, t2) {
            var n3;
            switch (be()(t2) && (t2 = true), e3) {
              case "local":
                n3 = window.localStorage;
                break;
              case "session":
                n3 = window.sessionStorage;
            }
            try {
              var o2 = "test-localStorage-" + Date.now();
              n3.setItem(o2, o2);
              var r3 = n3.getItem(o2);
              if (n3.removeItem(o2), r3 !== o2)
                throw new Error();
            } catch (e4) {
              return t2 ? ke() : void 0;
            }
            return n3;
          }
          function Ie(e3) {
            var t2 = we()(e3.split("/"));
            return "" === t2 && (t2 = (e3 = new (pe())(e3)).hostname), t2;
          }
          function De(e3) {
            return Oe()(e3.replace("px", ""));
          }
          function Be(e3) {
            for (; e3; ) {
              if ("eruda" === e3.id)
                return true;
              e3 = e3.parentNode;
            }
            return false;
          }
          function Fe(e3) {
            for (; e3; ) {
              var t2 = "";
              if (e3.getAttribute && (t2 = e3.getAttribute("class") || ""), M()(t2, "__chobitsu-hide__"))
                return true;
              e3 = e3.parentNode;
            }
            return false;
          }
          var Le = ie;
          function Pe(e3) {
            if (/<[^>]*>/g.test(e3))
              try {
                var t2 = je().parse(e3);
                return He(t2, function(e4) {
                  e4.attrs && e4.attrs.class && (e4.attrs.class = $e(e4.attrs.class));
                }), je().stringify(t2);
              } catch (t3) {
                return $e(e3);
              }
            return $e(e3);
          }
          function He(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && He(r3.content, t2);
            }
          }
          function $e(e3) {
            var t2 = "eruda-";
            return xe()(Ne()(e3).split(/\s+/), function(e4) {
              return M()(e4, t2) ? e4 : e4.replace(/[\w-]+/, function(e5) {
                return "".concat(t2).concat(e5);
              });
            }).join(" ");
          }
          var Ge = "ontouchstart" in Se(), Ye = "PointerEvent" in Se(), qe = { start: "touchstart", move: "touchmove", end: "touchend" }, Je = { start: "mousedown", move: "mousemove", end: "mouseup" }, Qe = { start: "pointerdown", move: "pointermove", end: "pointerup" };
          function We(e3) {
            return Ye ? Qe[e3] : Ge ? qe[e3] : Je[e3];
          }
          function Ue(e3, t2) {
            var n3 = "x" === e3 ? "clientX" : "clientY";
            return t2[n3] ? t2[n3] : t2.changedTouches ? t2.changedTouches[0][n3] : 0;
          }
          function Ve(e3, t2) {
            var n3 = "x" === e3 ? "pageX" : "pageY";
            return t2[n3] ? t2[n3] : t2.changedTouches ? t2.changedTouches[0][n3] : 0;
          }
          function Ke(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var Xe, et = y()(document), tt = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = Ke(o2);
            function o2(e4) {
              var i2;
              return (0, r2.Z)(this, o2), i2 = t2.call(this), (0, u2.Z)((0, a.Z)(i2), "_onDragStart", function(e5) {
                var t3 = i2._$el;
                t3.addClass(Pe("active")), i2._isClick = true, e5 = e5.origEvent, i2._startX = Ue("x", e5), i2._oldX = De(t3.css("left")), i2._oldY = De(t3.css("top")), i2._startY = Ue("y", e5), et.on(We("move"), i2._onDragMove), et.on(We("end"), i2._onDragEnd);
              }), (0, u2.Z)((0, a.Z)(i2), "_onDragMove", function(e5) {
                var t3 = i2._$el.get(0).offsetWidth, n3 = i2._$container.get(0).offsetWidth, o3 = i2._$container.get(0).offsetHeight, r3 = Ue("x", e5 = e5.origEvent) - i2._startX, a2 = Ue("y", e5) - i2._startY;
                (Math.abs(r3) > 3 || Math.abs(a2) > 3) && (i2._isClick = false);
                var s2 = i2._oldX + r3, c2 = i2._oldY + a2;
                s2 < 0 ? s2 = 0 : s2 > n3 - t3 && (s2 = n3 - t3), c2 < 0 ? c2 = 0 : c2 > o3 - t3 && (c2 = o3 - t3), i2._$el.css({ left: s2, top: c2 });
              }), (0, u2.Z)((0, a.Z)(i2), "_onDragEnd", function(e5) {
                var t3 = i2._$el;
                i2._isClick && i2.emit("click"), i2._onDragMove(e5), et.off(We("move"), i2._onDragMove), et.off(We("end"), i2._onDragEnd);
                var n3 = i2.config;
                n3.get("rememberPos") && n3.set("pos", { x: De(t3.css("left")), y: De(t3.css("top")) }), t3.rmClass("eruda-active");
              }), i2._style = ie(n2(9195)), i2._$container = e4, i2._initTpl(), i2._bindEvent(), i2._registerListener(), i2;
            }
            return (0, i.Z)(o2, [{ key: "hide", value: function() {
              this._$el.hide();
            } }, { key: "show", value: function() {
              this._$el.show();
            } }, { key: "setPos", value: function(e4) {
              this._isOutOfRange(e4) && (e4 = this._getDefPos()), this._$el.css({ left: e4.x, top: e4.y }), this.config.set("pos", e4);
            } }, { key: "getPos", value: function() {
              return this.config.get("pos");
            } }, { key: "destroy", value: function() {
              ie.remove(this._style), this._unregisterListener(), this._$el.remove();
            } }, { key: "_isOutOfRange", value: function(e4) {
              e4 = e4 || this.config.get("pos");
              var t3 = this._getDefPos();
              return e4.x > t3.x + 10 || e4.x < 0 || e4.y < 0 || e4.y > t3.y + 10;
            } }, { key: "_registerListener", value: function() {
              var e4 = this;
              this._scaleListener = function() {
                return ue()(function() {
                  e4._isOutOfRange() && e4._resetPos();
                });
              }, p.on(p.SCALE, this._scaleListener);
            } }, { key: "_unregisterListener", value: function() {
              p.off(p.SCALE, this._scaleListener);
            } }, { key: "_initTpl", value: function() {
              var e4 = this._$container;
              e4.append(Pe('<div class="entry-btn"><span class="icon-tool"></span></div>')), this._$el = e4.find(".eruda-entry-btn");
            } }, { key: "_resetPos", value: function(e4) {
              var t3 = this.config, n3 = t3.get("pos"), o3 = this._getDefPos();
              t3.get("rememberPos") && !e4 || (n3 = o3), this.setPos(n3);
            } }, { key: "_bindEvent", value: function() {
              var e4 = this;
              this._$el.on(We("start"), this._onDragStart), fe().on("change", function() {
                return e4._resetPos(true);
              }), window.addEventListener("resize", function() {
                return e4._resetPos();
              });
            } }, { key: "initCfg", value: function(e4) {
              var t3 = this.config = ce.createCfg("entry-button", { rememberPos: true, pos: this._getDefPos() });
              e4.switch(t3, "rememberPos", "Remember Entry Button Position"), this._resetPos();
            } }, { key: "_getDefPos", value: function() {
              var e4 = this._$el.get(0).offsetWidth + 10;
              return { x: window.innerWidth - e4, y: window.innerHeight - e4 };
            } }]), o2;
          }(f2()), nt = n2(4989), ot = Xe = new (n2.n(nt)())("[Eruda]", "warn");
          Xe.formatter = function(e3, t2) {
            return t2.unshift(this.name), t2;
          };
          var rt = n2(3990), it = n2.n(rt), at = n2(2520), st = n2.n(at), ct = n2(6930), lt = n2.n(ct), ut = n2(4270), dt = n2.n(ut), ft = n2(6093), ht = n2.n(ft), pt = n2(129), vt = n2(7638);
          function mt(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var gt = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = mt(o2);
            function o2(e4) {
              var i2, s2 = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).defaults, c2 = void 0 === s2 ? {} : s2;
              return (0, r2.Z)(this, o2), i2 = t2.call(this), (0, u2.Z)((0, a.Z)(i2), "_checkSafeArea", function() {
                var e5 = (0, a.Z)(i2).$container;
                ze() ? e5.addClass(Pe("safe-area")) : e5.rmClass(Pe("safe-area"));
              }), (0, u2.Z)((0, a.Z)(i2), "_updateTabHeight", function(e5) {
                i2._tab.setOption("height", 40 * e5), ue()(function() {
                  i2._tab.updateSlider();
                });
              }), i2._defCfg = $2()({ transparency: 1, displaySize: 80, theme: st()() ? "Dark" : "Light" }, c2), i2._style = ie(n2(13)), i2.$container = e4, i2._isShow = false, i2._opacity = 1, i2._tools = {}, i2._isResizing = false, i2._resizeTimer = null, i2._resizeStartY = 0, i2._resizeStartSize = 0, i2._initTpl(), i2._initTab(), i2._initNotification(), i2._initModal(), dt()(function() {
                return i2._checkSafeArea();
              }), i2._bindEvent(), i2;
            }
            return (0, i.Z)(o2, [{ key: "show", value: function() {
              var e4 = this;
              return this._isShow = true, this._$el.show(), this._tab.updateSlider(), setTimeout(function() {
                e4._$el.css("opacity", e4._opacity);
              }, 50), this.emit("show"), this;
            } }, { key: "hide", value: function() {
              var e4 = this;
              return this._isShow = false, this.emit("hide"), this._$el.css({ opacity: 0 }), setTimeout(function() {
                return e4._$el.hide();
              }, 300), this;
            } }, { key: "toggle", value: function() {
              return this._isShow ? this.hide() : this.show();
            } }, { key: "add", value: function(e4) {
              var t3 = this._tab;
              if (!(e4 instanceof g)) {
                var n3 = new g(), o3 = n3.init, r3 = n3.show, i2 = n3.hide, a2 = n3.destroy;
                P()(e4, { init: o3, show: r3, hide: i2, destroy: a2 });
              }
              var s2 = e4.name;
              return s2 ? (s2 = s2.toLowerCase(), this._tools[s2] ? ot.warn("Tool ".concat(s2, " already exists")) : (this._$tools.prepend('<div id="'.concat(Pe(s2), '" class="').concat(Pe(s2 + " tool"), '"></div>')), e4.init(this._$tools.find(".".concat(Pe(s2), ".").concat(Pe("tool"))), this), e4.active = false, this._tools[s2] = e4, "settings" === s2 ? t3.append({ id: s2, title: s2 }) : t3.insert(t3.length - 1, { id: s2, title: s2 }), this)) : ot.error("You must specify a name for a tool");
            } }, { key: "remove", value: function(e4) {
              var t3 = this._tools;
              if (!t3[e4])
                return ot.warn("Tool ".concat(e4, " doesn't exist"));
              this._tab.remove(e4);
              var n3 = t3[e4];
              if (delete t3[e4], n3.active) {
                var o3 = D()(t3);
                o3.length > 0 && this.showTool(t3[we()(o3)].name);
              }
              return n3.destroy(), this;
            } }, { key: "removeAll", value: function() {
              var e4 = this;
              return C()(this._tools, function(t3) {
                return e4.remove(t3.name);
              }), this;
            } }, { key: "get", value: function(e4) {
              var t3 = this._tools[e4];
              if (t3)
                return t3;
            } }, { key: "showTool", value: function(e4) {
              if (this._curTool === e4)
                return this;
              this._curTool = e4;
              var t3 = this._tools, n3 = t3[e4];
              if (n3) {
                var o3 = {};
                return C()(t3, function(e5) {
                  e5.active && (o3 = e5, e5.active = false, e5.hide());
                }), n3.active = true, n3.show(), this._tab.select(e4), this.emit("showTool", e4, o3), this;
              }
            } }, { key: "initCfg", value: function(e4) {
              var t3 = this, n3 = this.config = ce.createCfg("dev-tools", this._defCfg);
              this._setTransparency(n3.get("transparency")), this._setDisplaySize(n3.get("displaySize")), this._setTheme(n3.get("theme")), n3.on("change", function(e5, n4) {
                switch (e5) {
                  case "transparency":
                    return t3._setTransparency(n4);
                  case "displaySize":
                    return t3._setDisplaySize(n4);
                  case "theme":
                    return t3._setTheme(n4);
                }
              }), e4.separator().select(n3, "theme", "Theme", D()(ie.getThemes())).range(n3, "transparency", "Transparency", { min: 0.2, max: 1, step: 0.01 }).range(n3, "displaySize", "Display Size", { min: 40, max: 100, step: 1 }).button("Restore defaults and reload", function() {
                var e5 = Ze("local"), t4 = JSON.parse(JSON.stringify(e5));
                C()(t4, function(t5, n4) {
                  T()(t5) && lt()(n4, "eruda") && e5.removeItem(n4);
                }), window.location.reload();
              }).separator();
            } }, { key: "notify", value: function(e4, t3) {
              this._notification.notify(e4, t3);
            } }, { key: "destroy", value: function() {
              ie.remove(this._style), this.removeAll(), this._tab.destroy(), this._$el.remove(), window.removeEventListener("resize", this._checkSafeArea), p.off(p.SCALE, this._updateTabHeight);
            } }, { key: "_setTheme", value: function(e4) {
              var t3 = this.$container;
              !function(e5) {
                return M()(V, e5);
              }(e4) ? t3.rmClass(Pe("dark")) : t3.addClass(Pe("dark")), ie.setTheme(e4);
            } }, { key: "_setTransparency", value: function(e4) {
              it()(e4) && (this._opacity = e4, this._isShow && this._$el.css({ opacity: e4 }));
            } }, { key: "_setDisplaySize", value: function(e4) {
              it()(e4) && this._$el.css({ height: e4 + "%" });
            } }, { key: "_initTpl", value: function() {
              var e4 = this.$container;
              e4.append(Pe('\n      <div class="dev-tools">\n        <div class="resizer"></div>\n        <div class="tab"></div>\n        <div class="tools"></div>\n        <div class="notification"></div>\n        <div class="modal"></div>\n      </div>\n      ')), this._$el = e4.find(Pe(".dev-tools")), this._$tools = this._$el.find(Pe(".tools"));
            } }, { key: "_initTab", value: function() {
              var e4 = this;
              this._tab = new vt.Z(this._$el.find(Pe(".tab")).get(0), { height: 40 }), this._tab.on("select", function(t3) {
                return e4.showTool(t3);
              });
            } }, { key: "_initNotification", value: function() {
              this._notification = new (ht())(this._$el.find(Pe(".notification")).get(0), { position: { x: "center", y: "top" } });
            } }, { key: "_initModal", value: function() {
              pt.Z.setContainer(this._$el.find(Pe(".modal")).get(0));
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t3 = this._$el.find(Pe(".resizer")), n3 = this._$el.find(Pe(".nav-bar")), o3 = y()(document), r3 = function(t4) {
                if (e4._isResizing) {
                  t4.preventDefault(), t4.stopPropagation(), t4 = t4.origEvent;
                  var n4 = (e4._resizeStartY - Ue("y", t4)) / window.innerHeight * 100, o4 = e4._resizeStartSize + n4;
                  o4 < 40 ? o4 = 40 : o4 > 100 && (o4 = 100), e4.config.set("displaySize", Oe()(o4.toFixed(2)));
                }
              }, i2 = function n4() {
                clearTimeout(e4._resizeTimer), e4._isResizing = false, t3.css("height", 10), o3.off(We("move"), r3), o3.off(We("end"), n4);
              };
              t3.css("height", 10), t3.on(We("start"), function(n4) {
                n4.preventDefault(), n4.stopPropagation(), n4 = n4.origEvent, e4._isResizing = true, e4._resizeStartSize = e4.config.get("displaySize"), e4._resizeStartY = Ue("y", n4), t3.css("height", "100%"), o3.on(We("move"), r3), o3.on(We("end"), i2);
              }), n3.on("contextmenu", function(e5) {
                return e5.preventDefault();
              }), this.$container.on("click", function(e5) {
                return e5.stopPropagation();
              }), window.addEventListener("resize", this._checkSafeArea), p.on(p.SCALE, this._updateTabHeight);
            } }]), o2;
          }(f2()), bt = n2(1214), yt = n2.n(bt), wt = n2(4777), _t = n2.n(wt), xt = n2(1754), At = n2.n(xt), kt = n2(5484), Ct = n2.n(kt), St = n2(3023), Et = n2.n(St), Ot = n2(9585), Tt = n2.n(Ot), Nt = n2(6156), Mt = n2.n(Nt), jt = n2(8816);
          function zt(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          Ct().start();
          var Rt = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = zt(o2);
            function o2() {
              var e4, n3 = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).name, i2 = void 0 === n3 ? "console" : n3;
              return (0, r2.Z)(this, o2), e4 = t2.call(this), (0, u2.Z)((0, a.Z)(e4), "_handleShow", function() {
                Tt()(e4._$el.get(0)) || e4._logger.renderViewport();
              }), (0, u2.Z)((0, a.Z)(e4), "_handleErr", function(t3) {
                e4._logger.error(t3);
              }), f2().mixin((0, a.Z)(e4)), e4.name = i2, e4._selectedLog = null, e4;
            }
            return (0, i.Z)(o2, [{ key: "init", value: function(e4, t3) {
              (0, v.Z)((0, l.Z)(o2.prototype), "init", this).call(this, e4), this._container = t3, this._appendTpl(), this._initCfg(), this._initLogger(), this._exposeLogger(), this._bindEvent();
            } }, { key: "show", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "show", this).call(this), this._handleShow();
            } }, { key: "overrideConsole", value: function() {
              var e4 = this, t3 = this._origConsole = {}, n3 = window.console;
              return Zt.forEach(function(o3) {
                var r3 = t3[o3] = yt();
                n3[o3] && (r3 = t3[o3] = n3[o3].bind(n3)), n3[o3] = function() {
                  e4[o3].apply(e4, arguments), r3.apply(void 0, arguments);
                };
              }), this;
            } }, { key: "setGlobal", value: function(e4, t3) {
              this._logger.setGlobal(e4, t3);
            } }, { key: "restoreConsole", value: function() {
              var e4 = this;
              return this._origConsole ? (Zt.forEach(function(t3) {
                return window.console[t3] = e4._origConsole[t3];
              }), delete this._origConsole, this) : this;
            } }, { key: "catchGlobalErr", value: function() {
              return Ct().addListener(this._handleErr), this;
            } }, { key: "ignoreGlobalErr", value: function() {
              return Ct().rmListener(this._handleErr), this;
            } }, { key: "filter", value: function(e4) {
              var t3 = this._$filterText, n3 = this._logger;
              T()(e4) ? (t3.text(e4), n3.setOption("filter", Ne()(e4))) : At()(e4) ? (t3.text(Z()(e4)), n3.setOption("filter", e4)) : _t()(e4) && (t3.text("ƒ"), n3.setOption("filter", e4));
            } }, { key: "destroy", value: function() {
              this._logger.destroy(), (0, v.Z)((0, l.Z)(o2.prototype), "destroy", this).call(this), this._container.off("show", this._handleShow), this._style && ie.remove(this._style), this.ignoreGlobalErr(), this.restoreConsole(), this._rmCfg();
            } }, { key: "_enableJsExecution", value: function(e4) {
              var t3 = this._$el, n3 = t3.find(Pe(".js-input"));
              e4 ? (n3.show(), t3.rmClass(Pe("js-input-hidden"))) : (n3.hide(), t3.addClass(Pe("js-input-hidden")));
            } }, { key: "_appendTpl", value: function() {
              var e4 = this._$el;
              this._style = ie(n2(3191)), e4.append(Pe('\n      <div class="control">\n        <span class="icon-clear clear-console"></span>\n        <span class="level active" data-level="all">All</span>\n        <span class="level" data-level="info">Info</span>\n        <span class="level" data-level="warning">Warning</span>\n        <span class="level" data-level="error">Error</span>\n        <span class="filter-text"></span>\n        <span class="icon-filter filter"></span>\n        <span class="icon-copy icon-disabled copy"></span>\n      </div>\n      <div class="logs-container"></div>\n      <div class="js-input">\n        <div class="buttons">\n          <div class="button cancel">Cancel</div>\n          <div class="button execute">Execute</div>\n        </div>\n        <span class="icon-arrow-right"></span>\n        <textarea></textarea>\n      </div>\n    '));
              var t3 = e4.find(Pe(".js-input")), o3 = t3.find("textarea"), r3 = t3.find(Pe(".buttons"));
              $2()(this, { _$control: e4.find(Pe(".control")), _$logs: e4.find(Pe(".logs-container")), _$inputContainer: t3, _$input: o3, _$inputBtns: r3, _$filterText: e4.find(Pe(".filter-text")) });
            } }, { key: "_initLogger", value: function() {
              var e4 = this.config, t3 = e4.get("maxLogNum");
              t3 = "infinite" === t3 ? 0 : +t3;
              var n3 = this._$control.find(Pe(".level")), o3 = new jt.Z(this._$logs.get(0), { asyncRender: e4.get("asyncRender"), maxNum: t3, showHeader: e4.get("displayExtraInfo"), unenumerable: e4.get("displayUnenumerable"), accessGetter: e4.get("displayGetterVal"), lazyEvaluation: e4.get("lazyEvaluation") });
              o3.on("optionChange", function(e5, t4) {
                if ("level" === e5)
                  n3.each(function() {
                    var e6 = y()(this), n4 = e6.data("level");
                    e6[n4 === t4 || "all" === n4 && Y()(t4) ? "addClass" : "rmClass"](Pe("active"));
                  });
              }), e4.get("overrideConsole") && this.overrideConsole(), this._logger = o3;
            } }, { key: "_exposeLogger", value: function() {
              var e4 = this, t3 = this._logger;
              ["html"].concat(Zt).forEach(function(n3) {
                return e4[n3] = function() {
                  for (var o3 = arguments.length, r3 = new Array(o3), i2 = 0; i2 < o3; i2++)
                    r3[i2] = arguments[i2];
                  return t3[n3].apply(t3, r3), e4.emit.apply(e4, [n3].concat(r3)), e4;
                };
              });
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t3 = this._container, n3 = this._$input, o3 = this._$inputBtns, r3 = this._$control, i2 = this._logger, a2 = this.config;
              r3.on("click", Pe(".clear-console"), function() {
                return i2.clear(true);
              }).on("click", Pe(".level"), function() {
                var e5 = y()(this).data("level");
                "all" === e5 && (e5 = ["verbose", "info", "warning", "error"]), i2.setOption("level", e5);
              }).on("click", Pe(".filter"), function() {
                pt.Z.prompt("Filter").then(function(t4) {
                  Mt()(t4) || e4.filter(t4);
                });
              }).on("click", Pe(".copy"), function() {
                e4._selectedLog.copy(), t3.notify("Copied");
              }), o3.on("click", Pe(".cancel"), function() {
                return e4._hideInput();
              }).on("click", Pe(".execute"), function() {
                var t4 = n3.val().trim();
                "" !== t4 && (i2.evaluate(t4), n3.val("").get(0).blur(), e4._hideInput());
              }), n3.on("focusin", function() {
                return e4._showInput();
              }), i2.on("insert", function(e5) {
                "error" === e5.type && a2.get("displayIfErr") && t3.showTool("console").show();
              }), i2.on("select", function(t4) {
                e4._selectedLog = t4, r3.find(Pe(".icon-copy")).rmClass(Pe("icon-disabled"));
              }), i2.on("deselect", function() {
                e4._selectedLog = null, r3.find(Pe(".icon-copy")).addClass(Pe("icon-disabled"));
              }), t3.on("show", this._handleShow);
            } }, { key: "_hideInput", value: function() {
              this._$inputContainer.rmClass(Pe("active")), this._$inputBtns.css("display", "none");
            } }, { key: "_showInput", value: function() {
              this._$inputContainer.addClass(Pe("active")), this._$inputBtns.css("display", "flex");
            } }, { key: "_rmCfg", value: function() {
              var e4 = this.config, t3 = this._container.get("settings");
              t3 && t3.remove(e4, "asyncRender").remove(e4, "jsExecution").remove(e4, "catchGlobalErr").remove(e4, "overrideConsole").remove(e4, "displayExtraInfo").remove(e4, "displayUnenumerable").remove(e4, "displayGetterVal").remove(e4, "lazyEvaluation").remove(e4, "displayIfErr").remove(e4, "maxLogNum").remove(Et()(this.name));
            } }, { key: "_initCfg", value: function() {
              var e4 = this, t3 = this._container, n3 = this.config = ce.createCfg(this.name, { asyncRender: true, catchGlobalErr: true, jsExecution: true, overrideConsole: true, displayExtraInfo: false, displayUnenumerable: true, displayGetterVal: true, lazyEvaluation: true, displayIfErr: false, maxLogNum: "infinite" });
              this._enableJsExecution(n3.get("jsExecution")), n3.get("catchGlobalErr") && this.catchGlobalErr(), n3.on("change", function(t4, n4) {
                var o4 = e4._logger;
                switch (t4) {
                  case "asyncRender":
                    return o4.setOption("asyncRender", n4);
                  case "jsExecution":
                    return e4._enableJsExecution(n4);
                  case "catchGlobalErr":
                    return n4 ? e4.catchGlobalErr() : e4.ignoreGlobalErr();
                  case "overrideConsole":
                    return n4 ? e4.overrideConsole() : e4.restoreConsole();
                  case "maxLogNum":
                    return o4.setOption("maxNum", "infinite" === n4 ? 0 : +n4);
                  case "displayExtraInfo":
                    return o4.setOption("showHeader", n4);
                  case "displayUnenumerable":
                    return o4.setOption("unenumerable", n4);
                  case "displayGetterVal":
                    return o4.setOption("accessGetter", n4);
                  case "lazyEvaluation":
                    return o4.setOption("lazyEvaluation", n4);
                }
              });
              var o3 = t3.get("settings");
              o3 && o3.text(Et()(this.name)).switch(n3, "asyncRender", "Asynchronous Rendering").switch(n3, "jsExecution", "Enable JavaScript Execution").switch(n3, "catchGlobalErr", "Catch Global Errors").switch(n3, "overrideConsole", "Override Console").switch(n3, "displayIfErr", "Auto Display If Error Occurs").switch(n3, "displayExtraInfo", "Display Extra Information").switch(n3, "displayUnenumerable", "Display Unenumerable Properties").switch(n3, "displayGetterVal", "Access Getter Value").switch(n3, "lazyEvaluation", "Lazy Evaluation").select(n3, "maxLogNum", "Max Log Number", ["infinite", "250", "125", "100", "50", "10"]).separator();
            } }]), o2;
          }(g), Zt = ["log", "error", "info", "warn", "dir", "time", "timeLog", "timeEnd", "clear", "table", "assert", "count", "countReset", "debug", "group", "groupCollapsed", "groupEnd"], It = n2(4677), Dt = n2.n(It), Bt = n2(8887), Ft = n2.n(Bt), Lt = n2(8901), Pt = n2.n(Lt), Ht = n2(2327), $t = n2.n(Ht), Gt = n2(4219), Yt = n2.n(Gt), qt = n2(7756), Jt = n2.n(qt);
          function Qt(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var Wt = function(e3) {
            (0, s.Z)(n3, e3);
            var t2 = Qt(n3);
            function n3(e4, o2) {
              var i2;
              return (0, r2.Z)(this, n3), i2 = t2.call(this), (0, u2.Z)((0, a.Z)(i2), "_copyRes", function() {
                var e5 = i2._detailData, t3 = "".concat(e5.method, " ").concat(e5.url, " ").concat(e5.status, "\n");
                Ft()(e5.data) || (t3 += "\nRequest Data\n\n", t3 += "".concat(e5.data, "\n")), Ft()(e5.reqHeaders) || (t3 += "\nRequest Headers\n\n", C()(e5.reqHeaders, function(e6, n4) {
                  return t3 += "".concat(n4, ": ").concat(e6, "\n");
                })), Ft()(e5.resHeaders) || (t3 += "\nResponse Headers\n\n", C()(e5.resHeaders, function(e6, n4) {
                  return t3 += "".concat(n4, ": ").concat(e6, "\n");
                })), e5.resTxt && (t3 += "\n".concat(e5.resTxt, "\n")), $t()(t3), i2._devtools.notify("Copied");
              }), i2._$container = e4, i2._devtools = o2, i2._detailData = {}, i2._bindEvent(), i2;
            }
            return (0, i.Z)(n3, [{ key: "show", value: function(e4) {
              e4.resTxt && "" === Ne()(e4.resTxt) && delete e4.resTxt, Ft()(e4.resHeaders) && delete e4.resHeaders, Ft()(e4.reqHeaders) && delete e4.reqHeaders;
              var t3 = "";
              e4.data && (t3 = '<pre class="'.concat(Pe("data"), '">').concat(Pt()(e4.data), "</pre>"));
              var n4 = "<tr><td>Empty</td></tr>";
              e4.reqHeaders && (n4 = xe()(e4.reqHeaders, function(e5, t4) {
                return '<tr>\n          <td class="'.concat(Pe("key"), '">').concat(Pt()(t4), "</td>\n          <td>").concat(Pt()(e5), "</td>\n        </tr>");
              }).join(""));
              var o2 = "<tr><td>Empty</td></tr>";
              e4.resHeaders && (o2 = xe()(e4.resHeaders, function(e5, t4) {
                return '<tr>\n          <td class="'.concat(Pe("key"), '">').concat(Pt()(t4), "</td>\n          <td>").concat(Pt()(e5), "</td>\n        </tr>");
              }).join(""));
              var r3 = "";
              if (e4.resTxt) {
                var i2 = e4.resTxt;
                i2.length > Ut && (i2 = Jt()(i2, Ut)), r3 = '<pre class="'.concat(Pe("response"), '">').concat(Pt()(i2), "</pre>");
              }
              var a2 = '<div class="'.concat(Pe("control"), '">\n      <span class="').concat(Pe("icon-arrow-left back"), '"></span>\n      <span class="').concat(Pe("icon-delete back"), '"></span>\n      <span class="').concat(Pe("url"), '">').concat(Pt()(e4.url), '</span>\n      <span class="').concat(Pe("icon-copy copy-res"), '"></span>\n    </div>\n    <div class="').concat(Pe("http"), '">\n      ').concat(t3, '\n      <div class="').concat(Pe("section"), '">\n        <h2>Response Headers</h2>\n        <table class="').concat(Pe("headers"), '">\n          <tbody>\n            ').concat(o2, '\n          </tbody>\n        </table>\n      </div>\n      <div class="').concat(Pe("section"), '">\n        <h2>Request Headers</h2>\n        <table class="').concat(Pe("headers"), '">\n          <tbody>\n            ').concat(n4, "\n          </tbody>\n        </table>\n      </div>\n      ").concat(r3, "\n    </div>");
              this._$container.html(a2).show(), this._detailData = e4;
            } }, { key: "hide", value: function() {
              this._$container.hide(), this.emit("hide");
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t3 = this._devtools;
              this._$container.on("click", Pe(".back"), function() {
                return e4.hide();
              }).on("click", Pe(".copy-res"), this._copyRes).on("click", Pe(".http .response"), function() {
                var t4 = e4._detailData, o2 = t4.resTxt;
                if (Yt()(o2))
                  return n4("object", o2);
                switch (t4.subType) {
                  case "css":
                    return n4("css", o2);
                  case "html":
                    return n4("html", o2);
                  case "javascript":
                    return n4("js", o2);
                  case "json":
                    return n4("object", o2);
                }
                return "image" === t4.type ? n4("img", t4.url) : void 0;
              });
              var n4 = function(e5, n5) {
                var o2 = t3.get("sources");
                o2 && (o2.set(e5, n5), t3.showTool("sources"));
              };
            } }]), n3;
          }(f2()), Ut = 1e5, Vt = n2(2439), Kt = n2.n(Vt), Xt = n2(9143), en = n2.n(Xt), tn = n2(2139), nn = n2(8689), on = n2(7935), rn = n2(9119);
          function an(e3, t2) {
            var n3 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var o2 = Object.getOwnPropertySymbols(e3);
              t2 && (o2 = o2.filter(function(t3) {
                return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
              })), n3.push.apply(n3, o2);
            }
            return n3;
          }
          function sn(e3) {
            for (var t2 = 1; t2 < arguments.length; t2++) {
              var n3 = null != arguments[t2] ? arguments[t2] : {};
              t2 % 2 ? an(Object(n3), true).forEach(function(t3) {
                (0, u2.Z)(e3, t3, n3[t3]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n3)) : an(Object(n3)).forEach(function(t3) {
                Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n3, t3));
              });
            }
            return e3;
          }
          var cn = new (en())();
          cn.register("Network", tn), cn.register("Overlay", nn), cn.register("DOM", sn(sn({}, on), {}, { getNodeId: on.getDOMNodeId, getNode: on.getDOMNode })), cn.register("Storage", rn);
          var ln = cn, un = n2(5564), dn = n2(242), fn = n2.n(dn), hn = n2(2765), pn = n2.n(hn), vn = n2(6954), mn = n2.n(vn), gn = n2(7913), bn = n2.n(gn);
          function yn(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var wn = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = yn(o2);
            function o2() {
              var e4;
              return (0, r2.Z)(this, o2), e4 = t2.call(this), (0, u2.Z)((0, a.Z)(e4), "_reqWillBeSent", function(t3) {
                if (e4._isRecording) {
                  var n3, o3 = { name: Ie(t3.request.url), url: t3.request.url, status: "pending", type: "unknown", subType: "unknown", size: 0, data: t3.request.postData, method: t3.request.method, startTime: 1e3 * t3.timestamp, time: 0, resTxt: "", done: false, reqHeaders: t3.request.headers || {}, resHeaders: {} };
                  o3.render = function() {
                    var r3 = { name: o3.name, method: o3.method, status: o3.status, type: o3.subType, size: o3.size, time: o3.displayTime };
                    n3 ? (n3.data = r3, n3.render()) : (n3 = e4._requestDataGrid.append(r3, { selectable: true }), y()(n3.container).data("id", t3.requestId)), o3.hasErr && y()(n3.container).addClass(Pe("request-error"));
                  }, o3.render(), e4._requests[t3.requestId] = o3;
                }
              }), (0, u2.Z)((0, a.Z)(e4), "_resReceivedExtraInfo", function(t3) {
                var n3 = e4._requests[t3.requestId];
                e4._isRecording && n3 && (n3.resHeaders = t3.headers, e4._updateType(n3), n3.render());
              }), (0, u2.Z)((0, a.Z)(e4), "_resReceived", function(t3) {
                var n3 = e4._requests[t3.requestId];
                if (e4._isRecording && n3) {
                  var o3 = t3.response, r3 = o3.status, i2 = o3.headers;
                  n3.status = r3, (r3 < 200 || r3 >= 300) && (n3.hasErr = true), i2 && (n3.resHeaders = i2, e4._updateType(n3)), n3.render();
                }
              }), (0, u2.Z)((0, a.Z)(e4), "_loadingFinished", function(t3) {
                var n3 = e4._requests[t3.requestId];
                if (e4._isRecording && n3) {
                  var o3 = 1e3 * t3.timestamp;
                  n3.time = o3 - n3.startTime, n3.displayTime = Dt()(n3.time), n3.size = t3.encodedDataLength, n3.done = true, n3.resTxt = ln.domain("Network").getResponseBody({ requestId: t3.requestId }).body, n3.render();
                }
              }), (0, u2.Z)((0, a.Z)(e4), "_copyCurl", function() {
                var t3 = e4._selectedRequest;
                $t()(function(e5) {
                  var t4 = mn()();
                  "windows" === t4 && (t4 = "win");
                  var n3 = [], o3 = bn()(["accept-encoding", "host", "method", "path", "scheme", "version"]), r3 = "win" === t4 ? function(e6) {
                    var t5 = /[\r\n]/.test(e6) ? '^"' : '"';
                    return t5 + e6.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[^a-zA-Z0-9\s_\-:=+~'\/.',?;()*`&]/g, "^$&").replace(/%(?=[a-zA-Z0-9_])/g, "%^").replace(/\r?\n/g, "^\n\n") + t5;
                  } : function(e6) {
                    return /[\0-\x1F\x7F-\x9F!]|\'/.test(e6) ? "$'" + e6.replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\0-\x1F\x7F-\x9F!]/g, function(e7) {
                      for (var t5 = e7.charCodeAt(0).toString(16); t5.length < 4; )
                        t5 = "0" + t5;
                      return "\\u" + t5;
                    }) + "'" : "'" + e6 + "'";
                  };
                  n3.push(r3(e5.url()).replace(/[[{}\]]/g, "\\$&"));
                  var i2 = "GET", a2 = [], s2 = e5.requestFormData();
                  s2 && (a2.push("--data-raw " + r3(s2)), o3["content-length"] = true, i2 = "POST"), e5.requestMethod !== i2 && n3.push("-X " + r3(e5.requestMethod));
                  for (var c2 = e5.requestHeaders(), l2 = 0; l2 < c2.length; l2++) {
                    var u3 = c2[l2], d3 = u3.name.replace(/^:/, "");
                    o3[d3.toLowerCase()] || n3.push("-H " + r3(d3 + ": " + u3.value));
                  }
                  return (n3 = n3.concat(a2)).push("--compressed"), "curl " + n3.join(n3.length >= 3 ? "win" === t4 ? " ^\n  " : " \\\n  " : " ");
                }({ requestMethod: t3.method, url: function() {
                  return t3.url;
                }, requestFormData: function() {
                  return t3.data;
                }, requestHeaders: function() {
                  var e5 = t3.reqHeaders || {};
                  return $2()(e5, { "User-Agent": navigator.userAgent, Referer: location.href }), xe()(e5, function(e6, t4) {
                    return { name: t4, value: e6 };
                  });
                } })), e4._container.notify("Copied");
              }), (0, u2.Z)((0, a.Z)(e4), "_toggleRecording", function() {
                e4._$control.find(Pe(".record")).toggleClass(Pe("recording")), e4._isRecording = !e4._isRecording;
              }), (0, u2.Z)((0, a.Z)(e4), "_showDetail", function() {
                e4._selectedRequest && (e4._splitMode && e4._$network.css("width", "50%"), e4._detail.show(e4._selectedRequest));
              }), (0, u2.Z)((0, a.Z)(e4), "_updateScale", function(t3) {
                e4._splitMediaQuery.setQuery("screen and (min-width: ".concat(680 * t3, "px)"));
              }), e4._style = ie(n2(3180)), e4.name = "network", e4._requests = {}, e4._selectedRequest = null, e4._isRecording = true, e4;
            }
            return (0, i.Z)(o2, [{ key: "init", value: function(e4, t3) {
              (0, v.Z)((0, l.Z)(o2.prototype), "init", this).call(this, e4), this._container = t3, this._initTpl(), this._detail = new Wt(this._$detail, t3), this._splitMediaQuery = new (pn())("screen and (min-width: 680px)"), this._splitMode = this._splitMediaQuery.isMatch(), this._requestDataGrid = new un.Z(this._$requests.get(0), { columns: [{ id: "name", title: "Name", sortable: true, weight: 30 }, { id: "method", title: "Method", sortable: true, weight: 14 }, { id: "status", title: "Status", sortable: true, weight: 14 }, { id: "type", title: "Type", sortable: true, weight: 14 }, { id: "size", title: "Size", sortable: true, weight: 14 }, { id: "time", title: "Time", sortable: true, weight: 14 }] }), this._resizeSensor = new (fn())(e4.get(0)), this._bindEvent();
            } }, { key: "show", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "show", this).call(this), this._updateDataGridHeight();
            } }, { key: "clear", value: function() {
              this._requests = {}, this._requestDataGrid.clear();
            } }, { key: "requests", value: function() {
              var e4 = [];
              return C()(this._requests, function(t3) {
                e4.push(t3);
              }), e4;
            } }, { key: "_updateDataGridHeight", value: function() {
              var e4 = this._$el.offset().height - this._$control.offset().height;
              this._requestDataGrid.setOption({ minHeight: e4, maxHeight: e4 });
            } }, { key: "_updateType", value: function(e4) {
              var t3 = function(e5) {
                if (!e5)
                  return "unknown";
                var t4 = e5.split(";")[0].split("/");
                return { type: t4[0], subType: we()(t4) };
              }(e4.resHeaders["content-type"] || ""), n3 = t3.type, o3 = t3.subType;
              e4.type = n3, e4.subType = o3;
            } }, { key: "_updateButtons", value: function() {
              var e4 = this._$control, t3 = e4.find(Pe(".show-detail")), n3 = e4.find(Pe(".copy-curl")), o3 = Pe("icon-disabled");
              t3.addClass(o3), n3.addClass(o3), this._selectedRequest && (t3.rmClass(o3), n3.rmClass(o3));
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t3 = this._$control, n3 = this._$filterText, o3 = this._requestDataGrid, r3 = this;
              t3.on("click", Pe(".clear-request"), function() {
                return e4.clear();
              }).on("click", Pe(".show-detail"), this._showDetail).on("click", Pe(".copy-curl"), this._copyCurl).on("click", Pe(".record"), this._toggleRecording).on("click", Pe(".filter"), function() {
                pt.Z.prompt("Filter").then(function(e5) {
                  Mt()(e5) || (n3.text(e5), o3.setOption("filter", Ne()(e5)));
                });
              }), o3.on("select", function(t4) {
                var n4 = y()(t4.container).data("id"), o4 = r3._requests[n4];
                e4._selectedRequest = o4, e4._updateButtons(), e4._splitMode && e4._showDetail();
              }), o3.on("deselect", function() {
                e4._selectedRequest = null, e4._updateButtons(), e4._detail.hide();
              }), this._resizeSensor.addListener(Kt()(function() {
                return e4._updateDataGridHeight();
              }, 15)), this._splitMediaQuery.on("match", function() {
                e4._detail.hide(), e4._splitMode = true;
              }), this._splitMediaQuery.on("unmatch", function() {
                e4._detail.hide(), e4._splitMode = false;
              }), this._detail.on("hide", function() {
                e4._splitMode && e4._$network.css("width", "100%");
              }), ln.domain("Network").enable();
              var i2 = ln.domain("Network");
              i2.on("requestWillBeSent", this._reqWillBeSent), i2.on("responseReceivedExtraInfo", this._resReceivedExtraInfo), i2.on("responseReceived", this._resReceived), i2.on("loadingFinished", this._loadingFinished), p.on(p.SCALE, this._updateScale);
            } }, { key: "destroy", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "destroy", this).call(this), this._resizeSensor.destroy(), ie.remove(this._style), this._splitMediaQuery.removeAllListeners();
              var e4 = ln.domain("Network");
              e4.off("requestWillBeSent", this._reqWillBeSent), e4.off("responseReceivedExtraInfo", this._resReceivedExtraInfo), e4.off("responseReceived", this._resReceived), e4.off("loadingFinished", this._loadingFinished), p.off(p.SCALE, this._updateScale);
            } }, { key: "_initTpl", value: function() {
              var e4 = this._$el;
              e4.html(Pe('<div class="network">\n        <div class="control">\n          <span class="icon-record record recording"></span>\n          <span class="icon-clear clear-request"></span>\n          <span class="icon-eye icon-disabled show-detail"></span>\n          <span class="icon-copy icon-disabled copy-curl"></span>\n          <span class="filter-text"></span>\n          <span class="icon-filter filter"></span>\n        </div>\n        <div class="requests"></div>\n      </div>\n      <div class="detail"></div>')), this._$network = e4.find(Pe(".network")), this._$detail = e4.find(Pe(".detail")), this._$requests = e4.find(Pe(".requests")), this._$control = e4.find(Pe(".control")), this._$filterText = e4.find(Pe(".filter-text"));
            } }]), o2;
          }(g), _n = n2(9833), xn = n2.n(_n), An = n2(9956), kn = n2.n(An), Cn = n2(8209), Sn = n2(3063), En = n2.n(Sn), On = n2(3487), Tn = n2.n(On), Nn = n2(42), Mn = n2.n(Nn), jn = n2(4696), zn = n2.n(jn), Rn = n2(7653), Zn = n2.n(Rn), In = n2(8613), Dn = n2.n(In), Bn = n2(2289), Fn = n2.n(Bn), Ln = n2(3629), Pn = n2.n(Ln);
          function Hn(e3) {
            for (var t2 = {}, n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              "initial" !== e3[r3] && (t2[r3] = e3[r3]);
            }
            return function(e4) {
              return Pn()(e4, { comparator: function(e5, t3) {
                for (var n4 = e5.length, o3 = t3.length, r4 = n4 > o3 ? o3 : n4, i2 = 0; i2 < r4; i2++) {
                  var a2 = qn(e5.charCodeAt(i2), t3.charCodeAt(i2));
                  if (0 !== a2)
                    return a2;
                }
                return n4 > o3 ? 1 : n4 < o3 ? -1 : 0;
              } });
            }(t2);
          }
          var $n = Element.prototype, Gn = function() {
            return false;
          };
          $n.webkitMatchesSelector ? Gn = function(e3, t2) {
            return e3.webkitMatchesSelector(t2);
          } : $n.mozMatchesSelector && (Gn = function(e3, t2) {
            return e3.mozMatchesSelector(t2);
          });
          var Yn = function() {
            function e3(t2) {
              (0, r2.Z)(this, e3), this._el = t2;
            }
            return (0, i.Z)(e3, [{ key: "getComputedStyle", value: function() {
              return Hn(window.getComputedStyle(this._el));
            } }, { key: "getMatchedCSSRules", value: function() {
              var e4 = this, t2 = [];
              return C()(document.styleSheets, function(n3) {
                try {
                  if (!n3.cssRules)
                    return;
                } catch (e5) {
                  return;
                }
                C()(n3.cssRules, function(n4) {
                  var o2 = false;
                  try {
                    o2 = e4._elMatchesSel(n4.selectorText);
                  } catch (e5) {
                  }
                  o2 && t2.push({ selectorText: n4.selectorText, style: Hn(n4.style) });
                });
              }), t2;
            } }, { key: "_elMatchesSel", value: function(e4) {
              return Gn(this._el, e4);
            } }]), e3;
          }();
          function qn(e3, t2) {
            return (e3 = Jn(e3)) > (t2 = Jn(t2)) ? 1 : e3 < t2 ? -1 : 0;
          }
          function Jn(e3) {
            return 45 === e3 ? 123 : e3;
          }
          var Qn = n2(422);
          function Wn(e3) {
            var t2 = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).noAttr, n3 = void 0 !== t2 && t2;
            if (e3.nodeType === Node.TEXT_NODE)
              return '<span class="'.concat(Pe("tag-name-color"), '">(text)</span>');
            if (e3.nodeType === Node.COMMENT_NODE)
              return '<span class="'.concat(Pe("tag-name-color"), '"><!--></span>');
            var o2 = e3.id, r3 = e3.className, i2 = e3.attributes, a2 = '<span class="eruda-tag-name-color">'.concat(e3.tagName.toLowerCase(), "</span>");
            if ("" !== o2 && (a2 += '<span class="eruda-function-color">#'.concat(o2, "</span>")), T()(r3)) {
              var s2 = "";
              C()(r3.split(/\s+/g), function(e4) {
                "" !== e4.trim() && (s2 += ".".concat(e4));
              }), a2 += '<span class="eruda-attribute-name-color">'.concat(s2, "</span>");
            }
            return n3 || C()(i2, function(e4) {
              var t3 = e4.name;
              "id" !== t3 && "class" !== t3 && "style" !== t3 && (a2 += ' <span class="eruda-attribute-name-color">'.concat(t3, '</span><span class="eruda-operator-color">="</span><span class="eruda-string-color">').concat(e4.value, '</span><span class="eruda-operator-color">"</span>'));
            }), a2;
          }
          var Un = function() {
            function e3(t2, n3) {
              var o2 = this;
              (0, r2.Z)(this, e3), (0, u2.Z)(this, "hide", function() {
                o2._$container.hide(), o2._disableObserver(), ln.domain("Overlay").hideHighlight();
              }), this._$container = t2, this._devtools = n3, this._curEl = document.documentElement, this._bindEvent(), this._initObserver(), this._initCfg(), this._initTpl();
            }
            return (0, i.Z)(e3, [{ key: "show", value: function(e4) {
              this._curEl = e4, this._rmDefComputedStyle = true, this._computedStyleSearchKeyword = "", this._enableObserver(), this._render();
              var t2 = ln.domain("DOM").getNodeId({ node: e4 }).nodeId;
              ln.domain("Overlay").highlightNode({ nodeId: t2, highlightConfig: { showInfo: true, contentColor: "rgba(111, 168, 220, .66)", paddingColor: "rgba(147, 196, 125, .55)", borderColor: "rgba(255, 229, 153, .66)", marginColor: "rgba(246, 178, 107, .66)" } });
            } }, { key: "destroy", value: function() {
              this._disableObserver(), this.restoreEventTarget(), this._rmCfg();
            } }, { key: "overrideEventTarget", value: function() {
              var e4 = io(), t2 = this._origAddEvent = e4.addEventListener, n3 = this._origRmEvent = e4.removeEventListener;
              e4.addEventListener = function(e5, n4, o2) {
                !function(e6, t3, n5) {
                  var o3 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                  if (!xn()(e6) || !_t()(n5) || !zn()(o3))
                    return;
                  var r3 = e6.erudaEvents = e6.erudaEvents || {};
                  r3[t3] = r3[t3] || [], r3[t3].push({ listener: n5, listenerStr: n5.toString(), useCapture: o3 });
                }(this, e5, n4, o2), t2.apply(this, arguments);
              }, e4.removeEventListener = function(e5, t3, o2) {
                !function(e6, t4, n4) {
                  var o3 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                  if (!xn()(e6) || !_t()(n4) || !zn()(o3))
                    return;
                  var r3 = e6.erudaEvents;
                  if (!r3 || !r3[t4])
                    return;
                  for (var i2 = r3[t4], a2 = 0, s2 = i2.length; a2 < s2; a2++)
                    if (i2[a2].listener === n4) {
                      i2.splice(a2, 1);
                      break;
                    }
                  0 === i2.length && delete r3[t4];
                  0 === D()(r3).length && delete e6.erudaEvents;
                }(this, e5, t3, o2), n3.apply(this, arguments);
              };
            } }, { key: "restoreEventTarget", value: function() {
              var e4 = io();
              this._origAddEvent && (e4.addEventListener = this._origAddEvent), this._origRmEvent && (e4.removeEventListener = this._origRmEvent);
            } }, { key: "_initTpl", value: function() {
              var e4 = this._$container, t2 = '<div class="'.concat(Pe("control"), '">\n      <span class="').concat(Pe("icon-arrow-left back"), '"></span>\n      <span class="').concat(Pe("element-name"), '"></span>\n      <span class="').concat(Pe("icon-refresh refresh"), '"></span>\n    </div>\n    <div class="').concat(Pe("element"), '">\n      <div class="').concat(Pe("attributes section"), '"></div>\n      <div class="').concat(Pe("styles section"), '"></div>\n      <div class="').concat(Pe("computed-style section"), '"></div>\n      <div class="').concat(Pe("listeners section"), '"></div>\n    </div>');
              e4.html(t2), this._$elementName = e4.find(Pe(".element-name")), this._$attributes = e4.find(Pe(".attributes")), this._$styles = e4.find(Pe(".styles")), this._$listeners = e4.find(Pe(".listeners")), this._$computedStyle = e4.find(Pe(".computed-style"));
              var n3 = Dn()("div");
              this._$boxModel = y()(n3), this._boxModel = new Qn.Z(n3);
            } }, { key: "_toggleAllComputedStyle", value: function() {
              this._rmDefComputedStyle = !this._rmDefComputedStyle, this._render();
            } }, { key: "_render", value: function() {
              var e4 = this._getData(this._curEl), t2 = this._$attributes, n3 = this._$elementName, o2 = this._$styles, r3 = this._$computedStyle, i2 = this._$listeners;
              n3.html(e4.name);
              var a2 = "<tr><td>Empty</td></tr>";
              Ft()(e4.attributes) || (a2 = xe()(e4.attributes, function(e5) {
                var t3 = e5.name, n4 = e5.value;
                return '<tr>\n          <td class="'.concat(Pe("attribute-name-color"), '">').concat(Pt()(t3), '</td>\n          <td class="').concat(Pe("string-color"), '">').concat(n4, "</td>\n        </tr>");
              }).join("")), a2 = '<h2>Attributes</h2>\n    <div class="'.concat(Pe("table-wrapper"), '">\n      <table>\n        <tbody>\n          ').concat(a2, " \n        </tbody>\n      </table>\n    </div>"), t2.html(a2);
              var s2 = "";
              if (Ft()(e4.styles))
                o2.hide();
              else {
                var c2 = xe()(e4.styles, function(e5) {
                  var t3 = e5.selectorText, n4 = e5.style;
                  return n4 = xe()(n4, function(e6, t4) {
                    return '<div class="'.concat(Pe("rule"), '"><span>').concat(Pt()(t4), "</span>: ").concat(e6, ";</div>");
                  }).join(""), '<div class="'.concat(Pe("style-rules"), '">\n          <div>').concat(Pt()(t3), " {</div>\n            ").concat(n4, "\n          <div>}</div>\n        </div>");
                }).join("");
                s2 = '<h2>Styles</h2>\n      <div class="'.concat(Pe("style-wrapper"), '">\n        ').concat(c2, "\n      </div>"), o2.html(s2).show();
              }
              var l2 = "";
              if (e4.computedStyle) {
                var u3 = Pe('<div class="btn toggle-all-computed-style">\n        <span class="icon-expand"></span>\n      </div>');
                e4.rmDefComputedStyle && (u3 = Pe('<div class="btn toggle-all-computed-style">\n          <span class="icon-compress"></span>\n        </div>')), l2 = "<h2>\n        Computed Style\n        ".concat(u3, '\n        <div class="').concat(Pe("btn computed-style-search"), '">\n          <span class="').concat(Pe("icon-filter"), '"></span>\n        </div>\n        ').concat(e4.computedStyleSearchKeyword ? '<div class="'.concat(Pe("btn filter-text"), '">').concat(Pt()(e4.computedStyleSearchKeyword), "</div>") : "", '\n      </h2>\n      <div class="').concat(Pe("box-model"), '"></div>\n      <div class="').concat(Pe("table-wrapper"), '">\n        <table>\n          <tbody>\n          ').concat(xe()(e4.computedStyle, function(e5, t3) {
                  return '<tr>\n              <td class="'.concat(Pe("key"), '">').concat(Pt()(t3), "</td>\n              <td>").concat(e5, "</td>\n            </tr>");
                }).join(""), "\n          </tbody>\n        </table>\n      </div>"), r3.html(l2).show(), this._boxModel.setOption("element", this._curEl), r3.find(Pe(".box-model")).append(this._$boxModel.get(0));
              } else
                r3.text("").hide();
              var d3 = "";
              e4.listeners ? (d3 = xe()(e4.listeners, function(e5, t3) {
                return e5 = xe()(e5, function(e6) {
                  var t4 = e6.useCapture, n4 = e6.listenerStr;
                  return "<li ".concat(t4 ? 'class="'.concat(Pe("capture"), '"') : "", ">").concat(Pt()(n4), "</li>");
                }).join(""), '<div class="'.concat(Pe("listener"), '">\n          <div class="').concat(Pe("listener-type"), '">').concat(Pt()(t3), '</div>\n          <ul class="').concat(Pe("listener-content"), '">\n            ').concat(e5, "\n          </ul>\n        </div>");
              }).join(""), d3 = '<h2>Event Listeners</h2>\n      <div class="'.concat(Pe("listener-wrapper"), '">\n        ').concat(d3, " \n      </div>"), i2.html(d3).show()) : i2.hide(), this._$container.show();
            } }, { key: "_getData", value: function(e4) {
              var t2 = {}, n3 = new Yn(e4), o2 = e4.className, r3 = e4.id, i2 = e4.attributes, a2 = e4.tagName;
              t2.computedStyleSearchKeyword = this._computedStyleSearchKeyword, t2.attributes = Kn(i2), t2.name = Wn({ tagName: a2, id: r3, className: o2, attributes: i2 });
              var s2 = e4.erudaEvents;
              if (s2 && 0 !== D()(s2).length && (t2.listeners = s2), oo(a2))
                return t2;
              var c2 = n3.getComputedStyle(), l2 = n3.getMatchedCSSRules();
              l2.unshift(function(e5) {
                for (var t3 = { selectorText: "element.style", style: {} }, n4 = 0, o3 = e5.length; n4 < o3; n4++) {
                  var r4 = e5[n4];
                  t3.style[r4] = e5[r4];
                }
                return t3;
              }(e4.style)), l2.forEach(function(e5) {
                return Vn(e5.style);
              }), t2.styles = l2, this._rmDefComputedStyle && (c2 = function(e5, t3) {
                var n4 = {}, o3 = ["display", "width", "height"];
                return C()(t3, function(e6) {
                  o3 = o3.concat(D()(e6.style));
                }), o3 = Mn()(o3), C()(e5, function(e6, t4) {
                  M()(o3, t4) && (n4[t4] = e6);
                }), n4;
              }(c2, l2)), t2.rmDefComputedStyle = this._rmDefComputedStyle;
              var u3 = En()(t2.computedStyleSearchKeyword);
              return u3 && (c2 = Tn()(c2, function(e5, t3) {
                return M()(t3, u3) || M()(e5, u3);
              })), Vn(c2), t2.computedStyle = c2, t2;
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t2 = this._devtools;
              this._$container.on("click", Pe(".toggle-all-computed-style"), function() {
                return e4._toggleAllComputedStyle();
              }).on("click", Pe(".computed-style-search"), function() {
                pt.Z.prompt("Filter").then(function(t3) {
                  Mt()(t3) || (t3 = Ne()(t3), e4._computedStyleSearchKeyword = t3, e4._render());
                });
              }).on("click", ".eruda-listener-content", function() {
                var e5 = y()(this).text(), n3 = t2.get("sources");
                n3 && (n3.set("js", e5), t2.showTool("sources"));
              }).on("click", Pe(".element-name"), function() {
                var n3 = t2.get("sources");
                n3 && (n3.set("object", e4._curEl), t2.showTool("sources"));
              }).on("click", Pe(".back"), this.hide).on("click", Pe(".refresh"), function() {
                e4._render(), t2.notify("Refreshed");
              });
            } }, { key: "_initObserver", value: function() {
              var e4 = this;
              this._observer = new (Fn())(function(t2) {
                C()(t2, function(t3) {
                  return e4._handleMutation(t3);
                });
              });
            } }, { key: "_enableObserver", value: function() {
              this._observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
            } }, { key: "_disableObserver", value: function() {
              this._observer.disconnect();
            } }, { key: "_handleMutation", value: function(e4) {
              if (!Be(e4.target) && "attributes" === e4.type) {
                if (e4.target !== this._curEl)
                  return;
                this._render();
              }
            } }, { key: "_rmCfg", value: function() {
              var e4 = this.config, t2 = this._devtools.get("settings");
              t2 && t2.remove(e4, "overrideEventTarget").remove(e4, "observeElement").remove("Elements");
            } }, { key: "_initCfg", value: function() {
              var e4 = this, t2 = this.config = ce.createCfg("elements", { overrideEventTarget: true });
              t2.get("overrideEventTarget") && this.overrideEventTarget(), t2.on("change", function(t3, n4) {
                if ("overrideEventTarget" === t3)
                  return n4 ? e4.overrideEventTarget() : e4.restoreEventTarget();
              });
              var n3 = this._devtools.get("settings");
              n3 && (n3.text("Elements").switch(t2, "overrideEventTarget", "Catch Event Listeners"), n3.separator());
            } }]), e3;
          }();
          function Vn(e3) {
            C()(e3, function(t2, n3) {
              return e3[n3] = to(t2);
            });
          }
          var Kn = function(e3) {
            return xe()(e3, function(e4) {
              var t2 = e4.value, n3 = e4.name;
              return t2 = Pt()(t2), ("src" === n3 || "href" === n3) && !lt()(t2, "data") && (t2 = ro(t2)), "style" === n3 && (t2 = to(t2)), { name: n3, value: t2 };
            });
          }, Xn = /rgba?\((.*?)\)/g, eo = /url\("?(.*?)"?\)/g;
          function to(e3) {
            return (e3 = Z()(e3)).replace(Xn, '<span class="eruda-style-color" style="background-color: $&"></span>$&').replace(eo, function(e4, t2) {
              return 'url("'.concat(ro(t2), '")');
            });
          }
          var no = ["script", "style", "meta", "title", "link", "head"], oo = function(e3) {
            return no.indexOf(e3.toLowerCase()) > -1;
          }, ro = function(e3) {
            return '<a href="'.concat(e3, '" target="_blank">').concat(e3, "</a>");
          };
          var io = function() {
            return Zn()(window, "EventTarget.prototype") || window.Node.prototype;
          };
          function ao(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var so = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = ao(o2);
            function o2() {
              var e4;
              return (0, r2.Z)(this, o2), e4 = t2.call(this), (0, u2.Z)((0, a.Z)(e4), "_showDetail", function() {
                e4._isShow && e4._curNode && (e4._curNode.nodeType === Node.ELEMENT_NODE ? e4._detail.show(e4._curNode) : e4._detail.show(e4._curNode.parentNode));
              }), (0, u2.Z)((0, a.Z)(e4), "_back", function() {
                if (e4._curNode !== e4._htmlEl) {
                  for (var t3 = e4._curParentQueue, n3 = t3.shift(); !co(n3); )
                    n3 = t3.shift();
                  e4.set(n3);
                }
              }), (0, u2.Z)((0, a.Z)(e4), "_updateScale", function(t3) {
                e4._splitMediaQuery.setQuery("screen and (min-width: ".concat(680 * t3, "px)"));
              }), (0, u2.Z)((0, a.Z)(e4), "_deleteNode", function() {
                var t3 = e4._curNode;
                t3.parentNode && t3.parentNode.removeChild(t3);
              }), (0, u2.Z)((0, a.Z)(e4), "_copyNode", function() {
                var t3 = e4._curNode;
                t3.nodeType === Node.ELEMENT_NODE ? $t()(t3.outerHTML) : $t()(t3.nodeValue), e4._container.notify("Copied");
              }), (0, u2.Z)((0, a.Z)(e4), "_toggleSelect", function() {
                e4._$el.find(Pe(".select")).toggleClass(Pe("active")), e4._selectElement = !e4._selectElement, e4._selectElement ? (ln.domain("Overlay").setInspectMode({ mode: "searchForNode", highlightConfig: { showInfo: !kn()(), showRulers: false, showAccessibilityInfo: !kn()(), showExtensionLines: false, contrastAlgorithm: "aa", contentColor: "rgba(111, 168, 220, .66)", paddingColor: "rgba(147, 196, 125, .55)", borderColor: "rgba(255, 229, 153, .66)", marginColor: "rgba(246, 178, 107, .66)" } }), e4._container.hide()) : (ln.domain("Overlay").setInspectMode({ mode: "none" }), ln.domain("Overlay").hideHighlight());
              }), (0, u2.Z)((0, a.Z)(e4), "_inspectNodeRequested", function(t3) {
                var n3 = t3.backendNodeId;
                e4._container.show(), e4._toggleSelect();
                var o3 = ln.domain("DOM").getNode({ nodeId: n3 }).node;
                e4.select(o3);
              }), (0, u2.Z)((0, a.Z)(e4), "_setNode", function(t3) {
                if (t3 !== e4._curNode) {
                  e4._curNode = t3, e4._renderCrumbs();
                  for (var n3 = [], o3 = t3.parentNode; o3; )
                    n3.push(o3), o3 = o3.parentNode;
                  e4._curParentQueue = n3, e4._splitMode && e4._showDetail(), e4._updateButtons(), e4._updateHistory();
                }
              }), e4._style = ie(n2(5896)), e4.name = "elements", e4._selectElement = false, e4._observeElement = true, e4._history = [], f2().mixin((0, a.Z)(e4)), e4;
            }
            return (0, i.Z)(o2, [{ key: "init", value: function(e4, t3) {
              var n3 = this;
              (0, v.Z)((0, l.Z)(o2.prototype), "init", this).call(this, e4), this._container = t3, this._initTpl(), this._htmlEl = document.documentElement, this._detail = new Un(this._$detail, t3), this.config = this._detail.config, this._splitMediaQuery = new (pn())("screen and (min-width: 680px)"), this._splitMode = this._splitMediaQuery.isMatch(), this._domViewer = new Cn.Z(this._$domViewer.get(0), { node: this._htmlEl, ignore: function(e5) {
                return Be(e5) || Fe(e5);
              } }), this._domViewer.expand(), this._bindEvent(), ln.domain("Overlay").enable(), ue()(function() {
                return n3._updateHistory();
              });
            } }, { key: "show", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "show", this).call(this), this._isShow = true, this._curNode ? this._splitMode && this._showDetail() : this.select(document.body);
            } }, { key: "hide", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "hide", this).call(this), this._isShow = false, ln.domain("Overlay").hideHighlight();
            } }, { key: "set", value: function(e4) {
              return this.select(e4);
            } }, { key: "select", value: function(e4) {
              return this._domViewer.select(e4), this._setNode(e4), this.emit("change", e4), this;
            } }, { key: "destroy", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "destroy", this).call(this), p.off(p.SCALE, this._updateScale), ie.remove(this._style), this._detail.destroy(), ln.domain("Overlay").off("inspectNodeRequested", this._inspectNodeRequested), ln.domain("Overlay").disable(), this._splitMediaQuery.removeAllListeners();
            } }, { key: "_updateButtons", value: function() {
              var e4 = this._$control, t3 = e4.find(Pe(".show-detail")), n3 = e4.find(Pe(".copy-node")), o3 = e4.find(Pe(".delete-node")), r3 = Pe("icon-disabled");
              t3.addClass(r3), n3.addClass(r3), o3.addClass(r3);
              var i2 = this._curNode;
              i2 && (i2 !== document.documentElement && i2 !== document.body && o3.rmClass(r3), n3.rmClass(r3), i2.nodeType === Node.ELEMENT_NODE && t3.rmClass(r3));
            } }, { key: "_initTpl", value: function() {
              var e4 = this._$el;
              e4.html(Pe('<div class="elements">\n        <div class="control">\n          <span class="icon icon-select select"></span>\n          <span class="icon icon-eye show-detail"></span>\n          <span class="icon icon-copy copy-node"></span>\n          <span class="icon icon-delete delete-node"></span>\n        </div>\n        <div class="dom-viewer-container">\n          <div class="dom-viewer"></div>\n        </div>\n        <div class="crumbs"></div>\n      </div>\n      <div class="detail"></div>')), this._$detail = e4.find(Pe(".detail")), this._$domViewer = e4.find(Pe(".dom-viewer")), this._$control = e4.find(Pe(".control")), this._$crumbs = e4.find(Pe(".crumbs"));
            } }, { key: "_renderCrumbs", value: function() {
              var e4 = function(e5) {
                var t4 = [], n3 = 0;
                for (; e5; )
                  t4.push({ text: Wn(e5, { noAttr: true }), idx: n3++ }), e5 = e5.parentElement;
                return t4.reverse();
              }(this._curNode), t3 = "";
              Ft()(e4) || (t3 = xe()(e4, function(e5) {
                var t4 = e5.text, n3 = e5.idx;
                return '<li class="'.concat(Pe("crumb"), '" data-idx="').concat(n3, '">').concat(t4, "</div></li>");
              }).join("")), this._$crumbs.html(t3);
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t3 = this;
              this._$el.on("click", Pe(".crumb"), function() {
                for (var e5 = Oe()(y()(this).data("idx")), n3 = t3._curNode; e5-- && n3.parentElement; )
                  n3 = n3.parentElement;
                co(n3) && t3.select(n3);
              }), this._$control.on("click", Pe(".select"), this._toggleSelect).on("click", Pe(".show-detail"), this._showDetail).on("click", Pe(".copy-node"), this._copyNode).on("click", Pe(".delete-node"), this._deleteNode), this._domViewer.on("select", this._setNode).on("deselect", this._back), ln.domain("Overlay").on("inspectNodeRequested", this._inspectNodeRequested), this._splitMediaQuery.on("match", function() {
                e4._splitMode = true, e4._showDetail();
              }), this._splitMediaQuery.on("unmatch", function() {
                e4._splitMode = false, e4._detail.hide();
              }), p.on(p.SCALE, this._updateScale);
            } }, { key: "_updateHistory", value: function() {
              var e4 = this._container.get("console");
              if (e4) {
                var t3 = this._history;
                t3.unshift(this._curNode), t3.length > 5 && t3.pop();
                for (var n3 = 0; n3 < 5; n3++)
                  e4.setGlobal("$".concat(n3), t3[n3]);
              }
            } }]), o2;
          }(g), co = function(e3) {
            return xn()(e3) && e3.parentNode;
          };
          var lo = n2(8847), uo = n2.n(lo), fo = n2(9622), ho = n2.n(fo), po = null, vo = [{ name: "Border All", fn: function() {
            if (po)
              return ie.remove(po), void (po = null);
            po = ie("* { outline: 2px dashed #707d8b; outline-offset: -3px; }", document.head);
          }, desc: "Add color borders to all elements" }, { name: "Refresh Page", fn: function() {
            var e3 = new (pe())();
            e3.setQuery("timestamp", uo()()), window.location.replace(e3.toString());
          }, desc: "Add timestamp to url and refresh" }, { name: "Search Text", fn: function() {
            pt.Z.prompt("Enter the text").then(function(e3) {
              e3 && "" !== Ne()(e3) && function(e4) {
                var t2 = document.body, n3 = new RegExp(e4, "ig");
                mo(t2, function(e5) {
                  var t3 = y()(e5);
                  if (t3.hasClass("eruda-search-highlight-block"))
                    return document.createTextNode(t3.text());
                }), mo(t2, function(e5) {
                  if (3 === e5.nodeType) {
                    var t3 = e5.nodeValue;
                    if ((t3 = t3.replace(n3, function(e6) {
                      return '<span class="eruda-keyword">'.concat(e6, "</span>");
                    })) !== e5.nodeValue) {
                      var o2 = y()(document.createElement("div"));
                      return o2.html(t3), o2.addClass("eruda-search-highlight-block"), o2.get(0);
                    }
                  }
                });
              }(e3);
            });
          }, desc: "Highlight given text on page" }, { name: "Edit Page", fn: function() {
            var e3 = document.body;
            e3.contentEditable = "true" !== e3.contentEditable;
          }, desc: "Toggle body contentEditable" }, { name: "Fit Screen", fn: function() {
            var e3 = document.body, t2 = document.documentElement, n3 = y()(e3);
            if (n3.data("scaled"))
              window.scrollTo(0, +n3.data("scaled")), n3.rmAttr("data-scaled"), n3.css("transform", "none");
            else {
              var o2 = Math.max(e3.scrollHeight, e3.offsetHeight, t2.clientHeight, t2.scrollHeight, t2.offsetHeight), r3 = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), i2 = r3 / o2;
              n3.css("transform", "scale(".concat(i2, ")")), n3.data("scaled", window.scrollY), window.scrollTo(0, o2 / 2 - r3 / 2);
            }
          }, desc: "Scale down the whole page to fit screen" }, { name: "Load Monitor Plugin", fn: function() {
            go("monitor");
          }, desc: "Display page fps and memory" }, { name: "Load Features Plugin", fn: function() {
            go("features");
          }, desc: "Browser feature detections" }, { name: "Load Timing Plugin", fn: function() {
            go("timing");
          }, desc: "Show performance and resource timing" }, { name: "Load Code Plugin", fn: function() {
            go("code");
          }, desc: "Edit and run JavaScript" }, { name: "Load Benchmark Plugin", fn: function() {
            go("benchmark");
          }, desc: "Run JavaScript benchmarks" }, { name: "Load Geolocation Plugin", fn: function() {
            go("geolocation");
          }, desc: "Test geolocation" }, { name: "Load Orientation Plugin", fn: function() {
            go("orientation");
          }, desc: "Test orientation api" }, { name: "Load Touches Plugin", fn: function() {
            go("touches");
          }, desc: "Visualize screen touches" }];
          function mo(e3, t2) {
            var n3 = e3.childNodes;
            if (!Be(e3)) {
              for (var o2 = 0, r3 = n3.length; o2 < r3; o2++) {
                var i2 = mo(n3[o2], t2);
                i2 && e3.replaceChild(i2, n3[o2]);
              }
              return t2(e3);
            }
          }
          function go(e3) {
            var t2 = "eruda" + Et()(e3);
            if (!window[t2]) {
              var n3 = location.protocol;
              lt()(n3, "http") || (n3 = "http:"), ho()("".concat(n3, "//cdn.jsdelivr.net/npm/eruda-").concat(e3, "@").concat(bo[e3]), function(n4) {
                if (!n4 || !window[t2])
                  return ot.error("Fail to load plugin " + e3);
                p.emit(p.ADD, window[t2]), p.emit(p.SHOW, e3);
              });
            }
          }
          ie(n2(7346), document.head);
          var bo = { monitor: "1.0.0", features: "2.0.0", timing: "2.0.1", code: "2.1.0", benchmark: "2.0.1", geolocation: "2.0.0", dom: "2.0.0", orientation: "2.0.0", touches: "2.0.0" }, yo = n2(5852), wo = n2.n(yo);
          function _o(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var xo = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = _o(o2);
            function o2() {
              var e4;
              return (0, r2.Z)(this, o2), (e4 = t2.call(this))._style = ie(n2(5571)), e4.name = "snippets", e4._snippets = [], e4;
            }
            return (0, i.Z)(o2, [{ key: "init", value: function(e4) {
              (0, v.Z)((0, l.Z)(o2.prototype), "init", this).call(this, e4), this._bindEvent(), this._addDefSnippets();
            } }, { key: "destroy", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "destroy", this).call(this), ie.remove(this._style);
            } }, { key: "add", value: function(e4, t3, n3) {
              return this._snippets.push({ name: e4, fn: t3, desc: n3 }), this._render(), this;
            } }, { key: "remove", value: function(e4) {
              return wo()(this._snippets, function(t3) {
                return t3.name === e4;
              }), this._render(), this;
            } }, { key: "run", value: function(e4) {
              for (var t3 = this._snippets, n3 = 0, o3 = t3.length; n3 < o3; n3++)
                t3[n3].name === e4 && this._run(n3);
              return this;
            } }, { key: "clear", value: function() {
              return this._snippets = [], this._render(), this;
            } }, { key: "_bindEvent", value: function() {
              var e4 = this;
              this._$el.on("click", ".eruda-run", function() {
                var t3 = y()(this).data("idx");
                e4._run(t3);
              });
            } }, { key: "_run", value: function(e4) {
              this._snippets[e4].fn.call(null);
            } }, { key: "_addDefSnippets", value: function() {
              var e4 = this;
              C()(vo, function(t3) {
                e4.add(t3.name, t3.fn, t3.desc);
              });
            } }, { key: "_render", value: function() {
              var e4 = xe()(this._snippets, function(e5, t3) {
                return '<div class="'.concat(Pe("section run"), '" data-idx="').concat(t3, '">\n        <h2 class="').concat(Pe("name"), '">').concat(Pt()(e5.name), '\n          <div class="').concat(Pe("btn"), '">\n            <span class="').concat(Pe("icon-play"), '"></span>\n          </div>\n        </h2>\n        <div class="').concat(Pe("description"), '">\n          ').concat(Pt()(e5.desc), "\n        </div>\n      </div>");
              }).join("");
              this._renderHtml(e4);
            } }, { key: "_renderHtml", value: function(e4) {
              e4 !== this._lastHtml && (this._lastHtml = e4, this._$el.html(e4));
            } }]), o2;
          }(g), Ao = n2(4224), ko = n2.n(Ao), Co = n2(8991), So = n2.n(Co), Eo = n2(1352), Oo = n2.n(Eo), To = n2(8099), No = n2.n(To), Mo = function() {
            function e3(t2, n3, o2, i2) {
              var a2 = this;
              (0, r2.Z)(this, e3), (0, u2.Z)(this, "_updateGridHeight", function(e4) {
                a2._dataGrid.setOption({ minHeight: 60 * e4, maxHeight: 223 * e4 });
              }), this._type = i2, this._$container = t2, this._devtools = n3, this._resources = o2, this._selectedItem = null, this._storeData = [], this._initTpl(), this._dataGrid = new un.Z(this._$dataGrid.get(0), { columns: [{ id: "key", title: "Key", weight: 30 }, { id: "value", title: "Value", weight: 90 }], minHeight: 60, maxHeight: 223 }), this._bindEvent();
            }
            return (0, i.Z)(e3, [{ key: "destroy", value: function() {
              p.off(p.SCALE, this._updateGridHeight);
            } }, { key: "refresh", value: function() {
              var e4 = this._dataGrid;
              this._refreshStorage(), e4.clear(), C()(this._storeData, function(t2) {
                var n3 = t2.key, o2 = t2.val;
                e4.append({ key: n3, value: o2 }, { selectable: true });
              });
            } }, { key: "_refreshStorage", value: function() {
              var e4 = this._resources, t2 = Ze(this._type, false);
              if (t2) {
                var n3 = [];
                t2 = JSON.parse(JSON.stringify(t2)), C()(t2, function(t3, o2) {
                  T()(t3) && (e4.config.get("hideErudaSetting") && (lt()(o2, "eruda") || "active-eruda" === o2) || n3.push({ key: o2, val: Jt()(t3, 200) }));
                }), this._storeData = n3;
              }
            } }, { key: "_updateButtons", value: function() {
              var e4 = this._$container, t2 = e4.find(Pe(".show-detail")), n3 = e4.find(Pe(".delete-storage")), o2 = e4.find(Pe(".copy-storage")), r3 = Pe("btn-disabled");
              t2.addClass(r3), n3.addClass(r3), o2.addClass(r3), this._selectedItem && (t2.rmClass(r3), n3.rmClass(r3), o2.rmClass(r3));
            } }, { key: "_initTpl", value: function() {
              var e4 = this._$container, t2 = this._type;
              e4.html(Pe('<h2 class="title">\n      '.concat("local" === t2 ? "Local" : "Session", ' Storage\n      <div class="btn refresh-storage">\n        <span class="icon icon-refresh"></span>\n      </div>\n      <div class="btn show-detail btn-disabled">\n        <span class="icon icon-eye"></span>\n      </div>\n      <div class="btn copy-storage btn-disabled">\n        <span class="icon icon-copy"></span>\n      </div>\n      <div class="btn delete-storage btn-disabled">\n        <span class="icon icon-delete"></span>\n      </div>\n      <div class="btn clear-storage">\n        <span class="icon icon-clear"></span>\n      </div>\n      <div class="btn filter">\n        <span class="icon icon-filter"></span>\n      </div>\n      <div class="btn filter-text"></div>\n    </h2>\n    <div class="data-grid"></div>'))), this._$dataGrid = e4.find(Pe(".data-grid")), this._$filterText = e4.find(Pe(".filter-text"));
            } }, { key: "_getVal", value: function(e4) {
              return "local" === this._type ? localStorage.getItem(e4) : sessionStorage.getItem(e4);
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t2 = this._type, n3 = this._devtools;
              function o2(e5, t3) {
                var o3 = n3.get("sources");
                if (o3)
                  return o3.set(e5, t3), n3.showTool("sources"), true;
              }
              this._$container.on("click", Pe(".refresh-storage"), function() {
                n3.notify("Refreshed"), e4.refresh();
              }).on("click", Pe(".clear-storage"), function() {
                C()(e4._storeData, function(e5) {
                  "local" === t2 ? localStorage.removeItem(e5.key) : sessionStorage.removeItem(e5.key);
                }), e4.refresh();
              }).on("click", Pe(".show-detail"), function() {
                var t3 = e4._selectedItem, n4 = e4._getVal(t3);
                try {
                  o2("object", JSON.parse(n4));
                } catch (e5) {
                  o2("raw", n4);
                }
              }).on("click", Pe(".copy-storage"), function() {
                var t3 = e4._selectedItem;
                $t()(e4._getVal(t3)), n3.notify("Copied");
              }).on("click", Pe(".filter"), function() {
                pt.Z.prompt("Filter").then(function(t3) {
                  Mt()(t3) || (t3 = Ne()(t3), e4._$filterText.text(t3), e4._dataGrid.setOption("filter", t3));
                });
              }).on("click", Pe(".delete-storage"), function() {
                var n4 = e4._selectedItem;
                "local" === t2 ? localStorage.removeItem(n4) : sessionStorage.removeItem(n4), e4.refresh();
              }), this._dataGrid.on("select", function(t3) {
                e4._selectedItem = t3.data.key, e4._updateButtons();
              }).on("deselect", function() {
                e4._selectedItem = null, e4._updateButtons();
              }), p.on(p.SCALE, this._updateGridHeight);
            } }]), e3;
          }();
          function jo(e3, t2) {
            e3.rmClass(Pe("ok")).rmClass(Pe("danger")).rmClass(Pe("warn")).addClass(Pe(t2));
          }
          function zo(e3, t2) {
            if (0 === t2)
              return "";
            var n3 = 0, o2 = 0;
            switch (e3) {
              case "cookie":
                n3 = 30, o2 = 60;
                break;
              case "script":
                n3 = 5, o2 = 10;
                break;
              case "stylesheet":
                n3 = 4, o2 = 8;
                break;
              case "image":
                n3 = 50, o2 = 100;
            }
            return t2 >= o2 ? "danger" : t2 >= n3 ? "warn" : "ok";
          }
          var Ro = function() {
            function e3(t2, n3) {
              (0, r2.Z)(this, e3), this._$container = t2, this._devtools = n3, this._selectedItem = null, this._initTpl(), this._dataGrid = new un.Z(this._$dataGrid.get(0), { columns: [{ id: "key", title: "Key", weight: 30 }, { id: "value", title: "Value", weight: 90 }], minHeight: 60, maxHeight: 223 }), this._bindEvent();
            }
            return (0, i.Z)(e3, [{ key: "refresh", value: function() {
              var e4 = this._$container, t2 = this._dataGrid, n3 = ln.domain("Network").getCookies().cookies, o2 = xe()(n3, function(e5) {
                return { key: e5.name, val: e5.value };
              });
              t2.clear(), C()(o2, function(e5) {
                var n4 = e5.key, o3 = e5.val;
                t2.append({ key: n4, value: o3 }, { selectable: true });
              }), jo(e4, zo("cookie", o2.length));
            } }, { key: "_initTpl", value: function() {
              var e4 = this._$container;
              e4.html(Pe('<h2 class="title">\n      Cookie\n      <div class="btn refresh-cookie">\n        <span class="icon-refresh"></span>\n      </div>\n      <div class="btn show-detail btn-disabled">\n        <span class="icon icon-eye"></span>\n      </div>\n      <div class="btn copy-cookie btn-disabled">\n        <span class="icon icon-copy"></span>\n      </div>\n      <div class="btn delete-cookie btn-disabled">\n        <span class="icon icon-delete"></span>\n      </div>\n      <div class="btn clear-cookie">\n        <span class="icon-clear"></span>\n      </div>\n      <div class="btn filter" data-type="cookie">\n        <span class="icon-filter"></span>\n      </div>\n      <div class="btn filter-text"></div>\n    </h2>\n    <div class="data-grid"></div>')), this._$dataGrid = e4.find(Pe(".data-grid")), this._$filterText = e4.find(Pe(".filter-text"));
            } }, { key: "_updateButtons", value: function() {
              var e4 = this._$container, t2 = e4.find(Pe(".show-detail")), n3 = e4.find(Pe(".delete-cookie")), o2 = e4.find(Pe(".copy-cookie")), r3 = Pe("btn-disabled");
              t2.addClass(r3), n3.addClass(r3), o2.addClass(r3), this._selectedItem && (t2.rmClass(r3), n3.rmClass(r3), o2.rmClass(r3));
            } }, { key: "_getVal", value: function(e4) {
              for (var t2 = ln.domain("Network").getCookies().cookies, n3 = 0, o2 = t2.length; n3 < o2; n3++)
                if (t2[n3].name === e4)
                  return t2[n3].value;
              return "";
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t2 = this._devtools;
              function n3(e5, n4) {
                var o2 = t2.get("sources");
                if (o2)
                  return o2.set(e5, n4), t2.showTool("sources"), true;
              }
              this._$container.on("click", Pe(".refresh-cookie"), function() {
                t2.notify("Refreshed"), e4.refresh();
              }).on("click", Pe(".clear-cookie"), function() {
                ln.domain("Storage").clearDataForOrigin({ storageTypes: "cookies" }), e4.refresh();
              }).on("click", Pe(".delete-cookie"), function() {
                var t3 = e4._selectedItem;
                ln.domain("Network").deleteCookies({ name: t3 }), e4.refresh();
              }).on("click", Pe(".show-detail"), function() {
                var t3 = e4._selectedItem, o2 = e4._getVal(t3);
                try {
                  n3("object", JSON.parse(o2));
                } catch (e5) {
                  n3("raw", o2);
                }
              }).on("click", Pe(".copy-cookie"), function() {
                var n4 = e4._selectedItem;
                $t()(e4._getVal(n4)), t2.notify("Copied");
              }).on("click", Pe(".filter"), function() {
                pt.Z.prompt("Filter").then(function(t3) {
                  Mt()(t3) || (t3 = Ne()(t3), e4._filter = t3, e4._$filterText.text(t3), e4._dataGrid.setOption("filter", t3));
                });
              }), this._dataGrid.on("select", function(t3) {
                e4._selectedItem = t3.data.key, e4._updateButtons();
              }).on("deselect", function() {
                e4._selectedItem = null, e4._updateButtons();
              });
            } }]), e3;
          }();
          function Zo(e3, t2) {
            var n3 = "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
            if (!n3) {
              if (Array.isArray(e3) || (n3 = function(e4, t3) {
                if (!e4)
                  return;
                if ("string" == typeof e4)
                  return Io(e4, t3);
                var n4 = Object.prototype.toString.call(e4).slice(8, -1);
                "Object" === n4 && e4.constructor && (n4 = e4.constructor.name);
                if ("Map" === n4 || "Set" === n4)
                  return Array.from(e4);
                if ("Arguments" === n4 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n4))
                  return Io(e4, t3);
              }(e3)) || t2 && e3 && "number" == typeof e3.length) {
                n3 && (e3 = n3);
                var o2 = 0, r3 = function() {
                };
                return { s: r3, n: function() {
                  return o2 >= e3.length ? { done: true } : { done: false, value: e3[o2++] };
                }, e: function(e4) {
                  throw e4;
                }, f: r3 };
              }
              throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var i2, a2 = true, s2 = false;
            return { s: function() {
              n3 = n3.call(e3);
            }, n: function() {
              var e4 = n3.next();
              return a2 = e4.done, e4;
            }, e: function(e4) {
              s2 = true, i2 = e4;
            }, f: function() {
              try {
                a2 || null == n3.return || n3.return();
              } finally {
                if (s2)
                  throw i2;
              }
            } };
          }
          function Io(e3, t2) {
            (null == t2 || t2 > e3.length) && (t2 = e3.length);
            for (var n3 = 0, o2 = new Array(t2); n3 < t2; n3++)
              o2[n3] = e3[n3];
            return o2;
          }
          function Do(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var Bo = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = Do(o2);
            function o2() {
              var e4;
              return (0, r2.Z)(this, o2), (e4 = t2.call(this))._style = ie(n2(2488)), e4.name = "resources", e4._hideErudaSetting = false, e4._observeElement = true, e4;
            }
            return (0, i.Z)(o2, [{ key: "init", value: function(e4, t3) {
              (0, v.Z)((0, l.Z)(o2.prototype), "init", this).call(this, e4), this._container = t3, this._initTpl(), this._localStorage = new Mo(this._$localStorage, t3, this, "local"), this._sessionStorage = new Mo(this._$sessionStorage, t3, this, "session"), this._cookie = new Ro(this._$cookie, t3), this._bindEvent(), this._initObserver(), this._initCfg();
            } }, { key: "refresh", value: function() {
              return this.refreshLocalStorage().refreshSessionStorage().refreshCookie().refreshScript().refreshStylesheet().refreshIframe().refreshImage();
            } }, { key: "destroy", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "destroy", this).call(this), this._localStorage.destroy(), this._sessionStorage.destroy(), this._disableObserver(), ie.remove(this._style), this._rmCfg();
            } }, { key: "refreshScript", value: function() {
              var e4 = [];
              y()("script").each(function() {
                var t4 = this.src;
                "" !== t4 && e4.push(t4);
              });
              var t3 = zo("script", (e4 = Mn()(e4)).length), n3 = "<li>Empty</li>";
              Ft()(e4) || (n3 = xe()(e4, function(e5) {
                return e5 = Pt()(e5), '<li><a href="'.concat(e5, '" target="_blank" class="').concat(Pe("js-link"), '">').concat(e5, "</a></li>");
              }).join(""));
              var o3 = '<h2 class="'.concat(Pe("title"), '">\n      Script\n      <div class="').concat(Pe("btn refresh-script"), '">\n        <span class="').concat(Pe("icon-refresh"), '"></span>\n      </div>\n    </h2>\n    <ul class="').concat(Pe("link-list"), '">\n      ').concat(n3, "\n    </ul>"), r3 = this._$script;
              return jo(r3, t3), r3.html(o3), this;
            } }, { key: "refreshStylesheet", value: function() {
              var e4 = [];
              y()("link").each(function() {
                "stylesheet" === this.rel && e4.push(this.href);
              });
              var t3 = zo("stylesheet", (e4 = Mn()(e4)).length), n3 = "<li>Empty</li>";
              Ft()(e4) || (n3 = xe()(e4, function(e5) {
                return e5 = Pt()(e5), ' <li><a href="'.concat(e5, '" target="_blank" class="').concat(Pe("css-link"), '">').concat(e5, "</a></li>");
              }).join(""));
              var o3 = '<h2 class="'.concat(Pe("title"), '">\n      Stylesheet\n      <div class="').concat(Pe("btn refresh-stylesheet"), '">\n        <span class="').concat(Pe("icon-refresh"), '"></span>\n      </div>\n    </h2>\n    <ul class="').concat(Pe("link-list"), '">\n      ').concat(n3, "\n    </ul>"), r3 = this._$stylesheet;
              return jo(r3, t3), r3.html(o3), this;
            } }, { key: "refreshIframe", value: function() {
              var e4 = [];
              y()("iframe").each(function() {
                var t4 = y()(this).attr("src");
                t4 && e4.push(t4);
              }), e4 = Mn()(e4);
              var t3 = "<li>Empty</li>";
              Ft()(e4) || (t3 = xe()(e4, function(e5) {
                return e5 = Pt()(e5), '<li><a href="'.concat(e5, '" target="_blank" class="').concat(Pe("iframe-link"), '">').concat(e5, "</a></li>");
              }).join(""));
              var n3 = '<h2 class="'.concat(Pe("title"), '">\n      Iframe\n      <div class="').concat(Pe("btn refresh-iframe"), '">\n        <span class="').concat(Pe("icon-refresh"), '"></span>\n      </div>\n    </h2>\n    <ul class="').concat(Pe("link-list"), '">\n      ').concat(t3, "\n    </ul>");
              return this._$iframe.html(n3), this;
            } }, { key: "refreshLocalStorage", value: function() {
              return this._localStorage.refresh(), this;
            } }, { key: "refreshSessionStorage", value: function() {
              return this._sessionStorage.refresh(), this;
            } }, { key: "refreshCookie", value: function() {
              return this._cookie.refresh(), this;
            } }, { key: "refreshImage", value: function() {
              var e4 = [], t3 = this._performance = window.webkitPerformance || window.performance;
              t3 && t3.getEntries ? this._performance.getEntries().forEach(function(t4) {
                if ("img" === t4.initiatorType || Lo(t4.name)) {
                  if (M()(t4.name, "exclude=true"))
                    return;
                  e4.push(t4.name);
                }
              }) : y()("img").each(function() {
                var t4 = y()(this), n4 = t4.attr("src");
                "true" !== t4.data("exclude") && e4.push(n4);
              });
              (e4 = Mn()(e4)).sort();
              var n3 = zo("image", e4.length), o3 = "<li>Empty</li>";
              Ft()(e4) || (o3 = xe()(e4, function(e5) {
                return '<li class="'.concat(Pe("image"), '">\n          <img src="').concat(Pt()(e5), '" data-exclude="true" class="').concat(Pe("img-link"), '"/>\n        </li>');
              }).join(""));
              var r3 = '<h2 class="'.concat(Pe("title"), '">\n      Image\n      <div class="').concat(Pe("btn refresh-image"), '">\n        <span class="').concat(Pe("icon-refresh"), '"></span>\n      </div>\n    </h2>\n    <ul class="').concat(Pe("image-list"), '">\n      ').concat(o3, "\n    </ul>"), i2 = this._$image;
              return jo(i2, n3), i2.html(r3), this;
            } }, { key: "show", value: function() {
              return (0, v.Z)((0, l.Z)(o2.prototype), "show", this).call(this), this._observeElement && this._enableObserver(), this.refresh();
            } }, { key: "hide", value: function() {
              return this._disableObserver(), (0, v.Z)((0, l.Z)(o2.prototype), "hide", this).call(this);
            } }, { key: "_initTpl", value: function() {
              var e4 = this._$el;
              e4.html(Pe('<div class="section local-storage"></div>\n      <div class="section session-storage"></div>\n      <div class="section cookie"></div>\n      <div class="section script"></div>\n      <div class="section stylesheet"></div>\n      <div class="section iframe"></div>\n      <div class="section image"></div>')), this._$localStorage = e4.find(Pe(".local-storage")), this._$sessionStorage = e4.find(Pe(".session-storage")), this._$cookie = e4.find(Pe(".cookie")), this._$script = e4.find(Pe(".script")), this._$stylesheet = e4.find(Pe(".stylesheet")), this._$iframe = e4.find(Pe(".iframe")), this._$image = e4.find(Pe(".image"));
            } }, { key: "_bindEvent", value: function() {
              var e4 = this, t3 = this._$el, n3 = this._container;
              function o3(e5, t4) {
                var o4 = n3.get("sources");
                if (o4)
                  return o4.set(e5, t4), n3.showTool("sources"), true;
              }
              function r3(e5) {
                return function(t4) {
                  if (n3.get("sources")) {
                    t4.preventDefault();
                    var r4 = y()(this).attr("href");
                    "iframe" !== e5 && ko()(location.href, r4) ? So()({ url: r4, success: function(t5) {
                      o3(e5, t5);
                    }, dataType: "raw" }) : o3("iframe", r4);
                  }
                };
              }
              t3.on("click", ".eruda-refresh-script", function() {
                n3.notify("Refreshed"), e4.refreshScript();
              }).on("click", ".eruda-refresh-stylesheet", function() {
                n3.notify("Refreshed"), e4.refreshStylesheet();
              }).on("click", ".eruda-refresh-iframe", function() {
                n3.notify("Refreshed"), e4.refreshIframe();
              }).on("click", ".eruda-refresh-image", function() {
                n3.notify("Refreshed"), e4.refreshImage();
              }).on("click", ".eruda-img-link", function() {
                o3("img", y()(this).attr("src"));
              }).on("click", ".eruda-css-link", r3("css")).on("click", ".eruda-js-link", r3("js")).on("click", ".eruda-iframe-link", r3("iframe"));
            } }, { key: "_rmCfg", value: function() {
              var e4 = this.config, t3 = this._container.get("settings");
              t3 && t3.remove(e4, "hideErudaSetting").remove(e4, "observeElement").remove("Resources");
            } }, { key: "_initCfg", value: function() {
              var e4 = this, t3 = this.config = ce.createCfg("resources", { hideErudaSetting: true, observeElement: true });
              t3.get("hideErudaSetting") && (this._hideErudaSetting = true), t3.get("observeElement") || (this._observeElement = false), t3.on("change", function(t4, n3) {
                switch (t4) {
                  case "hideErudaSetting":
                    return void (e4._hideErudaSetting = n3);
                  case "observeElement":
                    return e4._observeElement = n3, n3 ? e4._enableObserver() : e4._disableObserver();
                }
              }), this._container.get("settings").text("Resources").switch(t3, "hideErudaSetting", "Hide Eruda Setting").switch(t3, "observeElement", "Auto Refresh Elements").separator();
            } }, { key: "_initObserver", value: function() {
              var e4 = this;
              this._observer = new (Fn())(function(t3) {
                C()(t3, function(t4) {
                  e4._handleMutation(t4);
                });
              });
            } }, { key: "_handleMutation", value: function(e4) {
              var t3 = this;
              if (!Be(e4.target)) {
                var n3 = function(e5) {
                  var n4 = function(e6) {
                    return e6.tagName ? e6.tagName.toLowerCase() : "";
                  }(e5);
                  switch (n4) {
                    case "script":
                      t3.refreshScript();
                      break;
                    case "img":
                      t3.refreshImage();
                      break;
                    case "link":
                      t3.refreshStylesheet();
                  }
                };
                if ("attributes" === e4.type)
                  n3(e4.target);
                else if ("childList" === e4.type) {
                  n3(e4.target);
                  var o3, r3 = Oo()(e4.addedNodes), i2 = Zo(r3 = No()(r3, Oo()(e4.removedNodes)));
                  try {
                    for (i2.s(); !(o3 = i2.n()).done; ) {
                      n3(o3.value);
                    }
                  } catch (e5) {
                    i2.e(e5);
                  } finally {
                    i2.f();
                  }
                }
              }
            } }, { key: "_enableObserver", value: function() {
              this._observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
            } }, { key: "_disableObserver", value: function() {
              this._observer.disconnect();
            } }]), o2;
          }(g);
          var Fo = /\.(jpeg|jpg|gif|png)$/, Lo = function(e3) {
            return Fo.test(e3);
          }, Po = n2(4541), Ho = n2.n(Po), $o = Ho()(), Go = [{ name: "Location", val: function() {
            return Pt()(location.href);
          } }, { name: "User Agent", val: navigator.userAgent }, { name: "Device", val: ["<table><tbody>", '<tr><td class="eruda-device-key">screen</td><td>'.concat(screen.width, " * ").concat(screen.height, "</td></tr>"), "<tr><td>viewport</td><td>".concat(window.innerWidth, " * ").concat(window.innerHeight, "</td></tr>"), "<tr><td>pixel ratio</td><td>".concat(window.devicePixelRatio, "</td></tr>"), "</tbody></table>"].join("") }, { name: "System", val: ["<table><tbody>", '<tr><td class="eruda-system-key">os</td><td>'.concat(mn()(), "</td></tr>"), "<tr><td>browser</td><td>".concat($o.name + " " + $o.version, "</td></tr>"), "</tbody></table>"].join("") }, { name: "About", val: '<a href="https://eruda.liriliri.io" target="_blank">Eruda v3.0.1</a>' }, { name: "Backers", val: function() {
            return '<a rel="noreferrer noopener" href="https://opencollective.com/eruda" target="_blank"><img data-exclude="true" style="width: 100%;"src="https://opencollective.com/eruda/backers.svg?width='.concat(1.5 * window.innerWidth, '&exclude=true"></a>');
          } }], Yo = n2(550), qo = n2.n(Yo);
          function Jo(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var Qo = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = Jo(o2);
            function o2() {
              var e4;
              return (0, r2.Z)(this, o2), (e4 = t2.call(this))._style = ie(n2(879)), e4.name = "info", e4._infos = [], e4;
            }
            return (0, i.Z)(o2, [{ key: "init", value: function(e4, t3) {
              (0, v.Z)((0, l.Z)(o2.prototype), "init", this).call(this, e4), this._container = t3, this._addDefInfo(), this._bindEvent();
            } }, { key: "destroy", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "destroy", this).call(this), ie.remove(this._style);
            } }, { key: "add", value: function(e4, t3) {
              var n3 = this._infos, o3 = false;
              return C()(n3, function(n4) {
                e4 === n4.name && (n4.val = t3, o3 = true);
              }), o3 || n3.push({ name: e4, val: t3 }), this._render(), this;
            } }, { key: "get", value: function(e4) {
              var t3, n3 = this._infos;
              return be()(e4) ? qo()(n3) : (C()(n3, function(n4) {
                e4 === n4.name && (t3 = n4.val);
              }), t3);
            } }, { key: "remove", value: function(e4) {
              for (var t3 = this._infos, n3 = t3.length - 1; n3 >= 0; n3--)
                t3[n3].name === e4 && t3.splice(n3, 1);
              return this._render(), this;
            } }, { key: "clear", value: function() {
              return this._infos = [], this._render(), this;
            } }, { key: "_addDefInfo", value: function() {
              var e4 = this;
              C()(Go, function(t3) {
                return e4.add(t3.name, t3.val);
              });
            } }, { key: "_render", value: function() {
              var e4 = [];
              C()(this._infos, function(t4) {
                var n3 = t4.name, o3 = t4.val;
                _t()(o3) && (o3 = o3()), e4.push({ name: n3, val: o3 });
              });
              var t3 = "<ul>".concat(xe()(e4, function(e5) {
                return '<li><h2 class="'.concat(Pe("title"), '">').concat(Pt()(e5.name), '<span class="').concat(Pe("icon-copy copy"), '"></span></h2><div class="').concat(Pe("content"), '">').concat(e5.val, "</div></li>");
              }).join(""), "</ul>");
              this._renderHtml(t3);
            } }, { key: "_bindEvent", value: function() {
              var e4 = this._container;
              this._$el.on("click", Pe(".copy"), function() {
                var t3 = y()(this).parent().parent(), n3 = t3.find(Pe(".title")).text(), o3 = t3.find(Pe(".content")).text();
                $t()("".concat(n3, ": ").concat(o3)), e4.notify("Copied");
              });
            } }, { key: "_renderHtml", value: function(e4) {
              e4 !== this._lastHtml && (this._lastHtml = e4, this._$el.html(e4));
            } }]), o2;
          }(g), Wo = n2(8299), Uo = n2(8368), Vo = n2.n(Uo), Ko = n2(3651), Xo = n2.n(Ko), er = n2(7049);
          function tr(e3) {
            var t2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }();
            return function() {
              var n3, o2 = (0, l.Z)(e3);
              if (t2) {
                var r3 = (0, l.Z)(this).constructor;
                n3 = Reflect.construct(o2, arguments, r3);
              } else
                n3 = o2.apply(this, arguments);
              return (0, c.Z)(this, n3);
            };
          }
          var nr = function(e3) {
            (0, s.Z)(o2, e3);
            var t2 = tr(o2);
            function o2() {
              var e4;
              return (0, r2.Z)(this, o2), (e4 = t2.call(this))._style = ie(n2(1344)), e4.name = "sources", e4._showLineNum = true, e4;
            }
            return (0, i.Z)(o2, [{ key: "init", value: function(e4, t3) {
              (0, v.Z)((0, l.Z)(o2.prototype), "init", this).call(this, e4), this._container = t3, this._bindEvent(), this._initCfg();
            } }, { key: "destroy", value: function() {
              (0, v.Z)((0, l.Z)(o2.prototype), "destroy", this).call(this), ie.remove(this._style), this._rmCfg();
            } }, { key: "set", value: function(e4, t3) {
              if ("img" === e4) {
                this._isFetchingData = true;
                var n3 = new Image(), o3 = this;
                return n3.onload = function() {
                  o3._isFetchingData = false, o3._data = { type: "img", val: { width: this.width, height: this.height, src: t3 } }, o3._render();
                }, n3.onerror = function() {
                  o3._isFetchingData = false;
                }, void (n3.src = t3);
              }
              return this._data = { type: e4, val: t3 }, this._render(), this;
            } }, { key: "show", value: function() {
              return (0, v.Z)((0, l.Z)(o2.prototype), "show", this).call(this), this._data || this._isFetchingData || this._renderDef(), this;
            } }, { key: "_renderDef", value: function() {
              var e4 = this;
              if (this._html)
                return this._data = { type: "html", val: this._html }, this._render();
              this._isGettingHtml || (this._isGettingHtml = true, So()({ url: location.href, success: function(t3) {
                return e4._html = t3;
              }, error: function() {
                return e4._html = "Sorry, unable to fetch source code:(";
              }, complete: function() {
                e4._isGettingHtml = false, e4._renderDef();
              }, dataType: "raw" }));
            } }, { key: "_bindEvent", value: function() {
              var e4 = this;
              this._container.on("showTool", function(t3, n3) {
                t3 !== e4.name && n3.name === e4.name && delete e4._data;
              });
            } }, { key: "_rmCfg", value: function() {
              var e4 = this.config, t3 = this._container.get("settings");
              t3 && t3.remove(e4, "showLineNum").remove("Sources");
            } }, { key: "_initCfg", value: function() {
              var e4 = this, t3 = this.config = ce.createCfg("sources", { showLineNum: true });
              t3.get("showLineNum") || (this._showLineNum = false), t3.on("change", function(t4, n3) {
                "showLineNum" !== t4 || (e4._showLineNum = n3);
              }), this._container.get("settings").text("Sources").switch(t3, "showLineNum", "Show Line Numbers").separator();
            } }, { key: "_render", value: function() {
              switch (this._isInit = true, this._data.type) {
                case "html":
                case "js":
                case "css":
                  return this._renderCode();
                case "img":
                  return this._renderImg();
                case "object":
                  return this._renderObj();
                case "raw":
                  return this._renderRaw();
                case "iframe":
                  return this._renderIframe();
              }
            } }, { key: "_renderImg", value: function() {
              var e4 = this._data.val, t3 = e4.width, n3 = e4.height, o3 = e4.src;
              this._renderHtml('<div class="'.concat(Pe("image"), '">\n      <div class="').concat(Pe("breadcrumb"), '">').concat(Pt()(o3), '</div>\n      <div class="').concat(Pe("img-container"), '" data-exclude="true">\n        <img src="').concat(Pt()(o3), '">\n      </div>\n      <div class="').concat(Pe("img-info"), '">').concat(Pt()(t3), " × ").concat(Pt()(n3), "</div>\n    </div>"));
            } }, { key: "_renderCode", value: function() {
              var e4 = this._data;
              this._renderHtml('<div class="'.concat(Pe("code"), '" data-type="').concat(e4.type, '"></div>'), false);
              var t3 = e4.val, n3 = e4.val.length;
              n3 > ir && (t3 = Jt()(t3, ir)), n3 < or ? (t3 = Xo()(t3, e4.type, { comment: "", string: "", number: "", keyword: "", operator: "" }), C()(["comment", "string", "number", "keyword", "operator"], function(e5) {
                t3 = Vo()(t3, 'class="'.concat(e5, '"'), 'class="'.concat(Pe(e5), '"'));
              })) : t3 = Pt()(t3);
              var o3 = this._$el.find(Pe(".code")).get(0);
              new er.Z(o3, { text: t3, escape: false, wrapLongLines: true, showLineNumbers: e4.val.length < rr && this._showLineNum });
            } }, { key: "_renderObj", value: function() {
              this._renderHtml('<ul class="'.concat(Pe("json"), '"></ul>'), false);
              var e4 = this._data.val;
              try {
                T()(e4) && (e4 = JSON.parse(e4));
              } catch (e5) {
              }
              new Wo.Z(this._$el.find(".eruda-json").get(0), { unenumerable: true, accessGetter: true }).set(e4);
            } }, { key: "_renderRaw", value: function() {
              var e4 = this._data;
              this._renderHtml('<div class="'.concat(Pe("raw-wrapper"), '">\n      <div class="').concat(Pe("raw"), '"></div>\n    </div>'));
              var t3 = e4.val, n3 = this._$el.find(Pe(".raw")).get(0);
              t3.length > ir && (t3 = Jt()(t3, ir)), new er.Z(n3, { text: t3, wrapLongLines: true, showLineNumbers: t3.length < rr && this._showLineNum });
            } }, { key: "_renderIframe", value: function() {
              this._renderHtml('<iframe src="'.concat(Pt()(this._data.val), '"></iframe>'));
            } }, { key: "_renderHtml", value: function(e4) {
              var t3 = this;
              (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && e4 === this._lastHtml || (this._lastHtml = e4, this._$el.html(e4), setTimeout(function() {
                return t3._$el.get(0).scrollTop = 0;
              }, 0));
            } }]), o2;
          }(g), or = 3e4, rr = 8e4, ir = 1e5, ar = n2(5166), sr = n2.n(ar), cr = n2(3514), lr = n2.n(cr), ur = { init: function() {
            var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e3.container, n3 = e3.tool, o2 = e3.autoScale, r3 = void 0 === o2 || o2, i2 = e3.useShadowDom, a2 = void 0 === i2 || i2, s2 = e3.defaults, c2 = void 0 === s2 ? {} : s2;
            this._isInit || (this._isInit = true, this._scale = 1, this._initContainer(t2, a2), this._initStyle(), this._initDevTools(c2), this._initEntryBtn(), this._initSettings(), this._initTools(n3), this._registerListener(), r3 && this._autoScale());
          }, _isInit: false, version: "3.0.1", util: o, chobitsu: ln, Tool: g, Console: Rt, Elements: so, Network: wn, Sources: nr, Resources: Bo, Info: Qo, Snippets: xo, Settings: ce, get: function(e3) {
            if (this._checkInit()) {
              if ("entryBtn" === e3)
                return this._entryBtn;
              var t2 = this._devTools;
              return e3 ? t2.get(e3) : t2;
            }
          }, add: function(e3) {
            if (this._checkInit())
              return _t()(e3) && (e3 = e3(this)), this._devTools.add(e3), this;
          }, remove: function(e3) {
            return this._devTools.remove(e3), this;
          }, show: function(e3) {
            if (this._checkInit()) {
              var t2 = this._devTools;
              return e3 ? t2.showTool(e3) : t2.show(), this;
            }
          }, hide: function() {
            if (this._checkInit())
              return this._devTools.hide(), this;
          }, destroy: function() {
            this._devTools.destroy(), delete this._devTools, this._entryBtn.destroy(), delete this._entryBtn, this._unregisterListener(), y()(this._container).remove(), ie.clear(), this._isInit = false, this._container = null, this._shadowRoot = null;
          }, scale: function(e3) {
            return it()(e3) ? (this._scale = e3, p.emit(p.SCALE, e3), this) : this._scale;
          }, position: function(e3) {
            var t2 = this._entryBtn;
            return sr()(e3) ? (t2.setPos(e3), this) : t2.getPos();
          }, _autoScale: function() {
            kn()() && this.scale(1 / lr()());
          }, _registerListener: function() {
            var e3 = this;
            this._addListener = function() {
              return e3.add.apply(e3, arguments);
            }, this._showListener = function() {
              return e3.show.apply(e3, arguments);
            }, p.on(p.ADD, this._addListener), p.on(p.SHOW, this._showListener), p.on(p.SCALE, ie.setScale);
          }, _unregisterListener: function() {
            p.off(p.ADD, this._addListener), p.off(p.SHOW, this._showListener), p.off(p.SCALE, ie.setScale);
          }, _checkInit: function() {
            return this._isInit || ot.error('Please call "eruda.init()" first'), this._isInit;
          }, _initContainer: function(e3, t2) {
            var o2, r3;
            e3 || (e3 = document.createElement("div"), document.documentElement.appendChild(e3)), e3.id = "eruda", e3.style.all = "initial", this._container = e3, t2 && (e3.attachShadow ? o2 = e3.attachShadow({ mode: "open" }) : e3.createShadowRoot && (o2 = e3.createShadowRoot()), o2 && (ie.container = document.head, ie(n2(5357) + n2(9327) + n2(4821) + n2(8903) + n2(5777)), r3 = document.createElement("div"), o2.appendChild(r3), this._shadowRoot = o2)), this._shadowRoot || (r3 = document.createElement("div"), e3.appendChild(r3)), $2()(r3, { className: "eruda-container __chobitsu-hide__", contentEditable: false }), "ios" === Ho()().name && r3.setAttribute("ontouchstart", ""), this._$el = y()(r3);
          }, _initDevTools: function(e3) {
            this._devTools = new gt(this._$el, { defaults: e3 });
          }, _initStyle: function() {
            var e3 = "eruda-style-container", t2 = this._$el;
            this._shadowRoot ? (ie.container = this._shadowRoot, ie(":host { all: initial }")) : (t2.append('<div class="'.concat(e3, '"></div>')), ie.container = t2.find(".".concat(e3)).get(0)), ie(n2(8020) + n2(4821) + n2(9327) + n2(7591) + n2(4987) + n2(8903) + n2(5512) + n2(2156) + n2(5777) + n2(7871) + n2(6833) + n2(8516) + n2(5357));
          }, _initEntryBtn: function() {
            var e3 = this;
            this._entryBtn = new tt(this._$el), this._entryBtn.on("click", function() {
              return e3._devTools.toggle();
            });
          }, _initSettings: function() {
            var e3 = this._devTools, t2 = new ce();
            e3.add(t2), this._entryBtn.initCfg(t2), e3.initCfg(t2);
          }, _initTools: function() {
            var e3 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["console", "elements", "network", "resources", "sources", "info", "snippets"];
            t2 = Oo()(t2);
            var n3 = this._devTools;
            t2.forEach(function(t3) {
              var o2 = e3[Et()(t3)];
              try {
                o2 && n3.add(new o2());
              } catch (e4) {
                ue()(function() {
                  ot.error("Something wrong when initializing tool ".concat(t3, ":"), e4.message);
                });
              }
            }), n3.showTool(t2[0] || "settings");
          } };
        }, 2027: function(e2, t, n2) {
          var o = n2(6672).Z;
          e2.exports = o, e2.exports.default = o;
        }, 6610: function(e2, t, n2) {
          n2.r(t), t.default = {};
        }, 9143: function(e2, t, n2) {
          var o = this && this.__awaiter || function(e3, t2, n3, o2) {
            return new (n3 || (n3 = Promise))(function(r3, i2) {
              function a2(e4) {
                try {
                  c2(o2.next(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function s2(e4) {
                try {
                  c2(o2.throw(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function c2(e4) {
                var t3;
                e4.done ? r3(e4.value) : (t3 = e4.value, t3 instanceof n3 ? t3 : new n3(function(e5) {
                  e5(t3);
                })).then(a2, s2);
              }
              c2((o2 = o2.apply(e3, t2 || [])).next());
            });
          }, r2 = this && this.__generator || function(e3, t2) {
            var n3, o2, r3, i2, a2 = { label: 0, sent: function() {
              if (1 & r3[0])
                throw r3[1];
              return r3[1];
            }, trys: [], ops: [] };
            return i2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
              return this;
            }), i2;
            function s2(i3) {
              return function(s3) {
                return function(i4) {
                  if (n3)
                    throw new TypeError("Generator is already executing.");
                  for (; a2; )
                    try {
                      if (n3 = 1, o2 && (r3 = 2 & i4[0] ? o2.return : i4[0] ? o2.throw || ((r3 = o2.return) && r3.call(o2), 0) : o2.next) && !(r3 = r3.call(o2, i4[1])).done)
                        return r3;
                      switch (o2 = 0, r3 && (i4 = [2 & i4[0], r3.value]), i4[0]) {
                        case 0:
                        case 1:
                          r3 = i4;
                          break;
                        case 4:
                          return a2.label++, { value: i4[1], done: false };
                        case 5:
                          a2.label++, o2 = i4[1], i4 = [0];
                          continue;
                        case 7:
                          i4 = a2.ops.pop(), a2.trys.pop();
                          continue;
                        default:
                          if (!(r3 = a2.trys, (r3 = r3.length > 0 && r3[r3.length - 1]) || 6 !== i4[0] && 2 !== i4[0])) {
                            a2 = 0;
                            continue;
                          }
                          if (3 === i4[0] && (!r3 || i4[1] > r3[0] && i4[1] < r3[3])) {
                            a2.label = i4[1];
                            break;
                          }
                          if (6 === i4[0] && a2.label < r3[1]) {
                            a2.label = r3[1], r3 = i4;
                            break;
                          }
                          if (r3 && a2.label < r3[2]) {
                            a2.label = r3[2], a2.ops.push(i4);
                            break;
                          }
                          r3[2] && a2.ops.pop(), a2.trys.pop();
                          continue;
                      }
                      i4 = t2.call(e3, a2);
                    } catch (e4) {
                      i4 = [6, e4], o2 = 0;
                    } finally {
                      n3 = r3 = 0;
                    }
                  if (5 & i4[0])
                    throw i4[1];
                  return { value: i4[0] ? i4[1] : void 0, done: true };
                }([i3, s3]);
              };
            }
          }, i = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true });
          var a = i(n2(3276)), s = i(n2(1214)), c = i(n2(5936)), l = i(n2(3783)), u2 = i(n2(1443)), d2 = n2(316), f2 = function() {
            function e3() {
              var e4 = this;
              this.resolves = /* @__PURE__ */ new Map(), this.domains = /* @__PURE__ */ new Map(), this.onMessage = s.default, a.default.on("message", function(t2) {
                var n3 = JSON.parse(t2), o2 = e4.resolves.get(n3.id);
                if (o2 && o2(n3.result), !n3.id) {
                  var r3 = n3.method.split("."), i2 = r3[0], a2 = r3[1], s2 = e4.domains.get(i2);
                  s2 && s2.emit(a2, n3.params);
                }
                e4.onMessage(t2);
              });
            }
            return e3.prototype.domain = function(e4) {
              return this.domains.get(e4);
            }, e3.prototype.setOnMessage = function(e4) {
              this.onMessage = e4;
            }, e3.prototype.sendMessage = function(e4, t2) {
              var n3 = this;
              void 0 === t2 && (t2 = {});
              var o2 = c.default();
              return this.sendRawMessage(JSON.stringify({ id: o2, method: e4, params: t2 })), new Promise(function(e5) {
                n3.resolves.set(o2, e5);
              });
            }, e3.prototype.sendRawMessage = function(e4) {
              return o(this, void 0, void 0, function() {
                var t2, n3, o2, i2, s2, c2, l2;
                return r2(this, function(r3) {
                  switch (r3.label) {
                    case 0:
                      t2 = JSON.parse(e4), n3 = t2.method, o2 = t2.params, i2 = t2.id, s2 = { id: i2 }, r3.label = 1;
                    case 1:
                      return r3.trys.push([1, 3, , 4]), c2 = s2, [4, this.callMethod(n3, o2)];
                    case 2:
                      return c2.result = r3.sent(), [3, 4];
                    case 3:
                      return (l2 = r3.sent()) instanceof d2.ErrorWithCode ? s2.error = { message: l2.message, code: l2.code } : l2 instanceof Error && (s2.error = { message: l2.message }), [3, 4];
                    case 4:
                      return a.default.emit("message", JSON.stringify(s2)), [2];
                  }
                });
              });
            }, e3.prototype.register = function(e4, t2) {
              var n3 = this.domains, o2 = n3.get(e4);
              o2 || (o2 = {}, u2.default.mixin(o2)), l.default(t2, function(e5, t3) {
                o2[t3] = e5;
              }), n3.set(e4, o2);
            }, e3.prototype.callMethod = function(e4, t2) {
              return o(this, void 0, void 0, function() {
                var n3, o2, i2, a2;
                return r2(this, function(r3) {
                  if (n3 = e4.split("."), o2 = n3[0], i2 = n3[1], (a2 = this.domain(o2)) && a2[i2])
                    return [2, a2[i2](t2) || {}];
                  throw Error(e4 + " unimplemented");
                });
              });
            }, e3;
          }();
          t.default = f2;
        }, 7935: function(e2, t, n2) {
          var o = this && this.__createBinding || (Object.create ? function(e3, t2, n3, o2) {
            void 0 === o2 && (o2 = n3), Object.defineProperty(e3, o2, { enumerable: true, get: function() {
              return t2[n3];
            } });
          } : function(e3, t2, n3, o2) {
            void 0 === o2 && (o2 = n3), e3[o2] = t2[n3];
          }), r2 = this && this.__setModuleDefault || (Object.create ? function(e3, t2) {
            Object.defineProperty(e3, "default", { enumerable: true, value: t2 });
          } : function(e3, t2) {
            e3.default = t2;
          }), i = this && this.__importStar || function(e3) {
            if (e3 && e3.__esModule)
              return e3;
            var t2 = {};
            if (null != e3)
              for (var n3 in e3)
                "default" !== n3 && Object.hasOwnProperty.call(e3, n3) && o(t2, e3, n3);
            return r2(t2, e3), t2;
          }, a = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.getDOMNode = t.getDOMNodeId = t.setOuterHTML = t.setNodeValue = t.setInspectedNode = t.setAttributeValue = t.setAttributesAsText = t.resolveNode = t.requestNode = t.requestChildNodes = t.removeNode = t.pushNodesByBackendIdsToFrontend = t.discardSearchResults = t.pushNodesToFrontend = t.getSearchResults = t.performSearch = t.moveTo = t.getOuterHTML = t.getDocument = t.enable = t.copyTo = t.collectClassNamesFromSubtree = void 0;
          var s = a(n2(3276)), c = i(n2(2049)), l = n2(2049), u2 = i(n2(7923)), d2 = a(n2(6126)), f2 = a(n2(1512)), h = a(n2(6156)), p = a(n2(8887)), v = a(n2(7483)), m = a(n2(2461)), g = a(n2(42)), b = a(n2(6341)), y = a(n2(3063)), w = a(n2(3783)), _ = a(n2(1352)), x = a(n2(8933)), A = a(n2(8099)), k = n2(1628), C = n2(316);
          t.collectClassNamesFromSubtree = function(e3) {
            var t2 = l.getNode(e3.nodeId), n3 = [];
            return T(t2, function(e4) {
              if (1 === e4.nodeType) {
                var t3 = e4.getAttribute("class");
                if (t3)
                  for (var o2 = 0, r3 = t3.split(/\s+/); o2 < r3.length; o2++) {
                    var i2 = r3[o2];
                    n3.push(i2);
                  }
              }
            }), { classNames: g.default(n3) };
          }, t.copyTo = function(e3) {
            var t2 = e3.nodeId, n3 = e3.targetNodeId, o2 = l.getNode(t2), r3 = l.getNode(n3), i2 = o2.cloneNode(true);
            r3.appendChild(i2);
          }, t.enable = function() {
            d2.default.observe(), c.clear();
          }, t.getDocument = function() {
            return { root: c.wrap(document, { depth: 2 }) };
          }, t.getOuterHTML = function(e3) {
            return { outerHTML: l.getNode(e3.nodeId).outerHTML };
          }, t.moveTo = function(e3) {
            var t2 = e3.nodeId, n3 = e3.targetNodeId, o2 = l.getNode(t2);
            l.getNode(n3).appendChild(o2);
          };
          var S = /* @__PURE__ */ new Map();
          function E(e3) {
            for (var t2 = [e3], n3 = e3.parentNode; n3; ) {
              if (t2.push(n3), r3 = l.getNodeId(n3))
                break;
              n3 = n3.parentNode;
            }
            for (; t2.length; ) {
              var o2 = t2.pop(), r3 = l.getNodeId(o2);
              s.default.trigger("DOM.setChildNodes", { parentId: r3, nodes: c.getChildNodes(o2, 1) });
            }
            return l.getNodeId(e3);
          }
          t.performSearch = function(e3) {
            var t2 = y.default(e3.query), n3 = [];
            try {
              n3 = A.default(n3, _.default(document.querySelectorAll(t2)));
            } catch (e4) {
            }
            try {
              n3 = A.default(n3, x.default(t2));
            } catch (e4) {
            }
            T(document, function(e4) {
              var o3 = e4.nodeType;
              if (1 === o3) {
                var r3 = e4.localName;
                if (b.default("<" + r3 + " ", t2) || b.default("</" + r3 + ">", t2))
                  return void n3.push(e4);
                var i2 = [];
                w.default(e4.attributes, function(e5) {
                  var t3 = e5.name, n4 = e5.value;
                  return i2.push(t3, n4);
                });
                for (var a2 = 0, s2 = i2.length; a2 < s2; a2++)
                  if (b.default(y.default(i2[a2]), t2)) {
                    n3.push(e4);
                    break;
                  }
              } else
                3 === o3 && b.default(y.default(e4.nodeValue), t2) && n3.push(e4);
            });
            var o2 = C.createId();
            return S.set(o2, n3), { searchId: o2, resultCount: n3.length };
          }, t.getSearchResults = function(e3) {
            var t2 = e3.searchId, n3 = e3.fromIndex, o2 = e3.toIndex, r3 = S.get(t2).slice(n3, o2);
            return { nodeIds: m.default(r3, function(e4) {
              var t3 = l.getNodeId(e4);
              return t3 || E(e4);
            }) };
          }, t.pushNodesToFrontend = E, t.discardSearchResults = function(e3) {
            S.delete(e3.searchId);
          }, t.pushNodesByBackendIdsToFrontend = function(e3) {
            return { nodeIds: e3.backendNodeIds };
          }, t.removeNode = function(e3) {
            var t2 = l.getNode(e3.nodeId);
            f2.default(t2).remove();
          }, t.requestChildNodes = function(e3) {
            var t2 = e3.nodeId, n3 = e3.depth, o2 = void 0 === n3 ? 1 : n3, r3 = l.getNode(t2);
            s.default.trigger("DOM.setChildNodes", { parentId: t2, nodes: c.getChildNodes(r3, o2) });
          }, t.requestNode = function(e3) {
            var t2 = u2.getObj(e3.objectId);
            return { nodeId: l.getNodeId(t2) };
          }, t.resolveNode = function(e3) {
            var t2 = l.getNode(e3.nodeId);
            return { object: u2.wrap(t2) };
          }, t.setAttributesAsText = function(e3) {
            var t2, n3 = e3.name, o2 = e3.text, r3 = e3.nodeId, i2 = l.getNode(r3);
            n3 && i2.removeAttribute(n3), f2.default(i2).attr((t2 = "<div " + (t2 = o2) + "></div>", v.default.parse(t2)[0].attrs));
          }, t.setAttributeValue = function(e3) {
            var t2 = e3.nodeId, n3 = e3.name, o2 = e3.value;
            l.getNode(t2).setAttribute(n3, o2);
          };
          var O = [];
          function T(e3, t2) {
            for (var n3 = c.filterNodes(e3.childNodes), o2 = 0, r3 = n3.length; o2 < r3; o2++) {
              var i2 = n3[o2];
              t2(i2), T(i2, t2);
            }
          }
          t.setInspectedNode = function(e3) {
            var t2 = l.getNode(e3.nodeId);
            O.unshift(t2), O.length > 5 && O.pop();
            for (var n3 = 0; n3 < 5; n3++)
              k.setGlobal("$" + n3, O[n3]);
          }, t.setNodeValue = function(e3) {
            var t2 = e3.nodeId, n3 = e3.value;
            l.getNode(t2).nodeValue = n3;
          }, t.setOuterHTML = function(e3) {
            var t2 = e3.nodeId, n3 = e3.outerHTML;
            l.getNode(t2).outerHTML = n3;
          }, t.getDOMNodeId = function(e3) {
            var t2 = e3.node;
            return { nodeId: c.getOrCreateNodeId(t2) };
          }, t.getDOMNode = function(e3) {
            var t2 = e3.nodeId;
            return { node: l.getNode(t2) };
          }, d2.default.on("attributes", function(e3, t2) {
            var n3 = l.getNodeId(e3);
            if (n3) {
              var o2 = e3.getAttribute(t2);
              h.default(o2) ? s.default.trigger("DOM.attributeRemoved", { nodeId: n3, name: t2 }) : s.default.trigger("DOM.attributeModified", { nodeId: n3, name: t2, value: o2 });
            }
          }), d2.default.on("childList", function(e3, t2, n3) {
            var o2 = l.getNodeId(e3);
            if (o2) {
              if (t2 = c.filterNodes(t2), n3 = c.filterNodes(n3), !p.default(t2)) {
                h2();
                for (var r3 = 0, i2 = t2.length; r3 < i2; r3++) {
                  var a2 = t2[r3], u3 = c.getPreviousNode(a2), d3 = u3 ? l.getNodeId(u3) : 0, f3 = { node: c.wrap(a2, { depth: 0 }), parentNodeId: o2, previousNodeId: d3 };
                  s.default.trigger("DOM.childNodeInserted", f3);
                }
              }
              if (!p.default(n3))
                for (r3 = 0, i2 = n3.length; r3 < i2; r3++) {
                  a2 = n3[r3];
                  if (!l.getNodeId(a2)) {
                    h2();
                    break;
                  }
                  s.default.trigger("DOM.childNodeRemoved", { nodeId: l.getNodeId(a2), parentNodeId: o2 });
                }
            }
            function h2() {
              s.default.trigger("DOM.childNodeCountUpdated", { childNodeCount: c.wrap(e3, { depth: 0 }).childNodeCount, nodeId: o2 });
            }
          }), d2.default.on("characterData", function(e3) {
            var t2 = l.getNodeId(e3);
            t2 && s.default.trigger("DOM.characterDataModified", { characterData: e3.nodeValue, nodeId: t2 });
          });
        }, 2139: function(e2, t, n2) {
          var o = this && this.__spreadArrays || function() {
            for (var e3 = 0, t2 = 0, n3 = arguments.length; t2 < n3; t2++)
              e3 += arguments[t2].length;
            var o2 = Array(e3), r3 = 0;
            for (t2 = 0; t2 < n3; t2++)
              for (var i2 = arguments[t2], a2 = 0, s2 = i2.length; a2 < s2; a2++, r3++)
                o2[r3] = i2[a2];
            return o2;
          }, r2 = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.getResponseBody = t.enable = t.getCookies = t.deleteCookies = void 0;
          var i = r2(n2(4331)), a = r2(n2(3783)), s = r2(n2(1420)), c = r2(n2(5031)), l = r2(n2(8763)), u2 = r2(n2(8740)), d2 = r2(n2(6341)), f2 = n2(2636), h = r2(n2(3276));
          t.deleteCookies = function(e3) {
            c.default(e3.name);
          }, t.getCookies = function() {
            var e3 = [], t2 = document.cookie;
            return "" !== i.default(t2) && a.default(t2.split(";"), function(t3) {
              t3 = t3.split("=");
              var n3 = i.default(t3.shift());
              t3 = s.default(t3.join("=")), e3.push({ name: n3, value: t3 });
            }), { cookies: e3 };
          };
          var p = /* @__PURE__ */ new Map();
          t.enable = l.default(function() {
            var e3 = window.XMLHttpRequest.prototype, t2 = e3.send, n3 = e3.open, r3 = e3.setRequestHeader;
            e3.open = function(e4, t3) {
              if (!function(e5) {
                return !d2.default(e5, "__chobitsu-hide__=true");
              }(t3))
                return n3.apply(this, arguments);
              var o2 = this, r4 = o2.chobitsuRequest = new f2.XhrRequest(o2, e4, t3);
              r4.on("send", function(e5, t4) {
                var n4 = { method: t4.method, url: t4.url, headers: t4.reqHeaders };
                t4.data && (n4.postData = t4.data), h.default.trigger("Network.requestWillBeSent", { requestId: e5, type: "XHR", request: n4, timestamp: t4.time / 1e3 });
              }), r4.on("headersReceived", function(e5, t4) {
                h.default.trigger("Network.responseReceivedExtraInfo", { requestId: e5, blockedCookies: [], headers: t4.resHeaders });
              }), r4.on("done", function(e5, t4) {
                h.default.trigger("Network.responseReceived", { requestId: e5, type: "XHR", response: { status: t4.status }, timestamp: t4.time / 1e3 }), p.set(e5, t4.resTxt), h.default.trigger("Network.loadingFinished", { requestId: e5, encodedDataLength: t4.size, timestamp: t4.time / 1e3 });
              }), o2.addEventListener("readystatechange", function() {
                switch (o2.readyState) {
                  case 2:
                    return r4.handleHeadersReceived();
                  case 4:
                    return r4.handleDone();
                }
              }), n3.apply(this, arguments);
            }, e3.send = function(e4) {
              var n4 = this.chobitsuRequest;
              n4 && n4.handleSend(e4), t2.apply(this, arguments);
            }, e3.setRequestHeader = function(e4, t3) {
              var n4 = this.chobitsuRequest;
              n4 && n4.handleReqHeadersSet(e4, t3), r3.apply(this, arguments);
            };
            var i2 = false;
            if (window.fetch && (i2 = u2.default(window.fetch)), !i2 && navigator.serviceWorker && (i2 = true), i2) {
              var a2 = window.fetch;
              window.fetch = function() {
                for (var e4 = [], t3 = 0; t3 < arguments.length; t3++)
                  e4[t3] = arguments[t3];
                var n4 = new (f2.FetchRequest.bind.apply(f2.FetchRequest, o([void 0], e4)))();
                n4.on("send", function(e5, t4) {
                  var n5 = { method: t4.method, url: t4.url, headers: t4.reqHeaders };
                  t4.data && (n5.postData = t4.data), h.default.trigger("Network.requestWillBeSent", { requestId: e5, type: "Fetch", request: n5, timestamp: t4.time / 1e3 });
                }), n4.on("done", function(e5, t4) {
                  h.default.trigger("Network.responseReceived", { requestId: e5, type: "Fetch", response: { status: t4.status, headers: t4.resHeaders }, timestamp: t4.time / 1e3 }), p.set(e5, t4.resTxt), h.default.trigger("Network.loadingFinished", { requestId: e5, encodedDataLength: t4.size, timestamp: t4.time / 1e3 });
                });
                var r4 = a2.apply(void 0, e4);
                return n4.send(r4), r4;
              };
            }
          }), t.getResponseBody = function(e3) {
            return { base64Encoded: false, body: p.get(e3.requestId) };
          };
        }, 8689: function(e2, t, n2) {
          var o = this && this.__createBinding || (Object.create ? function(e3, t2, n3, o2) {
            void 0 === o2 && (o2 = n3), Object.defineProperty(e3, o2, { enumerable: true, get: function() {
              return t2[n3];
            } });
          } : function(e3, t2, n3, o2) {
            void 0 === o2 && (o2 = n3), e3[o2] = t2[n3];
          }), r2 = this && this.__setModuleDefault || (Object.create ? function(e3, t2) {
            Object.defineProperty(e3, "default", { enumerable: true, value: t2 });
          } : function(e3, t2) {
            e3.default = t2;
          }), i = this && this.__importStar || function(e3) {
            if (e3 && e3.__esModule)
              return e3;
            var t2 = {};
            if (null != e3)
              for (var n3 in e3)
                "default" !== n3 && Object.hasOwnProperty.call(e3, n3) && o(t2, e3, n3);
            return r2(t2, e3), t2;
          }, a = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.setInspectMode = t.setShowViewportSizeOnResize = t.hideHighlight = t.highlightNode = t.disable = t.enable = void 0;
          var s, c, l = n2(2049), u2 = n2(7935), d2 = a(n2(1512)), f2 = a(n2(8613)), h = a(n2(642)), p = a(n2(4193)), v = a(n2(6329)), m = a(n2(3276)), g = a(n2(5610)), b = a(n2(3474)), y = a(n2(4210)), w = a(n2(7715)), _ = i(n2(7923)), x = false, A = false, k = y.default("clip-path", "polygon(50% 0px, 0px 100%, 100% 100%)"), C = "ontouchstart" in g.default, S = n2(2777).replace("/*# sourceMappingURL=luna-dom-highlighter.css.map*/", "");
          function E(e3) {
            var t2, n3 = e3.nodeId, o2 = e3.highlightConfig, r3 = e3.objectId;
            n3 && (t2 = l.getNode(n3)), r3 && (t2 = _.getObj(r3)), 1 !== t2.nodeType && 3 !== t2.nodeType || (p.default(o2, { contentColor: "transparent", paddingColor: "transparent", borderColor: "transparent", marginColor: "transparent" }), k || v.default(o2, { showInfo: false }), s.highlight(t2, o2));
          }
          function O() {
            s.hide();
          }
          t.enable = function() {
            if (!A) {
              var e3 = f2.default("div", { class: "__chobitsu-hide__", style: { all: "initial" } });
              c = d2.default(e3), document.documentElement.appendChild(e3);
              var t2 = null, n3 = null;
              if (e3.attachShadow ? n3 = e3.attachShadow({ mode: "open" }) : e3.createShadowRoot && (n3 = e3.createShadowRoot()), n3) {
                var o2 = document.createElement("style");
                o2.textContent = S, o2.type = "text/css", n3.appendChild(o2), t2 = document.createElement("div"), n3.appendChild(t2);
              } else
                t2 = document.createElement("div"), e3.appendChild(t2), x || (h.default(S), x = true);
              s = new w.default(t2, { monitorResize: b.default(g.default.ResizeObserver), showInfo: k }), window.addEventListener("resize", B), A = true;
            }
          }, t.disable = function() {
            s.destroy(), c.remove(), window.removeEventListener("resize", B), A = false;
          }, t.highlightNode = E, t.hideHighlight = O;
          var T = false;
          t.setShowViewportSizeOnResize = function(e3) {
            T = e3.show;
          };
          var N = {}, M = "none";
          function j(e3) {
            if (C) {
              var t2 = e3.touches[0] || e3.changedTouches[0];
              return document.elementFromPoint(t2.clientX, t2.clientY);
            }
            return document.elementFromPoint(e3.clientX, e3.clientY);
          }
          t.setInspectMode = function(e3) {
            N = e3.highlightConfig, M = e3.mode;
          };
          var z = -1;
          function R(e3) {
            if ("none" !== M) {
              var t2 = j(e3);
              if (t2 && l.isValidNode(t2)) {
                var n3 = l.getNodeId(t2);
                n3 || (n3 = u2.pushNodesToFrontend(t2)), E({ nodeId: n3, highlightConfig: N }), n3 !== z && (m.default.trigger("Overlay.nodeHighlightRequested", { nodeId: n3 }), z = n3);
              }
            }
          }
          function Z(e3) {
            if ("none" !== M) {
              e3.preventDefault(), e3.stopImmediatePropagation();
              var t2 = j(e3);
              m.default.trigger("Overlay.inspectNodeRequested", { backendNodeId: l.getNodeId(t2) }), z = -1, O();
            }
          }
          function I(e3, t2) {
            document.documentElement.addEventListener(e3, t2, true);
          }
          C ? (I("touchstart", R), I("touchmove", R), I("touchend", Z)) : (I("mousemove", R), I("mouseout", function() {
            "none" !== M && O();
          }), I("click", Z));
          var D = f2.default("div", { class: "__chobitsu-hide__", style: { position: "fixed", right: 0, top: 0, background: "#fff", fontSize: 13, opacity: 0.5, padding: "4px 6px" } });
          function B() {
            T && (L.text(window.innerWidth + "px × " + window.innerHeight + "px"), F ? clearTimeout(F) : document.documentElement.appendChild(D), F = setTimeout(function() {
              L.remove(), F = null;
            }, 1e3));
          }
          var F, L = d2.default(D);
        }, 9119: function(e2, t, n2) {
          var o = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.getTrustTokens = t.clearDataForOrigin = t.getUsageAndQuota = void 0;
          var r2 = o(n2(3783)), i = o(n2(5031)), a = o(n2(615)), s = n2(2139), c = a.default("local"), l = a.default("session");
          t.getUsageAndQuota = function() {
            return { quota: 0, usage: 0, usageBreakdown: [] };
          }, t.clearDataForOrigin = function(e3) {
            var t2 = e3.storageTypes.split(",");
            r2.default(t2, function(e4) {
              if ("cookies" === e4) {
                var t3 = s.getCookies().cookies;
                r2.default(t3, function(e5) {
                  var t4 = e5.name;
                  return i.default(t4);
                });
              } else
                "local_storage" === e4 && (c.clear(), l.clear());
            });
          }, t.getTrustTokens = function() {
            return { tokens: [] };
          };
        }, 3276: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                t3.hasOwnProperty(n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true });
          var a = function(e3) {
            function t2() {
              return null !== e3 && e3.apply(this, arguments) || this;
            }
            return r2(t2, e3), t2.prototype.trigger = function(e4, t3) {
              this.emit("message", JSON.stringify({ method: e4, params: t3 }));
            }, t2;
          }(i(n2(1443)).default);
          t.default = new a();
        }, 1628: function(e2, t, n2) {
          var o = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.setGlobal = void 0;
          var r2 = o(n2(6768)), i = o(n2(2327)), a = o(n2(1352)), s = o(n2(2533)), c = o(n2(8933)), l = o(n2(3783)), u2 = { copy: function(e3) {
            r2.default(e3) || (e3 = JSON.stringify(e3, null, 2)), i.default(e3);
          }, $: function(e3) {
            return document.querySelector(e3);
          }, $$: function(e3) {
            return a.default(document.querySelectorAll(e3));
          }, $x: function(e3) {
            return c.default(e3);
          }, keys: s.default };
          t.setGlobal = function(e3, t2) {
            u2[e3] = t2;
          }, t.default = function(e3) {
            var t2;
            l.default(u2, function(e4, t3) {
              window[t3] || (window[t3] = e4);
            });
            try {
              t2 = eval.call(window, "(" + e3 + ")");
            } catch (n3) {
              t2 = eval.call(window, e3);
            }
            return l.default(u2, function(e4, t3) {
              window[t3] && window[t3] === e4 && delete window[t3];
            }), t2;
          };
        }, 6126: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                t3.hasOwnProperty(n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true });
          var a = i(n2(1443)), s = i(n2(3783)), c = function(e3) {
            function t2() {
              var t3 = e3.call(this) || this;
              return t3.observer = new MutationObserver(function(e4) {
                s.default(e4, function(e5) {
                  return t3.handleMutation(e5);
                });
              }), t3;
            }
            return r2(t2, e3), t2.prototype.observe = function() {
              var e4 = this.observer;
              e4.disconnect(), e4.observe(document.documentElement, { attributes: true, childList: true, characterData: true, subtree: true });
            }, t2.prototype.handleMutation = function(e4) {
              "attributes" === e4.type ? this.emit("attributes", e4.target, e4.attributeName) : "childList" === e4.type ? this.emit("childList", e4.target, e4.addedNodes, e4.removedNodes) : "characterData" === e4.type && this.emit("characterData", e4.target);
            }, t2;
          }(a.default);
          t.default = new c();
        }, 2049: function(e2, t, n2) {
          var o = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.getNode = t.isValidNode = t.filterNodes = t.getPreviousNode = t.getChildNodes = t.wrap = t.getNodeId = t.clear = t.getOrCreateNodeId = void 0;
          var r2 = o(n2(2461)), i = o(n2(5972)), a = o(n2(3783)), s = o(n2(4331)), c = o(n2(6341)), l = o(n2(6329)), u2 = n2(316), d2 = /* @__PURE__ */ new Map(), f2 = /* @__PURE__ */ new Map(), h = 1;
          function p(e3) {
            var t2 = f2.get(e3);
            return t2 || (t2 = h++, f2.set(e3, t2), d2.set(t2, e3), t2);
          }
          function v(e3, t2) {
            var n3 = (void 0 === t2 ? {} : t2).depth, o2 = void 0 === n3 ? 1 : n3, r3 = p(e3), i2 = { nodeName: e3.nodeName, nodeType: e3.nodeType, localName: e3.localName || "", nodeValue: e3.nodeValue || "", nodeId: r3, backendNodeId: r3 };
            if (e3.parentNode && (i2.parentId = p(e3.parentNode)), 10 === e3.nodeType)
              return l.default(i2, { publicId: "", systemId: "" });
            if (e3.attributes) {
              var s2 = [];
              a.default(e3.attributes, function(e4) {
                var t3 = e4.name, n4 = e4.value;
                return s2.push(t3, n4);
              }), i2.attributes = s2;
            }
            var c2 = g(e3.childNodes);
            i2.childNodeCount = c2.length;
            var u3 = 1 === i2.childNodeCount && 3 === c2[0].nodeType;
            return (o2 > 0 || u3) && (i2.children = m(e3, o2)), i2;
          }
          function m(e3, t2) {
            var n3 = g(e3.childNodes);
            return r2.default(n3, function(e4) {
              return v(e4, { depth: t2 - 1 });
            });
          }
          function g(e3) {
            return i.default(e3, function(e4) {
              return b(e4);
            });
          }
          function b(e3) {
            if (1 === e3.nodeType) {
              var t2 = e3.getAttribute("class") || "";
              if (c.default(t2, "__chobitsu-hide__") || c.default(t2, "html2canvas-container"))
                return false;
            }
            var n3 = !(3 === e3.nodeType && "" === s.default(e3.nodeValue || ""));
            return n3 && e3.parentNode ? b(e3.parentNode) : n3;
          }
          t.getOrCreateNodeId = p, t.clear = function() {
            d2.clear(), f2.clear();
          }, t.getNodeId = function(e3) {
            return f2.get(e3);
          }, t.wrap = v, t.getChildNodes = m, t.getPreviousNode = function(e3) {
            var t2 = e3.previousSibling;
            if (t2) {
              for (; !b(t2) && t2.previousSibling; )
                t2 = t2.previousSibling;
              return t2 && b(t2) ? t2 : void 0;
            }
          }, t.filterNodes = g, t.isValidNode = b, t.getNode = function(e3) {
            var t2 = d2.get(e3);
            if (!t2 || 10 === t2.nodeType)
              throw u2.createErr(-32e3, "Could not find node with given id");
            return t2;
          };
        }, 7923: function(e2, t, n2) {
          var o = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.getProperties = t.releaseObj = t.getObj = t.wrap = t.clear = void 0;
          var r2 = o(n2(3367)), i = o(n2(6156)), a = o(n2(6472)), s = o(n2(4777)), c = o(n2(9833)), l = o(n2(2749)), u2 = o(n2(3708)), d2 = o(n2(7470)), f2 = o(n2(1754)), h = o(n2(3085)), p = o(n2(2533)), v = o(n2(300)), m = o(n2(1116)), g = o(n2(8740)), b = o(n2(415)), y = o(n2(9804)), w = o(n2(6257)), _ = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map(), C = 1;
          function S(e3, t2) {
            var n3 = x.get(e3);
            return n3 || (n3 = JSON.stringify({ injectedScriptId: 0, id: C++ }), x.set(e3, n3), _.set(n3, e3), A.set(n3, t2), n3);
          }
          function E(e3, t2) {
            var n3 = void 0 === t2 ? {} : t2, o2 = n3.generatePreview, r3 = void 0 !== o2 && o2, i2 = n3.self, a2 = void 0 === i2 ? e3 : i2, s2 = z(e3), c2 = s2.type, l2 = s2.subtype;
            return "undefined" === c2 ? s2 : "string" === c2 || "boolean" === c2 || "null" === l2 ? (s2.value = e3, s2) : (s2.description = j(e3, a2), "number" === c2 ? (s2.value = e3, s2) : "symbol" === c2 ? (s2.objectId = S(e3, a2), s2) : (s2.className = "function" === c2 ? "Function" : "array" === l2 ? "Array" : "map" === l2 ? "Map" : "set" === l2 ? "Set" : "regexp" === l2 ? "RegExp" : "error" === l2 ? e3.name : h.default(e3, false), r3 && (s2.preview = N(e3, a2)), s2.objectId = S(e3, a2), s2));
          }
          function O(e3) {
            return _.get(e3);
          }
          t.clear = function() {
            _.clear(), x.clear(), A.clear();
          }, t.wrap = E, t.getObj = O, t.releaseObj = function(e3) {
            var t2 = O(e3);
            x.delete(t2), A.delete(e3), _.delete(e3);
          }, t.getProperties = function(e3) {
            for (var t2 = e3.accessorPropertiesOnly, n3 = e3.objectId, o2 = e3.ownProperties, i2 = e3.generatePreview, a2 = [], c2 = { prototype: !o2, unenumerable: true, symbol: !t2 }, l2 = _.get(n3), f3 = A.get(n3), h2 = m.default(l2, c2), p2 = b.default(l2), v2 = 0, x2 = h2.length; v2 < x2; v2++) {
              var C2 = h2[v2], S2 = void 0;
              try {
                S2 = f3[C2];
              } catch (e4) {
              }
              var T2 = { name: r2.default(C2), isOwn: w.default(f3, C2) }, N2 = Object.getOwnPropertyDescriptor(l2, C2);
              if (!N2 && p2 && (N2 = Object.getOwnPropertyDescriptor(p2, C2)), N2) {
                if (t2 && !N2.get && !N2.set)
                  continue;
                T2.configurable = N2.configurable, T2.enumerable = N2.enumerable, T2.writable = N2.writable, N2.get && (T2.get = E(N2.get)), N2.set && (T2.set = E(N2.set));
              }
              p2 && w.default(p2, C2) && T2.enumerable && (T2.isOwn = true);
              var M2 = true;
              !T2.isOwn && T2.get && (M2 = false), M2 && (y.default(C2) ? (T2.symbol = E(C2), T2.value = { type: "undefined" }) : T2.value = E(S2, { generatePreview: i2 })), t2 && s.default(S2) && g.default(S2) || a2.push(T2);
            }
            if (!p2 || o2 || Z(l2) || a2.push({ name: "__proto__", configurable: true, enumerable: false, isOwn: w.default(l2, "__proto__"), value: E(p2, { self: f3 }), writable: false }), t2)
              return { result: a2 };
            var j2 = [];
            if (p2 && !Z(l2) && j2.push({ name: "[[Prototype]]", value: E(p2, { self: f3 }) }), u2.default(l2) || d2.default(l2)) {
              var z2 = function(e4) {
                var t3 = k.get(e4), n4 = t3 ? O(t3) : [], o3 = e4.entries(), r3 = o3.next().value;
                for (; r3; )
                  u2.default(e4) ? n4.push(new R(r3[1], r3[0])) : n4.push(new R(r3[1])), r3 = o3.next().value;
                return n4;
              }(l2);
              j2.push({ name: "[[Entries]]", value: E(z2) });
            }
            return { internalProperties: j2, result: a2 };
          };
          var T = 5;
          function N(e3, t2) {
            void 0 === t2 && (t2 = e3);
            var n3 = z(e3);
            n3.description = j(e3, t2);
            var o2 = false, r3 = [], i2 = p.default(e3), a2 = i2.length;
            a2 > T && (a2 = T, o2 = true);
            for (var s2 = 0; s2 < a2; s2++) {
              var c2 = i2[s2];
              r3.push(M(c2, t2[c2]));
            }
            if (n3.properties = r3, u2.default(e3)) {
              for (var l2 = [], f3 = (s2 = 0, e3.keys()), h2 = f3.next().value; h2; ) {
                if (s2 > T) {
                  o2 = true;
                  break;
                }
                l2.push({ key: N(h2), value: N(e3.get(h2)) }), s2++, h2 = f3.next().value;
              }
              n3.entries = l2;
            } else if (d2.default(e3)) {
              var v2 = [], m2 = (s2 = 0, e3.keys());
              for (h2 = m2.next().value; h2; ) {
                if (s2 > T) {
                  o2 = true;
                  break;
                }
                v2.push({ value: N(h2) }), s2++, h2 = m2.next().value;
              }
              n3.entries = v2;
            }
            return n3.overflow = o2, n3;
          }
          function M(e3, t2) {
            var n3 = z(t2);
            n3.name = e3;
            var o2, i2 = n3.subtype;
            return o2 = "object" === n3.type ? "null" === i2 ? "null" : "array" === i2 ? "Array(" + t2.length + ")" : "map" === i2 ? "Map(" + t2.size + ")" : "set" === i2 ? "Set(" + t2.size + ")" : h.default(t2, false) : r2.default(t2), n3.value = o2, n3;
          }
          function j(e3, t2) {
            void 0 === t2 && (t2 = e3);
            var n3 = z(e3), o2 = n3.type, i2 = n3.subtype;
            return "string" === o2 ? e3 : "number" === o2 || "symbol" === o2 ? r2.default(e3) : "function" === o2 ? v.default(e3) : "array" === i2 ? "Array(" + e3.length + ")" : "map" === i2 ? "Map(" + t2.size + ")" : "set" === i2 ? "Set(" + t2.size + ")" : "regexp" === i2 ? r2.default(e3) : "error" === i2 ? e3.stack : "internal#entry" === i2 ? e3.name ? '{"' + r2.default(e3.name) + '" => "' + r2.default(e3.value) + '"}' : '"' + r2.default(e3.value) + '"' : h.default(e3, false);
          }
          function z(e3) {
            var t2 = typeof e3, n3 = "object";
            if (e3 instanceof R)
              n3 = "internal#entry";
            else if (i.default(e3))
              n3 = "null";
            else if (a.default(e3))
              n3 = "array";
            else if (f2.default(e3))
              n3 = "regexp";
            else if (l.default(e3))
              n3 = "error";
            else if (u2.default(e3))
              n3 = "map";
            else if (d2.default(e3))
              n3 = "set";
            else
              try {
                c.default(e3) && (n3 = "node");
              } catch (e4) {
              }
            return { type: t2, subtype: n3 };
          }
          var R = function(e3, t2) {
            t2 && (this.name = t2), this.value = e3;
          };
          function Z(e3) {
            return e3 instanceof R || !!(e3[0] && e3[0] instanceof R);
          }
        }, 2636: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                t3.hasOwnProperty(n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.fullUrl = t.FetchRequest = t.XhrRequest = void 0;
          var a = i(n2(1443)), s = i(n2(6768)), c = i(n2(9702)), l = i(n2(6334)), u2 = i(n2(8887)), d2 = i(n2(4331)), f2 = i(n2(8847)), h = i(n2(3783)), p = i(n2(6930)), v = i(n2(3875)), m = n2(316), g = function(e3) {
            function t2(t3, n3, o2) {
              var r3 = e3.call(this) || this;
              return r3.xhr = t3, r3.reqHeaders = {}, r3.method = n3, r3.url = k(o2), r3.id = m.createId(), r3;
            }
            return r2(t2, e3), t2.prototype.toJSON = function() {
              return { method: this.method, url: this.url, id: this.id };
            }, t2.prototype.handleSend = function(e4) {
              s.default(e4) || (e4 = ""), e4 = { name: C(this.url), url: this.url, data: e4, time: f2.default(), reqHeaders: this.reqHeaders, method: this.method }, u2.default(this.reqHeaders) || (e4.reqHeaders = this.reqHeaders), this.emit("send", this.id, e4);
            }, t2.prototype.handleReqHeadersSet = function(e4, t3) {
              e4 && t3 && (this.reqHeaders[e4] = t3);
            }, t2.prototype.handleHeadersReceived = function() {
              var e4 = this.xhr, t3 = S(e4.getResponseHeader("Content-Type") || "");
              this.emit("headersReceived", this.id, { type: t3.type, subType: t3.subType, size: x(e4, true, this.url), time: f2.default(), resHeaders: _(e4) });
            }, t2.prototype.handleDone = function() {
              var e4, t3, n3, o2 = this, r3 = this.xhr, i2 = r3.responseType, a2 = "", s2 = function() {
                o2.emit("done", o2.id, { status: r3.status, size: x(r3, false, o2.url), time: f2.default(), resTxt: a2 });
              }, c2 = S(r3.getResponseHeader("Content-Type") || "");
              "blob" !== i2 || "text" !== c2.type && "javascript" !== c2.subType && "json" !== c2.subType ? ("" !== i2 && "text" !== i2 || (a2 = r3.responseText), "json" === i2 && (a2 = JSON.stringify(r3.response)), s2()) : (e4 = r3.response, t3 = function(e5, t4) {
                t4 && (a2 = t4), s2();
              }, (n3 = new FileReader()).onload = function() {
                t3(null, n3.result);
              }, n3.onerror = function(e5) {
                t3(e5);
              }, n3.readAsText(e4));
            }, t2;
          }(a.default);
          t.XhrRequest = g;
          var b = function(e3) {
            function t2(t3, n3) {
              void 0 === n3 && (n3 = {});
              var o2 = e3.call(this) || this;
              return t3 instanceof window.Request && (t3 = t3.url), o2.url = k(t3), o2.id = m.createId(), o2.options = n3, o2.reqHeaders = n3.headers || {}, o2.method = n3.method || "GET", o2;
            }
            return r2(t2, e3), t2.prototype.send = function(e4) {
              var t3 = this, n3 = this.options, o2 = s.default(n3.body) ? n3.body : "";
              this.emit("send", this.id, { name: C(this.url), url: this.url, data: o2, reqHeaders: this.reqHeaders, time: f2.default(), method: this.method }), e4.then(function(e5) {
                var n4 = S((e5 = e5.clone()).headers.get("Content-Type"));
                return e5.text().then(function(o3) {
                  var r3 = { type: n4.type, subType: n4.subType, time: f2.default(), size: y(e5, o3), resTxt: o3, resHeaders: w(e5), status: e5.status };
                  u2.default(t3.reqHeaders) || (r3.reqHeaders = t3.reqHeaders), t3.emit("done", t3.id, r3);
                }), e5;
              });
            }, t2;
          }(a.default);
          function y(e3, t2) {
            var n3 = e3.headers.get("Content-length");
            return n3 ? v.default(n3) : O(t2);
          }
          function w(e3) {
            var t2 = {};
            return e3.headers.forEach(function(e4, n3) {
              return t2[n3] = e4;
            }), t2;
          }
          function _(e3) {
            var t2 = e3.getAllResponseHeaders().split("\n"), n3 = {};
            return h.default(t2, function(e4) {
              if ("" !== (e4 = d2.default(e4))) {
                var t3 = e4.split(":", 2), o2 = t3[0], r3 = t3[1];
                n3[o2] = d2.default(r3);
              }
            }), n3;
          }
          function x(e3, t2, n3) {
            var o2 = 0;
            function r3() {
              if (!t2) {
                var n4 = e3.responseType, r4 = "";
                "" !== n4 && "text" !== n4 || (r4 = e3.responseText), r4 && (o2 = O(r4));
              }
            }
            if (function(e4) {
              return !p.default(e4, E);
            }(n3))
              r3();
            else
              try {
                o2 = v.default(e3.getResponseHeader("Content-Length"));
              } catch (e4) {
                r3();
              }
            return 0 === o2 && r3(), o2;
          }
          t.FetchRequest = b;
          var A = document.createElement("a");
          function k(e3) {
            return A.href = e3, A.protocol + "//" + A.host + A.pathname + A.search + A.hash;
          }
          function C(e3) {
            var t2 = c.default(e3.split("/"));
            (t2.indexOf("?") > -1 && (t2 = d2.default(t2.split("?")[0])), "" === t2) && (t2 = new l.default(e3).hostname);
            return t2;
          }
          function S(e3) {
            if (!e3)
              return { type: "unknown", subType: "unknown" };
            var t2 = e3.split(";")[0].split("/");
            return { type: t2[0], subType: c.default(t2) };
          }
          t.fullUrl = k;
          var E = window.location.origin;
          function O(e3) {
            var t2 = encodeURIComponent(e3).match(/%[89ABab]/g);
            return e3.length + (t2 ? t2.length : 0);
          }
        }, 316: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                t3.hasOwnProperty(n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__awaiter || function(e3, t2, n3, o2) {
            return new (n3 || (n3 = Promise))(function(r3, i2) {
              function a2(e4) {
                try {
                  c2(o2.next(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function s2(e4) {
                try {
                  c2(o2.throw(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function c2(e4) {
                var t3;
                e4.done ? r3(e4.value) : (t3 = e4.value, t3 instanceof n3 ? t3 : new n3(function(e5) {
                  e5(t3);
                })).then(a2, s2);
              }
              c2((o2 = o2.apply(e3, t2 || [])).next());
            });
          }, a = this && this.__generator || function(e3, t2) {
            var n3, o2, r3, i2, a2 = { label: 0, sent: function() {
              if (1 & r3[0])
                throw r3[1];
              return r3[1];
            }, trys: [], ops: [] };
            return i2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
              return this;
            }), i2;
            function s2(i3) {
              return function(s3) {
                return function(i4) {
                  if (n3)
                    throw new TypeError("Generator is already executing.");
                  for (; a2; )
                    try {
                      if (n3 = 1, o2 && (r3 = 2 & i4[0] ? o2.return : i4[0] ? o2.throw || ((r3 = o2.return) && r3.call(o2), 0) : o2.next) && !(r3 = r3.call(o2, i4[1])).done)
                        return r3;
                      switch (o2 = 0, r3 && (i4 = [2 & i4[0], r3.value]), i4[0]) {
                        case 0:
                        case 1:
                          r3 = i4;
                          break;
                        case 4:
                          return a2.label++, { value: i4[1], done: false };
                        case 5:
                          a2.label++, o2 = i4[1], i4 = [0];
                          continue;
                        case 7:
                          i4 = a2.ops.pop(), a2.trys.pop();
                          continue;
                        default:
                          if (!(r3 = a2.trys, (r3 = r3.length > 0 && r3[r3.length - 1]) || 6 !== i4[0] && 2 !== i4[0])) {
                            a2 = 0;
                            continue;
                          }
                          if (3 === i4[0] && (!r3 || i4[1] > r3[0] && i4[1] < r3[3])) {
                            a2.label = i4[1];
                            break;
                          }
                          if (6 === i4[0] && a2.label < r3[1]) {
                            a2.label = r3[1], r3 = i4;
                            break;
                          }
                          if (r3 && a2.label < r3[2]) {
                            a2.label = r3[2], a2.ops.push(i4);
                            break;
                          }
                          r3[2] && a2.ops.pop(), a2.trys.pop();
                          continue;
                      }
                      i4 = t2.call(e3, a2);
                    } catch (e4) {
                      i4 = [6, e4], o2 = 0;
                    } finally {
                      n3 = r3 = 0;
                    }
                  if (5 & i4[0])
                    throw i4[1];
                  return { value: i4[0] ? i4[1] : void 0, done: true };
                }([i3, s3]);
              };
            }
          }, s = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.getBase64Content = t.getTextContent = t.getOrigin = t.getUrl = t.createErr = t.ErrorWithCode = t.getAbsoluteUrl = t.createId = void 0;
          var c = s(n2(5229)), l = s(n2(1216)), u2 = s(n2(6930)), d2 = s(n2(6334)), f2 = s(n2(1792)), h = s(n2(6610)), p = l.default(1e3, 9999) + ".";
          t.createId = function() {
            return c.default(p);
          }, t.getAbsoluteUrl = function(e3) {
            var t2 = document.createElement("a");
            return t2.href = e3, t2.href;
          };
          var v = function(e3) {
            function t2(t3, n3) {
              var o2 = this.constructor, r3 = e3.call(this, n3) || this;
              return r3.code = t3, Object.setPrototypeOf(r3, o2.prototype), r3;
            }
            return r2(t2, e3), t2;
          }(Error);
          function m(e3, t2, n3) {
            return void 0 === n3 && (n3 = ""), i(this, void 0, void 0, function() {
              var o2;
              return a(this, function(r3) {
                switch (r3.label) {
                  case 0:
                    return r3.trys.push([0, 2, , 8]), (o2 = new d2.default(e3)).setQuery("__chobitsu-hide__", "true"), [4, h.default.get(o2.toString(), { responseType: t2 })];
                  case 1:
                    return [2, r3.sent().data];
                  case 2:
                    if (r3.sent(), !n3)
                      return [3, 7];
                    r3.label = 3;
                  case 3:
                    return r3.trys.push([3, 6, , 7]), [4, h.default.get(g(n3, e3), { responseType: t2 })];
                  case 4:
                    return [4, r3.sent().data];
                  case 5:
                    return [2, r3.sent()];
                  case 6:
                    return r3.sent(), [3, 7];
                  case 7:
                    return [3, 8];
                  case 8:
                    return [2, "arraybuffer" === t2 ? new ArrayBuffer(0) : ""];
                }
              });
            });
          }
          function g(e3, t2) {
            var n3 = new d2.default(e3);
            return n3.setQuery("url", t2), n3.setQuery("__chobitsu-hide__", "true"), n3.toString();
          }
          t.ErrorWithCode = v, t.createErr = function(e3, t2) {
            return new v(e3, t2);
          }, t.getUrl = function() {
            var e3 = location.href;
            return u2.default(e3, "about:") ? parent.location.href : e3;
          }, t.getOrigin = function() {
            var e3 = location.origin;
            return "null" === e3 ? parent.location.origin : e3;
          }, t.getTextContent = function(e3, t2) {
            return void 0 === t2 && (t2 = ""), i(this, void 0, void 0, function() {
              return a(this, function(n3) {
                switch (n3.label) {
                  case 0:
                    return [4, m(e3, "text", t2)];
                  case 1:
                    return [2, n3.sent()];
                }
              });
            });
          }, t.getBase64Content = function(e3, t2) {
            return void 0 === t2 && (t2 = ""), i(this, void 0, void 0, function() {
              var n3;
              return a(this, function(o2) {
                switch (o2.label) {
                  case 0:
                    return n3 = f2.default, [4, m(e3, "arraybuffer", t2)];
                  case 1:
                    return [2, n3.apply(void 0, [o2.sent(), "base64"])];
                }
              });
            });
          };
        }, 3191: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "#_console{padding-top:40px;padding-bottom:24px;width:100%;height:100%}#_console._js-input-hidden{padding-bottom:0}#_console ._control{position:absolute;width:100%;height:40px;left:0;top:0;cursor:default;font-size:0;background:var(--darker-background);color:var(--primary);line-height:20px;border-bottom:1px solid var(--border);padding:10px 10px 10px 35px}#_console ._control [class*=' _icon-'],#_console ._control [class^='_icon-']{display:inline-block;padding:10px;font-size:16px;position:absolute;top:0;cursor:pointer;transition:color .3s}#_console ._control [class*=' _icon-']._active,#_console ._control [class*=' _icon-']:active,#_console ._control [class^='_icon-']._active,#_console ._control [class^='_icon-']:active{color:var(--accent)}#_console ._control ._icon-clear{padding-right:0;left:0}#_console ._control ._icon-copy{right:0}#_console ._control ._icon-filter{right:23px}#_console ._control ._level{cursor:pointer;font-size:12px;height:20px;display:inline-block;margin:0 2px;padding:0 4px;line-height:20px;transition:background-color .3s,color .3s}#_console ._control ._level._active{background:var(--highlight);color:var(--select-foreground)}#_console ._control ._filter-text{white-space:nowrap;position:absolute;line-height:20px;max-width:80px;overflow:hidden;right:55px;font-size:14px;text-overflow:ellipsis}#_console ._js-input{pointer-events:none;position:absolute;z-index:100;left:0;bottom:0;width:100%;border-top:1px solid var(--border);height:24px}#_console ._js-input ._icon-arrow-right{line-height:23px;color:var(--accent);position:absolute;left:10px;top:0;z-index:10}#_console ._js-input._active{height:100%;padding-top:40px;padding-bottom:40px;border-top:none}#_console ._js-input._active ._icon-arrow-right{display:none}#_console ._js-input._active textarea{overflow:auto;padding-left:10px}#_console ._js-input ._buttons{display:none;position:absolute;left:0;bottom:0;width:100%;height:40px;color:var(--primary);background:var(--darker-background);font-size:12px;border-top:1px solid var(--border)}#_console ._js-input ._buttons ._button{pointer-events:all;cursor:pointer;flex:1;text-align:center;border-right:1px solid var(--border);height:40px;line-height:40px;transition:background-color .3s,color .3s}#_console ._js-input ._buttons ._button:last-child{border-right:none}#_console ._js-input ._buttons ._button:active{color:var(--select-foreground);background:var(--highlight)}#_console ._js-input textarea{overflow:hidden;pointer-events:all;padding:3px 10px;padding-left:25px;outline:0;border:none;font-size:14px;width:100%;height:100%;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;resize:none;color:var(--primary);background:var(--background)}._safe-area #_console{padding-bottom:calc(24px + env(safe-area-inset-bottom))}._safe-area #_console._js-input-hidden{padding-bottom:0}._safe-area #_console ._js-input{height:calc(24px + env(safe-area-inset-bottom))}._safe-area #_console ._js-input._active{height:100%;padding-bottom:calc(40px + env(safe-area-inset-bottom))}._safe-area #_console ._js-input ._buttons{height:calc(40px + env(safe-area-inset-bottom))}._safe-area #_console ._js-input ._buttons ._button{height:calc(40px + env(safe-area-inset-bottom))}", ""]), e2.exports = t;
        }, 13: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "._dev-tools{position:absolute;width:100%;height:100%;left:0;bottom:0;background:var(--background);z-index:500;display:none;padding-top:40px!important;opacity:0;transition:opacity .3s;border-top:1px solid var(--border)}._dev-tools ._resizer{position:absolute;width:100%;touch-action:none;left:0;top:-8px;cursor:row-resize;z-index:120}._dev-tools ._tools{overflow:auto;-webkit-overflow-scrolling:touch;height:100%;width:100%;position:relative}._dev-tools ._tools ._tool{position:absolute;width:100%;height:100%;left:0;top:0;overflow:hidden;display:none}", ""]), e2.exports = t;
        }, 5896: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "#_elements ._elements{position:absolute;width:100%;height:100%;left:0;top:0;padding-top:40px;padding-bottom:24px;font-size:14px}#_elements ._control{position:absolute;width:100%;height:40px;left:0;top:0;cursor:default;font-size:0;background:var(--darker-background);color:var(--primary);line-height:20px;border-bottom:1px solid var(--border);padding:10px 0}#_elements ._control [class*=' _icon-'],#_elements ._control [class^='_icon-']{display:inline-block;padding:10px;font-size:16px;position:absolute;top:0;cursor:pointer;transition:color .3s}#_elements ._control [class*=' _icon-']._active,#_elements ._control [class*=' _icon-']:active,#_elements ._control [class^='_icon-']._active,#_elements ._control [class^='_icon-']:active{color:var(--accent)}#_elements ._control ._icon-eye{right:0}#_elements ._control ._icon-copy{right:23px}#_elements ._control ._icon-delete{right:46px}#_elements ._dom-viewer-container{overflow-y:auto;-webkit-overflow-scrolling:touch;height:100%;padding:5px 0}#_elements ._crumbs{position:absolute;width:100%;height:24px;left:0;top:0;top:initial;line-height:24px;bottom:0;border-top:1px solid var(--border);background:var(--darker-background);color:var(--primary);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#_elements ._crumbs li{cursor:pointer;padding:0 7px;display:inline-block}#_elements ._crumbs li:hover,#_elements ._crumbs li:last-child{background:var(--highlight)}#_elements ._crumbs ._icon-arrow-right{font-size:12px;position:relative;top:1px}#_elements ._detail{position:absolute;width:100%;height:100%;left:0;top:0;z-index:10;padding-top:40px;display:none;background:var(--background)}#_elements ._detail ._control{padding:10px 35px}#_elements ._detail ._control ._element-name{font-size:12px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%;display:inline-block}#_elements ._detail ._control ._icon-arrow-left{left:0}#_elements ._detail ._control ._icon-refresh{right:0}#_elements ._detail ._element{overflow-y:auto;-webkit-overflow-scrolling:touch;height:100%}#_elements ._section{border-bottom:1px solid var(--border);color:var(--foreground);margin:10px 0}#_elements ._section h2{color:var(--primary);background:var(--darker-background);border-top:1px solid var(--border);padding:10px;line-height:18px;font-size:14px;transition:background-color .3s}#_elements ._section h2 ._btn{margin-left:5px;float:right;color:var(--primary);width:18px;height:18px;font-size:16px;cursor:pointer;transition:color .3s}#_elements ._section h2 ._btn._filter-text{width:auto;max-width:80px;font-size:14px;overflow:hidden;font-weight:400;text-overflow:ellipsis;display:inline-block}#_elements ._section h2 ._btn:active{color:var(--accent)}#_elements ._section h2 ._btn._btn-disabled{color:inherit!important;cursor:default!important;pointer-events:none;opacity:.5}#_elements ._section h2 ._btn._btn-disabled *{pointer-events:none}#_elements ._section h2._active-effect{cursor:pointer}#_elements ._section h2._active-effect:active{background:var(--highlight);color:var(--select-foreground)}#_elements ._attributes{font-size:12px}#_elements ._attributes a{color:var(--link-color)}#_elements ._attributes ._table-wrapper{overflow-x:auto;-webkit-overflow-scrolling:touch}#_elements ._attributes table td{padding:5px 10px}#_elements ._text-content{background:#fff}#_elements ._text-content ._content{overflow-x:auto;-webkit-overflow-scrolling:touch;padding:10px}#_elements ._style-color{position:relative;top:1px;width:10px;height:10px;border-radius:50%;margin-right:2px;border:1px solid var(--border);display:inline-block}#_elements ._box-model{overflow-x:auto;-webkit-overflow-scrolling:touch;padding:10px;text-align:center;border-bottom:1px solid var(--color)}#_elements ._computed-style{font-size:12px}#_elements ._computed-style a{color:var(--link-color)}#_elements ._computed-style ._table-wrapper{overflow-y:auto;-webkit-overflow-scrolling:touch;max-height:200px;border-top:1px solid var(--border)}#_elements ._computed-style table td{padding:5px 10px}#_elements ._computed-style table td._key{white-space:nowrap;color:var(--var-color)}#_elements ._styles{font-size:12px}#_elements ._styles ._style-wrapper{padding:10px}#_elements ._styles ._style-wrapper ._style-rules{border:1px solid var(--border);padding:10px;margin-bottom:10px}#_elements ._styles ._style-wrapper ._style-rules ._rule{padding-left:2em;word-break:break-all}#_elements ._styles ._style-wrapper ._style-rules ._rule a{color:var(--link-color)}#_elements ._styles ._style-wrapper ._style-rules ._rule span{color:var(--var-color)}#_elements ._styles ._style-wrapper ._style-rules:last-child{margin-bottom:0}#_elements ._listeners{font-size:12px}#_elements ._listeners ._listener-wrapper{padding:10px}#_elements ._listeners ._listener-wrapper ._listener{margin-bottom:10px;overflow:hidden;border:1px solid var(--border)}#_elements ._listeners ._listener-wrapper ._listener ._listener-type{padding:10px;background:var(--darker-background);color:var(--primary)}#_elements ._listeners ._listener-wrapper ._listener ._listener-content li{overflow-x:auto;-webkit-overflow-scrolling:touch;padding:10px;border-top:none}._safe-area #_elements ._elements{padding-bottom:calc(24px + env(safe-area-inset-bottom))}._safe-area #_elements ._crumbs{height:calc(24px + env(safe-area-inset-bottom))}._safe-area #_elements ._element{padding-bottom:calc(0px + env(safe-area-inset-bottom))}@media screen and (min-width:680px){#_elements ._elements{width:50%}#_elements ._elements ._control ._icon-eye{display:none}#_elements ._elements ._control ._icon-copy{right:0}#_elements ._elements ._control ._icon-delete{right:23px}#_elements ._detail{width:50%;left:initial;right:0;border-left:1px solid var(--border)}#_elements ._detail ._control{padding-left:10px}#_elements ._detail ._control ._icon-arrow-left{display:none}}", ""]), e2.exports = t;
        }, 9195: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "._container ._entry-btn{touch-action:none;width:40px;height:40px;display:flex;background:#000;opacity:.3;border-radius:10px;position:relative;z-index:1000;transition:opacity .3s;color:#fff;font-size:25px;align-items:center;justify-content:center}._container ._entry-btn._active,._container ._entry-btn:active{opacity:.8}", ""]), e2.exports = t;
        }, 879: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "#_info{overflow-y:auto;-webkit-overflow-scrolling:touch}#_info li{margin:10px;border:1px solid var(--border)}#_info li ._content,#_info li ._title{padding:10px}#_info li ._title{position:relative;padding-bottom:0;color:var(--accent)}#_info li ._title ._icon-copy{position:absolute;right:10px;top:14px;color:var(--primary);cursor:pointer;transition:color .3s}#_info li ._title ._icon-copy:active{color:var(--accent)}#_info li ._content{margin:0;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;color:var(--foreground);font-size:12px;word-break:break-all}#_info li ._content table{width:100%;border-collapse:collapse}#_info li ._content table td,#_info li ._content table th{border:1px solid var(--border);padding:10px}#_info li ._content *{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}#_info li ._content a{color:var(--link-color)}#_info li ._device-key,#_info li ._system-key{width:100px}._safe-area #_info{padding-bottom:calc(10px + env(safe-area-inset-bottom))}", ""]), e2.exports = t;
        }, 3180: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "#_network ._network{position:absolute;width:100%;height:100%;left:0;top:0;padding-top:39px}#_network ._control{position:absolute;width:100%;height:40px;left:0;top:0;cursor:default;font-size:0;background:var(--darker-background);color:var(--primary);line-height:20px;border-bottom:1px solid var(--border);padding:10px;border-bottom:none}#_network ._control [class*=' _icon-'],#_network ._control [class^='_icon-']{display:inline-block;padding:10px;font-size:16px;position:absolute;top:0;cursor:pointer;transition:color .3s}#_network ._control [class*=' _icon-']._active,#_network ._control [class*=' _icon-']:active,#_network ._control [class^='_icon-']._active,#_network ._control [class^='_icon-']:active{color:var(--accent)}#_network ._control ._title{font-size:14px}#_network ._control ._icon-clear{left:23px}#_network ._control ._icon-eye{right:0}#_network ._control ._icon-copy{right:23px}#_network ._control ._icon-filter{right:46px}#_network ._control ._filter-text{white-space:nowrap;position:absolute;line-height:20px;max-width:80px;overflow:hidden;right:88px;font-size:14px;text-overflow:ellipsis}#_network ._control ._icon-record{left:0}#_network ._control ._icon-record._recording{color:var(--console-error-foreground);text-shadow:0 0 4px var(--console-error-foreground)}#_network ._request-error{color:var(--console-error-foreground)}#_network .luna-data-grid:focus .luna-data-grid-data-container ._request-error.luna-data-grid-selected{background:var(--console-error-background)}#_network .luna-data-grid{border-left:none;border-right:none}#_network ._detail{position:absolute;width:100%;height:100%;left:0;top:0;z-index:10;display:none;padding-top:40px;background:var(--background)}#_network ._detail ._control{padding:10px 35px;border-bottom:1px solid var(--border)}#_network ._detail ._control ._url{font-size:12px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%;display:inline-block}#_network ._detail ._control ._icon-arrow-left{left:0}#_network ._detail ._control ._icon-delete{left:0;display:none}#_network ._detail ._control ._icon-copy{right:0}#_network ._detail ._http{overflow-y:auto;-webkit-overflow-scrolling:touch;height:100%}#_network ._detail ._http ._section{border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-top:10px;margin-bottom:10px}#_network ._detail ._http ._section h2{background:var(--darker-background);color:var(--primary);padding:10px;line-height:18px;font-size:14px}#_network ._detail ._http ._section table{color:var(--foreground)}#_network ._detail ._http ._section table *{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}#_network ._detail ._http ._section table td{font-size:12px;padding:5px 10px;word-break:break-all}#_network ._detail ._http ._section table ._key{white-space:nowrap;font-weight:700;color:var(--accent)}#_network ._detail ._http ._data,#_network ._detail ._http ._response{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:10px;font-size:12px;margin:10px 0;white-space:pre-wrap;border-top:1px solid var(--border);color:var(--foreground);border-bottom:1px solid var(--border)}._safe-area #_network ._http{padding-bottom:calc(0px + env(safe-area-inset-bottom))}@media screen and (min-width:680px){#_network ._network ._control ._icon-eye{display:none}#_network ._network ._control ._icon-copy{right:0}#_network ._network ._control ._icon-filter{right:23px}#_network ._network ._control ._filter-text{right:55px}#_network ._detail{width:50%;left:initial;right:0;border-left:1px solid var(--border)}#_network ._detail ._control ._icon-arrow-left{display:none}#_network ._detail ._control ._icon-delete{display:block}}", ""]), e2.exports = t;
        }, 2488: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "#_resources{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px;font-size:14px}#_resources ._section{margin-bottom:10px;overflow:hidden;border:1px solid var(--border)}#_resources ._section._warn{border:1px solid var(--console-warn-border)}#_resources ._section._warn ._title{background:var(--console-warn-background);color:var(--console-warn-foreground)}#_resources ._section._danger{border:1px solid var(--console-error-border)}#_resources ._section._danger ._title{background:var(--console-error-background);color:var(--console-error-foreground)}#_resources ._section._cookie,#_resources ._section._local-storage,#_resources ._section._session-storage{border:none}#_resources ._section._cookie ._title,#_resources ._section._local-storage ._title,#_resources ._section._session-storage ._title{border:1px solid var(--border);border-bottom:none}#_resources ._title{padding:10px;line-height:18px;color:var(--primary);background:var(--darker-background)}#_resources ._title ._btn{margin-left:5px;float:right;color:var(--primary);width:18px;height:18px;font-size:16px;cursor:pointer;transition:color .3s}#_resources ._title ._btn._filter-text{width:auto;max-width:80px;font-size:14px;overflow:hidden;font-weight:400;text-overflow:ellipsis;display:inline-block}#_resources ._title ._btn:active{color:var(--accent)}#_resources ._title ._btn._btn-disabled{color:inherit!important;cursor:default!important;pointer-events:none;opacity:.5}#_resources ._title ._btn._btn-disabled *{pointer-events:none}#_resources ._link-list{font-size:12px;color:var(--foreground)}#_resources ._link-list li{padding:10px;word-break:break-all}#_resources ._link-list li a{color:var(--link-color)!important}#_resources ._image-list{color:var(--foreground);font-size:12px;display:flex;flex-wrap:wrap;padding:10px!important}#_resources ._image-list:after{content:'';display:block;clear:both}#_resources ._image-list li{flex-grow:1;cursor:pointer;overflow-y:hidden}#_resources ._image-list li._image{height:100px;font-size:0}#_resources ._image-list li img{height:100px;min-width:100%;-o-object-fit:cover;object-fit:cover}._safe-area #_resources{padding-bottom:calc(10px + env(safe-area-inset-bottom))}", ""]), e2.exports = t;
        }, 8011: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "#_settings{overflow-y:auto;-webkit-overflow-scrolling:touch}._safe-area #_settings{padding-bottom:calc(0px + env(safe-area-inset-bottom))}", ""]), e2.exports = t;
        }, 5571: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "#_snippets{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px}#_snippets ._section{margin-bottom:10px;border:1px solid var(--border);overflow:hidden;cursor:pointer}#_snippets ._section:active ._name{background:var(--highlight);color:var(--select-foreground)}#_snippets ._section ._name{padding:10px;line-height:18px;color:var(--primary);background:var(--darker-background);transition:background-color .3s}#_snippets ._section ._name ._btn{margin-left:10px;float:right;text-align:center;width:18px;height:18px;font-size:12px}#_snippets ._section ._description{font-size:12px;color:var(--foreground);padding:10px;transition:background-color .3s}._safe-area #_snippets{padding-bottom:calc(10px + env(safe-area-inset-bottom))}", ""]), e2.exports = t;
        }, 7346: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "._search-highlight-block{display:inline}._search-highlight-block ._keyword{background:var(--console-warn-background);color:var(--console-warn-foreground)}", ""]), e2.exports = t;
        }, 1344: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "#_sources{font-size:0;overflow-y:auto;-webkit-overflow-scrolling:touch;color:var(--foreground)}#_sources ._code-wrapper,#_sources ._raw-wrapper{overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%;min-height:100%}#_sources ._code,#_sources ._raw{height:100%}#_sources ._code ._keyword,#_sources ._raw ._keyword{color:var(--keyword-color)}#_sources ._code ._comment,#_sources ._raw ._comment{color:var(--comment-color)}#_sources ._code ._number,#_sources ._raw ._number{color:var(--number-color)}#_sources ._code ._string,#_sources ._raw ._string{color:var(--string-color)}#_sources ._code ._operator,#_sources ._raw ._operator{color:var(--operator-color)}#_sources ._code[data-type=html] ._keyword,#_sources ._raw[data-type=html] ._keyword{color:var(--tag-name-color)}#_sources ._image{font-size:12px}#_sources ._image ._breadcrumb{background:var(--darker-background);color:var(--primary);-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;margin-bottom:10px;word-break:break-all;padding:10px;font-size:16px;min-height:40px;border-bottom:1px solid var(--border)}#_sources ._image ._img-container{text-align:center}#_sources ._image ._img-container img{max-width:100%}#_sources ._image ._img-info{text-align:center;margin:20px 0;color:var(--foreground)}#_sources ._json{padding:0 10px}#_sources ._json *{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}#_sources iframe{width:100%;height:100%}", ""]), e2.exports = t;
        }, 8020: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "._container a,._container abbr,._container acronym,._container address,._container applet,._container article,._container aside,._container audio,._container b,._container big,._container blockquote,._container canvas,._container caption,._container center,._container cite,._container code,._container dd,._container del,._container details,._container dfn,._container dl,._container dt,._container em,._container embed,._container fieldset,._container figcaption,._container figure,._container footer,._container form,._container h1,._container h2,._container h3,._container h4,._container h5,._container h6,._container header,._container hgroup,._container i,._container iframe,._container img,._container ins,._container kbd,._container label,._container legend,._container li,._container mark,._container menu,._container nav,._container object,._container ol,._container output,._container p,._container pre,._container q,._container ruby,._container s,._container samp,._container section,._container small,._container span,._container strike,._container strong,._container sub,._container summary,._container sup,._container table,._container tbody,._container td,._container tfoot,._container th,._container thead,._container time,._container tr,._container tt,._container u,._container ul,._container var,._container video{margin:0;padding:0;border:0;font-size:100%}._container article,._container aside,._container details,._container figcaption,._container figure,._container footer,._container header,._container hgroup,._container menu,._container nav,._container section{display:block}._container body{line-height:1}._container ol,._container ul{list-style:none}._container blockquote,._container q{quotes:none}._container blockquote:after,._container blockquote:before,._container q:after,._container q:before{content:'';content:none}._container table{border-collapse:collapse;border-spacing:0}", ""]), e2.exports = t;
        }, 8516: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, `.luna-console{background:var(--background)}.luna-console-header{color:var(--link-color);border-bottom-color:var(--border)}.luna-console-nesting-level{border-right-color:var(--border)}.luna-console-nesting-level::before{border-bottom-color:var(--border)}.luna-console-log-container.luna-console-selected .luna-console-log-item{background:var(--contrast)}.luna-console-log-container.luna-console-selected .luna-console-log-item:not(.luna-console-error):not(.luna-console-warn){border-color:var(--border)}.luna-console-log-item{border-bottom-color:var(--border);color:var(--foreground)}.luna-console-log-item a{color:var(--link-color)!important}.luna-console-log-item .luna-console-icon-container .luna-console-icon{color:var(--foreground)}.luna-console-log-item .luna-console-icon-container .luna-console-icon-error{color:#ef3842}.luna-console-log-item .luna-console-icon-container .luna-console-icon-warn{color:#e8a400}.luna-console-log-item .luna-console-count{color:var(--select-foreground);background:var(--highlight)}.luna-console-log-item.luna-console-warn{color:var(--console-warn-foreground);background:var(--console-warn-background);border-color:var(--console-warn-border)}.luna-console-log-item.luna-console-error{background:var(--console-error-background);color:var(--console-error-foreground);border-color:var(--console-error-border)}.luna-console-log-item.luna-console-error .luna-console-count{background:var(--console-error-foreground)}.luna-console-log-item .luna-console-code .luna-console-key{color:var(--var-color)}.luna-console-log-item .luna-console-code .luna-console-number{color:var(--number-color)}.luna-console-log-item .luna-console-code .luna-console-null{color:var(--operator-color)}.luna-console-log-item .luna-console-code .luna-console-string{color:var(--string-color)}.luna-console-log-item .luna-console-code .luna-console-boolean{color:var(--keyword-color)}.luna-console-log-item .luna-console-code .luna-console-special{color:var(--operator-color)}.luna-console-log-item .luna-console-code .luna-console-keyword{color:var(--keyword-color)}.luna-console-log-item .luna-console-code .luna-console-operator{color:var(--operator-color)}.luna-console-log-item .luna-console-code .luna-console-comment{color:var(--comment-color)}.luna-console-log-item .luna-console-log-content .luna-console-null,.luna-console-log-item .luna-console-log-content .luna-console-undefined{color:var(--operator-color)}.luna-console-log-item .luna-console-log-content .luna-console-number{color:var(--number-color)}.luna-console-log-item .luna-console-log-content .luna-console-boolean{color:var(--keyword-color)}.luna-console-log-item .luna-console-log-content .luna-console-regexp,.luna-console-log-item .luna-console-log-content .luna-console-symbol{color:var(--var-color)}.luna-console-preview .luna-console-key{color:var(--var-color)}.luna-console-preview .luna-console-number{color:var(--number-color)}.luna-console-preview .luna-console-null{color:var(--operator-color)}.luna-console-preview .luna-console-string{color:var(--string-color)}.luna-console-preview .luna-console-boolean{color:var(--keyword-color)}.luna-console-preview .luna-console-special{color:var(--operator-color)}.luna-console-preview .luna-console-keyword{color:var(--keyword-color)}.luna-console-preview .luna-console-operator{color:var(--operator-color)}.luna-console-preview .luna-console-comment{color:var(--comment-color)}.luna-object-viewer{color:var(--primary);font-size:12px!important}.luna-object-viewer-null{color:var(--operator-color)}.luna-object-viewer-regexp,.luna-object-viewer-string{color:var(--string-color)}.luna-object-viewer-number{color:var(--number-color)}.luna-object-viewer-boolean{color:var(--keyword-color)}.luna-object-viewer-special{color:var(--operator-color)}.luna-object-viewer-key,.luna-object-viewer-key-lighter{color:var(--var-color)}.luna-object-viewer-expanded:before{border-color:transparent;border-top-color:var(--foreground)}.luna-object-viewer-collapsed:before{border-top-color:transparent;border-left-color:var(--foreground)}.luna-notification{pointer-events:none!important;padding:10px;z-index:1000}.luna-notification-item{z-index:500;color:var(--foreground);background:var(--background);box-shadow:none;padding:5px 10px;border:1px solid var(--border)}.luna-notification-upper{margin-bottom:10px}.luna-notification-lower{margin-top:10px}.luna-data-grid{color:var(--foreground);background:var(--background);border-color:var(--border)}.luna-data-grid:focus .luna-data-grid-data-container .luna-data-grid-node.luna-data-grid-selected{background:var(--accent)}.luna-data-grid td,.luna-data-grid th{border-color:var(--border)}.luna-data-grid th{background:var(--darker-background)}.luna-data-grid th.luna-data-grid-sortable:active,.luna-data-grid th.luna-data-grid-sortable:hover{color:var(--select-foreground);background:var(--highlight)}.luna-data-grid .luna-data-grid-data-container .luna-data-grid-node.luna-data-grid-selected{background:var(--highlight)}.luna-data-grid .luna-data-grid-data-container tr:nth-child(even){background:var(--contrast)}.luna-dom-viewer{color:var(--foreground)}.luna-dom-viewer .luna-dom-viewer-html-tag,.luna-dom-viewer .luna-dom-viewer-tag-name{color:var(--tag-name-color)}.luna-dom-viewer .luna-dom-viewer-attribute-name{color:var(--attribute-name-color)}.luna-dom-viewer .luna-dom-viewer-attribute-value{color:var(--string-color)}.luna-dom-viewer .luna-dom-viewer-html-comment{color:var(--comment-color)}.luna-dom-viewer .luna-dom-viewer-tree-item:hover .luna-dom-viewer-selection{background:var(--contrast)}.luna-dom-viewer .luna-dom-viewer-tree-item.luna-dom-viewer-selected .luna-dom-viewer-selection{background:var(--highlight)}.luna-dom-viewer .luna-dom-viewer-tree-item.luna-dom-viewer-selected:focus .luna-dom-viewer-selection{background:var(--accent);opacity:.2}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-key{color:var(--var-color)}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-number{color:var(--number-color)}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-null{color:var(--operator-color)}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-string{color:var(--string-color)}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-boolean{color:var(--keyword-color)}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-special{color:var(--operator-color)}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-keyword{color:var(--keyword-color)}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-operator{color:var(--operator-color)}.luna-dom-viewer .luna-dom-viewer-text-node .luna-dom-viewer-comment{color:var(--comment-color)}.luna-dom-viewer-children{margin:0;padding-left:15px!important}.luna-modal{z-index:9999999}.luna-modal-body,.luna-modal-input{color:var(--foreground);background:var(--background)}.luna-modal-input{-webkit-user-select:text!important;-moz-user-select:text!important;-ms-user-select:text!important;user-select:text!important;border-color:var(--border)}.luna-modal-button-group .luna-modal-secondary{border-color:var(--border);color:var(--foreground);background:var(--background)}.luna-modal-button-group .luna-modal-primary{background:var(--accent)}.luna-modal-button-group .luna-modal-button:active::before{background:var(--accent)}.luna-tab{position:absolute;left:0;top:0;color:var(--foreground);background:var(--darker-background)}.luna-tab-tabs-container{border-color:var(--border)}.luna-tab-item.luna-tab-selected,.luna-tab-item:hover{background:var(--highlight);color:var(--select-foreground)}.luna-tab-slider{background:var(--accent)}.luna-text-viewer{color:var(--foreground);border:none;border-bottom:1px solid var(--border);background:var(--background);font-size:12px}.luna-text-viewer .luna-text-viewer-line-text{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.luna-text-viewer .luna-text-viewer-line-text *{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.luna-text-viewer .luna-text-viewer-copy,.luna-text-viewer .luna-text-viewer-line-number{border-color:var(--border)}.luna-text-viewer .luna-text-viewer-copy .luna-text-viewer-icon-check{color:var(--accent)}.luna-text-viewer .luna-text-viewer-copy{background-color:var(--background)}.luna-setting{color:var(--foreground);background:var(--background)}.luna-setting-item.luna-setting-selected,.luna-setting-item:hover{background:var(--darker-background)}.luna-setting-item.luna-setting-selected:focus{outline:0}.luna-setting-item-title{font-size:14px}.luna-setting-item-separator{border-color:var(--border)}.luna-setting-item-checkbox input{border-color:var(--border)}.luna-setting-item-checkbox input:checked{background-color:var(--accent);border-color:var(--accent)}.luna-setting-item-select .luna-setting-select select{color:var(--foreground);border-color:var(--border);background:var(--background)}.luna-setting-item-select .luna-setting-select:after{border-top-color:var(--foreground)}.luna-setting-item-button button{color:var(--accent);background:var(--background);border-color:var(--border)}.luna-setting-item-button button:active,.luna-setting-item-button button:hover{background:var(--darker-background)}.luna-setting-item-button button:active{border:1px solid var(--accent)}.luna-setting-item-number .luna-setting-range-container .luna-setting-range-track .luna-setting-range-track-bar{background:var(--border)}.luna-setting-item-number .luna-setting-range-container .luna-setting-range-track .luna-setting-range-track-bar .luna-setting-range-track-progress{background:var(--accent)}.luna-setting-item-number .luna-setting-range-container input::-webkit-slider-thumb{border-color:var(--border);background:radial-gradient(circle at center,var(--dark) 0,var(--dark) 15%,var(--light) 22%,var(--light) 100%)}.luna-box-model{background:0 0}.luna-box-model-position{color:var(--foreground)}._container{min-width:320px;pointer-events:none;position:fixed;left:0;top:0;width:100%;height:100%;z-index:9999999;color:var(--foreground);font-family:".SFNSDisplay-Regular","Helvetica Neue","Lucida Grande","Segoe UI",Tahoma,sans-serif;font-size:14px;direction:ltr}._container._dark{color-scheme:dark}._container *{box-sizing:border-box;pointer-events:all;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:none}._container ul{list-style:none;padding:0;margin:0}._container h1,._container h2,._container h3,._container h4{margin:0}._container h2{font-size:14px}._container h2 [class*=' _icon-'],._container h2 [class^='_icon-']{font-weight:400}._hidden{display:none}._icon-disabled{opacity:.5;pointer-events:none;cursor:default!important}._icon-disabled:active{color:inherit!important}._tag-name-color{color:var(--tag-name-color)}._function-color{color:var(--function-color)}._attribute-name-color{color:var(--attribute-name-color)}._operator-color{color:var(--operator-color)}._string-color{color:var(--string-color)}`, ""]), e2.exports = t;
        }, 6833: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, ".luna-box-model{color:#333;background-color:#fff;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;display:inline-block;color:#222;font-size:12px;text-align:center;white-space:nowrap}.luna-box-model.luna-box-model-platform-windows{font-family:'Segoe UI',Tahoma,sans-serif}.luna-box-model.luna-box-model-platform-linux{font-family:Roboto,Ubuntu,Arial,sans-serif}.luna-box-model .luna-box-model-hidden,.luna-box-model.luna-box-model-hidden{display:none}.luna-box-model .luna-box-model-invisible,.luna-box-model.luna-box-model-invisible{visibility:hidden}.luna-box-model *{box-sizing:border-box}.luna-box-model.luna-box-model-theme-dark{color:#a5a5a5;background-color:#242424}.luna-box-model-label{position:absolute;margin-left:3px;padding:0 2px}.luna-box-model-bottom,.luna-box-model-left,.luna-box-model-right,.luna-box-model-top{display:inline-block}.luna-box-model-left,.luna-box-model-right{vertical-align:middle}.luna-box-model-border,.luna-box-model-content,.luna-box-model-margin,.luna-box-model-padding,.luna-box-model-position{position:relative;display:inline-block;text-align:center;vertical-align:middle;padding:3px;margin:3px}.luna-box-model-position{border:1px grey dotted}.luna-box-model-margin{color:#333;border:1px dashed;background:rgba(246,178,107,.66)}.luna-box-model-border{color:#333;border:1px #000 solid;background:rgba(255,229,153,.66)}.luna-box-model-padding{color:#333;border:1px grey dashed;background:rgba(147,196,125,.55)}.luna-box-model-content{color:#333;border:1px grey solid;min-width:100px;background:rgba(111,168,220,.66)}", ""]), e2.exports = t;
        }, 9327: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, `@font-face{font-family:luna-console-icon;src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAasAAsAAAAACnAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAI4AAADcIsYnIk9TLzIAAAGYAAAAPgAAAFZWmlGRY21hcAAAAdgAAAD2AAACyDioZ9NnbHlmAAAC0AAAAZgAAAH8Lq6nDGhlYWQAAARoAAAAMQAAADZ25cSzaGhlYQAABJwAAAAdAAAAJAgCBBRobXR4AAAEvAAAABkAAABYGAH//GxvY2EAAATYAAAAGAAAAC4J8glUbWF4cAAABPAAAAAfAAAAIAEjAFBuYW1lAAAFEAAAASkAAAIWm5e+CnBvc3QAAAY8AAAAcAAAAJ7qA/7MeJxNjTsOwjAQRJ8TJzE2hPBrKBBHQByAAiGqFBRcIBVCiqhyBA7O2AgRr9Y7M2+lxQCeAyeyy7W9U/fd8GKL5fsiH2vTPx8d7ufEbJpO/aagYc+RM7fEjBKnmiRuySmZUTNNf0wybYSRj9VoO4iU7NQh+Up8qelZs5EupP75Shfm2oz3Kmkvt/gARcgJKwAAeJxjYGQUZ5zAwMrAwNTJdIaBgaEfQjO+ZjBi5ACKMrAyM2AFAWmuKQwHGHQ/srGAuDEsTGBhRhABALQ1CMwAAHiczdJNbsIwEIbh1+QHQsJviNRFF1XX7aEQRZQNRQjEHXqgrnopn4B+E8+qqip117GeRB4nk4lloAAyeZIcwicBiw9lQ5/PGPf5nHfNV8yVyXlmzZY9R05cuMbydtOqZTfsOCh7Vjb02e8RVMXGHfc8aDxqwFKVF7QMtdLpmzUVDSOmTJjpnUH/3YJSBcofqv4Wyz8+b6FuWvXSjW1SV30r1sl/icYuofFZh+1+Yn+7dnPZuIW8uFa2big7t5JXZzX3znbh4Gp5c5UcnfVyciM5u6lc3ESuTnsZQ2JnLQ4S7J4ldjZjntj5jEVi5zaWCeUXWN4q9AAAeJxdUMFOU0EUnTMzb2o1FB5O5wENg31k5mExVEo7jSGBEuO6CStDmtbIBuiKBYg/gRu/ABO3/ocscOEXsHBpogtWvFfnvQgxJnduztx7zknuIXQyIYSDE9IgLwmBmIZI1pDYbTSxBqeW4KvrVKSmaaRKFZREE7YJIyONSLW6W37bLiRxscXNTH1zbnFqlnJ5Eu+G9MnT8JBy9l69ELx69Ohd9JCryrwcU07TbCU5H4y+jQbnyco/EF+8x1/eaX03bCzR8IgGwVn0WC/I8YOzaLGS+4+p4K8O/lcXkPhj/CP0ig1JQIhJyugCxz3o7LqH4YUH0L3swlMK3q+CV/HMbhkJAqlarm1jgd+97DpnfsKPeH15eT2+l9L5OJ/kcjZJfY6MU++wQPzI+PRECUJjo97aAtqupaqhFLHtRLHNf1Kwn9lAOid9L7tV9nzVldNL3dC+NmrGOGM+sme2VrO335Mda3foXlXravY57zemY23HkLs72RsW5JegDjZK99FnPPtwl8FX1i92IfAax6yfvkWf/AHb1F1JeJxjYGRgYABi3/mPYuP5bb4ycLOABKI4H+9rgNH//zIwsDCzMAElOBhAJAMAQ2IK+QAAAHicY2BkYGBhAAEWhv9///9lYWZgZEAFYgBbLQQgAAAAeJxjYGBgYGH4/58FTIPZf2FsSgAAM58EEwAAAHicY2AAgjyGJoYlDI8YPjD8ww8BeTMTR3icY2BkYGAQY3BhYGYAASYg5gJCBob/YD4DABGFAXQAeJxlkD1uwkAUhMdgSAJSghQpKbNVCiKZn5IDQE9Bl8KYtTGyvdZ6QaLLCXKEHCGniHKCHChj82hgLT9/M2/e7soABviFh3p5uG1qvVq4oTpxm/Qg7JOfhTvo40W4S38o3MMbpsJ9POKdO3j+HZ0BSuEW7vEh3Kb/KeyTv4Q7eMK3cJf+j3APK/wJ9/HqDdPIFLEp3FIn+yy0Z3n+rrStUlOoSTA+WwtdaBs6vVHro6oOydS5WMXW5GrOrs4yo0prdjpywda5cjYaxeIHkcmRIoJBgbipDktoJNgjQwh71b3UK6YtKvq1VpggwPgqtWCqaJIhlcaGyTWOrBUOPG1K1zGt+FrO5KS5zGreJCMr/u+6t6MT0Q+wbaZKzDDiE1/kg+YO+T89EV6oAAAAeJxtxksOgjAUQNF3kaIW/x9cBYtqgEAnLXlp0+1rwtQzuVcq2Vj5r6NiR42hYc+BI5aWE2cuXLlx58GTF286PmIm1ajGhzWnJub0S12cBjs4nVI/xhLabdXPS2JCiXgCK5lEwTHQMzKziHwBqnYYpg==') format('woff')}[class*=' luna-console-icon-'],[class^=luna-console-icon-]{display:inline-block;font-family:luna-console-icon!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.luna-console-icon-error:before{content:'\\f101'}.luna-console-icon-input:before{content:'\\f102'}.luna-console-icon-output:before{content:'\\f103'}.luna-console-icon-warn:before{content:'\\f104'}.luna-console-icon-caret-down:before{content:'\\f105'}.luna-console-icon-caret-right:before{content:'\\f106'}.luna-console{background:#fff;overflow-y:auto;-webkit-overflow-scrolling:touch;height:100%;position:relative;will-change:scroll-position;cursor:default;font-size:12px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace}.luna-console.luna-console-theme-dark{background-color:#242424}.luna-console-hidden{display:none}.luna-console-fake-logs{position:absolute;left:0;top:0;pointer-events:none;visibility:hidden;width:100%}.luna-console-logs{padding-top:1px;position:absolute;width:100%}.luna-console-log-container{box-sizing:content-box}.luna-console-log-container.luna-console-selected .luna-console-log-item{background:#ecf1f8}.luna-console-log-container.luna-console-selected .luna-console-log-item:not(.luna-console-error):not(.luna-console-warn){border-color:#ccdef5}.luna-console-header{white-space:nowrap;display:flex;font-size:11px;color:#545454;border-top:1px solid transparent;border-bottom:1px solid #ccc}.luna-console-header .luna-console-time-from-container{overflow-x:auto;-webkit-overflow-scrolling:touch;padding:3px 10px}.luna-console-nesting-level{width:14px;flex-shrink:0;margin-top:-1px;margin-bottom:-1px;position:relative;border-right:1px solid #ccc}.luna-console-nesting-level.luna-console-group-closed::before{content:""}.luna-console-nesting-level::before{border-bottom:1px solid #ccc;position:absolute;top:0;left:0;margin-left:100%;width:5px;height:100%;box-sizing:border-box}.luna-console-log-item{position:relative;display:flex;border-top:1px solid transparent;border-bottom:1px solid #ccc;margin-top:-1px;color:#333}.luna-console-log-item:after{content:"";display:block;clear:both}.luna-console-log-item .luna-console-code{display:inline;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace}.luna-console-log-item .luna-console-code .luna-console-keyword{color:#881280}.luna-console-log-item .luna-console-code .luna-console-number{color:#1c00cf}.luna-console-log-item .luna-console-code .luna-console-operator{color:gray}.luna-console-log-item .luna-console-code .luna-console-comment{color:#236e25}.luna-console-log-item .luna-console-code .luna-console-string{color:#1a1aa6}.luna-console-log-item a{color:#15c!important}.luna-console-log-item .luna-console-icon-container{margin:0 -6px 0 10px}.luna-console-log-item .luna-console-icon-container .luna-console-icon{line-height:20px;font-size:12px;color:#333;position:relative}.luna-console-log-item .luna-console-icon-container .luna-console-icon-caret-down,.luna-console-log-item .luna-console-icon-container .luna-console-icon-caret-right{top:0;left:-2px}.luna-console-log-item .luna-console-icon-container .luna-console-icon-error{top:0;color:#ef3842}.luna-console-log-item .luna-console-icon-container .luna-console-icon-warn{top:0;color:#e8a400}.luna-console-log-item .luna-console-count{background:#8097bd;color:#fff;padding:2px 4px;border-radius:10px;font-size:12px;float:left;margin:1px -6px 0 10px}.luna-console-log-item .luna-console-log-content-wrapper{flex:1;overflow:hidden}.luna-console-log-item .luna-console-log-content{padding:3px 0;margin:0 10px;overflow-x:auto;-webkit-overflow-scrolling:touch;white-space:pre-wrap;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.luna-console-log-item .luna-console-log-content *{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.luna-console-log-item .luna-console-log-content>*{vertical-align:top}.luna-console-log-item .luna-console-log-content .luna-console-null,.luna-console-log-item .luna-console-log-content .luna-console-undefined{color:#5e5e5e}.luna-console-log-item .luna-console-log-content .luna-console-number{color:#1c00cf}.luna-console-log-item .luna-console-log-content .luna-console-boolean{color:#0d22aa}.luna-console-log-item .luna-console-log-content .luna-console-regexp,.luna-console-log-item .luna-console-log-content .luna-console-symbol{color:#881391}.luna-console-log-item .luna-console-data-grid,.luna-console-log-item .luna-console-dom-viewer{white-space:initial}.luna-console-log-item.luna-console-error{z-index:50;background:#fff0f0;color:red;border-top:1px solid #ffd6d6;border-bottom:1px solid #ffd6d6}.luna-console-log-item.luna-console-error .luna-console-stack{padding-left:1.2em;white-space:nowrap}.luna-console-log-item.luna-console-error .luna-console-count{background:red}.luna-console-log-item.luna-console-debug{z-index:20}.luna-console-log-item.luna-console-input{border-bottom-color:transparent}.luna-console-log-item.luna-console-warn{z-index:40;color:#5c5c00;background:#fffbe5;border-top:1px solid #fff5c2;border-bottom:1px solid #fff5c2}.luna-console-log-item.luna-console-warn .luna-console-count{background:#e8a400}.luna-console-log-item.luna-console-info{z-index:30}.luna-console-log-item.luna-console-group,.luna-console-log-item.luna-console-groupCollapsed{font-weight:700}.luna-console-preview{display:inline-block}.luna-console-preview .luna-console-preview-container{display:flex;align-items:center}.luna-console-preview .luna-console-json{overflow-x:auto;-webkit-overflow-scrolling:touch;padding-left:12px}.luna-console-preview .luna-console-preview-icon-container{display:block}.luna-console-preview .luna-console-preview-icon-container .luna-console-icon{position:relative;font-size:12px}.luna-console-preview .luna-console-preview-icon-container .luna-console-icon-caret-down{top:2px}.luna-console-preview .luna-console-preview-icon-container .luna-console-icon-caret-right{top:1px}.luna-console-preview .luna-console-preview-content-container{word-break:break-all}.luna-console-preview .luna-console-descriptor,.luna-console-preview .luna-console-object-preview{font-style:italic}.luna-console-preview .luna-console-key{color:#881391}.luna-console-preview .luna-console-number{color:#1c00cf}.luna-console-preview .luna-console-null{color:#5e5e5e}.luna-console-preview .luna-console-string{color:#c41a16}.luna-console-preview .luna-console-boolean{color:#0d22aa}.luna-console-preview .luna-console-special{color:#5e5e5e}.luna-console-theme-dark{color-scheme:dark}.luna-console-theme-dark .luna-console-log-container.luna-console-selected .luna-console-log-item{background:#29323d}.luna-console-theme-dark .luna-console-log-container.luna-console-selected .luna-console-log-item:not(.luna-console-error):not(.luna-console-warn){border-color:#4173b4}.luna-console-theme-dark .luna-console-log-item{color:#a5a5a5;border-bottom-color:#3d3d3d}.luna-console-theme-dark .luna-console-log-item .luna-console-code .luna-console-keyword{color:#e36eec}.luna-console-theme-dark .luna-console-log-item .luna-console-code .luna-console-number{color:#9980ff}.luna-console-theme-dark .luna-console-log-item .luna-console-code .luna-console-operator{color:#7f7f7f}.luna-console-theme-dark .luna-console-log-item .luna-console-code .luna-console-comment{color:#747474}.luna-console-theme-dark .luna-console-log-item .luna-console-code .luna-console-string{color:#f29766}.luna-console-theme-dark .luna-console-log-item.luna-console-error{background:#290000;color:#ff8080;border-top-color:#5c0000;border-bottom-color:#5c0000}.luna-console-theme-dark .luna-console-log-item.luna-console-error .luna-console-count{background:#ff8080}.luna-console-theme-dark .luna-console-log-item.luna-console-warn{color:#ffcb6b;background:#332a00;border-top-color:#650;border-bottom-color:#650}.luna-console-theme-dark .luna-console-log-item .luna-console-count{background:#42597f;color:#949494}.luna-console-theme-dark .luna-console-log-item .luna-console-log-content .luna-console-null,.luna-console-theme-dark .luna-console-log-item .luna-console-log-content .luna-console-undefined{color:#7f7f7f}.luna-console-theme-dark .luna-console-log-item .luna-console-log-content .luna-console-boolean,.luna-console-theme-dark .luna-console-log-item .luna-console-log-content .luna-console-number{color:#9980ff}.luna-console-theme-dark .luna-console-log-item .luna-console-log-content .luna-console-regexp,.luna-console-theme-dark .luna-console-log-item .luna-console-log-content .luna-console-symbol{color:#e36eec}.luna-console-theme-dark .luna-console-icon-container .luna-console-icon-caret-down,.luna-console-theme-dark .luna-console-icon-container .luna-console-icon-caret-right{color:#9aa0a6}.luna-console-theme-dark .luna-console-header{border-bottom-color:#3d3d3d}.luna-console-theme-dark .luna-console-nesting-level{border-right-color:#3d3d3d}.luna-console-theme-dark .luna-console-nesting-level::before{border-bottom-color:#3d3d3d}.luna-console-theme-dark .luna-console-preview .luna-console-key{color:#e36eec}.luna-console-theme-dark .luna-console-preview .luna-console-number{color:#9980ff}.luna-console-theme-dark .luna-console-preview .luna-console-null{color:#7f7f7f}.luna-console-theme-dark .luna-console-preview .luna-console-string{color:#f29766}.luna-console-theme-dark .luna-console-preview .luna-console-boolean{color:#9980ff}.luna-console-theme-dark .luna-console-preview .luna-console-special{color:#7f7f7f}`, ""]), e2.exports = t;
        }, 4987: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, '.luna-data-grid{color:#333;background-color:#fff;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;position:relative;font-size:12px;border:1px solid #ccc;overflow:hidden;outline:0}.luna-data-grid.luna-data-grid-platform-windows{font-family:"Segoe UI",Tahoma,sans-serif}.luna-data-grid.luna-data-grid-platform-linux{font-family:Roboto,Ubuntu,Arial,sans-serif}.luna-data-grid .luna-data-grid-hidden,.luna-data-grid.luna-data-grid-hidden{display:none}.luna-data-grid .luna-data-grid-invisible,.luna-data-grid.luna-data-grid-invisible{visibility:hidden}.luna-data-grid *{box-sizing:border-box}.luna-data-grid.luna-data-grid-theme-dark{color:#a5a5a5;background-color:#242424}.luna-data-grid.luna-data-grid-theme-dark{color:#a5a5a5;background:#242424;border-color:#3d3d3d}.luna-data-grid table{width:100%;height:100%;border-collapse:separate;border-spacing:0;table-layout:fixed}.luna-data-grid td,.luna-data-grid th{padding:1px 4px;border-left:1px solid #ccc;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.luna-data-grid td:first-child,.luna-data-grid th:first-child{border-left:none}.luna-data-grid th{font-weight:400;border-bottom:1px solid #ccc;text-align:left;background:#f3f3f3}.luna-data-grid th.luna-data-grid-sortable:active,.luna-data-grid th.luna-data-grid-sortable:hover{background:#e6e6e6}.luna-data-grid td{height:20px;cursor:default;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.luna-data-grid:focus .luna-data-grid-node.luna-data-grid-selected{color:#fff;background:#1a73e8}.luna-data-grid:focus.luna-data-grid-theme-dark .luna-data-grid-node.luna-data-grid-selected{background:#0e639c}.luna-data-grid-data-container,.luna-data-grid-header-container{overflow:hidden}.luna-data-grid-header-container{height:21px}.luna-data-grid-data-container{overflow-y:auto}.luna-data-grid-data-container .luna-data-grid-node.luna-data-grid-selected{background:#ddd}.luna-data-grid-data-container tr:nth-child(even){background:#f2f7fd}.luna-data-grid-filler-row td{height:auto}.luna-data-grid-resizer{position:absolute;top:0;bottom:0;width:5px;z-index:500;touch-action:none;cursor:col-resize}.luna-data-grid-resizing{cursor:col-resize!important}.luna-data-grid-resizing .luna-data-grid *{cursor:col-resize!important}.luna-data-grid-theme-dark{color-scheme:dark}.luna-data-grid-theme-dark td,.luna-data-grid-theme-dark th{border-color:#3d3d3d}.luna-data-grid-theme-dark th{background:#292a2d}.luna-data-grid-theme-dark th.luna-data-grid-sortable:hover{background:#303030}.luna-data-grid-theme-dark .luna-data-grid-data-container .luna-data-grid-node.luna-data-grid-selected{background:#393939}.luna-data-grid-theme-dark .luna-data-grid-data-container tr:nth-child(even){background:#0b2544}', ""]), e2.exports = t;
        }, 8903: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "@font-face{font-family:luna-dom-viewer-icon;src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAASgAAsAAAAAB4QAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAFwAAACMIRYl8k9TLzIAAAFkAAAAPQAAAFZLxUkaY21hcAAAAaQAAADHAAACWBcU1KRnbHlmAAACbAAAAC4AAAAwabU7V2hlYWQAAAKcAAAALwAAADZzjr4faGhlYQAAAswAAAAYAAAAJAFyANdobXR4AAAC5AAAABAAAAA4AZAAAGxvY2EAAAL0AAAAEAAAAB4AnACQbWF4cAAAAwQAAAAfAAAAIAEZAA9uYW1lAAADJAAAASkAAAIWm5e+CnBvc3QAAARQAAAATgAAAG5m1cqleJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiC2AdNMDGwMckCSGyzHCuSxA2kuIJ+HgReoggtJnANMcwJFGRmYAXZLBkt4nGNgZJBlnMDAysDAUMfQAyRloHQCAyeDMQMDEwMrMwNWEJDmmsJwgEH3IxPDCSBXCEwyMDCCCABbzwhtAAAAeJy1kksKwjAQhr/0oX0JLlyIZ9BDCQXtRkEEwQO56uV6Av0nmZWI4MIJX2H+JvNIBiiBXGxFAWEkYPaQGqKe00S94C5/xVJKwY49PQNnLly5Tdnzqb9JPXByNUT13YKipLVm4wvmilvR0ilfrboKFsy0N9OB2Yco32z+437SLVTQdo05dUksgF8z/8+6+B3dU2m67YR1u3fsLXtH7egtEq04OhZpcKzbk1OLs2NzcXE0F3rNhOW9ObqbKSRsVqYsQfYC6fYeiQB4nGNgZACBlQzTGZgYGMyVxVc2O073AIpAxHsYloHFRc2dPZY2OTIwAACmEQesAAB4nGNgZGBgAOLeSTNM4/ltvjJwM5wACkRxPt7XgKCBYCXDMiDJwcAE4gAAQEgKxAB4nGNgZGBgOMHAACdXMjAyoAI+ADixAkp4nGNgAIITUEwCAABMyAGReJxjYAACHgYJ7BAADsoBLXicY2BkYGDgY2BmANEMDExAzAWEDAz/wXwGAAomASkAeJxlkD1uwkAUhMdgSAJSghQpKbNVCiKZn5IDQE9Bl8KYtTGyvdZ6QaLLCXKEHCGniHKCHChj82hgLT9/M2/e7soABviFh3p5uG1qvVq4oTpxm/Qg7JOfhTvo40W4S38o3MMbpsJ9POKdO3j+HZ0BSuEW7vEh3Kb/KeyTv4Q7eMK3cJf+j3APK/wJ9/HqDdPIFLEp3FIn+yy0Z3n+rrStUlOoSTA+WwtdaBs6vVHro6oOydS5WMXW5GrOrs4yo0prdjpywda5cjYaxeIHkcmRIoJBgbipDktoJNgjQwh71b3UK6YtKvq1VpggwPgqtWCqaJIhlcaGyTWOrBUOPG1K1zGt+FrO5KS5zGreJCMr/u+6t6MT0Q+wbaZKzDDiE1/kg+YO+T89EV6oAAAAeJxdxk0KgCAUAOE3/adlJ/FQgqBuFETw+i2kTd9mRiYZvv4ZJmYWVjZ2Dk4UmosbwyPK1Vq69aVnPbamEBuOSqFj8WQSgUgTeQGPtA2iAAA=') format('woff')}[class*=' luna-dom-viewer-icon-'],[class^=luna-dom-viewer-icon-]{display:inline-block;font-family:luna-dom-viewer-icon!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.luna-dom-viewer-icon-arrow-down:before{content:'\\f101'}.luna-dom-viewer-icon-arrow-right:before{content:'\\f102'}.luna-dom-viewer{color:#333;background-color:#fff;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;overflow-y:auto;-webkit-overflow-scrolling:touch;background:0 0;overflow-x:hidden;word-wrap:break-word;padding:0 0 0 12px;font-size:12px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;cursor:default;list-style:none}.luna-dom-viewer.luna-dom-viewer-platform-windows{font-family:'Segoe UI',Tahoma,sans-serif}.luna-dom-viewer.luna-dom-viewer-platform-linux{font-family:Roboto,Ubuntu,Arial,sans-serif}.luna-dom-viewer .luna-dom-viewer-hidden,.luna-dom-viewer.luna-dom-viewer-hidden{display:none}.luna-dom-viewer .luna-dom-viewer-invisible,.luna-dom-viewer.luna-dom-viewer-invisible{visibility:hidden}.luna-dom-viewer *{box-sizing:border-box}.luna-dom-viewer.luna-dom-viewer-theme-dark{color:#a5a5a5;background-color:#242424}.luna-dom-viewer ul{list-style:none}.luna-dom-viewer.luna-dom-viewer-theme-dark{color:#e8eaed}.luna-dom-viewer-toggle{min-width:12px;margin-left:-12px}.luna-dom-viewer-icon-arrow-down,.luna-dom-viewer-icon-arrow-right{position:absolute!important;font-size:12px!important}.luna-dom-viewer-tree-item{line-height:16px;min-height:16px;position:relative;z-index:10;outline:0}.luna-dom-viewer-tree-item.luna-dom-viewer-selected .luna-dom-viewer-selection,.luna-dom-viewer-tree-item:hover .luna-dom-viewer-selection{display:block}.luna-dom-viewer-tree-item:hover .luna-dom-viewer-selection{background:#f2f7fd}.luna-dom-viewer-tree-item.luna-dom-viewer-selected .luna-dom-viewer-selection{background:#e0e0e0}.luna-dom-viewer-tree-item.luna-dom-viewer-selected:focus .luna-dom-viewer-selection{background:#cfe8fc}.luna-dom-viewer-tree-item .luna-dom-viewer-icon-arrow-down{display:none}.luna-dom-viewer-tree-item.luna-dom-viewer-expanded .luna-dom-viewer-icon-arrow-down{display:inline-block}.luna-dom-viewer-tree-item.luna-dom-viewer-expanded .luna-dom-viewer-icon-arrow-right{display:none}.luna-dom-viewer-html-tag{color:#881280}.luna-dom-viewer-tag-name{color:#881280}.luna-dom-viewer-attribute-name{color:#994500}.luna-dom-viewer-attribute-value{color:#1a1aa6}.luna-dom-viewer-attribute-value.luna-dom-viewer-attribute-underline{text-decoration:underline}.luna-dom-viewer-html-comment{color:#236e25}.luna-dom-viewer-selection{position:absolute;display:none;left:-10000px;right:-10000px;top:0;bottom:0;z-index:-1}.luna-dom-viewer-children{margin:0;overflow-x:visible;overflow-y:visible;padding-left:15px}.luna-dom-viewer-text-node .luna-dom-viewer-keyword{color:#881280}.luna-dom-viewer-text-node .luna-dom-viewer-number{color:#1c00cf}.luna-dom-viewer-text-node .luna-dom-viewer-operator{color:grey}.luna-dom-viewer-text-node .luna-dom-viewer-comment{color:#236e25}.luna-dom-viewer-text-node .luna-dom-viewer-string{color:#1a1aa6}.luna-dom-viewer-theme-dark .luna-dom-viewer-icon-arrow-down,.luna-dom-viewer-theme-dark .luna-dom-viewer-icon-arrow-right{color:#9aa0a6}.luna-dom-viewer-theme-dark .luna-dom-viewer-html-tag,.luna-dom-viewer-theme-dark .luna-dom-viewer-tag-name{color:#5db0d7}.luna-dom-viewer-theme-dark .luna-dom-viewer-attribute-name{color:#9bbbdc}.luna-dom-viewer-theme-dark .luna-dom-viewer-attribute-value{color:#f29766}.luna-dom-viewer-theme-dark .luna-dom-viewer-html-comment{color:#898989}.luna-dom-viewer-theme-dark .luna-dom-viewer-tree-item:hover .luna-dom-viewer-selection{background:#083c69}.luna-dom-viewer-theme-dark .luna-dom-viewer-tree-item.luna-dom-viewer-selected .luna-dom-viewer-selection{background:#454545}.luna-dom-viewer-theme-dark .luna-dom-viewer-tree-item.luna-dom-viewer-selected:focus .luna-dom-viewer-selection{background:#073d69}.luna-dom-viewer-theme-dark .luna-dom-viewer-text-node .luna-dom-viewer-keyword{color:#e36eec}.luna-dom-viewer-theme-dark .luna-dom-viewer-text-node .luna-dom-viewer-number{color:#9980ff}.luna-dom-viewer-theme-dark .luna-dom-viewer-text-node .luna-dom-viewer-operator{color:#7f7f7f}.luna-dom-viewer-theme-dark .luna-dom-viewer-text-node .luna-dom-viewer-comment{color:#747474}.luna-dom-viewer-theme-dark .luna-dom-viewer-text-node .luna-dom-viewer-string{color:#f29766}", ""]), e2.exports = t;
        }, 5512: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, `@font-face{font-family:luna-modal-icon;src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAAsAAAAABpQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAEkAAABoILgliE9TLzIAAAFUAAAAPQAAAFZL+0kZY21hcAAAAZQAAACBAAAB3sqmCy5nbHlmAAACGAAAAC0AAAA0Ftcaz2hlYWQAAAJIAAAALgAAADZzhL4YaGhlYQAAAngAAAAYAAAAJAFoANBobXR4AAACkAAAAA8AAAAcAMgAAGxvY2EAAAKgAAAADgAAABAATgBObWF4cAAAArAAAAAfAAAAIAESABhuYW1lAAAC0AAAASkAAAIWm5e+CnBvc3QAAAP8AAAAMQAAAEOplauDeJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiCWgNIsQMzKwAykWRnYgGxGBiYAk+wFgwAAAHicY2BkkGWcwMDKwMBQx9ADJGWgdAIDJ4MxAwMTAyszA1YQkOaawnCAIfkjI8MJIFcITDIwMIIIAGAqCKIAAAB4nM2RQQqDQAxFXxyVUsST9DhduBd3ggsv0JX39QT6kwYED1D6hzeQD0nmM0ADFPESNdiG4frItfALz/Br3qp7HlS0jEzMLKy7HYf8e33J1HMdortoWuPzreUX8p2hEikj9f+oi3vIyl86JpWYEvfnxH9sSTzPmijXbl+wE7urE5sAAAB4nGNgZACB+UDIzcBgrs6uzi7OLm4ubq4+j1tfn1tPD0xOhjGAJAMDAKekBtMAAAB4nGNgZGBgAGLPuE0l8fw2Xxm4GU4ABaI4H+9rQNBAMB8IGRg4GJhAHAA5KgqUAAB4nGNgZGBgOMHAACfnMzAyoAJ2ADfsAjl4nGNgAIITDFgBABIUAMkAeJxjYAACKQQEAAO4AJ0AAHicY2BkYGBgZ+BhANEMDExAzAWEDAz/wXwGAApKASsAeJxlkD1uwkAUhMdgSAJSghQpKbNVCiKZn5IDQE9Bl8KYtTGyvdZ6QaLLCXKEHCGniHKCHChj82hgLT9/M2/e7soABviFh3p5uG1qvVq4oTpxm/Qg7JOfhTvo40W4S38o3MMbpsJ9POKdO3j+HZ0BSuEW7vEh3Kb/KeyTv4Q7eMK3cJf+j3APK/wJ9/HqDdPIFLEp3FIn+yy0Z3n+rrStUlOoSTA+WwtdaBs6vVHro6oOydS5WMXW5GrOrs4yo0prdjpywda5cjYaxeIHkcmRIoJBgbipDktoJNgjQwh71b3UK6YtKvq1VpggwPgqtWCqaJIhlcaGyTWOrBUOPG1K1zGt+FrO5KS5zGreJCMr/u+6t6MT0Q+wbaZKzDDiE1/kg+YO+T89EV6oAAAAeJxjYGKAABiNDtgZmRiZGVkYWRnZGNkZORhYk3Pyi1MZkxlzGPMZixlTGRgANIEEbAAAAA==') format('woff')}[class*=' luna-modal-icon-'],[class^=luna-modal-icon-]{display:inline-block;font-family:luna-modal-icon!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.luna-modal-icon-close:before{content:'\\f101'}.luna-modal{color:#333;background-color:#fff;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center}.luna-modal.luna-modal-platform-windows{font-family:"Segoe UI",Tahoma,sans-serif}.luna-modal.luna-modal-platform-linux{font-family:Roboto,Ubuntu,Arial,sans-serif}.luna-modal .luna-modal-hidden,.luna-modal.luna-modal-hidden{display:none}.luna-modal .luna-modal-invisible,.luna-modal.luna-modal-invisible{visibility:hidden}.luna-modal *{box-sizing:border-box}.luna-modal.luna-modal-theme-dark{color:#a5a5a5;background-color:#242424}.luna-modal-icon-close{position:absolute;right:16px;top:18px;cursor:pointer;font-size:20px}.luna-modal-body{position:relative;background:#fff;max-height:100%;display:flex;flex-direction:column;border-radius:4px}.luna-modal-body.luna-modal-no-title{position:static}.luna-modal-body.luna-modal-no-title .luna-modal-title{display:none}.luna-modal-body.luna-modal-no-title .luna-modal-icon-close{color:#fff}.luna-modal-body.luna-modal-no-footer .luna-modal-footer{display:none}.luna-modal-hidden{display:none}.luna-modal-title{padding:16px;padding-right:36px;padding-bottom:0;font-size:18px;height:46px;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.luna-modal-content{padding:16px;overflow-y:auto}.luna-modal-footer{padding:12px}.luna-modal-button-group{display:flex;justify-content:flex-end}.luna-modal-button{padding:0 12px;background:#e9ecef;cursor:default;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin:0 4px;font-size:12px;border-radius:4px;overflow:hidden;height:28px;line-height:28px}.luna-modal-button:active::before{background:#1a73e8;content:"";opacity:.4;position:absolute;top:0;left:0;width:100%;height:100%;z-index:2}.luna-modal-button.luna-modal-secondary{color:#1a73e8;border:1px solid #ccc;background:#fff}.luna-modal-button.luna-modal-primary{color:#fff;background:#1a73e8}.luna-modal-input{box-sizing:border-box;outline:0;width:100%;font-size:16px;padding:6px 12px;border:1px solid #ccc;-webkit-appearance:none;-moz-appearance:none}.luna-modal-theme-dark{color:#a5a5a5}.luna-modal-theme-dark .luna-modal-body{background:#242424}`, ""]), e2.exports = t;
        }, 7591: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, ".luna-notification{position:fixed;top:0;left:0;width:100%;height:100%;padding:20px;box-sizing:border-box;pointer-events:none;display:flex;flex-direction:column;font-size:14px;font-family:Arial,Helvetica,sans-serif}.luna-notification-item{display:flex;box-shadow:0 2px 2px 0 rgba(0,0,0,.07),0 1px 5px 0 rgba(0,0,0,.1);padding:10px 16px;color:#333;background:#fff}.luna-notification-lower{margin-top:16px}.luna-notification-upper{margin-bottom:16px}.luna-notification-theme-dark .luna-notification-item{box-shadow:0 2px 2px 0 rgba(255,255,255,.07),0 1px 5px 0 rgba(255,255,255,.1);color:#a5a5a5;background:#242424}", ""]), e2.exports = t;
        }, 4821: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "@font-face{font-family:luna-object-viewer-icon;src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAS8AAsAAAAAB7QAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAGEAAACMISgl+k9TLzIAAAFsAAAAPQAAAFZLxUkWY21hcAAAAawAAADWAAACdBU42qdnbHlmAAAChAAAAC4AAAAwabU7V2hlYWQAAAK0AAAALwAAADZzjr4faGhlYQAAAuQAAAAYAAAAJAFyANlobXR4AAAC/AAAABAAAABAAZAAAGxvY2EAAAMMAAAAEAAAACIAtACobWF4cAAAAxwAAAAfAAAAIAEbAA9uYW1lAAADPAAAASkAAAIWm5e+CnBvc3QAAARoAAAAUwAAAHZW8MNZeJxNjTsOQFAQRc/z/+sV1mABohKV0gZeJRJR2X9cT4RJZu7nFIMBMjoGvHGaF6rdngcNAc/c/O/Nvq2W5E1igdNE2zv1iGh1c5FQPlYXUlJRyxt9+/pUKadQa/AveGEGZQAAAHicY2BkkGScwMDKwMBQx9ADJGWgdAIDJ4MxAwMTAyszA1YQkOaawnCAQfcjE8MJIFcITDIwMIIIAFqDCGkAAAB4nM2STQ4BQRCFv54ZP8MwFhYW4gQcShBsSERi50BWDuFCcwJedddKRGKnOt8k9aanqudVAy0gF3NRQLgTsLhJDVHP6UW94Kp8zEhKwYIlG/YcOXHm0mTPp96aumLLwdUQ1fcIqmJrwpSZL+iqak5JmyE1Ayr1bdGhr/2ZPmp/qPQtuj/uJzqQl+pfDyypesQD6AT/ElV8PjyrMccT9rdLR3PUFBI227VTio1jbm6dodg5VnPvmAsHxzofHfmi+Sbs/pwdWcXFkWdNSNg9arIE2QufuSCyAAB4nGNgZACBlQzTGZgYGMyVxVc2O073AIpAxHsYloHFRc2dPZY2OTIwAACmEQesAAB4nGNgZGBgAOINe2b6x/PbfGXgZjgBFIjifLyvAUEDwUqGZUCSg4EJxAEAUn4LLAB4nGNgZGBgOMHAACdXMjAyoAIBADizAkx4nGNgAIITUEwGAABZUAGReJxjYAACHgYJ3BAAE94BXXicY2BkYGAQYGBmANEMDExAzAWEDAz/wXwGAApcASsAeJxlkD1uwkAUhMdgSAJSghQpKbNVCiKZn5IDQE9Bl8KYtTGyvdZ6QaLLCXKEHCGniHKCHChj82hgLT9/M2/e7soABviFh3p5uG1qvVq4oTpxm/Qg7JOfhTvo40W4S38o3MMbpsJ9POKdO3j+HZ0BSuEW7vEh3Kb/KeyTv4Q7eMK3cJf+j3APK/wJ9/HqDdPIFLEp3FIn+yy0Z3n+rrStUlOoSTA+WwtdaBs6vVHro6oOydS5WMXW5GrOrs4yo0prdjpywda5cjYaxeIHkcmRIoJBgbipDktoJNgjQwh71b3UK6YtKvq1VpggwPgqtWCqaJIhlcaGyTWOrBUOPG1K1zGt+FrO5KS5zGreJCMr/u+6t6MT0Q+wbaZKzDDiE1/kg+YO+T89EV6oAAAAeJxdxjkOgCAUANE/uOOGB+FQBIjaaEJIuL6FsfE1M6Lk9fXPoKioaWjp6BnQjEzMLKwYNtHepZhtuMs1vpvO/ch4HIlIxhK4KVyc7BwiD8nvDlkA') format('woff')}[class*=' luna-object-viewer-icon-'],[class^=luna-object-viewer-icon-]{display:inline-block;font-family:luna-object-viewer-icon!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.luna-object-viewer-icon-caret-down:before{content:'\\f101'}.luna-object-viewer-icon-caret-right:before{content:'\\f102'}.luna-object-viewer{overflow-x:auto;-webkit-overflow-scrolling:touch;overflow-y:hidden;cursor:default;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;font-size:12px;line-height:1.2;min-height:100%;color:#333;list-style:none!important}.luna-object-viewer ul{list-style:none!important;padding:0!important;padding-left:12px!important;margin:0!important}.luna-object-viewer li{position:relative;white-space:nowrap;line-height:16px;min-height:16px}.luna-object-viewer>li>.luna-object-viewer-key{display:none}.luna-object-viewer span{position:static!important}.luna-object-viewer li .luna-object-viewer-collapsed~.luna-object-viewer-close:before{color:#999}.luna-object-viewer-array .luna-object-viewer-object .luna-object-viewer-key{display:inline}.luna-object-viewer-null{color:#5e5e5e}.luna-object-viewer-regexp,.luna-object-viewer-string{color:#c41a16}.luna-object-viewer-number{color:#1c00cf}.luna-object-viewer-boolean{color:#0d22aa}.luna-object-viewer-special{color:#5e5e5e}.luna-object-viewer-key,.luna-object-viewer-key-lighter{color:#881391}.luna-object-viewer-key-lighter{opacity:.6}.luna-object-viewer-key-special{color:#5e5e5e}.luna-object-viewer-collapsed .luna-object-viewer-icon,.luna-object-viewer-expanded .luna-object-viewer-icon{position:absolute!important;left:-12px;color:#727272;font-size:12px}.luna-object-viewer-icon-caret-right{top:0}.luna-object-viewer-icon-caret-down{top:1px}.luna-object-viewer-expanded>.luna-object-viewer-icon-caret-down{display:inline}.luna-object-viewer-expanded>.luna-object-viewer-icon-caret-right{display:none}.luna-object-viewer-collapsed>.luna-object-viewer-icon-caret-down{display:none}.luna-object-viewer-collapsed>.luna-object-viewer-icon-caret-right{display:inline}.luna-object-viewer-hidden~ul{display:none}.luna-object-viewer-theme-dark{color:#fff}.luna-object-viewer-theme-dark .luna-object-viewer-null,.luna-object-viewer-theme-dark .luna-object-viewer-special{color:#a1a1a1}.luna-object-viewer-theme-dark .luna-object-viewer-regexp,.luna-object-viewer-theme-dark .luna-object-viewer-string{color:#f28b54}.luna-object-viewer-theme-dark .luna-object-viewer-boolean,.luna-object-viewer-theme-dark .luna-object-viewer-number{color:#9980ff}.luna-object-viewer-theme-dark .luna-object-viewer-key,.luna-object-viewer-theme-dark .luna-object-viewer-key-lighter{color:#5db0d7}", ""]), e2.exports = t;
        }, 7871: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, `.luna-setting{color:#333;background-color:#fff;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;min-width:320px}.luna-setting.luna-setting-platform-windows{font-family:'Segoe UI',Tahoma,sans-serif}.luna-setting.luna-setting-platform-linux{font-family:Roboto,Ubuntu,Arial,sans-serif}.luna-setting .luna-setting-hidden,.luna-setting.luna-setting-hidden{display:none}.luna-setting .luna-setting-invisible,.luna-setting.luna-setting-invisible{visibility:hidden}.luna-setting *{box-sizing:border-box}.luna-setting-item.luna-setting-selected,.luna-setting-item:hover{background:#f3f3f3}.luna-setting-item.luna-setting-selected:focus{outline:1px solid #1a73e8}.luna-setting-item .luna-setting-title{line-height:1.4em;font-weight:600}.luna-setting-item .luna-setting-description{line-height:1.4em}.luna-setting-item .luna-setting-description *{margin:0}.luna-setting-item .luna-setting-description strong{font-weight:600}.luna-setting-item .luna-setting-description a{background-color:transparent;color:#0969da;text-decoration:none}.luna-setting-item .luna-setting-control,.luna-setting-item .luna-setting-description{font-size:12px}.luna-setting-item .luna-setting-description{margin-bottom:8px}.luna-setting-item .luna-setting-control{display:flex;align-items:center}.luna-setting-item-button,.luna-setting-item-checkbox,.luna-setting-item-input,.luna-setting-item-number,.luna-setting-item-select,.luna-setting-item-title{padding:10px}.luna-setting-item-title{font-size:18px;font-weight:600}.luna-setting-item-input input{-webkit-tap-highlight-color:transparent;color:#333;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid #ccc;outline:0;padding:2px 8px;border-radius:0;font-size:14px;background:#fff;width:100%}.luna-setting-item-number input[type=number]{-webkit-tap-highlight-color:transparent;color:#333;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid #ccc;outline:0;padding:2px 8px;border-radius:0;font-size:14px;background:#fff;width:200px;padding:2px}.luna-setting-item-number .luna-setting-range-container{flex:2;position:relative;top:1px}.luna-setting-item-number .luna-setting-range-container .luna-setting-range-track{height:4px;width:100%;padding:0 10px;position:absolute;left:0;top:4px}.luna-setting-item-number .luna-setting-range-container .luna-setting-range-track .luna-setting-range-track-bar{background:#ccc;border-radius:2px;overflow:hidden;width:100%;height:4px}.luna-setting-item-number .luna-setting-range-container .luna-setting-range-track .luna-setting-range-track-bar .luna-setting-range-track-progress{height:100%;background:#1a73e8;width:50%}.luna-setting-item-number .luna-setting-range-container input{-webkit-appearance:none;background:0 0;height:4px;width:100%;position:relative;top:-3px;margin:0 auto;outline:0;border-radius:2px}.luna-setting-item-number .luna-setting-range-container input::-webkit-slider-thumb{-webkit-appearance:none;position:relative;top:0;z-index:1;width:16px;border:none;height:16px;border-radius:10px;border:1px solid #ccc;background:radial-gradient(circle at center,#eee 0,#eee 15%,#fff 22%,#fff 100%)}.luna-setting-item-checkbox input{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:14px;height:14px;border:1px solid #ccc;border-radius:0;position:relative;outline:0;margin-left:0;margin-right:8px;transition:background-color .1s;align-self:flex-start;flex-shrink:0}.luna-setting-item-checkbox input:checked{background-color:#1a73e8;border-color:#1a73e8}.luna-setting-item-checkbox input:checked:after{content:"";width:100%;height:100%;position:absolute;left:0;top:0;background-image:url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==);background-size:30px;background-repeat:no-repeat;background-position:center}.luna-setting-item-checkbox label{-webkit-tap-highlight-color:transparent}.luna-setting-item-checkbox label *{margin:0}.luna-setting-item-select .luna-setting-select{position:relative}.luna-setting-item-select .luna-setting-select select{margin:0;font-size:14px;background:#fff;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid #ccc;padding:2px 8px;padding-right:18px;outline:0;color:#333;border-radius:0;-webkit-tap-highlight-color:transparent}.luna-setting-item-select .luna-setting-select:after{content:'';width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #333;position:absolute;top:0;bottom:0;right:6px;margin:auto;pointer-events:none}.luna-setting-item-select .luna-setting-select select{width:300px}.luna-setting-item-button button{-webkit-tap-highlight-color:transparent;background:#fff;border:1px solid #ccc;padding:2px 8px;color:#1a73e8;font-size:14px;border-radius:2px}.luna-setting-item-button button:active,.luna-setting-item-button button:hover{background:#f3f3f3}.luna-setting-item-button button:active{border:1px solid #1a73e8}.luna-setting-item-separator{border-bottom:1px solid #ccc}.luna-setting-theme-dark{color-scheme:dark;color:#a5a5a5;background:#242424}.luna-setting-theme-dark .luna-setting-item.luna-setting-selected,.luna-setting-theme-dark .luna-setting-item:hover{background:#292a2d}.luna-setting-theme-dark .luna-setting-item .luna-setting-description a{background-color:transparent;color:#58a6ff}.luna-setting-theme-dark .luna-setting-item-separator{border-color:#3d3d3d}.luna-setting-theme-dark .luna-setting-item-input input{background:#3d3d3d;border-color:#3d3d3d;color:#a5a5a5}.luna-setting-theme-dark .luna-setting-item-checkbox input{border-color:#3d3d3d}.luna-setting-theme-dark .luna-setting-item-select .luna-setting-select select{color:#a5a5a5;border-color:#3d3d3d;background:#3d3d3d}.luna-setting-theme-dark .luna-setting-item-select .luna-setting-select:after{border-top-color:#a5a5a5}.luna-setting-theme-dark .luna-setting-item-button button{background:#242424;border-color:#3d3d3d}.luna-setting-theme-dark .luna-setting-item-button button:active,.luna-setting-theme-dark .luna-setting-item-button button:hover{background:#292a2d}.luna-setting-theme-dark .luna-setting-item-button button:active{border:1px solid #1a73e8}.luna-setting-theme-dark .luna-setting-item-number input[type=number]{background:#3d3d3d;border-color:#3d3d3d;color:#a5a5a5}.luna-setting-theme-dark .luna-setting-item-number .luna-setting-range-container .luna-setting-range-track .luna-setting-range-track-bar{background:#3d3d3d}.luna-setting-theme-dark .luna-setting-item-number .luna-setting-range-container input::-webkit-slider-thumb{border-color:#3d3d3d;background:radial-gradient(circle at center,#aaa 0,#aaa 15%,#ccc 22%,#ccc 100%)}`, ""]), e2.exports = t;
        }, 2156: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, ".luna-tab{color:#333;background-color:#fff;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;position:relative;overflow:hidden;width:100%}.luna-tab.luna-tab-platform-windows{font-family:'Segoe UI',Tahoma,sans-serif}.luna-tab.luna-tab-platform-linux{font-family:Roboto,Ubuntu,Arial,sans-serif}.luna-tab .luna-tab-hidden,.luna-tab.luna-tab-hidden{display:none}.luna-tab .luna-tab-invisible,.luna-tab.luna-tab-invisible{visibility:hidden}.luna-tab *{box-sizing:border-box}.luna-tab.luna-tab-theme-dark{color:#a5a5a5;background-color:#242424}.luna-tab-tabs-container{border-bottom:1px solid #ccc}.luna-tab-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch;overflow-y:hidden;width:100%;height:100%;font-size:0;white-space:nowrap}.luna-tab-tabs::-webkit-scrollbar{display:none;width:0;height:0}.luna-tab-item{cursor:pointer;display:inline-block;padding:0 10px;font-size:12px;text-align:center;text-transform:capitalize}.luna-tab-item:hover{background:#f3f3f3}.luna-tab-slider{transition:left .3s,width .3s;height:1px;background:#1a73e8;position:absolute;bottom:0;left:0}", ""]), e2.exports = t;
        }, 5777: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "@font-face{font-family:luna-text-viewer-icon;src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAS0AAsAAAAAB2QAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAFQAAAB0INElr09TLzIAAAFcAAAAPQAAAFZL+0klY21hcAAAAZwAAACfAAACEAEewxRnbHlmAAACPAAAAIYAAACkNSDggmhlYWQAAALEAAAALgAAADZzrb4oaGhlYQAAAvQAAAAWAAAAJAGRANNobXR4AAADDAAAABAAAAAoAZAAAGxvY2EAAAMcAAAAEAAAABYBWgFIbWF4cAAAAywAAAAdAAAAIAEXADtuYW1lAAADTAAAASkAAAIWm5e+CnBvc3QAAAR4AAAAOwAAAFJIWdOleJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBWAdNMDGwMQkAWK1CGlYEZyGMCstiBMpxAUUYGZgDbGgXDeJxjYGTQYJzAwMrAwFDH0AMkZaB0AgMngzEDAxMDKzMDVhCQ5prCcIAh+SMTwwkgVwhMMjAwgggAY84IrgAAAHicvZFLCsMwDERHzsdJ6aL0HD1VQiDQRbIN9Axd9aI+QTpjq5Bdd5F4Bo1lybIBNAAq8iA1YB8YZG+qlvUKl6zXGBjf6MofMWHGEyu2FPb9oCxULCtHs3yy+J2urg1rtojo0HM/MKnFGabOGlbdYvdT+1N6/7drXl8e6Vajo3efHP3b7HAUvntBMy1OJKujMTeHNZMV9McpFBC+tLgY4QB4nGNgZACBEwzrGdgZGOwZxdnVDdXNPfKEGlhchO0KhZtZ3IQYmMFq1jCsZpBi0GLQY2AwNzGzZjQSk2UUYdNmVFID8UyVRUXYlNRMlVGlTM1FjU3tmZkTmVhYmFRBhHwoCyuzKgtTIjMzWJg3ZClIGMRlZQmVB7GhMixM0aGhQIsB52sTqgAAeJxjYGRgYADi2JNxkvH8Nl8ZuBlOAAWiOB/va0DQQHCCYT2Q5GBgAnEANJ0KnQAAeJxjYGRgYDjBwIBEMjKgAi4AOvoCZQAAeJxjYACCE1CMBwAAM7gBkXicY2AAAiGGIFQIABXIAqN4nGNgZGBg4GLQZ2BmAAEmMI8LSP4H8xkADjQBUwAAAHicZZA9bsJAFITHYEgCUoIUKSmzVQoimZ+SA0BPQZfCmLUxsr3WekGiywlyhBwhp4hyghwoY/NoYC0/fzNv3u7KAAb4hYd6ebhtar1auKE6cZv0IOyTn4U76ONFuEt/KNzDG6bCfTzinTt4/h2dAUrhFu7xIdym/ynsk7+EO3jCt3CX/o9wDyv8Cffx6g3TyBSxKdxSJ/sstGd5/q60rVJTqEkwPlsLXWgbOr1R66OqDsnUuVjF1uRqzq7OMqNKa3Y6csHWuXI2GsXiB5HJkSKCQYG4qQ5LaCTYI0MIe9W91CumLSr6tVaYIMD4KrVgqmiSIZXGhsk1jqwVDjxtStcxrfhazuSkucxq3iQjK/7vurejE9EPsG2mSsww4hNf5IPmDvk/PRFeqAAAAHicXcU7CsAgFEXBe4x/l/kQBAtt3X0KSZNpRk7X91/F8eAJRBKZQqUp2Og2va19MAadyWJzpBd4kgcWAA==') format('woff')}[class*=' luna-text-viewer-icon-'],[class^=luna-text-viewer-icon-]{display:inline-block;font-family:luna-text-viewer-icon!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.luna-text-viewer-icon-check:before{content:'\\f101'}.luna-text-viewer-icon-copy:before{content:'\\f102'}.luna-text-viewer{color:#333;background-color:#fff;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;padding:0;unicode-bidi:embed;position:relative;overflow:auto;border:1px solid #ccc}.luna-text-viewer.luna-text-viewer-platform-windows{font-family:'Segoe UI',Tahoma,sans-serif}.luna-text-viewer.luna-text-viewer-platform-linux{font-family:Roboto,Ubuntu,Arial,sans-serif}.luna-text-viewer .luna-text-viewer-hidden,.luna-text-viewer.luna-text-viewer-hidden{display:none}.luna-text-viewer .luna-text-viewer-invisible,.luna-text-viewer.luna-text-viewer-invisible{visibility:hidden}.luna-text-viewer *{box-sizing:border-box}.luna-text-viewer.luna-text-viewer-theme-dark{color:#d9d9d9;border-color:#3d3d3d;background:#242424}.luna-text-viewer:hover .luna-text-viewer-copy{opacity:1}.luna-text-viewer-table{display:table}.luna-text-viewer-table .luna-text-viewer-line-number,.luna-text-viewer-table .luna-text-viewer-line-text{padding:0}.luna-text-viewer-table-row{display:table-row}.luna-text-viewer-line-number{display:table-cell;padding:0 3px 0 8px!important;text-align:right;vertical-align:top;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-right:1px solid #ccc}.luna-text-viewer-line-text{display:table-cell;padding-left:4px!important;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.luna-text-viewer-copy{background:#fff;opacity:0;position:absolute;right:5px;top:5px;border:1px solid #ccc;border-radius:4px;width:25px;height:25px;text-align:center;line-height:25px;cursor:pointer;transition:opacity .3s,top .3s}.luna-text-viewer-copy .luna-text-viewer-icon-check{color:#188037}.luna-text-viewer-text{padding:4px;font-size:12px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;box-sizing:border-box;white-space:pre;display:block}.luna-text-viewer-text.luna-text-viewer-line-numbers{padding:0}.luna-text-viewer-text.luna-text-viewer-wrap-long-lines{white-space:pre-wrap}.luna-text-viewer-text.luna-text-viewer-wrap-long-lines .luna-text-viewer-line-text{word-break:break-all}.luna-text-viewer-theme-dark{color-scheme:dark}.luna-text-viewer-theme-dark .luna-text-viewer-copy,.luna-text-viewer-theme-dark .luna-text-viewer-line-number{border-color:#3d3d3d}.luna-text-viewer-theme-dark .luna-text-viewer-copy .luna-text-viewer-icon-check{color:#81c995}.luna-text-viewer-theme-dark .luna-text-viewer-copy{background-color:#242424}", ""]), e2.exports = t;
        }, 5357: function(e2, t, n2) {
          (t = n2(3645)(false)).push([e2.id, "@font-face{font-family:eruda-icon;src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAA6UAAsAAAAAGvAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAARoAAAHeLjoycE9TLzIAAAIkAAAAPwAAAFZWm1KoY21hcAAAAmQAAAFdAAADwhPu1O9nbHlmAAADxAAAB+wAAA9I7RPQpGhlYWQAAAuwAAAAMQAAADZ26MSyaGhlYQAAC+QAAAAdAAAAJAgEBC9obXR4AAAMBAAAAB0AAACwXAv//GxvY2EAAAwkAAAAOwAAAFpuVmoybWF4cAAADGAAAAAfAAAAIAE9AQ1uYW1lAAAMgAAAASkAAAIWm5e+CnBvc3QAAA2sAAAA5QAAAU4VMmUJeJxNkD1Ow0AQhb9NHGISCH9RiB0cErCNHRrqFFSIyqKiQHSpEFJERUnBCTgPZ+AEHIe34wDe1f69efPezOKAHldc07q5re4ZrFevL8QE1MPHm3e3fn5aEf6+FAvsDHHuTUoxd7zzwSdffLulq9wjLbaYau8TacZMONE554xzZsrtNfBEzFOhbSmOyTmga0ikvRR/37RSsSMyDukYPjWdgGOtsSK55Y/k0Bf/ksK0MrbFr70idsVZKNPnDcSay3umd2TISCvWTJSxI78lFQ/C+qbv/Zo9tNXDP55ZL7k0Q90u5F5XX0qrYx16btccCtXg/ULrKzGFuqY9rUTMhf3fkCNj+MxUnsM/frr5Qx+ZbH4vVQ0F5Q/ZQBvxAAB4nGNgZJJgnMDAysDA1Mt0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDAcYdD+KsIC4MSxMDIxAGoQZALgnCOUAeJy1011SGlEQhuF3BFHxD5UUyr8gIJIsiiKJsSqJlrHKsJssKFeuxF6Bfj3dF96aqhzqoZnDzJyG8w2wCVTko1SheKLAx1/NFuV8hXo5X+WPjht6+fmfWHLDHQ+srfnykjMrvnPPoxXlzNtRlFc26HLBZblal1N9ntBnwIgx5/SYMaWt78+YM6TDgitduaEVq+q0xhbb7KifPQ441N2OOOaEJh9oaYka7xvdd57vQz1P+oPR+Bx6s2lbrc6H0Flc/cO9/sfY87fiOY8u8X0J/muX6VRW6UI+p4l8SX35mgZynUbyLY3lJukf0e6HnvxIM/mZpnKb2nKXvM/7dCa/0lwe0lAeU0d+p4Wsk3bBiuDptY2A10rw9Fo1eOJtM/iTYLWA162A1+2A152A13rwJ8R2g++AJaUU2w/KK3YQlFzsMCjDWCMozdhRUK6x46CEYydBWceagdYraihRngAAAHic7RdbbBxX9Z57Z2d2d2ZndryzM7ve9ax3NztjO/bann0lTuW16zoBJSWJ7Zg83NiUJCQ1Ik2ikKQJNC9FFQqVEG0RVLQoSpEKH2klqgpEIyWAUMRTNBJC/PUDhETgiwhQd8y5s1s7oqr624/srO6ce89zzjn3nHsJEPwxyn5GVEJKBTcCdc80pAiYhkjfNWL+NnhLdTKqfxVOqJlxFX6E84wb86/6X4+5GRLw0/vsOgkREoFGBFx62P/uFviBP78FWrC02d/r79vcpmMl+k2uBwwJxIILTrVeyXsmK8krRLb5YGqUaCb9ksYnMuBqMtnRcY6V1nidml6texaY9CxSRm3TtKNIjcxrUjhEWKD3OnuNJEgPKSG/I6nUpo06fxwXH8lmEoyDFQIVyrROs7254z990rj0u2PLez47WqG1yu69V7ZdfDxU9He4C6P+v+HN+vlnD9Uou0Zp+NnfvveT/XL0kbGFxT/u37tx7CTdeuGlKfiibcMr/gt9qfyu05e4+YEdb7A3iEVG0ArdEAvDIPHBqTbB7bgCDA0sdH0x3/nEHDT4YFJi9siz74iaOBkK3ZyRTRXwE+FGG15BeA0Pf14hqinP3AyFJnHhnVm5xzThmNSBNFjDdvwzw75GFJIlvWhZ1UHlYlI3zIputa3CSduiRF7P09e9on+jODpanPOKsJMDOPV2wU7/BqsVPcQ2ix41X/8ARKpbfhPVtHNgik1hXAhIlmQ1rIbbcCVIzN/7+65794KRTc13IBwJXVkhRACBkAEyhVyiBqJbRn81YRjKUDfRN9xHpoVBt0xJRZ+iS4ehZFg2utJrjCO2GrAUAizcj+c3pXpiXVQwThZmdNrbrx+hAjtjbhSF5FPyKSsqmGraWKYCbfl97vMLi79fXHje7XsAhBsoo0P35fyMPpCj+lM0FDptJexuYzl82upRufxlKgrTh/+fOwBXc+Jt9jZJBTnxUbH/yGT5j4jRT2pB9O1oO/oi3FyD2/ggU14LY/j5RuHTJIZf5LR/WVmbaB2CT6xdQa4KwJZIHPfyMFoWRNSmQZDLlJVpdRw8GwwVWEGlScOGijdOq2VKyfHDB7/d1/+d37zXeT/dXG42l7/Kh2a20pd0JpxsxTVNt8KWyuu/94Ujr+7uvFpvQXP5PCfEAU4l+6pZZ9Ix3eqGqmsGrvok28V+zi6TKEYyi/Udt0MNavkkJC1e+vQA1tGqil6EV93j/UBbY0AXm/2Vku+z53x/8MDT5879U9Nb4Cqq/yf/WEjReiECfS9+C2f/6umFS/77q3t7kp0nGu8DTrFTQrwG1KtsoHVXlnXL0qMKHTRpGbaJlt7aoVsSbO3aQFb5L7MTJElIwrBMvnWxQteCEl2QREn8Ci/Ef9i7u1IT6tX5Pb/ePV+rUXKEL3DMkUPzc6OeNzo3/6C8K2QdrzVlKAYyHhBcxGgUyoCRqXimJZXYwYO1y1tWxQWKLkyfunpqevrU5vJs4SQ02JUDw94qMlC6maORJpc9AR/Sm7C4cK7S4MoL/FNqFYy+Nw5VbpIoWaWXP0atf+fj1Lb36w12h6SxShIouuNQw+TCVDNsWvHqDStpNUoFnobUs6mhUvpmn+r2VxaeuXjmCc974vSjm44OxfytrXeH5iaKxYm5fXMThcLEHLwcGzq66dHTnObMxWcWKv2u2tfa1ipMzu7rEM5OFshqLfsFu4R9thszrVjAUoHFgH98DxRreb3CK74rMTh/bWmJTq9Pd0nCZOvsbfrYrVsTty9cOPc5Or2U6spq8rXbrbNAL9yeuHWLYuEnEiErK0JIAPIN8kNyl9wn/yUt7mioN6GGTi1jDQrypNPRxQ+8zREatnUsVtgbcDHAaZA0rc6TxOIWLPFVXLDbvYRT45CDSnBOqFhee4aTcWw8gapGnS+Z+EYrOuqh825jrY5WSVwPDSewh/OWqYueCJQFEjhELTdgcdEODjUCo5yge7lcAlJxRSgceyZyu5LFfqnaeldKlsyunnK6N6LEaUSqTSndgpZK7jC7NZaR7LGcGhXwgMNC+WFt0MxEomZcECQ9EY4JkgAQDilSNKnGuxXJ0u2hdG9YUZkiZcfWpaOWkUv0G6IaCseVVH81o0dEEClKGokassX0hKSk44PxBGOS4E8cmNk+OMSY5+2cXfz8zI4hrG4jI9tnFpW/hqKx7PCnH1O7wpFkqeANT4IUVhopPTUwnNJxzSlUzLASV+4YfUIkpoQFTYvoMUFkJgtJ/Z6VEIyymx4usdCW5CuDc9s+dZDm6GeiejTl1jN6VFKUdMHMlUIWzaQEOdyrKHIsL0VZJB0TE1rUlLvCo71yPKya3dW+ONBQRBajUdPuKoXFsBAOiYoUdx7JtSXlU3ZJNAW1O+4ktBCFqBjLJhMW97JgyonISE5kVIJQJJ6tO6nueCJj1TV/D6uMzu06tH/H44NlRr3RnbNPLu7cXh75sWOklURzi5ZI9dgqG6tuEAf0bkWX0/0j6S6+RjfaYiQsbkKHhuNdms6kUExWZNGSlJgzkjIGjPK61KjLxOvGc/1/27r9KOQe7omHe+LhnvjQnmArLTyHMYHiPbGbFLEL4Q1BxOsiHrfy2HIBz67BXQbPsVbB4TNDZP/wF4x63cAxUl/PRtbXI61f2QM2/iuZUqleKr3ABp1Mxnn/rjvpOJN0b9K2k/73+Xi/VHOcGl4qyf8AzjWNo3icY2BkYGAA4uhnXafj+W2+MnCzgASiOB/va4DR///+/8/CysIElOBgAJEMAHS2DWQAAAB4nGNgZGBgYQABFtb/f///ZWFlYGRABToAW+YEPQAAAHicY2BgYGAhiP//J6wGCbNCMcP/vwxUBgDl4QRhAAAAeJxjYAACBQYThiCGAoYtjAyMZowBjPuYuJjCmBYxvWNWYXZhzmFewfyIRYUliPUOexr7EmIhAF3rF0sAeJxjYGRgYNBhZGRgZwABJiDmAkIGhv9gPgMADcIBTAB4nGWQPW7CQBSEx2BIAlKCFCkps1UKIpmfkgNAT0GXwpi1MbK91npBossJcoQcIaeIcoIcKGPzaGAtP38zb97uygAG+IWHenm4bWq9WrihOnGb9CDsk5+FO+jjRbhLfyjcwxumwn084p07eP4dnQFK4Rbu8SHcpv8p7JO/hDt4wrdwl/6PcA8r/An38eoN08gUsSncUif7LLRnef6utK1SU6hJMD5bC11oGzq9Ueujqg7J1LlYxdbkas6uzjKjSmt2OnLB1rlyNhrF4geRyZEigkGBuKkOS2gk2CNDCHvVvdQrpi0q+rVWmCDA+Cq1YKpokiGVxobJNY6sFQ48bUrXMa34Ws7kpLnMat4kIyv+77q3oxPRD7BtpkrMMOITX+SD5g75Pz0RXqgAAAB4nG2MyW6DQBiD+RKYpKT7vqf7Gg55pNHwEyJNGDSMRHj70nKtD7Zly45G0YA0+h8LRoyJSVBMmLJDyoxd9tjngEOOOOaEU84454JLrrjmhlvuuGfOA4888cwLr7zxzgeffPHNgixKtfeuzawUYTZYv16VITXaS8hy11azwf7FibGi/dS4Te2laWLj6k7lYiVIIv3aK9nWusqng2TLsXR900m2VMXaBvFxbXWnvBjn84mXor8pk54kqKa/NmUvVkyIg3NW/VK2jFvtKzQeR0uGRSgIrFlRYsip2FDT0LGNoh/MCkh9AAAA') format('woff')}[class*=' _icon-'],[class^='_icon-']{display:inline-block;font-family:eruda-icon!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}._icon-arrow-left:before{content:'\\f101'}._icon-arrow-right:before{content:'\\f102'}._icon-caret-down:before{content:'\\f103'}._icon-caret-right:before{content:'\\f104'}._icon-clear:before{content:'\\f105'}._icon-compress:before{content:'\\f106'}._icon-copy:before{content:'\\f107'}._icon-delete:before{content:'\\f108'}._icon-error:before{content:'\\f109'}._icon-expand:before{content:'\\f10a'}._icon-eye:before{content:'\\f10b'}._icon-filter:before{content:'\\f10c'}._icon-play:before{content:'\\f10d'}._icon-record:before{content:'\\f10e'}._icon-refresh:before{content:'\\f10f'}._icon-reset:before{content:'\\f110'}._icon-search:before{content:'\\f111'}._icon-select:before{content:'\\f112'}._icon-tool:before{content:'\\f113'}._icon-warn:before{content:'\\f114'}", ""]), e2.exports = t;
        }, 3645: function(e2) {
          e2.exports = function(e3) {
            var t = [];
            return t.toString = function() {
              return this.map(function(t2) {
                var n2 = function(e4, t3) {
                  var n3 = e4[1] || "", o = e4[3];
                  if (!o)
                    return n3;
                  if (t3 && "function" == typeof btoa) {
                    var r2 = (a = o, s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), c = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s), "/*# ".concat(c, " */")), i = o.sources.map(function(e5) {
                      return "/*# sourceURL=".concat(o.sourceRoot || "").concat(e5, " */");
                    });
                    return [n3].concat(i).concat([r2]).join("\n");
                  }
                  var a, s, c;
                  return [n3].join("\n");
                }(t2, e3);
                return t2[2] ? "@media ".concat(t2[2], " {").concat(n2, "}") : n2;
              }).join("");
            }, t.i = function(e4, n2, o) {
              "string" == typeof e4 && (e4 = [[null, e4, ""]]);
              var r2 = {};
              if (o)
                for (var i = 0; i < this.length; i++) {
                  var a = this[i][0];
                  null != a && (r2[a] = true);
                }
              for (var s = 0; s < e4.length; s++) {
                var c = [].concat(e4[s]);
                o && r2[c[0]] || (n2 && (c[2] ? c[2] = "".concat(n2, " and ").concat(c[2]) : c[2] = n2), t.push(c));
              }
            }, t;
          };
        }, 1512: function(e2, t, n2) {
          var o = n2(3244), r2 = n2(6906), i = n2(7665), a = n2(975), s = n2(4991), c = n2(4209), l = n2(9702), u2 = n2(6757), d2 = n2(8381), f2 = n2(5543), h = n2(7781), p = n2(8908), v = n2(1286), m = n2(6768);
          t = function(e3) {
            return new o(e3);
          }, o.methods({ offset: function() {
            return r2(this);
          }, hide: function() {
            return this.css("display", "none");
          }, show: function() {
            return i(this), this;
          }, first: function() {
            return t(this[0]);
          }, last: function() {
            return t(l(this));
          }, get: function(e3) {
            return this[e3];
          }, eq: function(e3) {
            return t(this[e3]);
          }, on: function(e3, t2, n3) {
            return f2.on(this, e3, t2, n3), this;
          }, off: function(e3, t2, n3) {
            return f2.off(this, e3, t2, n3), this;
          }, html: function(e3) {
            var t2 = c.html(this, e3);
            return v(e3) ? t2 : this;
          }, text: function(e3) {
            var t2 = c.text(this, e3);
            return v(e3) ? t2 : this;
          }, val: function(e3) {
            var t2 = c.val(this, e3);
            return v(e3) ? t2 : this;
          }, css: function(e3, t2) {
            var n3 = a(this, e3, t2);
            return g(e3, t2) ? n3 : this;
          }, attr: function(e3, t2) {
            var n3 = s(this, e3, t2);
            return g(e3, t2) ? n3 : this;
          }, data: function(e3, t2) {
            var n3 = d2(this, e3, t2);
            return g(e3, t2) ? n3 : this;
          }, rmAttr: function(e3) {
            return s.remove(this, e3), this;
          }, remove: function() {
            return u2(this), this;
          }, addClass: function(e3) {
            return h.add(this, e3), this;
          }, rmClass: function(e3) {
            return h.remove(this, e3), this;
          }, toggleClass: function(e3) {
            return h.toggle(this, e3), this;
          }, hasClass: function(e3) {
            return h.has(this, e3);
          }, parent: function() {
            return t(this[0].parentNode);
          }, append: function(e3) {
            return p.append(this, e3), this;
          }, prepend: function(e3) {
            return p.prepend(this, e3), this;
          }, before: function(e3) {
            return p.before(this, e3), this;
          }, after: function(e3) {
            return p.after(this, e3), this;
          } });
          var g = function(e3, t2) {
            return v(t2) && m(e3);
          };
          e2.exports = t;
        }, 4991: function(e2, t, n2) {
          var o = n2(1352), r2 = n2(5166), i = n2(6768), a = n2(3783), s = n2(1286), c = n2(2341);
          (t = function(e3, t2, n3) {
            if (e3 = c(e3), s(n3) && i(t2))
              return function(e4, t3) {
                return e4.getAttribute(t3);
              }(e3[0], t2);
            var o2 = t2;
            r2(o2) || ((o2 = {})[t2] = n3), function(e4, t3) {
              a(e4, function(e5) {
                a(t3, function(t4, n4) {
                  e5.setAttribute(n4, t4);
                });
              });
            }(e3, o2);
          }).remove = function(e3, t2) {
            e3 = c(e3), t2 = o(t2), a(e3, function(e4) {
              a(t2, function(t3) {
                e4.removeAttribute(t3);
              });
            });
          }, e2.exports = t;
        }, 7781: function(e2, t, n2) {
          var o = n2(1352), r2 = n2(6053), i = n2(2341), a = n2(6768), s = n2(3783);
          function c(e3) {
            return a(e3) ? e3.split(/\s+/) : o(e3);
          }
          t = { add: function(e3, n3) {
            e3 = i(e3);
            var o2 = c(n3);
            s(e3, function(e4) {
              var n4 = [];
              s(o2, function(o3) {
                t.has(e4, o3) || n4.push(o3);
              }), 0 !== n4.length && (e4.className += (e4.className ? " " : "") + n4.join(" "));
            });
          }, has: function(e3, t2) {
            e3 = i(e3);
            var n3 = new RegExp("(^|\\s)" + t2 + "(\\s|$)");
            return r2(e3, function(e4) {
              return n3.test(e4.className);
            });
          }, toggle: function(e3, n3) {
            e3 = i(e3), s(e3, function(e4) {
              if (!t.has(e4, n3))
                return t.add(e4, n3);
              t.remove(e4, n3);
            });
          }, remove: function(e3, t2) {
            e3 = i(e3);
            var n3 = c(t2);
            s(e3, function(e4) {
              s(n3, function(t3) {
                e4.classList.remove(t3);
              });
            });
          } }, e2.exports = t;
        }, 975: function(e2, t, n2) {
          var o = n2(6768), r2 = n2(5166), i = n2(7622), a = n2(1286), s = n2(6341), c = n2(3990), l = n2(2341), u2 = n2(747), d2 = n2(3783);
          t = function(e3, t2, n3) {
            if (e3 = l(e3), a(n3) && o(t2))
              return function(e4, t3) {
                return e4.style[u2(t3)] || getComputedStyle(e4, "").getPropertyValue(t3);
              }(e3[0], t2);
            var h = t2;
            r2(h) || ((h = {})[t2] = n3), function(e4, t3) {
              d2(e4, function(e5) {
                var n4 = ";";
                d2(t3, function(e6, t4) {
                  t4 = u2.dash(t4), n4 += t4 + ":" + function(e7, t5) {
                    var n5 = c(t5) && !s(f2, i(e7));
                    return n5 ? t5 + "px" : t5;
                  }(t4, e6) + ";";
                }), e5.style.cssText += n4;
              });
            }(e3, h);
          };
          var f2 = ["column-count", "columns", "font-weight", "line-weight", "opacity", "z-index", "zoom"];
          e2.exports = t;
        }, 8381: function(e2, t, n2) {
          var o = n2(4991), r2 = n2(6768), i = n2(5166), a = n2(3783);
          n2(2341);
          t = function(e3, t2, n3) {
            var s = t2;
            return r2(t2) && (s = "data-" + t2), i(t2) && (s = {}, a(t2, function(e4, t3) {
              s["data-" + t3] = e4;
            })), o(e3, s, n3);
          }, e2.exports = t;
        }, 5543: function(e2, t, n2) {
          var o = n2(2443), r2 = n2(1286), i = n2(2341), a = n2(3783);
          function s(e3) {
            return function(t2, n3, s2, c) {
              t2 = i(t2), r2(c) && (c = s2, s2 = void 0), a(t2, function(t3) {
                o[e3](t3, n3, s2, c);
              });
            };
          }
          t = { on: s("add"), off: s("remove") }, e2.exports = t;
        }, 8908: function(e2, t, n2) {
          var o = n2(3783), r2 = n2(2341), i = n2(6768);
          function a(e3) {
            return function(t2, n3) {
              t2 = r2(t2), o(t2, function(t3) {
                if (i(n3))
                  t3.insertAdjacentHTML(e3, n3);
                else {
                  var o2 = t3.parentNode;
                  switch (e3) {
                    case "beforebegin":
                      o2 && o2.insertBefore(n3, t3);
                      break;
                    case "afterend":
                      o2 && o2.insertBefore(n3, t3.nextSibling);
                      break;
                    case "beforeend":
                      t3.appendChild(n3);
                      break;
                    case "afterbegin":
                      t3.prepend(n3);
                  }
                }
              });
            };
          }
          t = { before: a("beforebegin"), after: a("afterend"), append: a("beforeend"), prepend: a("afterbegin") }, e2.exports = t;
        }, 6906: function(e2, t, n2) {
          var o = n2(2341);
          t = function(e3) {
            var t2 = (e3 = o(e3))[0].getBoundingClientRect();
            return { left: t2.left + window.pageXOffset, top: t2.top + window.pageYOffset, width: Math.round(t2.width), height: Math.round(t2.height) };
          }, e2.exports = t;
        }, 4209: function(e2, t, n2) {
          var o = n2(1286), r2 = n2(3783), i = n2(2341);
          function a(e3) {
            return function(t2, n3) {
              var a2 = (t2 = i(t2))[0];
              if (o(n3))
                return a2 ? a2[e3] : "";
              a2 && r2(t2, function(t3) {
                t3[e3] = n3;
              });
            };
          }
          t = { html: a("innerHTML"), text: a("textContent"), val: a("value") }, e2.exports = t;
        }, 6757: function(e2, t, n2) {
          var o = n2(3783), r2 = n2(2341);
          t = function(e3) {
            e3 = r2(e3), o(e3, function(e4) {
              var t2 = e4.parentNode;
              t2 && t2.removeChild(e4);
            });
          }, e2.exports = t;
        }, 2341: function(e2, t, n2) {
          var o = n2(6768), r2 = n2(1352), i = n2(3244);
          t = function(e3) {
            return r2(o(e3) ? new i(e3) : e3);
          }, e2.exports = t;
        }, 7665: function(e2, t, n2) {
          var o = n2(3783), r2 = n2(2341);
          t = function(e3) {
            e3 = r2(e3), o(e3, function(e4) {
              (function(e5) {
                return "none" == getComputedStyle(e5, "").getPropertyValue("display");
              })(e4) && (e4.style.display = function(e5) {
                var t2, n3;
                i[e5] || (t2 = document.createElement(e5), document.documentElement.appendChild(t2), n3 = getComputedStyle(t2, "").getPropertyValue("display"), t2.parentNode.removeChild(t2), "none" == n3 && (n3 = "block"), i[e5] = n3);
                return i[e5];
              }(e4.nodeName));
            });
          };
          var i = {};
          e2.exports = t;
        }, 7496: function(e2, t, n2) {
          var o = n2(6329), r2 = n2(1352), i = n2(5022), a = n2(7653), s = n2(9537);
          var c = (t = function(e3, t2) {
            return c.extend(e3, t2);
          }).Base = function e3(t2, n3, c2) {
            c2 = c2 || {};
            var l = n3.className || a(n3, "initialize.name") || "";
            delete n3.className;
            var u2 = function() {
              var e4 = r2(arguments);
              return this.initialize && this.initialize.apply(this, e4) || this;
            };
            if (!s)
              try {
                u2 = new Function("toArr", "return function " + l + "(){var args = toArr(arguments);return this.initialize ? this.initialize.apply(this, args) || this : this;};")(r2);
              } catch (e4) {
              }
            return i(u2, t2), u2.prototype.constructor = u2, u2.extend = function(t3, n4) {
              return e3(u2, t3, n4);
            }, u2.inherits = function(e4) {
              i(u2, e4);
            }, u2.methods = function(e4) {
              return o(u2.prototype, e4), u2;
            }, u2.statics = function(e4) {
              return o(u2, e4), u2;
            }, u2.methods(n3).statics(c2), u2;
          }(Object, { className: "Base", callSuper: function(e3, t2, n3) {
            return e3.prototype[t2].apply(this, n3);
          }, toString: function() {
            return this.constructor.name;
          } });
          e2.exports = t;
        }, 3009: function(e2, t, n2) {
          var o = n2(7496), r2 = n2(6768), i = n2(9882), a = n2(3279), s = n2(5925), c = n2(5044);
          t = o({ initialize: function(e3) {
            r2(e3) && (e3 = t.parse(e3)), this.model = e3.model, this.val = e3.val;
          }, toRgb: function() {
            var e3 = this.val;
            "hsl" === this.model && (e3 = s(e3));
            var t2 = "rgba";
            return 1 === e3[3] && (t2 = "rgb", e3 = e3.slice(0, 3)), t2 + "(" + e3.join(", ") + ")";
          }, toHex: function() {
            var e3 = this.val;
            "hsl" === this.model && (e3 = s(e3));
            var t2 = c.encode(e3.slice(0, 3));
            return t2[0] === t2[1] && t2[2] === t2[3] && t2[4] === t2[5] && (t2 = t2[0] + t2[2] + t2[5]), "#" + t2;
          }, toHsl: function() {
            var e3 = this.val;
            "rgb" === this.model && (e3 = a(e3));
            var t2 = "hsla";
            return 1 === e3[3] && (t2 = "hsl", e3 = e3.slice(0, 3)), e3[1] = e3[1] + "%", e3[2] = e3[2] + "%", t2 + "(" + e3.join(", ") + ")";
          } }, { parse: function(e3) {
            var t2, n3, o2 = [0, 0, 0, 1], r3 = "rgb";
            if (n3 = e3.match(l))
              for (n3 = n3[1], t2 = 0; t2 < 3; t2++)
                o2[t2] = parseInt(n3[t2] + n3[t2], 16);
            else if (n3 = e3.match(u2))
              for (n3 = n3[1], t2 = 0; t2 < 3; t2++) {
                var a2 = 2 * t2;
                o2[t2] = parseInt(n3.slice(a2, a2 + 2), 16);
              }
            else if (n3 = e3.match(d2)) {
              for (t2 = 0; t2 < 3; t2++)
                o2[t2] = parseInt(n3[t2 + 1], 0);
              n3[4] && (o2[3] = parseFloat(n3[4]));
            } else if (n3 = e3.match(f2)) {
              for (t2 = 0; t2 < 3; t2++)
                o2[t2] = Math.round(2.55 * parseFloat(n3[t2 + 1]));
              n3[4] && (o2[3] = parseFloat(n3[4]));
            } else
              (n3 = e3.match(h)) && (r3 = "hsl", o2 = [(parseFloat(n3[1]) % 360 + 360) % 360, i(parseFloat(n3[2]), 0, 100), i(parseFloat(n3[3]), 0, 100), i(parseFloat(n3[4]), 0, 1)]);
            return { val: o2, model: r3 };
          } });
          var l = /^#([a-fA-F0-9]{3})$/, u2 = /^#([a-fA-F0-9]{6})$/, d2 = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/, f2 = /^rgba?\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/, h = /^hsla?\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
          e2.exports = t;
        }, 1443: function(e2, t, n2) {
          var o = n2(7496), r2 = n2(6257), i = n2(3783), a = n2(9677), s = n2(8763), c = n2(4675);
          t = o({ initialize: function() {
            this._events = this._events || {};
          }, on: function(e3, t2) {
            return this._events[e3] = this._events[e3] || [], this._events[e3].push(t2), this;
          }, off: function(e3, t2) {
            var n3 = this._events;
            if (r2(n3, e3)) {
              var o2 = n3[e3].indexOf(t2);
              return o2 > -1 && n3[e3].splice(o2, 1), this;
            }
          }, once: function(e3, t2) {
            return this.on(e3, s(t2)), this;
          }, emit: function(e3) {
            var t2 = this;
            if (r2(this._events, e3)) {
              var n3 = a(arguments, 1), o2 = c(this._events[e3]);
              return i(o2, function(e4) {
                return e4.apply(t2, n3);
              }, this), this;
            }
          }, removeAllListeners: function(e3) {
            return e3 ? delete this._events[e3] : this._events = {}, this;
          } }, { mixin: function(e3) {
            i(["on", "off", "once", "emit", "removeAllListeners"], function(n3) {
              e3[n3] = t.prototype[n3];
            }), e3._events = e3._events || {};
          } }), e2.exports = t;
        }, 9640: function(e2, t, n2) {
          var o = n2(7496), r2 = n2(4454), i = n2(6472), a = n2(3783), s = n2(2533);
          t = o({ initialize: function(e3) {
            i(e3) ? (this.size = e3.length, a(e3, function(e4, t2) {
              this[e4] = t2;
            }, this)) : (this.size = s(e3).length, a(e3, function(e4, t2) {
              this[t2] = e4;
            }, this)), r2(this);
          } }), e2.exports = t;
        }, 125: function(e2, t, n2) {
          var o = n2(5128), r2 = n2(615), i = n2(8887), a = n2(4400), s = n2(4193), c = n2(5166), l = r2("local");
          t = o.extend({ initialize: function(e3, t2) {
            this._name = e3, t2 = t2 || {};
            var n3 = l.getItem(e3);
            try {
              n3 = JSON.parse(n3);
            } catch (e4) {
              n3 = {};
            }
            c(n3) || (n3 = {}), t2 = s(n3, t2), this.callSuper(o, "initialize", [t2]);
          }, save: function(e3) {
            if (i(e3))
              return l.removeItem(this._name);
            l.setItem(this._name, a(e3));
          } }), e2.exports = t;
        }, 4989: function(e2, t, n2) {
          var o = n2(1443), r2 = n2(9640), i = n2(1352), a = n2(1286), s = n2(4675), c = n2(6768), l = n2(3990);
          t = o.extend({ initialize: function(e3, n3) {
            this.name = e3, this.setLevel(a(n3) ? t.level.DEBUG : n3), this.callSuper(o, "initialize", arguments);
          }, setLevel: function(e3) {
            return c(e3) ? ((e3 = t.level[e3.toUpperCase()]) && (this._level = e3), this) : (l(e3) && (this._level = e3), this);
          }, getLevel: function() {
            return this._level;
          }, formatter: function(e3, t2) {
            return t2;
          }, trace: function() {
            return this._log("trace", arguments);
          }, debug: function() {
            return this._log("debug", arguments);
          }, info: function() {
            return this._log("info", arguments);
          }, warn: function() {
            return this._log("warn", arguments);
          }, error: function() {
            return this._log("error", arguments);
          }, _log: function(e3, n3) {
            return 0 === (n3 = i(n3)).length ? this : (this.emit("all", e3, s(n3)), t.level[e3.toUpperCase()] < this._level || (this.emit(e3, s(n3)), ("debug" === e3 ? console.log : console[e3]).apply(console, this.formatter(e3, n3))), this);
          } }, { level: new r2({ TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, SILENT: 5 }) }), e2.exports = t;
        }, 2765: function(e2, t, n2) {
          var o = n2(1443);
          t = o.extend({ className: "MediaQuery", initialize: function(e3) {
            var t2 = this;
            this.callSuper(o, "initialize"), this._listener = function() {
              t2.emit(t2.isMatch() ? "match" : "unmatch");
            }, this.setQuery(e3);
          }, setQuery: function(e3) {
            this._mql && this._mql.removeListener(this._listener), this._mql = window.matchMedia(e3), this._mql.addListener(this._listener);
          }, isMatch: function() {
            return this._mql.matches;
          } }), e2.exports = t;
        }, 2289: function(e2, t, n2) {
          var o = n2(7496);
          (t = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver) || (t = o({ initialize: function() {
          }, observe: function() {
          }, disconnect: function() {
          }, takeRecords: function() {
          } })), e2.exports = t;
        }, 242: function(e2, t, n2) {
          var o = n2(8985), r2 = n2(8613), i = n2(5543), a = n2(975), s = n2(6341), c = n2(6329), l = n2(5610);
          t = l.ResizeObserver ? o.extend({ initialize: function(e3) {
            var t2 = this;
            if (e3._resizeSensor)
              return e3._resizeSensor;
            this.callSuper(o, "initialize");
            var n3 = new l.ResizeObserver(function() {
              return t2.emit();
            });
            n3.observe(e3), e3._resizeSensor = this, this._resizeObserver = n3, this._el = e3;
          }, destroy: function() {
            var e3 = this._el;
            e3._resizeSensor && (this.rmAllListeners(), delete e3._resizeSensor, this._resizeObserver.unobserve(e3));
          } }) : o.extend({ initialize: function(e3) {
            if (e3._resizeSensor)
              return e3._resizeSensor;
            this.callSuper(o, "initialize"), this._el = e3, e3._resizeSensor = this, s(["absolute", "relative", "fixed", "sticky"], a(e3, "position")) || a(e3, "position", "relative"), this._appendResizeSensor(), this._bindEvent();
          }, destroy: function() {
            var e3 = this._el;
            e3._resizeSensor && (this.rmAllListeners(), delete e3._resizeSensor, e3.removeChild(this._resizeSensorEl));
          }, _appendResizeSensor: function() {
            var e3 = this._el, t2 = { pointerEvents: "none", position: "absolute", left: "0px", top: "0px", right: "0px", bottom: "0px", overflow: "hidden", zIndex: "-1", visibility: "hidden", maxWidth: "100%" }, n3 = { position: "absolute", left: "0px", top: "0px", transition: "0s" }, o2 = r2("div", { style: n3 }), i2 = r2("div.resize-sensor-expand", { style: t2 }, o2), a2 = r2("div.resize-sensor-shrink", { style: t2 }, r2("div", { style: c({ width: "200%", height: "200%" }, n3) })), s2 = r2("div.resize-sensor", { dir: "ltr", style: t2 }, i2, a2);
            this._expandEl = i2, this._expandChildEl = o2, this._shrinkEl = a2, this._resizeSensorEl = s2, e3.appendChild(s2), this._resetExpandShrink();
          }, _bindEvent: function() {
            var e3 = this;
            i.on(this._expandEl, "scroll", function() {
              return e3._onScroll();
            }), i.on(this._shrinkEl, "scroll", function() {
              return e3._onScroll();
            });
          }, _onScroll: function() {
            this.emit(), this._resetExpandShrink();
          }, _resetExpandShrink: function() {
            var e3 = this._el, t2 = e3.offsetWidth, n3 = e3.offsetHeight;
            a(this._expandChildEl, { width: t2 + 10, height: n3 + 10 }), c(this._expandEl, { scrollLeft: t2 + 10, scrollTop: n3 + 10 }), c(this._shrinkEl, { scrollLeft: t2 + 10, scrollTop: n3 + 10 });
          } }), e2.exports = t;
        }, 3244: function(e2, t, n2) {
          var o = n2(7496), r2 = n2(6768), i = n2(3783), a = n2(9971), s = new (t = o({ className: "Select", initialize: function(e3) {
            return this.length = 0, e3 ? r2(e3) ? s.find(e3) : void (e3.nodeType && (this[0] = e3, this.length = 1)) : this;
          }, find: function(e3) {
            var n3 = new t();
            return this.each(function() {
              a(n3, this.querySelectorAll(e3));
            }), n3;
          }, each: function(e3) {
            return i(this, function(t2, n3) {
              e3.call(t2, n3, t2);
            }), this;
          } }))(document);
          e2.exports = t;
        }, 8985: function(e2, t, n2) {
          var o = n2(7496), r2 = n2(4675), i = n2(3783), a = n2(1352);
          t = o({ initialize: function() {
            this._listeners = [];
          }, addListener: function(e3) {
            this._listeners.push(e3);
          }, rmListener: function(e3) {
            var t2 = this._listeners.indexOf(e3);
            t2 > -1 && this._listeners.splice(t2, 1);
          }, rmAllListeners: function() {
            this._listeners = [];
          }, emit: function() {
            var e3 = this, t2 = a(arguments), n3 = r2(this._listeners);
            i(n3, function(n4) {
              return n4.apply(e3, t2);
            }, this);
          } }, { mixin: function(e3) {
            i(["addListener", "rmListener", "emit", "rmAllListeners"], function(n3) {
              e3[n3] = t.prototype[n3];
            }), e3._listeners = e3._listeners || [];
          } }), e2.exports = t;
        }, 9001: function(e2, t, n2) {
          var o = n2(7496), r2 = n2(1527);
          t = o({ initialize: function() {
            this.clear();
          }, clear: function() {
            this._items = [], this.size = 0;
          }, push: function(e3) {
            return this._items.push(e3), ++this.size;
          }, pop: function() {
            if (this.size)
              return this.size--, this._items.pop();
          }, peek: function() {
            return this._items[this.size - 1];
          }, forEach: function(e3, t2) {
            t2 = arguments.length > 1 ? t2 : this;
            for (var n3 = this._items, o2 = this.size - 1, r3 = 0; o2 >= 0; o2--, r3++)
              e3.call(t2, n3[o2], r3, this);
          }, toArr: function() {
            return r2(this._items);
          } }), e2.exports = t;
        }, 5128: function(e2, t, n2) {
          var o = n2(1443), r2 = n2(6768), i = n2(5166), a = n2(3783), s = n2(1352);
          t = o.extend({ initialize: function(e3) {
            this.callSuper(o, "initialize", arguments), this._data = e3 || {}, this.save(this._data);
          }, set: function(e3, t2) {
            var n3;
            r2(e3) ? (n3 = {})[e3] = t2 : i(e3) && (n3 = e3);
            var o2 = this;
            a(n3, function(e4, t3) {
              var n4 = o2._data[t3];
              o2._data[t3] = e4, o2.emit("change", t3, e4, n4);
            }), this.save(this._data);
          }, get: function(e3) {
            var t2 = this._data;
            if (r2(e3))
              return t2[e3];
            var n3 = {};
            return a(e3, function(e4) {
              n3[e4] = t2[e4];
            }), n3;
          }, remove: function(e3) {
            e3 = s(e3);
            var t2 = this._data;
            a(e3, function(e4) {
              delete t2[e4];
            }), this.save(t2);
          }, clear: function() {
            this._data = {}, this.save(this._data);
          }, each: function(e3) {
            a(this._data, e3);
          }, save: function(e3) {
            this._data = e3;
          } }), e2.exports = t;
        }, 6334: function(e2, t, n2) {
          var o = n2(7496), r2 = n2(6329), i = n2(4331), a = n2(1745), s = n2(8887), c = n2(3783), l = n2(6472), u2 = n2(1352), d2 = n2(2727), f2 = n2(5166), h = n2(3367);
          t = o({ className: "Url", initialize: function(e3) {
            !e3 && d2 && (e3 = window.location.href), r2(this, t.parse(e3 || ""));
          }, setQuery: function(e3, t2) {
            var n3 = this.query;
            return f2(e3) ? c(e3, function(e4, t3) {
              n3[t3] = h(e4);
            }) : n3[e3] = h(t2), this;
          }, rmQuery: function(e3) {
            var t2 = this.query;
            return l(e3) || (e3 = u2(e3)), c(e3, function(e4) {
              delete t2[e4];
            }), this;
          }, toString: function() {
            return t.stringify(this);
          } }, { parse: function(e3) {
            var t2 = { protocol: "", auth: "", hostname: "", hash: "", query: {}, port: "", pathname: "", slashes: false }, n3 = i(e3), o2 = false, r3 = n3.match(p);
            if (r3 && (r3 = r3[0], t2.protocol = r3.toLowerCase(), n3 = n3.substr(r3.length)), r3 && (o2 = "//" === n3.substr(0, 2)) && (n3 = n3.slice(2), t2.slashes = true), o2) {
              for (var s2 = n3, c2 = -1, l2 = 0, u3 = m.length; l2 < u3; l2++) {
                var d3 = n3.indexOf(m[l2]);
                -1 !== d3 && (-1 === c2 || d3 < c2) && (c2 = d3);
              }
              c2 > -1 && (s2 = n3.slice(0, c2), n3 = n3.slice(c2));
              var f3 = s2.lastIndexOf("@");
              -1 !== f3 && (t2.auth = decodeURIComponent(s2.slice(0, f3)), s2 = s2.slice(f3 + 1)), t2.hostname = s2;
              var h2 = s2.match(v);
              h2 && (":" !== (h2 = h2[0]) && (t2.port = h2.substr(1)), t2.hostname = s2.substr(0, s2.length - h2.length));
            }
            var g = n3.indexOf("#");
            -1 !== g && (t2.hash = n3.substr(g), n3 = n3.slice(0, g));
            var b = n3.indexOf("?");
            return -1 !== b && (t2.query = a.parse(n3.substr(b + 1)), n3 = n3.slice(0, b)), t2.pathname = n3 || "/", t2;
          }, stringify: function(e3) {
            var t2 = e3.protocol + (e3.slashes ? "//" : "") + (e3.auth ? encodeURIComponent(e3.auth) + "@" : "") + e3.hostname + (e3.port ? ":" + e3.port : "") + e3.pathname;
            return s(e3.query) || (t2 += "?" + a.stringify(e3.query)), e3.hash && (t2 += e3.hash), t2;
          } });
          var p = /^([a-z0-9.+-]+:)/i, v = /:[0-9]*$/, m = ["/", "?", "#"];
          e2.exports = t;
        }, 8991: function(e2, t, n2) {
          var o = n2(4777), r2 = n2(1214), i = n2(4193), a = n2(5166), s = n2(1745);
          function c(e3, t2, n3, r3) {
            return o(t2) && (r3 = n3, n3 = t2, t2 = {}), { url: e3, data: t2, success: n3, dataType: r3 };
          }
          (t = function(e3) {
            i(e3, t.setting);
            var n3, o2 = e3.type, c2 = e3.url, l = e3.data, u2 = e3.dataType, d2 = e3.success, f2 = e3.error, h = e3.timeout, p = e3.complete, v = e3.xhr();
            return v.onreadystatechange = function() {
              if (4 === v.readyState) {
                var e4;
                clearTimeout(n3);
                var t2 = v.status;
                if (t2 >= 200 && t2 < 300 || 304 === t2) {
                  e4 = v.responseText, "xml" === u2 && (e4 = v.responseXML);
                  try {
                    "json" === u2 && (e4 = JSON.parse(e4));
                  } catch (e5) {
                  }
                  d2(e4, v);
                } else
                  f2(v);
                p(v);
              }
            }, "GET" === o2 ? (l = s.stringify(l)) && (c2 += c2.indexOf("?") > -1 ? "&" + l : "?" + l) : "application/x-www-form-urlencoded" === e3.contentType ? a(l) && (l = s.stringify(l)) : "application/json" === e3.contentType && a(l) && (l = JSON.stringify(l)), v.open(o2, c2, true), v.setRequestHeader("Content-Type", e3.contentType), h > 0 && (n3 = setTimeout(function() {
              v.onreadystatechange = r2, v.abort(), f2(v, "timeout"), p(v);
            }, h)), v.send("GET" === o2 ? null : l), v;
          }).setting = { type: "GET", success: r2, error: r2, complete: r2, dataType: "json", contentType: "application/x-www-form-urlencoded", data: {}, xhr: function() {
            return new XMLHttpRequest();
          }, timeout: 0 }, t.get = function() {
            return t(c.apply(null, arguments));
          }, t.post = function() {
            var e3 = c.apply(null, arguments);
            return e3.type = "POST", t(e3);
          }, e2.exports = t;
        }, 1116: function(e2, t, n2) {
          var o = n2(2533), r2 = n2(415), i = n2(42), a = Object.getOwnPropertyNames, s = Object.getOwnPropertySymbols;
          t = function(e3) {
            var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = t2.prototype, c = void 0 === n3 || n3, l = t2.unenumerable, u2 = void 0 !== l && l, d2 = t2.symbol, f2 = void 0 !== d2 && d2, h = [];
            if ((u2 || f2) && a) {
              var p = o;
              u2 && a && (p = a);
              do {
                h = h.concat(p(e3)), f2 && s && (h = h.concat(s(e3)));
              } while (c && (e3 = r2(e3)) && e3 !== Object.prototype);
              h = i(h);
            } else if (c)
              for (var v in e3)
                h.push(v);
            else
              h = o(e3);
            return h;
          }, e2.exports = t;
        }, 7913: function(e2, t, n2) {
          var o = n2(3783), r2 = n2(1286), i = n2(4777);
          t = function(e3, t2) {
            r2(t2) && (t2 = true);
            var n3 = i(t2), a = {};
            return o(e3, function(e4) {
              a[e4] = n3 ? t2(e4) : t2;
            }), a;
          }, e2.exports = t;
        }, 3901: function(e2, t) {
          t = { encode: function(e3) {
            var t2, n3, r3 = [], i2 = e3.length, a = i2 % 3;
            i2 -= a;
            for (var s = 0; s < i2; s += 3)
              r3.push((t2 = (e3[s] << 16) + (e3[s + 1] << 8) + e3[s + 2], o[t2 >> 18 & 63] + o[t2 >> 12 & 63] + o[t2 >> 6 & 63] + o[63 & t2]));
            return i2 = e3.length, 1 === a ? (n3 = e3[i2 - 1], r3.push(o[n3 >> 2]), r3.push(o[n3 << 4 & 63]), r3.push("==")) : 2 === a && (n3 = (e3[i2 - 2] << 8) + e3[i2 - 1], r3.push(o[n3 >> 10]), r3.push(o[n3 >> 4 & 63]), r3.push(o[n3 << 2 & 63]), r3.push("=")), r3.join("");
          }, decode: function(e3) {
            var t2 = e3.length, o2 = 0;
            "=" === e3[t2 - 2] ? o2 = 2 : "=" === e3[t2 - 1] && (o2 = 1);
            var r3, i2, a, s, c, l, u2, d2 = new Array(3 * t2 / 4 - o2);
            for (t2 = o2 > 0 ? t2 - 4 : t2, r3 = 0, i2 = 0; r3 < t2; r3 += 4) {
              var f2 = (a = e3[r3], s = e3[r3 + 1], c = e3[r3 + 2], l = e3[r3 + 3], n2[a.charCodeAt(0)] << 18 | n2[s.charCodeAt(0)] << 12 | n2[c.charCodeAt(0)] << 6 | n2[l.charCodeAt(0)]);
              d2[i2++] = f2 >> 16 & 255, d2[i2++] = f2 >> 8 & 255, d2[i2++] = 255 & f2;
            }
            return 2 === o2 ? (u2 = n2[e3.charCodeAt(r3)] << 2 | n2[e3.charCodeAt(r3 + 1)] >> 4, d2[i2++] = 255 & u2) : 1 === o2 && (u2 = n2[e3.charCodeAt(r3)] << 10 | n2[e3.charCodeAt(r3 + 1)] << 4 | n2[e3.charCodeAt(r3 + 2)] >> 2, d2[i2++] = u2 >> 8 & 255, d2[i2++] = 255 & u2), d2;
          } };
          for (var n2 = [], o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r2 = 0, i = o.length; r2 < i; r2++)
            n2[o.charCodeAt(r2)] = r2;
          e2.exports = t;
        }, 5637: function(e2, t) {
          t = function(e3, t2) {
            var n2;
            return function() {
              return --e3 > 0 && (n2 = t2.apply(this, arguments)), e3 <= 1 && (t2 = null), n2;
            };
          }, e2.exports = t;
        }, 7494: function(e2, t, n2) {
          var o = n2(8935);
          function r2(e3, t2) {
            this[t2] = e3.replace(/\w/, function(e4) {
              return e4.toUpperCase();
            });
          }
          t = function(e3) {
            var t2 = o(e3), n3 = t2[0];
            return t2.shift(), t2.forEach(r2, t2), n3 += t2.join("");
          }, e2.exports = t;
        }, 1694: function(e2, t, n2) {
          var o = n2(6257), r2 = n2(6472);
          t = function(e3, t2) {
            if (r2(e3))
              return e3;
            if (t2 && o(t2, e3))
              return [e3];
            var n3 = [];
            return e3.replace(i, function(e4, t3, o2, r3) {
              n3.push(o2 ? r3.replace(a, "$1") : t3 || e4);
            }), n3;
          };
          var i = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, a = /\\(\\)?/g;
          e2.exports = t;
        }, 996: function(e2, t) {
          t = function(e3, t2) {
            var n2 = [];
            t2 = t2 || 1;
            for (var o = 0, r2 = Math.ceil(e3.length / t2); o < r2; o++) {
              var i = o * t2, a = i + t2;
              n2.push(e3.slice(i, a));
            }
            return n2;
          }, e2.exports = t;
        }, 9882: function(e2, t, n2) {
          var o = n2(1286);
          t = function(e3, t2, n3) {
            return o(n3) && (n3 = t2, t2 = void 0), !o(t2) && e3 < t2 ? t2 : e3 > n3 ? n3 : e3;
          }, e2.exports = t;
        }, 4675: function(e2, t, n2) {
          var o = n2(5166), r2 = n2(6472), i = n2(6329);
          t = function(e3) {
            return o(e3) ? r2(e3) ? e3.slice() : i({}, e3) : e3;
          }, e2.exports = t;
        }, 550: function(e2, t, n2) {
          var o = n2(5166), r2 = n2(4777), i = n2(6472), a = n2(8820);
          t = function(e3) {
            return i(e3) ? e3.map(function(e4) {
              return t(e4);
            }) : o(e3) && !r2(e3) ? a(e3, function(e4) {
              return t(e4);
            }) : e3;
          }, e2.exports = t;
        }, 8099: function(e2, t, n2) {
          var o = n2(1352);
          t = function() {
            for (var e3 = o(arguments), t2 = [], n3 = 0, r2 = e3.length; n3 < r2; n3++)
              t2 = t2.concat(o(e3[n3]));
            return t2;
          }, e2.exports = t;
        }, 6341: function(e2, t, n2) {
          var o = n2(496), r2 = n2(6768), i = n2(1369), a = n2(2578);
          t = function(e3, t2) {
            return r2(e3) ? e3.indexOf(t2) > -1 : (i(e3) || (e3 = a(e3)), o(e3, t2) >= 0);
          }, e2.exports = t;
        }, 1792: function(e2, t, n2) {
          var o = n2(6768), r2 = n2(3901), i = n2(385), a = n2(6472), s = n2(2349), c = n2(3085), l = n2(3063);
          (t = function(e3, t2) {
            var n3;
            if (t2 = l(t2), o(e3))
              n3 = new Uint8Array(r2.decode(e3));
            else if (i(e3))
              e3 = e3.slice(0), n3 = new Uint8Array(e3);
            else if (a(e3))
              n3 = new Uint8Array(e3);
            else if ("uint8array" === c(e3))
              n3 = e3.slice(0);
            else if (s(e3)) {
              n3 = new Uint8Array(e3.length);
              for (var u2 = 0; u2 < e3.length; u2++)
                n3[u2] = e3[u2];
            }
            if (n3)
              switch (t2) {
                case "base64":
                  n3 = r2.encode(n3);
                  break;
                case "arraybuffer":
                  n3 = n3.buffer;
                  break;
                case "array":
                  n3 = [].slice.call(n3);
                  break;
                case "buffer":
                  n3 = Buffer.from(n3);
                  break;
                case "blob":
                  n3 = new Blob([n3.buffer]);
              }
            return n3;
          }).blobToArrBuffer = function(e3) {
            return new Promise(function(t2, n3) {
              var o2 = new FileReader();
              o2.onload = function(e4) {
                t2(e4.target.result);
              }, o2.onerror = function(e4) {
                n3(e4);
              }, o2.readAsArrayBuffer(e3);
            });
          }, e2.exports = t;
        }, 6299: function(e2, t, n2) {
          var o = n2(4193), r2 = n2(3990), i = n2(1286), a = n2(1420), s = { path: "/" };
          function c(e3, n3, c2) {
            if (!i(n3)) {
              if (c2 = o(c2 = c2 || {}, s), r2(c2.expires)) {
                var l = /* @__PURE__ */ new Date();
                l.setMilliseconds(l.getMilliseconds() + 864e5 * c2.expires), c2.expires = l;
              }
              return n3 = encodeURIComponent(n3), e3 = encodeURIComponent(e3), document.cookie = [e3, "=", n3, c2.expires && "; expires=" + c2.expires.toUTCString(), c2.path && "; path=" + c2.path, c2.domain && "; domain=" + c2.domain, c2.secure ? "; secure" : ""].join(""), t;
            }
            for (var u2 = document.cookie ? document.cookie.split("; ") : [], d2 = e3 ? void 0 : {}, f2 = 0, h = u2.length; f2 < h; f2++) {
              var p = u2[f2], v = p.split("="), m = a(v.shift());
              if (p = v.join("="), p = a(p), e3 === m) {
                d2 = p;
                break;
              }
              e3 || (d2[m] = p);
            }
            return d2;
          }
          t = { get: c, set: c, remove: function(e3, t2) {
            return (t2 = t2 || {}).expires = -1, c(e3, "", t2);
          } }, e2.exports = t;
        }, 2327: function(e2, t, n2) {
          var o = n2(6329), r2 = n2(1214);
          t = function(e3, t2) {
            t2 = t2 || r2;
            var n3 = document.createElement("textarea"), i = document.body;
            o(n3.style, { fontSize: "12pt", border: "0", padding: "0", margin: "0", position: "absolute", left: "-9999px" }), n3.value = e3, i.appendChild(n3), n3.setAttribute("readonly", ""), n3.select(), n3.setSelectionRange(0, e3.length);
            try {
              document.execCommand("copy"), t2();
            } catch (e4) {
              t2(e4);
            } finally {
              i.removeChild(n3);
            }
          }, e2.exports = t;
        }, 1662: function(e2, t, n2) {
          var o = n2(5166);
          t = function(e3) {
            if (!o(e3))
              return {};
            if (r2)
              return r2(e3);
            function t2() {
            }
            return t2.prototype = e3, new t2();
          };
          var r2 = Object.create;
          e2.exports = t;
        }, 4427: function(e2, t, n2) {
          var o = n2(1286), r2 = n2(3783);
          t = function(e3, t2) {
            return function(n3) {
              return r2(arguments, function(i, a) {
                if (0 !== a) {
                  var s = e3(i);
                  r2(s, function(e4) {
                    t2 && !o(n3[e4]) || (n3[e4] = i[e4]);
                  });
                }
              }), n3;
            };
          }, e2.exports = t;
        }, 4210: function(e2, t, n2) {
          var o = n2(1475), r2 = n2(1286), i = n2(7494);
          t = o(function(e3, t2) {
            return r2(t2) ? (e3 = i(e3), !r2(a[e3])) : (a.cssText = "", a.cssText = e3 + ":" + t2, !!a.length);
          }, function(e3, t2) {
            return e3 + " " + t2;
          });
          var a = document.createElement("p").style;
          e2.exports = t;
        }, 4407: function(e2, t, n2) {
          var o = n2(6768), r2 = n2(2106), i = n2(3367), a = n2(5351);
          t = function(e3, n3, a2, f2) {
            1 === arguments.length && o(e3) && !u2.test(e3) && (n3 = e3, e3 = void 0), e3 = e3 || /* @__PURE__ */ new Date(), r2(e3) || (e3 = new Date(e3));
            var h = (n3 = i(t.masks[n3] || n3 || t.masks.default)).slice(0, 4);
            "UTC:" !== h && "GMT:" !== h || (n3 = n3.slice(4), a2 = true, "GMT:" === h && (f2 = true));
            var p = a2 ? "getUTC" : "get", v = e3[p + "Date"](), m = e3[p + "Day"](), g = e3[p + "Month"](), b = e3[p + "FullYear"](), y = e3[p + "Hours"](), w = e3[p + "Minutes"](), _ = e3[p + "Seconds"](), x = e3[p + "Milliseconds"](), A = a2 ? 0 : e3.getTimezoneOffset(), k = { d: v, dd: s(v), ddd: t.i18n.dayNames[m], dddd: t.i18n.dayNames[m + 7], m: g + 1, mm: s(g + 1), mmm: t.i18n.monthNames[g], mmmm: t.i18n.monthNames[g + 12], yy: i(b).slice(2), yyyy: b, h: y % 12 || 12, hh: s(y % 12 || 12), H: y, HH: s(y), M: w, MM: s(w), s: _, ss: s(_), l: s(x, 3), L: s(Math.round(x / 10)), t: y < 12 ? "a" : "p", tt: y < 12 ? "am" : "pm", T: y < 12 ? "A" : "P", TT: y < 12 ? "AM" : "PM", Z: f2 ? "GMT" : a2 ? "UTC" : (i(e3).match(l) || [""]).pop().replace(d2, ""), o: (A > 0 ? "-" : "+") + s(100 * Math.floor(Math.abs(A) / 60) + Math.abs(A) % 60, 4), S: ["th", "st", "nd", "rd"][v % 10 > 3 ? 0 : (v % 100 - v % 10 != 10) * v % 10] };
            return n3.replace(c, function(e4) {
              return e4 in k ? k[e4] : e4.slice(1, e4.length - 1);
            });
          };
          var s = function(e3) {
            var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
            return a(i(e3), t2, "0");
          }, c = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g, l = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, u2 = /\d/, d2 = /[^-+\dA-Z]/g;
          t.masks = { default: "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:sso", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'", expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z" }, t.i18n = { dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, e2.exports = t;
        }, 6049: function(e2, t) {
          t = function(e3, t2, n2) {
            var o;
            return function() {
              var r2 = this, i = arguments;
              n2 || clearTimeout(o), n2 && o || (o = setTimeout(function() {
                o = null, e3.apply(r2, i);
              }, t2));
            };
          }, e2.exports = t;
        }, 1420: function(e2, t, n2) {
          var o = n2(3783), r2 = n2(8166), i = n2(2461), a = n2(5742);
          function s(e3) {
            return +("0x" + e3);
          }
          t = function(e3) {
            try {
              return decodeURIComponent(e3);
            } catch (n3) {
              var t2 = e3.match(c);
              return t2 ? (o(t2, function(t3) {
                e3 = e3.replace(t3, function(e4) {
                  e4 = e4.split("%").slice(1);
                  var t4 = i(e4, s);
                  return e4 = r2.encode(t4), e4 = a.decode(e4, true), e4;
                }(t3));
              }), e3) : e3;
            }
          };
          var c = /(%[a-f0-9]{2})+/gi;
          e2.exports = t;
        }, 4193: function(e2, t, n2) {
          t = n2(4427)(n2(1116), true), e2.exports = t;
        }, 9803: function(e2, t, n2) {
          var o = n2(1694), r2 = n2(6768), i = n2(5166), a = n2(3783);
          function s(e3, t2, n3) {
            for (var r3 = o(t2, e3), i2 = r3.pop(); t2 = r3.shift(); )
              e3[t2] || (e3[t2] = {}), e3 = e3[t2];
            Object.defineProperty(e3, i2, n3);
          }
          t = function(e3, t2, n3) {
            return r2(t2) ? s(e3, t2, n3) : i(t2) && a(t2, function(t3, n4) {
              s(e3, n4, t3);
            }), e3;
          }, e2.exports = t;
        }, 2443: function(e2, t, n2) {
          var o = n2(7496), r2 = n2(6341);
          function i() {
            return true;
          }
          function a() {
            return false;
          }
          function s(e3) {
            var n3, o2 = this.events[e3.type], r3 = c.call(this, e3, o2);
            e3 = new t.Event(e3);
            for (var i2, a2, s2 = 0; (a2 = r3[s2++]) && !e3.isPropagationStopped(); )
              for (e3.curTarget = a2.el, i2 = 0; (n3 = a2.handlers[i2++]) && !e3.isImmediatePropagationStopped(); )
                false === n3.handler.apply(a2.el, [e3]) && (e3.preventDefault(), e3.stopPropagation());
          }
          function c(e3, t2) {
            var n3, o2, i2, a2, s2 = e3.target, c2 = [], l = t2.delegateCount;
            if (s2.nodeType)
              for (; s2 !== this; s2 = s2.parentNode || this) {
                for (o2 = [], a2 = 0; a2 < l; a2++)
                  void 0 === o2[n3 = (i2 = t2[a2]).selector + " "] && (o2[n3] = r2(this.querySelectorAll(n3), s2)), o2[n3] && o2.push(i2);
                o2.length && c2.push({ el: s2, handlers: o2 });
              }
            return l < t2.length && c2.push({ el: this, handlers: t2.slice(l) }), c2;
          }
          t = { add: function(e3, t2, n3, o2) {
            var r3, i2 = { selector: n3, handler: o2 };
            e3.events || (e3.events = {}), (r3 = e3.events[t2]) || ((r3 = e3.events[t2] = []).delegateCount = 0, e3.addEventListener(t2, function() {
              s.apply(e3, arguments);
            }, false)), n3 ? r3.splice(r3.delegateCount++, 0, i2) : r3.push(i2);
          }, remove: function(e3, t2, n3, o2) {
            var r3 = e3.events;
            if (r3 && r3[t2])
              for (var i2, a2 = r3[t2], s2 = a2.length; s2--; )
                i2 = a2[s2], n3 && i2.selector != n3 || i2.handler != o2 || (a2.splice(s2, 1), i2.selector && a2.delegateCount--);
          }, Event: o({ className: "Event", initialize: function(e3) {
            this.origEvent = e3;
          }, isDefaultPrevented: a, isPropagationStopped: a, isImmediatePropagationStopped: a, preventDefault: function() {
            var e3 = this.origEvent;
            this.isDefaultPrevented = i, e3 && e3.preventDefault && e3.preventDefault();
          }, stopPropagation: function() {
            var e3 = this.origEvent;
            this.isPropagationStopped = i, e3 && e3.stopPropagation && e3.stopPropagation();
          }, stopImmediatePropagation: function() {
            var e3 = this.origEvent;
            this.isImmediatePropagationStopped = i, e3 && e3.stopImmediatePropagation && e3.stopImmediatePropagation(), this.stopPropagation();
          } }) }, e2.exports = t;
        }, 4541: function(e2, t, n2) {
          var o = n2(2727), r2 = n2(9296), i = n2(2533);
          t = function(e3) {
            var t2 = l(e3 = (e3 = e3 || (o ? navigator.userAgent : "")).toLowerCase(), "msie ");
            if (t2)
              return { version: t2, name: "ie" };
            if (s.test(e3))
              return { version: 11, name: "ie" };
            for (var n3 = 0, i2 = c.length; n3 < i2; n3++) {
              var u2 = c[n3], d2 = e3.match(a[u2]);
              if (null != d2) {
                var f2 = r2(d2[1].split(".")[0]);
                return "opera" === u2 && (f2 = l(e3, "version/") || f2), { name: u2, version: f2 };
              }
            }
            return { name: "unknown", version: -1 };
          };
          var a = { edge: /edge\/([0-9._]+)/, firefox: /firefox\/([0-9.]+)(?:\s|$)/, opera: /opera\/([0-9.]+)(?:\s|$)/, android: /android\s([0-9.]+)/, ios: /version\/([0-9._]+).*mobile.*safari.*/, safari: /version\/([0-9._]+).*safari/, chrome: /(?!chrom.*opr)chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/ }, s = /trident\/7\./, c = i(a);
          function l(e3, t2) {
            var n3 = e3.indexOf(t2);
            if (n3 > -1)
              return r2(e3.substring(n3 + t2.length, e3.indexOf(".", n3)));
          }
          e2.exports = t;
        }, 6954: function(e2, t, n2) {
          var o = n2(2727);
          t = function(e3) {
            if (e3 = (e3 = e3 || (o ? navigator.userAgent : "")).toLowerCase(), t2("windows phone"))
              return "windows phone";
            if (t2("win"))
              return "windows";
            if (t2("android"))
              return "android";
            if (t2("ipad") || t2("iphone") || t2("ipod"))
              return "ios";
            if (t2("mac"))
              return "os x";
            if (t2("linux"))
              return "linux";
            function t2(t3) {
              return e3.indexOf(t3) > -1;
            }
            return "unknown";
          }, e2.exports = t;
        }, 801: function(e2, t, n2) {
          var o = n2(1137), r2 = n2(288), i = n2(5972), a = n2(6341);
          t = o(function(e3, t2) {
            return t2 = r2(t2), i(e3, function(e4) {
              return !a(t2, e4);
            });
          }), e2.exports = t;
        }, 3783: function(e2, t, n2) {
          var o = n2(1369), r2 = n2(2533), i = n2(3955);
          t = function(e3, t2, n3) {
            var a, s;
            if (t2 = i(t2, n3), o(e3))
              for (a = 0, s = e3.length; a < s; a++)
                t2(e3[a], a, e3);
            else {
              var c = r2(e3);
              for (a = 0, s = c.length; a < s; a++)
                t2(e3[c[a]], c[a], e3);
            }
            return e3;
          }, e2.exports = t;
        }, 4858: function(e2, t) {
          t = function(e3, t2) {
            var n2 = e3.length - t2.length;
            return n2 >= 0 && e3.indexOf(t2, n2) === n2;
          }, e2.exports = t;
        }, 8901: function(e2, t, n2) {
          var o = n2(2533), r2 = (t = function(e3) {
            return a.test(e3) ? e3.replace(s, c) : e3;
          }).map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }, i = "(?:" + o(r2).join("|") + ")", a = new RegExp(i), s = new RegExp(i, "g"), c = function(e3) {
            return r2[e3];
          };
          e2.exports = t;
        }, 4187: function(e2, t, n2) {
          var o = n2(3367);
          t = function(e3) {
            return o(e3).replace(r2, function(e4) {
              switch (e4) {
                case '"':
                case "'":
                case "\\":
                  return "\\" + e4;
                case "\n":
                  return "\\n";
                case "\r":
                  return "\\r";
                case "\u2028":
                  return "\\u2028";
                case "\u2029":
                  return "\\u2029";
              }
            });
          };
          var r2 = /["'\\\n\r\u2028\u2029]/g;
          e2.exports = t;
        }, 2337: function(e2, t) {
          t = function(e3) {
            return e3.replace(/\W/g, "\\$&");
          }, e2.exports = t;
        }, 642: function(e2, t) {
          t = function(e3) {
            var t2 = document.createElement("style");
            return t2.textContent = e3, t2.type = "text/css", document.head.appendChild(t2), t2;
          }, e2.exports = t;
        }, 1672: function(e2, t, n2) {
          var o = n2(2838), r2 = n2(1369), i = n2(2533);
          t = function(e3, t2, n3) {
            t2 = o(t2, n3);
            for (var a = !r2(e3) && i(e3), s = (a || e3).length, c = 0; c < s; c++) {
              var l = a ? a[c] : c;
              if (!t2(e3[l], l, e3))
                return false;
            }
            return true;
          }, e2.exports = t;
        }, 6329: function(e2, t, n2) {
          t = n2(4427)(n2(1116)), e2.exports = t;
        }, 3021: function(e2, t, n2) {
          var o = n2(2533);
          t = n2(4427)(o), e2.exports = t;
        }, 2581: function(e2, t, n2) {
          var o = n2(42), r2 = n2(4331), i = n2(2461), a = n2(1352);
          t = function(e3) {
            var t2 = a(e3.match(s));
            return o(i(t2, function(e4) {
              return r2(e4);
            }));
          };
          var s = /((https?)|(ftp)):\/\/[\w.]+[^ \f\n\r\t\v"\\<>[\]\u2100-\uFFFF(),]*/gi;
          e2.exports = t;
        }, 5972: function(e2, t, n2) {
          var o = n2(2838), r2 = n2(3783);
          t = function(e3, t2, n3) {
            var i = [];
            return t2 = o(t2, n3), r2(e3, function(e4, n4, o2) {
              t2(e4, n4, o2) && i.push(e4);
            }), i;
          }, e2.exports = t;
        }, 2244: function(e2, t, n2) {
          var o = n2(2267), r2 = n2(4072), i = n2(1369), a = n2(1286);
          t = function(e3, t2, n3) {
            var s = (i(e3) ? r2 : o)(e3, t2, n3);
            if (!a(s) && -1 !== s)
              return e3[s];
          }, e2.exports = t;
        }, 4072: function(e2, t, n2) {
          var o = n2(2838);
          t = function(e3, t2, n3, r2) {
            r2 = r2 || 1, t2 = o(t2, n3);
            for (var i = e3.length, a = r2 > 0 ? 0 : i - 1; a >= 0 && a < i; ) {
              if (t2(e3[a], a, e3))
                return a;
              a += r2;
            }
            return -1;
          }, e2.exports = t;
        }, 2267: function(e2, t, n2) {
          var o = n2(2838), r2 = n2(2533);
          t = function(e3, t2, n3) {
            t2 = o(t2, n3);
            for (var i, a = r2(e3), s = 0, c = a.length; s < c; s++)
              if (t2(e3[i = a[s]], i, e3))
                return i;
          }, e2.exports = t;
        }, 288: function(e2, t, n2) {
          var o = n2(6472);
          function r2(e3, t2) {
            for (var n3, i = e3.length, a = -1; i--; )
              n3 = e3[++a], o(n3) ? r2(n3, t2) : t2.push(n3);
            return t2;
          }
          t = function(e3) {
            return r2(e3, []);
          }, e2.exports = t;
        }, 4454: function(e2, t, n2) {
          var o = n2(2533);
          t = function(e3) {
            return Object.freeze ? Object.freeze(e3) : (o(e3).forEach(function(t2) {
              Object.getOwnPropertyDescriptor(e3, t2).configurable && Object.defineProperty(e3, t2, { writable: false, configurable: false });
            }), e3);
          }, e2.exports = t;
        }, 415: function(e2, t, n2) {
          var o = n2(5166), r2 = n2(4777), i = Object.getPrototypeOf, a = {}.constructor;
          t = function(e3) {
            if (o(e3)) {
              if (i)
                return i(e3);
              var t2 = e3.__proto__;
              return t2 || null === t2 ? t2 : r2(e3.constructor) ? e3.constructor.prototype : e3 instanceof a ? a.prototype : void 0;
            }
          }, e2.exports = t;
        }, 8613: function(e2, t, n2) {
          var o = n2(9833), r2 = n2(6768), i = n2(6930), a = n2(7781), s = n2(975), c = n2(3783), l = n2(4777);
          t = function(e3, t2) {
            for (var n3 = arguments.length, u2 = new Array(n3 > 2 ? n3 - 2 : 0), d2 = 2; d2 < n3; d2++)
              u2[d2 - 2] = arguments[d2];
            (o(t2) || r2(t2)) && (u2.unshift(t2), t2 = null), t2 || (t2 = {});
            var f2 = function(e4) {
              for (var t3 = "div", n4 = "", o2 = [], r3 = [], a2 = "", s2 = 0, c2 = e4.length; s2 < c2; s2++) {
                var l2 = e4[s2];
                "#" === l2 || "." === l2 ? (r3.push(a2), a2 = l2) : a2 += l2;
              }
              r3.push(a2);
              for (var u3 = 0, d3 = r3.length; u3 < d3; u3++)
                (a2 = r3[u3]) && (i(a2, "#") ? n4 = a2.slice(1) : i(a2, ".") ? o2.push(a2.slice(1)) : t3 = a2);
              return { tagName: t3, id: n4, classes: o2 };
            }(e3), h = f2.tagName, p = f2.id, v = f2.classes, m = document.createElement(h);
            return p && m.setAttribute("id", p), a.add(m, v), c(u2, function(e4) {
              r2(e4) ? m.appendChild(document.createTextNode(e4)) : o(e4) && m.appendChild(e4);
            }), c(t2, function(e4, t3) {
              r2(e4) ? m.setAttribute(t3, e4) : l(e4) && i(t3, "on") ? m.addEventListener(t3.slice(2), e4, false) : "style" === t3 && s(m, e4);
            }), m;
          }, e2.exports = t;
        }, 6257: function(e2, t) {
          var n2 = Object.prototype.hasOwnProperty;
          t = function(e3, t2) {
            return n2.call(e3, t2);
          }, e2.exports = t;
        }, 5044: function(e2, t, n2) {
          var o = n2(7348);
          t = { encode: function(e3) {
            for (var t2 = [], n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r2 = e3[n3];
              t2.push((r2 >>> 4).toString(16)), t2.push((15 & r2).toString(16));
            }
            return t2.join("");
          }, decode: function(e3) {
            var t2 = [], n3 = e3.length;
            o(n3) && n3--;
            for (var r2 = 0; r2 < n3; r2 += 2)
              t2.push(parseInt(e3.substr(r2, 2), 16));
            return t2;
          } }, e2.exports = t;
        }, 3651: function(e2, t, n2) {
          var o = n2(3783), r2 = n2(4193);
          t = function(e3) {
            var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "js", s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            r2(s, i), e3 = e3.replace(/</g, "&lt;").replace(/>/g, "&gt;"), n3 = a[n3];
            var c = 0, l = [];
            o(n3, function(n4) {
              n4.language && (e3 = e3.replace(n4.re, function(e4, o2) {
                return o2 ? (l[c++] = t(o2, n4.language, s), e4.replace(o2, "___subtmpl" + (c - 1) + "___")) : e4;
              }));
            }), o(n3, function(t2, n4) {
              a[t2.language] || (e3 = e3.replace(t2.re, "___" + n4 + "___$1___end" + n4 + "___"));
            });
            var u2 = [];
            return e3 = e3.replace(/___(?!subtmpl)\w+?___/g, function(e4) {
              var t2 = "end" === e4.substr(3, 3), o2 = (t2 ? e4.substr(6) : e4.substr(3)).replace(/_/g, ""), r3 = u2.length > 0 ? u2[u2.length - 1] : null;
              return !t2 && (null == r3 || o2 == r3 || null != r3 && n3[r3] && null != n3[r3].embed && n3[r3].embed.indexOf(o2) > -1) ? (u2.push(o2), e4) : t2 && o2 == r3 ? (u2.pop(), e4) : "";
            }), o(n3, function(t2, n4) {
              var o2 = s[t2.style] ? ' style="'.concat(s[t2.style], '"') : "";
              e3 = e3.replace(new RegExp("___end" + n4 + "___", "g"), "</span>").replace(new RegExp("___" + n4 + "___", "g"), '<span class="'.concat(t2.style, '"').concat(o2, ">"));
            }), o(n3, function(t2) {
              t2.language && (e3 = e3.replace(/___subtmpl\d+___/g, function(e4) {
                var t3 = parseInt(e4.replace(/___subtmpl(\d+)___/, "$1"), 10);
                return l[t3];
              }));
            }), e3;
          };
          var i = { comment: "color:#63a35c;", string: "color:#183691;", number: "color:#0086b3;", keyword: "color:#a71d5d;", operator: "color:#994500;" }, a = { js: { comment: { re: /(\/\/.*|\/\*([\s\S]*?)\*\/)/g, style: "comment" }, string: { re: /(('.*?')|(".*?"))/g, style: "string" }, numbers: { re: /(-?(\d+|\d+\.\d+|\.\d+))/g, style: "number" }, keywords: { re: /(?:\b)(function|for|foreach|while|if|else|elseif|switch|break|as|return|this|class|self|default|var|const|let|false|true|null|undefined)(?:\b)/gi, style: "keyword" }, operator: { re: /(\+|-|\/|\*|%|=|&lt;|&gt;|\||\?|\.)/g, style: "operator" } } };
          a.html = { comment: { re: /(&lt;!--([\s\S]*?)--&gt;)/g, style: "comment" }, tag: { re: /(&lt;\/?\w(.|\n)*?\/?&gt;)/g, style: "keyword", embed: ["string"] }, string: a.js.string, css: { re: /(?:&lt;style.*?&gt;)([\s\S]*)?(?:&lt;\/style&gt;)/gi, language: "css" }, script: { re: /(?:&lt;script.*?&gt;)([\s\S]*?)(?:&lt;\/script&gt;)/gi, language: "js" } }, a.css = { comment: a.js.comment, string: a.js.string, numbers: { re: /((-?(\d+|\d+\.\d+|\.\d+)(%|px|em|pt|in)?)|#[0-9a-fA-F]{3}[0-9a-fA-F]{3})/g, style: "number" }, keywords: { re: /(@\w+|:?:\w+|[a-z-]+:)/g, style: "keyword" } }, e2.exports = t;
        }, 5925: function(e2, t) {
          t = function(e3) {
            var t2, o, r2, i = e3[0] / 360, a = e3[1] / 100, s = e3[2] / 100, c = [];
            if (e3[3] && (c[3] = e3[3]), 0 === a)
              return r2 = n2(255 * s), c[0] = c[1] = c[2] = r2, c;
            for (var l = 2 * s - (t2 = s < 0.5 ? s * (1 + a) : s + a - s * a), u2 = 0; u2 < 3; u2++)
              (o = i + 1 / 3 * -(u2 - 1)) < 0 && o++, o > 1 && o--, r2 = 6 * o < 1 ? l + 6 * (t2 - l) * o : 2 * o < 1 ? t2 : 3 * o < 2 ? l + (t2 - l) * (2 / 3 - o) * 6 : l, c[u2] = n2(255 * r2);
            return c;
          };
          var n2 = Math.round;
          e2.exports = t;
        }, 7483: function(e2, t, n2) {
          var o = n2(8702), r2 = n2(9001), i = n2(6472), a = n2(3783), s = n2(6768), c = n2(8820);
          var l = function(e3) {
            return e3.replace(/&quot;/g, '"');
          }, u2 = function(e3) {
            return e3.replace(/"/g, "&quot;");
          };
          t = { parse: function(e3) {
            var t2 = [], n3 = new r2();
            return o(e3, { start: function(e4, t3) {
              t3 = c(t3, function(e5) {
                return l(e5);
              }), n3.push({ tag: e4, attrs: t3 });
            }, end: function() {
              var e4 = n3.pop();
              if (n3.size) {
                var o2 = n3.peek();
                i(o2.content) || (o2.content = []), o2.content.push(e4);
              } else
                t2.push(e4);
            }, comment: function(e4) {
              var o2 = "<!--".concat(e4, "-->"), r3 = n3.peek();
              r3 ? (r3.content || (r3.content = []), r3.content.push(o2)) : t2.push(o2);
            }, text: function(e4) {
              var o2 = n3.peek();
              o2 ? (o2.content || (o2.content = []), o2.content.push(e4)) : t2.push(e4);
            } }), t2;
          }, stringify: function e3(t2) {
            var n3 = "";
            return i(t2) ? a(t2, function(t3) {
              return n3 += e3(t3);
            }) : s(t2) ? n3 = t2 : (n3 += "<".concat(t2.tag), a(t2.attrs, function(e4, t3) {
              return n3 += " ".concat(t3, '="').concat(u2(e4), '"');
            }), n3 += ">", t2.content && (n3 += e3(t2.content)), n3 += "</".concat(t2.tag, ">")), n3;
          } }, e2.exports = t;
        }, 6362: function(e2, t) {
          t = function(e3) {
            return e3;
          }, e2.exports = t;
        }, 496: function(e2, t) {
          t = function(e3, t2, n2) {
            return Array.prototype.indexOf.call(e3, t2, n2);
          }, e2.exports = t;
        }, 5022: function(e2, t, n2) {
          var o = n2(1662);
          t = function(e3, t2) {
            e3.prototype = o(t2.prototype);
          }, e2.exports = t;
        }, 7190: function(e2, t, n2) {
          var o = n2(3783);
          t = function(e3) {
            var t2 = {};
            return o(e3, function(e4, n3) {
              t2[e4] = n3;
            }), t2;
          }, e2.exports = t;
        }, 7403: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object Arguments]" === o(e3);
          }, e2.exports = t;
        }, 6472: function(e2, t, n2) {
          var o = n2(106);
          t = Array.isArray ? Array.isArray : function(e3) {
            return "[object Array]" === o(e3);
          }, e2.exports = t;
        }, 385: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object ArrayBuffer]" === o(e3);
          }, e2.exports = t;
        }, 1369: function(e2, t, n2) {
          var o = n2(3990), r2 = n2(4777), i = Math.pow(2, 53) - 1;
          t = function(e3) {
            if (!e3)
              return false;
            var t2 = e3.length;
            return o(t2) && t2 >= 0 && t2 <= i && !r2(e3);
          }, e2.exports = t;
        }, 4696: function(e2, t) {
          t = function(e3) {
            return true === e3 || false === e3;
          }, e2.exports = t;
        }, 2727: function(e2, t) {
          t = "object" == typeof window && "object" == typeof document && 9 === document.nodeType, e2.exports = t;
        }, 2349: function(e2, t, n2) {
          var o = n2(4777);
          t = function(e3) {
            return null != e3 && (!!e3._isBuffer || e3.constructor && o(e3.constructor.isBuffer) && e3.constructor.isBuffer(e3));
          }, e2.exports = t;
        }, 2520: function(e2, t, n2) {
          var o = new (n2(2765))("(prefers-color-scheme: dark)");
          t = function() {
            return o.isMatch();
          }, e2.exports = t;
        }, 2106: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object Date]" === o(e3);
          }, e2.exports = t;
        }, 9833: function(e2, t) {
          t = function(e3) {
            return !(!e3 || 1 !== e3.nodeType);
          }, e2.exports = t;
        }, 8887: function(e2, t, n2) {
          var o = n2(1369), r2 = n2(6472), i = n2(6768), a = n2(7403), s = n2(2533);
          t = function(e3) {
            return null == e3 || (o(e3) && (r2(e3) || i(e3) || a(e3)) ? 0 === e3.length : 0 === s(e3).length);
          }, e2.exports = t;
        }, 2749: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object Error]" === o(e3);
          }, e2.exports = t;
        }, 4777: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            var t2 = o(e3);
            return "[object Function]" === t2 || "[object GeneratorFunction]" === t2 || "[object AsyncFunction]" === t2;
          }, e2.exports = t;
        }, 9585: function(e2, t, n2) {
          var o = n2(5610), r2 = o.getComputedStyle, i = o.document;
          function a(e3, t2) {
            return e3.right < t2.left || e3.left > t2.right || e3.bottom < t2.top || e3.top > t2.bottom;
          }
          t = function(e3) {
            var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = t2.display, o2 = void 0 === n3 || n3, s = t2.visibility, c = void 0 !== s && s, l = t2.opacity, u2 = void 0 !== l && l, d2 = t2.size, f2 = void 0 !== d2 && d2, h = t2.viewport, p = void 0 !== h && h, v = t2.overflow, m = void 0 !== v && v, g = r2(e3);
            if (o2) {
              var b = e3.tagName;
              if ("BODY" === b || "HTML" === b || "fixed" === g.position) {
                if ("none" === g.display)
                  return true;
                for (var y = e3; y = y.parentElement; ) {
                  if ("none" === r2(y).display)
                    return true;
                }
              } else if (null === e3.offsetParent)
                return true;
            }
            if (c && "hidden" === g.visibility)
              return true;
            if (u2) {
              if ("0" === g.opacity)
                return true;
              for (var w = e3; w = w.parentElement; ) {
                if ("0" === r2(w).opacity)
                  return true;
              }
            }
            var _ = e3.getBoundingClientRect();
            if (f2 && (0 === _.width || 0 === _.height))
              return true;
            if (p)
              return a(_, { top: 0, left: 0, right: i.documentElement.clientWidth, bottom: i.documentElement.clientHeight });
            if (m)
              for (var x = e3; x = x.parentElement; ) {
                var A = r2(x).overflow;
                if ("scroll" === A || "hidden" === A) {
                  if (a(_, x.getBoundingClientRect()))
                    return true;
                }
              }
            return false;
          }, e2.exports = t;
        }, 2246: function(e2, t, n2) {
          var o = n2(3990);
          t = function(e3) {
            return o(e3) && e3 % 1 == 0;
          }, e2.exports = t;
        }, 4219: function(e2, t) {
          t = function(e3) {
            try {
              return JSON.parse(e3), true;
            } catch (e4) {
              return false;
            }
          }, e2.exports = t;
        }, 3708: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object Map]" === o(e3);
          }, e2.exports = t;
        }, 7949: function(e2, t, n2) {
          var o = n2(2533);
          t = function(e3, t2) {
            var n3 = o(t2), r2 = n3.length;
            if (null == e3)
              return !r2;
            e3 = Object(e3);
            for (var i = 0; i < r2; i++) {
              var a = n3[i];
              if (t2[a] !== e3[a] || !(a in e3))
                return false;
            }
            return true;
          }, e2.exports = t;
        }, 9537: function(e2, t, n2) {
          var o = n2(4777);
          t = "undefined" != typeof wx && o(wx.openLocation), e2.exports = t;
        }, 9956: function(e2, t, n2) {
          var o = n2(2727), r2 = n2(1475), i = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i, a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i;
          t = r2(function(e3) {
            return e3 = e3 || (o ? navigator.userAgent : ""), i.test(e3) || a.test(e3.substr(0, 4));
          }), e2.exports = t;
        }, 9433: function(e2, t, n2) {
          var o = n2(3990);
          t = function(e3) {
            return o(e3) && e3 !== +e3;
          }, e2.exports = t;
        }, 8740: function(e2, t, n2) {
          var o = n2(5166), r2 = n2(4777), i = n2(300);
          t = function(e3) {
            return !!o(e3) && (r2(e3) ? s.test(i(e3)) : c.test(i(e3)));
          };
          var a = Object.prototype.hasOwnProperty, s = new RegExp("^" + i(a).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), c = /^\[object .+?Constructor\]$/;
          e2.exports = t;
        }, 2763: function(e2, t) {
          t = function(e3) {
            return null == e3;
          }, e2.exports = t;
        }, 1965: function(e2, t, n2) {
          var o = n2(106);
          t = "undefined" != typeof process && "[object process]" === o(process), e2.exports = t;
        }, 6156: function(e2, t) {
          t = function(e3) {
            return null === e3;
          }, e2.exports = t;
        }, 3990: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object Number]" === o(e3);
          }, e2.exports = t;
        }, 5166: function(e2, t) {
          t = function(e3) {
            var t2 = typeof e3;
            return !!e3 && ("function" === t2 || "object" === t2);
          }, e2.exports = t;
        }, 7348: function(e2, t, n2) {
          var o = n2(2246);
          t = function(e3) {
            return !!o(e3) && e3 % 2 != 0;
          }, e2.exports = t;
        }, 6997: function(e2, t) {
          t = function(e3) {
            var t2 = typeof e3;
            return null == e3 || "function" !== t2 && "object" !== t2;
          }, e2.exports = t;
        }, 4321: function(e2, t, n2) {
          var o = n2(5166), r2 = n2(4777);
          t = function(e3) {
            return o(e3) && r2(e3.then) && r2(e3.catch);
          }, e2.exports = t;
        }, 1754: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object RegExp]" === o(e3);
          }, e2.exports = t;
        }, 7470: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object Set]" === o(e3);
          }, e2.exports = t;
        }, 3843: function(e2, t) {
          t = function(e3) {
            for (var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t.defComparator, o = 0, r2 = e3.length; o < r2 - 1; o++)
              if (n2(e3[o], e3[o + 1]) > 0)
                return false;
            return true;
          }, t.defComparator = function(e3, t2) {
            return e3 < t2 ? -1 : e3 > t2 ? 1 : 0;
          }, e2.exports = t;
        }, 6768: function(e2, t, n2) {
          var o = n2(106);
          t = function(e3) {
            return "[object String]" === o(e3);
          }, e2.exports = t;
        }, 9804: function(e2, t) {
          t = function(e3) {
            return "symbol" == typeof e3;
          }, e2.exports = t;
        }, 1286: function(e2, t) {
          t = function(e3) {
            return void 0 === e3;
          }, e2.exports = t;
        }, 7622: function(e2, t, n2) {
          var o = n2(8935);
          t = function(e3) {
            return o(e3).join("-");
          }, e2.exports = t;
        }, 2533: function(e2, t, n2) {
          var o = n2(6257);
          t = Object.keys ? Object.keys : function(e3) {
            var t2 = [];
            for (var n3 in e3)
              o(e3, n3) && t2.push(n3);
            return t2;
          }, e2.exports = t;
        }, 9702: function(e2, t) {
          t = function(e3) {
            var t2 = e3 ? e3.length : 0;
            if (t2)
              return e3[t2 - 1];
          }, e2.exports = t;
        }, 3988: function(e2, t, n2) {
          var o = n2(2581), r2 = n2(3783), i = n2(2337);
          function a(e3) {
            return '<a href="' + e3 + '">' + e3 + "</a>";
          }
          t = function(e3, t2) {
            t2 = t2 || a;
            var n3 = o(e3);
            return r2(n3, function(n4) {
              e3 = e3.replace(new RegExp(i(n4), "g"), t2);
            }), e3;
          }, e2.exports = t;
        }, 9622: function(e2, t) {
          t = function(e3, t2) {
            var n2 = document.createElement("script");
            n2.src = e3, n2.onload = function() {
              var e4 = n2.readyState && "complete" != n2.readyState && "loaded" != n2.readyState;
              t2 && t2(!e4);
            }, n2.onerror = function() {
              t2(false);
            }, document.body.appendChild(n2);
          }, e2.exports = t;
        }, 3063: function(e2, t, n2) {
          var o = n2(3367);
          t = function(e3) {
            return o(e3).toLocaleLowerCase();
          }, e2.exports = t;
        }, 5351: function(e2, t, n2) {
          var o = n2(4552), r2 = n2(3367);
          t = function(e3, t2, n3) {
            var i = (e3 = r2(e3)).length;
            return n3 = n3 || " ", i < t2 && (e3 = (o(n3, t2 - i) + e3).slice(-t2)), e3;
          }, e2.exports = t;
        }, 7767: function(e2, t) {
          var n2 = /^\s+/;
          t = function(e3, t2) {
            if (null == t2)
              return e3.trimLeft ? e3.trimLeft() : e3.replace(n2, "");
            for (var o, r2, i = 0, a = e3.length, s = t2.length, c = true; c && i < a; )
              for (c = false, o = -1, r2 = e3.charAt(i); ++o < s; )
                if (r2 === t2[o]) {
                  c = true, i++;
                  break;
                }
            return i >= a ? "" : e3.substr(i, a);
          }, e2.exports = t;
        }, 2461: function(e2, t, n2) {
          var o = n2(2838), r2 = n2(2533), i = n2(1369);
          t = function(e3, t2, n3) {
            t2 = o(t2, n3);
            for (var a = !i(e3) && r2(e3), s = (a || e3).length, c = Array(s), l = 0; l < s; l++) {
              var u2 = a ? a[l] : l;
              c[l] = t2(e3[u2], u2, e3);
            }
            return c;
          }, e2.exports = t;
        }, 8820: function(e2, t, n2) {
          var o = n2(2838), r2 = n2(2533);
          t = function(e3, t2, n3) {
            t2 = o(t2, n3);
            for (var i = r2(e3), a = i.length, s = {}, c = 0; c < a; c++) {
              var l = i[c];
              s[l] = t2(e3[l], l, e3);
            }
            return s;
          }, e2.exports = t;
        }, 4491: function(e2, t, n2) {
          var o = n2(3021), r2 = n2(7949);
          t = function(e3) {
            return e3 = o({}, e3), function(t2) {
              return r2(t2, e3);
            };
          }, e2.exports = t;
        }, 9853: function(e2, t) {
          t = function() {
            for (var e3 = arguments, t2 = e3[0], n2 = 1, o = e3.length; n2 < o; n2++)
              e3[n2] > t2 && (t2 = e3[n2]);
            return t2;
          }, e2.exports = t;
        }, 5026: function(e2, t, n2) {
          var o = n2(2533);
          t = { getItem: function(e3) {
            return (i[e3] ? r2[e3] : this[e3]) || null;
          }, setItem: function(e3, t2) {
            i[e3] ? r2[e3] = t2 : this[e3] = t2;
          }, removeItem: function(e3) {
            i[e3] ? delete r2[e3] : delete this[e3];
          }, key: function(e3) {
            var t2 = a();
            return e3 >= 0 && e3 < t2.length ? t2[e3] : null;
          }, clear: function() {
            for (var e3, t2 = s(), n3 = 0; e3 = t2[n3]; n3++)
              delete this[e3];
            t2 = c();
            for (var o2, i2 = 0; o2 = t2[i2]; i2++)
              delete r2[o2];
          } }, Object.defineProperty(t, "length", { enumerable: false, configurable: true, get: function() {
            return a().length;
          } });
          var r2 = {}, i = { getItem: 1, setItem: 1, removeItem: 1, key: 1, clear: 1, length: 1 };
          function a() {
            return s().concat(c());
          }
          function s() {
            return o(t).filter(function(e3) {
              return !i[e3];
            });
          }
          function c() {
            return o(r2);
          }
          e2.exports = t;
        }, 1475: function(e2, t, n2) {
          var o = n2(6257);
          t = function(e3, t2) {
            var n3 = function(r2) {
              var i = n3.cache, a = "" + (t2 ? t2.apply(this, arguments) : r2);
              return o(i, a) || (i[a] = e3.apply(this, arguments)), i[a];
            };
            return n3.cache = {}, n3;
          }, e2.exports = t;
        }, 9971: function(e2, t, n2) {
          t = n2(1137)(function(e3, t2) {
            for (var n3 = e3.length, o = 0, r2 = t2.length; o < r2; o++)
              for (var i = t2[o], a = 0, s = i.length; a < s; a++)
                e3[n3++] = i[a];
            return e3.length = n3, e3;
          }), e2.exports = t;
        }, 8573: function(e2, t, n2) {
          var o = n2(3783), r2 = n2(6768), i = n2(1286), a = n2(6341), s = n2(6472), c = n2(5166), l = n2(1352);
          (t = function(e3, t2) {
            if (i(e3))
              return n3 = {}, d2(function(e4, t3) {
                n3[e4] = t3;
              }), n3;
            var n3;
            if (r2(e3) && i(t2) || s(e3))
              return function(e4) {
                if (!r2(e4)) {
                  var t3 = {};
                  return d2(function(n5, o2) {
                    a(e4, n5) && (t3[n5] = o2);
                  }), t3;
                }
                var n4 = f2(e4);
                if (n4)
                  return n4.getAttribute("content");
              }(e3);
            var l2 = e3;
            c(l2) || ((l2 = {})[e3] = t2), function(e4) {
              o(e4, function(e5, t3) {
                var n4 = f2(t3);
                if (n4)
                  return n4.setAttribute("content", e5);
                (n4 = u2.createElement("meta")).setAttribute("name", t3), n4.setAttribute("content", e5), u2.head.appendChild(n4);
              });
            }(l2);
          }).remove = function(e3) {
            e3 = l(e3), o(e3, function(e4) {
              var t2 = f2(e4);
              t2 && u2.head.removeChild(t2);
            });
          };
          var u2 = document;
          function d2(e3) {
            var t2 = u2.querySelectorAll("meta");
            o(t2, function(t3) {
              var n3 = t3.getAttribute("name"), o2 = t3.getAttribute("content");
              n3 && o2 && e3(n3, o2);
            });
          }
          function f2(e3) {
            return u2.querySelector('meta[name="' + e3 + '"]');
          }
          e2.exports = t;
        }, 6435: function(e2, t) {
          t = function() {
            for (var e3 = arguments, t2 = e3[0], n2 = 1, o = e3.length; n2 < o; n2++)
              e3[n2] < t2 && (t2 = e3[n2]);
            return t2;
          }, e2.exports = t;
        }, 4677: function(e2, t, n2) {
          var o = n2(3875), r2 = n2(6768);
          t = function(e3) {
            if (r2(e3)) {
              var t2 = e3.match(s);
              return t2 ? o(t2[1]) * i[t2[2] || "ms"] : 0;
            }
            for (var n3 = e3, c = "ms", l = 0, u2 = a.length; l < u2; l++)
              if (n3 >= i[a[l]]) {
                c = a[l];
                break;
              }
            return +(n3 / i[c]).toFixed(2) + c;
          };
          var i = { ms: 1, s: 1e3 };
          i.m = 60 * i.s, i.h = 60 * i.m, i.d = 24 * i.h, i.y = 365.25 * i.d;
          var a = ["y", "d", "h", "m", "s"], s = /^((?:\d+)?\.?\d+) *(s|m|h|d|y)?$/;
          e2.exports = t;
        }, 6339: function(e2, t, n2) {
          var o = n2(6930), r2 = n2(5610), i = n2(3367);
          function a(e3, t2) {
            if (e3 = i(e3), t2 = i(t2), o(e3, "_") && !o(t2, "_"))
              return 1;
            if (o(t2, "_") && !o(e3, "_"))
              return -1;
            for (var n3, a2, s, c, l = /^\d+|^\D+/; ; ) {
              if (!e3)
                return t2 ? -1 : 0;
              if (!t2)
                return 1;
              if (n3 = e3.match(l)[0], a2 = t2.match(l)[0], s = !r2.isNaN(n3), c = !r2.isNaN(a2), s && !c)
                return -1;
              if (c && !s)
                return 1;
              if (s && c) {
                var u2 = n3 - a2;
                if (u2)
                  return u2;
                if (n3.length !== a2.length)
                  return +n3 || +a2 ? a2.length - n3.length : n3.length - a2.length;
              } else if (n3 !== a2)
                return n3 < a2 ? -1 : 1;
              e3 = e3.substring(n3.length), t2 = t2.substring(a2.length);
            }
          }
          t = function(e3) {
            return e3.sort(a);
          }, e2.exports = t;
        }, 6837: function(e2, t) {
          function n2(e3) {
            if ("function" != typeof e3)
              throw new TypeError(e3 + " is not a function");
            return e3;
          }
          t = "object" == typeof process && process.nextTick ? process.nextTick : "function" == typeof setImmediate ? function(e3) {
            setImmediate(n2(e3));
          } : function(e3) {
            setTimeout(n2(e3), 0);
          }, e2.exports = t;
        }, 1214: function(e2, t) {
          t = function() {
          }, e2.exports = t;
        }, 8847: function(e2, t) {
          t = Date.now ? Date.now : function() {
            return (/* @__PURE__ */ new Date()).getTime();
          }, e2.exports = t;
        }, 106: function(e2, t) {
          var n2 = Object.prototype.toString;
          t = function(e3) {
            return n2.call(e3);
          }, e2.exports = t;
        }, 8763: function(e2, t, n2) {
          t = n2(4198)(n2(5637), 2), e2.exports = t;
        }, 3955: function(e2, t, n2) {
          var o = n2(1286);
          t = function(e3, t2, n3) {
            if (o(t2))
              return e3;
            switch (null == n3 ? 3 : n3) {
              case 1:
                return function(n4) {
                  return e3.call(t2, n4);
                };
              case 3:
                return function(n4, o2, r2) {
                  return e3.call(t2, n4, o2, r2);
                };
              case 4:
                return function(n4, o2, r2, i) {
                  return e3.call(t2, n4, o2, r2, i);
                };
            }
            return function() {
              return e3.apply(t2, arguments);
            };
          }, e2.exports = t;
        }, 442: function(e2, t, n2) {
          var o = n2(1443), r2 = n2(7653), i = window.screen;
          t = { get: function() {
            if (i) {
              var e3 = r2(i, "orientation.type");
              if (e3)
                return e3.split("-").shift();
            }
            return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
          } }, o.mixin(t), window.addEventListener("orientationchange", function() {
            setTimeout(function() {
              t.emit("change", t.get());
            }, 200);
          }, false), e2.exports = t;
        }, 8702: function(e2, t, n2) {
          var o = n2(9702), r2 = n2(7913), i = n2(6930), a = n2(3063);
          t = function(e3, t2) {
            for (var n3, r3 = [], f2 = e3; e3; ) {
              if (n3 = true, o(r3) && d2[o(r3)]) {
                var h = new RegExp("</".concat(o(r3), "[^>]*>")).exec(e3);
                if (h) {
                  var p = e3.substring(0, h.index);
                  e3 = e3.substring(h.index + h[0].length), p && t2.text && t2.text(p);
                }
                x("", o(r3));
              } else {
                if (i(e3, "<!--")) {
                  var v = e3.indexOf("-->");
                  v >= 0 && (t2.comment && t2.comment(e3.substring(4, v)), e3 = e3.substring(v + 3), n3 = false);
                } else if (i(e3, "<!")) {
                  var m = e3.match(s);
                  m && (t2.text && t2.text(e3.substring(0, m[0].length)), e3 = e3.substring(m[0].length), n3 = false);
                } else if (i(e3, "</")) {
                  var g = e3.match(c);
                  g && (e3 = e3.substring(g[0].length), g[0].replace(c, x), n3 = false);
                } else if (i(e3, "<")) {
                  var b = e3.match(l);
                  b && (e3 = e3.substring(b[0].length), b[0].replace(l, _), n3 = false);
                }
                if (n3) {
                  var y = e3.indexOf("<"), w = y < 0 ? e3 : e3.substring(0, y);
                  e3 = y < 0 ? "" : e3.substring(y), t2.text && t2.text(w);
                }
              }
              if (f2 === e3)
                throw Error("Parse Error: " + e3);
              f2 = e3;
            }
            function _(e4, n4, o2, i2) {
              if (n4 = a(n4), (i2 = !!i2) || r3.push(n4), t2.start) {
                var s2 = {};
                o2.replace(u2, function(e5, t3, n5, o3, r4) {
                  s2[t3] = n5 || o3 || r4 || "";
                }), t2.start(n4, s2, i2);
              }
            }
            function x(e4, n4) {
              var o2;
              if (n4 = a(n4))
                for (o2 = r3.length - 1; o2 >= 0 && r3[o2] !== n4; o2--)
                  ;
              else
                o2 = 0;
              if (o2 >= 0) {
                for (var i2 = r3.length - 1; i2 >= o2; i2--)
                  t2.end && t2.end(r3[i2]);
                r3.length = o2;
              }
            }
            x();
          };
          var s = /^<!\s*doctype((?:\s+[\w:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i, c = /^<\/([-A-Za-z0-9_]+)[^>]*>/, l = /^<([-A-Za-z0-9_]+)((?:\s+[-A-Za-z0-9_:@.]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i, u2 = /([-A-Za-z0-9_:@.]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, d2 = r2("script,style".split(","));
          e2.exports = t;
        }, 4198: function(e2, t, n2) {
          var o = n2(1137), r2 = n2(1352);
          t = o(function(e3, t2) {
            return function() {
              var n3 = [];
              return n3 = (n3 = n3.concat(t2)).concat(r2(arguments)), e3.apply(this, n3);
            };
          }), e2.exports = t;
        }, 1194: function(e2, t, n2) {
          var o, r2 = n2(8847), i = n2(5610), a = i.performance, s = i.process;
          if (a && a.now)
            t = function() {
              return a.now();
            };
          else if (s && s.hrtime) {
            var c = function() {
              var e3 = s.hrtime();
              return 1e9 * e3[0] + e3[1];
            };
            o = c() - 1e9 * s.uptime(), t = function() {
              return (c() - o) / 1e6;
            };
          } else
            o = r2(), t = function() {
              return r2() - o;
            };
          e2.exports = t;
        }, 3487: function(e2, t, n2) {
          var o = n2(6768), r2 = n2(6472), i = n2(6341), a = n2(3783);
          t = function(e3, t2, n3) {
            if (o(t2) && (t2 = [t2]), r2(t2)) {
              var s = t2;
              t2 = function(e4, t3) {
                return i(s, t3);
              };
            }
            var c = {}, l = function(e4, n4) {
              t2(e4, n4) && (c[n4] = e4);
            };
            return n3 && (l = function(e4, n4) {
              t2(e4, n4) || (c[n4] = e4);
            }), a(e3, l), c;
          }, e2.exports = t;
        }, 747: function(e2, t, n2) {
          var o = n2(1475), r2 = n2(7494), i = n2(3023), a = n2(6257), s = n2(7622);
          (t = o(function(e3) {
            if (e3 = e3.replace(l, ""), e3 = r2(e3), a(u2, e3))
              return e3;
            for (var t2 = c.length; t2--; ) {
              var n3 = c[t2] + i(e3);
              if (a(u2, n3))
                return n3;
            }
            return e3;
          })).dash = o(function(e3) {
            var n3 = t(e3);
            return (l.test(n3) ? "-" : "") + s(n3);
          });
          var c = ["O", "ms", "Moz", "Webkit"], l = /^(O)|(ms)|(Moz)|(Webkit)|(-o-)|(-ms-)|(-moz-)|(-webkit-)/g, u2 = document.createElement("p").style;
          e2.exports = t;
        }, 2994: function(e2, t, n2) {
          var o = n2(6472), r2 = n2(7653);
          t = function(e3) {
            return o(e3) ? function(t3) {
              return r2(t3, e3);
            } : (t2 = e3, function(e4) {
              return null == e4 ? void 0 : e4[t2];
            });
            var t2;
          }, e2.exports = t;
        }, 1745: function(e2, t, n2) {
          var o = n2(4331), r2 = n2(3783), i = n2(1286), a = n2(6472), s = n2(2461), c = n2(8887), l = n2(5972), u2 = n2(5166);
          t = { parse: function(e3) {
            var t2 = {};
            return e3 = o(e3).replace(d2, ""), r2(e3.split("&"), function(e4) {
              var n3 = e4.split("="), o2 = n3.shift(), r3 = n3.length > 0 ? n3.join("=") : null;
              o2 = decodeURIComponent(o2), r3 = decodeURIComponent(r3), i(t2[o2]) ? t2[o2] = r3 : a(t2[o2]) ? t2[o2].push(r3) : t2[o2] = [t2[o2], r3];
            }), t2;
          }, stringify: function(e3, n3) {
            return l(s(e3, function(e4, o2) {
              return u2(e4) && c(e4) ? "" : a(e4) ? t.stringify(e4, o2) : (n3 ? encodeURIComponent(n3) : encodeURIComponent(o2)) + "=" + encodeURIComponent(e4);
            }), function(e4) {
              return e4.length > 0;
            }).join("&");
          } };
          var d2 = /^(\?|#|&)/g;
          e2.exports = t;
        }, 1571: function(e2, t, n2) {
          var o, r2, i = n2(8847), a = n2(2727), s = 0;
          if (a) {
            o = window.requestAnimationFrame, r2 = window.cancelAnimationFrame;
            for (var c = ["ms", "moz", "webkit", "o"], l = 0, u2 = c.length; l < u2 && !o; l++)
              o = window[c[l] + "RequestAnimationFrame"], r2 = window[c[l] + "CancelAnimationFrame"] || window[c[l] + "CancelRequestAnimationFrame"];
            o && (o = o.bind(window), r2 = r2.bind(window));
          }
          r2 = r2 || function(e3) {
            clearTimeout(e3);
          }, (o = o || function(e3) {
            var t2 = i(), n3 = Math.max(0, 16 - (t2 - s)), o2 = setTimeout(function() {
              e3(t2 + n3);
            }, n3);
            return s = t2 + n3, o2;
          }).cancel = r2, t = o, e2.exports = t;
        }, 1216: function(e2, t) {
          t = function(e3, t2, n2) {
            null == t2 && (t2 = e3, e3 = 0);
            var o = Math.random();
            return n2 || e3 % 1 || t2 % 1 ? Math.min(e3 + o * (t2 - e3 + parseFloat("1e-" + ((o + "").length - 1))), t2) : e3 + Math.floor(o * (t2 - e3 + 1));
          }, e2.exports = t;
        }, 3366: function(module, exports, __webpack_require__) {
          var random = __webpack_require__(1216), isBrowser = __webpack_require__(2727), isNode = __webpack_require__(1965), crypto;
          exports = function(e2) {
            for (var t = new Uint8Array(e2), n2 = 0; n2 < e2; n2++)
              t[n2] = random(0, 255);
            return t;
          }, isBrowser ? (crypto = window.crypto || window.msCrypto, crypto && (exports = function(e2) {
            var t = new Uint8Array(e2);
            return crypto.getRandomValues(t), t;
          })) : isNode && (crypto = eval("require")("crypto"), exports = function(e2) {
            return crypto.randomBytes(e2);
          }), module.exports = exports;
        }, 4270: function(e2, t) {
          var n2, o = [], r2 = document, i = r2.documentElement.doScroll, a = "DOMContentLoaded", s = (i ? /^loaded|^c/ : /^loaded|^i|^c/).test(r2.readyState);
          s || r2.addEventListener(a, n2 = function() {
            for (r2.removeEventListener(a, n2), s = 1; n2 = o.shift(); )
              n2();
          }), t = function(e3) {
            s ? setTimeout(e3, 0) : o.push(e3);
          }, e2.exports = t;
        }, 5852: function(e2, t, n2) {
          var o = n2(2838);
          t = function(e3, t2, n3) {
            var r2 = [];
            t2 = o(t2, n3);
            for (var i = -1, a = e3.length; ++i < a; ) {
              var s = i - r2.length, c = e3[s];
              t2(c, i, e3) && (r2.push(c), e3.splice(s, 1));
            }
            return r2;
          }, e2.exports = t;
        }, 4552: function(e2, t) {
          t = function(e3, t2) {
            var n2 = "";
            if (t2 < 1)
              return "";
            for (; t2 > 0; )
              1 & t2 && (n2 += e3), t2 >>= 1, e3 += e3;
            return n2;
          }, e2.exports = t;
        }, 8368: function(e2, t, n2) {
          var o = n2(2337);
          t = function(e3, t2, n3) {
            return e3.replace(new RegExp(o(t2), "g"), n3);
          }, e2.exports = t;
        }, 1137: function(e2, t) {
          t = function(e3, t2) {
            return t2 = null == t2 ? e3.length - 1 : +t2, function() {
              var n2, o = Math.max(arguments.length - t2, 0), r2 = new Array(o);
              for (n2 = 0; n2 < o; n2++)
                r2[n2] = arguments[n2 + t2];
              switch (t2) {
                case 0:
                  return e3.call(this, r2);
                case 1:
                  return e3.call(this, arguments[0], r2);
                case 2:
                  return e3.call(this, arguments[0], arguments[1], r2);
              }
              var i = new Array(t2 + 1);
              for (n2 = 0; n2 < t2; n2++)
                i[n2] = arguments[n2];
              return i[t2] = r2, e3.apply(this, i);
            };
          }, e2.exports = t;
        }, 1527: function(e2, t) {
          t = function(e3) {
            var t2 = e3.length, n2 = Array(t2);
            t2--;
            for (var o = 0; o <= t2; o++)
              n2[t2 - o] = e3[o];
            return n2;
          }, e2.exports = t;
        }, 3279: function(e2, t) {
          t = function(e3) {
            var t2, i, a = e3[0] / 255, s = e3[1] / 255, c = e3[2] / 255, l = n2(a, s, c), u2 = o(a, s, c), d2 = u2 - l;
            (t2 = n2(60 * (t2 = u2 === l ? 0 : a === u2 ? (s - c) / d2 : s === u2 ? 2 + (c - a) / d2 : 4 + (a - s) / d2), 360)) < 0 && (t2 += 360);
            var f2 = (l + u2) / 2;
            i = u2 === l ? 0 : f2 <= 0.5 ? d2 / (u2 + l) : d2 / (2 - u2 - l);
            var h = [r2(t2), r2(100 * i), r2(100 * f2)];
            return e3[3] && (h[3] = e3[3]), h;
          };
          var n2 = Math.min, o = Math.max, r2 = Math.round;
          e2.exports = t;
        }, 5031: function(e2, t, n2) {
          var o = n2(6299);
          t = function(e3) {
            var t2, n3 = window.location, r2 = n3.hostname, i = n3.pathname, a = r2.split("."), s = i.split("/"), c = "", l = s.length;
            if (!p())
              for (var u2 = a.length - 1; u2 >= 0; u2--) {
                var d2 = a[u2];
                if ("" !== d2) {
                  if (p({ domain: c = "" === c ? d2 : d2 + "." + c, path: t2 = "/" }) || p({ domain: c }))
                    return;
                  for (var f2 = 0; f2 < l; f2++) {
                    var h = s[f2];
                    if ("" !== h) {
                      if (p({ domain: c, path: t2 += h }) || p({ path: t2 }))
                        return;
                      if (p({ domain: c, path: t2 += "/" }) || p({ path: t2 }))
                        return;
                    }
                  }
                }
              }
            function p(t3) {
              return t3 = t3 || {}, o.remove(e3, t3), !o.get(e3);
            }
          }, e2.exports = t;
        }, 5610: function(e2, t, n2) {
          t = n2(2727) ? window : n2.g, e2.exports = t;
        }, 3597: function(e2, t) {
          t = function(e3, t2) {
            if (null == t2) {
              if (e3.trimRight)
                return e3.trimRight();
              t2 = " \r\n	\f\v";
            }
            for (var n2, o, r2 = e3.length - 1, i = t2.length, a = true; a && r2 >= 0; )
              for (a = false, n2 = -1, o = e3.charAt(r2); ++n2 < i; )
                if (o === t2[n2]) {
                  a = true, r2--;
                  break;
                }
            return r2 >= 0 ? e3.substring(0, r2 + 1) : "";
          }, e2.exports = t;
        }, 2838: function(e2, t, n2) {
          var o = n2(4777), r2 = n2(5166), i = n2(6472), a = n2(3955), s = n2(4491), c = n2(6362), l = n2(2994);
          t = function(e3, t2, n3) {
            return null == e3 ? c : o(e3) ? a(e3, t2, n3) : r2(e3) && !i(e3) ? s(e3) : l(e3);
          }, e2.exports = t;
        }, 7653: function(e2, t, n2) {
          var o = n2(1286), r2 = n2(1694);
          t = function(e3, t2) {
            var n3;
            for (n3 = (t2 = r2(t2, e3)).shift(); !o(n3); ) {
              if (null == (e3 = e3[n3]))
                return;
              n3 = t2.shift();
            }
            return e3;
          }, e2.exports = t;
        }, 8079: function(e2, t, n2) {
          var o = n2(1694), r2 = n2(1286), i = n2(3367), a = n2(9804), s = n2(6768);
          t = function(e3, t2, n3) {
            var c, l = (t2 = o(t2, e3)).pop();
            for (c = t2.shift(); !r2(c); ) {
              if (s(c) || a(c) || (c = i(c)), "__proto__" === c || "constructor" === c || "prototype" === c)
                return;
              e3[c] || (e3[c] = {}), e3 = e3[c], c = t2.shift();
            }
            e3[l] = n3;
          }, e2.exports = t;
        }, 615: function(e2, t, n2) {
          var o = n2(5026);
          t = function(e3) {
            var t2;
            switch (e3 = e3 || "local") {
              case "local":
                t2 = window.localStorage;
                break;
              case "session":
                t2 = window.sessionStorage;
            }
            try {
              var n3 = "test-localStorage-" + Date.now();
              t2.setItem(n3, n3);
              var r2 = t2.getItem(n3);
              if (t2.removeItem(n3), r2 !== n3)
                throw new Error();
            } catch (e4) {
              return o;
            }
            return t2;
          }, e2.exports = t;
        }, 4224: function(e2, t, n2) {
          var o = n2(6334);
          t = function(e3, t2) {
            return e3 = new o(e3), t2 = new o(t2), e3.port = 0 | e3.port || ("https" === e3.protocol ? 443 : 80), t2.port = 0 | t2.port || ("https" === t2.protocol ? 443 : 80), e3.protocol === t2.protocol && e3.hostname === t2.hostname && e3.port === t2.port;
          }, e2.exports = t;
        }, 9677: function(e2, t) {
          t = function(e3, t2, n2) {
            var o = e3.length;
            t2 = null == t2 ? 0 : t2 < 0 ? Math.max(o + t2, 0) : Math.min(t2, o), n2 = null == n2 ? o : n2 < 0 ? Math.max(o + n2, 0) : Math.min(n2, o);
            for (var r2 = []; t2 < n2; )
              r2.push(e3[t2++]);
            return r2;
          }, e2.exports = t;
        }, 6053: function(e2, t, n2) {
          var o = n2(2838), r2 = n2(1369), i = n2(2533);
          t = function(e3, t2, n3) {
            t2 = o(t2, n3);
            for (var a = !r2(e3) && i(e3), s = (a || e3).length, c = 0; c < s; c++) {
              var l = a ? a[c] : c;
              if (t2(e3[l], l, e3))
                return true;
            }
            return false;
          }, e2.exports = t;
        }, 3629: function(e2, t, n2) {
          var o = n2(3843), r2 = n2(4193), i = n2(2533), a = n2(6472), s = n2(5166);
          t = function(e3) {
            var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            r2(t2, c);
            var n3 = t2.deep, o2 = t2.comparator, l = [], u2 = [];
            return function e4(t3) {
              var r3, c2 = l.indexOf(t3);
              if (c2 > -1)
                return u2[c2];
              if (a(t3)) {
                r3 = [], l.push(t3), u2.push(r3);
                for (var d2 = 0, f2 = t3.length; d2 < f2; d2++) {
                  var h = t3[d2];
                  n3 && s(h) ? r3[d2] = e4(h) : r3[d2] = h;
                }
              } else {
                r3 = {}, l.push(t3), u2.push(r3);
                for (var p = i(t3).sort(o2), v = 0, m = p.length; v < m; v++) {
                  var g = p[v], b = t3[g];
                  n3 && s(b) ? r3[g] = e4(b) : r3[g] = b;
                }
              }
              return r3;
            }(e3);
          };
          var c = { deep: false, comparator: o.defComparator };
          e2.exports = t;
        }, 8935: function(e2, t) {
          var n2 = /([A-Z])/g, o = /[_.\- ]+/g, r2 = /(^-)|(-$)/g;
          t = function(e3) {
            return (e3 = e3.replace(n2, "-$1").toLowerCase().replace(o, "-").replace(r2, "")).split("-");
          }, e2.exports = t;
        }, 6930: function(e2, t) {
          t = function(e3, t2) {
            return 0 === e3.indexOf(t2);
          }, e2.exports = t;
        }, 4400: function(e2, t, n2) {
          var o = n2(3085), r2 = n2(3023), i = n2(3367), a = n2(1286), s = n2(4777), c = n2(1754);
          t = function(e3, t2) {
            return JSON.stringify(e3, (n3 = [], l = [], function(e4, t3) {
              if (n3.length > 0) {
                var u2 = n3.indexOf(this);
                u2 > -1 ? (n3.splice(u2 + 1), l.splice(u2, 1 / 0, e4)) : (n3.push(this), l.push(e4));
                var d2 = n3.indexOf(t3);
                d2 > -1 && (t3 = n3[0] === t3 ? "[Circular ~]" : "[Circular ~." + l.slice(0, d2).join(".") + "]");
              } else
                n3.push(t3);
              return c(t3) || s(t3) ? t3 = "[" + r2(o(t3)) + " " + i(t3) + "]" : a(t3) && (t3 = null), t3;
            }), t2);
            var n3, l;
          }, e2.exports = t;
        }, 9963: function(e2, t, n2) {
          var o = n2(4187), r2 = n2(3085), i = n2(3367), a = n2(4858), s = n2(300), c = n2(2533), l = n2(3783), u2 = n2(7496), d2 = n2(415), f2 = n2(801), h = n2(6329), p = n2(4321), v = n2(5972), m = n2(8847), g = n2(1116), b = n2(6341), y = n2(5166), w = n2(9537), _ = n2(1662), x = n2(6930), A = n2(8079), k = n2(9803), C = n2(3487), S = n2(1369);
          function E(e3, n3, o2, r3) {
            var a2 = [];
            return l(n3, function(e4) {
              var n4, s2 = Object.getOwnPropertyDescriptor(o2, e4), c2 = s2 && s2.get, l2 = s2 && s2.set;
              if (!r3.accessGetter && c2)
                n4 = "(...)";
              else
                try {
                  if (n4 = o2[e4], b(r3.ignore, n4))
                    return;
                  p(n4) && n4.catch(function() {
                  });
                } catch (e5) {
                  n4 = e5.message;
                }
              a2.push("".concat(O(e4), ":").concat(t(n4, r3))), c2 && a2.push("".concat(O("get " + i(e4)), ":").concat(t(s2.get, r3))), l2 && a2.push("".concat(O("set " + i(e4)), ":").concat(t(s2.set, r3)));
            }), '"'.concat(e3, '":{') + a2.join(",") + "}";
          }
          function O(e3) {
            return '"'.concat(N(e3), '"');
          }
          function T(e3) {
            return '"'.concat(N(i(e3)), '"');
          }
          function N(e3) {
            return o(e3).replace(/\\'/g, "'").replace(/\t/g, "\\t");
          }
          t = function(e3) {
            var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o2 = n3.self, l2 = n3.startTime, u3 = void 0 === l2 ? m() : l2, p2 = n3.timeout, y2 = void 0 === p2 ? 0 : p2, w2 = n3.depth, _2 = void 0 === w2 ? 0 : w2, x2 = n3.curDepth, A2 = void 0 === x2 ? 1 : x2, k2 = n3.visitor, C2 = void 0 === k2 ? new M() : k2, S2 = n3.unenumerable, O2 = void 0 !== S2 && S2, N2 = n3.symbol, j2 = void 0 !== N2 && N2, z2 = n3.accessGetter, R = void 0 !== z2 && z2, Z = n3.ignore, I = void 0 === Z ? [] : Z, D = "", B = { visitor: C2, unenumerable: O2, symbol: j2, accessGetter: R, depth: _2, curDepth: A2 + 1, timeout: y2, startTime: u3, ignore: I }, F = r2(e3, false);
            if ("String" === F)
              D = T(e3);
            else if ("Number" === F)
              D = i(e3), a(D, "Infinity") && (D = '{"value":"'.concat(D, '","type":"Number"}'));
            else if ("NaN" === F)
              D = '{"value":"NaN","type":"Number"}';
            else if ("Boolean" === F)
              D = e3 ? "true" : "false";
            else if ("Null" === F)
              D = "null";
            else if ("Undefined" === F)
              D = '{"type":"Undefined"}';
            else if ("Symbol" === F) {
              var L = "Symbol";
              try {
                L = i(e3);
              } catch (e4) {
              }
              D = '{"value":'.concat(T(L), ',"type":"Symbol"}');
            } else {
              if (y2 && m() - u3 > y2)
                return T("Timeout");
              if (_2 && A2 > _2)
                return T("{...}");
              D = "{";
              var P, H = [], $2 = C2.get(e3);
              if ($2 ? (P = $2.id, H.push('"reference":'.concat(P))) : (P = C2.set(e3), H.push('"id":'.concat(P))), H.push('"type":"'.concat(F, '"')), a(F, "Function") ? H.push('"value":'.concat(T(s(e3)))) : "RegExp" === F && H.push('"value":'.concat(T(e3))), !$2) {
                var G = c(e3);
                if (G.length && H.push(E("enumerable", G, o2 || e3, B)), O2) {
                  var Y = f2(g(e3, { prototype: false, unenumerable: true }), G);
                  Y.length && H.push(E("unenumerable", Y, o2 || e3, B));
                }
                if (j2) {
                  var q = v(g(e3, { prototype: false, symbol: true }), function(e4) {
                    return "symbol" == typeof e4;
                  });
                  q.length && H.push(E("symbol", q, o2 || e3, B));
                }
                var J = d2(e3);
                if (J && !b(I, J)) {
                  var Q = '"proto":'.concat(t(J, h(B, { self: o2 || e3 })));
                  H.push(Q);
                }
              }
              D += H.join(",") + "}";
            }
            return D;
          };
          var M = u2({ initialize: function() {
            this.id = 1, this.visited = [];
          }, set: function(e3) {
            var t2 = this.visited, n3 = this.id, o2 = { id: n3, val: e3 };
            return t2.push(o2), this.id++, n3;
          }, get: function(e3) {
            for (var t2 = this.visited, n3 = 0, o2 = t2.length; n3 < o2; n3++) {
              var r3 = t2[n3];
              if (e3 === r3.val)
                return r3;
            }
            return false;
          } });
          function j(e3, t2) {
            var n3 = t2.map;
            if (!y(e3))
              return e3;
            var o2 = e3.id, r3 = e3.type, a2 = e3.value, s2 = e3.proto, c2 = e3.reference, u3 = e3.enumerable, d3 = e3.unenumerable;
            if (c2)
              return e3;
            if ("Number" === r3)
              return "Infinity" === a2 ? Number.POSITIVE_INFINITY : "-Infinity" === a2 ? Number.NEGATIVE_INFINITY : NaN;
            if ("Undefined" !== r3) {
              var f3, h2, p2;
              if ("Function" === r3)
                (f3 = function() {
                }).toString = function() {
                  return a2;
                }, s2 && Object.setPrototypeOf(f3, j(s2, t2));
              else if ("RegExp" === r3)
                p2 = (h2 = a2).lastIndexOf("/"), f3 = new RegExp(h2.slice(1, p2), h2.slice(p2 + 1));
              else {
                var v2;
                if ("Object" !== r3)
                  v2 = w ? function() {
                  } : new Function(r3, ""), s2 && (v2.prototype = j(s2, t2)), f3 = new v2();
                else
                  f3 = _(s2 ? j(s2, t2) : null);
              }
              var m2, g2 = {};
              if (u3)
                S(u3) && (m2 = u3.length, delete u3.length), u3 = C(u3, function(e4, t3) {
                  return !b2(u3, e4, t3);
                }), l(u3, function(e4, n4) {
                  (g2[n4] || {}).get || (f3[n4] = j(e4, t2));
                }), m2 && (f3.length = m2);
              return d3 && (d3 = C(d3, function(e4, t3) {
                return !b2(d3, e4, t3);
              }), l(d3, function(e4, o3) {
                var r4 = g2[o3] || {};
                if (!r4.get)
                  if (e4 = j(e4, t2), y(e4) && e4.reference) {
                    var i2 = e4.reference;
                    e4 = function() {
                      return n3[i2];
                    }, r4.get = e4;
                  } else
                    r4.value = e4;
                r4.enumerable = false, g2[o3] = r4;
              })), k(f3, g2), n3[o2] = f3, f3;
            }
            function b2(e4, n4, o3) {
              o3 = i(o3);
              var r4 = false;
              return l(["get", "set"], function(i2) {
                if (x(o3, i2 + " ")) {
                  var a3 = o3.replace(i2 + " ", "");
                  e4[a3] && ("Timeout" === (n4 = j(n4, t2)) && (n4 = z), A(g2, [a3, i2], n4), r4 = true);
                }
              }), r4;
            }
          }
          function z() {
            return "Timeout";
          }
          t.parse = function(e3) {
            var t2 = {}, n3 = j(JSON.parse(e3), { map: t2 });
            return function(e4) {
              l(e4, function(t3) {
                for (var n4 = c(t3), o2 = 0, r3 = n4.length; o2 < r3; o2++) {
                  var i2 = n4[o2];
                  if (y(t3[i2])) {
                    var a2 = t3[i2].reference;
                    a2 && e4[a2] && (t3[i2] = e4[a2]);
                  }
                }
                var s2 = d2(t3);
                s2 && s2.reference && e4[s2.reference] && Object.setPrototypeOf(t3, e4[s2.reference]);
              });
            }(t2), n3;
          }, e2.exports = t;
        }, 6677: function(e2, t) {
          var n2 = /<[^>]*>/g;
          t = function(e3) {
            return e3.replace(n2, "");
          }, e2.exports = t;
        }, 1907: function(e2, t, n2) {
          var o = n2(6768), r2 = n2(1352), i = n2(6435), a = n2(2461), s = n2(4331);
          t = function(e3) {
            o(e3) && (e3 = r2(e3));
            for (var t2 = "", n3 = arguments.length, l = new Array(n3 > 1 ? n3 - 1 : 0), u2 = 1; u2 < n3; u2++)
              l[u2 - 1] = arguments[u2];
            for (var d2 = 0, f2 = e3.length; d2 < f2; d2++)
              t2 += e3[d2], l[d2] && (t2 += l[d2]);
            for (var h = t2.split("\n"), p = [], v = 0, m = h.length; v < m; v++) {
              var g = h[v].match(c);
              g && p.push(g[1].length);
            }
            var b = p.length > 0 ? i.apply(null, p) : 0;
            return s(a(h, function(e4) {
              return " " === e4[0] ? e4.slice(b) : e4;
            }).join("\n"));
          };
          var c = /^(\s+)\S+/;
          e2.exports = t;
        }, 2439: function(e2, t, n2) {
          var o = n2(6049);
          t = function(e3, t2) {
            return o(e3, t2, true);
          }, e2.exports = t;
        }, 1352: function(e2, t, n2) {
          var o = n2(1369), r2 = n2(2461), i = n2(6472), a = n2(6768);
          t = function(e3) {
            return e3 ? i(e3) ? e3 : o(e3) && !a(e3) ? r2(e3) : [e3] : [];
          }, e2.exports = t;
        }, 3474: function(e2, t, n2) {
          var o = n2(6768);
          t = function(e3) {
            return o(e3) ? "0" !== (e3 = e3.toLowerCase()) && "" !== e3 && "false" !== e3 : !!e3;
          }, e2.exports = t;
        }, 4891: function(e2, t) {
          var n2 = document;
          if (t = function(e3) {
            var t2 = n2.createElement("body");
            return t2.innerHTML = e3, t2.childNodes[0];
          }, n2.createRange && n2.body) {
            var o = n2.createRange();
            o.selectNode(n2.body), o.createContextualFragment && (t = function(e3) {
              return o.createContextualFragment(e3).childNodes[0];
            });
          }
          e2.exports = t;
        }, 9296: function(e2, t, n2) {
          var o = n2(3875);
          t = function(e3) {
            return e3 ? (e3 = o(e3)) - e3 % 1 : 0 === e3 ? e3 : 0;
          }, e2.exports = t;
        }, 3875: function(e2, t, n2) {
          var o = n2(3990), r2 = n2(5166), i = n2(4777), a = n2(6768);
          t = function(e3) {
            if (o(e3))
              return e3;
            if (r2(e3)) {
              var t2 = i(e3.valueOf) ? e3.valueOf() : e3;
              e3 = r2(t2) ? t2 + "" : t2;
            }
            return a(e3) ? +e3 : 0 === e3 ? e3 : +e3;
          }, e2.exports = t;
        }, 300: function(e2, t, n2) {
          var o = n2(2763);
          t = function(e3) {
            if (o(e3))
              return "";
            try {
              return r2.call(e3);
            } catch (e4) {
            }
            try {
              return e3 + "";
            } catch (e4) {
            }
            return "";
          };
          var r2 = Function.prototype.toString;
          e2.exports = t;
        }, 3367: function(e2, t) {
          t = function(e3) {
            return null == e3 ? "" : e3.toString();
          }, e2.exports = t;
        }, 4331: function(e2, t, n2) {
          var o = n2(7767), r2 = n2(3597);
          t = function(e3, t2) {
            return null == t2 && e3.trim ? e3.trim() : o(r2(e3, t2), t2);
          }, e2.exports = t;
        }, 7756: function(e2, t, n2) {
          var o = n2(4193), r2 = n2(1286);
          t = function(e3, t2) {
            var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            o(n3, i);
            var a = n3.ellipsis, s = n3.separator;
            if (t2 > e3.length)
              return e3;
            var c = t2 - a.length;
            if (c < 1)
              return a;
            var l = e3.slice(0, c);
            if (r2(s))
              return l + a;
            if (e3.indexOf(s, c) !== c) {
              var u2 = l.lastIndexOf(s);
              u2 > -1 && (l = l.slice(0, u2));
            }
            return l + a;
          };
          var i = { ellipsis: "..." };
          e2.exports = t;
        }, 3085: function(e2, t, n2) {
          var o = n2(106), r2 = n2(9433), i = n2(3063), a = n2(2349);
          t = function(e3) {
            var t2, n3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return null === e3 && (t2 = "Null"), void 0 === e3 && (t2 = "Undefined"), r2(e3) && (t2 = "NaN"), a(e3) && (t2 = "Buffer"), t2 || (t2 = o(e3).match(s)) && (t2 = t2[1]), t2 ? n3 ? i(t2) : t2 : "";
          };
          var s = /^\[object\s+(.*?)]$/;
          e2.exports = t;
        }, 8166: function(e2, t, n2) {
          var o = n2(996), r2 = n2(2461);
          t = { encode: function(e3) {
            return e3.length < 32768 ? String.fromCodePoint.apply(String, e3) : r2(o(e3, 32767), function(e4) {
              return String.fromCodePoint.apply(String, e4);
            }).join("");
          }, decode: function(e3) {
            for (var t2 = [], n3 = 0, o2 = e3.length; n3 < o2; ) {
              var r3 = e3.charCodeAt(n3++);
              if (r3 >= 55296 && r3 <= 56319 && n3 < o2) {
                var i = e3.charCodeAt(n3++);
                56320 == (64512 & i) ? t2.push(((1023 & r3) << 10) + (1023 & i) + 65536) : (t2.push(r3), n3--);
              } else
                t2.push(r3);
            }
            return t2;
          } }, e2.exports = t;
        }, 5484: function(e2, t, n2) {
          var o = n2(2727), r2 = n2(8985), i = false;
          function a(e3) {
            i && t.emit(e3);
          }
          t = { start: function() {
            i = true;
          }, stop: function() {
            i = false;
          } }, r2.mixin(t), o ? (window.addEventListener("error", function(e3) {
            if (e3.error)
              a(e3.error);
            else if (e3.message) {
              var t2 = new Error(e3.message);
              t2.stack = "Error: ".concat(e3.message, " \n at ").concat(e3.filename, ":").concat(e3.lineno, ":").concat(e3.colno), a(t2);
            }
          }), window.addEventListener("unhandledrejection", function(e3) {
            a(e3.reason);
          })) : (process.on("uncaughtException", a), process.on("unhandledRejection", a)), e2.exports = t;
        }, 7387: function(e2, t, n2) {
          var o = n2(8901), r2 = n2(2533);
          t = function(e3) {
            return s.test(e3) ? e3.replace(c, l) : e3;
          };
          var i = n2(7190)(o.map), a = "(?:" + r2(i).join("|") + ")", s = new RegExp(a), c = new RegExp(a, "g");
          function l(e3) {
            return i[e3];
          }
          e2.exports = t;
        }, 5229: function(e2, t) {
          var n2 = 0;
          t = function(e3) {
            var t2 = ++n2 + "";
            return e3 ? e3 + t2 : t2;
          }, e2.exports = t;
        }, 42: function(e2, t, n2) {
          var o = n2(5972);
          function r2(e3, t2) {
            return e3 === t2;
          }
          t = function(e3, t2) {
            return t2 = t2 || r2, o(e3, function(e4, n3, o2) {
              for (var r3 = o2.length; ++n3 < r3; )
                if (t2(e4, o2[n3]))
                  return false;
              return true;
            });
          }, e2.exports = t;
        }, 4502: function(e2, t, n2) {
          var o = n2(3367);
          t = function(e3) {
            return o(e3).toLocaleUpperCase();
          }, e2.exports = t;
        }, 3023: function(e2, t) {
          t = function(e3) {
            return e3.length < 1 ? e3 : e3[0].toUpperCase() + e3.slice(1);
          }, e2.exports = t;
        }, 5742: function(e2, t, n2) {
          var o = n2(8166);
          t = { encode: function(e3) {
            for (var t2 = o.decode(e3), n3 = "", r3 = 0, i2 = t2.length; r3 < i2; r3++)
              n3 += h(t2[r3]);
            return n3;
          }, decode: function(e3, t2) {
            r2 = o.decode(e3), i = 0, a = r2.length, s = 0, c = 0, l = 0, u2 = 128, d2 = 191;
            for (var n3, f3 = []; false !== (n3 = p(t2)); )
              f3.push(n3);
            return o.encode(f3);
          } };
          var r2, i, a, s, c, l, u2, d2, f2 = String.fromCharCode;
          function h(e3) {
            if (0 == (4294967168 & e3))
              return f2(e3);
            var t2, n3, o2 = "";
            for (0 == (4294965248 & e3) ? (t2 = 1, n3 = 192) : 0 == (4294901760 & e3) ? (t2 = 2, n3 = 224) : 0 == (4292870144 & e3) && (t2 = 3, n3 = 240), o2 += f2((e3 >> 6 * t2) + n3); t2 > 0; ) {
              o2 += f2(128 | 63 & e3 >> 6 * (t2 - 1)), t2--;
            }
            return o2;
          }
          function p(e3) {
            for (; ; ) {
              if (i >= a && l) {
                if (e3)
                  return v();
                throw new Error("Invalid byte index");
              }
              if (i === a)
                return false;
              var t2 = r2[i];
              if (i++, l) {
                if (t2 < u2 || t2 > d2) {
                  if (e3)
                    return i--, v();
                  throw new Error("Invalid continuation byte");
                }
                if (u2 = 128, d2 = 191, s = s << 6 | 63 & t2, ++c === l) {
                  var n3 = s;
                  return s = 0, l = 0, c = 0, n3;
                }
              } else {
                if (0 == (128 & t2))
                  return t2;
                if (192 == (224 & t2))
                  l = 1, s = 31 & t2;
                else if (224 == (240 & t2))
                  224 === t2 && (u2 = 160), 237 === t2 && (d2 = 159), l = 2, s = 15 & t2;
                else {
                  if (240 != (248 & t2)) {
                    if (e3)
                      return v();
                    throw new Error("Invalid UTF-8 detected");
                  }
                  240 === t2 && (u2 = 144), 244 === t2 && (d2 = 143), l = 3, s = 7 & t2;
                }
              }
            }
          }
          function v() {
            var e3 = i - c - 1;
            return i = e3 + 1, s = 0, l = 0, c = 0, u2 = 128, d2 = 191, r2[e3];
          }
          e2.exports = t;
        }, 5936: function(e2, t, n2) {
          var o = n2(3366);
          t = function() {
            var e3 = o(16);
            return e3[6] = 15 & e3[6] | 64, e3[8] = 63 & e3[8] | 128, r2[e3[0]] + r2[e3[1]] + r2[e3[2]] + r2[e3[3]] + "-" + r2[e3[4]] + r2[e3[5]] + "-" + r2[e3[6]] + r2[e3[7]] + "-" + r2[e3[8]] + r2[e3[9]] + "-" + r2[e3[10]] + r2[e3[11]] + r2[e3[12]] + r2[e3[13]] + r2[e3[14]] + r2[e3[15]];
          };
          for (var r2 = [], i = 0; i < 256; i++)
            r2[i] = (i + 256).toString(16).substr(1);
          e2.exports = t;
        }, 2578: function(e2, t, n2) {
          var o = n2(3783);
          t = function(e3) {
            var t2 = [];
            return o(e3, function(e4) {
              t2.push(e4);
            }), t2;
          }, e2.exports = t;
        }, 3514: function(e2, t, n2) {
          var o = n2(8573), r2 = n2(9882), i = n2(4331), a = n2(3783), s = n2(2461), c = n2(9433);
          t = function() {
            var e3 = o("viewport");
            if (!e3)
              return 1;
            e3 = s(e3.split(","), function(e4) {
              return i(e4);
            });
            var t2 = 0.25, n3 = 5, l = 1;
            a(e3, function(e4) {
              var o2 = (e4 = e4.split("="))[0];
              e4 = e4[1], "initial-scale" === o2 && (l = +e4), "maximum-scale" === o2 && (n3 = +e4), "minimum-scale" === o2 && (t2 = +e4);
            });
            var u2 = r2(l, t2, n3);
            return c(u2) ? 1 : u2;
          }, e2.exports = t;
        }, 8933: function(e2, t) {
          t = function(e3) {
            for (var t2 = [], n2 = document.evaluate(e3, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), o = 0; o < n2.snapshotLength; o++)
              t2.push(n2.snapshotItem(o));
            return t2;
          }, e2.exports = t;
        }, 3577: function(e2, t) {
          Object.defineProperty(t, "__esModule", { value: true });
          t.default = [["menuitem", "command"], ["rel", "roletype"], ["article", "article"], ["header", "banner"], ["input", "button", [["type", "checkbox"]]], ["summary", "button", [["aria-expanded", "false"]]], ["summary", "button", [["aria-expanded", "true"]]], ["input", "button", [["type", "button"]]], ["input", "button", [["type", "image"]]], ["input", "button", [["type", "reset"]]], ["input", "button", [["type", "submit"]]], ["button", "button"], ["td", "cell"], ["input", "checkbox", [["type", "checkbox"]]], ["th", "columnheader"], ["input", "combobox", [["type", "email"]]], ["input", "combobox", [["type", "search"]]], ["input", "combobox", [["type", "tel"]]], ["input", "combobox", [["type", "text"]]], ["input", "combobox", [["type", "url"]]], ["input", "combobox", [["type", "url"]]], ["select", "combobox"], ["select", "combobox", [["size", 1]]], ["aside", "complementary"], ["footer", "contentinfo"], ["dd", "definition"], ["dialog", "dialog"], ["body", "document"], ["figure", "figure"], ["form", "form"], ["form", "form"], ["form", "form"], ["span", "generic"], ["div", "generic"], ["table", "grid", [["role", "grid"]]], ["td", "gridcell", [["role", "gridcell"]]], ["details", "group"], ["fieldset", "group"], ["optgroup", "group"], ["h1", "heading"], ["h2", "heading"], ["h3", "heading"], ["h4", "heading"], ["h5", "heading"], ["h6", "heading"], ["img", "img"], ["img", "img"], ["a", "link"], ["area", "link"], ["link", "link"], ["menu", "list"], ["ol", "list"], ["ul", "list"], ["select", "listbox"], ["select", "listbox"], ["select", "listbox"], ["datalist", "listbox"], ["li", "listitem"], ["main", "main"], ["math", "math"], ["menuitem", "command"], ["nav", "navigation"], ["option", "option"], ["progress", "progressbar"], ["input", "radio", [["type", "radio"]]], ["section", "region"], ["section", "region"], ["frame", "region"], ["tr", "row"], ["tbody", "rowgroup"], ["tfoot", "rowgroup"], ["thead", "rowgroup"], ["th", "rowheader", [["scope", "row"]]], ["input", "searchbox", [["type", "search"]]], ["hr", "separator"], ["input", "slider", [["type", "range"]]], ["input", "spinbutton", [["type", "number"]]], ["output", "status"], ["table", "table"], ["dfn", "term"], ["input", "textbox"], ["input", "textbox", [["type", "email"]]], ["input", "textbox", [["type", "tel"]]], ["input", "textbox", [["type", "text"]]], ["input", "textbox", [["type", "url"]]], ["textarea", "textbox"]];
        }, 7715: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                Object.prototype.hasOwnProperty.call(t3, n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            if ("function" != typeof t2 && null !== t2)
              throw new TypeError("Class extends value " + String(t2) + " is not a constructor or null");
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__assign || function() {
            return i = Object.assign || function(e3) {
              for (var t2, n3 = 1, o2 = arguments.length; n3 < o2; n3++)
                for (var r3 in t2 = arguments[n3])
                  Object.prototype.hasOwnProperty.call(t2, r3) && (e3[r3] = t2[r3]);
              return e3;
            }, i.apply(this, arguments);
          }, a = this && this.__values || function(e3) {
            var t2 = "function" == typeof Symbol && Symbol.iterator, n3 = t2 && e3[t2], o2 = 0;
            if (n3)
              return n3.call(e3);
            if (e3 && "number" == typeof e3.length)
              return { next: function() {
                return e3 && o2 >= e3.length && (e3 = void 0), { value: e3 && e3[o2++], done: !e3 };
              } };
            throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
          }, s = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true });
          var c = s(n2(1160)), l = n2(7669), u2 = n2(2062), d2 = s(n2(242)), f2 = s(n2(2439)), h = s(n2(3063)), p = s(n2(3783)), v = s(n2(3009)), m = s(n2(5044)), g = s(n2(4502)), b = s(n2(6329)), y = s(n2(7494)), w = s(n2(6341)), _ = s(n2(3875)), x = s(n2(3577)), A = s(n2(6768));
          n2(8169);
          var k = function(e3) {
            function t2(t3, n3) {
              void 0 === n3 && (n3 = {});
              var o2 = e3.call(this, t3, { compName: "dom-highlighter" }, n3) || this;
              return o2.overlay = new l.HighlightOverlay(window), o2.reset = function() {
                var e4 = document.documentElement.clientWidth, t4 = document.documentElement.clientHeight;
                o2.overlay.reset({ viewportSize: { width: e4, height: t4 }, deviceScaleFactor: 1, pageScaleFactor: 1, pageZoomFactor: 1, emulationScaleFactor: 1, scrollX: window.scrollX, scrollY: window.scrollY });
              }, o2.initOptions(n3, { showRulers: false, showExtensionLines: false, showInfo: true, showStyles: true, showAccessibilityInfo: true, colorFormat: "hex", contentColor: "rgba(111, 168, 220, .66)", paddingColor: "rgba(147, 196, 125, .55)", borderColor: "rgba(255, 229, 153, .66)", marginColor: "rgba(246, 178, 107, .66)", monitorResize: true }), o2.overlay.setContainer(t3), o2.overlay.setPlatform("mac"), o2.redraw = (0, f2.default)(function() {
                o2.reset(), o2.draw();
              }, 16), o2.redraw(), o2.bindEvent(), o2;
            }
            return r2(t2, e3), t2.prototype.highlight = function(e4, t3) {
              t3 && (0, b.default)(this.options, t3), this.target = e4, e4 instanceof HTMLElement && this.options.monitorResize && (this.resizeSensor && this.resizeSensor.destroy(), this.resizeSensor = new d2.default(e4), this.resizeSensor.addListener(this.redraw)), this.redraw();
            }, t2.prototype.hide = function() {
              this.target = null, this.redraw();
            }, t2.prototype.intercept = function(e4) {
              this.interceptor = e4;
            }, t2.prototype.destroy = function() {
              window.removeEventListener("resize", this.redraw), window.removeEventListener("scroll", this.redraw), this.resizeSensor && this.resizeSensor.destroy(), e3.prototype.destroy.call(this);
            }, t2.prototype.draw = function() {
              var e4 = this.target;
              e4 && (e4 instanceof Text ? this.drawText(e4) : this.drawElement(e4));
            }, t2.prototype.drawText = function(e4) {
              var t3 = this.options, n3 = document.createRange();
              n3.selectNode(e4);
              var o2 = n3.getBoundingClientRect(), r3 = o2.left, i2 = o2.top, a2 = o2.width, s2 = o2.height;
              n3.detach();
              var c2 = { paths: [{ path: this.rectToPath({ left: r3, top: i2, width: a2, height: s2 }), fillColor: E(t3.contentColor), name: "content" }], showExtensionLines: t3.showExtensionLines, showRulers: t3.showRulers };
              t3.showInfo && (c2.elementInfo = { tagName: "#text", nodeWidth: a2, nodeHeight: s2 }), this.overlay.drawHighlight(c2);
            }, t2.prototype.drawElement = function(e4) {
              var t3 = { paths: this.getPaths(e4), showExtensionLines: this.options.showExtensionLines, showRulers: this.options.showRulers, colorFormat: this.options.colorFormat };
              if (this.options.showInfo && (t3.elementInfo = this.getElementInfo(e4)), this.interceptor) {
                var n3 = this.interceptor(t3);
                n3 && (t3 = n3);
              }
              this.overlay.drawHighlight(t3);
            }, t2.prototype.getPaths = function(e4) {
              var t3 = this.options, n3 = window.getComputedStyle(e4), o2 = e4.getBoundingClientRect(), r3 = o2.left, i2 = o2.top, a2 = o2.width, s2 = o2.height, c2 = function(e5) {
                return (0, u2.pxToNum)(n3.getPropertyValue(e5));
              }, l2 = c2("margin-left"), d3 = c2("margin-right"), f3 = c2("margin-top"), h2 = c2("margin-bottom"), p2 = c2("border-left-width"), v2 = c2("border-right-width"), m2 = c2("border-top-width"), g2 = c2("border-bottom-width"), b2 = c2("padding-left"), y2 = c2("padding-right"), w2 = c2("padding-top"), _2 = c2("padding-bottom");
              return [{ path: this.rectToPath({ left: r3 + p2 + b2, top: i2 + m2 + w2, width: a2 - p2 - b2 - v2 - y2, height: s2 - m2 - w2 - g2 - _2 }), fillColor: E(t3.contentColor), name: "content" }, { path: this.rectToPath({ left: r3 + p2, top: i2 + m2, width: a2 - p2 - v2, height: s2 - m2 - g2 }), fillColor: E(t3.paddingColor), name: "padding" }, { path: this.rectToPath({ left: r3, top: i2, width: a2, height: s2 }), fillColor: E(t3.borderColor), name: "border" }, { path: this.rectToPath({ left: r3 - l2, top: i2 - f3, width: a2 + l2 + d3, height: s2 + f3 + h2 }), fillColor: E(t3.marginColor), name: "margin" }];
            }, t2.prototype.getElementInfo = function(e4) {
              var t3 = e4.getBoundingClientRect(), n3 = t3.width, o2 = t3.height, r3 = e4.getAttribute("class") || "";
              r3 = r3.split(/\s+/).map(function(e5) {
                return "." + e5;
              }).join("");
              var i2 = { tagName: (0, h.default)(e4.tagName), className: r3, idValue: e4.id, nodeWidth: n3, nodeHeight: o2 };
              return this.options.showStyles && (i2.style = this.getStyles(e4)), this.options.showAccessibilityInfo && (0, b.default)(i2, this.getAccessibilityInfo(e4)), i2;
            }, t2.prototype.getStyles = function(e4) {
              for (var t3 = window.getComputedStyle(e4), n3 = false, o2 = e4.childNodes, r3 = 0, i2 = o2.length; r3 < i2; r3++)
                3 === o2[r3].nodeType && (n3 = true);
              var a2 = [];
              return n3 && a2.push("color", "font-family", "font-size", "line-height"), a2.push("padding", "margin", "background-color"), O(t3, a2);
            }, t2.prototype.getAccessibilityInfo = function(e4) {
              var t3 = window.getComputedStyle(e4);
              return i({ showAccessibilityInfo: true, contrast: i({ contrastAlgorithm: "aa", textOpacity: 0.1 }, O(t3, ["font-size", "font-weight", "background-color", "text-opacity"], true)), isKeyboardFocusable: this.isFocusable(e4) }, this.getAccessibleNameAndRole(e4));
            }, t2.prototype.isFocusable = function(e4) {
              var t3 = (0, h.default)(e4.tagName);
              if ((0, w.default)(["a", "button", "input", "textarea", "select", "details"], t3))
                return true;
              var n3 = e4.getAttribute("tabindex");
              return !!(n3 && (0, _.default)(n3) > -1);
            }, t2.prototype.getAccessibleNameAndRole = function(e4) {
              var t3 = e4.getAttribute("labelledby") || e4.getAttribute("aria-label"), n3 = e4.getAttribute("role"), o2 = (0, h.default)(e4.tagName);
              return x.default.forEach(function(t4) {
                var r3, i2;
                if (!n3) {
                  var s2 = t4[0], c2 = t4[2];
                  if (s2 === o2) {
                    if (c2)
                      try {
                        for (var l2 = a(c2), u3 = l2.next(); !u3.done; u3 = l2.next()) {
                          var d3 = u3.value;
                          if (e4.getAttribute(d3[0]) !== d3[1])
                            return;
                        }
                      } catch (e5) {
                        r3 = { error: e5 };
                      } finally {
                        try {
                          u3 && !u3.done && (i2 = l2.return) && i2.call(l2);
                        } finally {
                          if (r3)
                            throw r3.error;
                        }
                      }
                    n3 = t4[1];
                  }
                }
              }), { accessibleName: t3 || e4.getAttribute("title") || "", accessibleRole: n3 || "generic" };
            }, t2.prototype.bindEvent = function() {
              var e4 = this;
              window.addEventListener("resize", this.redraw), window.addEventListener("scroll", this.redraw), this.on("optionChange", function() {
                return e4.redraw();
              });
            }, t2.prototype.rectToPath = function(e4) {
              var t3 = e4.left, n3 = e4.top, o2 = e4.width, r3 = e4.height, i2 = [];
              return i2.push("M", t3, n3), i2.push("L", t3 + o2, n3), i2.push("L", t3 + o2, n3 + r3), i2.push("L", t3, n3 + r3), i2.push("Z"), i2;
            }, t2;
          }(c.default);
          t.default = k, e2.exports = k, e2.exports.default = k;
          var C = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, S = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/;
          function E(e3) {
            return (0, A.default)(e3) ? e3 : e3.a ? "rgba(".concat(e3.r, ", ").concat(e3.g, ", ").concat(e3.b, ", ").concat(e3.a, ")") : "rgb(".concat(e3.r, ", ").concat(e3.g, ", ").concat(e3.b, ")");
          }
          function O(e3, t2, n3) {
            void 0 === n3 && (n3 = false);
            var o2 = {};
            return (0, p.default)(t2, function(t3) {
              var r3, i2 = e3["text-opacity" === t3 ? "color" : t3];
              i2 && (r3 = i2, (C.test(r3) || S.test(r3)) && (i2 = function(e4) {
                var t4 = v.default.parse(e4), n4 = t4.val[3] || 1;
                return t4.val = t4.val.slice(0, 3), t4.val.push(Math.round(255 * n4)), "#" + (0, g.default)(m.default.encode(t4.val));
              }(i2), "text-opacity" === t3 && (i2 = i2.slice(7), i2 = m.default.decode(i2)[0] / 255)), n3 && (t3 = (0, y.default)(t3)), o2[t3] = i2);
            }), o2;
          }
        }, 9706: function(e2, t) {
          var n2 = this && this.__read || function(e3, t2) {
            var n3 = "function" == typeof Symbol && e3[Symbol.iterator];
            if (!n3)
              return e3;
            var o2, r3, i2 = n3.call(e3), a2 = [];
            try {
              for (; (void 0 === t2 || t2-- > 0) && !(o2 = i2.next()).done; )
                a2.push(o2.value);
            } catch (e4) {
              r3 = { error: e4 };
            } finally {
              try {
                o2 && !o2.done && (n3 = i2.return) && n3.call(i2);
              } finally {
                if (r3)
                  throw r3.error;
              }
            }
            return a2;
          }, o = this && this.__values || function(e3) {
            var t2 = "function" == typeof Symbol && Symbol.iterator, n3 = t2 && e3[t2], o2 = 0;
            if (n3)
              return n3.call(e3);
            if (e3 && "number" == typeof e3.length)
              return { next: function() {
                return e3 && o2 >= e3.length && (e3 = void 0), { value: e3 && e3[o2++], done: !e3 };
              } };
            throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
          };
          function r2(e3, t2) {
            var n3 = e3[3];
            return [(1 - n3) * t2[0] + n3 * e3[0], (1 - n3) * t2[1] + n3 * e3[1], (1 - n3) * t2[2] + n3 * e3[2], n3 + t2[3] * (1 - n3)];
          }
          function i(e3) {
            var t2 = n2(e3, 3), o2 = t2[0], r3 = t2[1], i2 = t2[2];
            return 0.2126 * (o2 <= 0.03928 ? o2 / 12.92 : Math.pow((o2 + 0.055) / 1.055, 2.4)) + 0.7152 * (r3 <= 0.03928 ? r3 / 12.92 : Math.pow((r3 + 0.055) / 1.055, 2.4)) + 0.0722 * (i2 <= 0.03928 ? i2 / 12.92 : Math.pow((i2 + 0.055) / 1.055, 2.4));
          }
          Object.defineProperty(t, "__esModule", { value: true }), t.getContrastThreshold = t.isLargeFont = t.getAPCAThreshold = t.desiredLuminanceAPCA = t.contrastRatioByLuminanceAPCA = t.contrastRatioAPCA = t.luminanceAPCA = t.contrastRatio = t.luminance = t.rgbaToHsla = t.blendColors = void 0, t.blendColors = r2, t.rgbaToHsla = function(e3) {
            var t2 = n2(e3, 4), o2 = t2[0], r3 = t2[1], i2 = t2[2], a2 = t2[3], s2 = Math.max(o2, r3, i2), c2 = Math.min(o2, r3, i2), l2 = s2 - c2, u3 = s2 + c2, d3 = 0.5 * u3;
            return [c2 === s2 ? 0 : o2 === s2 ? (1 / 6 * (r3 - i2) / l2 + 1) % 1 : r3 === s2 ? 1 / 6 * (i2 - o2) / l2 + 1 / 3 : 1 / 6 * (o2 - r3) / l2 + 2 / 3, 0 === d3 || 1 === d3 ? 0 : d3 <= 0.5 ? l2 / u3 : l2 / (2 - u3), d3, a2];
          }, t.luminance = i, t.contrastRatio = function(e3, t2) {
            var n3 = i(r2(e3, t2)), o2 = i(t2);
            return (Math.max(n3, o2) + 0.05) / (Math.min(n3, o2) + 0.05);
          };
          var a = 2.4, s = 0.55, c = 0.58, l = 0.62, u2 = 0.57, d2 = 0.03, f2 = 1.45, h = 1.25, p = 1.25, v = 5e-4, m = 0.078, g = 12.82051282051282, b = 0.06, y = 1e-3;
          function w(e3) {
            var t2 = n2(e3, 3), o2 = t2[0], r3 = t2[1], i2 = t2[2];
            return 0.2126729 * Math.pow(o2, a) + 0.7151522 * Math.pow(r3, a) + 0.072175 * Math.pow(i2, a);
          }
          function _(e3) {
            return e3 > d2 ? e3 : e3 + Math.pow(d2 - e3, f2);
          }
          function x(e3, t2) {
            if (e3 = _(e3), t2 = _(t2), Math.abs(e3 - t2) < v)
              return 0;
            var n3 = 0;
            return 100 * (n3 = t2 >= e3 ? (n3 = (Math.pow(t2, s) - Math.pow(e3, c)) * h) < y ? 0 : n3 < m ? n3 - n3 * g * b : n3 - b : (n3 = (Math.pow(t2, l) - Math.pow(e3, u2)) * p) > -y ? 0 : n3 > -m ? n3 - n3 * g * b : n3 + b);
          }
          t.luminanceAPCA = w, t.contrastRatioAPCA = function(e3, t2) {
            return x(w(e3), w(t2));
          }, t.contrastRatioByLuminanceAPCA = x, t.desiredLuminanceAPCA = function(e3, t2, n3) {
            function o2() {
              return n3 ? Math.pow(Math.abs(Math.pow(e3, l) - (-t2 - b) / p), 1 / u2) : Math.pow(Math.abs(Math.pow(e3, s) - (t2 + b) / h), 1 / c);
            }
            e3 = _(e3), t2 /= 100;
            var r3 = o2();
            return (r3 < 0 || r3 > 1) && (n3 = !n3, r3 = o2()), r3;
          };
          var A = [[12, -1, -1, -1, -1, 100, 90, 80, -1, -1], [14, -1, -1, -1, 100, 90, 80, 60, 60, -1], [16, -1, -1, 100, 90, 80, 60, 55, 50, 50], [18, -1, -1, 90, 80, 60, 55, 50, 40, 40], [24, -1, 100, 80, 60, 55, 50, 40, 38, 35], [30, -1, 90, 70, 55, 50, 40, 38, 35, 40], [36, -1, 80, 60, 50, 40, 38, 35, 30, 25], [48, 100, 70, 55, 40, 38, 35, 30, 25, 20], [60, 90, 60, 50, 38, 35, 30, 25, 20, 20], [72, 80, 55, 40, 35, 30, 25, 20, 20, 20], [96, 70, 50, 35, 30, 25, 20, 20, 20, 20], [120, 60, 40, 30, 25, 20, 20, 20, 20, 20]];
          function k(e3, t2) {
            var n3 = 72 * parseFloat(e3.replace("px", "")) / 96;
            return -1 !== ["bold", "bolder", "600", "700", "800", "900"].indexOf(t2) ? n3 >= 14 : n3 >= 18;
          }
          A.reverse(), t.getAPCAThreshold = function(e3, t2) {
            var r3, i2, a2, s2, c2 = parseFloat(e3.replace("px", "")), l2 = parseFloat(t2);
            try {
              for (var u3 = o(A), d3 = u3.next(); !d3.done; d3 = u3.next()) {
                var f3 = n2(d3.value), h2 = f3[0], p2 = f3.slice(1);
                if (c2 >= h2)
                  try {
                    for (var v2 = (a2 = void 0, o([900, 800, 700, 600, 500, 400, 300, 200, 100].entries())), m2 = v2.next(); !m2.done; m2 = v2.next()) {
                      var g2 = n2(m2.value, 2), b2 = g2[0];
                      if (l2 >= g2[1]) {
                        var y2 = p2[p2.length - 1 - b2];
                        return -1 === y2 ? null : y2;
                      }
                    }
                  } catch (e4) {
                    a2 = { error: e4 };
                  } finally {
                    try {
                      m2 && !m2.done && (s2 = v2.return) && s2.call(v2);
                    } finally {
                      if (a2)
                        throw a2.error;
                    }
                  }
              }
            } catch (e4) {
              r3 = { error: e4 };
            } finally {
              try {
                d3 && !d3.done && (i2 = u3.return) && i2.call(u3);
              } finally {
                if (r3)
                  throw r3.error;
              }
            }
            return null;
          }, t.isLargeFont = k;
          var C = { aa: 3, aaa: 4.5 }, S = { aa: 4.5, aaa: 7 };
          t.getContrastThreshold = function(e3, t2) {
            return k(e3, t2) ? C : S;
          };
        }, 9434: function(e2, t) {
          var n2 = this && this.__values || function(e3) {
            var t2 = "function" == typeof Symbol && Symbol.iterator, n3 = t2 && e3[t2], o2 = 0;
            if (n3)
              return n3.call(e3);
            if (e3 && "number" == typeof e3.length)
              return { next: function() {
                return e3 && o2 >= e3.length && (e3 = void 0), { value: e3 && e3[o2++], done: !e3 };
              } };
            throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
          }, o = this && this.__read || function(e3, t2) {
            var n3 = "function" == typeof Symbol && e3[Symbol.iterator];
            if (!n3)
              return e3;
            var o2, r3, i2 = n3.call(e3), a2 = [];
            try {
              for (; (void 0 === t2 || t2-- > 0) && !(o2 = i2.next()).done; )
                a2.push(o2.value);
            } catch (e4) {
              r3 = { error: e4 };
            } finally {
              try {
                o2 && !o2.done && (n3 = i2.return) && n3.call(i2);
              } finally {
                if (r3)
                  throw r3.error;
              }
            }
            return a2;
          }, r2 = this && this.__spreadArray || function(e3, t2, n3) {
            if (n3 || 2 === arguments.length)
              for (var o2, r3 = 0, i2 = t2.length; r3 < i2; r3++)
                !o2 && r3 in t2 || (o2 || (o2 = Array.prototype.slice.call(t2, 0, r3)), o2[r3] = t2[r3]);
            return e3.concat(o2 || Array.prototype.slice.call(t2));
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.adoptStyleSheet = t.constrainNumber = t.ellipsify = t.createElement = t.createTextChild = t.createChild = t.log = t.Overlay = void 0;
          var i = function() {
            function e3(e4, t2) {
              void 0 === t2 && (t2 = []), this.viewportSize = { width: 800, height: 600 }, this.deviceScaleFactor = 1, this.emulationScaleFactor = 1, this.pageScaleFactor = 1, this.pageZoomFactor = 1, this.scrollX = 0, this.scrollY = 0, this.canvasWidth = 0, this.canvasHeight = 0, this._installed = false, this._window = e4, this._document = e4.document, Array.isArray(t2) || (t2 = [t2]), this.style = t2;
            }
            return e3.prototype.setCanvas = function(e4) {
              this.canvas = e4, this._context = e4.getContext("2d");
            }, e3.prototype.install = function() {
              var e4, t2;
              try {
                for (var o2 = n2(this.style), r3 = o2.next(); !r3.done; r3 = o2.next()) {
                  c(r3.value);
                }
              } catch (t3) {
                e4 = { error: t3 };
              } finally {
                try {
                  r3 && !r3.done && (t2 = o2.return) && t2.call(o2);
                } finally {
                  if (e4)
                    throw e4.error;
                }
              }
              this._installed = true;
            }, e3.prototype.uninstall = function() {
              var e4, t2, o2 = function(e5) {
                document.adoptedStyleSheets = document.adoptedStyleSheets.filter(function(t3) {
                  return t3 !== e5;
                });
              };
              try {
                for (var r3 = n2(this.style), i2 = r3.next(); !i2.done; i2 = r3.next()) {
                  o2(i2.value);
                }
              } catch (t3) {
                e4 = { error: t3 };
              } finally {
                try {
                  i2 && !i2.done && (t2 = r3.return) && t2.call(r3);
                } finally {
                  if (e4)
                    throw e4.error;
                }
              }
              this._installed = false;
            }, e3.prototype.reset = function(e4) {
              e4 && (this.viewportSize = e4.viewportSize, this.visualViewportSize = e4.visualViewportSize, this.deviceScaleFactor = e4.deviceScaleFactor, this.pageScaleFactor = e4.pageScaleFactor, this.pageZoomFactor = e4.pageZoomFactor, this.emulationScaleFactor = e4.emulationScaleFactor, this.scrollX = Math.round(e4.scrollX), this.scrollY = Math.round(e4.scrollY)), this.resetCanvas();
            }, e3.prototype.resetCanvas = function() {
              this.canvas && this._context && (this.canvas.width = this.deviceScaleFactor * this.viewportSize.width, this.canvas.height = this.deviceScaleFactor * this.viewportSize.height, this.canvas.style.width = this.viewportSize.width + "px", this.canvas.style.height = this.viewportSize.height + "px", this._context.scale(this.deviceScaleFactor, this.deviceScaleFactor), this.canvasWidth = this.viewportSize.width, this.canvasHeight = this.viewportSize.height);
            }, e3.prototype.setPlatform = function(e4) {
              this.platform = e4, this._installed || this.install();
            }, e3.prototype.dispatch = function(e4) {
              this[e4.shift()].apply(this, e4);
            }, e3.prototype.eventHasCtrlOrMeta = function(e4) {
              return "mac" === this.platform ? e4.metaKey && !e4.ctrlKey : e4.ctrlKey && !e4.metaKey;
            }, Object.defineProperty(e3.prototype, "context", { get: function() {
              if (!this._context)
                throw new Error("Context object is missing");
              return this._context;
            }, enumerable: false, configurable: true }), Object.defineProperty(e3.prototype, "document", { get: function() {
              if (!this._document)
                throw new Error("Document object is missing");
              return this._document;
            }, enumerable: false, configurable: true }), Object.defineProperty(e3.prototype, "window", { get: function() {
              if (!this._window)
                throw new Error("Window object is missing");
              return this._window;
            }, enumerable: false, configurable: true }), Object.defineProperty(e3.prototype, "installed", { get: function() {
              return this._installed;
            }, enumerable: false, configurable: true }), e3;
          }();
          function a(e3, t2, n3) {
            var o2 = s(t2, n3);
            return o2.addEventListener("click", function(e4) {
              e4.stopPropagation();
            }, false), e3.appendChild(o2), o2;
          }
          function s(e3, t2) {
            var n3 = document.createElement(e3);
            if (t2) {
              var o2 = t2.split(/\s+/);
              o2 = o2.map(function(e4) {
                return "luna-dom-highlighter-" + e4;
              }), n3.className = o2.join(" ");
            }
            return n3;
          }
          function c(e3) {
            document.adoptedStyleSheets = r2(r2([], o(document.adoptedStyleSheets), false), [e3], false);
          }
          t.Overlay = i, t.log = function(e3) {
            var t2 = document.getElementById("log");
            t2 || ((t2 = a(document.body, "div")).id = "log"), a(t2, "div").textContent = e3;
          }, t.createChild = a, t.createTextChild = function(e3, t2) {
            var n3 = document.createTextNode(t2);
            return e3.appendChild(n3), n3;
          }, t.createElement = s, t.ellipsify = function(e3, t2) {
            return e3.length <= t2 ? String(e3) : e3.substr(0, t2 - 1) + "…";
          }, t.constrainNumber = function(e3, t2, n3) {
            return e3 < t2 ? e3 = t2 : e3 > n3 && (e3 = n3), e3;
          }, t.adoptStyleSheet = c;
        }, 1521: function(e2, t, n2) {
          var o = this && this.__values || function(e3) {
            var t2 = "function" == typeof Symbol && Symbol.iterator, n3 = t2 && e3[t2], o2 = 0;
            if (n3)
              return n3.call(e3);
            if (e3 && "number" == typeof e3.length)
              return { next: function() {
                return e3 && o2 >= e3.length && (e3 = void 0), { value: e3 && e3[o2++], done: !e3 };
              } };
            throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
          }, r2 = this && this.__read || function(e3, t2) {
            var n3 = "function" == typeof Symbol && e3[Symbol.iterator];
            if (!n3)
              return e3;
            var o2, r3, i2 = n3.call(e3), a2 = [];
            try {
              for (; (void 0 === t2 || t2-- > 0) && !(o2 = i2.next()).done; )
                a2.push(o2.value);
            } catch (e4) {
              r3 = { error: e4 };
            } finally {
              try {
                o2 && !o2.done && (n3 = i2.return) && n3.call(i2);
              } finally {
                if (r3)
                  throw r3.error;
              }
            }
            return a2;
          }, i = this && this.__spreadArray || function(e3, t2, n3) {
            if (n3 || 2 === arguments.length)
              for (var o2, r3 = 0, i2 = t2.length; r3 < i2; r3++)
                !o2 && r3 in t2 || (o2 || (o2 = Array.prototype.slice.call(t2, 0, r3)), o2[r3] = t2[r3]);
            return e3.concat(o2 || Array.prototype.slice.call(t2));
          }, a = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.drawPath = t.formatColor = t.formatRgba = t.parseHexa = t.createPathForQuad = t.hatchFillPath = t.applyMatrixToPoint = t.emptyBounds = t.buildPath = t.fillPathWithBoxStyle = t.drawPathWithLineStyle = void 0;
          var s = a(n2(4858)), c = n2(9706);
          function l(e3, t2, n3) {
            var o2 = 0;
            function r3(r4) {
              for (var i3 = [], a3 = 0; a3 < r4; ++a3) {
                var s2 = Math.round(e3[o2++] * n3);
                t2.maxX = Math.max(t2.maxX, s2), t2.minX = Math.min(t2.minX, s2);
                var c2 = Math.round(e3[o2++] * n3);
                t2.maxY = Math.max(t2.maxY, c2), t2.minY = Math.min(t2.minY, c2), t2.leftmostXForY[c2] = Math.min(t2.leftmostXForY[c2] || Number.MAX_VALUE, s2), t2.rightmostXForY[c2] = Math.max(t2.rightmostXForY[c2] || Number.MIN_VALUE, s2), t2.topmostYForX[s2] = Math.min(t2.topmostYForX[s2] || Number.MAX_VALUE, c2), t2.bottommostYForX[s2] = Math.max(t2.bottommostYForX[s2] || Number.MIN_VALUE, c2), t2.allPoints.push({ x: s2, y: c2 }), i3.push(s2, c2);
              }
              return i3;
            }
            for (var i2 = e3.length, a2 = new Path2D(); o2 < i2; )
              switch (e3[o2++]) {
                case "M":
                  a2.moveTo.apply(a2, r3(1));
                  break;
                case "L":
                  a2.lineTo.apply(a2, r3(1));
                  break;
                case "C":
                  a2.bezierCurveTo.apply(a2, r3(3));
                  break;
                case "Q":
                  a2.quadraticCurveTo.apply(a2, r3(2));
                  break;
                case "Z":
                  a2.closePath();
              }
            return a2;
          }
          t.drawPathWithLineStyle = function(e3, t2, n3, o2) {
            void 0 === o2 && (o2 = 1), n3 && n3.color && (e3.save(), e3.translate(0.5, 0.5), e3.lineWidth = o2, "dashed" === n3.pattern && e3.setLineDash([3, 3]), "dotted" === n3.pattern && e3.setLineDash([2, 2]), e3.strokeStyle = n3.color, e3.stroke(t2), e3.restore());
          }, t.fillPathWithBoxStyle = function(e3, t2, n3, o2, r3) {
            r3 && (e3.save(), r3.fillColor && (e3.fillStyle = r3.fillColor, e3.fill(t2)), r3.hatchColor && p(e3, t2, n3, 10, r3.hatchColor, o2, false), e3.restore());
          }, t.buildPath = l, t.emptyBounds = function() {
            return { minX: Number.MAX_VALUE, minY: Number.MAX_VALUE, maxX: -Number.MAX_VALUE, maxY: -Number.MAX_VALUE, leftmostXForY: {}, rightmostXForY: {}, topmostYForX: {}, bottommostYForX: {}, allPoints: [] };
          }, t.applyMatrixToPoint = function(e3, t2) {
            var n3 = new DOMPoint(e3.x, e3.y);
            return { x: (n3 = n3.matrixTransform(t2)).x, y: n3.y };
          };
          var u2, d2 = 5, f2 = 3, h = "";
          function p(e3, t2, n3, o2, r3, i2, a2) {
            if ((e3.canvas.width < n3.maxX - n3.minX || e3.canvas.height < n3.maxY - n3.minY) && (n3 = { minX: 0, maxX: e3.canvas.width, minY: 0, maxY: e3.canvas.height, allPoints: [] }), !u2 || r3 !== h) {
              h = r3;
              var s2 = document.createElement("canvas");
              s2.width = o2, s2.height = d2 + f2;
              var c2 = s2.getContext("2d");
              c2.clearRect(0, 0, s2.width, s2.height), c2.rect(0, 0, 1, d2), c2.fillStyle = r3, c2.fill(), u2 = e3.createPattern(s2, "repeat");
            }
            e3.save();
            var l2 = new DOMMatrix();
            u2.setTransform(l2.scale(a2 ? -1 : 1, 1).rotate(0, 0, -45 + i2)), e3.fillStyle = u2, e3.fill(t2), e3.restore();
          }
          function v(e3) {
            return (e3.match(/#(\w\w)(\w\w)(\w\w)(\w\w)/) || []).slice(1).map(function(e4) {
              return parseInt(e4, 16) / 255;
            });
          }
          function m(e3, t2) {
            if ("rgb" === t2) {
              var n3 = r2(e3, 4), o2 = n3[0], i2 = n3[1], a2 = n3[2], s2 = n3[3];
              return "rgb(".concat((255 * o2).toFixed(), " ").concat((255 * i2).toFixed(), " ").concat((255 * a2).toFixed()).concat(1 === s2 ? "" : " / " + Math.round(100 * s2) / 100, ")");
            }
            if ("hsl" === t2) {
              var l2 = r2((0, c.rgbaToHsla)(e3), 4), u3 = l2[0], d3 = l2[1], f3 = l2[2];
              s2 = l2[3];
              return "hsl(".concat(Math.round(360 * u3), "deg ").concat(Math.round(100 * d3), " ").concat(Math.round(100 * f3)).concat(1 === s2 ? "" : " / " + Math.round(100 * s2) / 100, ")");
            }
            throw new Error("NOT_REACHED");
          }
          t.hatchFillPath = p, t.createPathForQuad = function(e3, t2, n3, a2) {
            var s2, c2, u3 = ["M", e3.p1.x, e3.p1.y, "L", e3.p2.x, e3.p2.y, "L", e3.p3.x, e3.p3.y, "L", e3.p4.x, e3.p4.y];
            try {
              for (var d3 = o(t2), f3 = d3.next(); !f3.done; f3 = d3.next()) {
                var h2 = f3.value;
                u3 = i(i([], r2(u3), false), ["L", h2.p4.x, h2.p4.y, "L", h2.p3.x, h2.p3.y, "L", h2.p2.x, h2.p2.y, "L", h2.p1.x, h2.p1.y, "L", h2.p4.x, h2.p4.y, "L", e3.p4.x, e3.p4.y], false);
              }
            } catch (e4) {
              s2 = { error: e4 };
            } finally {
              try {
                f3 && !f3.done && (c2 = d3.return) && c2.call(d3);
              } finally {
                if (s2)
                  throw s2.error;
              }
            }
            return u3.push("Z"), l(u3, n3, a2);
          }, t.parseHexa = v, t.formatRgba = m, t.formatColor = function(e3, t2) {
            return "rgb" === t2 || "hsl" === t2 ? m(v(e3), t2) : (0, s.default)(e3, "FF") ? e3.substr(0, 7) : e3;
          }, t.drawPath = function(e3, t2, n3, o2, r3, i2, a2) {
            e3.save();
            var s2 = l(t2, i2, a2);
            return n3 && (e3.fillStyle = n3, e3.fill(s2)), o2 && ("dashed" === r3 && e3.setLineDash([3, 3]), "dotted" === r3 && e3.setLineDash([2, 2]), e3.lineWidth = 2, e3.strokeStyle = o2, e3.stroke(s2)), e3.restore(), s2;
          };
        }, 7669: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                Object.prototype.hasOwnProperty.call(t3, n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            if ("function" != typeof t2 && null !== t2)
              throw new TypeError("Class extends value " + String(t2) + " is not a constructor or null");
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.HighlightOverlay = void 0;
          var a = i(n2(4858)), s = n2(9706), c = n2(9434), l = n2(1521), u2 = function(e3) {
            function t2() {
              var t3 = null !== e3 && e3.apply(this, arguments) || this;
              return t3.gridLabelState = { gridLayerCounter: 0 }, t3;
            }
            return r2(t2, e3), t2.prototype.setContainer = function(e4) {
              this._container = e4;
            }, t2.prototype.setPlatform = function(t3) {
              this.container && this.container.classList.add("luna-dom-highlighter-platform-" + t3), e3.prototype.setPlatform.call(this, t3);
            }, Object.defineProperty(t2.prototype, "container", { get: function() {
              return this._container;
            }, enumerable: false, configurable: true }), t2.prototype.reset = function(t3) {
              e3.prototype.reset.call(this, t3), this.tooltip.innerHTML = "", this.gridLabelState.gridLayerCounter = 0;
            }, t2.prototype.install = function() {
              var t3 = this.document.createElement("canvas");
              t3.classList.add("luna-dom-highlighter-fill"), this.container.appendChild(t3);
              var n3 = this.document.createElement("div");
              this.container.appendChild(n3), this.tooltip = n3, this.setCanvas(t3), e3.prototype.install.call(this);
            }, t2.prototype.uninstall = function() {
              this.document.body.classList.remove("fill"), this.document.body.innerHTML = "", e3.prototype.uninstall.call(this);
            }, t2.prototype.drawHighlight = function(e4) {
              this.context.save();
              for (var t3 = (0, l.emptyBounds)(), n3 = e4.paths.slice(); n3.length; ) {
                var o2 = n3.pop();
                o2 && (this.context.save(), (0, l.drawPath)(this.context, o2.path, o2.fillColor, o2.outlineColor, void 0, t3, this.emulationScaleFactor), n3.length && (this.context.globalCompositeOperation = "destination-out", (0, l.drawPath)(this.context, n3[n3.length - 1].path, "red", void 0, void 0, t3, this.emulationScaleFactor)), this.context.restore());
              }
              this.context.restore(), this.context.save();
              var r3 = Boolean(e4.paths.length && e4.showRulers && t3.minX < 20 && t3.maxX + 20 < this.canvasWidth), i2 = Boolean(e4.paths.length && e4.showRulers && t3.minY < 20 && t3.maxY + 20 < this.canvasHeight);
              return e4.showRulers && this.drawAxis(this.context, r3, i2), e4.paths.length && (e4.showExtensionLines && function(e5, t4, n4, o3, r4, i3, a2, s2) {
                e5.save();
                var c2 = a2, l2 = s2;
                e5.strokeStyle = r4 || p, e5.lineWidth = 1, e5.translate(0.5, 0.5), i3 && e5.setLineDash([3, 3]);
                if (n4)
                  for (var u3 in t4.rightmostXForY)
                    e5.beginPath(), e5.moveTo(c2, Number(u3)), e5.lineTo(t4.rightmostXForY[u3], Number(u3)), e5.stroke();
                else
                  for (var u3 in t4.leftmostXForY)
                    e5.beginPath(), e5.moveTo(0, Number(u3)), e5.lineTo(t4.leftmostXForY[u3], Number(u3)), e5.stroke();
                if (o3)
                  for (var d3 in t4.bottommostYForX)
                    e5.beginPath(), e5.moveTo(Number(d3), l2), e5.lineTo(Number(d3), t4.topmostYForX[d3]), e5.stroke();
                else
                  for (var d3 in t4.topmostYForX)
                    e5.beginPath(), e5.moveTo(Number(d3), 0), e5.lineTo(Number(d3), t4.topmostYForX[d3]), e5.stroke();
                e5.restore();
              }(this.context, t3, r3, i2, void 0, false, this.canvasWidth, this.canvasHeight), e4.elementInfo && function(e5, t4, n4, o3, r4, i3) {
                e5.innerHTML = "";
                var u3 = (0, c.createChild)(e5, "div"), d3 = (0, c.createChild)(u3, "div", "tooltip-content"), f3 = function(e6, t5) {
                  var n5 = (0, c.createElement)("div", "element-info"), o4 = (0, c.createChild)(n5, "div", "element-info-header"), r5 = function(e7) {
                    if (e7.layoutObjectName && (0, a.default)(e7.layoutObjectName, "Grid"))
                      return "grid";
                    if (e7.layoutObjectName && "LayoutNGFlexibleBox" === e7.layoutObjectName)
                      return "flex";
                    return null;
                  }(e6);
                  r5 && (0, c.createChild)(o4, "div", "element-layout-type ".concat(r5));
                  var i4 = (0, c.createChild)(o4, "div", "element-description");
                  (0, c.createChild)(i4, "span", "material-tag-name").textContent = e6.tagName;
                  var u4 = (0, c.createChild)(i4, "span", "material-node-id"), d4 = 80;
                  u4.textContent = e6.idValue ? "#" + (0, c.ellipsify)(e6.idValue, d4) : "", u4.classList.toggle("hidden", !e6.idValue);
                  var f4 = (0, c.createChild)(i4, "span", "material-class-name");
                  u4.textContent.length < d4 && (f4.textContent = (0, c.ellipsify)(e6.className || "", d4 - u4.textContent.length));
                  f4.classList.toggle("hidden", !e6.className);
                  var h3 = (0, c.createChild)(o4, "div", "dimensions");
                  (0, c.createChild)(h3, "span", "material-node-width").textContent = String(Math.round(100 * e6.nodeWidth) / 100), (0, c.createTextChild)(h3, "×"), (0, c.createChild)(h3, "span", "material-node-height").textContent = String(Math.round(100 * e6.nodeHeight) / 100);
                  var p3, v2 = e6.style || {};
                  e6.isLockedAncestor && O2("Showing content-visibility ancestor", "");
                  e6.isLocked && O2("Descendants are skipped due to content-visibility", "");
                  var m2 = v2.color;
                  m2 && "#00000000" !== m2 && T2("Color", m2, t5);
                  var g2 = v2["font-family"], b2 = v2["font-size"];
                  g2 && "0px" !== b2 && O2("Font", "".concat(b2, " ").concat(g2));
                  var y2 = v2["background-color"];
                  y2 && "#00000000" !== y2 && T2("Background", y2, t5);
                  var w2 = v2.margin;
                  w2 && "0px" !== w2 && O2("Margin", w2);
                  var _2 = v2.padding;
                  _2 && "0px" !== _2 && O2("Padding", _2);
                  var x2 = e6.contrast ? e6.contrast.backgroundColor : null, A2 = m2 && "#00000000" !== m2 && x2 && "#00000000" !== x2;
                  e6.showAccessibilityInfo && (C2("Accessibility"), A2 && v2.color && e6.contrast && N2(v2.color, e6.contrast), O2("Name", e6.accessibleName), O2("Role", e6.accessibleRole), E2("Keyboard-focusable", e6.isKeyboardFocusable ? "a11y-icon a11y-icon-ok" : "a11y-icon a11y-icon-not-ok"));
                  function k2() {
                    p3 || (p3 = (0, c.createChild)(n5, "div", "element-info-body"));
                  }
                  function C2(e7) {
                    k2();
                    var t6 = (0, c.createChild)(p3, "div", "element-info-row element-info-section");
                    (0, c.createChild)(t6, "div", "section-name").textContent = e7, (0, c.createChild)((0, c.createChild)(t6, "div", "separator-container"), "div", "separator");
                  }
                  function S2(e7, t6, n6) {
                    k2();
                    var o5 = (0, c.createChild)(p3, "div", "element-info-row");
                    return t6 && o5.classList.add(t6), (0, c.createChild)(o5, "div", "element-info-name").textContent = e7, (0, c.createChild)(o5, "div", "element-info-gap"), (0, c.createChild)(o5, "div", n6 || "");
                  }
                  function E2(e7, t6) {
                    (0, c.createChild)(S2(e7, "", "element-info-value-icon"), "div", t6);
                  }
                  function O2(e7, t6) {
                    (0, c.createTextChild)(S2(e7, "", "element-info-value-text"), t6);
                  }
                  function T2(e7, t6, n6) {
                    var o5 = S2(e7, "", "element-info-value-color"), r6 = (0, c.createChild)(o5, "div", "color-swatch");
                    (0, c.createChild)(r6, "div", "color-swatch-inner").style.backgroundColor = t6, (0, c.createTextChild)(o5, (0, l.formatColor)(t6, n6));
                  }
                  function N2(e7, t6) {
                    var n6 = (0, l.parseHexa)(e7), o5 = (0, l.parseHexa)(t6.backgroundColor);
                    n6[3] *= t6.textOpacity;
                    var r6 = S2("Contrast", "", "element-info-value-contrast"), i5 = (0, c.createChild)(r6, "div", "contrast-text");
                    i5.style.color = (0, l.formatRgba)(n6, "rgb"), i5.style.backgroundColor = t6.backgroundColor, i5.textContent = "Aa";
                    var a2 = (0, c.createChild)(r6, "span");
                    if ("apca" === t6.contrastAlgorithm) {
                      var u5 = (0, s.contrastRatioAPCA)(n6, o5), d5 = (0, s.getAPCAThreshold)(t6.fontSize, t6.fontWeight);
                      a2.textContent = String(Math.floor(100 * u5) / 100) + "%", (0, c.createChild)(r6, "div", null === d5 || Math.abs(u5) < d5 ? "a11y-icon a11y-icon-warning" : "a11y-icon a11y-icon-ok");
                    } else if ("aa" === t6.contrastAlgorithm || "aaa" === t6.contrastAlgorithm) {
                      var f5 = (0, s.contrastRatio)(n6, o5);
                      d5 = (0, s.getContrastThreshold)(t6.fontSize, t6.fontWeight)[t6.contrastAlgorithm];
                      a2.textContent = String(Math.floor(100 * f5) / 100), (0, c.createChild)(r6, "div", f5 < d5 ? "a11y-icon a11y-icon-warning" : "a11y-icon a11y-icon-ok");
                    }
                  }
                  return n5;
                }(t4, n4);
                d3.appendChild(f3);
                var h2, p2 = d3.offsetWidth, v = d3.offsetHeight, m = 8, g = 2, b = 2 * m, y = m + 2, w = g + y, _ = r4 - g - y - b, x = o3.maxX - o3.minX < b + 2 * y;
                if (x)
                  h2 = 0.5 * (o3.minX + o3.maxX) - m;
                else {
                  var A = o3.minX + y, k = o3.maxX - y - b;
                  h2 = A > w && A < _ ? A : (0, c.constrainNumber)(w, A, k);
                }
                var C = h2 < w || h2 > _, S = h2 - y;
                S = (0, c.constrainNumber)(S, g, r4 - p2 - g);
                var E = o3.minY - m - v, O = true;
                E < 0 ? (E = Math.min(i3 - v, o3.maxY + m), O = false) : o3.minY > i3 && (E = i3 - m - v);
                var T = S >= o3.minX && S + p2 <= o3.maxX && E >= o3.minY && E + v <= o3.maxY, N = S < o3.maxX && S + p2 > o3.minX && E < o3.maxY && E + v > o3.minY;
                if (N && !T)
                  return void (d3.style.display = "none");
                if (d3.style.top = E + "px", d3.style.left = S + "px", C)
                  return;
                var M = (0, c.createChild)(d3, "div", "tooltip-arrow");
                M.style.clipPath = O ? "polygon(0 0, 100% 0, 50% 100%)" : "polygon(50% 0, 0 100%, 100% 100%)", M.style.top = (O ? v - 1 : -m) + "px", M.style.left = h2 - S + "px";
              }(this.tooltip, e4.elementInfo, e4.colorFormat, t3, this.canvasWidth, this.canvasHeight)), this.context.restore(), { bounds: t3 };
            }, t2.prototype.drawAxis = function(e4, t3, n3) {
              e4.save();
              var o2 = this.pageZoomFactor * this.pageScaleFactor * this.emulationScaleFactor, r3 = this.scrollX * this.pageScaleFactor, i2 = this.scrollY * this.pageScaleFactor;
              function a2(e5) {
                return Math.round(e5 * o2);
              }
              function s2(e5) {
                return Math.round(e5 / o2);
              }
              var c2 = this.canvasWidth / o2, l2 = this.canvasHeight / o2, u3 = 50;
              e4.save(), e4.fillStyle = h, n3 ? e4.fillRect(0, a2(l2) - 15, a2(c2), a2(l2)) : e4.fillRect(0, 0, a2(c2), 15), e4.globalCompositeOperation = "destination-out", e4.fillStyle = "red", t3 ? e4.fillRect(a2(c2) - 15, 0, a2(c2), a2(l2)) : e4.fillRect(0, 0, 15, a2(l2)), e4.restore(), e4.fillStyle = h, t3 ? e4.fillRect(a2(c2) - 15, 0, a2(c2), a2(l2)) : e4.fillRect(0, 0, 15, a2(l2)), e4.lineWidth = 1, e4.strokeStyle = f2, e4.fillStyle = f2, e4.save(), e4.translate(-r3, 0.5 - i2);
              for (var p2 = l2 + s2(i2), v = 100; v < p2; v += 100)
                e4.save(), e4.translate(r3, a2(v)), e4.rotate(-Math.PI / 2), e4.fillText(String(v), 2, t3 ? a2(c2) - 7 : 13), e4.restore();
              e4.translate(0.5, -0.5);
              for (var m = c2 + s2(r3), g = 100; g < m; g += 100)
                e4.save(), e4.fillText(String(g), a2(g) + 2, n3 ? i2 + a2(l2) - 7 : i2 + 13), e4.restore();
              e4.restore(), e4.save(), t3 && (e4.translate(a2(c2), 0), e4.scale(-1, 1)), e4.translate(-r3, 0.5 - i2);
              for (p2 = l2 + s2(i2), v = u3; v < p2; v += u3) {
                e4.beginPath(), e4.moveTo(r3, a2(v));
                var b = v % 100 ? 5 : 8;
                e4.lineTo(r3 + b, a2(v)), e4.stroke();
              }
              e4.strokeStyle = d2;
              for (v = 5; v < p2; v += 5)
                v % u3 && (e4.beginPath(), e4.moveTo(r3, a2(v)), e4.lineTo(r3 + 5, a2(v)), e4.stroke());
              e4.restore(), e4.save(), n3 && (e4.translate(0, a2(l2)), e4.scale(1, -1)), e4.translate(0.5 - r3, -i2);
              for (m = c2 + s2(r3), g = u3; g < m; g += u3) {
                e4.beginPath(), e4.moveTo(a2(g), i2);
                b = g % 100 ? 5 : 8;
                e4.lineTo(a2(g), i2 + b), e4.stroke();
              }
              e4.strokeStyle = d2;
              for (g = 5; g < m; g += 5)
                g % u3 && (e4.beginPath(), e4.moveTo(a2(g), i2), e4.lineTo(a2(g), i2 + 5), e4.stroke());
              e4.restore(), e4.restore();
            }, t2;
          }(c.Overlay);
          t.HighlightOverlay = u2;
          var d2 = "rgba(0,0,0,0.2)", f2 = "rgba(0,0,0,0.7)", h = "rgba(255, 255, 255, 0.8)";
          var p = "rgba(128, 128, 128, 0.3)";
        }, 1160: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                Object.prototype.hasOwnProperty.call(t3, n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            if ("function" != typeof t2 && null !== t2)
              throw new TypeError("Class extends value " + String(t2) + " is not a constructor or null");
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true });
          var a = i(n2(1443)), s = i(n2(1512)), c = n2(2062), l = i(n2(3783)), u2 = i(n2(6329)), d2 = i(n2(4193)), f2 = i(n2(5852)), h = function(e3) {
            function t2(t3, n3, o2) {
              var r3 = n3.compName, i2 = (void 0 === o2 ? {} : o2).theme, a2 = void 0 === i2 ? "light" : i2, u3 = e3.call(this) || this;
              return u3.subComponents = [], u3.compName = r3, u3.c = (0, c.classPrefix)(r3), u3.options = {}, u3.container = t3, u3.$container = (0, s.default)(t3), u3.$container.addClass(["luna-".concat(r3), u3.c("platform-".concat((0, c.getPlatform)()))]), u3.on("optionChange", function(e4, t4, n4) {
                var o3 = u3.c;
                "theme" === e4 && (u3.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t4))), (0, l.default)(u3.subComponents, function(e5) {
                  return e5.setOption("theme", t4);
                }));
              }), u3.setOption("theme", a2), u3;
            }
            return r2(t2, e3), t2.prototype.destroy = function() {
              this.destroySubComponents();
              var e4 = this.c;
              this.$container.rmClass("luna-".concat(this.compName)).rmClass(e4("platform-".concat((0, c.getPlatform)()))).rmClass(e4("theme-".concat(this.options.theme))), this.$container.html(""), this.emit("destroy"), this.removeAllListeners();
            }, t2.prototype.setOption = function(e4, t3) {
              var n3 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, (0, l.default)(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n3.emit("optionChange", t4, e5, r4);
              });
            }, t2.prototype.getOption = function(e4) {
              return this.options[e4];
            }, t2.prototype.addSubComponent = function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            }, t2.prototype.removeSubComponent = function(e4) {
              (0, f2.default)(this.subComponents, function(t3) {
                return t3 === e4;
              });
            }, t2.prototype.destroySubComponents = function() {
              (0, l.default)(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            }, t2.prototype.initOptions = function(e4, t3) {
              void 0 === t3 && (t3 = {}), (0, d2.default)(e4, t3), (0, u2.default)(this.options, e4);
            }, t2.prototype.find = function(e4) {
              return this.$container.find(this.c(e4));
            }, t2;
          }(a.default);
          t.default = h;
        }, 2062: function(e2, t, n2) {
          var o = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.resetCanvasSize = t.getPlatform = t.pxToNum = t.executeAfterTransition = t.hasVerticalScrollbar = t.measuredScrollbarWidth = t.eventPage = t.eventClient = t.drag = t.classPrefix = void 0;
          var r2 = o(n2(2461)), i = o(n2(4331)), a = o(n2(5610)), s = o(n2(7483)), c = o(n2(3990)), l = o(n2(6341)), u2 = o(n2(3875)), d2 = o(n2(6954)), f2 = o(n2(9585));
          function h(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && h(r3.content, t2);
            }
          }
          t.classPrefix = function(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return (0, r2.default)((0, i.default)(e4).split(/\s+/), function(e5) {
                return (0, l.default)(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = s.default.parse(e4);
                  return h(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), s.default.stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          };
          var p, v = "ontouchstart" in a.default, m = { start: "touchstart", move: "touchmove", end: "touchend" }, g = { start: "mousedown", move: "mousemove", end: "mouseup" };
          t.drag = function(e3) {
            return v ? m[e3] : g[e3];
          }, t.eventClient = function(e3, t2) {
            var n3 = "x" === e3 ? "clientX" : "clientY";
            return t2[n3] ? t2[n3] : t2.changedTouches ? t2.changedTouches[0][n3] : 0;
          }, t.eventPage = function(e3, t2) {
            var n3 = "x" === e3 ? "pageX" : "pageY";
            return t2[n3] ? t2[n3] : t2.changedTouches ? t2.changedTouches[0][n3] : 0;
          }, t.measuredScrollbarWidth = function() {
            if ((0, c.default)(p))
              return p;
            if (!document)
              return 16;
            var e3 = document.createElement("div"), t2 = document.createElement("div");
            return e3.setAttribute("style", "display: block; width: 100px; height: 100px; overflow: scroll;"), t2.setAttribute("style", "height: 200px"), e3.appendChild(t2), document.body.appendChild(e3), p = e3.offsetWidth - e3.clientWidth, document.body.removeChild(e3), p;
          }, t.hasVerticalScrollbar = function(e3) {
            return e3.scrollHeight > e3.offsetHeight;
          }, t.executeAfterTransition = function(e3, t2) {
            if ((0, f2.default)(e3))
              return t2();
            var n3 = function(o2) {
              o2.target === e3 && (e3.removeEventListener("transitionend", n3), t2());
            };
            e3.addEventListener("transitionend", n3);
          }, t.pxToNum = function(e3) {
            return (0, u2.default)(e3.replace("px", ""));
          }, t.getPlatform = function() {
            var e3 = (0, d2.default)();
            return "os x" === e3 ? "mac" : e3;
          }, t.resetCanvasSize = function(e3) {
            e3.width = Math.round(e3.offsetWidth * window.devicePixelRatio), e3.height = Math.round(e3.offsetHeight * window.devicePixelRatio);
          };
        }, 6093: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                Object.prototype.hasOwnProperty.call(t3, n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            if ("function" != typeof t2 && null !== t2)
              throw new TypeError("Class extends value " + String(t2) + " is not a constructor or null");
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true });
          var a = i(n2(1512)), s = i(n2(5229)), c = i(n2(2244)), l = i(n2(8613)), u2 = function(e3) {
            function t2(t3, n3) {
              void 0 === n3 && (n3 = {});
              var o2 = e3.call(this, t3, { compName: "notification" }, n3) || this;
              return o2.notifications = [], o2.initOptions(n3, { position: { x: "right", y: "bottom" }, duration: 2e3 }), o2.initTpl(), o2;
            }
            return r2(t2, e3), t2.prototype.notify = function(e4, t3) {
              var n3 = this;
              void 0 === t3 && (t3 = { duration: this.options.duration });
              var o2 = new d2(this, e4);
              this.notifications.push(o2), this.add(o2), setTimeout(function() {
                return n3.remove(o2.id);
              }, t3.duration);
            }, t2.prototype.dismissAll = function() {
              for (var e4 = this.notifications, t3 = e4[0]; t3; )
                this.remove(t3.id), t3 = e4[0];
            }, t2.prototype.add = function(e4) {
              this.container.appendChild(e4.container);
            }, t2.prototype.remove = function(e4) {
              var t3 = this.notifications, n3 = (0, c.default)(t3, function(t4) {
                return t4.id === e4;
              });
              if (n3) {
                n3.destroy();
                var o2 = t3.indexOf(n3);
                t3.splice(o2, 1);
              }
            }, t2.prototype.initTpl = function() {
              var e4 = this.$container, t3 = this.options.position, n3 = t3.x, o2 = t3.y, r3 = "flex-end", i2 = "flex-end";
              switch (n3) {
                case "center":
                  i2 = "center";
                  break;
                case "left":
                  i2 = "flex-start";
              }
              "top" === o2 && (r3 = "flex-start"), e4.attr("style", "justify-content: ".concat(r3, "; align-items: ").concat(i2));
            }, t2;
          }(i(n2(5404)).default);
          t.default = u2;
          var d2 = function() {
            function e3(e4, t2) {
              this.container = (0, l.default)("div"), this.$container = (0, a.default)(this.container), this.notification = e4, this.content = t2, this.id = (0, s.default)("luna-notification-"), this.$container.attr({ id: this.id, class: e4.c("item ".concat("bottom" === e4.getOption("position").y ? "lower" : "upper")) }), this.initTpl();
            }
            return e3.prototype.destroy = function() {
              this.$container.remove();
            }, e3.prototype.initTpl = function() {
              this.$container.html(this.notification.c('<div class="content">'.concat(this.content, "</div>")));
            }, e3;
          }();
          e2.exports = u2, e2.exports.default = u2;
        }, 5404: function(e2, t, n2) {
          var o, r2 = this && this.__extends || (o = function(e3, t2) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
              e4.__proto__ = t3;
            } || function(e4, t3) {
              for (var n3 in t3)
                Object.prototype.hasOwnProperty.call(t3, n3) && (e4[n3] = t3[n3]);
            }, o(e3, t2);
          }, function(e3, t2) {
            if ("function" != typeof t2 && null !== t2)
              throw new TypeError("Class extends value " + String(t2) + " is not a constructor or null");
            function n3() {
              this.constructor = e3;
            }
            o(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n3.prototype = t2.prototype, new n3());
          }), i = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true });
          var a = i(n2(1443)), s = i(n2(1512)), c = n2(164), l = i(n2(3783)), u2 = i(n2(6329)), d2 = i(n2(4193)), f2 = i(n2(5852)), h = function(e3) {
            function t2(t3, n3, o2) {
              var r3 = n3.compName, i2 = (void 0 === o2 ? {} : o2).theme, a2 = void 0 === i2 ? "light" : i2, u3 = e3.call(this) || this;
              return u3.subComponents = [], u3.compName = r3, u3.c = (0, c.classPrefix)(r3), u3.options = {}, u3.container = t3, u3.$container = (0, s.default)(t3), u3.$container.addClass(["luna-".concat(r3), u3.c("platform-".concat((0, c.getPlatform)()))]), u3.on("optionChange", function(e4, t4, n4) {
                var o3 = u3.c;
                "theme" === e4 && (u3.$container.rmClass(o3("theme-".concat(n4))).addClass(o3("theme-".concat(t4))), (0, l.default)(u3.subComponents, function(e5) {
                  return e5.setOption("theme", t4);
                }));
              }), u3.setOption("theme", a2), u3;
            }
            return r2(t2, e3), t2.prototype.destroy = function() {
              this.destroySubComponents();
              var e4 = this.c;
              this.$container.rmClass("luna-".concat(this.compName)).rmClass(e4("platform-".concat((0, c.getPlatform)()))).rmClass(e4("theme-".concat(this.options.theme))), this.$container.html(""), this.emit("destroy"), this.removeAllListeners();
            }, t2.prototype.setOption = function(e4, t3) {
              var n3 = this, o2 = this.options, r3 = {};
              "string" == typeof e4 ? r3[e4] = t3 : r3 = e4, (0, l.default)(r3, function(e5, t4) {
                var r4 = o2[t4];
                o2[t4] = e5, n3.emit("optionChange", t4, e5, r4);
              });
            }, t2.prototype.getOption = function(e4) {
              return this.options[e4];
            }, t2.prototype.addSubComponent = function(e4) {
              e4.setOption("theme", this.options.theme), this.subComponents.push(e4);
            }, t2.prototype.removeSubComponent = function(e4) {
              (0, f2.default)(this.subComponents, function(t3) {
                return t3 === e4;
              });
            }, t2.prototype.destroySubComponents = function() {
              (0, l.default)(this.subComponents, function(e4) {
                return e4.destroy();
              }), this.subComponents = [];
            }, t2.prototype.initOptions = function(e4, t3) {
              void 0 === t3 && (t3 = {}), (0, d2.default)(e4, t3), (0, u2.default)(this.options, e4);
            }, t2.prototype.find = function(e4) {
              return this.$container.find(this.c(e4));
            }, t2;
          }(a.default);
          t.default = h;
        }, 164: function(e2, t, n2) {
          var o = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t, "__esModule", { value: true }), t.resetCanvasSize = t.getPlatform = t.pxToNum = t.executeAfterTransition = t.hasVerticalScrollbar = t.measuredScrollbarWidth = t.eventClient = t.drag = t.classPrefix = void 0;
          var r2 = o(n2(2461)), i = o(n2(4331)), a = o(n2(5610)), s = o(n2(7483)), c = o(n2(3990)), l = o(n2(6341)), u2 = o(n2(3875)), d2 = o(n2(6954)), f2 = o(n2(9585));
          function h(e3, t2) {
            for (var n3 = 0, o2 = e3.length; n3 < o2; n3++) {
              var r3 = e3[n3];
              t2(r3), r3.content && h(r3.content, t2);
            }
          }
          t.classPrefix = function(e3) {
            var t2 = "luna-".concat(e3, "-");
            function n3(e4) {
              return (0, r2.default)((0, i.default)(e4).split(/\s+/), function(e5) {
                return (0, l.default)(e5, t2) ? e5 : e5.replace(/[\w-]+/, function(e6) {
                  return "".concat(t2).concat(e6);
                });
              }).join(" ");
            }
            return function(e4) {
              if (/<[^>]*>/g.test(e4))
                try {
                  var t3 = s.default.parse(e4);
                  return h(t3, function(e5) {
                    e5.attrs && e5.attrs.class && (e5.attrs.class = n3(e5.attrs.class));
                  }), s.default.stringify(t3);
                } catch (t4) {
                  return n3(e4);
                }
              return n3(e4);
            };
          };
          var p, v = "ontouchstart" in a.default, m = { start: "touchstart", move: "touchmove", end: "touchend" }, g = { start: "mousedown", move: "mousemove", end: "mouseup" };
          t.drag = function(e3) {
            return v ? m[e3] : g[e3];
          }, t.eventClient = function(e3, t2) {
            var n3 = "x" === e3 ? "clientX" : "clientY";
            return t2[n3] ? t2[n3] : t2.changedTouches ? t2.changedTouches[0][n3] : 0;
          }, t.measuredScrollbarWidth = function() {
            if ((0, c.default)(p))
              return p;
            if (!document)
              return 16;
            var e3 = document.createElement("div"), t2 = document.createElement("div");
            return e3.setAttribute("style", "display: block; width: 100px; height: 100px; overflow: scroll;"), t2.setAttribute("style", "height: 200px"), e3.appendChild(t2), document.body.appendChild(e3), p = e3.offsetWidth - e3.clientWidth, document.body.removeChild(e3), p;
          }, t.hasVerticalScrollbar = function(e3) {
            return e3.scrollHeight > e3.offsetHeight;
          }, t.executeAfterTransition = function(e3, t2) {
            if ((0, f2.default)(e3))
              return t2();
            var n3 = function(o2) {
              o2.target === e3 && (e3.removeEventListener("transitionend", n3), t2());
            };
            e3.addEventListener("transitionend", n3);
          }, t.pxToNum = function(e3) {
            return (0, u2.default)(e3.replace("px", ""));
          }, t.getPlatform = function() {
            var e3 = (0, d2.default)();
            return "os x" === e3 ? "mac" : e3;
          }, t.resetCanvasSize = function(e3) {
            e3.width = Math.round(e3.offsetWidth * window.devicePixelRatio), e3.height = Math.round(e3.offsetHeight * window.devicePixelRatio);
          };
        }, 8169: function(e2, t, n2) {
          n2.r(t), n2.d(t, { default: function() {
            return m;
          } });
          var o = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 }, r2 = /([astvzqmhlc])([^astvzqmhlc]*)/gi, i = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
          var a = function(e3) {
            var t2 = [], n3 = String(e3).trim();
            return "M" !== n3[0] && "m" !== n3[0] || n3.replace(r2, function(e4, n4, r3) {
              var a2 = n4.toLowerCase(), s2 = function(e5) {
                var t3 = e5.match(i);
                return t3 ? t3.map(Number) : [];
              }(r3), c2 = n4;
              if ("m" === a2 && s2.length > 2 && (t2.push([c2].concat(s2.splice(0, 2))), a2 = "l", c2 = "m" === c2 ? "l" : "L"), s2.length < o[a2])
                return "";
              for (t2.push([c2].concat(s2.splice(0, o[a2]))); s2.length >= o[a2] && s2.length && o[a2]; )
                t2.push([c2].concat(s2.splice(0, o[a2])));
              return "";
            }), t2;
          };
          function s(e3, t2) {
            for (var n3 = 0; n3 < t2.length; n3++) {
              var o2 = t2[n3];
              o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(e3, o2.key, o2);
            }
          }
          function c(e3) {
            return function(e4) {
              if (Array.isArray(e4))
                return l(e4);
            }(e3) || function(e4) {
              if ("undefined" != typeof Symbol && null != e4[Symbol.iterator] || null != e4["@@iterator"])
                return Array.from(e4);
            }(e3) || function(e4, t2) {
              if (!e4)
                return;
              if ("string" == typeof e4)
                return l(e4, t2);
              var n3 = Object.prototype.toString.call(e4).slice(8, -1);
              "Object" === n3 && e4.constructor && (n3 = e4.constructor.name);
              if ("Map" === n3 || "Set" === n3)
                return Array.from(e4);
              if ("Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
                return l(e4, t2);
            }(e3) || function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }();
          }
          function l(e3, t2) {
            (null == t2 || t2 > e3.length) && (t2 = e3.length);
            for (var n3 = 0, o2 = new Array(t2); n3 < t2; n3++)
              o2[n3] = e3[n3];
            return o2;
          }
          var u2 = a;
          function d2(e3, t2) {
            var n3 = e3.x * Math.cos(t2) - e3.y * Math.sin(t2), o2 = e3.y * Math.cos(t2) + e3.x * Math.sin(t2);
            e3.x = n3, e3.y = o2;
          }
          function f2(e3, t2) {
            e3.x *= t2, e3.y *= t2;
          }
          var h = function(e3) {
            if (void 0 !== e3 && e3.CanvasRenderingContext2D && (!e3.Path2D || !function(e4) {
              var t3 = e4.document.createElement("canvas").getContext("2d"), n4 = new e4.Path2D("M0 0 L1 1");
              return t3.strokeStyle = "red", t3.lineWidth = 1, t3.stroke(n4), 255 === t3.getImageData(0, 0, 1, 1).data[0];
            }(e3))) {
              var t2 = function() {
                function e4(t4) {
                  var n5;
                  (function(e5, t5) {
                    if (!(e5 instanceof t5))
                      throw new TypeError("Cannot call a class as a function");
                  }(this, e4), this.segments = [], t4 && t4 instanceof e4) ? (n5 = this.segments).push.apply(n5, c(t4.segments)) : t4 && (this.segments = u2(t4));
                }
                var t3, n4;
                return t3 = e4, (n4 = [{ key: "addPath", value: function(t4) {
                  var n5;
                  t4 && t4 instanceof e4 && (n5 = this.segments).push.apply(n5, c(t4.segments));
                } }, { key: "moveTo", value: function(e5, t4) {
                  this.segments.push(["M", e5, t4]);
                } }, { key: "lineTo", value: function(e5, t4) {
                  this.segments.push(["L", e5, t4]);
                } }, { key: "arc", value: function(e5, t4, n5, o3, r4, i3) {
                  this.segments.push(["AC", e5, t4, n5, o3, r4, !!i3]);
                } }, { key: "arcTo", value: function(e5, t4, n5, o3, r4) {
                  this.segments.push(["AT", e5, t4, n5, o3, r4]);
                } }, { key: "ellipse", value: function(e5, t4, n5, o3, r4, i3, a2, s2) {
                  this.segments.push(["E", e5, t4, n5, o3, r4, i3, a2, !!s2]);
                } }, { key: "closePath", value: function() {
                  this.segments.push(["Z"]);
                } }, { key: "bezierCurveTo", value: function(e5, t4, n5, o3, r4, i3) {
                  this.segments.push(["C", e5, t4, n5, o3, r4, i3]);
                } }, { key: "quadraticCurveTo", value: function(e5, t4, n5, o3) {
                  this.segments.push(["Q", e5, t4, n5, o3]);
                } }, { key: "rect", value: function(e5, t4, n5, o3) {
                  this.segments.push(["R", e5, t4, n5, o3]);
                } }]) && s(t3.prototype, n4), Object.defineProperty(t3, "prototype", { writable: false }), e4;
              }(), n3 = e3.CanvasRenderingContext2D.prototype.fill, o2 = e3.CanvasRenderingContext2D.prototype.stroke;
              e3.CanvasRenderingContext2D.prototype.fill = function() {
                for (var e4 = arguments.length, t3 = new Array(e4), o3 = 0; o3 < e4; o3++)
                  t3[o3] = arguments[o3];
                var r4 = "nonzero";
                0 === t3.length || 1 === t3.length && "string" == typeof t3[0] ? n3.apply(this, t3) : (2 === arguments.length && (r4 = t3[1]), i2(this, t3[0].segments), n3.call(this, r4));
              }, e3.CanvasRenderingContext2D.prototype.stroke = function(e4) {
                e4 ? (i2(this, e4.segments), o2.call(this)) : o2.call(this);
              };
              var r3 = e3.CanvasRenderingContext2D.prototype.isPointInPath;
              e3.CanvasRenderingContext2D.prototype.isPointInPath = function() {
                for (var e4 = arguments.length, t3 = new Array(e4), n4 = 0; n4 < e4; n4++)
                  t3[n4] = arguments[n4];
                if ("Path2D" === t3[0].constructor.name) {
                  var o3 = t3[1], a2 = t3[2], s2 = t3[3] || "nonzero";
                  return i2(this, t3[0].segments), r3.apply(this, [o3, a2, s2]);
                }
                return r3.apply(this, t3);
              }, e3.Path2D = t2;
            }
            function i2(e4, t3) {
              var n4, o3, r4, i3, a2, s2, c2, l2, u3, h2, p2, v2, m2, g, b, y, w, _, x, A, k, C, S, E, O, T, N, M, j, z = { x: 0, y: 0 }, R = { x: 0, y: 0 };
              e4.beginPath();
              for (var Z = 0; Z < t3.length; ++Z) {
                var I = t3[Z];
                switch ("S" !== (A = I[0]) && "s" !== A && "C" !== A && "c" !== A && (C = null, S = null), "T" !== A && "t" !== A && "Q" !== A && "q" !== A && (E = null, O = null), A) {
                  case "m":
                  case "M":
                    "m" === A ? (p2 += I[1], m2 += I[2]) : (p2 = I[1], m2 = I[2]), "M" !== A && z || (z = { x: p2, y: m2 }), e4.moveTo(p2, m2);
                    break;
                  case "l":
                    p2 += I[1], m2 += I[2], e4.lineTo(p2, m2);
                    break;
                  case "L":
                    p2 = I[1], m2 = I[2], e4.lineTo(p2, m2);
                    break;
                  case "H":
                    p2 = I[1], e4.lineTo(p2, m2);
                    break;
                  case "h":
                    p2 += I[1], e4.lineTo(p2, m2);
                    break;
                  case "V":
                    m2 = I[1], e4.lineTo(p2, m2);
                    break;
                  case "v":
                    m2 += I[1], e4.lineTo(p2, m2);
                    break;
                  case "a":
                  case "A":
                    "a" === A ? (p2 += I[6], m2 += I[7]) : (p2 = I[6], m2 = I[7]), y = I[1], w = I[2], c2 = I[3] * Math.PI / 180, r4 = !!I[4], i3 = !!I[5], a2 = { x: p2, y: m2 }, d2(s2 = { x: (R.x - a2.x) / 2, y: (R.y - a2.y) / 2 }, -c2), (l2 = s2.x * s2.x / (y * y) + s2.y * s2.y / (w * w)) > 1 && (y *= l2 = Math.sqrt(l2), w *= l2), u3 = y * y * w * w, h2 = y * y * s2.y * s2.y + w * w * s2.x * s2.x, f2(k = { x: y * s2.y / w, y: -w * s2.x / y }, i3 !== r4 ? Math.sqrt((u3 - h2) / h2) || 0 : -Math.sqrt((u3 - h2) / h2) || 0), o3 = Math.atan2((s2.y - k.y) / w, (s2.x - k.x) / y), n4 = Math.atan2(-(s2.y + k.y) / w, -(s2.x + k.x) / y), d2(k, c2), N = k, M = (a2.x + R.x) / 2, j = (a2.y + R.y) / 2, N.x += M, N.y += j, e4.save(), e4.translate(k.x, k.y), e4.rotate(c2), e4.scale(y, w), e4.arc(0, 0, 1, o3, n4, !i3), e4.restore();
                    break;
                  case "C":
                    C = I[3], S = I[4], p2 = I[5], m2 = I[6], e4.bezierCurveTo(I[1], I[2], C, S, p2, m2);
                    break;
                  case "c":
                    e4.bezierCurveTo(I[1] + p2, I[2] + m2, I[3] + p2, I[4] + m2, I[5] + p2, I[6] + m2), C = I[3] + p2, S = I[4] + m2, p2 += I[5], m2 += I[6];
                    break;
                  case "S":
                    null !== C && null !== S || (C = p2, S = m2), e4.bezierCurveTo(2 * p2 - C, 2 * m2 - S, I[1], I[2], I[3], I[4]), C = I[1], S = I[2], p2 = I[3], m2 = I[4];
                    break;
                  case "s":
                    null !== C && null !== S || (C = p2, S = m2), e4.bezierCurveTo(2 * p2 - C, 2 * m2 - S, I[1] + p2, I[2] + m2, I[3] + p2, I[4] + m2), C = I[1] + p2, S = I[2] + m2, p2 += I[3], m2 += I[4];
                    break;
                  case "Q":
                    E = I[1], O = I[2], p2 = I[3], m2 = I[4], e4.quadraticCurveTo(E, O, p2, m2);
                    break;
                  case "q":
                    E = I[1] + p2, O = I[2] + m2, p2 += I[3], m2 += I[4], e4.quadraticCurveTo(E, O, p2, m2);
                    break;
                  case "T":
                    null !== E && null !== O || (E = p2, O = m2), E = 2 * p2 - E, O = 2 * m2 - O, p2 = I[1], m2 = I[2], e4.quadraticCurveTo(E, O, p2, m2);
                    break;
                  case "t":
                    null !== E && null !== O || (E = p2, O = m2), E = 2 * p2 - E, O = 2 * m2 - O, p2 += I[1], m2 += I[2], e4.quadraticCurveTo(E, O, p2, m2);
                    break;
                  case "z":
                  case "Z":
                    p2 = z.x, m2 = z.y, z = void 0, e4.closePath();
                    break;
                  case "AC":
                    p2 = I[1], m2 = I[2], b = I[3], o3 = I[4], n4 = I[5], T = I[6], e4.arc(p2, m2, b, o3, n4, T);
                    break;
                  case "AT":
                    v2 = I[1], g = I[2], p2 = I[3], m2 = I[4], b = I[5], e4.arcTo(v2, g, p2, m2, b);
                    break;
                  case "E":
                    p2 = I[1], m2 = I[2], y = I[3], w = I[4], c2 = I[5], o3 = I[6], n4 = I[7], T = I[8], e4.save(), e4.translate(p2, m2), e4.rotate(c2), e4.scale(y, w), e4.arc(0, 0, 1, o3, n4, T), e4.restore();
                    break;
                  case "R":
                    p2 = I[1], m2 = I[2], _ = I[3], x = I[4], z = { x: p2, y: m2 }, e4.rect(p2, m2, _, x);
                }
                R.x = p2, R.y = m2;
              }
            }
          }, p = a, v = h;
          "undefined" != typeof window && v(window);
          var m = { path2dPolyfill: v, parsePath: p };
        }, 2777: function(e2) {
          e2.exports = `.luna-dom-highlighter{position:fixed;left:0;top:0;width:100%;height:100%;z-index:100000;pointer-events:none;font-size:13px}.luna-dom-highlighter-fill{position:absolute;top:0;right:0;bottom:0;left:0}.luna-dom-highlighter-platform-linux{font-family:Roboto,Ubuntu,Arial,sans-serif}.luna-dom-highlighter-platform-mac{color:#303942;font-family:'.SFNSDisplay-Regular','Helvetica Neue','Lucida Grande',sans-serif}.luna-dom-highlighter-platform-windows{font-family:'Segoe UI',Tahoma,sans-serif}.luna-dom-highlighter-px{color:gray}#luna-dom-highlighter-element-title{position:absolute;z-index:10}.luna-dom-highlighter-tooltip-content{position:absolute;-webkit-user-select:none;-moz-user-select:none;user-select:none;background-color:#fff;padding:5px 8px;border:1px solid #fff;border-radius:3px;box-sizing:border-box;min-width:100px;max-width:min(300px,100% - 4px);z-index:2;background-clip:padding-box;will-change:transform;text-rendering:optimizeLegibility;pointer-events:none;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))}.luna-dom-highlighter-tooltip-content .luna-dom-highlighter-tooltip-arrow{background:#fff;width:15px;height:8px;position:absolute}.luna-dom-highlighter-element-info-section{margin-top:12px;margin-bottom:6px}.luna-dom-highlighter-section-name{color:#333;font-weight:500;font-size:10px;text-transform:uppercase;letter-spacing:.05em;line-height:12px}.luna-dom-highlighter-element-info{display:flex;flex-direction:column}.luna-dom-highlighter-element-info-header{display:flex;align-items:center}.luna-dom-highlighter-element-info-body{display:flex;flex-direction:column;padding-top:2px;margin-top:2px}.luna-dom-highlighter-element-info-row{display:flex;line-height:19px}.luna-dom-highlighter-separator-container{display:flex;align-items:center;flex:auto;margin-left:7px}.luna-dom-highlighter-separator{border-top:1px solid #ddd;width:100%}.luna-dom-highlighter-element-info-name{flex-shrink:0;color:#666}.luna-dom-highlighter-element-info-gap{flex:auto}.luna-dom-highlighter-element-info-value-color{display:flex;color:#303942;margin-left:10px;align-items:baseline}.luna-dom-highlighter-a11y-icon{width:16px;height:16px;background-repeat:no-repeat;display:inline-block}.luna-dom-highlighter-element-info-value-contrast{display:flex;align-items:center;text-align:right;color:#303942;margin-left:10px}.luna-dom-highlighter-element-info-value-contrast .luna-dom-highlighter-a11y-icon{margin-left:8px}.luna-dom-highlighter-element-info-value-icon{display:flex;align-items:center}.luna-dom-highlighter-element-info-value-text{text-align:right;color:#303942;margin-left:10px;align-items:baseline;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.luna-dom-highlighter-color-swatch{display:flex;margin-right:2px;width:10px;height:10px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);line-height:10px}.luna-dom-highlighter-color-swatch-inner{flex:auto;border:1px solid #808002}.luna-dom-highlighter-element-layout-type{margin-right:10px;width:16px;height:16px}.luna-dom-highlighter-element-layout-type.luna-dom-highlighter-grid{background-image:url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="4" height="4" stroke="%231A73E8"/><rect x="9.5" y="2.5" width="4" height="4" stroke="%231A73E8"/><rect x="9.5" y="9.5" width="4" height="4" stroke="%231A73E8"/><rect x="2.5" y="9.5" width="4" height="4" stroke="%231A73E8"/></svg>')}.luna-dom-highlighter-element-layout-type.luna-dom-highlighter-flex{background-image:url('data:image/svg+xml,<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 3.5h8v3H1v-3zm-1 0a1 1 0 011-1h8a1 1 0 011 1v3a1 1 0 01-1 1H1a1 1 0 01-1-1v-3zm12 0h3v3h-3v-3zm-1 0a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3zm-7 6H1v3h3v-3zm-3-1a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1H1zm6 4v-3h8v3H7zm-1-3a1 1 0 011-1h8a1 1 0 011 1v3a1 1 0 01-1 1H7a1 1 0 01-1-1v-3z" fill="%231A73E8"/></svg>')}.luna-dom-highlighter-element-description{flex:1 1;font-weight:700;word-wrap:break-word;word-break:break-all}.luna-dom-highlighter-dimensions{color:#737373;text-align:right;margin-left:10px}.luna-dom-highlighter-material-node-width{margin-right:2px}.luna-dom-highlighter-material-node-height{margin-left:2px}.luna-dom-highlighter-material-tag-name{color:#881280}.luna-dom-highlighter-material-class-name,.luna-dom-highlighter-material-node-id{color:#1a1aa6}.luna-dom-highlighter-contrast-text{width:16px;height:16px;text-align:center;line-height:16px;margin-right:8px;border:1px solid #000;padding:0 1px}.luna-dom-highlighter-a11y-icon-not-ok{background-image:url('data:image/svg+xml,<svg fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="m9 1.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13.5c-3.315 0-6-2.685-6-6 0-1.3875.4725-2.6625 1.2675-3.675l8.4075 8.4075c-1.0125.795-2.2875 1.2675-3.675 1.2675zm4.7325-2.325-8.4075-8.4075c1.0125-.795 2.2875-1.2675 3.675-1.2675 3.315 0 6 2.685 6 6 0 1.3875-.4725 2.6625-1.2675 3.675z" fill="%239e9e9e"/></svg>')}.luna-dom-highlighter-a11y-icon-warning{background-image:url('data:image/svg+xml,<svg fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="m8.25 11.25h1.5v1.5h-1.5zm0-6h1.5v4.5h-1.5zm.7425-3.75c-4.14 0-7.4925 3.36-7.4925 7.5s3.3525 7.5 7.4925 7.5c4.1475 0 7.5075-3.36 7.5075-7.5s-3.36-7.5-7.5075-7.5zm.0075 13.5c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" fill="%23e37400"/></svg>')}.luna-dom-highlighter-a11y-icon-ok{background-image:url('data:image/svg+xml,<svg fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="m9 1.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13.5c-3.3075 0-6-2.6925-6-6s2.6925-6 6-6 6 2.6925 6 6-2.6925 6-6 6zm-1.5-4.35-1.95-1.95-1.05 1.05 3 3 6-6-1.05-1.05z" fill="%230ca40c"/></svg>')}@media (forced-colors:active){:root,body{background-color:transparent;forced-color-adjust:none}.luna-dom-highlighter-tooltip-content{border-color:Highlight;background-color:canvas;color:text;forced-color-adjust:none}.luna-dom-highlighter-tooltip-content::after{background-color:Highlight}.luna-dom-highlighter-color-swatch-inner,.luna-dom-highlighter-contrast-text,.luna-dom-highlighter-separator{border-color:Highlight}.luna-dom-highlighter-section-name{color:Highlight}.luna-dom-highlighter-dimensions,.luna-dom-highlighter-element-info-name,.luna-dom-highlighter-element-info-value-color,.luna-dom-highlighter-element-info-value-contrast,.luna-dom-highlighter-element-info-value-icon,.luna-dom-highlighter-element-info-value-text,.luna-dom-highlighter-material-class-name,.luna-dom-highlighter-material-node-id,.luna-dom-highlighter-material-tag-name{color:canvastext}}

/*# sourceMappingURL=luna-dom-highlighter.css.map*/`;
        }, 907: function(e2, t, n2) {
          function o(e3, t2) {
            (null == t2 || t2 > e3.length) && (t2 = e3.length);
            for (var n3 = 0, o2 = new Array(t2); n3 < t2; n3++)
              o2[n3] = e3[n3];
            return o2;
          }
          n2.d(t, { Z: function() {
            return o;
          } });
        }, 7326: function(e2, t, n2) {
          function o(e3) {
            if (void 0 === e3)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e3;
          }
          n2.d(t, { Z: function() {
            return o;
          } });
        }, 5671: function(e2, t, n2) {
          function o(e3, t2) {
            if (!(e3 instanceof t2))
              throw new TypeError("Cannot call a class as a function");
          }
          n2.d(t, { Z: function() {
            return o;
          } });
        }, 3144: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return i;
          } });
          var o = n2(9142);
          function r2(e3, t2) {
            for (var n3 = 0; n3 < t2.length; n3++) {
              var r3 = t2[n3];
              r3.enumerable = r3.enumerable || false, r3.configurable = true, "value" in r3 && (r3.writable = true), Object.defineProperty(e3, (0, o.Z)(r3.key), r3);
            }
          }
          function i(e3, t2, n3) {
            return t2 && r2(e3.prototype, t2), n3 && r2(e3, n3), Object.defineProperty(e3, "prototype", { writable: false }), e3;
          }
        }, 4942: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return r2;
          } });
          var o = n2(9142);
          function r2(e3, t2, n3) {
            return (t2 = (0, o.Z)(t2)) in e3 ? Object.defineProperty(e3, t2, { value: n3, enumerable: true, configurable: true, writable: true }) : e3[t2] = n3, e3;
          }
        }, 1752: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return r2;
          } });
          var o = n2(1120);
          function r2() {
            return r2 = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e3, t2, n3) {
              var r3 = function(e4, t3) {
                for (; !Object.prototype.hasOwnProperty.call(e4, t3) && null !== (e4 = (0, o.Z)(e4)); )
                  ;
                return e4;
              }(e3, t2);
              if (r3) {
                var i = Object.getOwnPropertyDescriptor(r3, t2);
                return i.get ? i.get.call(arguments.length < 3 ? e3 : n3) : i.value;
              }
            }, r2.apply(this, arguments);
          }
        }, 1120: function(e2, t, n2) {
          function o(e3) {
            return o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e4) {
              return e4.__proto__ || Object.getPrototypeOf(e4);
            }, o(e3);
          }
          n2.d(t, { Z: function() {
            return o;
          } });
        }, 9340: function(e2, t, n2) {
          function o(e3, t2) {
            return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e4, t3) {
              return e4.__proto__ = t3, e4;
            }, o(e3, t2);
          }
          function r2(e3, t2) {
            if ("function" != typeof t2 && null !== t2)
              throw new TypeError("Super expression must either be null or a function");
            e3.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e3, writable: true, configurable: true } }), Object.defineProperty(e3, "prototype", { writable: false }), t2 && o(e3, t2);
          }
          n2.d(t, { Z: function() {
            return r2;
          } });
        }, 2963: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return i;
          } });
          var o = n2(1002), r2 = n2(7326);
          function i(e3, t2) {
            if (t2 && ("object" === (0, o.Z)(t2) || "function" == typeof t2))
              return t2;
            if (void 0 !== t2)
              throw new TypeError("Derived constructors may only return object or undefined");
            return (0, r2.Z)(e3);
          }
        }, 168: function(e2, t, n2) {
          function o(e3, t2) {
            return t2 || (t2 = e3.slice(0)), Object.freeze(Object.defineProperties(e3, { raw: { value: Object.freeze(t2) } }));
          }
          n2.d(t, { Z: function() {
            return o;
          } });
        }, 9142: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return r2;
          } });
          var o = n2(1002);
          function r2(e3) {
            var t2 = function(e4, t3) {
              if ("object" !== (0, o.Z)(e4) || null === e4)
                return e4;
              var n3 = e4[Symbol.toPrimitive];
              if (void 0 !== n3) {
                var r3 = n3.call(e4, t3 || "default");
                if ("object" !== (0, o.Z)(r3))
                  return r3;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === t3 ? String : Number)(e4);
            }(e3, "string");
            return "symbol" === (0, o.Z)(t2) ? t2 : String(t2);
          }
        }, 1002: function(e2, t, n2) {
          function o(e3) {
            return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
              return typeof e4;
            } : function(e4) {
              return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
            }, o(e3);
          }
          n2.d(t, { Z: function() {
            return o;
          } });
        }, 181: function(e2, t, n2) {
          n2.d(t, { Z: function() {
            return r2;
          } });
          var o = n2(907);
          function r2(e3, t2) {
            if (e3) {
              if ("string" == typeof e3)
                return (0, o.Z)(e3, t2);
              var n3 = Object.prototype.toString.call(e3).slice(8, -1);
              return "Object" === n3 && e3.constructor && (n3 = e3.constructor.name), "Map" === n3 || "Set" === n3 ? Array.from(e3) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? (0, o.Z)(e3, t2) : void 0;
            }
          }
        } }, __webpack_module_cache__ = {};
        function __webpack_require__(e2) {
          var t = __webpack_module_cache__[e2];
          if (void 0 !== t)
            return t.exports;
          var n2 = __webpack_module_cache__[e2] = { id: e2, loaded: false, exports: {} };
          return __webpack_modules__[e2].call(n2.exports, n2, n2.exports, __webpack_require__), n2.loaded = true, n2.exports;
        }
        __webpack_require__.n = function(e2) {
          var t = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return __webpack_require__.d(t, { a: t }), t;
        }, __webpack_require__.d = function(e2, t) {
          for (var n2 in t)
            __webpack_require__.o(t, n2) && !__webpack_require__.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t[n2] });
        }, __webpack_require__.g = function() {
          if ("object" == typeof globalThis)
            return globalThis;
          try {
            return this || new Function("return this")();
          } catch (e2) {
            if ("object" == typeof window)
              return window;
          }
        }(), __webpack_require__.hmd = function(e2) {
          return (e2 = Object.create(e2)).children || (e2.children = []), Object.defineProperty(e2, "exports", { enumerable: true, set: function() {
            throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + e2.id);
          } }), e2;
        }, __webpack_require__.o = function(e2, t) {
          return Object.prototype.hasOwnProperty.call(e2, t);
        }, __webpack_require__.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        };
        var __webpack_exports__ = __webpack_require__(2027);
        return __webpack_exports__;
      }();
    });
  })(eruda);
  var erudaExports = eruda.exports;
  erudaExports.init();
  let $section = document.createElement("section");
  $section.id = "app";
  function run() {
    window.baseUrl = location.origin;
    window.initPost = DefaultPost;
    window.win = function() {
      return window;
    };
    window.win().doc = window.win().document;
    window.win().query = (v) => window.win().document.querySelector(v);
    window.query = (v) => window.win().document.querySelector(v);
    window.clone = (val) => JSON.parse(JSON.stringify(val));
    window.user = DefaultUser;
    window.targetUserName = "";
    window.pageType = void 0;
    window.pageData = { pageNo: 1 };
    window.config = DefaultConfig;
    window.const = {
      git: "https://github.com/zyronon/v2ex-script",
      issue: "https://github.com/zyronon/v2ex-script/issues"
    };
    window.currentVersion = 1;
    window.isNight = $(".Night").length === 1;
    window.cb = null;
    window.stopMe = false;
    window.postList = [];
    window.parse = {
      //解析帖子内容
      async parsePostContent(post, body, htmlText) {
        var _a, _b;
        let once = htmlText.match(/var once = "([\d]+)";/);
        if (once && once[1]) {
          post.once = once[1];
        }
        post.isReport = htmlText.includes("你已对本主题进行了报告");
        let wrapperClass = "Wrapper";
        let wrapper;
        let boxs;
        if (body.length > 1) {
          body.each(function() {
            if (this.id === wrapperClass) {
              wrapper = $(this);
              boxs = this.querySelectorAll(".box");
            }
          });
        } else {
          wrapper = body;
          boxs = body.find(`#${wrapperClass} .box`);
        }
        let box1 = $(boxs[0]);
        let header1 = wrapper.find(".header");
        if (!post.title || !post.content_rendered) {
          let h1 = wrapper.find("h1");
          if (h1) {
            post.title = h1[0].innerText;
          }
        }
        let as = wrapper.find(".header > a");
        if (as.length) {
          post.node.title = as[1].innerText;
          post.node.url = as[1].href;
        }
        let aName = header1.find("small.gray a:nth-child(1)");
        if (aName) {
          post.member.username = aName[0].innerText;
        }
        let small = header1.find("small.gray");
        if (small[0]) {
          let spanEl = (_b = (_a = small[0]) == null ? void 0 : _a.lastChild) == null ? void 0 : _b.nodeValue;
          if (spanEl) {
            let dianIndex = spanEl.indexOf("·");
            post.createDateAgo = spanEl.substring(4, dianIndex - 1);
            let text = spanEl.substring(dianIndex + 1).trim();
            let reg3 = text.matchAll(/([\d]+)[\s]*次点击/g);
            let clickCountReg = [...reg3];
            if (clickCountReg.length) {
              post.clickCount = Number(clickCountReg[0][1]);
            }
            reg3 = text.matchAll(/([\d]+)[\s]*views/g);
            clickCountReg = [...reg3];
            if (clickCountReg.length) {
              post.clickCount = Number(clickCountReg[0][1]);
            }
          }
        }
        let avatarEl = header1.find(".avatar");
        if (avatarEl) {
          post.member.avatar_large = avatarEl[0].src;
        }
        let topic_buttons = box1.find(".inner .fr");
        if (topic_buttons.length) {
          let favoriteNode = topic_buttons.find(".op:first");
          if (favoriteNode.length) {
            post.isFavorite = favoriteNode[0].innerText === "取消收藏";
          }
          let ignoreNode = topic_buttons.find(".tb");
          if (ignoreNode.length) {
            post.isIgnore = ignoreNode[0].innerText === "取消忽略";
          }
          let thankNode = topic_buttons.find(".topic_thanked");
          if (!thankNode.length) {
            post.isThanked = true;
          }
          let span = topic_buttons.find("span");
          if (span.length) {
            let text = span[0].innerText;
            let reg1 = text.matchAll(/([\d]+)[\s]*人收藏/g);
            let collectCountReg = [...reg1];
            if (collectCountReg.length) {
              post.collectCount = Number(collectCountReg[0][1]);
            }
            reg1 = text.matchAll(/([\d]+)[\s]*likes/g);
            collectCountReg = [...reg1];
            if (collectCountReg.length) {
              post.collectCount = Number(collectCountReg[0][1]);
            }
          }
        }
        let header = $(boxs[0]);
        let temp = header.clone();
        console.log("temp", temp);
        temp.find(".topic_buttons").remove();
        temp.find(".inner").remove();
        temp.find(".header").remove();
        let html = temp.html();
        html = functions.checkPhotoLink2Img(html);
        post.headerTemplate = html;
        return post;
      },
      //解析OP信息
      async parseOp(post) {
        if (!post.member.id) {
          let userRes = await fetch(window.baseUrl + "/api/members/show.json?username=" + post.member.username);
          if (userRes.status === 200) {
            post.member = await userRes.json();
          }
        }
        if (post.member.id) {
          let date = new Date(post.member.created * 1e3);
          let createStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          let now = /* @__PURE__ */ new Date();
          now.setHours(0);
          now.setMinutes(0);
          now.setSeconds(0);
          now.setMilliseconds(0);
          let d2 = now.getTime() - date.getTime();
          let isNew = d2 <= 1e3 * 60 * 60 * 24 * 7;
          post.member.createDate = createStr + " 注册";
          post.member.isNew = isNew;
        } else {
          post.member.createDate = "用户已被注销/封禁";
          post.member.isNew = true;
        }
        return post;
      },
      //获取帖子所有回复
      async getPostAllReplies(post, body, htmlText, pageNo = 1) {
        var _a, _b;
        if (body.find("#no-comments-yet").length) {
          return post;
        }
        let wrapperClass = window.vals.isMobile ? "Wrapper" : "Main";
        let boxs;
        let box;
        if (window.vals.isMobile) {
          if (body.length > 1) {
            body.each(function() {
              if (this.id === wrapperClass) {
                boxs = this.querySelectorAll(".box");
                box = boxs[2];
              }
            });
          } else {
            boxs = body.find(`#${wrapperClass} .box`);
            box = boxs[2];
          }
        } else {
          boxs = body.find(`#${wrapperClass} .box`);
          box = boxs[1];
        }
        let cells = box.querySelectorAll(".cell");
        if (cells && cells.length) {
          if (window.vals.isMobile) {
            post.fr = boxs[1].querySelector(".inner").innerHTML;
          } else {
            post.fr = cells[0].querySelector(".cell .fr").innerHTML;
          }
          cells = Array.from(cells);
          let snow = cells[0].querySelector(".snow");
          post.createDate = ((_b = (_a = snow == null ? void 0 : snow.nextSibling) == null ? void 0 : _a.nodeValue) == null ? void 0 : _b.trim()) || "";
          let repliesMap = [];
          if (cells[1].id) {
            repliesMap.push({ i: pageNo, replyList: this.parsePageReplies(cells.slice(1)) });
            let replyList = functions.getAllReply(repliesMap);
            post.replyList = replyList;
            post.replyCount = replyList.length;
            post.allReplyUsers = Array.from(new Set(replyList.map((v) => v.username)));
            let nestedList = functions.createNestedList(replyList);
            let nestedRedundantList = functions.createNestedRedundantList(replyList);
            if (nestedList)
              post.nestedReplies = nestedList;
            if (nestedRedundantList)
              post.nestedRedundReplies = nestedRedundantList;
            return post;
          } else {
            let promiseList = [];
            return new Promise((resolve, reject) => {
              repliesMap.push({ i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1)) });
              let pages = cells[1].querySelectorAll("a.page_normal");
              pages = Array.from(pages);
              let url = window.baseUrl + "/t/" + post.id;
              for (let i = 0; i < pages.length; i++) {
                let currentPageNo = Number(pages[i].innerText);
                promiseList.push(this.fetchPostOtherPageReplies(url + "?p=" + currentPageNo, currentPageNo));
              }
              Promise.allSettled(promiseList).then(
                (results) => {
                  results.filter((result) => result.status === "fulfilled").map((v) => repliesMap.push(v.value));
                  let replyList = functions.getAllReply(repliesMap);
                  post.replyList = replyList;
                  post.replyCount = replyList.length;
                  post.allReplyUsers = Array.from(new Set(replyList.map((v) => v.username)));
                  let nestedList = functions.createNestedList(replyList);
                  let nestedRedundantList = functions.createNestedRedundantList(replyList);
                  if (nestedList)
                    post.nestedReplies = nestedList;
                  if (nestedRedundantList)
                    post.nestedRedundReplies = nestedRedundantList;
                  resolve(post);
                }
              );
            });
          }
        }
      },
      //请求帖子其他页的回复
      fetchPostOtherPageReplies(href, pageNo) {
        return new Promise((resolve) => {
          $.get(href).then((res) => {
            let s = res.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
            let wrapperClass = window.vals.isMobile ? "Wrapper" : "Main";
            let box;
            if (window.vals.isMobile) {
              $(s[0]).each(function() {
                if (this.id === wrapperClass) {
                  box = this.querySelectorAll(".box")[2];
                }
              });
            } else {
              box = $(s[0]).find("#Main .box")[1];
            }
            let cells = box.querySelectorAll(".cell");
            cells = Array.from(cells);
            resolve({ i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1)) });
          }).catch((r2) => {
            if (r2.status === 403) {
              functions.cbChecker({ type: "restorePost", value: null });
            }
          });
        });
      },
      //解析页面的回复
      parsePageReplies(nodes) {
        let replyList = [];
        nodes.forEach((node, index2) => {
          if (!node.id)
            return;
          let item = {
            level: 0,
            thankCount: 0,
            isThanked: false,
            isOp: false,
            isDup: false,
            id: node.id.replace("r_", "")
          };
          let reply_content = node.querySelector(".reply_content");
          item.reply_content = functions.checkPhotoLink2Img(reply_content.innerHTML);
          item.reply_text = reply_content.textContent;
          let { users, floor } = this.parseReplyContent(item.reply_content);
          item.hideCallUserReplyContent = item.reply_content;
          if (users.length === 1) {
            item.hideCallUserReplyContent = item.reply_content.replace(/@<a href="\/member\/[\s\S]+?<\/a>(\s#[\d]+)?\s(<br>)?/, () => "");
          }
          item.replyUsers = users;
          item.replyFloor = floor;
          let spans;
          let ago;
          if (window.vals.isMobile) {
            spans = node.querySelectorAll("span");
            ago = spans[1];
          } else {
            ago = node.querySelector(".ago");
          }
          item.date = ago.textContent;
          let userNode = node.querySelector("strong a");
          item.username = userNode.textContent;
          let avatar = node.querySelector("td img");
          item.avatar = avatar.src;
          let no = node.querySelector(".no");
          item.floor = Number(no.textContent);
          let thank_area = node.querySelector(".thank_area");
          if (thank_area) {
            item.isThanked = thank_area.classList.contains("thanked");
          }
          let small;
          if (window.vals.isMobile) {
            small = spans[2];
          } else {
            small = node.querySelector(".small");
          }
          if (small) {
            item.thankCount = Number(small.textContent);
          }
          let op = node.querySelector(".op");
          if (op) {
            item.isOp = true;
          }
          let mod = node.querySelector(".mod");
          if (mod) {
            item.isMod = true;
          }
          replyList.push(item);
        });
        return replyList;
      },
      //解析回复内容，解析出@用户，回复楼层。用于后续生成嵌套楼层
      parseReplyContent(str) {
        if (!str)
          return;
        let users = [];
        let getUsername = (userStr) => {
          let endIndex = userStr.indexOf('">');
          if (endIndex > -1) {
            let user = userStr.substring(0, endIndex);
            if (!users.find((i) => i === user)) {
              users.push(user);
            }
          }
        };
        let userReg = /@<a href="\/member\/([\s\S]+?)<\/a>/g;
        let has = str.matchAll(userReg);
        let res2 = [...has];
        if (res2.length > 1) {
          res2.map((item) => {
            getUsername(item[1]);
          });
        }
        if (res2.length === 1) {
          getUsername(res2[0][1]);
        }
        let floor = -1;
        if (users.length === 1) {
          let floorReg = /@<a href="\/member\/[\s\S]+?<\/a>[\s]+#([\d]+)/g;
          let hasFloor = str.matchAll(floorReg);
          let res = [...hasFloor];
          if (res.length) {
            floor = Number(res[0][1]);
          }
        }
        return { users, floor };
      },
      //获取帖子详情
      async getPostDetail(post, body, htmlText, pageNo = 1) {
        post = await this.parsePostContent(post, body, htmlText);
        return await this.getPostAllReplies(post, body, htmlText, pageNo);
      },
      //解析页面帖子列表
      parsePagePostList(list, box) {
        list.forEach((itemDom) => {
          let item = window.clone(window.initPost);
          let item_title = itemDom.querySelector(".item_title a");
          let { href, id } = functions.parseA(item_title);
          item.id = id;
          item.href = href;
          item.url = location.origin + "/api/topics/show.json?id=" + item.id;
          itemDom.classList.add("post-item");
          itemDom.classList.add(`id_${id}`);
          itemDom.dataset["href"] = href;
          itemDom.dataset["id"] = id;
          window.postList.push(item);
        });
        Promise.allSettled(window.postList.map((item) => $.get(item.url))).then((res) => {
          let ok = res.filter((r2) => r2.status === "fulfilled").map((v) => v.value[0]);
          box.style.boxShadow = "unset";
          box.style.background = "unset";
          if (window.config.viewType === "card") {
            list.forEach((itemDom) => itemDom.classList.add("preview"));
          }
          ok.map((postItem) => {
            var _a;
            if (postItem == null ? void 0 : postItem.id) {
              let itemDom = box.querySelector(`.id_${postItem.id}`);
              if (window.config.showPreviewBtn) {
                let td = itemDom.querySelector("td:nth-child(4)");
                td.style.position = "relative";
                let toggle = document.createElement("div");
                toggle.dataset["id"] = postItem.id;
                toggle.classList.add("toggle");
                toggle.innerText = "点击展开/收起";
                td.append(toggle);
              }
              let index2 = window.postList.findIndex((v) => v.id == postItem.id);
              if (index2 > -1) {
                let obj = window.postList[index2];
                postItem.replyCount = postItem.replies;
                window.postList[index2] = Object.assign({}, obj, postItem);
                if (postItem.content_rendered) {
                  let a = document.createElement("a");
                  a.href = obj.href;
                  a.classList.add("post-content");
                  let div = document.createElement("div");
                  div.innerHTML = postItem.content_rendered;
                  a.append(div);
                  itemDom.append(a);
                  if (div.clientHeight < 172) {
                    a.classList.add("show-all");
                  } else {
                    let showMore = document.createElement("div");
                    showMore.classList.add("show-more");
                    showMore.innerHTML = "显示更多/收起";
                    showMore.onclick = function(e2) {
                      e2.stopPropagation();
                      a.classList.toggle("show-all");
                    };
                    (_a = a.parentNode) == null ? void 0 : _a.append(showMore);
                  }
                }
              }
            }
          });
          functions.cbChecker({ type: "syncData" });
        });
      },
      //创建记事本子条目
      async createNoteItem(itemName) {
        return new Promise(async (resolve) => {
          let data = new FormData();
          data.append("content", itemName);
          data.append("parent_id", 0);
          data.append("syntax", 0);
          let apiRes = await window.win().fetch(`${window.baseUrl}/notes/new`, { method: "post", body: data });
          console.log(apiRes);
          if (apiRes.redirected && apiRes.status === 200) {
            resolve(apiRes.url.substr(-5));
            return;
          }
          resolve(null);
        });
      },
      //编辑记事本子条目
      async editNoteItem(val, id) {
        let data = new FormData();
        data.append("content", val);
        data.append("syntax", 0);
        let apiRes = await window.fetch(`${window.baseUrl}/notes/edit/${id}`, {
          method: "post",
          body: data
        });
        return apiRes.redirected && apiRes.status === 200;
      },
      //标签操作
      async saveTags(val) {
        for (const [key, value] of Object.entries(val)) {
          if (!value.length)
            delete val[key];
        }
        return await this.editNoteItem(window.user.tagPrefix + JSON.stringify(val), window.user.tagsId);
      },
      //已读楼层操作
      async saveReadList(val) {
        return await this.editNoteItem(window.user.readPrefix + JSON.stringify(val), window.user.readNoteItemId);
      },
      //imgur图片删除hash操作
      async saveImgurList(val) {
        return await this.editNoteItem(window.user.imgurPrefix + JSON.stringify(val), window.user.imgurNoteId);
      }
    };
    window.vals = {
      isMobile: !document.querySelector("#Rightbar")
    };
    window.functions = {
      feedback() {
        functions.openNewTab(window.const.issue);
      }
    };
    function initStyle() {
      let style2 = `
       html, body {
            font-size: 62.5%;
        }
        

        :root{
          --box-border-radius:8px;
        }
        
        #Wrapper .content{
        padding:0;
        }
        
        .box{
          box-shadow:rgba(0, 0, 0, 0.08) 0px 4px 12px;
        }
        
        #Tabs{
            border-top-left-radius: var(--box-border-radius) !important;
            border-top-right-radius: var(--box-border-radius) !important;
        }
        
        #Main .cell .count_livid { 
            font-size: 14px;
            font-weight: 500; 
            padding: 3px 10px; 
            border-radius: 5px; 
        }

        #Wrapper {
          height: unset !important;
          width: unset !important;
        }

       #Wrapper > .content {
        height: unset !important;
        width: unset !important;
          max-width:1100px !important;
      }

      .post-item {
          background: white;
      } 

      .post-item > .post-content {
          height: 0;
          margin-top: 0;
      }

      .post-item:hover .toggle {
          display: flex;
      }

      .toggle {
          position: absolute;
          right: ${window.config.viewType === "simple" ? "5rem" : 0};
          top: 0.5rem;
          width: 9rem;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          
          font-size: 1.2rem;
          color: #ccc;
          display: none;
      }

      .preview {
          margin: 1rem 0;
          border: 1px solid transparent;
          border-radius: var(--box-border-radius);
          
      }

      .preview > .post-content {
          height: unset !important;
          margin-top: 0.5rem !important;
      }

      .preview > .post-content.show-all {
          max-height: unset;
          -webkit-mask-image:none; 
      }

      .preview  .topic-link:link {
          color: black !important;
      }

      .post-content {
          margin-top: 0.5rem;
          display: block;
          max-height: 20rem;
          overflow: hidden;
          text-decoration: unset !important;
          line-break: anywhere;
          -webkit-mask-image: linear-gradient(180deg,#000 60%,transparent);
      }

      .show-more {
        display: none;
      }

      .preview > .show-more {
        font-size: 1.3rem;
        text-align: right;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 9;
      }

      .post-content:visited {
          color: #afb9c1 !important;
      }

      .post-content:link {
          color: #494949;
      }


      .Night .post-item {
          background: #18222d !important;
      }

      .Night .preview {
          border: 1px solid #3b536e;
      }

      .Night .preview > .post-content:link {
          color: #d1d5d9;
      }

      .Night .preview > .post-content:visited {
          color: #393f4e !important;
      }
      
      .Night .preview  .topic-link:link {
          color: #c0dbff !important;
      }
      
      ${window.config.viewType === "simple" ? `
      ${window.pageType !== PageType.Member ? `
      .item table tr td:first-child{display:none;}
      #Rightbar .cell table:first-child tr td:first-child{display:none;}
      .item table tr td .sep5{display:none;}
      .item table tr td .topic_info{display:none;}
      .item {border-bottom:none;}
      .avatar,#avatar{display:none;}
      ` : ""}
      
      #Logo {background-image:url('https://i.imgur.com/i9VgUtM.png');}
       .bigger a, .top:nth-last-child(5){color: transparent!important;text-shadow: #b0b0b0 0 0 6px;user-select: none;}
      // .bigger a:before,.top:nth-last-child(5):before{content:'Mona Lisa';position: absolute;background: white;}
      #Rightbar .cell table:first-child tr td:first-child{display:none;}
      ` : ""}

      ${window.config.customBgColor ? `#Wrapper {
          background-color: ${window.config.customBgColor} !important;
          background-image: unset !important;
        }` : ""}
        
        
      .top{
        position:relative;
      }
        
      .new:before{
        content:'new';
        position: absolute;
        background: red;
        font-size: 10px;
        border-radius: 4px;
        padding: 0px 2px;
        color: white;
        right: -9px;
        top: -3px;
      }
    }

    `;
      let addStyle2 = document.createElement("style");
      addStyle2.rel = "stylesheet";
      addStyle2.type = "text/css";
      addStyle2.innerHTML = style2;
      window.document.head.append(addStyle2);
    }
    function qianDao() {
      let timeNow = (/* @__PURE__ */ new Date()).getUTCFullYear() + "/" + ((/* @__PURE__ */ new Date()).getUTCMonth() + 1) + "/" + (/* @__PURE__ */ new Date()).getUTCDate();
      if (window.pageType === PageType.Home) {
        let qiandao = window.query('.box .inner a[href="/mission/daily"]');
        if (qiandao) {
          qianDao_(qiandao, timeNow);
        } else if (window.win().doc.getElementById("gift_v2excellent")) {
          window.win().doc.getElementById("gift_v2excellent").click();
          localStorage.setItem("menu_clockInTime", timeNow);
          console.info("[V2EX - 超级增强] 自动签到完成！");
        } else {
          console.info("[V2EX - 超级增强] 自动签到完成！");
        }
      } else {
        let timeOld = localStorage.getItem("menu_clockInTime");
        if (!timeOld || timeOld != timeNow) {
          qianDaoStatus_(timeNow);
        } else {
          console.info("[V2EX - 超级增强] 自动签到完成！");
        }
      }
    }
    function qianDao_(qiandao, timeNow) {
      let url = window.baseUrl + "/mission/daily/redeem?" + RegExp("once\\=(\\d+)").exec(document.querySelector("div#Top .tools, #menu-body").innerHTML)[0];
      console.log("url", url);
      $.get(url).then((r2) => {
        let bodyText = r2.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
        let html = $(bodyText[0]);
        if (html.find("li.fa.fa-ok-sign").length) {
          html = html.find("#Main").text().match(/已连续登录 (\d+?) 天/)[0];
          localStorage.setItem("menu_clockInTime", timeNow);
          console.info("[V2EX - 超级增强] 自动签到完成！");
          if (qiandao) {
            qiandao.textContent = `自动签到完成！${html}`;
            qiandao.href = "javascript:void(0);";
          }
        } else {
          _GM_notification({
            text: "自动签到失败！请关闭其他插件或脚本。\n如果连续几天都签到失败，请联系作者解决！",
            timeout: 4e3,
            onclick() {
              window.functions.feedback();
            }
          });
          console.warn("[V2EX 增强] 自动签到失败！请关闭其他插件或脚本。如果连续几天都签到失败，请联系作者解决！");
          if (qiandao)
            qiandao.textContent = "自动签到失败！请尝试手动签到！";
        }
      });
    }
    function qianDaoStatus_(timeNow) {
      $.get(window.baseUrl + "/mission/daily").then((r2) => {
        let bodyText = r2.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
        let html = $(bodyText[0]);
        if (html.find('input[value^="领取"]').length) {
          qianDao_(null, timeNow);
        } else {
          console.info("[V2EX 增强] 已经签过到了。");
          localStorage.setItem("menu_clockInTime", timeNow);
        }
      });
    }
    function checkPageType() {
      let l = window.location;
      if (l.pathname === "/") {
        window.pageType = PageType.Home;
      } else if (l.href.match(/.com\/?tab=/)) {
        window.pageType = PageType.Home;
      } else if (l.href.match(/.com\/go\//)) {
        if (!l.href.includes("/links")) {
          window.pageType = PageType.Node;
        }
      } else if (l.href.match(/.com\/recent/)) {
        window.pageType = PageType.Home;
      } else if (l.href.match(/.com\/member/)) {
        window.pageType = PageType.Member;
      } else {
        let r2 = l.href.match(/.com\/t\/([\d]+)/);
        if (r2) {
          window.pageType = PageType.Post;
          window.pageData.id = r2[1];
          if (l.search) {
            let pr = l.href.match(/\?p=([\d]+)/);
            if (pr)
              window.pageData.pageNo = Number(pr[1]);
          }
        }
      }
    }
    function getNoteItemContent(id, prefix) {
      return new Promise((resolve, reject) => {
        $.get(window.baseUrl + "/notes/edit/" + id).then((r2) => {
          let bodyText = r2.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
          let body = $(bodyText[0]);
          let text = body.find(".note_editor").text();
          if (text === prefix) {
            resolve({});
          } else {
            let tagJson = text.substring(prefix.length);
            try {
              resolve(JSON.parse(tagJson));
            } catch (e2) {
              console.log("tage", tagJson);
              resolve({});
            }
          }
        });
      });
    }
    async function initNoteData() {
      $.get(window.baseUrl + "/notes").then(async (r2) => {
        let bodyText = r2.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
        let body = $(bodyText[0]);
        let items = body.find("#Main .box .note_item_title a");
        let tagItem = Array.from(items).find((v) => v.innerText.includes(window.user.tagPrefix));
        if (tagItem) {
          window.user.tagsId = tagItem.href.substr(-5);
          window.user.tags = await getNoteItemContent(window.user.tagsId, window.user.tagPrefix);
        } else {
          let r22 = await window.parse.createNoteItem(window.user.tagPrefix);
          r22 && (window.user.tagsId = r22);
        }
        let readItem = Array.from(items).find((v) => v.innerText.includes(window.user.readPrefix));
        if (readItem) {
          window.user.readNoteItemId = readItem.href.substr(-5);
          window.user.readList = await getNoteItemContent(window.user.readNoteItemId, window.user.readPrefix);
        } else {
          let r22 = await window.parse.createNoteItem(window.user.readPrefix);
          r22 && (window.user.readNoteItemId = r22);
        }
        let imgurItem = Array.from(items).find((v) => v.innerText.includes(window.user.imgurPrefix));
        if (imgurItem) {
          window.user.imgurNoteId = imgurItem.href.substr(-5);
          window.user.imgurList = await getNoteItemContent(window.user.imgurNoteId, window.user.imgurPrefix);
        } else {
          let r22 = await window.parse.createNoteItem(window.user.imgurPrefix);
          r22 && (window.user.imgurNoteId = r22);
        }
        functions.cbChecker({ type: "syncData" });
      });
    }
    function initConfig() {
      return new Promise((resolve) => {
        let configStr = window.localStorage.getItem("v2ex-config");
        if (configStr) {
          let configObj = JSON.parse(configStr);
          configObj = configObj[window.user.username ?? "default"];
          if (configObj) {
            window.config = Object.assign(window.config, configObj);
          }
        }
        resolve(window.config);
      });
    }
    function addSettingText() {
      let setting = $(`<a href="javascript:void 0;" class="top ${window.config.version < window.currentVersion ? "new" : ""}">脚本设置</a>`);
      setting.on("click", function() {
        this.classList.remove("new");
        functions.cbChecker({ type: "openSetting" });
      });
      $(".tools").prepend(setting);
    }
    async function init() {
      window.addEventListener("error", (e2) => {
        let dom = e2.target;
        let originImgUrl = dom.getAttribute("data-originurl");
        if (originImgUrl) {
          let a = document.createElement("a");
          a.href = originImgUrl;
          a.setAttribute("notice", "此标签由v2ex超级增强脚本转换图片失败后恢复");
          a.innerText = originImgUrl;
          dom.parentNode.replaceChild(a, dom);
        }
      }, true);
      if (window.isNight) {
        document.documentElement.classList.add("dark");
      }
      checkPageType();
      functions.initMonkeyMenu();
      let top2 = $("#menu-body .cell:first .top:first");
      if (top2.length && ["个人主页", "Profile"].includes(top2.text())) {
        window.user.username = top2.attr("href").replace("/member/", "");
        window.user.avatar = $("#menu-entry .avatar").attr("src");
        initNoteData();
      }
      initConfig().then((r2) => {
        addSettingText();
        initStyle();
        try {
          if (window.config.autoSignin && window.user.username) {
            qianDao();
          }
        } catch (e2) {
          console.log("签到失败");
        }
        if (window.user.username)
          ;
      });
      let box;
      let list;
      switch (window.pageType) {
        case PageType.Node:
          box = window.win().doc.querySelectorAll("#Wrapper #Main .box");
          let topics = box[1].querySelector("#TopicsNode");
          list = topics.querySelectorAll(".cell");
          list[0].before($section);
          window.parse.parsePagePostList(list, box[1]);
          break;
        case PageType.Home:
          if (window.vals.isMobile) {
            box = document.querySelector("#Wrapper .box");
          } else {
            box = document.querySelector("#Wrapper #Main .box");
          }
          list = box.querySelectorAll(".item");
          list[0].before($section);
          window.parse.parsePagePostList(list, box);
          break;
        case PageType.Post:
          if (window.vals.isMobile) {
            box = document.querySelector("#Wrapper .box");
          } else {
            box = document.querySelector("#Wrapper #Main .box");
          }
          box.after($section);
          if (window.config.postWidth) {
            let Main = $("#Main");
            Main.css({
              "width": window.config.postWidth,
              margin: "unset"
            });
            $("#Wrapper > .content").css({
              "max-width": "unset",
              display: "flex",
              "justify-content": "center",
              gap: "20px"
            });
            Main.after($("#Rightbar"));
          }
          let post = window.clone(window.initPost);
          post.id = window.pageData.id;
          let body = $(window.document.body);
          let htmlText = window.document.documentElement.outerHTML;
          window.parse.parsePostContent(
            post,
            body,
            htmlText
          ).then(async (res) => {
            await functions.cbChecker({ type: "postContent", value: res }, 0);
            await window.parse.parseOp(res);
          });
          window.parse.getPostAllReplies(
            post,
            body,
            htmlText,
            window.pageData.pageNo
          ).then(async (res) => {
            await functions.cbChecker({ type: "postReplies" });
          });
          break;
        case PageType.Member:
          if (window.vals.isMobile) {
            box = document.querySelector("#Wrapper .box");
          } else {
            box = document.querySelector("#Wrapper #Main .box");
          }
          window.targetUserName = box[0].querySelector("h1").textContent;
          if (window.config.openTag) {
            box[0].style.borderBottom = "none";
            box[0].style["border-bottom-left-radius"] = "0";
            box[0].style["border-bottom-right-radius"] = "0";
          }
          list = box[1].querySelectorAll(".cell");
          box[0].after($section);
          window.parse.parsePagePostList(list, box[1]);
          break;
        default:
          window.stopMe = true;
          functions.cbChecker({ type: "syncData" });
          console.error("未知页面");
          break;
      }
    }
    window.canParseV2exPage = !window.location.search.includes("script");
    if (window.canParseV2exPage) {
      init();
    } else {
      let box = document.querySelector("#Wrapper #Main .box");
      box.after($section);
      window.stopMe = true;
      functions.cbChecker({ type: "syncData" });
      if (window.location.search.includes("script=0")) {
        functions.cbChecker({ type: "warningNotice", value: "脚本无法查看此主题，已为您单独打开此主题" });
      }
      if (window.location.search.includes("script=1")) {
        functions.cbChecker({ type: "warningNotice", value: "由于回复数量较多，已为您单独打开此主题并停止解析楼中楼" });
      }
    }
  }
  run();
  let vueApp = vue.createApp(App);
  vueApp.config.unwrapInjectedRef = true;
  vueApp.mount($section);

})(Vue);