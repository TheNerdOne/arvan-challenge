import { defineStore } from 'pinia'
import authDataProvider from '../service/services/auth'
export const useUsersStore = defineStore('users', {
    state: () => {
        return { 
            user:{
                bio: '',
                email: '',
                image: '',
                token: '',
                username: '',
            }
         }
    },
    actions: {
        async setUser(userData,registerMode = false) {
            const res = registerMode
                ? await authDataProvider.register(userData)
                : await authDataProvider.login(userData);
            Promise.resolve(res).then((res) => {
                this.user = res.data.user
            });
        },
        logOut(){
            this.user = {}
        }
    },
})