import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})

export const userAPI = {
    login(body) {
        return instance.post(`/login`, body)
    },

    register(body) {
        return instance.post(`/register`, body).then(response => response.data.data)
    },

    getUser(email) {
        return instance.get(`/users/?email=${email}`).then(response => response.data[0])
    },
}
