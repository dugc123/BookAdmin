<template>
 <div class="page">
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加分类</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
     <el-form v-model="formData">
        <el-form-item label="分类名">
            <el-input  placeholder="请输入分类名" class="input" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="分类图标:">
            <imgUpload  style="float:left" v-model="formData.icon"></imgUpload>
        </el-form-item>
        <el-form-item label="分类排序" v-model="index">
            <template>
                <el-input-number v-model="index" @change="handleChange" :min=0 :max=1000></el-input-number>
            </template>
        </el-form-item>
        <el-button type="success" @click="addCategory">添加分类</el-button>
    </el-form>
 </div>
</template>

<script type="text/ecmascript-6">
import imgUpload from "@/components/img-upload";

export default {
 data() {
 return {
        formData:{
            title:"",
            icon:"",
        },
         index:1
 }
 },
 components: {
        imgUpload
 },
 methods: {
      handleChange(value) {
        this.index = value
      },
      addCategory(){
          this.$axios.post(`/category`,this.formData).then(res=>{  
            if (res.code == 200) {
                // this.index = res
                // console.log(this.index)
                this.$message.success(res.msg);
                this.$router.push("/layout/category")
              }else{
                  this.$message.error(res.msg); 
              }
          })
      }
 }
}
</script>

<style scoped lang="scss">
.input{
    width: 68%;
    margin-top: 18px
}
</style>
