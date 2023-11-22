<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  user: any;
  userPostsCount: number;
  userThreadsCount: number;
}>();

const activeUser = ref({ ...props.user });

const saveChanges = () => {
  console.log('Saving changes...');
  console.log(activeUser.value);
};
</script>
<template>
  <div class="profile-card">
    <form @submit.prevent="saveChanges">
      <p class="text-center">
        <img
          :src="user.avatar"
          :alt="`${user.name} profile picture`"
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

      <div class="btn-group space-between">
        <button class="btn-ghost">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>
