<script lang="ts" setup>
import UserProfileCard from '../UserProfileCard.vue';
import UserProfileEditor from '../UserProfileEditor.vue';

import PostList from '../PostList.vue';
import { useDataSource } from '../../store/dataSource';
const store = useDataSource();

defineProps<{
  edit: boolean;
}>();

const { userPosts, authUser } = store;
</script>
<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <user-profile-card v-if="!edit" />
      <user-profile-editor v-else />
      <p class="text-xsmall text-faded text-center">
        Member since june 2003, last visited 4 hours ago
      </p>
    </div>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">
          {{ authUser?.username }} recent activity
        </span>
        <a href="#">See only started threads?</a>
      </div>
      <hr />
      <PostList :posts="userPosts" />
    </div>
  </div>
</template>
