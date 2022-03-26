<template>
  <v-app>
    <dashboard-core-drawer :modelValue.sync="expandOnHover"/>
    <dashboard-core-app-bar @onClickButton="handleClick"/>
    <dashboard-core-view />
<!--    <dashboard-core-footer/>-->
  </v-app>
</template>

<script>
import DashboardCoreAppBar from "@/views/dashboard/components/core/AppBar";
import DashboardCoreDrawer from "@/views/dashboard/components/core/Drawer";
/*import DashboardCoreFooter from "@/views/dashboard/components/core/Footer";*/
import DashboardCoreView from "@/views/dashboard/components/core/View";

export default {
  name: 'DashboardIndex',
  components: {
    DashboardCoreView,
/*    DashboardCoreFooter,*/
    DashboardCoreDrawer,
    DashboardCoreAppBar
  },

  data: () => ({
    expandOnHover: false,
  }),

  methods: {
    handleClick(value) {
      this.expandOnHover = value; // someValue
    }
  },

}
</script>