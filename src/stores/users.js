import { defineStore } from 'pinia'
import authDataProvider from '../service/services/auth'
import axiosApiWrapper from '../service/axiosApiWrapper';
export const useUsersStore = defineStore('users', {
    state: () => {
        return {
            user: {
                bio: '',
                email: '',
                image: '',
                token: '',
                username: '',
            }
        }
    },
    actions: {
        async setUser(userData, registerMode = false) {
            try {
                const res = registerMode
                    ? await authDataProvider.register(userData)
                    : await authDataProvider.login(userData);
                Promise.resolve(res).then((res) => {
                    this.user = res.data.user
                    axiosApiWrapper.updateHeader('Authorization', `Token ${res.data.user.token}`)
                });
            } catch (error) {
                return error
            }
        },
        logOut() {
            this.user = {}
        },
        async getUser() {
            const res = await authDataProvider.currentUser()
            Promise.resolve(res).then((res) => {
                this.user = res.data.user
                axiosApiWrapper.updateHeader('Authorization', `Token ${res.data.user.token}`)
            })
        }
    },
})