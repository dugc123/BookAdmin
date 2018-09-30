<template>
 <div class="page">
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>编辑分类</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form style="margin-top:32px" :model="typeOptions">
        <el-form-item label="分类名:">
            <el-input style="width:50%" v-model="typeOptions.title"></el-input>
        </el-form-item>
        <el-form-item label="分类图片:">
            <imgUpload v-model="typeOptions.icon" style="float:left"></imgUpload>
        </el-form-item>
        <el-form-item label="分类排序">
            <template>
                <el-input-number v-model="typeOptions.index" :min=1></el-input-number>
            </template>
        </el-form-item>
    </el-form>
    <el-button type="danger" @click="handleSubmit">提交修改</el-button>
</div>
</template>

<script type="text/ecmascript-6">
import imgUpload from "@/components/img-upload";

export default {
 data() {
 return {
    typeOptions:{
        icon:"",
        index:"",
        title:"",
    }
 }
 },
 components: {
    imgUpload
 },
 methods: {
      handleChange(value) {
        console.log(value);
      },
    getCategory() {
        const id = this.$route.query.id
        this.$axios.get(`/category/${id}`).then(res => {
        this.typeOptions =res.data;        
        })
    },
    handleSubmit(){
          const id = this.$route.query.id
        this.$axios.put(`/category/${id}`,this.typeOptions).then(res=>{
            if (res.code == 200) {
                this.$message.success(res.msg);
                this.$router.push("/layout/category")
            }else{
                this.$message.error(res.msg);
            }
        })
    }
 },
 created() {
    this.getCategory()
 },
}
</script>

<style scoped lang="scss">
</style>
