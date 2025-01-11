import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../utills/token';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    getToken()
    .then((token:any) => {
      if (token !== '' && token !== null && token !== undefined) {
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('Login');
      }
    })
    .catch((error) => {
      console.error('Failed to retrieve token:', error);
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Lelang</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 50,
    color:"rgba(15, 37, 205, 0.8)",
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen;
