<script lang="ts" setup>
import { ref } from 'vue';
import AppDate from './AppDate.vue';

import { storeToRefs } from 'pinia';
import { useDataSource } from '../store/dataSource';

const store = useDataSource();
const { dataSource } = storeToRefs(store);

defineProps<{
  posts: Array<any>;
}>();

const users = ref(dataSource.value.users);

function userById(userId: string) {
  return users.value.find((u: any) => u.id === userId);
}
</script>

<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="user-info">
        <a href="#" class="user-name">
          {{ userById(post.userId)?.name }}
        </a>

        <a href="#"
          ><img class="avatar-large" :src="userById(post.userId)?.avatar" />
        </a>

        <p class="desktop-only text-small">107 posts</p>
      </div>

      <div class="post-content">
        <p>{{ post.text }}</p>
      </div>

      <div class="post-date text-faded">
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>
