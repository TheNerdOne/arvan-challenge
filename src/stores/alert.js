import { defineStore } from 'pinia'
export const useAlertStore = defineStore('alert', {
    state: () => {
        return {
            alertConfig: { type: "success", text: "Lorem!", strongText: "ipsum" },
            visibility: false
        }
    },
    actions: {
        async showAlert(payload) {
            this.alertConfig = payload
            this.visibility = true
            setTimeout(() => {
                this.visibility = false
            }, 3000);
        },
    },
})