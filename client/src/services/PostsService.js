import Api from './Api'

export default {
  index() {
    return Api().get('posts')
  },
  save(post) {
    return Api().post('posts', post)
  },
  show(slug) {
    return Api().get(`posts/${slug}`)
  }
}
