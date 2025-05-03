import api from '../axios';
import { NOTIFICATIONS } from '../endpoints';

/**
 * Get all notifications for the current user
 * @param {Object} params - Query parameters
 * @param {boolean} params.is_read - Filter by read status
 * @param {number} params.page - Page number for pagination
 * @returns {Promise} - Response with paginated notifications
 */
export const getNotifications = async (params = {}) => {
  try {
    const response = await api.get(NOTIFICATIONS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get notification by ID
 * @param {number} id - Notification ID
 * @returns {Promise} - Response with notification details
 */
export const getNotification = async (id) => {
  try {
    const response = await api.get(NOTIFICATIONS.DETAIL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Mark notification as read
 * @param {number} id - Notification ID
 * @returns {Promise} - Response with updated notification
 */
export const markAsRead = async (id) => {
  try {
    const response = await api.post(NOTIFICATIONS.MARK_READ(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Mark notification as unread
 * @param {number} id - Notification ID
 * @returns {Promise} - Response with updated notification
 */
export const markAsUnread = async (id) => {
  try {
    const response = await api.post(NOTIFICATIONS.MARK_UNREAD(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Mark all notifications as read
 * @returns {Promise} - Response with success message
 */
export const markAllAsRead = async () => {
  try {
    const response = await api.post(NOTIFICATIONS.MARK_ALL_READ);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get count of unread notifications
 * @returns {Promise} - Response with unread count
 */
export const getUnreadCount = async () => {
  try {
    const response = await api.get(NOTIFICATIONS.UNREAD_COUNT);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};