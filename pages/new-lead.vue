<template>
  <b-container class="h-100">
    <b-row class="h-100">
      <b-col class="mx-auto mt-5" lg="5" md="12" sm="12">
        <b-card class="bg_grey border-0 px-md-5 px-sm-0 py-3">
          <h1>New Lead</h1>
          <b-form @submit.prevent="saveData">
            <!-- Status -->
            <b-form-group>
              <b-form-select v-model="status" :options="status_options">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Status * --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <!-- Name -->
            <b-form-group>
              <b-form-input
                v-model="name"
                placeholder="Name *"
                required
                type="text"
              ></b-form-input>
            </b-form-group>
            <!-- Email -->
            <b-form-group>
              <b-form-input
                v-model="email"
                placeholder="Email *"
                required
                type="email"
              ></b-form-input>
            </b-form-group>
            <!-- Phone -->
            <b-form-group>
              <b-form-input
                v-model="phone"
                placeholder="Phone *"
                required
                type="text"
              ></b-form-input>
            </b-form-group>
            <!-- Country -->
            <b-form-group>
              <b-form-input
                v-model="country"
                placeholder="Country *"
                required
                type="text"
              ></b-form-input>
            </b-form-group>
            <!-- Interest -->
            <b-form-group>
              <b-form-input
                v-model="interest"
                placeholder="Interest *"
                required
                type="text"
              ></b-form-input>
            </b-form-group>
            <!-- Source -->
            <b-form-group>
              <b-form-select v-model="source" :options="source_options">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Source * --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <!-- Remark -->
            <b-form-group>
              <b-form-input
                v-model="remark"
                placeholder="Remark *"
                required
                type="text"
              ></b-form-input>
            </b-form-group>
            <b-button
              :disabled="loading || !email || !name || !source || !status || !phone || !country || !interest || !remark"
              class="base_bg_color w-100 btn-lg"
              type="submit">
              <span v-if="!loading">Save</span>
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
  name: "NewLeadPage",
  middleware: ["notAuthenticated"],
  data() {
    return {
      source: null,
      status: null,
      source_options: [
        {value: 'Instagram', text: 'Instagram'},
        {value: 'Facebook', text: 'Facebook'},
        {value: 'Tiktok', text: 'Tiktok'},
      ],
      status_options: [
        {value: 'New', text: 'New'},
        {value: 'Contacted', text: 'Contacted'},
        {value: 'Not Interested', text: 'Not Interested'},
      ],
      loading: false,
      name: '',
      email: '',
      phone: '',
      country: '',
      interest: '',
      remark: '',
    }
  },
  methods: {
    async saveData() {
      this.loading = true;
      const fd = new FormData();
      fd.append("name", this.name);
      fd.append("email", this.email);
      fd.append("phone", this.phone);
      fd.append("country", this.country);
      fd.append("interest", this.interest);
      fd.append("remark", this.remark);
      fd.append("source", this.source);
      fd.append("status", this.status);
      this.$toast.clear()

      await this.$axios
        .post(`${process.env.baseUrl}lead/new_lead/`, fd)
        .then((response) => {
          console.log(response)
          if (response.data.status === 'success') {
            this.$toast.success(response.data.msg);
            this.name = ''
            this.email = ''
            this.phone = ''
            this.country = ''
            this.interest = ''
            this.remark = ''
            this.status = ''
            this.source = ''
          } else {
            this.$toast.error(response.data.msg);
          }
          this.loading = false;
        })
        .catch((e) => {
          this.$toast.error(e);
          this.loading = false;
        });
    },
  }
}
</script>
