<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo.png" width="100%" height="100%" alt="SindhizOnline Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <DefaultHeaderDropdownAccnt @changePassword="showChangePassword"/>
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <b-modal ref="modalChangePassword" title="Change Password" hide-footer>
        <change-password  @cancel="cancelChangePassword" @success="changePasswordSuccess"/>
      </b-modal>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="#">SindhizOnline</a>
        <span class="ml-1">&copy; 2019.</span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
import SidebarNav from './sidebar/SidebarNav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import ChangePassword from './ChangePassword'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    ChangePassword
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },
  methods: {
    showChangePassword() {
      this.$refs.modalChangePassword.show()
    },
    cancelChangePassword() {
      this.$refs.modalChangePassword.hide()
    },
    changePasswordSuccess() {
      this.$refs.modalChangePassword.hide()
    }
  }
}
</script>
