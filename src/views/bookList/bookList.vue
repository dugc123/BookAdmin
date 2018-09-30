<template>
 <div class="page">
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>图书列表</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
     <el-table :data="tableData" border
    style="margin-top:20px">
    <el-table-column
      prop="title"
      label="书名"
      width="240">
    </el-table-column>
     <el-table-column
      prop="img"
      label="书籍头图"
      width = "80"
      heigth = "40"
     >
      <template slot-scope="scope">
          <img :src="scope.row.img" class="img">
      </template>
    </el-table-column>
    <el-table-column
      prop="index"
      label="书籍排序"
      width="120">
    </el-table-column>
        <el-table-column
      prop="author"
      label="作者"
      width="180">
    </el-table-column>
  <el-table-column label="操作"  width="320">
      <template slot-scope="scope">
      <el-button type="primary" @click="handleEdit(scope.row._id)">
        编辑
      </el-button>
    <el-button  type="danger" @click="handleDelete(scope.row._id)">
        删除图书
      </el-button>
      </template>
  </el-table-column>
  </el-table>
<el-pagination
  background
  @current-change="pageChange"
  layout="prev, pager, next"
  :total = 110>
</el-pagination>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
    return {
        tableData:[],
        page:1,
        count:0
    }
    },
 components: {

 },
 methods: {
     getData(){
         this.$axios.get("/book",{pn:this.page,size:5}).then(res=>{
             if (res.code == 200) {
            this.tableData = res.data
            // this.count = res.count
            // console.log(res.count)
             }
         })
     },

     handleEdit(id){
        this.$router.push({name: 'editBook', query: {id}})
     },

     pageChange(page){
        // console.log(page)
        this.page = page
        this.getData();
     },
     handleDelete(id){
          this.$confirm('此操作删除该图书, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$axios.delete(`/book/${id}`).then(res=>{
            this.$message.success(res.msg)
            this.getData()
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }
 },
 created () {
     this.getData()
 } 
}
</script>

<style scoped lang="scss">
.img{
    width: 40px;
    width: 60px;
}
</style>
