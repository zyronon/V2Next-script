import { Config, PageType, Post } from "@v2next/core/types"

declare global {
  interface Window {
    //v2原站的方法
    fetchOnce: Function,
    user: any,
    targetUserName: string,//目标用户名字（用于在member界面添加标签）
    pageData: any,
    config: Config,
    isNight: boolean,
    isLogin: boolean,
    canParseV2exPage: boolean,
    pageType?: PageType,
    postList: any[]
    functions: {},
    parse: {
      parsePostContent: Function,
      parseOp: Function,
      getPostAllReplies: Function,
      fetchPostOtherPageReplies: Function,
      parsePageReplies: Function,
      parseReplyContent: Function,
      getPostDetail: Function,
      parsePagePostList: Function,
      createNoteItem: Function,
      editNoteItem: Function,
      saveTags: Function,
      saveImgurList: Function,
    }
    cb: any
    stopMe: boolean
    isDeadline: boolean
  }

  interface gmApi {
    GM_registerMenuCommand: any
  }
}

export {}
