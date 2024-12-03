import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

interface Participant {
  _id: string;
  name: string;
  cni: string;
}

interface ParticipantState {
  participants: Participant[];
  currentParticipant: Participant | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: ParticipantState = {
  participants: [],
  currentParticipant: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

// Create Participant
export const createParticipant = createAsyncThunk(
  "participants/create",
  async (participantData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/participant", participantData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch All Participants
export const fetchParticipants = createAsyncThunk(
  "participants/fetchAll",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/participant/event/${eventId}`);
      console.log("response . data", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Participant By ID
export const fetchParticipantById = createAsyncThunk(
  "participants/fetchOne",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/participants/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Participant
export const updateParticipant = createAsyncThunk(
  "participants/update",
  async (
    {
      id,
      updateParticipantDto,
    }: { id: string; updateParticipantDto: Partial<Participant> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `/participants/${id}`,
        updateParticipantDto
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Participant
export const deleteParticipant = createAsyncThunk(
  "participant/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/participant/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const participantSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    clearCurrentParticipant: (state) => {
      state.currentParticipant = null;
    },
    setParticipantPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Participant
      .addCase(createParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.participants.unshift(action.payload);
      })
      .addCase(createParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Participants
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload.participants;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Participant
      .addCase(fetchParticipantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipantById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentParticipant = action.payload;
      })
      .addCase(fetchParticipantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Participant
      .addCase(updateParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParticipant.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.participants.findIndex(
          (participant) => participant._id === action.payload._id
        );
        if (index !== -1) {
          state.participants[index] = action.payload;
        }
        state.currentParticipant = action.payload;
      })
      .addCase(updateParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Participant
      .addCase(deleteParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = state.participants.filter(
          (participant) => participant._id !== action.payload
        );
        if (state.currentParticipant?._id === action.payload) {
          state.currentParticipant = null;
        }
      })
      .addCase(deleteParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentParticipant, setParticipantPage } =
  participantSlice.actions;
export default participantSlice.reducer;
