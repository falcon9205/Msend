import { create } from 'zustand'

const useStore = create((set) => ({
  LoginUser: 0,
  AllowUser: () => set({ LoginUser: 1 }),
  removeUser: () => set({ LoginUser: 0 }),
  
  UserEmail : "",
  SetEmail : (value) => set({UserEmail:value})
}))


export default useStore