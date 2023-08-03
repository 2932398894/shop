<template>
  <div class="addessay">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="title" name="title" label="文章标题" placeholder="文章标题"
          :rules="[{ required: true, message: '请填写文章标题' }]" />
        <van-field v-model="detail" name="detail" label="文章正文" placeholder="文章正文"
          :rules="[{ required: true, message: '请填写文章正文' }]" />
        <van-field v-model="pic_url" name="pic_url" label="图片链接" placeholder="图片链接"
          :rules="[{ required: true, message: '请填写图片链接' }]" />
        <van-field v-model="desc" rows="2" name="desc" :rules="[{ required: true, message: '请填写文章描述' }]" autosize
          label="描述" type="textarea" maxlength="200" placeholder="请输入文章描述" show-word-limit />
      </van-cell-group>
      <div style="margin: 40px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import { addEssay } from '../../api/grass.js'

const router = useRouter();
const title = ref('');
const detail = ref('');
const pic_url = ref('');
const desc = ref('');

// 添加文章
const onSubmit = async (values) => {
  let res = await addEssay(values)
  if (res.code == 1) {
    showToast('添加文章成功');
    router.replace('/grass')
  }
};
</script>
<style lang="scss" scoped>
.addessay {
  padding: 20px 10px;
  box-sizing: border-box;
font-size: 12px;
  .van-field {
    padding: 25px 20px;
    align-items: center;
  }
}
</style>