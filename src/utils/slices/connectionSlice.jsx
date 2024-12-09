import { createSlice } from '@reduxjs/toolkit';

const connectionsSlice = createSlice({
  name: 'connections',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchConnectionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchConnectionsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchConnectionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchConnectionsStart,
  fetchConnectionsSuccess,
  fetchConnectionsFailure,
} = connectionsSlice.actions;

export default connectionsSlice.reducer;
