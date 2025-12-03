export interface Notification {
  id: string
  type: 'registration' | 'donation' | 'service_request'
  title: string
  message: string
  relatedId: string
  isRead: boolean
  createdAt: string
}
