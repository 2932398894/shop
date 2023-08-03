<template>
  <div class="essay">
    <van-image lazy-load :src="data.picUrl" />
    <div class="essay-info">
      <h2>{{ data.title }}</h2>
      <p class="know">{{ data.detail }}</p>
      <div class="about"><span class="des">文章描述：</span>{{ data.desc }}</div>
      <div class="time">
        <div class="like">
          <van-badge :content="data.praise" color='#FF0000'>
            <van-icon :name="data.is_praise ? 'like' : 'like-o'" color='#FF0000' @click="like(data.id)" />
          </van-badge>
          <van-badge :content="data.collect" color="#1989fa">
            <van-icon :name="data.is_collect ? 'star' : 'star-o'" color="#FFD700" @click="collection(data.id)" />
          </van-badge>
        </div>
        <div @click="delAr(data.id)">
          <p class="desc">更新时间：</p>{{ data.updatedAt }}
        </div>
      </div>
    </div>
    <div class="main">
      <h2>评论：</h2>
      <lazy-component>
        <div class="comment" v-for="i in data.comments" :key="i.id" @touchstart="startTimer(i.id)" @touchend="clearTimer"
          @touchcancel="clearTimer">
          <van-image lazy-load :src="i.user.avatar" round width="45px" height="45px" />
          <div class="comment-info">
            <div>
              <p>{{ i.user.name }}</p>
              <span>分布时间：{{ formatTime(i.created_at) }}</span>
            </div>
            <div class="inp">
              {{ i.content }}
            </div>
          </div>
        </div>
      </lazy-component>
    </div>
    <div class="footer">
      <van-cell class="comment-input">
        <template #title>
          <div class="comment-title">
            <van-icon name="edit" class="comment-icon" />
            <input type="text" placeholder="快来说点什么吧" @click="have" v-model="mess" />
            <van-icon name="smile-o" size="30px" color="#1989fa" @click="have" />
          </div>
        </template>
      </van-cell>
      <van-action-sheet v-model:show="show" title="标题" @close="off">
        <van-field ref="inp" v-model="value" rows="2" autosize label="留言" type="textarea" maxlength="100"
          placeholder="请输入评论" show-word-limit>
          <template #right-icon>
            <van-icon name="smile-o" size="30px" color="#1989fa" @click="know = !know" />
          </template>
          <template #button>
            <van-button size="small" type="primary" @click="add(data.id)">发布</van-button>
          </template>
        </van-field>
        <div v-if="know" class="emoji-container">
          <template v-for="emoji in emojis" :key="emoji">
            <i class="emoji" @click="onEmojiSelected(emoji)">{{ emoji }}</i>
          </template>
        </div>
      </van-action-sheet>
    </div>
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="del">
    </van-share-sheet>
    <van-icon class="iconfont" class-prefix="icon-shanchu" name="cross" size="26" v-show="showShare"
      @click="del"></van-icon>
    <van-back-top right="5vw" bottom="10vh" />
  </div>
