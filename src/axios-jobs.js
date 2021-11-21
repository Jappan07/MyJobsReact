import axios from "axios"

const instance = axios.create({
    baseURL: "https://jobs-api.squareboat.info/api/v1/"
})

export default instance