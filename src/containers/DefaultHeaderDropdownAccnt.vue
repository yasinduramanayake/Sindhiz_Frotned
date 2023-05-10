<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/default-user.png"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
        <span class="d-md-down-none" v-if="$auth.ready()">{{ $auth.user().name }}</span>
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item @click="showChangePassword"><i class="fa fa-shield" />Change Password</b-dropdown-item>
      <b-dropdown-item v-on:click="logout"><i class="fa fa-lock" />Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import ChangePassword from './ChangePassword'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown,
    ChangePassword
  },
  data: () => {
    return {}
  },
  methods: {
    showChangePassword() {
      this.$emit('changePassword')
    },
    logout() {
      this.$auth.logout();
      this.$router.push('login');
    }
  }
}
</script>
