// Axios base instance setup
import axios from 'axios'

const clientApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})

//any reusable and basic configs will be here

export default clientApi
