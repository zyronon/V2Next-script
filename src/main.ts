import {createApp} from 'vue';
import './assets/less/index.less'

import App from './App.vue';
import {GM_notification, GM_openInTab, GM_registerMenuCommand} from "$"
import './global.d.ts'
import {CommentDisplayType, MAX_REPLY_LIMIT, PageType, Post, Reply} from "./types"

let $section = document.createElement('section')
$section.id = 'app'

function run() {
  window.baseUrl = location.origin
  window.initPost = {
    allReplyUsers: [],
    content_rendered: "",
    createDate: "",
    createDateAgo: '',
    fr: "",
    replyList: [],
    nestedReplies: [],
    nestedRedundReplies: [],
    username: '',
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
    isReport: false
  }
  //历史遗留属性
  window.win = function () {
    return window
  }
  window.win().doc = window.win().document
  window.win().query = (v: any) => window.win().document.querySelector(v)
  window.query = (v: any) => window.win().document.querySelector(v)
  //历史遗留属性

  window.clone = (val: any) => JSON.parse(JSON.stringify(val))
  window.user = {
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
  window.targetUserName = ''
  window.pageType = undefined
  window.pageData = {pageNo: 1}
  window.config = {
    showToolbar: true,
    showPreviewBtn: true,
    autoOpenDetail: true,
    openTag: true,//给用户打标签
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
    rememberLastReadFloor: true,
    autoSignin: true,
    customBgColor: '',
    version: 1,
    collectBrowserNotice: false,
  }
  window.const = {
    git: 'https://github.com/zyronon/v2ex-script',
    issue: 'https://github.com/zyronon/v2ex-script/issues'
  }
  window.currentVersion = 1
  window.isNight = $('.Night').length === 1
  window.cb = null
  window.stopMe = false
  window.postList = []
  window.parse = {
    //解析帖子内容
    async parsePostContent(post: Post, body: JQuery, htmlText: string) {
      let once = htmlText.match(/var once = "([\d]+)";/)
      // console.log(once)
      if (once && once[1]) {
        post.once = once[1]
      }

      post.isReport = htmlText.includes('你已对本主题进行了报告')

      let main = body.find('#Main')
      //如果没有正文（点的本站的a标签），才会解析正文
      if (!post.title || !post.content_rendered) {
        let h1 = main.find('h1')
        if (h1) {
          post.title = h1[0].innerText
        }
      }

      let as: any = main.find('.header > a')
      if (as.length) {
        console.log('as[1].innerText', as[1])
        post.node.title = as[1].innerText
        post.node.url = as[1].href
      }
      let aName = main.find('.header small.gray a:nth-child(1)')
      if (aName) {
        post.member.username = aName[0].innerText
      }
      let spanEl = main.find('.header small.gray span')
      if (spanEl) {
        post.createDateAgo = spanEl[0].innerText
      }

      let avatarEl: any = main.find('.header .avatar')
      console.log('avatarEl', avatarEl[0].src)
      if (avatarEl) {
        post.member.avatar_large = avatarEl[0].src
      }


      let topic_buttons = body.find('.topic_buttons')
      if (topic_buttons.length) {
        let favoriteNode = topic_buttons.find('.tb:first')
        if (favoriteNode.length) {
          post.isFavorite = favoriteNode[0].innerText === '取消收藏'
        }
        let ignoreNode = topic_buttons.find('.tb:nth-child(3)')
        if (ignoreNode.length) {
          post.isIgnore = ignoreNode[0].innerText === '取消忽略'
        }
        //
        let thankNode = topic_buttons.find('#topic_thank .tb')
        if (!thankNode.length) {
          post.isThanked = true
        }

        let topic_stats = topic_buttons.find('.topic_stats')
        //topic_stats = $(`<div class="fr topic_stats" style="padding-top: 4px;">9569 次点击 &nbsp;∙&nbsp; 28 人收藏 &nbsp; ∙&nbsp; 1 人感谢 &nbsp; </div>`)
        //收藏数、感谢数
        if (topic_stats.length) {
          let text = topic_stats[0].innerText
          let reg1 = text.matchAll(/([\d]+)[\s]*人收藏/g)
          let collectCountReg = [...reg1]
          if (collectCountReg.length) {
            post.collectCount = Number(collectCountReg[0][1])
          }
          reg1 = text.matchAll(/([\d]+)[\s]*likes/g)
          collectCountReg = [...reg1]
          if (collectCountReg.length) {
            post.collectCount = Number(collectCountReg[0][1])
          }
          // console.log([...collectCountReg])
          let reg2 = text.matchAll(/([\d]+)[\s]*人感谢/g)
          let thankCountReg = [...reg2]
          if (thankCountReg.length) {
            post.thankCount = Number(thankCountReg[0][1])
          }
          let reg3 = text.matchAll(/([\d]+)[\s]*次点击/g)
          let clickCountReg = [...reg3]
          if (clickCountReg.length) {
            post.clickCount = Number(clickCountReg[0][1])
          }
          reg3 = text.matchAll(/([\d]+)[\s]*views/g)
          clickCountReg = [...reg3]
          if (clickCountReg.length) {
            post.clickCount = Number(clickCountReg[0][1])
          }
          // console.log([...thankCountReg])
        }
      }

      // console.log('基本信息', post)

      let header = body.find('#Main .box').first()
      let temp = header.clone()
      temp.find('.topic_buttons').remove()
      temp.find('.header').remove()
      let html = temp.html()
      html = this.checkPhotoLink2Img(html)
      // console.log('html', html)
      post.headerTemplate = html
      return post
    },
    //解析OP信息
    async parseOp(post: Post) {
      // id=669181
      if (!post.member.id) {
        let userRes = await fetch(window.baseUrl + '/api/members/show.json?username=' + post.member.username)
        if (userRes.status === 200) {
          post.member = await userRes.json()
        }
      }

      if (post.member.id) {
        // console.log('userStr', userStr)
        let date = new Date(post.member.created * 1000)
        let createStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        let now = new Date()
        now.setHours(0)
        now.setMinutes(0)
        now.setSeconds(0)
        now.setMilliseconds(0)
        let d = now.getTime() - date.getTime()
        let isNew = d <= 1000 * 60 * 60 * 24 * 7
        // console.log('d', d, 'danger', danger, 'now.getTime()', now.getTime(), ' date.getTime() * 1000', date.getTime())
        post.member.createDate = createStr + ' 注册'
        post.member.isNew = isNew
      } else {
        post.member.createDate = '用户已被注销/封禁'
        post.member.isNew = true
      }
      return post
    },
    //获取帖子所有回复
    async getPostAllReplies(post: Post, body: JQuery, htmlText: string, pageNo = 1) {
      if (body.find('#no-comments-yet').length) {
        return post
      }

      let box = body.find('#Main > .box')[1]
      let cells: any = box.querySelectorAll('.cell')
      if (cells && cells.length) {
        post.fr = cells[0].querySelector('.cell .fr')!.innerHTML
        // @ts-ignore
        cells = Array.from(cells)
      }


      //获取创建时间
      let snow = cells[0].querySelector('.snow')
      post.createDate = snow?.nextSibling?.nodeValue?.trim() || ''

      let repliesMap: any[] = []
      if (cells[1].id) {
        repliesMap.push({i: pageNo, replyList: this.parsePageReplies(cells.slice(1))})
        let replyList = this.getAllReply(repliesMap)
        post.replyList = replyList
        post.replyCount = replyList.length
        post.allReplyUsers = Array.from(new Set(replyList.map((v: any) => v.username)))
        let nestedList = this.createNestedList(replyList, post.allReplyUsers)
        let nestedRedundantList = this.createNestedRedundantList(replyList, post.allReplyUsers)
        if (nestedList) post.nestedReplies = nestedList
        if (nestedRedundantList) post.nestedRedundReplies = nestedRedundantList
        return post
      } else {
        let promiseList: any = []
        // console.log(this.current.repliesMap)
        return new Promise((resolve, reject) => {
          repliesMap.push({i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1))})

          let pages = cells[1].querySelectorAll('a')
          pages = Array.from(pages)
          // console.log(pages)
          let url = window.baseUrl + '/t/' + post.id
          for (let i = 0; i < pages.length; i++) {
            let currentPageNo = Number(pages[i].innerText)
            if (currentPageNo == pageNo) continue
            promiseList.push(this.fetchPostOtherPageReplies(url + '?p=' + currentPageNo, currentPageNo))
          }
          Promise.allSettled(promiseList).then(
            (results) => {
              // @ts-ignore
              results.filter((result) => result.status === "fulfilled").map(v => repliesMap.push(v.value))
              let replyList = this.getAllReply(repliesMap)
              post.replyList = replyList
              post.replyCount = replyList.length
              post.allReplyUsers = Array.from(new Set(replyList.map((v: any) => v.username)))
              let nestedList = this.createNestedList(replyList, post.allReplyUsers)
              let nestedRedundantList = this.createNestedRedundantList(replyList, post.allReplyUsers)
              if (nestedList) post.nestedReplies = nestedList
              if (nestedRedundantList) post.nestedRedundReplies = nestedRedundantList
              resolve(post)
            }
          );
        })
      }
    },
    //请求帖子其他页的回复
    fetchPostOtherPageReplies(href: string, pageNo: number) {
      return new Promise(resolve => {
        $.get(href).then(res => {
          let s = res.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
          let box = $(s[0]).find('#Main .box')[1]
          let cells: any = box.querySelectorAll('.cell')
          cells = Array.from(cells)
          resolve({i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1))})
        }).catch((r: any) => {
          if (r.status === 403) {
            cbChecker({type: 'restorePost', value: null})
          }
        })
      })
    },
    //解析页面的回复
    parsePageReplies(nodes: Element[]): Reply[] {
      let replyList: Reply[] = []
      nodes.forEach((node, index) => {
        if (!node.id) return
        let item: Reply = {
          level: 0,
          thankCount: 0,
          isThanked: false,
          isOp: false,
          isDup: false,
          id: node.id.replace('r_', '')
        } as any
        let reply_content = node.querySelector('.reply_content')
        // console.log('reply_content',reply_content)
        item.reply_content = this.checkPhotoLink2Img(reply_content!.innerHTML)
        item.reply_text = reply_content!.textContent!

        let {users, floor} = this.parseReplyContent(item.reply_content)
        item.hideCallUserReplyContent = item.reply_content
        if (users.length === 1) {
          item.hideCallUserReplyContent = item.reply_content.replace(/@<a href="\/member\/[\s\S]+?<\/a>(\s#[\d]+)?\s(<br>)?/, () => '')
        }
        item.replyUsers = users
        item.replyFloor = floor

        let ago = node.querySelector('.ago')
        item.date = ago!.textContent!

        let userNode = node.querySelector('strong a')
        item.username = userNode!.textContent!
        let avatar = node.querySelector('td img')
        // @ts-ignore
        item.avatar = avatar!.src!
        let no = node.querySelector('.no')
        item.floor = Number(no!.textContent)

        let thank_area = node.querySelector('.thank_area')
        if (thank_area) {
          item.isThanked = thank_area.classList.contains('thanked')
        }
        let small = node.querySelector('.small')
        if (small) {
          item.thankCount = Number(small.textContent)
        }
        let op = node.querySelector('.op')
        if (op) {
          item.isOp = true
        }
        let mod = node.querySelector('.mod')
        if (mod) {
          item.isMod = true
        }
        // console.log('item', item)

        replyList.push(item)
      })
      return replyList
    },
    //解析回复内容，解析出@用户，回复楼层。用于后续生成嵌套楼层
    parseReplyContent(str: string) {
      if (!str) return
      let users: any = []
      let getUsername = (userStr: string) => {
        let endIndex = userStr.indexOf('">')
        if (endIndex > -1) {
          let user: string = userStr.substring(0, endIndex)
          if (!users.find((i: any) => i === user)) {
            users.push(user)
          }
        }
      }
      // str = `@<a hr a> #4 @<a1 href="/member/Eiden1">Eiden1</a1>   @<a href="/member/Eiden111">Eiden21</a> #11   这也是执行阶段，所谓的安装也是程序业务的 setup 。<br>windows 、Android 并没有系统级的 CD-KEY 。`
      let userReg = /@<a href="\/member\/([\s\S]+?)<\/a>/g
      let has = str.matchAll(userReg)
      let res2 = [...has]
      // console.log('总匹配', res2)
      if (res2.length > 1) {
        res2.map(item => {
          getUsername(item[1])
        })
      }
      if (res2.length === 1) {
        getUsername(res2[0][1])
      }
      // console.log('用户', users)
      // console.log('楼层', floor)
      let floor = -1
      //只有@一个人的时候才去查找是否指定楼层号。
      if (users.length === 1) {
        let floorReg = /@<a href="\/member\/[\s\S]+?<\/a>[\s]+#([\d]+)/g
        let hasFloor = str.matchAll(floorReg)
        let res = [...hasFloor]
        // console.log('总匹配', res)
        if (res.length) {
          floor = Number(res[0][1])
        }
      }
      return {users, floor}
    },
    //获取帖子详情
    async getPostDetail(post: Post, body: JQuery, htmlText: string, pageNo = 1) {
      post = await this.parsePostContent(post, body, htmlText)
      return await this.getPostAllReplies(post, body, htmlText, pageNo)
    },
    //获取所有回复
    getAllReply(repliesMap = []) {
      return repliesMap.sort((a: any, b: any) => a.i - b.i).reduce((pre, i: any) => {
        pre = pre.concat(i.replyList)
        return pre
      }, [])
    },
    //生成嵌套回复
    createNestedList(allList = []) {
      if (!allList.length) return []
      if ((Date.now() - window.win().lastCallDate) < 1000) {
        // console.log('短时间内，重复调用,因为监听了replies,所以打开时会触发两次。第二次不管他')
        return false
      }
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
              item.level === 0
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
      if ((Date.now() - window.win().lastCallDate) < 1000) {
        // console.log('短时间内，重复调用,因为监听了replies,所以打开时会触发两次。第二次不管他')
        return false
      }
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
              item.level === 0
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
      window.win().lastCallDate = Date.now()
      return nestedList
    },
    //查找子回复
    findChildren(item: any, endList: any[], all: any[]) {
      const fn = (child: any, endList2: any[], parent: any) => {
        child.level = parent.level + 1
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
    //解析页面帖子列表
    parsePagePostList(list: any[], box: any) {
      list.forEach(itemDom => {
        let item = window.clone(window.initPost)
        let item_title = itemDom.querySelector('.item_title a')
        let {href, id} = window.parse.parseA(item_title)
        item.id = id
        item.href = href
        item.url = location.origin + '/api/topics/show.json?id=' + item.id
        itemDom.classList.add('post-item')
        itemDom.classList.add(`id_${id}`)
        itemDom.dataset['href'] = href
        itemDom.dataset['id'] = id
        window.postList.push(item)
      })
      Promise.allSettled(window.postList.map(item => $.get(item.url))).then(res => {
        let ok = res.filter((r) => r.status === "fulfilled").map((v: any) => v.value[0])
        // let fail = res.filter((r) => r.status === "rejected")
        box.style.boxShadow = 'unset'
        box.style.background = 'unset'
        if (window.config.viewType === 'card') {
          list.forEach(itemDom => itemDom.classList.add('preview'))
        }
        ok.map(postItem => {
          if (postItem?.id) {
            let itemDom = box.querySelector(`.id_${postItem.id}`)

            if (window.config.showPreviewBtn) {
              //添加切换按钮
              let td = itemDom.querySelector('td:nth-child(4)')
              td.style.position = 'relative'
              let toggle = document.createElement('div')
              toggle.dataset['id'] = postItem.id
              toggle.classList.add('toggle')
              toggle.innerText = '点击展开/收起'
              td.append(toggle)
            }

            let index = window.postList.findIndex(v => v.id == postItem.id)
            if (index > -1) {
              let obj = window.postList[index]
              window.postList[index] = Object.assign({}, obj, postItem)

              if (postItem.content_rendered) {
                let a = document.createElement('a')
                a.href = obj.href
                a.classList.add('post-content')
                let div = document.createElement('div')
                div.innerHTML = postItem.content_rendered
                a.append(div)
                // console.log(div.clientHeight)
                itemDom.append(a)
                // show More
                if (div.clientHeight < 172) {
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
            }
          }
        })
        cbChecker({type: 'syncData'})
      })
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
    //创建记事本子条目
    async createNoteItem(itemName: string) {
      return new Promise(async resolve => {
        let data: any = new FormData()
        data.append('content', itemName)
        data.append('parent_id', 0)
        data.append('syntax', 0)
        let apiRes = await window.win().fetch(`${window.baseUrl}/notes/new`, {method: 'post', body: data})
        console.log(apiRes)
        if (apiRes.redirected && apiRes.status === 200) {
          resolve(apiRes.url.substr(-5))
          return
        }
        resolve(null)
      })
    },
    //编辑记事本子条目
    async editNoteItem(val: string, id: string) {
      let data: any = new FormData()
      data.append('content', val)
      data.append('syntax', 0)
      let apiRes = await window.fetch(`${window.baseUrl}/notes/edit/${id}`, {
        method: 'post', body: data
      })
      return apiRes.redirected && apiRes.status === 200;
    },
    //标签操作
    async saveTags(val: any) {
      for (const [key, value] of Object.entries(val)) {
        if (!(value as any[]).length) delete val[key]
      }
      return await this.editNoteItem(window.user.tagPrefix + JSON.stringify(val), window.user.tagsId)
    },
    //已读楼层操作
    async saveReadList(val: any) {
      return await this.editNoteItem(window.user.readPrefix + JSON.stringify(val), window.user.readNoteItemId)
    },
    //imgur图片删除hash操作
    async saveImgurList(val: any) {
      return await this.editNoteItem(window.user.imgurPrefix + JSON.stringify(val), window.user.imgurNoteId)
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
    }
  }
  window.functions = {
    feedback() {
      window.parse.openNewTab(window.const.issue)
    }
  }

  async function sleep(time: number) {
    return new Promise(resolve => {
      // console.log('等待vue加载完成,第' + count + '次', Date.now())
      setTimeout(resolve, time)
    })
  }

  async function cbChecker(val: any, count = 0) {
    if (window.cb) {
      window.cb(val)
    } else {
      while ((!window.cb) && count < 30) {
        await sleep(500)
        count++
      }
      window.cb && window.cb(val)
    }
  }

  //初始化脚本菜单
  function initMonkeyMenu() {
    try {
      GM_registerMenuCommand("脚本设置", () => {
        cbChecker({type: 'openSetting'})
      });
      GM_registerMenuCommand('仓库地址', () => {
        window.parse.openNewTab(window.const.git)
      });
      GM_registerMenuCommand('反馈 & 建议', window.functions.feedback);
    } catch (e) {
      console.error('无法使用Tampermonkey')
    }
  }

  //初始化样式表
  function initStyle() {
    //给Wrapper和content取消宽高，是因为好像是v2的屏蔽机制，时不时会v2会修改这两个div的宽高，让网页变形
    let style2 = `
       html, body {
            font-size: 62.5%;
        }
        
::-webkit-scrollbar {
  width: 1rem;
  height: 1rem;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: .2rem;
}

::-webkit-scrollbar-thumb {
  background: rgb(147, 173, 227);
  border-radius: 1rem;
}
        :root{
          --box-border-radius:8px;
            .Night{
               --box-foreground-color:rgb(173, 186, 199);
            }
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
          right: ${window.config.viewType === 'simple' ? '5rem' : 0};
          top: 0.5rem;
          width: 9rem;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          cursor: pointer;
          font-size: 1.2rem;
          color: #ccc;
          display: none;
      }

      .preview {
          margin: 1rem 0;
          border: 1px solid transparent;
          border-radius: var(--box-border-radius);
          cursor: pointer;
      }

      .preview:hover {
          border: 1px solid #c8c8c8;
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
      
      ${
      window.config.viewType === 'simple' ? `
      ${window.pageType !== PageType.Member ? `
      .item table tr td:first-child{display:none;}
      #Rightbar .cell table:first-child tr td:first-child{display:none;}
      .item table tr td .sep5{display:none;}
      .item table tr td .topic_info{display:none;}
      .item {border-bottom:none;}
      .avatar,#avatar{display:none;}
      ` : ''}
      
      #Logo {background-image:url('https://i.imgur.com/i9VgUtM.png');}
       .bigger a, .top:nth-last-child(5){color: transparent!important;text-shadow: #b0b0b0 0 0 6px;user-select: none;}
      // .bigger a:before,.top:nth-last-child(5):before{content:'Mona Lisa';position: absolute;background: white;}
      #Rightbar .cell table:first-child tr td:first-child{display:none;}
      ` : ''}

      ${window.config.customBgColor ? `#Wrapper {
          background-color: ${window.config.customBgColor} !important;
          background-image: unset !important;
        }` : ''}
        
        
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

    `
    let addStyle2: HTMLStyleElement = document.createElement("style");
    // @ts-ignore
    addStyle2.rel = "stylesheet";
    addStyle2.type = "text/css";
    addStyle2.innerHTML = style2
    window.document.head.append(addStyle2)
  }

  // 自动签到（后台）
  function qianDao() {
    let timeNow = new Date().getUTCFullYear() + '/' + (new Date().getUTCMonth() + 1) + '/' + new Date().getUTCDate() // 当前 UTC-0 时间（V2EX 按这个时间的）
    // return qianDao_(null, timeNow); //                           后台签到
    if (window.pageType === PageType.Home) { //                               在首页
      let qiandao = window.query('.box .inner a[href="/mission/daily"]');
      if (qiandao) { //                                            如果找到了签到提示
        qianDao_(qiandao, timeNow); //                           后台签到
      } else if (window.win().doc.getElementById('gift_v2excellent')) { // 兼容 [V2ex Plus] 扩展
        window.win().doc.getElementById('gift_v2excellent').click();
        localStorage.setItem('menu_clockInTime', timeNow); //             写入签到时间以供后续比较
        console.info('[V2EX - 超级增强] 自动签到完成！')
      } else { //                                                  都没有找到，说明已经签过到了
        console.info('[V2EX - 超级增强] 自动签到完成！')
      }
    } else { //                                                      不在首页
      let timeOld = localStorage.getItem('menu_clockInTime')
      if (!timeOld || timeOld != timeNow) {
        qianDaoStatus_(timeNow) //                               后台获取签到状态（并判断是否需要签到）
      } else { //                                                新旧签到时间一致
        console.info('[V2EX - 超级增强] 自动签到完成！')
      }
    }
  }

  // 后台签到
  function qianDao_(qiandao: any, timeNow: any) {
    // let url = window.baseUrl + "/mission/daily"
    // @ts-ignore
    let url = (window.baseUrl + "/mission/daily/redeem?" + RegExp("once\\=(\\d+)").exec(document.querySelector('div#Top .tools, #menu-body').innerHTML)[0]);
    console.log('url', url)
    $.get(url).then(r => {
      let bodyText = r.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
      let html = $(bodyText[0])
      if (html.find('li.fa.fa-ok-sign').length) {
        // @ts-ignore
        html = html.find('#Main').text().match(/已连续登录 (\d+?) 天/)[0];
        localStorage.setItem('menu_clockInTime', timeNow); // 写入签到时间以供后续比较
        console.info('[V2EX - 超级增强] 自动签到完成！')
        if (qiandao) {
          qiandao.textContent = `自动签到完成！${html}`;
          qiandao.href = 'javascript:void(0);';
        }
      } else {
        GM_notification({
          text: '自动签到失败！请关闭其他插件或脚本。\n如果连续几天都签到失败，请联系作者解决！',
          timeout: 4000,
          onclick() {
            window.functions.feedback()
          }
        });
        console.warn('[V2EX 增强] 自动签到失败！请关闭其他插件或脚本。如果连续几天都签到失败，请联系作者解决！')
        if (qiandao) qiandao.textContent = '自动签到失败！请尝试手动签到！';
      }
    })
  }

  // 后台获取签到状态（并判断是否需要签到）
  function qianDaoStatus_(timeNow: any) {
    $.get(window.baseUrl + '/mission/daily').then(r => {
      let bodyText = r.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
      let html = $(bodyText[0])
      if (html.find('input[value^="领取"]').length) { //     还没有签到...
        qianDao_(null, timeNow); //                          后台签到
      } else { //                                              已经签到了...
        console.info('[V2EX 增强] 已经签过到了。')
        localStorage.setItem('menu_clockInTime', timeNow); //         写入签到时间以供后续比较
      }
    })
  }

  //检测页面类型
  function checkPageType() {
    let l = window.location
    if (l.pathname === '/') {
      window.pageType = PageType.Home
    } else if (l.href.match(/.com\/?tab=/)) {
      window.pageType = PageType.Home
    } else if (l.href.match(/.com\/go\//)) {
      if (!l.href.includes('/links')) {
        window.pageType = PageType.Node
      }
    } else if (l.href.match(/.com\/recent/)) {
      window.pageType = PageType.Home
    } else if (l.href.match(/.com\/member/)) {
      window.pageType = PageType.Member
    } else {
      let r = l.href.match(/.com\/t\/([\d]+)/)
      if (r) {
        window.pageType = PageType.Post
        window.pageData.id = r[1]
        if (l.search) {
          let pr = l.href.match(/\?p=([\d]+)/)
          if (pr) window.pageData.pageNo = Number(pr[1])
        }
      }
    }
  }

  //获取记事本条目内容
  function getNoteItemContent(id: string, prefix: string) {
    return new Promise((resolve, reject) => {
      $.get(window.baseUrl + '/notes/edit/' + id).then(r2 => {
        let bodyText = r2.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
        let body = $(bodyText[0])
        let text = body.find('.note_editor').text()
        if (text === prefix) {
          resolve({})
        } else {
          let tagJson = text.substring(prefix.length)
          try {
            resolve(JSON.parse(tagJson))
          } catch (e) {
            console.log('tage', tagJson)
            resolve({})
          }
        }
      })
    })
  }

  //初始化记事本数据
  async function initNoteData() {
    //获取或创建记事本的标签
    $.get(window.baseUrl + '/notes').then(async r => {
      let bodyText = r.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
      let body = $(bodyText[0])
      let items: HTMLAnchorElement[] = body.find('#Main .box .note_item_title a') as any

      let tagItem = Array.from(items).find(v => v.innerText.includes(window.user.tagPrefix))
      if (tagItem) {
        window.user.tagsId = tagItem.href.substr(-5)
        window.user.tags = await getNoteItemContent(window.user.tagsId, window.user.tagPrefix,)
      } else {
        let r = await window.parse.createNoteItem(window.user.tagPrefix)
        r && (window.user.tagsId = r);
      }

      let readItem = Array.from(items).find(v => v.innerText.includes(window.user.readPrefix))
      if (readItem) {
        window.user.readNoteItemId = readItem.href.substr(-5)
        window.user.readList = await getNoteItemContent(window.user.readNoteItemId, window.user.readPrefix)
      } else {
        let r = await window.parse.createNoteItem(window.user.readPrefix)
        r && (window.user.readNoteItemId = r);
      }

      let imgurItem = Array.from(items).find(v => v.innerText.includes(window.user.imgurPrefix))
      if (imgurItem) {
        window.user.imgurNoteId = imgurItem.href.substr(-5)
        window.user.imgurList = await getNoteItemContent(window.user.imgurNoteId, window.user.imgurPrefix)
      } else {
        let r = await window.parse.createNoteItem(window.user.imgurPrefix)
        r && (window.user.imgurNoteId = r);
      }

      cbChecker({type: 'syncData'})
    })
  }

  //从本地读取配置
  function initConfig() {
    return new Promise(resolve => {
      //获取默认配置
      let configStr = window.localStorage.getItem('v2ex-config')
      if (configStr) {
        let configObj = JSON.parse(configStr)
        configObj = configObj[window.user.username ?? 'default']
        if (configObj) {
          window.config = Object.assign(window.config, configObj)
        }
      }
      resolve(window.config)
    })
  }

  function addSettingText() {
    let setting = $(`<a href="javascript:void 0;" class="top ${window.config.version < window.currentVersion ? 'new' : ''}">脚本设置</a>`)
    setting.on('click', function () {
      this.classList.remove('new')
      cbChecker({type: 'openSetting'})
    })
    $('.tools').prepend(setting)
  }

  async function init() {
    //监听图片加载失败事件，有的imgur图片填的是分享地址，无法转换。
    //例如：https://imgur.com/a/Gl0ifQ7，这种加上.png也显示不出来，就需要显示原地址
    window.addEventListener('error', (e: Event) => {
      let dom: HTMLImageElement = e.target as any
      let originImgUrl = dom.getAttribute('data-originurl')
      if (originImgUrl) {
        let a = document.createElement('a')
        a.href = originImgUrl
        a.setAttribute('notice', '此标签由v2ex超级增强脚本转换图片失败后恢复')
        a.innerText = originImgUrl
        dom.parentNode!.replaceChild(a, dom,)
      }
    }, true)

    if (window.isNight) {
      document.documentElement.classList.add('dark')
    }

    checkPageType()
    initMonkeyMenu()

    let top2 = document.querySelector('.tools .top:nth-child(2)')
    if (top2 && top2.textContent !== '注册') {
      window.user.username = top2.textContent
      window.user.avatar = $('#Rightbar .box .avatar').attr('src')

      initNoteData()
    }



    initConfig().then(r => {
      //这个要放后面，不然前面查找会出错
      addSettingText()

      initStyle()

      try {
        if (window.config.autoSignin && window.user.username) {
          qianDao()
        }
      } catch (e) {
        console.log('签到失败')
      }
    })

    let box: any
    let list
    // console.log(window.pageType)
    switch (window.pageType!) {
      case  PageType.Node:
        box = window.win().doc.querySelectorAll('#Wrapper #Main .box')

        let topics = box[1].querySelector('#TopicsNode')
        list = topics.querySelectorAll('.cell')
        list[0].before($section)
        window.parse.parsePagePostList(list, box[1])
        break
      case  PageType.Home:
        box = document.querySelector('#Wrapper #Main .box')
        list = box!.querySelectorAll('.item')
        list[0].before($section)
        window.parse.parsePagePostList(list, box)
        break
      case  PageType.Post:
        box = document.querySelector('#Wrapper #Main .box')
        // @ts-ignore
        box.after($section)

        let r = await window.parse.checkPostReplies(window.pageData.id, false)
        if (r) {
          window.stopMe = true
          alert('由于回复数量较多，脚本已停止解析楼中楼')
          return cbChecker({type: 'syncData'})
        }

        //如果设置了postWidth才去执行。因为修改Main的宽度会导致页面突然变宽或变窄
        if (window.config.postWidth) {
          //Rightbar的css样式是float，因为自定义帖子宽度的话需要把content改为flex。
          //Rightbar的float就失效了，所以把他移动右边
          let Main = $('#Main')
          Main.css({
            'width': window.config.postWidth,
            margin: 'unset',
          })
          $('#Wrapper > .content').css({
            'max-width': 'unset',
            display: 'flex',
            'justify-content': 'center',
            gap: '20px'
          })
          Main.after($('#Rightbar'))
        }

        let post = Object.assign({}, window.clone(window.initPost), {id: window.pageData.id})
        let body = $(window.win().doc.body)
        let htmlText = window.win().doc.documentElement.outerHTML

        window.parse.parsePostContent(
          post,
          body,
          htmlText
        ).then(async (res: any) => {
          // console.log('详情页-基本信息解析完成', Date.now())
          await cbChecker({type: 'postContent', value: res}, 0)

          let opRes = await window.parse.parseOp(res)
          // console.log('详情页-OP信息解析完成', Date.now())
          await cbChecker({type: 'postOp', value: opRes}, 0)
        })

        window.parse.getPostAllReplies(
          post,
          body,
          htmlText,
          window.pageData.pageNo
        ).then(async (res: any) => {
          // console.log('详情页-回复解析完成', Date.now())
          await cbChecker({type: 'postReplies', value: res}, 0)
        })
        break
      case PageType.Member:
        box = document.querySelector('#Wrapper #Main .box')!
        if (box) {
          window.targetUserName = box.querySelector('h1')!.textContent!
          box.after($section)

          if (window.config.openTag) {
            //移除box的bottom样式，让和vue的div融为一体
            box.style.borderBottom = 'none'
            box.style['border-bottom-left-radius'] = '0'
            box.style['border-bottom-right-radius'] = '0'
          }
        }
        break
      default:
        window.stopMe = true
        cbChecker({type: 'syncData'})
        console.error('未知页面')
        break
    }
  }

  window.canParseV2exPage = !window.location.search.includes('script')
  if (window.canParseV2exPage) {
    init()
  } else {
    window.stopMe = true
    cbChecker({type: 'syncData'})
    if (window.location.search.includes('script=0')) {
      alert('脚本无法查看此主题，已为您单独打开此主题')
    }
    if (window.location.search.includes('script=1')) {
      alert('由于回复数量较多，已为您单独打开此主题并停止解析楼中楼')
    }
  }
}

run()
let vueApp = createApp(App)
vueApp.config.unwrapInjectedRef = true
vueApp.mount($section);
