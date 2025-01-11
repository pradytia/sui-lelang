import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import realm from '../../database';

interface HistoryItem {
  id: number;
  productName: string;
  description: string;
  price: string;
  imageUrl: string;
  createdBy: string;
}

interface HistoryState {
  items: HistoryItem[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: HistoryState = {
  items: [],
  status: 'idle',
};

export const fetchHistoryItems = createAsyncThunk(
  'history/fetchHistoryItems',
  async () => {
    const realmItems = realm.objects<HistoryItem>('Product');
    return realmItems.map((item) => ({
      id: item.id,
      productName: item.productName,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      createdBy: item.createdBy
    }));
  }
);

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryItem: (state, action: PayloadAction<HistoryItem>) => {
      state.items.push(action.payload);
    },
    removeHistoryItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateHistoryItem: (state, action: PayloadAction<HistoryItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoryItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchHistoryItems.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addHistoryItem, removeHistoryItem, updateHistoryItem } =
  historySlice.actions;

export default historySlice.reducer;
