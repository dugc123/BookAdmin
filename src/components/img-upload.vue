<template>
    <el-upload
        class="img-upload"
        :data = "uploadData"
        action="https://upload-z1.qiniup.com"
        :show-file-list="false"
        :on-success="uploadSuccess">
        <img v-if="currentValue" :src="currentValue" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" v-show="!currentValue"></i>
    </el-upload>
</template>

<script type="text/ecmascript-6">

export default {
    props:{
        value:{
            type:String
        }
    },
  data() {
    return {
        uploadData:{
            token:""
        },
        currentValue:this.value
    };
  },
  methods: {
      uploadSuccess(file){
        this.$emit("input",file.url)
      },
      getToken(){
          this.$axios.get("http://upload.yaojunrong.com/getToken").then(res=>{
            //   console.log(res.data)
              this.uploadData.token = res.data
          })
      }
  },
  watch:{
      value(val){
          this.currentValue = val
      }
  },
  created () {
      this.getToken()
  }
};
</script>

<style scoped lang="scss">
.img-upload{
    position: relative;
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 6px;
    margin:10px;
    border:1px dotted #ccc;
    .avatar{
        width:100px;
        height:100px;
        display: block;
    }
    .avatar-uploader-icon{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #aaa;
        font-size: 24px
    }
}
</style>
