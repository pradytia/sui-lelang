import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  productName: string;
  price: string;
  imageUrl: string;
  description: string;
  createdBy: string;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
