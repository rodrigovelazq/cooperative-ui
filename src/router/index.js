import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/dashboard/Index';
import UsersTable from '@/views/Users/UsersTable';
import Home from "@/views/Home";
import UsersForm from "@/views/Users/UsersForm";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        name: 'Home',
        path: '',
        component: Home,
      },
      {
        name: 'UsersTable',
        path: 'usersTable',
        component: UsersTable,
      },
      {
        name: 'UsersForm',
        path: 'usersForm',
        component: UsersForm,
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router