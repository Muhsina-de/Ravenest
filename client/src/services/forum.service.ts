import axiosInstance from '../utils/axios';
import { FORUM_ENDPOINTS } from '../constants/api';

export const getTopics = () =>
  axiosInstance.get(FORUM_ENDPOINTS.TOPICS.GET_ALL);

export const getTopic = (id: number) =>
  axiosInstance.get(FORUM_ENDPOINTS.TOPICS.GET_BY_ID(id));

export const createTopic = (data: { title: string; content: string; category: string }) =>
  axiosInstance.post(FORUM_ENDPOINTS.TOPICS.CREATE, data);

export const updateTopic = (id: number, data: { title: string; content: string; category: string }) =>
  axiosInstance.put(FORUM_ENDPOINTS.TOPICS.UPDATE(id), data);

export const deleteTopic = (id: number) =>
  axiosInstance.delete(FORUM_ENDPOINTS.TOPICS.DELETE(id));

export const createComment = (topicId: number, content: string) =>
  axiosInstance.post(FORUM_ENDPOINTS.COMMENTS.CREATE(topicId), { content });