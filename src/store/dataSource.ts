import { defineStore } from 'pinia';
import dataSource from '../data.json';

export const useDataSource = defineStore('dataSource', {
  state: () => ({
    dataSource,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  }),

  getters: {
    authUser(store) {
      return store.dataSource.users.find((user) => user.id === store.authId);
    },
  },

  actions: {
    createPost(post: any) {
      post.id = 'YYYMM' + Math.random();

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
