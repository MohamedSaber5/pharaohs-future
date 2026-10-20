import apiClient from "./apiClient.js";

const notificationService = {
  getMy:         ()   => apiClient.get("/notifications/my"),
  markAsRead:    (id) => apiClient.patch(`/notifications/${id}/read`),
  markAllAsRead: ()   => apiClient.patch("/notifications/read-all"),
};

export default notificationService;
