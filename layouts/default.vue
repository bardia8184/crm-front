<template>
  <div>
    <b-navbar class="base_bg_color" toggleable="lg">
      <img alt="logo" class="logo" src="~/assets/images/logo.jpg"/>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Menu Icon -->
        <b-navbar-nav v-b-toggle.sidebar class="ml-auto">
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <SidebarComponent/>
    <Nuxt/>
  </div>
</template>

<script>
import SidebarComponent from "~/layouts/sidebar";

export default {
  name: 'DefaultLayout',
  components: {SidebarComponent},
}
</script>
<style scoped>
.logo {
  height: 50px;
}
</style>
