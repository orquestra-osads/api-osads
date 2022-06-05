import axios from 'axios'

const ApiUpload = axios.create({
    baseURL: "https://orquestra-api-upload.herokuapp.com",
})

export default ApiUpload;