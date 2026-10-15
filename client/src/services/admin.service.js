import apiClient from "./apiClient.js";

const adminService = {
  getUsers:          (params) => apiClient.get("/admin/users", { params }),
  updateRole:        (id, role) => apiClient.patch(`/admin/users/${id}/role`, { role }),
  updateWhatsapp:    (id, whatsapp) => apiClient.patch(`/admin/users/${id}/whatsapp`, { whatsapp }),
  deactivateUser:    (id) => apiClient.delete(`/admin/users/${id}`),
};

export default adminService;
