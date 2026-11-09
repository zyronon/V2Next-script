import {CommentDisplayType, Config, PageType, Post, Reply, User} from "./types";
import {GM_openInTab, GM_registerMenuCommand, GM_xmlhttpRequest} from 'vite-plugin-monkey/dist/client';
// import {GM_openInTab, GM_registerMenuCommand}  from 'gmApi';

export const functions = {
  async refreshOnce(once: any) {
    return new Promise(resolve => {
      if (once) {
        if (typeof once === 'string') {
          let res = once.match(/var once = "([\d]+)";/)
          if (res && res[1]) resolve(Number(res[1]))
        }
        if (typeof once === 'number') resolve(once)
      }
      window.fetchOnce().then(r => {
        // console.log('通过fetchOnce接口拿once', r)
        resolve(r)
      })
    })
  },
  clone: (val: any) => JSON.parse(JSON.stringify(val)),
  createList(post: Post, replyList: Reply[], withRedundList = true) {
    // replyList = replyList.slice(0, 1)
    post.replyList = replyList
    // return post
    post.topReplyList = this.clone(replyList)
      .filter(v => v.thankCount >= window.config.topReplyLoveMinCount)
      .sort((a, b) => b.thankCount - a.thankCount)
      .slice(0, window.config.topReplyCount)
    post.replyCount = replyList.length
    post.allReplyUsers = Array.from(new Set(replyList.map((v: any) => v.username)))
    post.nestedReplies = functions.createNestedList(this.clone(replyList), post.topReplyList)
    if (withRedundList) {
      post.nestedRedundReplies = functions.createNestedRedundantList(this.clone(replyList), post.topReplyList)
    }
    return post
  },
  //获取所有回复
  getAllReply(repliesMap = []) {
    return repliesMap.sort((a: any, b: any) => a.i - b.i).reduce((pre, i: any) => {
      pre = pre.concat(i.replyList)
      return pre
    }, [])
  },
  //查找子回复
  findChildren(item: any, endList: any[], all: any[], topReplyList: any[]) {
    const fn = (child: any, endList2: any[], parent: any) => {
      child.level = parent.level + 1
      //用于标记为已使用，直接标记源数据靠谱点，标记child可能会有问题
      let rIndex = all.findIndex(v => v.floor === child.floor)
      if (rIndex > -1) {
        all[rIndex].isUse = true
      }
      parent.children.push(this.findChildren(child, endList2, all, topReplyList))
    }
    // console.log('endList', endList)
    item.children = []
    // if (item.floor === 46) debugger
    let floorReplyList = []

    //先找到指定楼层的回复，再去循环查找子回复
    //原因：问题930155，有图
    for (let i = 0; i < endList.length; i++) {
      let currentItem = endList[i]
      //如果已被使用，直接跳过
      if (currentItem.isUse) continue
      if (currentItem.replyFloor === item.floor) {
        //必须楼层对应的名字和@人的名字相同。因为经常出现不相同的情况
        if (currentItem.replyUsers.length === 1 && currentItem.replyUsers[0] === item.username) {
          //先标记为使用，不然遇到“问题930155”，会出现重复回复
          currentItem.isUse = true
          floorReplyList.push({endList: endList.slice(i + 1), currentItem})
          //问题930155：这里不能直接找子级，如果item为A，currentItem为B，但随后A又回复了B，然后C回复A。这样直接找子级就会把C归类到B的子回复，而不是直接A的子回复
          //截图：930155.png
          // fn(currentItem, endList.slice(i + 1), item)
        } else {
          currentItem.isWrong = true
        }
      }
    }

    //从后往前找
    //原因：问题933080，有图
    floorReplyList.reverse().map(({currentItem, endList}) => {
      fn(currentItem, endList, item)
    })

    //下一个我的下标，如果有下一个我，那么当前item的子回复应在当前和下个我的区间内查找
    let nextMeIndex = endList.findIndex(v => {
      //必须是下一个不是”自己回复自己“的自己
      //原因：问题887644（1-2），有图
      return (v.username === item.username) && (v.replyUsers?.[0] !== item.username)
    })
    let findList = nextMeIndex > -1 ? endList.slice(0, nextMeIndex) : endList

    for (let i = 0; i < findList.length; i++) {
      let currentItem = findList[i]
      //如果已被使用，直接跳过
      if (currentItem.isUse) continue

      if (currentItem.replyUsers.length === 1) {
        //如果这条数据指定了楼层，并且名字也能匹配上，那么直接忽略
        //原因：问题887644-3，有图
        if (currentItem.replyFloor !== -1) {
          if (all[currentItem.replyFloor - 1]?.username === currentItem.replyUsers[0]) {
            continue
          }
        }
        let endList2 = endList.slice(i + 1)
        //如果是下一条是同一人的回复，那么跳出循环
        if (currentItem.username === item.username) {
          //自己回复自己的特殊情况
          if (currentItem.replyUsers[0] === item.username) {
            fn(currentItem, endList2, item)
          }
          break
        } else {
          if (currentItem.replyUsers[0] === item.username) {
            fn(currentItem, endList2, item)
          }
        }
      } else {
        //下一条是同一人的回复，并且均未@人。直接跳过
        if (currentItem.username === item.username) break
      }
    }

    //排序，因为指定楼层时，是从后往前找的
    item.children = item.children.sort((a: any, b: any) => a.floor - b.floor)
    item.replyCount = item.children.reduce((a, b) => {
      return a + (b.children.length ? b.replyCount + 1 : 1)
    }, 0)

    let rIndex = topReplyList.findIndex(v => v.floor === item.floor)
    if (rIndex > -1) {
      topReplyList[rIndex].children = item.children
      topReplyList[rIndex].replyCount = item.replyCount
    }
    return item
  },
  //生成嵌套回复
  createNestedList(allList = [], topReplyList: any[] = []) {
    if (!allList.length) return []

    // console.log('cal-createNestedList', Date.now())
    let list = allList
    let nestedList: any[] = []
    list.map((item: any, index: number) => {
      let startList = list.slice(0, index)
      //用于918489这种情况，@不存在的人
      let startReplyUsers = Array.from(new Set(startList.map((v: any) => v.username)))

      let endList = list.slice(index + 1)

      if (index === 0) {
        nestedList.push(this.findChildren(item, endList, list, topReplyList))
      } else {
        if (!item.isUse) {
          //是否是一级回复
          let isOneLevelReply = false
          if (item.replyUsers.length) {
            // if (item.replyUsers.length === 1) {
            //   isOneLevelReply = !startReplyUsers.find(v => v === item.replyUsers[0]);
            // } else {
            //   // isOneLevelReply = item.replyUsers.every(a => {
            //   //   return startReplyUsers.find(v => v === a);
            //   // })
            //   // isOneLevelReply = true
            //   item.replyUsers.map(a => {
            //     if (startReplyUsers.find(v => v === a)) {
            //       // list.splice(index, 0, item)
            //     }
            //   })
            // }
            if (item.replyUsers.length > 1) {
              isOneLevelReply = true
            } else {
              isOneLevelReply = !startReplyUsers.find(v => v === item.replyUsers[0]);
            }
          } else {
            isOneLevelReply = true
          }
          if (isOneLevelReply) {
            item.level = 0
            nestedList.push(this.findChildren(item, endList, list, topReplyList))
          }
        }
      }
    })
    // console.log('replies长度', allList)
    // console.log('nestedList长度', nestedList)

    return nestedList
  },
  //生成嵌套冗余回复
  createNestedRedundantList(allList = [], topReplyList: any[]) {
    if (!allList.length) return []

    // console.log('cal-createNestedList', Date.now())

    let list = allList
    let nestedList: any[] = []
    list.map((item: any, index: number) => {
      let startList = list.slice(0, index)
      //用于918489这种情况，@不存在的人
      let startReplyUsers = Array.from(new Set(startList.map((v: any) => v.username)))

      let endList = list.slice(index + 1)

      if (index === 0) {
        nestedList.push(this.findChildren(item, endList, list, topReplyList))
      } else {
        if (!item.isUse) {
          //是否是一级回复
          let isOneLevelReply = false
          if (item.replyUsers.length) {
            if (item.replyUsers.length > 1) {
              isOneLevelReply = true
            } else {
              isOneLevelReply = !startReplyUsers.find(v => v === item.replyUsers[0]);
            }
          } else {
            isOneLevelReply = true
          }
          if (isOneLevelReply) {
            item.level = 0
            nestedList.push(this.findChildren(item, endList, list, topReplyList))
          }
        } else {
          let newItem = this.clone(item)
          newItem.children = []
          newItem.level = 0
          newItem.isDup = true
          nestedList.push(newItem)
        }
      }
    })
    // console.log('replies长度', allList)
    // console.log('nestedList长度', nestedList)
    return nestedList
  },
  //解析A标签
  parseA(a: HTMLAnchorElement) {
    let href = a.href
    let id
    if (href.includes('/t/')) {
      id = a.pathname.substring('/t/'.length);
    }
    return {href, id, title: a.innerText}
  },
  //图片链接转Img标签
  checkPhotoLink2Img(dom: Element) {
    let replaceImgur = window.config.replaceImgur;
    let is_add = false;
    let prefix_img = replaceImgur ? (window.config.imgurProxy || DefaultVal.imgurProxy) : '';
    let imgList = dom.querySelectorAll('img')
    imgList.forEach((img) => {
      let href = img.src
      if (href.includes('imgur.com')) {
        img.setAttribute('originUrl', img.src);
        img.setAttribute('notice', '此img标签由V2Next脚本解析')
        img.setAttribute('referrerpolicy', 'no-referrer')
        if (
          href.includes('.png') ||
          href.includes('.jpg') ||
          href.includes('.jpeg') ||
          href.includes('.gif') ||
          href.includes('.PNG') ||
          href.includes('.JPG') ||
          href.includes('.JPEG') ||
          href.includes('.GIF')
        ) {
        } else {
          href = href + '.png'
        }
        if (!is_add && replaceImgur) {
          let meta = document.createElement('meta');
          meta.setAttribute('name', 'referrer');
          meta.setAttribute('content', 'no-referrer');
          document.getElementsByTagName('head')[0].appendChild(meta);
          is_add = true;
        }

        img.src = prefix_img + href
      }
    })

    let aList = dom.querySelectorAll('a')
    aList.forEach((a) => {
      let href = a.href
      if (a.children.length == 0 && a.innerText == href) {
        if (
          href.includes('.png') ||
          href.includes('.jpg') ||
          href.includes('.jpeg') ||
          href.includes('.gif') ||
          href.includes('.PNG') ||
          href.includes('.JPG') ||
          href.includes('.JPEG') ||
          href.includes('.GIF')
        ) {
          let img = document.createElement('img')
          img.setAttribute('originUrl', a.href);
          img.setAttribute('notice', '此img标签由V2Next脚本解析')
          img.setAttribute('referrerpolicy', 'no-referrer')

          if (href.includes('imgur.com')) {
            if (!is_add && replaceImgur) {
              let meta = document.createElement('meta');
              meta.setAttribute('name', 'referrer');
              meta.setAttribute('content', 'no-referrer');
              document.getElementsByTagName('head')[0].appendChild(meta);
              is_add = true;
            }
            img.src = prefix_img + href
          } else {
            img.src = href
          }
          a.innerText = ''
          a.append(img)
        }
      }
    })
  },
  //检测帖子回复长度
  async checkPostReplies(id: string, needOpen: boolean = true) {
    return new Promise(async resolve => {
      let res: any = await functions.getPostDetailByApi(id)
      if (res?.replies > window.config.maxReplyCountLimit) {
        if (needOpen) {
          functions.openNewTab(`https://${location.origin}/t/${id}?p=1&script=1`)
        }
        return resolve(true)
      }
      resolve(false)
    })
  },
  async sleep(time: number) {
    return new Promise(resolve => {
      // console.log('等待vue加载完成,第' + count + '次', Date.now())
      setTimeout(resolve, time)
    })
  },
  //打开新标签页
  openNewTab(href: string, active = false) {
    let isSafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    if (isSafariBrowser) {
      let tempId = 'a_blank_' + Date.now()
      let a = document.createElement("a");
      a.setAttribute("href", href);
      a.setAttribute("target", "_blank");
      a.setAttribute("id", tempId);
      a.setAttribute("script", '1');
      // 防止反复添加
      if (!document.getElementById(tempId)) {
        document.body.appendChild(a);
      }
      a.click();
    } else {
      GM_openInTab(href, {active});
    }
  },
  async cbChecker(val: any, count = 0) {
    if (window.cb) {
      window.cb(val)
    } else {
      while ((!window.cb) && count < 30) {
        await functions.sleep(500)
        count++
      }
      window.cb && window.cb(val)
    }
  },
  //初始化脚本菜单
  initMonkeyMenu() {
    try {
      GM_registerMenuCommand("脚本设置", () => {
        functions.cbChecker({type: 'openSetting'})
      });
      GM_registerMenuCommand('仓库地址', () => {
        functions.openNewTab(window.const.git)
      });
      GM_registerMenuCommand('反馈 & 建议', functions.feedback);
    } catch (e) {
      console.error('无法使用Tampermonkey')
    }
  },
  feedback() {
    functions.openNewTab(DefaultVal.issue)
  },
  //检测页面类型
  checkPageType(a?: HTMLAnchorElement) {
    let l = a || window.location
    let data = {pageType: null, pageData: {id: '', pageNo: null}, username: ''}
    if (l.pathname === '/') {
      data.pageType = PageType.Home
    } else if (l.pathname === '/changes') {
      data.pageType = PageType.Changes
    } else if (l.pathname === '/v2hot') {
      data.pageType = PageType.Hot
    } else if (l.pathname === '/recent') {
      data.pageType = PageType.Changes
    } else if (l.href.match(/.com\/?tab=/)) {
      data.pageType = PageType.Home
    } else if (l.href.match(/.com\/go\//)) {
      if (!l.href.includes('/links')) {
        data.pageType = PageType.Node
      }
    } else if (l.href.match(/.com\/member/)) {
      data.pageType = PageType.Member
      data.username = l.pathname.replace('/member/', '').replace('/replies', '').replace('/topics', '')
    } else {
      let r = l.href.match(/.com\/t\/([\d]+)/)
      if (r && !l.pathname.includes('review') && !l.pathname.includes('info')) {
        data.pageType = PageType.Post
        data.pageData.id = r[1]
        if (l.search) {
          let pr = l.href.match(/\?p=([\d]+)/)
          if (pr) data.pageData.pageNo = Number(pr[1])
        }
      }
    }
    return data
  },
  //通过api获取主题详情
  getPostDetailByApi(id: string) {
    return new Promise(resolve => {
      fetch(`${location.origin}/api/topics/show.json?id=${id}`)
        .then(async r => {
          if (r.status === 200) {
            let res = await r.json()
            if (res) {
              let d = res[0]
              resolve(d)
            }
          }
        })
    })
  },
  appendPostContent(res: any, el: Element) {
    let a = document.createElement('a')
    a.href = res.href
    a.classList.add('post-content')
    let div = document.createElement('div')
    div.innerHTML = res.content_rendered
    a.append(div)
    // console.log(div.clientHeight)
    el.append(a)
    // show More
    const checkHeight = () => {
      if (div.clientHeight < 300) {
        a.classList.add('show-all')
      } else {
        let showMore = document.createElement('div')
        showMore.classList.add('show-more')
        showMore.innerHTML = '显示更多/收起'
        showMore.onclick = function (e) {
          e.stopPropagation()
          a.classList.toggle('show-all')
        }
        a.parentNode?.append(showMore)
      }
    }
    checkHeight()
  },
  //从本地读取配置
  initConfig() {
    let configStr = localStorage.getItem('v2ex-config')
    let configMap = {}
    let configObj = {}
    let userName = window.user.username || 'default';
    if (configStr) {
      configMap = JSON.parse(configStr)
      configObj = configMap[userName]
      if (configObj) {
        window.config = functions.deepAssign(window.config, configObj)
      }
    }
    configMap[userName] = window.config
    localStorage.setItem('v2ex-config', JSON.stringify(configMap))
  },
  deepAssign(...arg: any) {
    let name, options, src, copy
    let length = arguments.length
    // 记录要复制的对象的下标
    let i = 1
    // target默认是第一个参数
    let target = arguments[0] || {}
    // 如果target不是对象，我们是无法进行复制的，所以设为{}
    if (typeof target !== 'object') {
      target = {}
    }
    // 循环遍历要复制的对象
    for (; i < length; i++) {
      // 获取当前对象
      options = arguments[i]
      // 要求不能为空 避免extend(a,,b)这种情况
      if (options != null) {
        for (name in options) {
          // 目标属性值
          src = target[name]
          // 要复制的对象的属性值
          copy = options[name]

          if (copy && typeof copy == 'object') {
            // 递归调用
            target[name] = this.deepAssign(src, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  },
  //生成dom，从html字符串
  genDomFromHtmlString(htmlText) {
    let bodyText = htmlText.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
    let body = document.createElement('html')
    body.innerHTML = bodyText[0]
    return body
  },
  stopEvent(e: any) {
    e.preventDefault()
    e.stopPropagation()
  },
  loadAndRunScript(url: string) {
    GM_xmlhttpRequest({
      method: "GET",
      url,
      onload: function (response) {
        const code = response.responseText;
        eval(code);
      }
    });
  }


}

export const DefaultPost: Post = {
  allReplyUsers: [],
  content_rendered: "",
  createDate: "",
  createDateAgo: '',
  lastReplyDate: '',
  lastReplyUsername: '',
  fr: "",
  replyList: [],
  topReplyList: [],
  nestedReplies: [],
  nestedRedundReplies: [],
  username: '',
  url: '',
  href: '',
  member: {
    avatar: '',
    username: ''
  },
  node: {
    title: '',
    url: ''
  },
  headerTemplate: '',
  title: '',
  id: '',
  type: 'post',
  once: '',
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
}
export const getDefaultPost = (val: any = {}): Post => {
  return Object.assign(functions.clone(DefaultPost), val)
}

export const DefaultUser: User = {
  tagPrefix: '--用户标签--',
  tags: {},
  tagsId: '',
  username: '',
  avatar: '',
  readPrefix: '--已读楼层--',
  readNoteItemId: '',
  readList: {},
  imgurPrefix: '--imgur图片删除hash--',
  imgurList: {},
  imgurNoteId: '',
  configPrefix: '--config--',
  configNoteId: '',
}

export const DefaultVal = {
  pageType: undefined,
  pageData: {pageNo: 1},
  targetUserName: '',
  currentVersion: 5,
  cb: null,
  git: 'https://github.com/zyronon/V2Next',
  shortGit: 'zyronon/V2Next',
  issue: 'https://github.com/zyronon/V2Next/issues',
  pcLog: 'https://greasyfork.org/zh-CN/scripts/458024/versions',
  pcScript: 'https://greasyfork.org/zh-CN/scripts/458024',
  mobileScript: 'https://github.com/zyronon/V2Next/releases',
  homeUrl: 'https://vtonext.vercel.app/',
  hotUrl: 'https://v2hotlist.vercel.app/hot/',
  imgurProxy: "https://img.noobzone.ru/getimg.php?url=",
}

export function getDefaultConfig(val: any = {}): Config {
  return Object.assign({
    showToolbar: true,
    autoOpenDetail: true,
    openTag: false,//给用户打标签
    clickPostItemOpenDetail: true,
    closePostDetailBySpace: true,//点击空白处关闭详情
    contentAutoCollapse: true,//正文超长自动折叠
    viewType: 'table',
    commentDisplayType: CommentDisplayType.FloorInFloorNoCallUser,
    newTabOpen: false,//新标签打开
    newTabOpenActive: false,
    base64: true,//base功能
    sov2ex: false,
    postWidth: '',
    showTopReply: true,
    topReplyLoveMinCount: 3,
    topReplyCount: 5,
    autoJumpLastReadFloor: false,
    rememberLastReadFloor: false,
    autoSignin: true,
    customBgColor: '',
    version: DefaultVal.currentVersion,
    collectBrowserNotice: false,
    fontSizeType: 'normal',
    notice: {
      uid: '',
      text: '',
      ddWebhook: '',
      takeOverNoticePage: true,
      whenNewNoticeGlimmer: false,
      loopCheckNotice: false,
      loopCheckNoticeInterval: 5,
    },
    replaceImgur: false,
    imgurProxy: '',
    maxReplyCountLimit: 400,
  }, val)
}

/** emoji表情数据 */
export const emojiEmoticons = [
  {
    title: '常用',
    list: [
      '😅', '😭', '😂', '🥰', '😰', '🤡', '👀',
      '🐴', '🐶', '❓', '❤️', '💔', '⭐', '🔥',
      '💩', '🔞', '⚠️', '🎁', '🎉',
    ]
  },
  {
    title: '小黄脸',
    list: [
      '😀',
      '😁',
      '😂',
      '🤣',
      '😅',
      '😊',
      '😋',
      '😘',
      '🥰',
      '😗',
      '🤩',
      '🤔',
      '🤨',
      '😐',
      '😑',
      '🙄',
      '😏',
      '😪',
      '😫',
      '🥱',
      '😜',
      '😒',
      '😔',
      '😨',
      '😰',
      '😱',
      '🥵',
      '😡',
      '🥳',
      '🥺',
      '🤭',
      '🧐',
      '😎',
      '🤓',
      '😭',
      '🤑',
      '🤮',
    ],
  },
  {
    title: '手势',
    list: [
      '🤏',
      '👉',
      '✌️',
      '👌',
      '👍',
      '👎',
      '🤝',
      '🙏',
      '👏',
    ],
  },
  {
    title: '其他',
    list: ['🔞', '👻', '🤡', '🐔', '👀', '💩', '🐴', '🦄', '🐧', '🐶',],
  },
]
/** 表情数据 */
export const classicsEmoticons = [
  {
    name: '[狗头]',
    low: 'https://i.imgur.com/io2SM1h.png',
    high: 'https://i.imgur.com/0icl60r.png'
  },
  {
    name: '[doge]',
    low: 'https://i.imgur.com/duWRpIu.png',
    high: 'https://i.imgur.com/HyphI6d.png'
  },
  {
    name: '[受虐滑稽]',
    low: 'https://i.imgur.com/Iy0taMy.png',
    high: 'https://i.imgur.com/PS1pxd9.png'
  },
  {
    name: '[马]',
    low: 'https://i.imgur.com/8EKZv7I.png',
    high: 'https://i.imgur.com/ANFUX52.png'
  },
  {
    name: '[二哈]',
    low: 'https://i.imgur.com/XKj1Tkx.png',
    high: 'https://i.imgur.com/dOeP4XD.png'
  },
  {
    name: '[舔屏]',
    low: 'https://i.imgur.com/Cvl7dyN.png',
    high: 'https://i.imgur.com/LmETy9N.png'
  },
  {
    name: '[辣眼睛]',
    low: 'https://i.imgur.com/cPNPYD5.png',
    high: 'https://i.imgur.com/3fSUmi8.png'
  },
  {
    name: '[吃瓜]',
    low: 'https://i.imgur.com/ee8Lq7H.png',
    high: 'https://i.imgur.com/0L26og9.png'
  },
  {
    name: '[不高兴]',
    low: 'https://i.imgur.com/huX6coX.png',
    high: 'https://i.imgur.com/N7JEuvc.png'
  },
  // {
  //   name: '[呵呵]',
  //   low: 'https://i.imgur.com/RvoLAbX.png',
  //   high: 'https://i.imgur.com/xSzIqrK.png'
  // },
  {
    name: '[真棒]',
    low: 'https://i.imgur.com/xr1UOz1.png',
    high: 'https://i.imgur.com/w8YEw9Q.png'
  },
  {
    name: '[鄙视]',
    low: 'https://i.imgur.com/u6jlqVq.png',
    high: 'https://i.imgur.com/8JFNANq.png'
  },
  {
    name: '[疑问]',
    low: 'https://i.imgur.com/F29pmQ6.png',
    high: 'https://i.imgur.com/EbbTQAR.png'
  },
  {
    name: '[吐舌]',
    low: 'https://i.imgur.com/InmIzl9.png',
    high: 'https://i.imgur.com/Ovj56Cd.png'
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
    name: '[笑眼]',
    low: 'https://i.imgur.com/ZveiiGy.png',
    high: 'https://i.imgur.com/PI1CfEr.png'
  },
  // {
  //   name: '[狂汗]',
  //   low: 'https://i.imgur.com/veWihk6.png',
  //   high: 'https://i.imgur.com/3LtHdQv.png'
  // },
  {
    name: '[大哭]',
    low: 'https://i.imgur.com/hu4oR6C.png',
    high: 'https://i.imgur.com/b4X9XLE.png'
  },
  {
    name: '[喷]',
    low: 'https://i.imgur.com/bkw3VRr.png',
    high: 'https://i.imgur.com/wnZL13L.png'
  },
  {
    name: '[苦笑]',
    low: 'https://i.imgur.com/VUWFktU.png',
    high: 'https://i.imgur.com/NAfspZ1.png'
  },
  {
    name: '[喝酒]',
    low: 'https://i.imgur.com/2ZZSapE.png',
    high: 'https://i.imgur.com/rVbSVak.png'
  },

  {
    name: '[捂脸]',
    low: 'https://i.imgur.com/krir4IG.png',
    high: 'https://i.imgur.com/qqBqgVm.png'
  },
  // {
  //   name: '[呕]',
  //   low: 'https://i.imgur.com/6CUiUxv.png',
  //   high: 'https://i.imgur.com/kgdxRsG.png'
  // },
  {
    name: '[阴险]',
    low: 'https://i.imgur.com/MA8YqTP.png',
    high: 'https://i.imgur.com/e94jbaT.png'
  },
  {
    name: '[怒]',
    low: 'https://i.imgur.com/n4kWfGB.png',
    high: 'https://i.imgur.com/iMXxNxh.png'
  },
  // {
  //   name: '[衰]',
  //   low: 'https://i.imgur.com/voHFDyQ.png',
  //   high: 'https://i.imgur.com/XffE6gu.png'
  // },
  // {
  //   name: '[合十]',
  //   low: 'https://i.imgur.com/I8x3ang.png',
  //   high: 'https://i.imgur.com/T4rJVee.png'
  // },
  // {
  //   name: '[赞]',
  //   low: 'https://i.imgur.com/lG44yUl.png',
  //   high: 'https://i.imgur.com/AoF5PLp.png'
  // },
  // {
  //   name: '[踩]',
  //   low: 'https://i.imgur.com/cJp0uKZ.png',
  //   high: 'https://i.imgur.com/1XYGfXj.png'
  // },
  // {
  //   name: '[爱心]',
  //   low: 'https://i.imgur.com/sLENaF5.png',
  //   high: 'https://i.imgur.com/dND56oX.png'
  // },
  //
  // {
  //   name: '[心碎]',
  //   low: 'https://i.imgur.com/AZxJzve.png',
  //   high: 'https://i.imgur.com/RiUsPci.png'
  // },
]


