<template>
<div class="page">

    <div class="main-content ml-200">
        <h2>欢迎来到XXX后台管理首页</h2>
    </div>
    <h2>ajax表单上传</h2>
    <div>
        <input type="file" name="file " @change="handleChange">
        <img :src="imgData">
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import axios from "axios"
export default {
 data() {
 return {
     token:"",
     imgData:""
 }
 },
 components: {

 },
 methods:{
    getToken() {
        axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        //   console.log(res)
          this.token = res.data.data
        })
      },
     handleChange(event){
         console.log(event)
         let file = event.target.files[0]
        // console.log(file)
         let formData = new FormData()
         formData.append('file',file,file.name)
         formData.append('token',this.token)

         axios.post("https://upload-z1.qiniup.com",formData,{
             headers:{
                //  "Content-Type":"multipart/form-data"
                //  "Content-type":"application/x-www-form-urlencoden",
                //  "Content-type":"application/json",
             }
         }).then(res=>{
             this.imgData = res.data.url
         })
         
     }
 },
 created () {
     this. getToken()
 }
}
</script>

<style scoped lang="scss">
    .page{
        .ml-200{
            margin-left: 200px;
        }
    
    }
</style>