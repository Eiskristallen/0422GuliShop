//引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Detail from '@/pages/Detail';
import ShopCart from '@/pages/ShopCart';
import AddCartSuccess from '@/pages/AddCartSuccess';
//路由配置文件模块化,都写在一个模块里,然后导出后引入
export default {
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    { path: '/ShopCart', component: ShopCart, name: 'ShopCart' },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      name: 'AddCartSuccess',
      children: [],
    },
    {
      path: '/Detail/:keyWord?',
      component: Detail,
      name: 'Detail',
      children: [],
    },
    {
      path: '/Home',
      component: Home,
      name: 'Home',
      children: [],
      //处理routerlink(点击routerLink的时候会来这个文件夹里匹配对象)里面传的props参数
      //匹配成功之后会有一个新的对象$route(里面有传过来的数据和一些别的属性),然后这个新的对象会带去路径里面写的组件,然后可以通过$route拿到这个新的对象和里面的属性
      // props: true,
    },
    {
      path: '/Login',
      component: Login,
      name: 'Login',
      children: [],
      meta: { isHide: true }, //要隐藏footer
    },
    {
      path: '/Register',
      component: Register,
      name: 'Register',
      meta: { isHide: true }, //当切换到这俩组件里面,隐藏footer
      children: [],
    },
    {
      //如何制定params可传可不传入,后面加问号(如果不加问号的话,在不传入params的时候,前面的路径(search)会消失)
      //在params可传可不传的的情况下,params为空串,则会造成前面的路径消失,所以解决方案有二
      //第一个是直接不指定params参数,第二个是加个||undefined,这样如果是空串则会传入undefined,而undefined在前后端交互的时候代表什么都不传
      path: '/Search/:keyWord?',
      component: Search,
      name: 'Search',
      children: [],
      // props: true, //布尔值写法,代表把params参数通过属性传递给相应的组件
      //props也有对象写法props:{name:'隔壁老王'},对象写法只能传递静态的数据

      // props(route) {
      //   //里面的route是已经收集好参数的路由对象
      //   //函数写法,可以把params和query都映射到组件的属性上面去,组件可以用props接受
      //   //这个keyWord就是映射到组件属性里面的值
      //   return {
      //     //params和query都可以使用,那边接收了就可以直接使用
      //     keyWord: route.params.keyWord,
      //     keyWord2: route.query.keyWord,
      //   };
      // },
      //新生成的对象和.push传入的location一样
    },
    //重定向路由,如果用户访问的是根目录,则直接定向到home
    {
      path: '/',
      redirect: '/Home',
    },
  ],
};
