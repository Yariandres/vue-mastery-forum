<script lang="ts" setup>
import { computed } from 'vue';
import PostList from '../PostList.vue';
import { useDataSource } from '../../store/dataSource';
const store = useDataSource();

const { authUser } = store;

const user = computed(() => {
  return authUser;
});

const userPosts = computed(() => {
  return store.dataSource.posts.filter((post) => post.userId === authUser?.id);
});

const userThreads = computed(() => {
  return store.dataSource.threads.filter(
    (thread) => thread.userId === authUser?.id
  );
});

const userPostsCount = computed(() => {
  return userPosts.value.length;
});

const userThreadsCount = computed(() => {
  return userThreads.value.length;
});
</script>
<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <div class="profile-card">
        <p class="text-center">
          <img
            :src="user?.avatar"
            :alt="`${user?.name} profile picture`"
            class="avatar-xlarge"
          />
        </p>

        <h1 class="title">{{ user?.username }}</h1>

        <p class="text-lead">{{ user?.name }}</p>

        <p class="text-justify">{{ user?.bio || 'No bio specified.' }}</p>

        <span class="online">{{ user?.username }} is online</span>

        <div class="stats">
          <span>{{ userPostsCount }} posts</span>
          <span>{{ userThreadsCount }} threads</span>
        </div>

        <hr />

        <p v-if="user?.website" class="text-large text-center">
          <i class="fa fa-globe"></i>
          <a :href="user?.website">{{ user?.website }}</a>
        </p>
      </div>

      <p class="text-xsmall text-faded text-center">
        Member since june 2003, last visited 4 hours ago
      </p>

      <div class="text-center">
        <hr />
        <a href="edit-profile.html" class="btn-green btn-small">Edit Profile</a>
      </div>
    </div>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> Joker's recent activity </span>
        <a href="#">See only started threads?</a>
      </div>
      <hr />
      <PostList :posts="userPosts" />
    </div>
  </div>
</template>
