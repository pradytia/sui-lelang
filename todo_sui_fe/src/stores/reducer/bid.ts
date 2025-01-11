import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuctionItem {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  imageUrl: string;
  endDate: string;
  seller: string;
}

interface BidState {
  auctionItems: AuctionItem[];
}

const initialState: BidState = {
  auctionItems: [
    {
        id: 1,
        name: 'Antique Vase',
        description: 'A beautiful antique vase from the 18th century.',
        startingPrice: 500000,
        currentBid: 750000,
        imageUrl: 'https://png.pngtree.com/png-vector/20240124/ourmid/pngtree-image-of-an-aquarium-goldfish-that-swims-png-image_11479309.png',
        endDate: '11-01-2025',
        seller: 'John Doe',
      },
      {
        id: 2,
        name: 'Luxury Watch',
        description: 'A premium luxury watch with diamond accents.',
        startingPrice: 1500000,
        currentBid: 1800000,
        imageUrl: 'https://png.pngtree.com/png-clipart/20240302/original/pngtree-simple-fish-image-png-image_14479562.png',
        endDate: '12-01-2025',
        seller: 'Elite Timepieces',
      },
      {
        id: 3,
        name: 'Sports Car',
        description: 'A high-performance sports car with top-notch features.',
        startingPrice: 500000000,
        currentBid: 600000000,
        imageUrl: 'https://png.pngtree.com/png-clipart/20240308/original/pngtree-image-of-an-aquarium-goldfish-swimming-with-shark-fin-png-image_14538595.png',
        endDate: '13-01-2025',
        seller: 'Speed Motors',
      },
      {
        id: 4,
        name: 'Vintage Guitar',
        description: 'A classic vintage guitar from a renowned brand.',
        startingPrice: 1200000,
        currentBid: 1500000,
        imageUrl: 'https://png.pngtree.com/png-clipart/20220228/original/pngtree-nemo-fish-png-image_7322646.png',
        endDate: '14-01-2025',
        seller: 'Music Collectors',
      },
      {
        id: 5,
        name: 'Painting by Famous Artist',
        description: 'A masterpiece painting by a world-famous artist.',
        startingPrice: 25000000,
        currentBid: 32000000,
        imageUrl: 'https://png.pngtree.com/png-clipart/20240311/original/pngtree-sea-animal-clown-fish-nemo-fish-png-image_14565334.png',
        endDate: '15-01-2025',
        seller: 'Art Gallery',
      },
  ],
};

const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    addAuctionItem(state, action: PayloadAction<AuctionItem>) {
      state.auctionItems.push(action.payload);
    },
    updateAuctionItem(state, action: PayloadAction<AuctionItem>) {
      const index = state.auctionItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.auctionItems[index] = action.payload;
      }
    },
    deleteAuctionItem(state, action: PayloadAction<number>) {
      state.auctionItems = state.auctionItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearAuctionItems(state) {
      state.auctionItems = [];
    },
  },
});

export const {
  addAuctionItem,
  updateAuctionItem,
  deleteAuctionItem,
  clearAuctionItems,
} = bidSlice.actions;

export default bidSlice.reducer;
