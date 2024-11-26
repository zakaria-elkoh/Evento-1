import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import { toast } from "sonner";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
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

interface VerifyOTPData {
  userId: string;
  otp: string;
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
      const response = await api.post("/auth/signup", userData); // Bdelnaha hna
      console.log("response", response);

      localStorage.setItem("token", response.data.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

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

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (verifyOTPData: VerifyOTPData, { rejectWithValue }) => {
    try {
      console.log("verifyOTPData", verifyOTPData);
      const response = await api.post(
        `/auth/verify-otp/${verifyOTPData.userId}`,
        { otp: verifyOTPData.otp }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleTwoStepVerification = createAsyncThunk(
  "user/twoStepVerification",
  async (twoStepVerification: boolean, { rejectWithValue }) => {
    try {
      console.log("verifyOTPData", twoStepVerification);
      const response = await api.post(`/auth/two-step-verification`, {
        twoStepVerification,
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reSendOTP = createAsyncThunk(
  "user/reSendOTP",
  async (userId: string, { rejectWithValue }) => {
    try {
      console.log("userId userId", userId);
      const response = await api.get(`/auth//resend-otp/${userId}`);
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
          console.log("action.payload,login.fulfilled", action.payload);
          if (action.payload.data.user.twoStepVerification) {
            state.isOtpRequired = true;
            state.user = action.payload.data.user;
          } else {
            localStorage.setItem("token", action.payload.data.token);
            state.user = action.payload.data.user;
            state.token = action.payload.data.token;
          }
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
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
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
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        console.log("action.payload,verifyOtp.fulfilled", action.payload);
        state.loading = false;
        state.isOtpRequired = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        console.log("action.payload", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleTwoStepVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTwoStepVerification.fulfilled, (state, action) => {
        console.log(
          "action.payload,verifyOtp.toggleTwoStepVerification",
          action.payload
        );
        state.loading = false;
        state.user.twoStepVerification =
          action.payload.data.twoStepVerification;
        toast.success("Two-step verification toggled successfully");
      })
      .addCase(reSendOTP.fulfilled, (state, action) => {
        console.log("action.payload,reSendOTP.reSendOTP", action.payload);
        toast.success(action.payload.message);
      });
  },
});

export default authSlice.reducer;
