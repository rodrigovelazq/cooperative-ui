import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/dashboard/Index';
import MembersTable from '@/views/Members/MembersTable';
import Home from "@/views/Home";
import MembersForm from "@/views/Members/MembersForm";
import LoansForm from "@/views/Loans/LoansForm";
import LoansTable from "@/views/Loans/LoansTable";

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
        name: 'MembersTable',
        path: 'membersTable',
        component: MembersTable,
      },
      {
        name: 'MembersForm',
        path: 'membersForm/:id?',
        component: MembersForm,
      },
      {
        name: 'LoansForm',
        path: 'loansForm',
        component: LoansForm,
      },
      {
        name: 'LoansTable',
        path: 'loansTable',
        component: LoansTable,
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router