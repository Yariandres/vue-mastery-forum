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

    userPosts(store) {
      return store.dataSource.posts.filter(
        (post) => post.userId === store.authId
      );
    },

    userThreads(store) {
      return store.dataSource.threads.filter(
        (thread) => thread.userId === store.authId
      );
    },

    userPostsCount() {
      return this.userPosts.length;
    },

    userThreadsCount() {
      return this.userThreads.length;
    },
  },

  actions: {
    createPost(post: any) {
      post.id = 'YYYMM' + Math.random();
      post.userId = this.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      this.dataSource.posts.push(post);
      const thread = this.dataSource.threads.find(
        (thread) => thread.id === post.threadId
      );
      if (thread) {
        thread.posts.push(post.id);
      }
    },

    updateUser(user: any) {
      const userIndex = this.dataSource.users.findIndex(
        (userItem) => userItem.id === user.id
      );

      this.dataSource.users[userIndex] = user;
    },
  },
});
