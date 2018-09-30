<template>
 <div class="page">
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form v-model="formData" class="form" label-width="100px"  label-position="left">
        <el-form-item label="标题：">
            <el-input placeholder="请输入标题" class="input" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图的种类">
            <el-select v-model="formData.categoryId" placeholder="请选择" @change="categoryChange">
                <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.title" :value="item._id">
                </el-option>
            </el-select>
            <div class="book-item clearfix" v-if="getBookItem[0]">
                <div class="img-wrap">
                    <img :src="getBookItem[0].img" alt="">
                </div>
                <div class="book-desc">
                    <div class="title">
                        书籍标题：  {{getBookItem[0].title}}
                    </div>
                    <div class="author">
                        作者： {{getBookItem[0].author}}
                    </div>
                </div>
            </div>
            <el-dialog title="书籍列表" :visible.sync="isShowDialog">
                <el-table :data="bookData">
                    <el-table-column property="title" label="书名" width="220"></el-table-column>
                    <el-table-column property="img" label="书篇头图" width="100"  >
                        <template slot-scope="scope">
                            <img :src="scope.row.img" class="img">
                        </template>
                    </el-table-column>
                    <el-table-column property="author" label="作者"  width="120"></el-table-column>
                    <el-table-column label="操作"  width="120">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="handleClick(scope.row._id)">添加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="pageChange"
                    :total = "bookCount">
                </el-pagination>
            </el-dialog>
        </el-form-item>  
        <el-form-item label="轮播图图片:">
            <imgUpload  style="float:left" v-model="formData.img"></imgUpload>
        </el-form-item>
        <el-form-item label="轮播图排序：">
            <template>
                <el-input-number v-model="formData.index" :min="1" :max="1000"></el-input-number>
            </template>            
        </el-form-item>       
        <el-button type="success" @click="addSwiper">添加到轮播图</el-button>
    </el-form>
 </div>
</template>

<script>
import imgUpload from "@/components/img-upload";

export default {
 data() {
 return {
    formData:{
        title:"",
        img:"",
        index:"",
        book:"",
        categoryId:""//分类id
    },
    bookCount:1,
    page:1,
    typeOptions:[],
    isShowDialog:false,
    bookData:[]
 }
 },
 components: {
        imgUpload
 },
 methods: {
    getCategory() {
        this.$axios.get(`/category`).then(res => {
        this.typeOptions = res.data;        
        })
    },
    async getBookData(){
        const res = await this.$axios.get(`/category/${this.formData.categoryId}/books`,{pn:this.page,size:5})
            this.bookData = res.data.books
            this.bookCount = res.count           
    },
    categoryChange(){
        this.isShowDialog = true
        this.getBookData()
    },
    handleClick(id){
        this.formData.book = id 
        this.isShowDialog=false
    },
     pageChange(page){
    //   console.log(page)
      this.page = page
      this.getBookData();
    },
     addSwiper(){
         let isCanSubmit = true
           for(var key in this.formData){
               if(!this.formData[key]){
                   isCanSubmit = false
               }
           }
         if(isCanSubmit){
            this.$axios.post(`/swiper`,this.formData).then(res=>{
                        if (res.code == 200) {
                            this.$message.success(res.msg);
                            this.$router.push(`/layout/swiperList`)
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
         }else{
             this.$message.error("缺少必要参数")
         }
        
     }
 },
 created () {
      this.getCategory()
 },
 computed:{
     getBookItem(){
         if (this.formData.book) {   //如果有值表示用户已经选择了一本书
             return this.bookData.filter(item=> item._id == this.formData.book)             
         }else{
             return []
         }
     }
 }
}
</script>
<style scoped lang="scss">
.clearfix::after{
    content:"";
    display: block;
    clear: both;
    width: 0;
    height: 0;
}
.form{
    margin-top: 12px;
.input{
    width: 60%;
}
.img{
    width: 60px;
    height: 80px;
}
.book-item{
    width: 420px;
    padding: 15px;
    border: 1px solid #898;
    border-radius: 6px;
    margin-top: 14px;
    .img-wrap{
        float: left;
        width: 100px;
        height: 160px;
        line-height: 220px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .book-desc{
        float: left;
        margin-left: 20px;
    .title{
        font-weight: bold;
        font-size: 16px;
        color:#333;
    }
    .author{
        font-size: 14px;
        margin-top: 16px;
        color:#555
    }
    }

}
}
</style>