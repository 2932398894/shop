<template>
  <div class="set">
    <van-address-edit :area-list="areaList" :show-delete="Boolean(addressData.id)" show-set-default show-search-result :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" 
      :save-button-text="have" :address-info="addressData" />

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { areaList } from '@vant/area-data';
import { addAddres, setAddres ,delAddres} from '../../api/goods.js'
import { useRoute, useRouter } from 'vue-router';
// 数据加密
import CryptoJS from 'crypto-js'

const searchResult = ref([]);
const route = useRoute();
const router = useRouter()
let have = ref('添加')
const addressData = ref({
  name: '',
  tel: '',
  province: '',
  city: '',
  county: '',
  areaCode: '',
  isDefault: '',
  addressDetail: '',
})
const addres = route.query.know ? route.query.know : ''
// 看是编辑还是添加
let bytes;
let editInfo;
if (addres) {
  // 解密数据
  bytes = CryptoJS.AES.decrypt(addres, 'secretKey')
  editInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  have.value = '修改'
  // console.log(editInfo);
  addressData.value = {
    id: editInfo.item.id,
    name: editInfo.item.name,
    tel: editInfo.item.tel,
    province: editInfo.item.province,
    city: editInfo.item.city,
    county: editInfo.item.town,
    areaCode: editInfo.item.areaCode,
    isDefault: editInfo.item.isDefault,
    addressDetail: editInfo.item.detail,
  }
}
// 这是添加地址
const onSave = async (info) => {
  if (have.value == '添加') {
    let obj = {
      is_default: info.isDefault ? '1' : '0',
      name: info.name,
      phone: info.tel,
      province: info.province,
      city: info.city,
      town: info.county,
      street: '微笑街道',
      detail: info.addressDetail,
    }
    let res = await addAddres(obj)
    if (res.code == 1) {
      showToast('添加成功')
      router.replace({
        path: '/shop/addres', // 目标路由的路径
      })
    }
  } else if (have.value == '修改') {
    let obj = {
      is_default: info.isDefault ? '1' : '0',
      name: info.name,
      phone: info.tel,
      province: info.province,
      city: info.city,
      town: info.county,
      street: '微笑街道',
      detail: info.addressDetail,
      id:addressData.value.id
    }
    // console.log(obj);
    let res = await setAddres(obj)
    if (res.code == 1) {
      showToast('修改成功')
      router.replace({
        path: '/shop/addres', // 目标路由的路径
      })
    }
  }
};
// 删除地址
const onDelete = async (info) => {
  console.log(info);
  let res=await delAddres({id:info.id})
  if(res.code==1){
    showToast('删除成功')
      router.replace({
        path: '/shop/addres', // 目标路由的路径
      })
  }
}

</script>
<style scoped> 
.set{
  font-size: 12px;
}
</style>