import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../services/graphql';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../stores/reducer/profile';
import { storeToken } from '../../../utills/token';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const handleLogin = () => {
    if (email === 'user' && password === 'password') {
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("Dashboard");
      Alert.alert('Invalid Credentials!');
    }
  };

  const handleAuth = async () => {
    try {
      const { data } = await login({ variables: { email, password } });

      if (data?.login === null) {
        Alert.alert('User Not Registered!');
        return;
      }
      await storeToken(JSON.stringify(data.login?.token));
      const userProfile = {
        id: data.login?.user?.id,
        userName: data.login?.user?.username,
        email: data.login?.user?.email,
        role:  data.login?.user?.role,
      };
      dispatch(updateProfile(userProfile));  
      Alert.alert('Login successful!');
      navigation.navigate('Dashboard');
    } catch (err: any) {
      console.error('Error:', err);
      Alert.alert('Error:', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleAuth} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => navigation.navigate("Register")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
});

export default LoginScreen;
