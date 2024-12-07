import { createSelector, createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    data: [],
  },
  reducers: {
    setRequests: (state, action) => {
      state.data = action.payload;
    },
    removeRequest: (state, action) => {
      state.data = state.data.filter((req) => req.fromUserId._id !== action.payload);
    },
  },
});

export const selectRequests = createSelector(
  (state) => state.requests, 
  (requests) => requests?.data || []
);

export const { setRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
