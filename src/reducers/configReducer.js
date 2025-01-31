import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../util/api';

export const fetchConfigs = createAsyncThunk('user/fetchConfigs', async (token) => {
  api.setTokenGetter(() => token);
  const res = await api.getConfigs();
  return res.data;
});

const uConfigSlice = createSlice({
  name: 'configs',
  initialState: {
    data: null,
    status: 'idle',
    configErr: null,
  },
  reducers: {
    setConfigs: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfigs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConfigs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchConfigs.rejected, (state, action) => {
        state.status = 'failed';
        state.configErr = action.error.message;
      });
  },
});

export const { setConfigs } = uConfigSlice.actions;
export default uConfigSlice.reducer;
