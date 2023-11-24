<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  forum: any;
}>();

const title = ref('');
const text = ref('');

const save = () => {
  console.log(title.value, text.value);
  // pinia action
};
</script>
<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>

    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_title">Title</label>
        <input
          v-model="title"
          type="text"
          id="thread_title"
          class="form-input"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="thread_content">Content</label>
        <textarea
          v-model="text"
          type="text"
          id="thread_content"
          class="form-input"
          name="content"
        />
      </div>
      <div class="form-group">
        <button class="btn btn-ghost">Cancel</button>
        <button type="submit" class="btn btn-blue">Publish</button>
      </div>
    </form>
  </div>
</template>
