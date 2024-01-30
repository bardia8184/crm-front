const FormData = require('form-data')
export default async function (context) {
  const token = context.store.state.uf_auth_token.token
  if (token) {
    const fd = new FormData()
    fd.append('token', token)
    try {
      await fetch(`${process.env.baseUrl}user/check-auth/`, {
        method: 'POST',
        body: fd,
      }).then((res) => {
        if (res.status === 200) {
          return context.redirect('/new-lead')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
