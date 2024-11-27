import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  twoStepVerification: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isOtpRequired: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  isOtpRequired: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("response", response.data);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: Omit<User, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      console.log("response", response.data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearCredentials());
  }
);

export const currentUser = createAsyncThunk(
  "auth/current-user",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await api.get("/auth/current-user");
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isOtpRequired = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: { user: User; token: string; twoStepVerification: boolean };
          }>
        ) => {
          state.loading = false;
          console.log("action.payload, login.fulfilled", action.payload.data);
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          localStorage.setItem("token", action.payload.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.data.user)
          );
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          action: PayloadAction<{ data: { user: User; token: string } }>
        ) => {
          state.loading = false;
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          localStorage.setItem("token", action.payload.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.data.user)
          );
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isOtpRequired = false;
      })
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
