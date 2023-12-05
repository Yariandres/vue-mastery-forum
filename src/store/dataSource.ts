import { defineStore } from 'pinia';
import dataSource from '../data.json';
import findById from '../helpers/findById';

export const useDataSource = defineStore('dataSource', {
  state: () => ({
    dataSource,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  }),

  getters: {
    authUser(store) {
      return findById(store.dataSource.users, store.authId);
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
    async createThread({ title, text, forumId }: any) {
      const id = 'ggg' + Math.random();
      const userId = this.authId;
      const publishedAt = Math.floor(Date.now() / 1000);

      const thread = { forumId, title, publishedAt, userId, id };
      this.setThread(thread);

      const post = {
        text,
        publishedAt,
        threadId: id,
        id,
        userId,
      };

      this.createPost({ ...post });
      this.appendThreadToForum({ forumId, threadId: id });
      this.appentThreadToUser({ userId, threadId: id });

      return findById(this.dataSource.threads, id);
    },

    appendPostToThread({ postId, threadId }: any) {
      const thread = findById(this.dataSource.threads, threadId);

      if (!thread) return;
      thread.posts = thread?.posts || [];
      thread?.posts.push(postId);
    },

    appendThreadToForum({ forumId, threadId }: any) {
      const forum = findById(this.dataSource.forums, forumId);

      if (!forum) return;
      forum.threads = forum?.threads || [];
      forum.threads?.push(threadId);
    },

    appentThreadToUser({ userId, threadId }: any) {
      const user = findById(this.dataSource.users, userId);
      if (!user) return;

      user.threads = user?.threads || [];
      user?.threads.push(threadId);
    },

    setThread(threads: any) {
      const index = this.dataSource.threads.findIndex(
        (t) => t.id === threads.id
      );

      if (threads.id && index !== -1) {
        this.dataSource.threads[index] = threads;
        return;
      } else {
        this.dataSource.threads.push(threads);
      }
    },

    createPost(post: any) {
      const index = this.dataSource.posts.findIndex((p) => p.id === post.id);

      if (post.id && index !== -1) {
        this.dataSource.posts[index] = post;
      }

      post.id = 'YYYMM' + Math.random();
      post.userId = this.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      this.dataSource.posts.push(post);

      const thread = findById(this.dataSource.threads, post.threadId);

      if (thread) {
        this.dataSource.threads.push(post.id);
      }
    },

    async updateThread({ title, text, id }: any) {
      const thread = findById(this.dataSource.threads, id);

      const post = findById(this.dataSource.posts, thread.posts[0]);

      const newThread = { ...thread, title };
      const newPost = { ...post, text };

      this.setThread(newThread);
      this.createPost(newPost);

      return newThread;
    },

    updateUser(user: any) {
      const userIndex = this.dataSource.users.findIndex(
        (userItem) => userItem.id === user.id
      );

      this.dataSource.users[userIndex] = user;
    },
  },
});
