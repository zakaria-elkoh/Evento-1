// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserResponse } from "./authApi.ts";

// interface UserState {
//   user: UserResponse | null;
// }

// const initialState: UserState = {
//   user: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<UserResponse>) => {
//       state.user = action.payload;
//     },
//     clearUser: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;
