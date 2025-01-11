import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux'; 
import client from './src/services/client';
import AppNavigator from './src/navigation';
import store, { persistor } from './src/stores';

const App = () => (
  <Provider store={store}> 
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </PersistGate>
  </Provider>
);

export default App;