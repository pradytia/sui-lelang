import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../services/graphql';

interface InputFieldProps {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any; 
}

interface ActionButtonProps {
  title: string;
  onPress: () => void;
}

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [traffic, setTraffic] = useState(0);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [registerUser, { loading, error }] = useMutation(REGISTER);


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    setTraffic(1)

    try {
      const response = await registerUser({
        variables: {
          email,
          password,
          username,
          role,
        },
      });
      
      if (response.data?.register) {
        setTraffic(0)
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login');
      } else {
        setTraffic(0)
        Alert.alert('Error', 'Registration failed. Please try again later.');
      }
    } catch (err) {
      setTraffic(0)
      console.error(err);
      Alert.alert('Error', 'Registration failed. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.registerForm}>
            <InputField
              icon="user"
              placeholder="Username..."
              value={username}
              onChangeText={setUsername}
            />
            <InputField
              icon="envelope"
              placeholder="Email..."
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <InputField
              icon="user"
              placeholder="Role..."
              value={role}
              onChangeText={setRole}
            />
            <InputField
              icon="lock"
              placeholder="Password..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <InputField
              icon="lock"
              placeholder="Confirm password..."
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {traffic === 0 && (
              <View>
                <ActionButton
                  title={loading ? 'Registering...' : 'Register'}
                  onPress={handleRegister}
                />
                <ActionButton
                  title="Have an account? Login"
                  onPress={() => navigation.navigate('Login')}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const InputField: React.FC<InputFieldProps> = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType }) => (
  <View style={styles.formRow}>
    <View style={styles.formLabel}>
      <Text style={styles.labelText}>
        <Icon name={icon} size={20} />
      </Text>
    </View>
    <View style={styles.formInputControl}>
      <TextInput
        style={Styles.formInputText}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCorrect={false}
      />
    </View>
  </View>
);

const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress }) => (
  <View style={styles.formRowButtons}>
    <TouchableHighlight onPress={onPress} style={styles.buttonTouch}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableHighlight>
  </View>
);



export default RegisterScreen;
