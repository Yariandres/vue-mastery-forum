<script setup lang="ts">
import { ref } from 'vue';
const text = ref();
const emit = defineEmits(['update:save']);

const save = () => {
  const postId = Math.random().toString(36).substr(2, 9);
  const post = {
    text: text.value,
    publishedAt: Math.floor(Date.now() / 1000),
    id: postId,
    userId: 'rpbB8C6ifrYmNDufMERWfQUoa202',
  };

  emit('update:save', { post });
  text.value = '';
};
</script>
<template>
  <form @submit.prevent="save">
    <div class="from-group">
      <textarea
        v-model="text"
        name=""
        id=""
        cols="30"
        rows="10"
        class="form-input"
      ></textarea>
    </div>

    <div class="form-actions">
      <button class="btn-blue" type="submit">Submit Post</button>
    </div>
  </form>
</template>
