import Axios from "axios"

export default {
    addEmail: async (email) => {
        return await Axios.post(`/api/users/email`, {
            email
        }).then((response) => {
        })
    },

    removeEmail: async (obj) => {
        return await Axios.delete(`/api/users/email`, {
            data: {
                data: obj
            }
        }).then((response) => {
        })
    },

    fetchEmails: async () => {
        return await Axios.get(`/api/users/email`).then((response) => {
            return response;
        })
    }
}
