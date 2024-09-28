import {
  classicsEmoticons,
  DefaultConfig,
  DefaultPost,
  DefaultUser,
  DefaultVal,
  functions,
  getDefaultConfig,
  getDefaultPost
} from "@v2next/core";
import { PageType, Post, Reply } from "@v2next/core/types"


function sendFlutter(val) {
  return
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  if (import.meta.env.PROD) {
    Channel.postMessage(val)
  } else {
    console.log(val)
    val = val.replaceAll(/\\n|\\r|\\t/g, '')
    val = val.replaceAll('\"', '\\"')
    val = val.replaceAll('\'', '\\\'')
    console.log(val)
  }
}

async function getHtml(url) {
  url = location.origin + url;
  console.log('js-请求的url' + url)
  let apiRes = await window.fetch(url);
  let htmlText = await apiRes.text();
  return functions.genDomFromHtmlString(htmlText)
}

async function bridge_getPost(id) {
  console.log('getPost', id)
  sendFlutter({ type: '开始请求' + id });
  let url = location.origin + '/t/' + id;
  let apiRes = await window.fetch(url + '?p=1');
  let htmlText = await apiRes.text();
  let bodyText = htmlText.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
  let body = $(bodyText[0])
  let post = getDefaultPost()
  post.id = String(id)
  await window.parse.getPostDetail(post, body, htmlText)

  // sendFlutter({ type: '帖子内容' });
  sendFlutter({ type: 'post', data: post });
  return post
}

async function bridge_getNodePostList(node, el?) {
  window.postList = []
  console.log('js-bridge_getNodePostList', node)
  if (!el) el = await getHtml('/?tab=' + node)
  let box = el.querySelector('#Wrapper .box')
  let list = box!.querySelectorAll('.item')
  window.parse.parsePagePostList(list, box)
  // sendFlutter({ type: '发送主页列表' });
  // sendFlutter(window.postList);
  sendFlutter({ type: "list", node, data: window.postList });
  console.log('window.postList', window.postList.length)
  return JSON.stringify(window.postList)
}

async function login() {
  let pwdEl = $('input[type="password"]')
  let inputs = $('input[type="text"].sl')
  let acc = $(inputs[0])
  let code = $(inputs[1])

  let data = new FormData()
  data.append('next', '/')
  data.append(acc.attr('name'), acc.val())
  data.append('once', $('input[name="once"]').val())
  data.append(pwdEl.attr('name'), pwdEl.val())
  data.append(code.attr('name'), code.val())
  let r = await fetch('https://www.v2ex.com/signin', {
    method: 'POST',
    body: data
  })
  console.log('r', r,)

  if (r.redirected) {

  }
  //如果重定义的url是和next的一致，就说明登录成功
  if (r.url === location.origin + '/') {

  } else {
    let htmlText = await r.text()
    let dom = functions.genDomFromHtmlString(htmlText)

    console.log('htmlText', htmlText)
    console.log('dd', dom)
    //登录次数过多
    if (r.url.includes('cooldown')) {
      // let desc = $(dom).$('#Wrapper .box').text()
    }
    //登录失败
    if (r.url === location.origin + '/signin') {
      let messageEl = dom.querySelector('.message')
      let problemEl = dom.querySelector('.problem')
      // let desc = $(dom).$('.problem').html()
      if (messageEl) {
        console.log(messageEl.textContent)
      }
      if (problemEl) {
        console.log(problemEl.innerHTML)
      }
    }
  }

  //https://www.v2ex.com/signin/cooldown #Wrapper .box
}

window.login = login
window.jsBridge = async (type, ...args) => {
  console.log('js-调用jsBridge:', type, ':', ...args)
  switch (type) {
    case 'getPost':
      return await bridge_getPost(...args)
    case 'getNodePostList':
      return await bridge_getNodePostList(...args)
  }
}

