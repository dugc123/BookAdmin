<template>
 <div class="page">
<h3 style="text-align:center;padding:15px">添加管理员</h3>
    <el-form :model="infoData"  style="padding:15px" class="demo-form-inline" label-width="110px" label-position="left">
        <el-form-item label="用户名：">
            <el-input v-model="infoData.username" placeholder="请输入用户名" class="input"></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
            <el-input v-model="infoData.nickname" placeholder="请输入昵称" class="input"></el-input>
        </el-form-item>
        <el-form-item label="管理员头像：">
            <imgUpload v-model="infoData.avatar" style="float:left"></imgUpload>
        </el-form-item>
        <el-form-item label="密码：">
            <el-input type="password" v-model="infoData.password" placeholder="请输入密码" class="input"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码：">
            <el-input type="password" v-model="checkpassword" placeholder="请再次输入密码" class="input"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
            <el-input type="email" v-model="infoData.email" placeholder="请再次输入邮箱" class="input"></el-input>
        </el-form-item>
        <el-form-item label="个性签名：">
            <el-input type="textarea" v-model="infoData.desc" class="input"></el-input>
        </el-form-item>
    <el-button type="primary" @click="handleSave" class="btn">确定</el-button>
    </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import imgUpload from "@/components/img-upload";
export default {
 data() {
 return {
    infoData:{
        username:"",
        nickname:"",
        email:"",
        password:"",
        desc:"",
        avatar:""
    },
    checkpassword:""
 }
 },
 components: {
      imgUpload
 },
 methods: {       
    handleSave(){
        if(this.infoData.password == this.checkpassword ){
            this.$axios.post("/user",this.infoData).then(res=>{
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.$router.push("/layout/users")
                }else{
                this.$message.error(res.msg)
                }
        })
        }else{
            this.$message.error('两次输入的密码不一致')
        }

    }
 }
}
</script>

<style scoped lang="scss">
.page{
    width: 600px;
    margin:0 auto;
    background-color: #f1f1f1;
        .btn{
            width: 300px;
            margin-left:150px
        } 
}
</style>
