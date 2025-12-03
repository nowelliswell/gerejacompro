export interface User {
  id: string
  username: string
  email: string
  password: string // hashed
  role: 'super_admin' | 'admin' | 'editor'
  nama: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastLogin?: string
}
