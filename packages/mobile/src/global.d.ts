import { Config, PageType, Post } from "@v2next/core/types"

declare global {
  interface Window {
    user: any,
    targetUserName: string,//目标用户名字（用于在member界面添加标签）
    baseUrl: string,
    pageData: any,
    const: {
      git: string,
      issue: string,
    },
    config: Config,
    currentVersion: number,
    isNight: boolean,
    canParseV2exPage: boolean,
    pageType?: PageType,
    clone: (val: any) => any
    postList: any[]
    functions: {
      feedback: () => void
      clickAvatar: (prex?:string) => void
    },
    parse: {
      parsePostContent: Function,
      parseOp: Function,
      getPostAllReplies: Function,
      fetchPostOtherPageReplies: Function,
      parsePageReplies: Function,
      parseReplyContent: Function,
      getPostDetail: Function,
      getAllReply: Function,
      createNestedList: Function,
      createNestedRedundantList: Function,
      findChildren: Function,
      parsePagePostList: Function,
      parseA: Function,
      createNoteItem: Function,
      editNoteItem: Function,
      saveTags: Function,
      saveImgurList: Function,
      checkPhotoLink2Img: Function,
      checkPostReplies: Promise,
      openNewTab: Function,
    }
    cb: any
    win: any
    query: any
    stopMe: boolean
    vals: {
    }
  }
}

export {}