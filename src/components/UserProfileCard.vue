<script lang="ts" setup>
import { useDataSource } from '../store/dataSource';
const store = useDataSource();
const { authUser } = store;

defineProps<{
  userPostsCount: number;
  userThreadsCount: number;
}>();
</script>

<template>
  <div class="profile-card">
    <p class="text-center">
      <img
        :src="authUser?.avatar"
        :alt="`${authUser?.name} profile picture`"
        class="avatar-xlarge"
      />
    </p>

    <h1 class="title">{{ authUser?.name }}</h1>
    <p class="text-lead">{{ authUser?.name }}</p>
    <p class="text-justify">{{ authUser?.bio || 'No bio specified.' }}</p>
    <span class="online">{{ authUser?.username }} is online</span>

    <div class="stats">
      <span>{{ userPostsCount }} posts</span>
      <span>{{ userThreadsCount }} threads</span>
    </div>

    <hr />

    <p v-if="authUser?.website" class="text-large text-center">
      <i class="fa fa-globe"></i>
      <a :href="authUser?.website">{{ user?.website }}</a>
    </p>

    <div class="text-center">
      <router-link :to="{ name: 'ProfileEdit' }" class="btn-green btn-small"
        >Edit Profile</router-link
      >
    </div>
  </div>
</template>