</template>
<script setup>
import { ref, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { essayInfo, addComment, addLike, delLike, addCollect, delCollect, delComment, delArticle } from './../../api/grass.js'

const route = useRoute();
const router = useRouter()
let data = ref({})
const showShare = ref(false);
const options = [
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: '微博', icon: 'weibo' },
    { name: 'QQ', icon: 'qq' },
  ],
  [
    { name: '复制链接', icon: 'link' },
    { name: '删除', icon: 'icon-shanchu' },
    { name: '二维码', icon: 'qrcode' },
    { name: '小程序码', icon: 'weapp-qrcode' },
  ],
];
const timer = ref(null);
const longPressTime = 1000; // 定义长按的时间阈值，单位为毫秒
// 文章长按
const show = ref(false);
const essay = route.params.essay;
let inp = ref(null)
let know = ref(false)
let value = ref('')
let ids = ref(0)
let mess = ref('')
// 表情包
const emojis = ref([
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '😊', '😇',
  '😍', '🥰', '😘', '😗', '😋', '😛', '😜', '🤪', '😝', '🤑',
  '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏',
  '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷'
]);
// 发送评论
async function add(id) {
  let res = await addComment({
    type: 2,
    content: value.value,
    object_id: id
  })
  console.log(res);
  show.value = false
  value.value = ''
  needData()
}
function have() {
  show.value = !show.value
}
const onEmojiSelected = (emoji) => {
  value.value += emoji;
  setTimeout(() => {
    inp.value.focus()
  }, 100)
};
// 获取文章详情
async function needData() {
  let res = await essayInfo({ id: essay })
  res.data.comments = res.data.comments?.reverse?.();
  data.value = res.data
}
needData()
// 进行时间回溯
const formatTime = (time) => {
  const commentTime = new Date(time);
  const currentTime = new Date();

  const diffTime = currentTime - commentTime;

  if (diffTime < 86400000) { // 一天的毫秒数
    const hours = Math.floor(diffTime / 3600000); // 一小时的毫秒数
    if (hours < 1) {
      return `${Math.floor(diffTime / 60000)}分钟前`;
    } else {
      return `${hours}小时前`;
    }
  }
  else if (diffTime < 259200000) { // 三天的毫秒数
    const days = Math.floor(diffTime / 86400000); // 一天的毫秒数
    return `${days}天前`;
  } else if (diffTime < 259200000) { // 三天的毫秒数
    const month = commentTime.getMonth() + 1;
    const day = commentTime.getDate();
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  } else if (diffTime < 31536000000) { // 一年的毫秒数
    return commentTime.toLocaleDateString();
  } else {
    return commentTime.getFullYear() + '-' + (commentTime.getMonth() + 1).toString().padStart(2, '0') + '-' + commentTime.getDate().toString().padStart(2, '0');
  }
};
// 把表情包关闭
function off() {
  know.value = false
  mess.value = value.value
}
// 点赞
async function like(id) {
  // 取消
  if (data.value.is_praise) {
    await delLike({
      type: 2,
      object_id: id
    })
    data.value.is_praise = true
  } else {
    await addLike({
      type: 2,
      object_id: id
    })
    data.value.is_praise = false
  }
  needData()
}
// 收藏
async function collection(id) {
  if (data.value.is_collect) {
    await delCollect({
      type: 2,
      object_id: id
    })
    data.value.is_collect = true
  } else {
    await addCollect({
      type: 2,
      object_id: id
    })
    data.value.is_collect = false
  }
  needData()
}
// 评论长按

const startTimer = (id) => {
  timer.value = setTimeout(() => {
    // 长按触发的逻辑
    ids.value = id
    showShare.value = true
  }, longPressTime);
};

// 清除定时器
const clearTimer = () => {
  clearTimeout(timer.value);
  timer.value = null;
};
// 进行评论删除
async function del() {
  let res = await delComment({ id: ids.value })
  console.log(res);
  if (res.code == 1) {
    showShare.value = false
    needData()
  }
}
// 文章长按,进行删除
async function delAr(id) {
  let res = await delArticle({ id })
  console.log(res);
  if (res.code == 1) {
    router.replace({
      path: '/grass', // 目标路由的路径
    })
  }
}
</script>
<style scoped lang="scss">
.essay {
  margin-top: 10px;
  font-size: 12px;

  .essay-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 20px 0;
    box-sizing: border-box;
    background-color: white;
    position: relative;

    .des {
      color: #FFA07A;
      font-size: 16px;
    }

    h2 {
      font-size: 20px;
      font-weight: 700;
    }

    .know {
      font-size: 16px;
      font-weight: 500;
      margin: 10px 0;
    }

    .desc {
      font-size: 14px;
    }

    .time {
      padding: 20px 0;
      margin-left: auto;
      color: #1989fa;
    }

    .about {
      display: flex;
      width: 100%;
      align-items: center;
      color: #888888;

      span {
        font-size: 14px;
        color: #f78f00;
      }
    }

    .like {
      left: 25px;
      bottom: 30px;
      position: absolute;
      display: flex;
      font-size: 20px;
      width: 90px;
      justify-content: space-around;
    }
  }

  .main {
    padding: 15px 10px 10px;
    box-sizing: border-box;

    h2 {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .comment {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      background-color: white;
      position: relative;

      .comment-info {
        margin-left: 10px;

      }

      .comment-info>div {
        margin-bottom: 5px;
      }

      .comment-info p {
        margin: 0;
        font-weight: bold;
      }

      .comment-info span {
        color: #888;
      }

    }
  }

  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    font-size: 14px;

    .comment-input {
      margin-top: 20px;
    }

    .comment-title {
      display: flex;
      align-items: center;
    }

    .comment-icon {
      margin-right: 10px;
      color: #007bff;
      font-size: 20px;
      /* 设置图标颜色为蓝色 */
    }

    input[type="text"] {
      border: 1px solid #ddd;
      border-radius: 25px;
      padding: 8px 10px;
      font-size: 14px;
      width: 100%;
      margin-right: 10px;
    }

    .emoji-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .emoji {
      cursor: pointer;
      font-size: 14px;
    }

    .content {
      padding: 16px 16px 160px;
    }
  }

  .iconfont {
    position: fixed;
    bottom: 103px;
    left: 116px;
    z-index: 2003;
    color: #646566;
  }
}
</style>