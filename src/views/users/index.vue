<template>
 <div class="page">
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <el-table
    :data="tableData"
    border
    style="margin-top:12px">
    <el-table-column
      prop="username"
      label="姓名"
      width="140">                                
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      width="160">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="个性签名"
      width="340">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="用户头像"
      width = "100"
      heigth = "80">
      <template slot-scope="scope">
          <img :src="scope.row.avatar" class="avatar">
      </template>
    </el-table-column>
  <el-table-column label="操作"  width="320">
      <template slot-scope="scope">
      <el-button @click="handleDetail" type="primary">
          查看详情
      </el-button>
    <el-button  type="danger" @click="handleDelete(scope.row._id)">
          删除
      </el-button>
      </template>
  </el-table-column>
  </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="pageChange"
            :page-size = 5
            :total = "count" class="bottom">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      count:0,
      page:1
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios.get("/user",{pn:this.page,size:5}).then(res => {
        if (res.code == 200) {
          this.count = res.count
          this.tableData = res.data;
        }
      });
    },
    handleDetail(){
        this.$router.push("/layout/userDetail")
    },
    handleDelete(id){
          this.$confirm('此操作删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$axios.post("/user/delete",{userIds:[id]}).then(res=>{
            this.$message.success(res.msg)
            this.getData()
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
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.page {
  .avatar {
    width: 80px;
    height: 66px;
  }
  .bottom{
    position: fixed;
    left: 50%;
    bottom:0;
    transform: translateX(-50%)
  }
}
</style>
