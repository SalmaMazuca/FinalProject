import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Contact from '@/components/Contact'
import AboutUs from '@/components/AboutUs'
import AddStory from '@/components/AddStory'
import Story from '@/components/Story'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/stories/add',
      name: 'AddStory',
      component: AddStory
    },
    {
      path: '/stories/:id',
      name: 'Story',
      component: Story
    }
  ]
})
