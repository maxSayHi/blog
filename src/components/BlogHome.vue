<script>
import Butter from "buttercms";
const butter = Butter("db3c4e045e3e7aad1109bf589f530e8d093713a4");
export default {
  name: "blog-home",
  data() {
    return {
      page_title: "Blog",
      posts: []
    };
  },
  methods: {
    getPosts() {
      butter.post
        .list({
          page: 1,
          page_size: 10
        })
        .then(res => {
          this.posts = res.data.data;
        });
    },
    getCategories() {
      butter.category.list().then(res => {
        console.log("List of Categories:");
        console.log(res.data.data);
      });
    },
    getPostsByCategory() {
      butter.category
        .retrieve("example-category", {
          include: "recent_posts"
        })
        .then(res => {
          console.log("Posts with specific category:");
          console.log(res);
        });
    }
  },
  created() {
    this.getPosts();
    this.getCategories()
    this.getPostsByCategory()
  }
};
</script>

<template>
  <div id="blog-home">
      <h1>{{ page_title }}</h1>
      <!-- 创建 `v-for` 并为 Vue 应用一个 `key`，该示例使用了 `slug` 和 `index` 的组合。 -->
      <div
        v-for="(post,index) in posts"
        :key="post.slug + '_' + index"
      >
        <router-link :to="'/blog/' + post.slug">
          <article class="media">
            <figure>
              <!-- 使用 `:` 绑定结果 -->
              <!-- 使用一组 `v-if`/`else` 判断它们是否是 `featured_image` -->
              <img
                v-if="post.featured_image"
                :src="post.featured_image"
                alt=""
              >
              <img
                v-else
                src="http://via.placeholder.com/250x250"
                alt=""
              >
            </figure>
            <h2>{{ post.title }}</h2>
            <p>{{ post.summary }}</p>
          </article>
        </router-link>
      </div>
  </div>
</template>