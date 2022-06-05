import axios from 'axios'

const ApiBase = axios.create({
    baseURL: 'https://orquestra-api.herokuapp.com'
})

export default ApiBase;
