import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/dashboard/Index';
import MembersTable from '@/views/Members/MembersTable';
import Home from "@/views/Home";
import MembersForm from "@/views/Members/MembersForm";
import LoansForm from "@/views/Loans/LoansForm";
import LoansTable from "@/views/Loans/LoansTable";
import ReportsDownload from "@/views/Reports/Reports";
import PaymentsTable from "@/views/Payments/PaymentsTable";

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
        path: 'loansForm/:id?',
        component: LoansForm,
      },
      {
        name: 'LoansTable',
        path: 'loansTable',
        component: LoansTable,
      },
      {
        name: 'Reports',
        path: 'reports',
        component: ReportsDownload,
      },
      {
        name: 'PaymentsTable',
        path: 'paymentsTable/:id?',
        component: PaymentsTable,
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router