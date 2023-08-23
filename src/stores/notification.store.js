import { defineStore } from 'pinia'
import API from 'src/services/API'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: []
  }),
  actions: {
    async loadNotification() {
      const response = await API.get("notifications")
      if (response.state == 200) {
        this.notifications = response.data
      }
    }
  }
})
