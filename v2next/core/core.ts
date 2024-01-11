import {Config, Post, User, CommentDisplayType, Reply, MAX_REPLY_LIMIT} from "./types";

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

export const DefaultVal = {
    pageType: undefined,
    pageData: {pageNo: 1},
    targetUserName: '',
    currentVersion: 1,
    isNight: false,
    isMobile: false,
    cb: null,
    stopMe: null,
    postList: [],
}

export const functions = {
    //解析帖子内容
    async parsePostContent(post: Post, body: JQuery, htmlText: string) {
        let once = htmlText.match(/var once = "([\d]+)";/)
        // console.log(once)
        if (once && once[1]) {
            post.once = once[1]
        }

        post.isReport = htmlText.includes('你已对本主题进行了报告')

        let wrapperClass = window.vals.isMobile ? 'Wrapper' : 'Main'
        let wrapper = body.find('#Main')

        if (window.vals.isMobile) {
            wrapper = body
        }
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

        let aName = wrapper.find('.header small.gray a:nth-child(1)')
        if (aName) {
            post.member.username = aName[0].innerText
        }

        if (window.vals.isMobile) {
            let small = wrapper.find('.header small.gray')
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
        } else {
            let spanEl = wrapper.find('.header small.gray span')
            if (spanEl) {
                post.createDateAgo = spanEl[0].innerText
            }
        }


        let avatarEl: any = wrapper.find('.header .avatar')
        // console.log('avatarEl', avatarEl[0].src)
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

        let header = body.find(`#${wrapperClass} .box`).first()
        let temp = header.clone()
        temp.find('.topic_buttons').remove()
        temp.find('.inner').remove()
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

        console.log('body', body)

        let wrapperClass = window.vals.isMobile ? 'Wrapper' : 'Main'
        let boxs
        let box: any
        if (window.vals.isMobile && body.length > 1) {
            body.each(function () {
                if (this.id === wrapperClass) {
                    boxs = this.querySelectorAll('.box')
                    box = boxs[2]
                }
            })
        } else {
            boxs = body.find(`#${wrapperClass} .box`)
            box = boxs[1]
        }

        console.log('box', box)

        let cells: any = box.querySelectorAll('.cell')
        if (cells && cells.length) {
            if (window.vals.isMobile) {
                post.fr = boxs[1].querySelector('.inner')!.innerHTML
            } else {
                post.fr = cells[0].querySelector('.cell .fr')!.innerHTML
            }

            cells = Array.from(cells)
            //获取创建时间
            let snow = cells[0].querySelector('.snow')
            post.createDate = snow?.nextSibling?.nodeValue?.trim() || ''

            let repliesMap: any[] = []
            //如果第二条有id，就说明是第二条是回复。只有一页回复
            if (cells[1].id) {
                repliesMap.push({i: pageNo, replyList: this.parsePageReplies(cells.slice(1))})
                let replyList = this.getAllReply(repliesMap)
                post.replyList = replyList
                post.replyCount = replyList.length
                post.allReplyUsers = Array.from(new Set(replyList.map((v: any) => v.username)))
                let nestedList = this.createNestedList(replyList)
                let nestedRedundantList = this.createNestedRedundantList(replyList)
                if (nestedList) post.nestedReplies = nestedList
                if (nestedRedundantList) post.nestedRedundReplies = nestedRedundantList
                return post
            } else {
                let promiseList: any = []
                // console.log(this.current.repliesMap)
                return new Promise((resolve, reject) => {
                    repliesMap.push({i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1))})

                    let pages = cells[1].querySelectorAll('a.page_normal')
                    pages = Array.from(pages)
                    let url = window.baseUrl + '/t/' + post.id
                    for (let i = 0; i < pages.length; i++) {
                        let currentPageNo = Number(pages[i].innerText)
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
                            let nestedList = this.createNestedList(replyList)
                            let nestedRedundantList = this.createNestedRedundantList(replyList)
                            if (nestedList) post.nestedReplies = nestedList
                            if (nestedRedundantList) post.nestedRedundReplies = nestedRedundantList
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
                let wrapperClass = window.vals.isMobile ? 'Wrapper' : 'Main'
                let box: any
                if (window.vals.isMobile) {
                    $(s[0]).each(function () {
                        if (this.id === wrapperClass) {
                            box = this.querySelectorAll('.box')[2]
                        }
                    })
                } else {
                    box = $(s[0]).find('#Main .box')[1]
                }
                let cells: any = box!.querySelectorAll('.cell')
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

            let spans
            let ago
            if (window.vals.isMobile) {
                spans = node.querySelectorAll('span')
                ago = spans[1]
            } else {
                ago = node.querySelector('.ago')
            }
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
            let small
            if (window.vals.isMobile) {
                small = spans[2]
            } else {
                small = node.querySelector('.small')
            }
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
                        postItem.replyCount = postItem.replies
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
    },
    feedback() {
        window.parse.openNewTab(window.const.issue)
    },
}