<template>
  <b-container class="h-100 mt-5 px-4" fluid>
    <b-row v-if="$store.state.lead.leads_loader" class="h-100">
      <b-col class="d-flex align-items-center justify-content-center h-100" lg="12" md="12" sm="12">
        <span class="custom_loader"></span>
      </b-col>
    </b-row>
    <b-row v-if="!$store.state.lead.leads_loader">
      <h1 v-if="!leads" class="text-center w-100">
        There are no records. Create a
        <nuxt-link to="/new-lead">new lead.</nuxt-link>
      </h1>
      <FilterTable v-if="leads"/>
      <b-col v-if="leads" class="mx-auto" lg="12" md="12" sm="12">
        <b-table :fields="fields" :items="leads.data" :tbody-tr-class="rowClass" responsive>
          <template #cell(created_at)="data">
            <span>{{ convert_date(data.item.created_at) }}</span>
          </template>
          <template #cell(remark)="data">
            <span v-b-tooltip.hover :title="data.item.remark">
              {{ data.item.remark.length > 15 ? data.item.remark.substring(0, 15) + ' ...' : data.item.remark }}
            </span>
          </template>
        </b-table>
        <b-pagination v-if="leads.total > 0"
                      v-model="$store.state.lead.current_page"
                      :hide-goto-end-buttons="true"
                      :per-page="perPage"
                      :total-rows="rows"
                      align="right"
                      @change="paginate"
        ></b-pagination>
        <p v-else class="text-center">No records found.</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";

export default {
  name: "ResultPage",
  middleware: ["notAuthenticated"],
  data() {
    return {
      perPage: 5,
      fields: ['status', 'name', 'email', 'phone', 'country', 'interest', 'source', {
        key: 'created_at',
        label: 'Date'
      }, 'remark'],
    }
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.status === 'New') return 'green_row'
      if (item.status === 'Contacted') return 'orange_row'
      if (item.status === 'Not Interested') return 'red_row'
    },
    convert_date(value) {
      return moment.utc(value).format("D MMMM YYYY");
    },
    paginate(page) {
      this.$store.state.lead.current_page = page
      this.$store.commit('lead/get_all_leads')
    }
  },
  mounted() {
    this.$store.commit('lead/get_all_leads')
  },
  computed: {
    rows() {
      return this.leads.total
    },
    leads() {
      // console.log(this.$store.state.lead.all_leads)
      return this.$store.state.lead.all_leads
    }
  }
}
</script>

<style>
tr {
  position: relative;
}

.pagination li:first-child, .pagination li:last-child {
  display: none
}

.pagination li {
  margin-left: 10px
}

tbody tr td {
  vertical-align: middle !important;
}

tbody tr td:first-child {
  border-left: 5px solid !important
}

tbody tr.green_row td:first-child {
  border-color: #C5E0B4 !important;
  color: #8DA573 !important;
  /*font-weight: bold !important*/
}

tbody tr.red_row td:first-child {
  border-color: #E36B82 !important;
  color: #E36B82 !important
}

tbody tr.orange_row td:first-child {
  border-color: #F8CBAD !important;
  color: #F4B183 !important
}
</style>
