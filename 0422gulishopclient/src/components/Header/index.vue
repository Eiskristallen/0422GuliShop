<template>
  <!-- 拿去header HTML -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- <router-link
              :to="{
                path: '/Login',
                name:'Name'
                params:'要传给路由组件的参数  '
              }"
              >登录</router-link
            > 对象形写法-->
            <router-link to="/Login">登录</router-link>
            <router-link to="/Register" class="register">免费注册</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 组件标签 -->
        <router-link to="/Home" class="logo" title="尚品汇" target="_blank"
          ><img src="./images/logo.png" alt=""
        /></router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank"> -->
        <!-- 会去header文件夹下面的images里面寻找这个图片1 -->
        <!-- <img src="./images/logo.png" alt="" />
        </a> -->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      keyWord: '',
    };
  },
  name: 'Header',
  methods: {
    //这是点击按钮的时候,会带着params和query
    toSearch() {
      let location = {
        // path: '/Search',
        //name和params不能一起用
        //query无所谓,但是如果要用params必须用name配合
        name: 'Search',
        params: {
          //如果params是一个空串的话,则直接带过去一个undefined,undefined在前后端交互的时候代表什么都不传
          keyWord: this.keyWord || undefined,
        },
        //点search的时候要先判断是否有query参数,如果有要和params拼在一起然后导航至该页面

        // query: {
        //   keyWord: this.keyWord.toUpperCase(),
        // },
      };
      if (this.$route.query) {
        location.query = this.$route.query;
      }

      // 编程式导航,因为没写组件标签,所以内存中不会有组件对象
      //所以编程式导航会比组件标签快
      //编程式导航如果用push则会留下历史记录然后可以返回
      //如果用replace则无法返回上一页
      //要传参的话,可以在路径里面写query
      //也可以用对象写路径和要穿进去的params
      // this.$router.push(`/Search`); 字符串形式
      //vue router3.0以上这个push返回的是promise,所以如果push不处理的话,连续点击会出现duplicated navigation
      if (this.$route.path === '/Home') {
        this.$router.push(location);
      } else {
        this.$router.replace(location);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
