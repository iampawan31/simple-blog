<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-title> New Category </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                :counter="30"
                :rules="nameRules"
                label="Title"
                required
              ></v-text-field>
              <v-text-field
                v-model="slug"
                :rules="slugRules"
                disabled
                label="Slug"
              ></v-text-field>
              <v-btn color="success" class="mr-4" @click="saveCategory">
                Save
              </v-btn>
              <v-btn color="error" @click="reset"> Reset </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import CategoriesService from '@/services/CategoriesService'
export default {
  name: 'NewCategory',
  data: () => ({
    valid: true,
    name: null,
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 30) || 'Name must be less than 10 characters'
    ],
    slug: null,
    slugRules: [(v) => !!v || 'Slug is required']
  }),
  watch: {
    name(newValue, oldValue) {
      this.slug = newValue
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
    }
  },
  methods: {
    async saveCategory() {
      if (this.$refs.form.validate()) {
        const category = { name: this.name, slug: this.slug }
        await CategoriesService.save(category).then((response) => {
          this.$store.dispatch('getCategories')
          this.$router.push('/')
        })
      }
      return false
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
