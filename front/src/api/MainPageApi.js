import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const RetrieveAllPostsForPostNoApi = (post_no) => apiClient.get(`/`);
