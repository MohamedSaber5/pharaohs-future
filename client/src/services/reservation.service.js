import apiClient from "./apiClient.js";

const reservationService = {
  create:             (data)         => apiClient.post("/reservations", data),
  agentBook:          (data)         => apiClient.post("/reservations/agent-book", data),
  getMyReservations:  ()             => apiClient.get("/reservations/my"),
  getMy:              ()             => apiClient.get("/reservations/my"),
  getAssigned:        (params)       => apiClient.get("/reservations/assigned", { params }),
  getAll:             (params)       => apiClient.get("/reservations", { params }),
  getStats:           ()             => apiClient.get("/reservations/stats"),
  getAssignmentLogs:  (params)       => apiClient.get("/reservations/assignment-logs", { params }),
  updateStatus:       (id, data)     => apiClient.patch(`/reservations/${id}/status`, data),
  cancel:             (id, reason)   => apiClient.post(`/reservations/${id}/cancel`, { reason }),
};

export default reservationService;
