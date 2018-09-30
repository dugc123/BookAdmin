<template>
 <div class="page">
     <h1 class="title">欢迎来到XXX后台管理系统</h1>
     <div class="login-box">
         <h3 class="login-box-title">请登录</h3>
         <el-form class="form" ref="formData" :rules="rules" :model="formData">
             <el-form-item label="用户名："  prop="username">
                <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
             </el-form-item>
             <el-form-item label="密码：" @keyup.13.native="handleLogin" prop="userPassword">
                  <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
             </el-form-item>
         </el-form>
         <el-button @click="handleLogin"  type="primary" :loading="isLoading" >登录</el-button>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 data() {
     const validateUsername = (rule,value,callback)=>{
         if (value) {
            callback()
         }else{      
            callback(new Error("必须输入合法的用户名"))
         }
     }
     const  validatePassword = (rule,value,callback)=>{
        if (value && value.length >= 5) {
            callback()
        }else{
           callback(new Error('请输入正确的密码'));
        }
     };
 return {
     formData:{
        username:"admin",
        password:"admin"
     },
     rules:{
        username:[
            {validator:validateUsername,trigger: 'blur'}
            ],
        userPassword:[
            {validator:validatePassword,trigger: 'blur'}
            ]    
     },
    isLoading : false

 }
 },
 components: {

 },
    methods: {
        handleLogin(){
            this.isLoading = true
            this.$axios.post("/login",this.formData).then(res=>{
            console.log(res)
            if (res.code == 200) {
                this.$store.commit("CHANGE_USERINFO",res.data)
                this.$store.commit("GET_USERINFO",res.data)
                this.$message.success('登录成功');
                setTimeout(() => {
                this.$router.push("/layout/index")                       
                }, 1000);
            }else{
                    this.$message.error(res.msg);
               }
               this.isLoading = false
            }).catch(err=>{
                this.isLoading = false
            })
        },
       submitForm() {
        this.$refs["formData"].validate((valid) => {
          if (valid) {
           this.handleLogin()
          } else {
            return false;
          }
        });
      }
    }
}
</script>

<style scoped lang="scss">
.page{
    overflow: hidden;
    height: 100vh;
    background: #545f67;
   .title{
    margin:80px auto 20px;
    font-weight: 400;
    text-align: center;
    color:#fff;
   }
   .login-box{
       width: 400px;
       height: 340px;
       background-color: #fff;
       margin: 0 auto;
       border-radius: 8px;
       padding: 20px;
       .login-box-title{
            padding:12px 0;
            font-weight: 500;
            text-align: center
       }
       button{
            width:100%;
            margin-top: 20px;
            box-sizing: border-box
       }
   }
}
</style>
