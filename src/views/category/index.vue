<template>
 <div class="page">
<div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            </el-breadcrumb>
     </div>
     <el-table :data="tableData" border
    style="margin-top:20px">
    <el-table-column
      prop="title"
      label="分类名"
      width="340">
    </el-table-column>
    <el-table-column
      prop="icon"
      label="分类图标"
      width="200">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="icon">
      </template>
    </el-table-column>
    <el-table-column
      prop="index"
      label="分类排序"
      width="180">
    </el-table-column>

  <el-table-column label="操作"  width="360">
      <template slot-scope="scope">
      <el-button type="primary" @click="handleEdit(scope.row._id)">
          编辑
      </el-button>
    <el-button  type="danger" @click="handleDelete(scope.row._id)">
          删除分类
      </el-button>
      </template>
  </el-table-column>
  </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="pageChange"
            :page-size = 5
            :total = "count">
        </el-pagination>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
  return {    
      pn:"",
      size:"",
      tableData: [],
      count:0,
      page:1
  }
  },

 methods: {
     getData(){
        return new Promise(resolve => {
          this.$axios.get('/category',{pn:this.page,size:5}).then(res => {
            this.tableData = res.data
            this.count = res.count
            resolve()
          })
        })

     },
     handleEdit(id){
       this.$router.push({name: 'editCategory', query: {id}})
     },
     handleDelete(id){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.delete(`/category/${id}`).then(res => {
            if (res.code == 200) {
              this.$message({
                type:'success',
                message: res.msg
              });
              this.getData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

     },
    pageChange(page){
      // console.log(page)
      this.page = page
      this.getData();
    }
 },
 created() {
     this.getData()
 },
}
</script>

<style scoped lang="scss">
.icon{
  width: 80px;
  height: 80px;
}
</style>
