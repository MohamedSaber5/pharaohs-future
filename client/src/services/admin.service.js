import apiClient from "./apiClient.js";

const adminService = {
  getUsers:                (params)       => apiClient.get("/admin/users", { params }),
  updateRole:              (id, role)     => apiClient.patch(`/admin/users/${id}/role`, { role }),
  updateWhatsapp:          (id, whatsapp) => apiClient.patch(`/admin/users/${id}/whatsapp`, { whatsapp }),
  deactivateUser:          (id)           => apiClient.delete(`/admin/users/${id}`),

  // Employee Rotation
  getEmployeesRotation:    ()             => apiClient.get("/admin/employees/rotation"),
  updateEmployeeRotation:  (id, data)     => apiClient.patch(`/admin/employees/${id}/rotation`, data),
  reorderEmployeesRotation:(orderedIds)   => apiClient.post("/admin/employees/rotation/reorder", { orderedIds }),
};

export default adminService;
