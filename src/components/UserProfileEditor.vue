<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

import { useDataSource } from '../store/dataSource';
const store = useDataSource();

const { authUser, userPostsCount, userThreadsCount } = store;

const activeUser = computed(() => ({ ...authUser }));

const saveChanges = () => {
  store.updateUser({ ...activeUser.value });
  router.push({ name: 'Profile' });
};

const cancel = () => {
  router.push({ name: 'Profile' });
};
</script>
<template>
  <div class="profile-card">
    <form @submit.prevent="saveChanges">
      <p class="text-center">
        <img
          :src="activeUser.avatar"
          :alt="`${activeUser.name} profile picture`"
          class="avatar-xlarge img-update"
        />
      </p>
      <div class="form-group">
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>
      <div class="form-group">
        <input
          v-model="activeUser.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead text-bold"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="user_bio">Bio</label>
        <textarea
          v-model="activeUser.bio"
          class="form-input"
          type="text"
          id="user_bio"
          placeholder="Write a few words about yourself"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          v-model="activeUser.website"
          autocomplete="off"
          class="form-input"
          id="user_website"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="user_email">Website</label>
        <input
          v-model="activeUser.email"
          autocomplete="off"
          class="form-input"
          id="user_email"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          v-model="activeUser.location"
          autocomplete="off"
          class="form-input"
          id="user_location"
        />
      </div>
      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>
      <hr />
      <div class="btn-group space-between">
        <button class="btn-ghost" @click="cancel">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>
