<template>
  <div>
    <b-sidebar id="sidebar" right shadow title="Sidebar">
      <b-list-group>
        <b-list-group-item button>
          <nuxt-link to="/new-lead">New Lead</nuxt-link>
        </b-list-group-item>
        <b-list-group-item button>
          <nuxt-link to="/result">Result</nuxt-link>
        </b-list-group-item>
        <b-list-group-item v-if="authenticated" button @click="logout">Logout</b-list-group-item>
        <b-list-group-item v-else button>
          <nuxt-link to="/">Login</nuxt-link>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
  </div>
</template>

<script>
import FormData from "form-data";
import Cookies from 'js-cookie'

export default {
  name: "SidebarComponent",
  data() {
    return {
      authenticated: null
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('uf_auth_token')
      if (process.browser) {
        Cookies.remove('uf_auth_token')
        document.cookie = 'uf_auth_token=""';
      }
      location.reload()
    },
  },
  async mounted() {
    const token = this.$store.state.uf_auth_token.token
    if (token) {
      const fd = new FormData()
      fd.append('token', token)
      try {
        await fetch(`${process.env.baseUrl}user/check-auth/`, {
          method: 'POST',
          body: fd,
        }).then((res) => {
          if (res.status === 200) {
            this.authenticated = true
          } else {
            this.authenticated = false
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
a {
  color: #495057;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
