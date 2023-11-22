<script lang="ts" setup>
import UserProfileCard from '../UserProfileCard.vue';
import PostList from '../PostList.vue';
import { useDataSource } from '../../store/dataSource';
const store = useDataSource();

const { authUser, userPosts, userPostsCount, userThreadsCount } = store;
</script>
<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <user-profile-card
        :user="authUser"
        :userPostsCount="userPostsCount"
        :userThreadsCount="userThreadsCount"
      />
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
