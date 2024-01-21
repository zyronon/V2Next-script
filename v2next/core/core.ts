import {Config, Post, User, CommentDisplayType, Reply, MAX_REPLY_LIMIT} from "./types";
import {GM_openInTab, GM_registerMenuCommand} from "gmApi";

export const DefaultPost: Post = {
  allReplyUsers: [],
  content_rendered: "",
  createDate: "",
  createDateAgo: '',
  fr: "",
  replyList: [],
  nestedReplies: [],
  nestedRedundReplies: [],
  username: '',
  url: '',
  member: {},
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
}

export const DefaultConfig: Config = {
  showToolbar: true,
  showPreviewBtn: true,
  autoOpenDetail: true,
  openTag: false,//给用户打标签
  clickPostItemOpenDetail: true,
  closePostDetailBySpace: true,//点击空白处关闭详情
  contentAutoCollapse: true,//正文超长自动折叠
  viewType: 'table',
  commentDisplayType: CommentDisplayType.FloorInFloorNoCallUser,
  newTabOpen: false,//新标签打开
  base64: true,//base功能
  sov2ex: false,
  postWidth: '',
  showTopReply: true,
  topReplyLoveMinCount: 3,
  topReplyCount: 3,
  autoJumpLastReadFloor: false,
  rememberLastReadFloor: false,
  autoSignin: true,
  customBgColor: '',
  version: 1,
  collectBrowserNotice: false,
  fontSizeType: 'normal'
}

export const DefaultVal = {
  pageType: undefined,
  pageData: {pageNo: 1},
  targetUserName: '',
  currentVersion: 1,
  isNight: false,
  cb: null,
  stopMe: null,
  postList: [],
  git: 'https://github.com/zyronon/web-scripts',
  issue: 'https://github.com/zyronon/web-scripts/issues'
}

export const functions = {
  //获取所有回复
  getAllReply(repliesMap = []) {
    return repliesMap.sort((a: any, b: any) => a.i - b.i).reduce((pre, i: any) => {
      pre = pre.concat(i.replyList)
      return pre
    }, [])
  },
  //查找子回复
  findChildren(item: any, endList: any[], all: any[]) {
    const fn = (child: any, endList2: any[], parent: any) => {
      child.level = parent.level + 1
      //用于标记为已使用，直接标记源数据靠谱点，标记child可能会有问题
      let rIndex = all.findIndex(v => v.floor === child.floor)
      if (rIndex > -1) {
        all[rIndex].isUse = true
      }
      parent.children.push(this.findChildren(child, endList2, all,))
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
    return item
  },
  //生成嵌套回复
  createNestedList(allList = []) {
    if (!allList.length) return []

    // console.log('cal-createNestedList', Date.now())

    let list = window.clone(allList)
    let nestedList: any[] = []
    list.map((item: any, index: number) => {
      let startList = list.slice(0, index)
      //用于918489这种情况，@不存在的人
      let startReplyUsers = Array.from(new Set(startList.map((v: any) => v.username)))

      let endList = list.slice(index + 1)

      if (index === 0) {
        nestedList.push(this.findChildren(item, endList, list))
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
            nestedList.push(this.findChildren(item, endList, list))
          }
        }
      }
    })
    // console.log('replies长度', allList)
    // console.log('nestedList长度', nestedList)

    return nestedList
  },
  //生成嵌套冗余回复
  createNestedRedundantList(allList = []) {
    if (!allList.length) return []

    // console.log('cal-createNestedList', Date.now())

    let list = window.clone(allList)
    let nestedList: any[] = []
    list.map((item: any, index: number) => {
      let startList = list.slice(0, index)
      //用于918489这种情况，@不存在的人
      let startReplyUsers = Array.from(new Set(startList.map((v: any) => v.username)))

      let endList = list.slice(index + 1)

      if (index === 0) {
        nestedList.push(this.findChildren(item, endList, list))
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
            nestedList.push(this.findChildren(item, endList, list))
          }
        } else {
          let newItem = window.clone(item)
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
  checkPhotoLink2Img(str: string) {
    if (!str) return
    try {
      let imgWebs = [
        /<a((?!<a).)*href="https?:\/\/((?!<a).)*imgur.com((?!<a).)*>(((?!<a).)*)<\/a>/g,
        /<a((?!<a).)*href="https?:\/\/((?!<a).)*\.(gif|png|jpg|jpeg|GIF|PNG|JPG|JPEG) ((?!<a).)*>(((?!<a).)*)<\/a>/g,
      ]
      imgWebs.map((v, i) => {
        let has = str.matchAll(v)
        let res2 = [...has]
        // console.log('总匹配', res2)
        res2.map(r => {
          let p = i === 0 ? r[4] : r[5]
          if (p) {
            let link = p.toLowerCase()
            let src = p
            if (
              link.includes('.png') ||
              link.includes('.jpg') ||
              link.includes('.jpeg') ||
              link.includes('.gif')
            ) {
            } else {
              src = p + '.png'
            }
            str = str.replace(r[0], `<img src="${src}" data-originUrl="${p}" data-notice="此img标签由v2ex-超级增强脚本解析" style="max-width: 100%">`)
          }
        })
      })
    } catch (e) {
      console.log('正则解析html里面的a标签的图片链接出错了')
    }
    return str
  },

  //检测帖子回复长度
  async checkPostReplies(id: string, needOpen: boolean = true) {
    return new Promise(async resolve => {
      let showJsonUrl = `${location.origin}/api/topics/show.json?id=${id}`
      let r = await fetch(showJsonUrl)
      if (r) {
        let res = await r.json()
        if (res) {
          if (res[0]?.replies > MAX_REPLY_LIMIT) {
            if (needOpen) {
              window.parse.openNewTab(`https://www.v2ex.com/t/${id}?p=1&script=1`)
            }
            return resolve(true)
          }
        }
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
  openNewTab(href: string) {
    GM_openInTab(href, {active: true});
    // let tempId = 'a_blank_' + Date.now()
    // let a = document.createElement("a");
    // a.setAttribute("href", href);
    // a.setAttribute("target", "_blank");
    // a.setAttribute("id", tempId);
    // a.setAttribute("script", '1');
    // // 防止反复添加
    // if (!document.getElementById(tempId)) {
    //   document.body.appendChild(a);
    // }
    // a.click();
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
  clone(val: any) {
    return JSON.parse(JSON.stringify(val))
  },
  feedback() {
    functions.openNewTab(DefaultVal.issue)
  }
}