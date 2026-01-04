//When sending a request to backend we have to add headers and base url for each request. So this
//task can be done in a separate file also. Doing this in a single file rahter then repeating follow good
//code practices also. 
import axios from "axios";

export const httpClient = axios.create({
  // In dev: use Vite proxy at /api (avoids CORS)
  // In prod: use VITE_API_URL environment variable
  baseURL: import.meta.env.VITE_MODE == "DEV" ? "/api" : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// request interceptor: attach token
httpClient.interceptors.request.use(
  (config) => {
    // read token here
    // attach Authorization header if exists
    return config;
  },
  (error) => Promise.reject(error)
);

// optional: response interceptor for global error handling
