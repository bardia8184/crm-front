export const strict = false

export const state = () => ({
  all_leads: [],
  leads_loader: true,
  current_page: 1,
  sort_filter: '',
  status_filter: '',
  source_filter: '',
  query: '',
})

export const mutations = {
  //  Get all leads
  async get_all_leads(state) {
    state.leads_loader = true
    await this.$axios
      .get(`${process.env.baseUrl}lead/all_leads/`, {
        params: {
          current_page: state.current_page,
          sort: state.sort_filter,
          status: state.status_filter,
          source: state.source_filter,
          query: state.query,
        },
      })
      .then((response) => {
        // const res = JSON.parse(response.data)
        console.log(response)
        state.all_leads = response.data
        state.leads_loader = false
      })
  },
}
