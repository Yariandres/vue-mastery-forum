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
    createThread({ title, text, forumId }: any) {
      const id = 'ggg' + Math.random();
      const userId = this.authId;
      const publishedAt = Math.floor(Date.now() / 1000);

      const thread = { forumId, title, publishedAt, userId, id };
      this.setThreads(thread);

      this.appentThreadToUser({ userId, threadId: id });
      this.appendThreadToForum({ forumId, threadId: id });
    },

    setThreads(threads: any) {
      this.dataSource.threads.push(threads);
    },

    appendPostToThread({ postId, threadId }: any) {
      const thread = this.dataSource.threads.find(
        (thread) => thread.id === threadId
      );
      if (!thread) return;
      thread.posts = thread?.posts || [];
      thread?.posts.push(postId);
    },

    appendThreadToForum({ forumId, threadId }: any) {
      const forum = this.dataSource.forums.find(
        (forum) => forum.id === forumId
      );
      if (!forum) return;
      forum.threads = forum?.threads || [];
      forum?.threads.push(threadId);
    },

    appentThreadToUser({ userId, threadId }: any) {
      const user = this.dataSource.users.find((user) => user.id === userId);
      if (!user) return;

      user.threads = user?.threads || [];
      user?.threads.push(threadId);
    },

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
