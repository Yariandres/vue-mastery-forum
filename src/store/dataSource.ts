import { defineStore } from 'pinia';
import dataSource from '../data.json';

export const useDataSource = defineStore('dataSource', {
  state: () => ({
    dataSource: dataSource,
  }),

  actions: {
    createPost(post: any) {
      post.id = Math.random().toString(36).substr(2, 9);

      this.dataSource.posts.push(post);
      const thread = this.dataSource.threads.find(
        (thread) => thread.id === post.threadId
      );
      if (thread) {
        thread.posts.push(post.id);
      }
    },
  },
});
