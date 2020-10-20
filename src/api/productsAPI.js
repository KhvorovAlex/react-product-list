import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})

export const productsAPI = {
    getProducts() {
        return instance.get(`/products`)
    },

    getSortProducts(params) {
        return instance.get(`/products${params !== 0 ? '?category=' + params : ''}`)
    },

    getProductsCategory() {
        return instance.get(`/productCategory`)
    },

    addProducts(body) {
        return instance.post(`/products`, body)
    },

    addCategory(body) {
        return instance.post(`/productCategory`, body)
    },
}
