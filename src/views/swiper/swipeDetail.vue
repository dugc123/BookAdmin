<template>
 <div class="page">
  <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
     <el-form v-model="formData" class="form" label-width="90px"  label-position="left"  :disabled="true">
        <el-form-item label="标题">
            <el-input class="input" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
            <el-input class="input" v-model="author"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片:">
            <imgUpload  style="float:left" v-model="formData.img"></imgUpload>
        </el-form-item>
        <el-form-item label="index:">
            <el-input class="input" v-model="formData.index"></el-input>            
        </el-form-item>
        <el-form-item label="图书详情:">
            <el-input type="textarea" v-model="desc" style="width:98%"></el-input>            
        </el-form-item>
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
         index:"",
         img:"",
         book:"",
     },
       desc:"",
       author:""
 }
 },
 components: {
     imgUpload
 },
 methods: {
    getData(){
        const id = this.$route.query.id
        this.$axios.get(`/swiper/${id}`).then(res=>{
            this.formData = res.data
            // console.log(res.data)
            this.desc = res.data.book.desc
            this.author = res.data.book.author
        })
    }
 },
 created () {
     this.getData()
 }
}
</script>

<style scoped lang="scss">
.form{
    margin-top: 12px;
    .input{
        width: 50%;
    }
}
</style>
