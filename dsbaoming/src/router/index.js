import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import choosepro from '@/components/choosepro'
// import updateInfo from '@/components/updateInfo'
import searchInfo from '@/components/searchInfo'
import yanshou from '@/components/yanshou'
import FreshmanPage from '@/components/FreshmanPage'
import othersPage from '@/components/othersPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/FreshmanPage',
      name:'FreshmanPage',
      component:FreshmanPage
    },
    {
      path:'/othersPage',
      name:'othersPage',
      component:othersPage
    },
    {
      path: '/searchInfo',
      name: 'searchInfo',
      component: searchInfo
    },
    // {
    //   path: '/updateInfo',
    //   name: 'updataInfo',
    //   component: updateInfo
    // },
    {
      path: '/choosepro',
      name: 'choosepro',
      component: choosepro
    },
    {
      path:'/yanshou',
      name:'yanshou',
      component:yanshou
    }

  ]
})