window.jsFunc = {
  async getLoginPageInfo() {
    let r = await fetch('https://www.v2ex.com/signin', {
      referrer: "https://www.v2ex.com/signin",
      headers: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
      }
    })
    let htmlText = await r.text()
    let dom = $(functions.genDomFromHtmlString(htmlText))
    if (r.redirected) {
      let desc = dom.find('#Wrapper .box').html()
      console.log('cooldown', desc)
      return { error: true, msg: desc }
    } else {
      let pwdEl = dom.find('input[type="password"]')
      let inputs = dom.find('input[type="text"].sl')
      let acc = dom.find(inputs[0])
      let code = dom.find(inputs[1])
      // console.log('htmlText', htmlText)
      // console.log('dd', dom)
      let data = {
        once: dom.find('input[name="once"]').val(),
        accKey: acc.attr('name'),
        pwdKey: pwdEl.attr('name'),
        codeKey: code.attr('name'),
        img: '_captcha',
        code: ''
      }
      // data.img += '?once=' + data.once
      // return JSON.stringify({error: false, data})
      let base64 = await this.getImgBase64(data.once)
      data.img = base64

      console.log('data', JSON.stringify(data))

      return { error: false, data }
    }
  },
  async login(form) {
    console.log('login', form);
    form.acc = 'ttentau1'
    form.pwd = 'o8949488816'
    // form.code = ''
    let data = new FormData()
    data.append('next', '/')
    data.append(form.accKey, form.acc)
    data.append('once', form.once)
    data.append(form.pwdKey, form.pwd)
    data.append(form.codeKey, form.code)
    let r = await fetch('https://www.v2ex.com/signin', {
      method: 'POST',
      body: data,
      referrer: "https://www.v2ex.com/signin",
      headers: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
      }
    })
    console.log('r', r,)
    console.log('r.url', r.url, location.origin, r.redirected)

    let htmlText = await r.text()
    let dom = $(functions.genDomFromHtmlString(htmlText))

    //如果重定义的url是和next的一致，就说明登录成功
    if (r.url === location.origin + '/') {
      let top2 = dom.find('#menu-body .cell:first .top:first')
      if (top2.length && ['个人主页', 'Profile'].includes(top2.text())) {
        let username = top2.attr('href').replace('/member/', '')
        let avatar = dom.find('#menu-entry .avatar').attr('src')
        console.log('登录成功')
        return {
          error: false, data: {
            username,
            avatar
          }
        }
      } else {
        console.log('登录失败')
        return { error: true }
      }
    } else {
      // console.log('htmlText', htmlText)
      // console.log('dd', dom)
      //登录次数过多
      if (r.url.includes('cooldown')) {
        let desc = dom.find('#Wrapper .box').text()
        console.log('cooldown', desc)
      }
      //登录失败
      if (r.url === location.origin + '/signin') {
        let messageEl = dom.find('.message')
        let problemEl = dom.find('.problem')
        // let desc = $(dom).$('.problem').html()
        if (messageEl) {
          console.log('msg', messageEl.text())
        }
        if (problemEl) {
          console.log('problem', problemEl.html())
        }
      }
      return { error: true }
    }
  },
  async getImg(once) {
    let img = document.createElement('img');
    img.style = 'width:100vw';
    img.src = 'https://www.v2ex.com/_captcha?once=' + once
    document.body.append(img);
    return
    let r = await fetch('https://www.v2ex.com/_captcha?once=' + once, {
      referrer: "https://www.v2ex.com/signin"
    })
    let blob = await r.blob()

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      let img = document.createElement('img');
      img.style = 'width:100vw';
      img.src = e.target.result
      document.body.append(img);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  },
  async getImgBase64(once) {
    return new Promise(async resolve => {
      let r = await fetch('https://www.v2ex.com/_captcha?once=' + once, {
        referrer: "https://www.v2ex.com/signin"
      })
      let blob = await r.blob()
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(e.target.result.split(',')[1])
      };
      // readAsDataURL
      fileReader.readAsDataURL(blob);
      fileReader.onerror = () => {
        reject(new Error('blobToBase64 error'));
      };
    })
  },
  async getNodePostList(node, el?) {
    window.postList = []
    console.log('js-bridge_getNodePostList', node)
    if (!el) el = await getHtml('/?tab=' + node)
    let box = el.querySelector('#Wrapper .box')
    let list = box!.querySelectorAll('.item')
    window.parse.parsePagePostList(list, box)
    // sendFlutter({ type: '发送主页列表' });
    // sendFlutter(window.postList);
    sendFlutter({ type: "list", node, data: window.postList });
    console.log('window.postList', window.postList.length)
    return {
      error: false,
      data: window.postList
    }
  },
  async getPost(id) {
    console.log('getPost', id)
    sendFlutter({ type: '开始请求' + id });
    let url = location.origin + '/t/' + id;
    let apiRes = await window.fetch(url + '?p=1');
    let htmlText = await apiRes.text();
    let bodyText = htmlText.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
    let body = $(bodyText[0])
    let post = getDefaultPost()
    post.id = String(id)
    await window.parse.getPostDetail(post, body, htmlText)
    console.log('getPost', post)
    window.post = post
    return post
  },
  async reply(data: { content: string, post: Post }) {
    const { content, post } = data
    let submit_content = content.replace(/\[((?!\[).)+\]/g, function (match) {
      let item = classicsEmoticons.find(v => v.name === match)
      if (item) {
        return item.low + ' '
      }
      return match
    })

    //转换上传的图片
    let show_content = content.replace(/https?:\/\/(i\.)?imgur\.com\/((?!http).)+\.(gif|png|jpg|jpeg|GIF|PNG|JPG|JPEG)/g, function (match) {
      return `<img src="${match}" data-originUrl="${match}" data-notice="这个img标签由v2ex-超级增强脚本解析" style="max-width: 100%">`
    })

    //转换表情
    show_content = show_content.replace(/\[((?!\[).)+\]/g, function (match) {
      let item = classicsEmoticons.find(v => v.name === match)
      if (item) {
        return `<a target="_blank" href="${item.low}" rel="nofollow noopener"><img src="${item.low}" class="embedded_image" rel="noreferrer"></a> `
      }
      return match
    })

    let matchUsers = show_content.match(/@([\w]+?[\s])/g)
    if (matchUsers) {
      matchUsers.map(i => {
        let username = i.replace('@', '').replace(' ', '')
        show_content = show_content.replace(username, `<a href="/member/${username}">${username}</a>`)
      })
    }

    show_content = show_content.replaceAll('\n', '<br/>')

    // loading.value = false
    // console.log('show_content', show_content)

    let item = {
      thankCount: 0,
      isThanked: false,
      isOp: post.username === window.user.username,
      isDup: false,
      id: Date.now(),
      username: window.user.username,
      avatar: window.user.avatar,
      date: '几秒前',
      floor: post.replyCount + 1,
      reply_content: show_content ?? '',
      children: [],
      // replyUsers: replyUser ? [replyUser] : [],
      // replyFloor: replyFloor || -1,
      // level: useType === 'reply-comment' ? 1 : 0
    }

    item.hideCallUserReplyContent = item.reply_content
    if (item.replyUsers.length === 1) {
      item.hideCallUserReplyContent = item.reply_content.replace(/@<a href="\/member\/[\s\S]+?<\/a>(\s#[\d]+)?\s(<br>)?/, () => '')
    }
    // console.log('回复', item)
    // loading.value = false
    // return

    // loading.value = false
    // content.value = replyInfo
    // eventBus.emit(CMD.REFRESH_ONCE,)
    // eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '回复成功'})
    // eventBus.emit(CMD.ADD_REPLY, item)
    // emits('close')
    // return console.log('item', item)

    post.replyList.push(item)
    return post
    // let url = `${location.origin}/t/${post.id}`
    // $.post(url, { content: submit_content, once: post.once }).then(
    //   // $.post(url, {content: submit_content, once: 123}).then(
    //   res => {
    //     // console.log('回复', res)
    //     loading.value = false
    //     let r = res.search('你上一条回复的内容和这条相同')
    //     if (r > -1) return eventBus.emit(CMD.SHOW_MSG, { type: 'error', text: '你上一条回复的内容和这条相同' })
    //
    //     r = res.search('请不要在每一个回复中都包括外链，这看起来像是在 spamming')
    //     if (r > -1) return eventBus.emit(CMD.SHOW_MSG, {
    //       type: 'error',
    //       text: '请不要在每一个回复中都包括外链，这看起来像是在 spamming'
    //     })
    //
    //     let r2 = res.search('创建新回复')
    //     if (r2 > -1) {
    //       eventBus.emit(CMD.REFRESH_ONCE, res)
    //       eventBus.emit(CMD.SHOW_MSG, { type: 'error', text: '回复出现了问题，请使用原版进行回复' })
    //       let clientWidth = window.document.body.clientWidth
    //       let windowWidth = 1200
    //       let left = clientWidth / 2 - windowWidth / 2
    //       let newWin = window.open("创建新回复", "", `width=${windowWidth},height=600,left=${left},top=100`);
    //       newWin.document.write(res);
    //
    //       let loop = setInterval(function () {//监听子页面关闭事件,轮询时间1000毫秒
    //         if (newWin.closed) {
    //           clearInterval(loop);
    //           eventBus.emit(CMD.REFRESH_POST)
    //         }
    //       }, 1000);
    //       return
    //     }
    //     // content.value = replyInfo
    //     emits('close')
    //     eventBus.emit(CMD.REFRESH_ONCE, res)
    //     eventBus.emit(CMD.SHOW_MSG, { type: 'success', text: '回复成功' })
    //     eventBus.emit(CMD.ADD_REPLY, item)
    //   },
    //   err => {
    //     console.log('err', err)
    //     loading.value = false
    //     eventBus.emit(CMD.SHOW_MSG, { type: 'error', text: '回复失败' })
    //   }
    // ).catch(r => {
    //   console.log('catch', r)
    // })
  }
}


window.initPost = getDefaultPost()
//历史遗留属性
window.win = function () {
  return window
}
window.win().doc = window.win().document
window.win().query = (v: any) => window.win().document.querySelector(v)
window.query = (v: any) => window.win().document.querySelector(v)
//历史遗留属性

window.clone = (val: any) => JSON.parse(JSON.stringify(val))
window.user = DefaultUser
window.targetUserName = ''
window.pageType = undefined
window.pageData = { pageNo: 1 }
window.config = { ...DefaultConfig, ...{ viewType: 'card' } }
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

    let wrapperClass = 'Wrapper'
    let wrapper
    let boxs

    if (body.length > 1) {
      body.each(function () {
        if (this.id === wrapperClass) {
          wrapper = $(this)
          boxs = this.querySelectorAll('.box')
        }
      })
    } else {
      wrapper = body
      boxs = body.find(`#${wrapperClass} .box`)
    }

    let box1 = $(boxs[0])
    let header1 = wrapper.find('.header')

    //如果没有正文（点的本站的a标签），才会解析正文
    if (!post.title || !post.content_rendered) {
      let h1 = wrapper.find('h1')
      if (h1) {
        post.title = h1[0].innerText
      }
    }


    let as: any = wrapper.find('.header > a')
    if (as.length) {
      // console.log('as[1].innerText', as[1])
      post.node.title = as[1].innerText
      post.node.url = as[1].href
    }

    let aName = header1.find('small.gray a:nth-child(1)')
    if (aName) {
      post.member.username = aName[0].innerText
    }

    let small = header1.find('small.gray')
    if (small[0]) {
      let spanEl = small[0]?.lastChild?.nodeValue
      if (spanEl) {
        let dianIndex = spanEl.indexOf('·')
        post.createDateAgo = spanEl.substring(4, dianIndex - 1)
        let text = spanEl.substring(dianIndex + 1).trim()
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
      }
    }

    let avatarEl: any = header1.find('.avatar')
    if (avatarEl) {
      post.member.avatar_large = avatarEl[0].src
    }

    let topic_buttons = box1.find('.inner .fr')
    if (topic_buttons.length) {
      let favoriteNode = topic_buttons.find('.op:first')
      if (favoriteNode.length) {
        post.isFavorite = favoriteNode[0].innerText === '取消收藏'
      }
      let ignoreNode = topic_buttons.find('.tb')
      if (ignoreNode.length) {
        post.isIgnore = ignoreNode[0].innerText === '取消忽略'
      }
      //
      let thankNode = topic_buttons.find('.topic_thanked')
      if (thankNode.length) {
        post.isThanked = true
      }

      let span = topic_buttons.find('span')
      if (span.length) {
        let text = span[0].innerText
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
        //TODO 手机端获取不到感谢数
      }
    }

    // console.log('基本信息', post)

    let header = $(boxs[0])
    let temp = header.clone()
    // console.log('temp', temp)
    temp.find('.topic_buttons').remove()
    temp.find('.inner').remove()
    temp.find('.header').remove()
    let html = temp.html()
    html = functions.checkPhotoLink2Img(html)
    // console.log('html', html)
    post.headerTemplate = html
    return post
  },
  //解析OP信息
  async parseOp(post: Post) {
    // id=669181
    if (!post.member.id) {
      let userRes = await fetch(location.origin + '/api/members/show.json?username=' + post.member.username)
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

    let wrapperClass = 'Wrapper'
    let boxs
    let box: any
    if (body.length > 1) {
      body.each(function () {
        if (this.id === wrapperClass) {
          boxs = this.querySelectorAll('.box')
          box = boxs[1]
        }
      })
    } else {
      boxs = body.find(`#${wrapperClass} .box`)
      box = boxs[1]
      if (box.querySelector('.fa-tags')) {
        box = boxs[2]
      }
    }

    let cells: any = box.querySelectorAll('.cell')

    if (cells && cells.length) {
      // post.fr = boxs[1].querySelector('.inner')!.innerHTML

      cells = Array.from(cells)
      //获取创建时间
      let snow = cells[0].querySelector('.snow')
      post.createDate = snow?.nextSibling?.nodeValue?.trim() || ''

      let repliesMap: any[] = []
      //如果第二条有id，就说明是第二条是回复。只有一页回复
      if (cells[1].id) {
        repliesMap.push({ i: pageNo, replyList: this.parsePageReplies(cells.slice(1)) })
        let replyList = functions.getAllReply(repliesMap)
        functions.createList(post, replyList)
        return post
      } else {
        let promiseList: any = []
        // console.log(this.current.repliesMap)
        return new Promise((resolve, reject) => {
          repliesMap.push({ i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1)) })

          let pages = cells[1].querySelectorAll('a.page_normal')
          pages = Array.from(pages)
          let url = location.origin + '/t/' + post.id
          for (let i = 0; i < pages.length; i++) {
            let currentPageNo = Number(pages[i].innerText)
            promiseList.push(this.fetchPostOtherPageReplies(url + '?p=' + currentPageNo, currentPageNo))
          }
          Promise.allSettled(promiseList).then(
            (results) => {
              // @ts-ignore
              results.filter((result) => result.status === "fulfilled").map(v => repliesMap.push(v.value))
              let replyList = functions.getAllReply(repliesMap)
              functions.createList(post, replyList)
              resolve(post)
            }
          )
        })
      }
    }
  },
  //请求帖子其他页的回复
  fetchPostOtherPageReplies(href: string, pageNo: number) {
    return new Promise(resolve => {
      $.get(href).then(res => {
        let s = res.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
        let wrapperClass = 'Wrapper'
        let box: any
        $(s[0]).each(function () {
          if (this.id === wrapperClass) {
            box = this.querySelectorAll('.box')[1]
            if (box.querySelector('.fa-tags')) {
              box = this.querySelectorAll('.box')[2]
            }
          }
        })
        let cells: any = box!.querySelectorAll('.cell')
        cells = Array.from(cells)
        resolve({ i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1)) })
      }).catch((r: any) => {
        if (r.status === 403) {
          functions.cbChecker({ type: 'restorePost', value: null })
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
        replyCount: 0,
        isThanked: false,
        isOp: false,
        isDup: false,
        id: node.id.replace('r_', '')
      } as any
      let reply_content = node.querySelector('.reply_content')
      // console.log('reply_content',reply_content)
      item.reply_content = functions.checkPhotoLink2Img(reply_content!.innerHTML)
      item.reply_text = reply_content!.textContent!

      let { users, floor } = this.parseReplyContent(item.reply_content)
      item.hideCallUserReplyContent = item.reply_content
      if (users.length === 1) {
        item.hideCallUserReplyContent = item.reply_content.replace(/@<a href="\/member\/[\s\S]+?<\/a>(\s#[\d]+)?\s(<br>)?/, () => '')
      }
      item.replyUsers = users
      item.replyFloor = floor

      let spans = node.querySelectorAll('span')
      let ago = spans[1]
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
      let small = spans[2]
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
    return { users, floor }
  },
  //获取帖子详情
  async getPostDetail(post: Post, body: JQuery, htmlText: string, pageNo = 1) {
    post = await this.parsePostContent(post, body, htmlText)
    return await this.getPostAllReplies(post, body, htmlText, pageNo)
  },
  //解析页面帖子列表
  parsePagePostList(list: any[], box: any) {
    list.forEach(itemDom => {
      let item = getDefaultPost()
      let item_title = itemDom.querySelector('.item_title')
      if (!item_title) return
      itemDom.classList.add('post-item')
      let a = item_title.querySelector('a')
      let { href, id, title } = functions.parseA(a)
      item.id = String(id)
      a.href = item.href = href
      item.url = location.origin + '/api/topics/show.json?id=' + item.id
      item.title = title
      itemDom.classList.add(`id_${id}`)
      itemDom.dataset['href'] = href
      itemDom.dataset['id'] = id

      let userEl = itemDom.querySelector('strong a')
      if (userEl) {
        item.member.username = userEl.innerText
      }
      let avatarEl = itemDom.querySelector('td img')
      if (avatarEl) {
        item.member.avatar = avatarEl.src
      }
      let countEl = itemDom.querySelector('.count_livid')
      if (countEl) {
        item.replyCount = Number(countEl.innerText)
      }
      let nodeEl = itemDom.querySelector('.node')
      if (nodeEl) {
        item.node.title = nodeEl.innerText
        item.node.url = nodeEl.href
      }

      let infoEl = itemDom.querySelector('td:nth-child(3) span:last-child')
      if (infoEl && infoEl.childNodes) {
        let info = infoEl.childNodes[0]
        if (info) {
          if (info.textContent.indexOf('•') > -1) {
            item.lastReplyDate = info.textContent.substring(0, info.textContent.indexOf('•') - 1).trim()
          } else {
            item.lastReplyDate = info.textContent.trim()
          }
        }
        let user = infoEl.childNodes[1]
        if (user) {
          item.lastReplyUsername = user.textContent
        }
      }
      window.postList.push(item)
    })

    const setF = (res) => {
      let rIndex = window.postList.findIndex(w => w.id === res.id)
      if (rIndex > -1) {
        window.postList[rIndex] = Object.assign(window.postList[rIndex], res)
      }

      let itemDom = box.querySelector(`.id_${res.id}`)

      itemDom.classList.add('preview')

      if (res.content_rendered) {
        let a = document.createElement('a')
        a.href = res.href
        a.classList.add('post-content')
        let div = document.createElement('div')
        div.innerHTML = res.content_rendered
        a.append(div)
        // console.log(div.clientHeight)
        itemDom.append(a)
        // show More
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
      functions.cbChecker({ type: 'syncList' })
    }

    if (window.config.viewType === 'card' && false) {
      let cacheDataStr = localStorage.getItem('cacheData')
      let cacheData = []
      if (cacheDataStr) {
        cacheData = JSON.parse(cacheDataStr)

        let now = Date.now()
        //筛掉3天前的数据，一直存会存不下
        cacheData = cacheData.filter(v => {
          return v.created > (now / 1000 - 60 * 60 * 24 * 3)
        })
      }

      let fetchIndex = 0
      for (let i = 0; i < window.postList.length; i++) {
        let item = window.postList[i]
        let rItem = cacheData.find(w => w.id === item.id)
        if (rItem) {
          rItem.href = item.href
          setF(rItem)
        } else {
          fetchIndex++
          setTimeout(() => {
            $.get(item.url).then(v => {
              let res = v[0]
              res.href = item.href
              cacheData.push(res)
              localStorage.setItem('cacheData', JSON.stringify(cacheData))
              setF(res)
            })
          }, fetchIndex < 4 ? 0 : (fetchIndex - 4) * 1000)
        }
      }
    } else {
      functions.cbChecker({ type: 'syncData' })
    }
  },
  //创建记事本子条目
  async createNoteItem(itemName: string) {
    return
    return new Promise(async resolve => {
      let data: any = new FormData()
      data.append('content', itemName)
      data.append('parent_id', 0)
      data.append('syntax', 0)
      let apiRes = await window.win().fetch(`${location.origin}/notes/new`, { method: 'post', body: data })
      // console.log(apiRes)
      if (apiRes.redirected && apiRes.status === 200) {
        resolve(apiRes.url.substr(-5))
        return
      }
      resolve(null)
    })
  },
  //编辑记事本子条目
  async editNoteItem(val: string, id: string) {
    return
    let data: any = new FormData()
    data.append('content', val)
    data.append('syntax', 0)
    let apiRes = await window.fetch(`${location.origin}/notes/edit/${id}`, {
      method: 'post', body: data
    })
    return apiRes.redirected && apiRes.status === 200;
  },
  //标签操作
  async saveTags(val: any) {
    return
    for (const [key, value] of Object.entries(val)) {
      if (!(value as any[]).length) delete val[key]
    }
    return await this.editNoteItem(window.user.tagPrefix + JSON.stringify(val), window.user.tagsId)
  },
  //已读楼层操作
  async saveReadList(val: any) {
    return
    return await this.editNoteItem(window.user.readPrefix + JSON.stringify(val), window.user.readNoteItemId)
  },
  //imgur图片删除hash操作
  async saveImgurList(val: any) {
    return
    return await this.editNoteItem(window.user.imgurPrefix + JSON.stringify(val), window.user.imgurNoteId)
  },
}
window.vals = {}
window.functions = {
  clickAvatar(prex: string) {
    let menu = $(`${prex}#menu-body`)
    if (menu.css('--show-dropdown') === 'block') {
      menu.css('--show-dropdown', 'none')
    } else {
      menu.css('--show-dropdown', 'block')
    }
  }
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
  // let url = location.origin + "/mission/daily"
  // @ts-ignore
  let url = (location.origin + "/mission/daily/redeem?" + RegExp("once\\=(\\d+)").exec(document.querySelector('div#Top .tools, #menu-body').innerHTML)[0]);
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
          functions.feedback()
        }
      });
      console.warn('[V2EX 增强] 自动签到失败！请关闭其他插件或脚本。如果连续几天都签到失败，请联系作者解决！')
      if (qiandao) qiandao.textContent = '自动签到失败！请尝试手动签到！';
    }
  })
}

