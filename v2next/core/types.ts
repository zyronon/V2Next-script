export interface Post {
    replyList: any[],
    nestedReplies: any[],
    nestedRedundReplies: any[],
    allReplyUsers: any[],
    username: string,
    url: string,
    href: string,
    member: any,
    node: {
        title: string,
        url: string
    },
    headerTemplate: string,
    content_rendered: string,
    title: string,
    fr: string,
    id: string,
    createDate: string,
    createDateAgo: string,
    type: string,
    once: string,
    replyCount: number,
    clickCount: number,
    thankCount: number,
    collectCount: number,
    isFavorite: boolean,
    isIgnore: boolean,
    isThanked: boolean,
    isReport: boolean,
    lastReadFloor: number
    inList: boolean,
}

export interface User {
    tagPrefix: string,
    tags: object,
    tagsId: string,
    username: string,
    avatar: string,
    readPrefix: string,
    readNoteItemId: string,
    readList: object,
    imgurPrefix: string,
    imgurList: object,
    imgurNoteId: string,
}

export interface Config {
    showToolbar: boolean,
    autoOpenDetail: boolean,
    openTag: boolean,//给用户打标签
    clickPostItemOpenDetail: boolean,
    closePostDetailBySpace: boolean,//点击空白处关闭详情
    contentAutoCollapse: boolean,//正文超长自动折叠
    viewType: string,
    commentDisplayType: CommentDisplayType,
    newTabOpen: boolean,//新标签打开
    base64: boolean,//base功能
    sov2ex: boolean,
    showTopReply: boolean,//显示高赞
    topReplyLoveMinCount: number,//高赞，统计最小限制
    topReplyCount: number,//高赞数量
    postWidth?: string,
    rememberLastReadFloor: boolean// 记录上次阅读楼层
    autoJumpLastReadFloor: boolean//自动跳转到上次阅读楼层
    autoSignin: boolean,
    customBgColor: string
    version: number
    collectBrowserNotice: boolean// 收藏时，浏览器提醒
    fontSizeType: 'normal' | 'small' | 'large' | 'big-large'//字体大小
}

export enum PageType {
    Home = "Home",
    Node = "Node",
    Post = "Post",
    Member = "Member",
    Changes = "Changes",
}

export enum CommentDisplayType {
    FloorInFloor = 0,//楼中楼（@）
    FloorInFloorNoCallUser = 4,//楼中楼（隐藏第一个@用户，双击内容可显示原文）
    FloorInFloorNested = 5,//冗余楼中楼
    Like = 1,//感谢
    V2exOrigin = 2,//V2原版
    OnlyOp = 3,//只看楼主
    New = 6,//最新
}

export interface Reply {
    level: number,
    thankCount: number,
    isThanked: boolean,
    isOp: boolean,
    isMod: boolean,
    isDup: boolean,
    id: string,
    reply_content: string,
    hideCallUserReplyContent: string,
    reply_text: string,
    replyUsers: any
    replyFloor: undefined
    date: string
    username: string
    avatar: string
    floor: number
}

//最大回复限制，超出脚本停止运行
export const MAX_REPLY_LIMIT = 400