<template>
 <div class="page">
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>编辑轮播图</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
     <el-form v-model="formData" class="form" label-width="100px"  label-position="left">
        <el-form-item label="标题">
            <el-input class="input" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
            <el-input class="input" v-model="author"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片:">
            <imgUpload  style="float:left" v-model="formData.img"></imgUpload>
        </el-form-item>
        <el-form-item label="轮播图排序：">
            <template>
                <el-input-number v-model="formData.index" :min="1" :max="1000"></el-input-number>
            </template>            
        </el-form-item>   
        <el-form-item label="图书详情:">
            <el-input type="textarea" v-model="desc" style="width:98%"></el-input>            
        </el-form-item>
        <el-button type="success" @click="handleSave">保存修改</el-button>
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
            console.log(res.data)
            this.desc = res.data.book.desc
            this.author = res.data.book.author
            // console.log(res.data.book._id)
            this.formData.book = res.data.book._id
            // console.log(this.formData.book)  
        })
    },
    handleSave(){
       let id = this.$route.query.id
        this.$axios.put(`/swiper/${id}`,this.formData).then(res=>{
            if (res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push("/layout/swiperList")
            }
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
