import Api from './Api'

export default {
  index() {
    return Api().get('categories')
  },
  save(category) {
    return Api().post('categories', category)
  }
}
