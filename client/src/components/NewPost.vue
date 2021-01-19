<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="9">
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="post.title"
                :counter="100"
                :rules="titleRules"
                :hint="titleSlug"
                label="Title"
                required
              ></v-text-field>
              <div class="editor">
                <editor-menu-bar
                  :editor="postContent"
                  v-slot="{ commands, isActive }"
                >
                  <div class="menubar">
                    <v-btn icon @click="commands.bold"
                      ><v-icon :color="isActive.bold() ? 'cyan' : ''"
                        >mdi-format-bold</v-icon
                      ></v-btn
                    >
                    <v-btn icon @click="commands.italic"
                      ><v-icon :color="isActive.italic() ? 'cyan' : ''"
                        >mdi-format-italic</v-icon
                      ></v-btn
                    >
                    <v-btn icon @click="commands.strike"
                      ><v-icon :color="isActive.strike() ? 'cyan' : ''"
                        >mdi-format-strikethrough</v-icon
                      ></v-btn
                    >
                    <v-btn icon @click="commands.underline"
                      ><v-icon :color="isActive.underline() ? 'cyan' : ''"
                        >mdi-format-underline</v-icon
                      ></v-btn
                    >
                    <v-btn icon @click="commands.code"
                      ><v-icon :color="isActive.code() ? 'cyan' : ''"
                        >mdi-code-tags</v-icon
                      ></v-btn
                    >
                    <v-btn icon @click="commands.paragraph"
                      ><v-icon :color="isActive.paragraph() ? 'cyan' : ''"
                        >mdi-format-paragraph</v-icon
                      ></v-btn
                    >
                    <v-btn icon @click="commands.heading({ level: 1 })"
                      >H1</v-btn
                    >
                    <v-btn icon @click="commands.heading({ level: 2 })"
                      >H2</v-btn
                    >
                    <v-btn icon @click="commands.heading({ level: 3 })"
                      >H3</v-btn
                    >
                    <v-btn icon @click="commands.bullet_list"
                      ><v-icon>mdi-format-list-bulleted</v-icon></v-btn
                    >
                    <v-btn icon @click="commands.ordered_list"
                      ><v-icon>mdi-format-list-numbered</v-icon></v-btn
                    >
                    <v-btn icon @click="commands.horizontal_rule"
                      ><v-icon>mdi-minus</v-icon></v-btn
                    >
                    <v-btn icon @click="commands.undo"
                      ><v-icon>mdi-undo</v-icon></v-btn
                    >
                    <v-btn icon @click="commands.redo"
                      ><v-icon>mdi-redo</v-icon></v-btn
                    >
                  </div>
                </editor-menu-bar>

                <editor-content class="editor__content" :editor="postContent" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card>
            <v-card-title> Options </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="post.imageUrl"
                :rules="imageURLRules"
                label="Image URL"
                required
              ></v-text-field>
              <v-select
                v-model="post.categoryId"
                :items="categories"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Category is required']"
                label="Category"
                required
              ></v-select>
              <v-select
                :items="postStatusTypes"
                v-model="post.status"
                item-text="name"
                item-value="id"
                label="Status"
              ></v-select>
              <v-btn block color="cyan" dark class="mr-4" @click="savePost">
                Create Post
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

import PostsService from '@/services/PostsService'
export default {
  name: 'NewPost',
  components: {
    EditorContent,
    EditorMenuBar
  },
  mounted() {
    this.postContent = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: null,
      onUpdate: ({ getHTML }) => {
        let content = getHTML()
        this.post.content = getHTML()
      }
    })
  },
  beforeDestroy() {
    this.post.postContent.destroy()
  },
  data: () => ({
    postStatusTypes: [
      {
        id: 1,
        name: 'Draft'
      },
      {
        id: 2,
        name: 'Unpublished'
      },
      {
        id: 3,
        name: 'Published'
      }
    ],
    valid: true,
    post: {
      title: null,
      status: null,
      imageUrl: null,
      categoryId: null,
      slug: null,
      content: null,
      userId: null
    },
    postContent: null,
    titleRules: [
      (v) => !!v || 'Title is required',
      (v) => (v && v.length <= 100) || 'Title must be less than 10 characters'
    ],
    imageURLRules: [(v) => !!v || 'Image URL is required']
  }),
  computed: {
    categories() {
      return this.$store.state.categories
    },
    titleSlug() {
      return this.post.title
        ? this.post.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-')
        : ''
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    async savePost() {
      // if (this.validate()) {
      this.post.slug = this.titleSlug
      this.post.userId = this.$store.state.user.id
      await PostsService.save(this.post).then((response) => {})
      // }

      // return false
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style>
.editor__content {
  min-height: 300px;
}

.ProseMirror {
  min-height: 300px;
  padding: 10px;
  border: 2px solid #f3f3f3;
  border-radius: 5px;
  margin: 2em auto;
}
</style>
