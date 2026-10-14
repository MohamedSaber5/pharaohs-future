import apiClient from "./apiClient.js";
const reservationService = {
  create:       (data)       => apiClient.post("/reservations", data),
  getMy:        ()           => apiClient.get("/reservations/my"),
  getAll:       (params)     => apiClient.get("/reservations", { params }),
  getStats:     ()           => apiClient.get("/reservations/stats"),
  updateStatus: (id, data)   => apiClient.patch(`/reservations/${id}/status`, data),
};
export default reservationService;
