<template>
  <div class="comment" ref="comment" :data-floor="floor">
    <div class="left expand-line" :class="level === 1 && 'no-line'"></div>
    <div class="right">
      <Author v-model="expand"
              :comment="modelValue"
              @reply="edit = !edit"
              type="top"
      />
      <BaseHtmlRender class="top-reply_content" :html="modelValue.hideCallUserReplyContent"/>
      <PostEditor v-if="edit"
                  @close="edit = false"
                  :replyInfo="replyInfo"
                  :replyUser="modelValue.username"
                  :replyFloor="modelValue.floor"/>
      <div class="simple-wrapper">
        <TopSubComment
            v-for="(item,index) in modelValue.children"
            v-model="modelValue.children[index]"
            :key="index"/>
      </div>
    </div>
  </div>
</template>
<script>
import Author from "./Author.vue";
import PostEditor from "./PostEditor.vue";
import Point from "./Point.vue";
import eventBus from "../utils/eventBus.js";
import BaseHtmlRender from "./BaseHtmlRender.vue";
import {CMD} from "../utils/type.js";
import {Icon} from "@iconify/vue";

export default {
  name: "TopSubComment",
  components: {BaseHtmlRender, Author, PostEditor, Point, Icon,},
  inject: ['post', 'postDetailWidth', 'show', 'isNight', 'isLogin', 'tags', 'config'],
  props: {
    modelValue: {
      reply_content: ''
    },
    level: -1
  },
  data() {
    return {
      expand: true,

      edit: false,
      replyInfo: `@${this.modelValue.username} #${this.modelValue.floor} `,
      floor: this.modelValue.floor
    }
  },
  watch: {
    show(e) {
      if (e) {
        this.edit = false
      }
    },
  },
  computed: {
    myTags() {
      return this.tags[this.modelValue.username] ?? []
    },
  },
  methods: {
    jump() {
      eventBus.emit(CMD.JUMP, this.modelValue.floor)
    },
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/variable";

.comment {
  width: 100%;
  box-sizing: border-box;
  margin-top: .8rem;
  display: flex;
  position: relative;
  @line-color: #ececec;

  .expand-line {
    @w: 1.6rem;
    width: @w;
    position: relative;

    &:after {
      position: absolute;
      left: 50%;
      top: 2%;
      content: " ";
      height: 98%;
      width: 0;
      border-right: 1px solid var(--color-line);
    }
  }

  .no-line {
    width: 1rem;
    &:after {
      display: none;
    }
  }

  .right {
    flex: 1;
    width: calc(100% - 3rem);

    .w {
      .post-editor-wrapper {
        margin-top: 1rem;
      }
    }
  }

  :deep(.avatar) {
    display: none !important;
  }

}
</style>
