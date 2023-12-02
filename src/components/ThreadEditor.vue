<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (event: 'save', payload: { title: string; text: string }): void;
  (event: 'cancel'): void;
}>();

const title = ref<string>('');
const text = ref<string>('');

const save = () => {
  emit('save', { title: title.value, text: text.value });
};
</script>

<template>
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
      <button @click="emit('cancel')" class="btn btn-ghost">Cancel</button>
      <button type="submit" class="btn btn-blue">Publish</button>
    </div>
  </form>
</template>
