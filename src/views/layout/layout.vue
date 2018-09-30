<template>
 <div class="page">
    <div class="header ml-200">
        <h1 class="title">后台管理系统</h1>
        <el-dropdown class="admin-handle" @command="handleCommand">
            <div class="avatar-wrap">
                <img :src="userInfo.avatar">
            </div>
    <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="1" >修改个人信息</el-dropdown-item>
    <el-dropdown-item command="2">退出登录</el-dropdown-item>
  </el-dropdown-menu>
  </el-dropdown>
     </div>
     <div class="side-bar">
            <el-menu 
            background-color = "#545c64"
            text-color = "#fff"
            :router = "true"
            >
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
                </template>
                <el-menu-item-group>
                <template slot="title">用户管理</template>
                <el-menu-item index="/layout/index">首页</el-menu-item>
                <el-menu-item index="/login">登录页</el-menu-item>
                <el-menu-item index="/layout/users">用户管理页</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>分类管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/layout/category">分类列表</el-menu-item>
                <el-menu-item index="/layout/category/addCategory">添加分类</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-document"></i>
                <span>图书管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/layout/bookList">图书列表</el-menu-item>
                <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>轮播图管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/layout/swiperList">轮播图列表</el-menu-item>
                <el-menu-item index="/layout/swiperList/addSwiper">添加轮播图</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                <i class="el-icon-setting"></i>
                <span>后台管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/layout/addAdmin">添加管理员</el-menu-item>
                <el-menu-item index="/layout/userEdit">修改个人信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
    </div>
    <div class="main-content ml-200">
        <router-view></router-view>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            userInfo:{
            },
            }
        },
        methods: {
            initData(){
                this.userInfo = {
                    ...this.$store.state.userinfo
                }
            },
            handleCommand(command){
                let click = command
                if (click == 1) {
                this.$router.push("/layout/userEdit")                    
                }else if(click == 2){
                    this.$axios.get(`/logout`).then(res=>{
                        if (res.code == 200) {
                            let payload = {userInfo: '', avatar: '', email: '', desc: ''}
                            this.$message.success(res.msg)
                            this.$store.commit('GET_USERINFO', payload)
                            this.$router.push("/login")
                        }else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            }
        },
        computed:{
        },
        created () {
            this.initData()
        }
}
</script>

<style scoped lang="scss">
    .page{
        .ml{
            margin-left: 200px;
        }
    
        .title{
            font-weight: 500;
            text-align: center;
            border:1px solid #f1f1f1;
            height: 60px;
            line-height: 60px;
            font-size: 20px;
        }
    
    .side-bar{
        position: fixed;
        width: 200px;
        top: 0;
        left: 0;
        bottom: 0;
        background-color : #545c64;
        overflow: hidden;
        padding-top: 80px;
        
        /deep/{   //去右边的多出边框
            .el-menu{
                border-right:none;
            }
        }
    }
    .main-content{
        padding: 15px 0  0 220px;
    }
    .header{
        position: relative;
    }
    .admin-handle{
        cursor: pointer;
       position: absolute;
        right: 30px;
        top:5px;
        img{
            width: 50px;
            height: 50px;
        }
    }
    }
</style>
