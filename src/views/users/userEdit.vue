<template>
 <div class="page">
     <div class="content">
         <h2 style="padding:10px 0;text-align:center">修改个人信息</h2>
     <el-form v-model="formData" class="form" label-position="left" size="small" label-width="90px">
         <el-form-item label="用户名:">
             <el-input v-model="formData.username" :disabled="true"></el-input>
         </el-form-item>
        <el-form-item label="昵称:">
             <el-input v-model="formData.nickname"></el-input>
         </el-form-item>
        <el-form-item label="邮箱:">
             <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="个人头像：">
            <imgUpload v-model="formData.avatar" style="float:left"></imgUpload>
        </el-form-item>
        <el-form-item label="个性签名：">
            <el-input type="textarea" v-model="formData.desc" class="input"></el-input>
        </el-form-item>
     </el-form>
     <el-button type="success" class="btn" @click="handleClick">确定修改</el-button>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
import imgUpload from "@/components/img-upload";

export default {
 data() {
 return {
     formData:{
         username:"",
         nickname:"",
         email:"",
         avatar:"",
         desc:""
     }
 }
 },
 components: {
    imgUpload
 },
 methods: {
     initData(){
         this.formData = {
            ...this.$store.state.userinfo
         }
     },
     handleClick(){
         this.$axios.put("/user/userInfo",this.formData).then(res=>{
             console.log(res)
             if (res.code == 200) {
                let userInfo = res.data
                this.$store.commit("CHANGE_USERINFO",userInfo)
                this.initData()
                this.$message.success(res.msg)
             }
             
         })
     }
 },
 created() {
     this.initData()
 },
}
</script>

<style scoped lang="scss">
.page{
    width: 600px;
     margin: 0 auto;
     background: #f1f1f1;
    .content{
        // width: 600px;
    .form{
       margin-top: 14px;
       padding-left:10px;
      
        }
    }
 .btn{
           width:50%;
           margin-left:150px;
           margin-bottom: 24px
       }
}
</style>
