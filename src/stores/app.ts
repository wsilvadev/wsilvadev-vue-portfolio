// Utilities
import { defineStore } from 'pinia'

export const useRepositories = defineStore('repositories', {
  state: () => ({
    repositories: []
  }),
  getters: {
    getRepositories: (state) => state.repositories
  },
  actions: {
    async fetchRepositories() {
      try {
        const response = await fetch('https://api.github.com/users/wsilvadev/repos')
        const data = await response.json()
        this.repositories = data
      } catch (err) {
        console.error('Error fetching repositories', err)
      }
    }
  }
})
