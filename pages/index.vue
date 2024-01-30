<template>
  <b-container class="h-100">
    <b-row class="h-100">
      <b-col class="mx-auto my-auto" lg="5" md="12" sm="12">
        <b-card class="bg_grey border-0 px-md-5 px-sm-0 py-3">
          <h1>User Login</h1>
          <b-form @submit.prevent="saveData">
            <b-form-group>
              <b-form-input
                v-model="email"
                placeholder="Username *"
                required
                type="text"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                v-model="password"
                placeholder="Password *"
                required
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-button :disabled="loading || !email || !password" class="base_bg_color w-100 btn-lg" type="submit">
              <span v-if="!loading">Login</span>
              <b-spinner v-else medium variant="light"></b-spinner>
            </b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ["authenticated"],
  data() {
    return {
      loading: false,
      email: '',
      password: '',
    }
  },
  methods: {
    async saveData() {
      this.loading = true;

      const fd = new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);
      this.$toast.clear()

      await this.$axios
        .post(`${process.env.baseUrl}user/login/`, fd)
        .then((response) => {
          if (response.data) {
            localStorage.setItem("uf_auth_token", response.data.access);
            if (process.browser) {
              document.cookie = `uf_auth_token=${response.data.access}`;
            }
            window.location.href = '/new-lead';
          }
          this.loading = false;
        })
        .catch(() => {
          this.$toast.error("Incorrect username or password.");
          this.loading = false;
        });
    },
  }
}
</script>
