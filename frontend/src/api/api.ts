// import axios from "axios";

// // Create a custom instance of axios
// const api = axios.create({
//   baseURL: "http://localhost:3000",
//   timeout: 10000, // Set a timeout for requests (in milliseconds)
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // You can modify the response data here
//     return response;
//   },
//   (error) => {
//     // Handle response errors here
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error("Response error:", error.response.data);
//       console.error("Status:", error.response.status);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("Request error:", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
