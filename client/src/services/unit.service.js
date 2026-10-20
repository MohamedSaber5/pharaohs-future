import apiClient from "./apiClient.js";

const unitService = {
  getAll: (params) => apiClient.get("/units", { params }),
  getById: (id) => apiClient.get(`/units/${id}`),
  create: (data) => apiClient.post("/units", data),
  update: (id, data) => apiClient.patch(`/units/${id}`, data),
  delete: (id) => apiClient.delete(`/units/${id}`),
  uploadImages: (formData) =>
    apiClient.post("/units/upload-images", formData, {
      headers: { "Content-Type": undefined },
    }),
};
export default unitService;