// 后台获取签到状态（并判断是否需要签到）
function qianDaoStatus_(timeNow: any) {
  $.get(location.origin + '/mission/daily').then(r => {
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

//获取记事本条目内容
function getNoteItemContent(id: string, prefix: string) {
  return new Promise((resolve, reject) => {
    $.get(location.origin + '/notes/edit/' + id).then(r2 => {
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
  return
  //获取或创建记事本的标签
  $.get(location.origin + '/notes').then(async r => {
    let bodyText = r.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
    let body = $(bodyText[0])
    let items: HTMLAnchorElement[] = body.find('#Main .box .note_item_title a') as any

    if (window.config.openTag) {
      let tagItem = Array.from(items).find(v => v.innerText.includes(window.user.tagPrefix))
      if (tagItem) {
        window.user.tagsId = tagItem.href.substr(-5)
        window.user.tags = await getNoteItemContent(window.user.tagsId, window.user.tagPrefix,)
      } else {
        let r = await window.parse.createNoteItem(window.user.tagPrefix)
        r && (window.user.tagsId = r);
      }
    }

    if (window.config.rememberLastReadFloor) {
      let readItem = Array.from(items).find(v => v.innerText.includes(window.user.readPrefix))
      if (readItem) {
        window.user.readNoteItemId = readItem.href.substr(-5)
        window.user.readList = await getNoteItemContent(window.user.readNoteItemId, window.user.readPrefix)
      } else {
        let r = await window.parse.createNoteItem(window.user.readPrefix)
        r && (window.user.readNoteItemId = r);
      }
    }

    if (false) {
      let imgurItem = Array.from(items).find(v => v.innerText.includes(window.user.imgurPrefix))
      if (imgurItem) {
        window.user.imgurNoteId = imgurItem.href.substr(-5)
        window.user.imgurList = await getNoteItemContent(window.user.imgurNoteId, window.user.imgurPrefix)
      } else {
        let r = await window.parse.createNoteItem(window.user.imgurPrefix)
        r && (window.user.imgurNoteId = r);
      }
    }
    functions.cbChecker({ type: 'syncData' })
  })
}

//从本地读取配置
function initConfig() {
  return new Promise(resolve => {
    //获取默认配置
    let configStr = localStorage.getItem('v2ex-config')
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

let $section = document.createElement('section')
$section.id = 'app'

async function init() {
  console.log('js 加载成功')
  return
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


  let { pageData, pageType } = functions.checkPageType()
  window.pageType = pageType
  window.pageData = pageData

  let top2 = $('#menu-body .cell:first .top:first')
  if (top2.length && ['个人主页', 'Profile'].includes(top2.text())) {
    window.user.username = top2.attr('href').replace('/member/', '')
    window.user.avatar = $('#menu-entry .avatar').attr('src')
  }

  initConfig().then(async r => {

    try {
      if (window.config.autoSignin && window.user.username) {
        qianDao()
      }
    } catch (e) {
      console.log('签到失败')
    }

    if (window.user.username) {
      initNoteData()
    }

    let box: any
    let list
    let first
    let last
    // console.log(window.pageType)
    // window.pageType = PageType.Post
    // window.pageData.id = 1007682

    switch (window.pageType!) {
      case PageType.Node:
        box = document.querySelectorAll('#Wrapper .box')

        //移除box的样式，使卡片样式时能显示出背景
        box[1].style.background = 'unset'
        box[1].style.borderBottom = 'none'
        box[1].style['border-radius'] = '0'
        box[1].style['box-shadow'] = 'none'

        first = $(box[1]).children().first()
        first.addClass('cell post-item')
        if (window.config.viewType === 'card') first[0].classList.add('preview')
        last = $(box[1]).children().last()
        last.addClass('cell post-item')
        if (window.config.viewType === 'card') last[0].classList.add('preview')

        list = box[1].querySelectorAll('.cell')
        box[0].before($section)
        window.parse.parsePagePostList(list, box[1])
        break
      case PageType.Home:
        // box = document.querySelector('#Wrapper .box')
        // list = box!.querySelectorAll('.item')
        // window.parse.parsePagePostList(list, box)
        // sendFlutter({type: '发送主页列表'});
        // // sendFlutter(window.postList);
        // sendFlutter({type: "list", data: window.postList});
        // bridge_getNodePostList(`hot`, document)
        break
      case PageType.Changes:
        box = document.querySelector('#Wrapper .box')

        //移除box的样式，使卡片样式时能显示出背景
        box.style.background = 'unset'
        box.style['border-radius'] = '0'
        box.style['box-shadow'] = 'none'

        first = $(box).children().first()
        first.addClass('cell post-item')
        if (window.config.viewType === 'card') first[0].classList.add('preview')
        last = $(box).children().last()
        last.addClass('cell post-item')
        if (window.config.viewType === 'card') last[0].classList.add('preview')

        list = box!.querySelectorAll('.item')
        list[0].before($section)
        window.parse.parsePagePostList(list, box)
        break
      case PageType.Post:
        box = document.querySelector('#Wrapper .box')
        // @ts-ignore
        box.after($section)

        let r = await functions.checkPostReplies(window.pageData.id, false)
        if (r) {
          window.stopMe = true
          functions.cbChecker({ type: 'syncData' })
          functions.cbChecker({ type: 'warningNotice', value: '由于回复数量较多，脚本已停止解析楼中楼' })
          return
        }

        let post = functions.clone(window.initPost)
        post.id = window.pageData.id
        let body = $(document.body)
        let htmlText = document.documentElement.outerHTML

        window.parse.parsePostContent(
          post,
          body,
          htmlText
        ).then(async (res: any) => {
          // console.log('详情页-基本信息解析完成', Date.now(), res)
          await functions.cbChecker({ type: 'postContent', value: res })
          // 引用修改
          await window.parse.parseOp(res)
          // console.log('详情页-OP信息解析完成', Date.now())
        })

        //引用修改
        window.parse.getPostAllReplies(
          post,
          body,
          htmlText,
          window.pageData.pageNo
        ).then(async (res1: any) => {
          // console.log('详情页-回复解析完成', Date.now(), res1)
          await functions.cbChecker({ type: 'postReplies', value: res1 })
        })
        break
      case PageType.Member:
        box = document.querySelectorAll('#Wrapper .box')

        window.targetUserName = box[0].querySelector('h1')!.textContent!
        if (window.config.openTag) {
          //移除box的bottom样式，让和vue的div融为一体
          box[0].style.borderBottom = 'none'
          box[0].style['border-bottom-left-radius'] = '0'
          box[0].style['border-bottom-right-radius'] = '0'
        }

        list = box[2].querySelectorAll('.cell')
        box[0].after($section)
        window.parse.parsePagePostList(list, box[2])
        break
      default:
        window.stopMe = true
        functions.cbChecker({ type: 'syncData' })
        console.error('未知页面')
        break
    }
  })
}

let isMobile = !document.querySelector('#Rightbar');
if (isMobile) {
  $(document).on('click', 'a', async (e) => {
    let { href, id, title } = functions.parseA(e.currentTarget);
    if (id) {
      e.preventDefault();
      await window.jsFunc.getPost(id)
      return false;
    }
  });
  init()

}
