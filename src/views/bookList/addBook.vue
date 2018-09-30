<template>
 <div class="page">
      <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加图书</el-breadcrumb-item>
            </el-breadcrumb>
     </div>
     <el-form :model="formData" style="margin-top:20px" label-width="100px" label-position="left">
          <el-form-item label="图书分类">
          <el-select v-model="formData.typeId" placeholder="请选择">
            <el-option v-for="item in typeOptions" :key="item._id" :label="item.title" :value="item._id">
          </el-option>
  </el-select>
      </el-form-item>
        <el-form-item label="图书名称">
        <el-input v-model="formData.title" class="input"></el-input> 
    </el-form-item>
         <el-form-item label="爬虫链接">
         <el-input v-model="formData.url" placeholder="请输入爬虫链接" class="input"></el-input>
     </el-form-item>
    <el-form-item label="头图">
        <div style="clear:both;display:block;">
            <el-switch v-model="isShowUpload" active-text="手动上传" inactive-text="填写链接" 
            active-color="#13ce66" inactive-color="#ff4949"  @change="handleChange"><i class="el-icon-plus"></i>
            </el-switch>
        </div>
      <imgUpload v-model="formData.img" v-show="isShowUpload"></imgUpload>
        <el-input v-model="formData.img" v-show="!isShowUpload" class="input"></el-input>
    </el-form-item>
    <el-form-item label="作者">
        <el-input v-model="formData.author" class="input"></el-input> 
    </el-form-item>
     </el-form>
     <el-button @click="handleSubmit" type="success">
      添加图书
    </el-button>
 </div>
</template>

<script type="text/ecmascript-6">
import imgUpload from "@/components/img-upload";

export default {
   components: {
      imgUpload
    },
  data() {
    return {
      formData: {
        typeId: "",
        img: "",
        url: "",
        author: "",
        title:""
      },
      value: "",
      typeOptions: [],
      isShowUpload: true,
      count:""
    };
  },
  methods: {
   getCategory() {
      return new Promise(resolve => {
        this.$axios.get("/category",{pn:1,size:this.count}).then(res => {
          this.coount = res.count
          this.typeOptions = res.data;
          resolve();
        });
      });
    },
    handleSubmit() {
      this.$axios.post(`/book`,this.formData).then(res => {  
        if (res.code == 200) {  
          this.$message.success(res.msg);
          this.$router.push("/layout/bookList")
        } else {
          this.$message.error(res.msg);
        }
      });
    },
      handleChange(val){
        this.value = val
        this.imgs = val
      }
  },
  created() {
    this.getCategory();
  }
};
</script>

<style scoped lang="scss">
.page {
  .input {
    width: 60%;
  }
}
</style>
