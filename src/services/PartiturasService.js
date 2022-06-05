import axios from 'axios';

const apiList = axios.create({
    baseURL: 'https://uploadFiles.marcosvitor6.repl.co',
    headers: {
        "Content-Type": "application/json",
      },
});

export default apiList;