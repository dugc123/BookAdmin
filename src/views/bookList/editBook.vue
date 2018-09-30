<template>
 <div class="page">
<div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>编辑图书</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="form">
      <el-form :model="formData" label-width="100px" label-position = "left">
    <el-form-item label="书籍名:">
        <el-input style="width:60%" v-model="formData.title"></el-input>
    </el-form-item>
    <el-form-item label="作者:">
        <el-input v-model="formData.author" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="图书头图">
          <imgUpload v-model="formData.img" style="float:left"></imgUpload>
      </el-form-item>
      <el-form-item label="书籍简介:">
        <el-input v-model="formData.desc" type="textarea" style="width：80%"></el-input>
      </el-form-item>
      <el-form-item label="图书分类:">
        <el-select v-model="formData.type">
          <el-option
            v-for="(item, index) in typeOptions"
            :value="item._id"
            :label="item.title"
            :key="index">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
      <el-button type="success" @click="handleSave">保存更改</el-button>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import imgUpload from "@/components/img-upload";

export default {
 data() {
 return {
    formData:{
          title: '',
          author: '',
          img: '',
          desc: '',
          type: '',
          index:""
    },
    typeOptions:[],
    count:""
 }
 },
 components: {
      imgUpload
 },
 methods: {
    getCategory() {
      return new Promise(resolve => {
        this.$axios.get("/category",{pn:1,size:this.count}).then(res => {
          console.log(res.data.title)
          this.typeOptions = res.data;
          resolve();
        });
      });
    },
      getBook(){
          const id = this.$route.query.id
          this.$axios.get(`/book/${id}`).then(res=>{
              // console.log(res.data)  
              this.formData = res.data
              this.count = res.count
          })
      },
      handleSave(){
         let params = {
          ...this.formData,
          book_id:this.$route.query.id
        } 
        this.$axios.put(`/book`,params).then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.push("/layout/bookList")
          }
        })
      }
 },
      created () {
          this.getCategory().then(()=>{
            this.getBook()         
          })
      }
}
</script>

<style scoped lang="scss">
.form{
    margin-top:10px
}
</style>
