# 脚本介绍

V2Next 是增强 V 站使用体验的油猴脚本，有UI 美化、楼中楼、回复上下文、高赞回复、简洁模式、发送图片和表情 emoji 、base64 解码、定时查询未读提醒、图片放大等等功能

官网： https://v2next.netlify.app/  
安装地址： https://greasyfork.org/zh-CN/scripts/458024  
现在安装量已超 9000 ，日活最高 1800 个小伙伴在使用！

# 本次更新

## 定时查询未读提醒
>默认**关闭**，可在“脚本设置”里面单独开启，**此功能需要一直打开 V 站首页**

![Imgur](https://imgur.com/2u6HftS.png)

此功能开启后会定时请求 V 站页面以解析未读提醒，可能导致被封IP，所以默认是**关闭**的。开启后，可以把查询间隔设置的长一点，一般来说是没什么问题🤭

光是定时查询没什么意义，所以配套了 “钉钉” 通知，使用教程：[https://kdocs.cn/l/cbPjAe4gt168](https://kdocs.cn/l/cbPjAe4gt168)
![Imgur](https://imgur.com/1DPnUc2.png)

一开始是想做个微信通知的，找到了这个项目[readme-ov-file](https://github.com/easychen/wecomchan?tab=readme-ov-file)，根据教程设置完成后，能收到消息和提醒了，美中不足的是，电脑版微信上能收到消息，但不会有声音提醒，手机上却有声音提醒，后面放弃了

## 接管未读提醒页面
>默认**开启**，可在“脚本设置”里面单独关闭

![Imgur](https://i.imgur.com/2phxJwa.png)

现在点击“未读提醒”将不会跳转新页面，而是以弹框的方式显示，**同时增加了筛选功能，可快速查看“回复”列表**，终于不用在一大堆感谢\收藏里面找回复了😁

## 图片放大

现在单击图片，会放大到屏幕中间，滑动鼠标滚轮可以自由放大

可在这个帖子进行测试：[V2EX markdown 语法-插入图片](https://www.v2ex.com/t/926148)

## 表情更新

新增了以下表情

![Imgur](https://imgur.com/OC13c0j.png)

## 其他更改

- 高赞回复，现在默认展开
- 修复 github、greasyfork 上提的 bug

# 结束

谢谢大家支持！![huaji](https://i.imgur.com/Iy0taMy.png)![huaji](https://i.imgur.com/Iy0taMy.png)![huaji](https://i.imgur.com/Iy0taMy.png)，同时推荐一个好用的脚本[v2新帖挂件](https://greasyfork.org/zh-CN/scripts/448472)，v2右侧挂件，展示最近发表的帖子，蛮好用的，我用了快一年了