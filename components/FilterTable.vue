<template>
  <b-col class="mx-auto d-flex flex-wrap flex-md-row justify-content-between align-items-center" lg="12" md="12"
         sm="12">
    <!-- Query -->
    <b-col class="my-1 p-0" lg="4" md="3" sm="12">
      <b-input-group size="sm">
        <b-form-input
          v-model="$store.state.lead.query"
          class="p-3"
          placeholder="Type and press enter to search"
          type="search"
          @keyup.enter="query_filter"
        ></b-form-input>
      </b-input-group>
    </b-col>
    <!-- Dropdown filters -->
    <b-col class="my-1 d-flex flex-row flex-wrap justify-content-end p-0" lg="8" md="9" sm="12">
      <!-- Sort -->
      <b-col class="mb-2 mb-lg-0" md="3" sm="4">
        <b-form-select v-model="$store.state.lead.sort_filter" :options="sort_options" @change="change_sort">
          <template #first>
            <b-form-select-option value="">-- Date --</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <!-- Source -->
      <b-col class="mb-2 mb-lg-0" md="3" sm="4">
        <b-form-select v-model="$store.state.lead.source_filter" :options="source_options" @change="change_source">
          <template #first>
            <b-form-select-option value="">-- Source --</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <!-- Status -->
      <b-col class="mb-2 mb-lg-0" md="3" sm="4">
        <b-form-select v-model="$store.state.lead.status_filter" :options="status_options" @change="change_status">
          <template #first>
            <b-form-select-option value="">-- Status --</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <!--  New lead button -->
      <nuxt-link class="base_bg_color btn text-white d-none d-md-block" to="/new-lead">New Lead</nuxt-link>
    </b-col>
  </b-col>
</template>

<script>
export default {
  name: "FilterTable",
  data() {
    return {
      sort_options: [
        {value: 'Oldest', text: 'Oldest'},
        {value: 'Newest', text: 'Newest'},
      ],
      source_options: [
        {value: 'Instagram', text: 'Instagram'},
        {value: 'Facebook', text: 'Facebook'},
        {value: 'Tiktok', text: 'Tiktok'},
      ],
      status_options: [
        {value: 'New', text: 'New'},
        {value: 'Contacted', text: 'Contacted'},
        {value: 'Not Interested', text: 'Not Interested'},
      ]
    }
  },
  methods: {
    change_sort(value) {
      this.$store.state.lead.sort_filter = value;
      this.$store.commit('lead/get_all_leads')
    },
    change_source(value) {
      this.$store.state.lead.source_filter = value
      this.$store.commit('lead/get_all_leads')

    },
    change_status(value) {
      this.$store.state.lead.status_filter = value
      this.$store.commit('lead/get_all_leads')
    },
    query_filter(value) {
      this.$store.state.lead.query = value.target.value
      this.$store.commit('lead/get_all_leads')
    }
  }
}
</script>
