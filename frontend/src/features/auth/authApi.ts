// import { createApi } from "@reduxjs/toolkit/query/react";
// import api from "../../api/api";

// interface UserCredentials {
//   email: string;
//   password: string;
// }

// interface UserData extends UserCredentials {
//   name: string;
// }

// interface UserResponse {
//   id: string;
//   name: string;
//   email: string;
//   token: string;
// }

// const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: "" }) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await api({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//       });
//       return { data: result.data };
//     } catch (axiosError) {
//       let err = axiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: axiosBaseQuery(),
//   endpoints: (builder) => ({
//     login: builder.mutation<UserResponse, UserCredentials>({
//       query: (credentials) => ({
//         url: "/login",
//         method: "POST",
//         data: credentials,
//       }),
//     }),
//     register: builder.mutation<UserResponse, UserData>({
//       query: (userData) => ({
//         url: "/register",
//         method: "POST",
//         data: userData,
//       }),
//     }),
//     logout: builder.mutation<void, void>({
//       query: () => ({
//         url: "/logout",
//         method: "POST",
//       }),
//     }),
//     resetPassword: builder.mutation<void, { email: string }>({
//       query: (email) => ({
//         url: "/reset-password",
//         method: "POST",
//         data: email,
//       }),
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useRegisterMutation,
//   useLogoutMutation,
//   useResetPasswordMutation,
// } = authApi;
