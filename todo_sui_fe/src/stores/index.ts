import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import profileReducer from './reducer/profile';
import bidReducer from './reducer/bid';
import historyReducer from './reducer/history';
import productsReducer from './reducer/product';

const profileConfig = {
  key: 'profile',
  storage: AsyncStorage,
  whitelist: ['profile'],
};


const rootReducer = combineReducers({
  profile: persistReducer(profileConfig, profileReducer),
  bids: bidReducer,
  history: historyReducer,
  products: productsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  errorHandler: (error: any) => {
    console.log("Persist Error:", error);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
