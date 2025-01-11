import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token:string) => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('Token saved successfully!');
  } catch (error) {
    console.error('Failed to save token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    } else {
      console.log('No token found');
    }
  } catch (error) {
    console.error('Failed to retrieve token:', error);
  }
};


export const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed successfully');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

