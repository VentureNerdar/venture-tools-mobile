import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  const users = JSON.parse(localStorage.getItem('users') || '{}')
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '{}')

  return { users, userRoles }
})