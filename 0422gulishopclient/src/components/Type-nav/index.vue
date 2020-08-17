<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="moveInDiv">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="onSearch($event)">
              <!--因为遍历的时候可以获取对应的下标,鼠标移入的时候可以获取对应组件的index,设置一个currenIndex,每次移入的时候让currentIndex等于对应组件的index
           然后判断获取的index和原来的是否对应,如果对应则启用显示分类列表的Class
            -->
              <div
                class="item"
                :class="{ item_on: currentIndex === index }"
                @mouseenter="onMove(index)"
                v-for="(c1, index) of categoryList"
                :key="c1.categoryId"
              >
                <h3>
                  <!-- 不写回调,直接推对象过去 -->
                  <a
                    href="javacript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <a
                  href="javacript:;"
                  @click="
                    $router.push({
                      name: 'Search',
                      query: {
                        categoryName: c1.categoryName,
                        category1Id: c1.category1Id,
                      },
                    })"
                  >{{ c1.categoryName }}</a
                > -->
                  <!-- 这个是导航去搜索页,里面写query -->
                  <!-- 写router-link创建的对象太多了,会卡,所以用编程式导航 -->
                  <!-- <router-link
                  :to="
                    `/Search?categoryName=
                ${c1.categoryName}&categoty1Id=${c1.categoryId}`"
                  >{{ c1.categoryName }}</router-link
                > -->
                  <!-- <router-link
                  :to="{
                    name: 'Search',
                    query: {
                      categoryName: c1.categoryName,
                      category1Id: c1.categoryId,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link
                > -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 of c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href="javacript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <a
                        href="javacript:;"
                        @click="
                          $router.push({
                            name: 'Search',
                            query: {
                              categoryName: c2.categoryName,
                              category1Id: c2.category2Id,
                            },
                          })"
                        >{{ c2.categoryName }}</a
                      > -->
                        <!-- <router-link
                        :to="{
                          name: 'Search',
                          query: {
                            categoryName: c2.categoryName,
                            category2Id: c2.categoryId,
                          },
                        }"
                        >{{ c2.categoryName }}</router-link
                      > -->
                      </dt>
                      <dd>
                        <em v-for="c3 of c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javacript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <a
                          href="javacript:;"
                          @click="
                            $router.push({
                              name: 'Search',
                              query: {
                                categoryName: c3.categoryName,
                                category1Id: c3.category3Id,
                              },
                            })"
                          >{{ c3.categoryName }}</a
                        > -->
                          <!-- <router-link
                          :to="{
                            name: 'Search',
                            query: {
                              categoryName: c3.categoryName,
                              category3Id: c3.categoryId,
                            },
                          }"
                          >{{ c3.categoryName }}</router-link
                        > -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//局部引入节流
import throttle from 'lodash/throttle';
import { mapState, mapGetters } from 'vuex';
//引入向接口请求数据的函数
// import {reqCategory} from '@/Api'
export default {
  data() {
    return {
      isShow: true,
      currentIndex: -1,
    };
  },
  // data () {
  //   return {
  //     categoryList = [],
  //   }
  // },

  // mounted () {
  //   reqCategory().then((response)=>{
  //     this.categoryList = response.data;
  //   });
  // },
  name: 'Type-nav',
  mounted() {
    //非home组件不显示三级分类的第一行
    if (this.$route.path !== '/Home') {
      this.isShow = !this.isShow;
    }
    // this.getCategoryList();
  },
  methods: {
    moveInDiv() {
      this.isShow = true;
    },
    moveOutDiv() {
      this.currentIndex = -1;
      if (this.$route.path !== '/Home') {
        this.isShow = false;
      }
    },
    onSearch() {
      let target = event.target;

      //拿到目标元素所有自定义1属性组成的对象
      let data = target.dataset;

      //有data.categoryName说明点击的是a标签
      let { categoryname, category1id, category2id, category3id } = data;
      // console.log(data);
      if (categoryname) {
        let location = {
          name: 'Search',
        };
        let query = {
          categoryName: categoryname,
        };
        if (category1id) {
          query.categoryId = category1id;
        } else if (category2id) {
          query.categoryId = category2id;
        } else {
          query.categoryId = category3id;
        }
        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        if (this.$route.path === '/Home') {
          this.$router.push(location);
        } else {
          this.$router.replace(location);
        }
      }
    },
    //挂载完毕后调用Vuex里面的getCategoryList发送请求,然后Home组件的state里面就能拿到数据
    // 不应该在typeNav请求数据,因为这个组件会反复创建和销毁,应该在home里面请求
    // getCategoryList() {
    //   this.$store.dispatch('getCategoryList');
    // },
    //函数节流
    onMove: throttle(
      function(index) {
        // console.log(index);
        this.currentIndex = index;
      },
      100,
      { trailing: false }
    ),
  },
  //计算属性来拿数据
  computed: {
    // ...mapState(...Home(['categoryList'])), //直接拿过来
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
    // ...mapGetters(['categoryList']),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fdfbfb;
      z-index: 999;
      &.show-enter {
        opacity: 0;
        height: 0;
      }
      &.show-enter-to {
        opacity: 1;
        height: 461px;
      }
      &.show-enter-active {
        transition: all 3s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 500px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: aqua;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
