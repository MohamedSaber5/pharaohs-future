import apiClient from "./apiClient.js";

const projectService = {
  getAll:   (params) => apiClient.get("/projects", { params }),
  getById:  (id)     => apiClient.get(`/projects/${id}`),
  getStats: ()       => apiClient.get("/projects/stats"),
  create:   (data)   => apiClient.post("/projects", data),
  update:   (id, data) => apiClient.patch(`/projects/${id}`, data),
  delete:   (id)     => apiClient.delete(`/projects/${id}`),
};
export default projectService;
