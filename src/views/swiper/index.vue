<template>
 <div class="page">
    <h2>轮播图列表<i title="添加轮播图" class="el-icon-circle-plus-outline" @click="goAddSwiper"></i></h2>
    <el-table :data="tableData" border>
        <el-table-column label="头像" width="140">
            <template slot-scope="scope">
                <img :src="scope.row.img" class="img">
            </template>
        </el-table-column>
        <el-table-column label="类名" width="220" prop="sort">

        </el-table-column>
        <el-table-column label="标题" width="320" prop="title">
            <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p>标题: {{ scope.row.book.title }}</p>
                    <p>详情: {{ scope.row.book.desc}}</p>
                    <div slot="reference" >
                        <el-tag size="medium">{{ scope.row.title }}</el-tag>
                    </div>
                    </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="操作"  width="400">
        <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row._id)" type="primary">
                查看详情
            </el-button>
            <el-button  type="success" @click="handleEdit(scope.row._id)">
                编辑
            </el-button>
            <el-button  type="danger" @click="handleDetele(scope.row._id)">
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
            :total = "count">
        </el-pagination>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        tableData:[],
        pn: 1,
        count:0
    };
  },
  components: {},
  methods: {
     getData() {
      this.$axios.get(`/swiper`,{pn:this.page,size:5}).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
            this.count = res.count
        }
      });
    },
    handleDetail(id){
        this.$router.push({name: 'swipeDetail', query: {id}})
    },
    handleEdit(id){
        this.$router.push({name:"editSwiper",query:{id}})
    },
    goAddSwiper(){
        this.$router.push(`/layout/swiperList/addSwiper`)
    },
    pageChange(page){
      // console.log(page)
      this.page = page
      this.getData();
    },
    handleDetele(id){
        this.$confirm('此操作删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$axios.post("/swiper/delete",{ids:[id]}).then(res=>{
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
};
</script>

<style scoped lang="scss">
.img{
    width: 100px;
    height: 80px;
}
.el-icon-circle-plus-outline{
    cursor: pointer;
}
.name-wrapper{
    width: 600px;
}
</style>
