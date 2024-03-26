import axios, { AxiosHeaders } from "axios";
import { authStore } from "../Redux/AuthState";

// Interceptor service for automatic sending of tokens, placed in index.tsx
class InterceptorService {

    public create(): void {

        axios.interceptors.request.use(requestObject => {
            
            if(authStore.getState().token) {
                requestObject.headers['Authorization'] = 'Bearer ' + authStore.getState().token;
            }

            return requestObject;

        });
    }
}

const interceptorService = new InterceptorService();

export default interceptorService;