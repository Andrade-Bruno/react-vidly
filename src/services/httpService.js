import Axios from 'axios';
import { toast } from 'react-toastify'
import logService from './logService'

Axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
  
    if (!expectedError) {
      let message = 'An unexpected error occurred.'
      toast.error(message)
      logService.logError(error)
    }
  
    return Promise.reject(error)
  })

  export default { 
      get: Axios.get,
      post: Axios.post,
      put: Axios.put,
      patch: Axios.patch,
      delete: Axios.delete,
  }